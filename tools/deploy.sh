#!/usr/bin/env bash
# Lädt den Upload-Ordner dist/ per SFTP zu Strato (Aufruf durch die GitHub Action).
#
# Nur Dateien, die sich seit dem letzten Upload geändert haben, werden übertragen:
# Der Commit des letzten Uploads steht auf dem Server in website/.deploy-sha,
# git vergleicht damit. Fehlt die Datei, wird einmal alles abgeglichen.
#
# Erwartet: SFTP_HOST, SFTP_USER, LFTP_PASSWORD (Umgebungsvariablen) und ein
# fertiges dist/ (bash tools/build.sh).
set -euo pipefail
cd "$(dirname "$0")/.."

ZIEL=website

lftp_run() {
  lftp -c "
    set sftp:auto-confirm yes
    set net:max-retries 3
    set net:timeout 30
    open --env-password -u \"$SFTP_USER\" sftp://$SFTP_HOST
    $1
  "
}

# Dateien, die nie auf den Server gehören (siehe tools/upload-ausschluss.txt)
intern() {
  case "$1" in
    .git/*|.github/*|.devserver/*|.gitignore|CLAUDE.md|GO-LIVE.md|tools/*|dist/*) return 0 ;;
  esac
  return 1
}

LETZTER=$( (lftp_run "cat $ZIEL/.deploy-sha" 2>/dev/null || true) | tr -d '[:space:]')

if [ -n "$LETZTER" ] && git cat-file -e "${LETZTER}^{commit}" 2>/dev/null; then
  echo "Letzter Upload: $LETZTER – übertrage nur Änderungen"
  rm -rf staging && mkdir staging

  git diff --no-renames --name-only --diff-filter=ACMT "$LETZTER" HEAD | while read -r f; do
    intern "$f" && continue
    if [ -f "dist/$f" ]; then
      mkdir -p "staging/$(dirname "$f")"
      cp -p "dist/$f" "staging/$f"
    fi
  done

  # Bei jedem Build neu erzeugt (Domain/Inhalt können sich ändern) – sind klein
  cp -p dist/sitemap.xml dist/robots.txt dist/404.html staging/
  mkdir -p staging/mitteilungen && cp -p dist/mitteilungen/*.html staging/mitteilungen/

  LOESCHEN=""
  while read -r f; do
    [ -z "$f" ] && continue
    intern "$f" && continue
    LOESCHEN="$LOESCHEN
    rm -f \"$ZIEL/$f\""
  done < <(git diff --no-renames --name-only --diff-filter=D "$LETZTER" HEAD)

  echo "Hochladen: $(find staging -type f | wc -l) Dateien · Löschen: $(printf '%s' "$LOESCHEN" | grep -c 'rm -f' || true) Dateien"
  lftp_run "mirror --reverse --verbose=1 --parallel=4 staging/ $ZIEL/
    $LOESCHEN"
else
  echo "Kein früherer Upload gefunden – vollständiger Abgleich"
  lftp_run "mirror --reverse --delete --verbose=1 --parallel=4 --exclude-glob .deploy-sha dist/ $ZIEL/"
fi

git rev-parse HEAD > .deploy-sha-neu
lftp_run "put .deploy-sha-neu -o $ZIEL/.deploy-sha"
echo "Fertig – Stand $(git rev-parse --short HEAD) ist online in /$ZIEL."
