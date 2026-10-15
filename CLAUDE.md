# TSV Hessental – Testwebsite

Statische Website (HTML/CSS/JS, kein Build). Veröffentlicht über GitHub Pages:
https://jannelrnzn.github.io/tsv_hessental_testwebsite/

## Arbeitsweise

- **Cache-Busting:** CSS/JS werden mit `?v=JJJJMMTTHHMM` eingebunden. Nach JEDER Änderung an
  `css/` oder `js/` die Version in allen HTML-Seiten erhöhen:
  `V=$(date -u +%Y%m%d%H%M); sed -i -E "s/\?v=[0-9]{12}/?v=$V/g" *.html && node tools/mitteilungen.js`
  (sponsoren.js übernimmt die Version von main.js automatisch).

- Änderungen direkt auf `main` pushen, damit sie unter GitHub Pages sichtbar sind.
- Antworten und Commit-Messages auf Deutsch.
- Bilder, die über die GitHub-Weboberfläche hochgeladen werden, landen oft im
  Repo-Root oder mit Originalnamen – an die richtige Stelle verschieben,
  sinnvoll umbenennen und auf max. 2400 px Breite verkleinern.

## Termine

- **Am 01.10.2027:** Jannes Anschrift im Impressum (`impressum.html`, „Verantwortlich
  für den Inhalt nach § 18 Abs. 2 MStV“) ändern auf **Annemarie-Griesinger-Ring 23,
  74523 Schwäbisch Hall** (bisher Wirtsgasse 25). Nicht vorher ändern.

## Offene Punkte (Stand 5.10.2026 – beim Erledigen hier streichen)

- **Inhalte, die Janne noch liefert:**
  - Antworten zu den offenen Fragen der Zeitreise (siehe Abschnitt Bilder)
  - Spielbericht A3-Abstiegsrunde (`2026-10-12-a3-abstiegsrunde`): letztes Quali-Spiel
    SG Eutendorf/Ottendorf – TSV Hessental (wird noch ausgetragen, vermutlich vor Go-live)
    → Ergebnis + Text am Ende der Ergebnisliste der Ersten ergänzen (vor dem Abschnitt „Die zweite Mannschaft in der Kreisliga B6“).
- **Fehlende Fotos** (Platzhalter erscheint automatisch, Dateiname = vorname-nachname.jpg):
  - Trainer `assets/images/team/`: Benjamin Bradtke (D + F), Julian Schneider (D),
    Erik Nizezki, Johann Schwab (E), Berkan Celik, Adrian Haag, Sead Begtasevic,
    Waldemar Fichter, Joah Bäumlisberger, Maxim Lotz, Mattias Teinert (F),
    Andreas Schneider, Andrija Martinovic, Manuel Arcis (Bambini)
  - Schiedsrichter `assets/images/schiedsrichter/`: Erik Kronmüller, Ricardo
    Kosche, Rolf Baumann
  - Marvin Lamm (`assets/images/dart/`), Christine Schmidt (`assets/images/kurse/`)
  - Gisela Böhm (Vorstand, bisher `assets/images/Vorstand/platzhalter.png`)
- **Alte Seite (Entscheidung Janne, 14.10.2026):** wird beim Go-live gesichert, vorerst wird
  NICHTS weiter übernommen (Pilates/Rückenfit, alte Spielberichte, Pokal-Seiten, Bambini-Cup,
  Dart DLH-Pokal, Jubiläumstexte, Puzzles, Liga-Archiv, Linkliste). Bei Bedarf später aus der Sicherung.
- **Prüfen:** FuPa- und fussball.de-Widgets auf der Live-Seite (hier im Container
  nicht testbar); Datenschutzerklärung gegenlesen lassen, v. a. Rechtsgrundlage
  lit. f für die direkt eingebundenen Dienste.
- **Go-live / danach:** siehe nächster Abschnitt (Strato, AVV, Kontaktformular-Test,
  GitHub Action, Pages abschalten).
- **Ganz zum Schluss (nach allem anderen):** Tarifwechsel bei Strato prüfen.

## Finale Abstimmung vor Go-live (13.10.2026) – NOCH NICHT UMSETZEN, erst Rückfragen klären

1. Jubiläumszeitschriften – Seite `archiv-jubilaeumszeitschriften.html` (Archiv-Menü),
   100 Jahre (2023) online; 50/75 Jahre folgen ggf.
2. ~~Beitrag über Überdachung~~ erledigt (Mitteilung 30.09.2026 mit Foto)
3. Impressum + Datenschutz verifizieren – erledigt: fussball.de im Haftungshinweis,
   Strato als Hoster + AVV-Satz, „Stand: Oktober 2026“. Kein Datenschutzbeauftragter
   nötig (Janne). Impressum: Steuernummer-Zeile entfernt (keine USt-IdNr.), Verantwortlich
   nach § 18 Abs. 2 MStV = Janne, „Gestaltung & Umsetzung“ Janne + Dieter Erdmann (alt).
   AVV mit Strato besteht (erstmals 25.05.2018, zuletzt 07.03.2025 abgeschlossen) – erledigt.
4. fussball.de-Widgets für Jugend – WARTEN, Janne meldet sich mit den Codes
5. Dart-Liga-Widget – WARTEN, Janne meldet sich
6. ~~Sponsoren in Klassen~~ erledigt (Hauptsponsor / Exklusiv-Partner / Teampartner)
7. ~~Stadionhefte 2026/27~~ erledigt (5 Hefte FANPOST, von der alten Seite übernommen)
8. Kalender: vorerst NICHT. Stattdessen Box „Nächste Termine“ auf der Startseite (erledigt)
9. ~~Werbepartner werden~~ erledigt: Preisbild ersetzt durch HTML-Preistabelle + Pakete
   (Bronze/Silber/Gold/Diamant/Individual, Preise „auf Anfrage“) aus Werbevertrag 2026.
10. Fahrradgruppe – Seite `freizeit-fahrradgruppe.html` angelegt (Platzhalter), Menü „Kurse“
    heißt jetzt „Kurse & Freizeit“. Wartet auf Ansprechpartner, Termine, Treffpunkt.
11. ~~Gasteltern-Beitrag~~ erledigt (Mitteilung 02.10.2026, U12 Bundesliga Cup, Link zur Anmeldeseite)

## Hosting / Go-live (geplant Freitagabend/-nacht 16./17.10.2026)

- Strato-Paket „Hosting Pro“ (Vertrag des Vereins seit 2006), Domain
  tsv-hessental.de inkl. E-Mail hängt daran. Zugang (Kundenlogin + SFTP)
  bekommt Janne selbst. Kundenlogin: https://www.strato.de/login/
- Ablauf: alte Seite sichern → Dateien per SFTP in eigenen Ordner (ohne `.git`,
  `.devserver`, `.gitignore`, `CLAUDE.md`) → Test über Subdomain → Domain-Ziel
  umstellen. Mail-Einstellungen der Domain nicht anfassen.
- **Alte Seite = WordPress** (Theme Accelerate Pro + ca. 20 Plugins) mit MySQL-Datenbank bei
  Strato → Sicherung = Dateien per SFTP (Server 51307960.ssh.w1.strato.hosting) UND Datenbank-Export.
  Zugangsdaten stehen in Jannes Vereinstabelle „Sesam“ (Dropbox) – NIE in Chat/Repo übernehmen.
  Strato-Kundenlogin steht dort in der Zeile „Provider Strato“ (Spalte Passwort = echte Passwörter);
  Janne ist am 14.10.2026 erfolgreich eingeloggt. Aktuelle Datenbank: dbs16037730 (Export per phpMyAdmin).
- **Nach dem Go-live kündigen/aufräumen:** WordPress-Plugin-Abos: „Shortcodes Ultimate Pro“
  am 14.10.2026 von Dieter Erdmann gekündigt (alte Seite läuft seitdem mit Free-Version, teils
  eingeschränkt); noch prüfen: „Max Mega Menu Pro“ (Updates bis 18.02.2027);
  übrige Plugin-/Theme-Lizenzen sind Einmalkäufe (nichts zu tun). Später alte WordPress-Dateien,
  Demo-Seite und Datenbank bei Strato löschen. FTP- und E-Mail-Passwörter ändern (Tabelle lag
  in einem geteilten Dropbox-Ordner). FuPa-Login bleibt; Google-Kalender wohl nicht mehr nötig.
- **Stand Webspace (14.10.2026):** Domain tsv-hessental.de = „Umleitung Intern“ auf das
  Stammverzeichnis `/`, dort liegt WordPress (wp-admin, wp-content, wp-includes, cgi-bin, cgi-data).
  Strato erlaubt als neues Ziel NUR Unterordner; Änderungen nur in derselben Sitzung umkehrbar →
  kein späteres Zurück auf die alte Seite. Ablauf: neue Seite nach `/website` hochladen, Test über
  Subdomain (z. B. test.tsv-hessental.de → /website), erst dann Hauptdomain auf /website umstellen
  und in derselben Sitzung live prüfen. Ziel der GitHub Action später: `/website`.
  `noreply@` ist angelegt (Umleitung an verwaltung@), AVV besteht.
  SFTP-Benutzer (Strato → SFTP & SSH): `stu440994156` (SFTP + SSH, Startverzeichnis /) und
  `stu159484164` (nur SFTP, früher admin@tsv-hessental.de – bevorzugt, Passwort laut Sesam); Server 51307960.ssh.w1.strato.hosting (laut Strato, NICHT mehr ssh.strato.de), Port 22. PHP 8.4 (PHP-Boost an).
  BackupControl: automatische Strato-Backups täglich/wöchentlich (zurück bis 20.09.2026). Keine Cron-Jobs.
  Jannes Laptop (Firmen-VPN/Proxy) blockiert Port 22 → FileZilla nur am privaten PC.
  **E-Mail-Filter bei Strato (Hinweis Dieter Erdmann):** Muster je Postfach = „Umleiten nach …“ + danach
  „Verwerfen“ (sonst laufen ungelesene Postfächer voll). Andere Postfächer/Filter NICHT ändern;
  fussball-herren@ hat bewusst keine Weiterleitung (Markus Gerstenberg liest per Strato-Mail).
  admin@tsv-hessental.de (Postfach „admin@[Alle Domains]“): Filter „Umleitung Webmaster“ leitet seit
  15.10.2026 an Jannes private Gmail-Adresse um (vorher an Dieter Erdmann), danach „Verwerfen“.
  Dieter hat am 14.10.2026 Dateien + Datenbank der alten Seite selbst gesichert. Fehler 413 auf der
  alten Seite seit ~8.10. (nicht durch uns) → Kontaktformular mit Anhang 3–4 MB testen.
  Google-Konto des alten Termin-Kalenders hat Dieter Erdmann am 14.10.2026 gelöscht (neue Seite
  braucht es nicht).
- **Vorbereitet (14.10.2026):** Anleitung `GO-LIVE.md` (Teil A–D). `tools/build.sh` baut `dist/`
  (ohne interne Dateien laut `tools/upload-ausschluss.txt`, Mitteilungsseiten mit
  SITE_URL=https://tsv-hessental.de/, sitemap.xml, robots.txt, `<base href="/">` in 404.html;
  `--zip` erzeugt tsv-website-upload.zip). GitHub Action `.github/workflows/upload-strato.yml`:
  bei Push auf main → `tools/build.sh` → `tools/deploy.sh` (lftp/SFTP nach `website/`; überträgt nur
  per `git diff` seit dem Commit in `website/.deploy-sha` geänderte Dateien + Mitteilungen/sitemap/
  robots/404, löscht entfernte; ohne .deploy-sha vollständiger Abgleich); ohne Secrets STRATO_SFTP_USER /
  STRATO_SFTP_PASSWORD wird sie übersprungen. `.htaccess` (www → ohne www, 404, keine
  Verzeichnislisten, Cache) und `404.html` liegen im Repo-Root.
- Nach dem Go-live: Standardwert von `SITE_URL` in `tools/mitteilungen.js` auf
  https://tsv-hessental.de/ umstellen und Skript neu ausführen.
- kontakt.php am 15.10.2026 auf test.tsv-hessental.de erfolgreich getestet (Mail kommt an,
  Antworten geht an Absender). verwaltung@ leitet um an Thilo, Marco Ebinger und Janne (seit 15.10.).
- Nach dem Go-live: GitHub Pages abschalten.
- **Entschieden (Janne):** Änderungen nach dem Go-live laufen weiter über GitHub
  und werden **automatisch per GitHub Action (SFTP) zu Strato** hochgeladen –
  bei jedem Push auf `main`, nur geänderte Dateien. Zugangsdaten trägt Janne
  selbst als Repository-Secrets ein (nie in Chat oder Code). Keine eigene
  Testumgebung; Änderungen vorher lokal prüfen. Action zum Go-live einrichten.
- **Ganz am Ende erinnern:** Tarifwechsel bei Strato prüfen (alter Tarif,
  vergleichsweise teuer) – erst wenn alles andere erledigt ist.

## Mitteilungen & Spielberichte

- Inhalt nur in `js/mitteilungen.js` (Liste `MITTEILUNGEN`, neueste zuerst). Neue Mitteilung =
  neuer Eintrag ganz oben mit `id` (`JJJJ-MM-TT-stichwort`, später nie ändern), `datum`,
  `titel`, `text`; optional `kategorie: "spielbericht"`, `teaser` (eigener Kurztext), `komplett: true`
  (ganzer Text statt Teaser), `bilder`, `archiv: true`.
  Automatischer Teaser = erste ca. 100 Zeichen (`NEWS_TEASER_LENGTH` in js/main.js).
- **Danach immer `node tools/mitteilungen.js`** ausführen: erzeugt je Eintrag
  `mitteilungen/<id>.html` (Kopf/Menü/Fuß aus `archiv-mitteilungen.html`, Pfade mit `../`,
  Linkvorschau-Tags, Neuer/Älter-Navigation, „Link kopieren“) und löscht veraltete.
  Dateien in `mitteilungen/` nie von Hand bearbeiten. Auch nach Menü-Änderungen und
  nach dem Cache-Busting erneut ausführen.
- Startseite (`initNews`, Teaser mit „Weiterlesen“): „Aktuelle Mitteilungen“
  (`data-news="latest"`, 3 neueste ohne Spielberichte) und darunter „Spielberichte“
  (`data-news="spielberichte"`, 3 neueste, Bereich ausgeblendet wenn leer).
  `archiv: true` = nicht mehr auf der Startseite.
- `archiv-mitteilungen.html` zeigt ALLE Einträge als Teaser mit Filter Alle/Mitteilungen/Spielberichte.
- Links im `text` so schreiben wie von der Startseite aus (`vorstand.html`) – das Skript passt sie an.
- Bilder unter `assets/images/mitteilungen/`. Einzelseite: erstes Bild groß in Textbreite (760 px)
  nach dem ersten Absatz (max. 80 % Bildschirmhöhe, Hochformat schmaler), weitere als
  Raster am Ende; Klick = Großansicht. Startseite/Archiv: kleines Vorschaubild neben dem Teaser.
- `SITE_URL` oben in `tools/mitteilungen.js` = Adresse für Linkvorschau (Umgebungsvariable
  SITE_URL überschreibt; `tools/build.sh` setzt die echte Domain).

## Nächste Termine (Startseite)

- Termine nur in `js/termine.js` (Liste `TERMINE`: `datum` JJJJ-MM-TT, `titel`, optional
  `info`), nur Text, Janne schickt sie. `initTermine` (js/main.js) zeigt die nächsten 3 als
  feste Liste nebeneinander (keine Slideshow), Wochentag automatisch, vergangene
  verschwinden ab dem Folgetag, ohne Termine bleibt die Box ausgeblendet.

## Sponsorenleiste

- Leiste „Danke an unsere Sponsoren“ unter dem Menü auf allen Seiten; wird von
  `js/main.js` (`initSponsorBar`) automatisch eingefügt, HTML-Seiten brauchen
  nichts. Daten in `js/sponsoren.js` (Liste `SPONSOREN`, `name` + `adresse`),
  zufällige Reihenfolge, Wechsel alle 4 s, Pause beim Drüberfahren.
- Bei neuen/entfallenen Werbepartnern `werbepartner.html` UND `js/sponsoren.js`
  anpassen.
- `werbepartner.html` nach Klassen (Tafel, Stand 10/2026): **Hauptsponsor** Stadtwerke
  (Logo + Link), **Exklusiv-Partner** (`.partner-card`, Name + Homepage verlinkt, alle 13 mit
  Link; Bricks & Mortar → Instagram, Adresse = Firmensitz Gersthofen; Logos (alle) unter
  `assets/images/sponsoren/logos/` (`.partner-card__logo`); Stadtwerke NUR als Hauptsponsor, nicht in der Liste), **Teampartner** =
  alle übrigen alphabetisch. Die frühere Einteilung Trikots/Bande/Fanpost/Spielerhütte
  ist entfallen.

## Erfolge (Archiv)

- `archiv-erfolge.html` zeigt alle Erfolge aus `js/erfolge.js` (Liste `ERFOLGE`:
  `saison`, `mannschaft`, `erfolg`, optional `datum`, `liga`, `text`, `bild`,
  `aufstellung` (Liste aus `titel` + `namen`), `link`, `linktext`).
  Reihenfolge egal – `initSuccesses` in `js/main.js` sortiert nach Saison und
  gruppiert nach Jahrzehnten (mit Sprungleiste). Bilder unter `assets/images/erfolge/`.
- Archiv-Menü auf allen Seiten: Mitteilungen, Erfolge, Jubiläumszeitschriften (alte Bilder gehören
  in den Hauptmenüpunkt „Bilder“).

## Bilder (Fotoalben)

- Menü „Bilder“: je Rubrik eine Seite `bilder-<rubrik>.html` (bisher:
  `bilder-hauptversammlung.html`, `bilder-dorfpokal.html` (Alben 2024, 2023, 2019, 2018,
  2017, 2016 – ältere von der alten Seite übernommen),
  `bilder-vereinsheimbau.html`, `bilder-terrassenueberdachung.html` (Bau 2026, verlinkt aus der
  Mitteilung 30.09.2026)), darin pro Anlass ein `.gallery-album`
  (neuestes oben) mit Datum, Titel, „Fotos: …“ und `<div class="gallery">`.
- Bilder: `assets/images/bilder/<rubrik>/<jahr oder anlass>/01.jpg …` plus
  Vorschaubilder in `thumbs/` (400 px hoch). Link = großes Bild, img = Vorschau.
- `initGalleries` (js/main.js) macht daraus die Großansicht (Pfeile, Esc, Wischen).
- `bilder-zeitreise.html`: zwei Zeitstrahl-Abschnitte „Die Anfänge“ (bis 1968) und
  „Ab 2000“, je älteste zuerst, „Ohne Jahr“ am Ende, aus
  `article.timeline-item` mit Jahr, Titel, Foto(s) und optional
  `dl.archive-lineup`; Sprungleiste `.timeline-jump`. Bilder unter
  `assets/images/bilder/zeitreise/JJJJ-mannschaft.jpg`. Großansicht über
  gemeinsames `data-gallery` um beide Abschnitte.
- `bilder-spielerlegenden.html`: Inhalt 1:1 von der alten Seite (Vereinsleben mit
  3 Bildern + 25 Passfotos nach Jahrgang, unter jedem Namen „Jg. JJJJ“), Bilder unter
  `assets/images/bilder/spielerlegenden/nachname-vorname-jahrgang.jpg`.
- Offene Fragen Zeitreise (Janne klärt noch; bis dahin KEINEN Erfolge-Eintrag
  anlegen, nur Zeitstrahl):
  - 2008/09 1. Mannschaft: Feier mit Fahnen – welcher Titel/Liga?
  - „Ohne Jahr“ ab 2000, Bild C (`ab-2000-ohne-jahr-herren-1-c.jpg`) mit
    Meisterschale – welches Jahr, welcher Titel?
  - 2005/06 und 2006/07: Erfolg oder normale Mannschaftsfotos?
  - Jahreszahlen der drei „Ohne Jahr“-Fotos bis 1970 und der drei ab 2000;
    Saison 1948 (1947/48 oder 1948/49?) und Jahr des zweiten B-Klasse-Meisters.
- Bewusst NICHT übernommen (Janne): Trainingslager, Stadtmeisterschaft,
  Feiern, Arbeitsdienst.

## Downloads (PDF)

- Jubiläumszeitschriften: `archiv-jubilaeumszeitschriften.html`, Dateien unter
  `assets/downloads/jubilaeum/`. Stadionhefte: `fussball-herren-stadionhefte.html`,
  Dateien unter `assets/downloads/stadionhefte/JJJJ/fanpost-JJJJ-MM-TT.pdf` (nur aktuelle
  Saison), Titelbild = Seite 1 per `pdftoppm -r 60` nach `cover/`; Karte mit Datum,
  „Gäste: …“, Größe/Seiten, neuestes zuerst.
  **Neue Stadionhefte schickt Janne direkt** (PDF + Datum + Gäste) → Karte oben ergänzen.
- Je Datei eine `article.doc-card` in `.doc-grid` (Vorlage als Kommentar in der
  Seite), optional Cover-Bild; Platzhalter `.doc-empty` entfernen, sobald Dateien da sind.

## Kontaktformular

- `kontaktformular.html` sendet an `kontakt.php` (PHP, läuft erst bei Strato, nicht
  auf GitHub Pages – dort zeigt `initContactForm` nur eine Testmeldung).
- Empfänger `verwaltung@tsv-hessental.de`, Absender `noreply@tsv-hessental.de`
  (oben in `kontakt.php` einstellbar; Absender muss eine Adresse der eigenen
  Domain bei Strato sein). Antworten gehen per Reply-To an den Besucher.
- Spamschutz: Honeypot-Feld `website`, Mindestzeit 3 s (`ts`), max. 3 Links,
  max. 5 Nachrichten/Stunde/IP. Anlage optional: PDF/JPG/PNG/Word, max. 5 MB.

## Datenschutz: externe Inhalte (2-Klick-Lösung)

- **Derzeit AUSGESCHALTET** (Janne, Okt. 2026): `CONSENT_ABFRAGE = false` in
  `js/main.js` – Inhalte laden direkt. Wieder einschalten: `true` setzen.
  Markup (`data-consent…`) bleibt unverändert stehen.
  Die Datenschutzerklärung beschreibt derzeit die Direkteinbindung (lit. f);
  die Texte zur Zustimmungsversion samt Widerruf-Button stehen dort als
  HTML-Kommentar und müssen beim Wiedereinschalten zurückgetauscht werden.

- FuPa, fussball.de und Google Maps werden NIE direkt geladen. Container bekommen
  `data-consent="fupa|fussballde|googlemaps"`, Skripte `type="text/plain"
  data-consent-src="…"`, iframes `data-consent-src="…"` statt `src`.
- `initConsentEmbeds` (js/main.js) zeigt einen Hinweis mit „Inhalt laden“ und
  optional „merken“ (localStorage `tsv-consent-<dienst>`); Widerruf-Button
  `#consent-reset` auf der Datenschutz-Seite. Neue Dienste in `CONSENT_SERVICES`
  ergänzen UND in der Datenschutzerklärung beschreiben.

## Mannschaftsarchiv Fußball Herren (1. & 2. Mannschaft)

- 1. und 2. Mannschaft sind auf demselben Mannschaftsfoto; beide Seiten
  (`fussball-herren-1.html`, `fussball-herren-2.html`) zeigen das aktuelle
  Foto NICHT (ist im FuPa-Widget enthalten), sondern nur einen kleinen Link
  „Mannschaftsfoto JJJJ/JJ herunterladen“ (`.download-link`) über dem Widget.
  Die Aufstellung der aktuellen Saison liegt als HTML-Kommentar in
  `fussball-herren-1.html` bereit. Die Archiv-Buttons 1–13 stehen in einem
  eigenen Bereich „Frühere Mannschaften“ ganz unten (`#archiv`).
- Saisonseiten (Archiv): Überschrift „Fußball Herren JJJJ/JJ“ über dem Foto,
  darunter Foto + Aufstellung, darunter die Archiv-Buttons 1–13.
- Button 1 = aktuelle Saison und verweist auf die aktuelle Mannschaftsseite selbst
  (keine eigene Archivseite).
- Buttons 2–13 = Saisonseiten `fussball-herren-1-JJJJ.html` (z. B. `-2526` für
  2025/26), gemeinsam für beide Mannschaften.
- Fotos: `assets/images/archiv/herren-1/JJJJ.jpg`. 2014/15–2018/19 gibt es getrennte
  Fotos: 1. Mannschaft (`herren-1/`) und 2. Mannschaft (`herren-2/JJJJ.jpg`) als
  zwei `figure`s untereinander; ab 2019/20 ein gemeinsames Foto.
- Aufstellung unter dem Foto als `<dl class="archive-lineup">`
  (Stehend hinten / Stehend mittig / Sitzend, jeweils v.l.n.r.).

## Senioren

- `fussball-herren-senioren.html` unter „Fußball Herren“ im Menü: Trainer Michael
  Frey (Foto aus `abteilungsleitung_fußball_aktive/`, Kontakt) und Patrick Walz
  (`team/patrick-walz.jpg`), Mannschaftsfoto `assets/images/senioren/` mit
  Aufstellung (Hallenstadtmeisterschaft 18.01.2025; Vize-Titel bewusst NICHT
  unter Erfolge), FuPa-Widget (Spielplan/Ergebnisse), kein fussball.de-Widget mehr.

## Mannschaftsarchiv Jugend (A-, B-, C-Junioren)

- Hauptseiten `fussball-jugend-a.html`, `-b.html`, `-c.html`: aktuelle Saison
  (Text/Liga und ggf. Foto) und unten „Frühere Mannschaften“ (`#archiv`).
- 10 Buttons: 1 = aktuelle Saison (Hauptseite), 2–10 = Saisonseiten
  `fussball-jugend-X-JJJJ.html` (z. B. `fussball-jugend-a-2526.html`).
- Saisonseiten wie bei den Herren: Überschrift „A-Junioren JJJJ/JJ“, darunter
  Liga als `<p class="archive-subtitle">`, Foto, Buttons.
- Fotos: `assets/images/archiv/jugend-X/JJJJ.jpg`. Aufstellungen mit Namen nur,
  wenn Janne sie liefert (nicht alle Jugendjahrgänge bekommen Namen).
- Saisons ohne Mannschaft (z. B. A-Junioren 2018/19, aktuell 2026/27): kein
  Foto-Platzhalter, nur der Hinweistext.
- D-Junioren und jünger bekommen kein Archiv.
- D- und E-Junioren: nur aktuelle Seite (Trainer + fussball.de-Widget), kein
  Archiv. Trainerfotos unter `assets/images/team/vorname-nachname.jpg`; fehlt
  ein Foto, erscheint automatisch ein Platzhalter. E1 = Quali-Staffel 19,
  E2 = Quali-Staffel 20 (Stand 2026/27).
- F-Junioren (`fussball-jugend-f.html`) und Bambini (`fussball-jugend-bambini.html`):
  nur Trainerteam (gleiche Personenkarten mit Platzhalter), kein Widget, kein Archiv.

### Saisonwechsel (Janne meldet sich dazu)

Beispiel Wechsel von 2026/27 auf 2027/28:

1. Neue Archivseite `fussball-herren-1-2627.html` aus einer bestehenden
   Saisonseite erzeugen, mit Foto `2627.jpg`, Liga-Unterzeile und der
   Aufstellung aus dem HTML-Kommentar in `fussball-herren-1.html`.
2. Neues Foto `2728.jpg` ablegen, Download-Link auf beiden Hauptseiten auf
   2027/28 umstellen, neue Aufstellung wieder als Kommentar hinterlegen.
3. Button-Leisten auf allen Seiten neu setzen: 1 = aktuelle Seite,
   2 = 2026/27, … 13 = älteste Saison; die dann älteste Saisonseite entfällt.
4. Menütexte „1./2. Mannschaft 2026/27“ in der Navigation aller Seiten anpassen.
5. Jugend-Archive (A/B/C) analog umstellen: neue Saisonseite für 2026/27,
   Buttons neu setzen, älteste Saisonseite entfällt.
