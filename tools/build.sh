#!/usr/bin/env bash
# Baut den Upload-Ordner dist/ für den Strato-Webspace.
#
#   bash tools/build.sh          -> dist/
#   bash tools/build.sh --zip    -> zusätzlich tsv-website-upload.zip (für FileZilla)
#
# Enthält alles außer internen Dateien (siehe tools/upload-ausschluss.txt),
# erzeugt die Mitteilungsseiten mit der echten Domain (Linkvorschau) und legt
# sitemap.xml und robots.txt an. Wird auch von der GitHub Action benutzt.
set -euo pipefail
cd "$(dirname "$0")/.."

SITE_URL="${SITE_URL:-https://tsv-hessental.de/}"

rm -rf dist
mkdir dist
# Kopieren mit Dateidatum (wichtig für „nur geänderte Dateien hochladen“)
tar --exclude-from=tools/upload-ausschluss.txt -cf - . | tar -xpf - -C dist

# Mitteilungen aus content/mitteilungen: js/mitteilungen.js und Einzelseiten mit
# echter Domain erzeugen, danach Werkzeuge und Quelltexte entfernen
SITE_URL="$SITE_URL" node dist/tools/mitteilungen.js
rm -rf dist/tools dist/content

# Cache-Busting für die erzeugte Liste: Version = Prüfsumme des Inhalts
# (ändert sich mit jeder Mitteilung, ohne dass jemand die Version erhöhen muss)
MV=$(md5sum dist/js/mitteilungen.js | cut -c1-12)
sed -i -E "s#js/mitteilungen\.js\?v=[0-9a-f]*\"#js/mitteilungen.js?v=$MV\"#" dist/index.html dist/archiv-mitteilungen.html

# 404-Seite: Pfade immer ab der Startseite auflösen (auch bei /alte/adresse/…)
sed -i 's|<head>|<head>\n  <base href="/">|' dist/404.html

# robots.txt und sitemap.xml
printf 'User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: %ssitemap.xml\n' "$SITE_URL" > dist/robots.txt
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  (cd dist && find . -name '*.html' ! -name '404.html' ! -path './admin/*' | sed 's|^\./||' | sort) | while read -r f; do
    if [ "$f" = "index.html" ]; then loc="$SITE_URL"; else loc="$SITE_URL$f"; fi
    echo "  <url><loc>$loc</loc></url>"
  done
  echo '</urlset>'
} > dist/sitemap.xml

echo "Upload-Ordner dist/ fertig ($(find dist -type f | wc -l) Dateien, $(du -sh dist | cut -f1)) für $SITE_URL"

if [ "${1:-}" = "--zip" ]; then
  rm -f tsv-website-upload.zip
  (cd dist && zip -qr ../tsv-website-upload.zip .)
  echo "ZIP: tsv-website-upload.zip ($(du -h tsv-website-upload.zip | cut -f1))"
fi
