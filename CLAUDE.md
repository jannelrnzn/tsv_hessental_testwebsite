# TSV Hessental – Testwebsite

Statische Website (HTML/CSS/JS, kein Build). **LIVE seit 16.10.2026 unter https://tsv-hessental.de/**
(Strato, Ordner `/website`). Jeder Push auf `main` wird automatisch per GitHub Action dorthin hochgeladen –
also nur geprüfte Änderungen pushen. GitHub Pages ist seit 16.10.2026 abgeschaltet.

## Arbeitsweise

- **Cache-Busting:** CSS/JS werden mit `?v=JJJJMMTTHHMM` eingebunden. Nach JEDER Änderung an
  `css/` oder `js/` die Version in allen HTML-Seiten erhöhen:
  `V=$(date -u +%Y%m%d%H%M); sed -i -E "s/\?v=[0-9]{12}/?v=$V/g" *.html && node tools/mitteilungen.js`
  (sponsoren.js übernimmt die Version von main.js automatisch).

- Änderungen direkt auf `main` pushen → nach ca. 1 Minute live auf tsv-hessental.de (Action „Upload zu Strato“
  muss grün sein). Vorher lokal prüfen (python3 -m http.server + Playwright).
- Antworten und Commit-Messages auf Deutsch.
- Bilder, die über die GitHub-Weboberfläche hochgeladen werden, landen oft im
  Repo-Root oder mit Originalnamen – an die richtige Stelle verschieben,
  sinnvoll umbenennen und auf max. 2400 px Breite verkleinern.

## Seitenkopf (roter Balken)

- Einleitungstext unter der Überschrift: nach jedem Satz `<br>` (Wunsch Dieter Erdmann, besser lesbar), volle Breite
  (keine max-width), ebenso die Startseiten-Überschrift (`.hero__content`). Zusatzhinweise mit `<br><br>` als
  eigener Absatz dort statt gelber Box (z. B. Pflichtfelder im Kontaktformular). Gelb (`.hinweis-marker`) nur,
  wenn ausdrücklich gewünscht (Eltern-Kind-Turnen).
- Links darin sind weiß, fett und unterstrichen (`.page-header .container > p a`), sonst rot auf rot unsichtbar.

## Navigation

- Handy-Menü (☰) schon bis 1280 px Breite (`@media (max-width: 1280px)` in css/style.css), damit die
  Kopfzeile auch bei Browser-Zoom (Strg +) und Windows-Schrift einzeilig bleibt (Hinweis Dieter Erdmann).
  Menüpunkte haben eine feste Höhe (2.1rem), „TSV Hessental“ im Logo bricht nie um.
- Fußzeile: Logo + „Tradition unterm Einkorn“ | Schnellzugriff (Mitglied werden, Mitteilungen, Vorstand,
  Werbepartner werden) | Kontakt (Adresse Im Wachholder, Kontaktformular, E-Mail, Anfahrt); unten nur
  Datenschutz + Impressum.
- Logo in Kopf UND Fuß identisch: Wappen + „TSV Hessental“ + darunter „1923 e.V.“ (`.logo__text-sub`),
  Abstand Wappen–Schriftzug 1.1rem. Im Fuß darunter nur „Tradition unterm Einkorn“ (`.footer-brand__claim`).

## Vorstand

- `vorstand.html`: aktuelle Vorstandschaft als Karten, darunter `#vorstaende` „Die Vorstände seit
  Vereinsgründung“ (Tabelle 1923–heute, von der alten Seite, Wunsch Dieter Erdmann). Bei Vorstandswechsel
  dort die letzte Zeile („seit JJJJ“) anpassen und neue Zeile anfügen.
- `initHashTarget` (js/main.js) hält Sprungziele (#anker) bis 8 s fest, weil Widgets oberhalb nachladen
  (Hinweis Dieter: Breadcrumb „Der Verein“ → index.html#verein landete zu hoch).

## Hinweise hervorheben

- Wichtige Hinweise (z. B. „Gruppe voll, Warteliste“) mit `<p class="hinweis-marker">` – gelb wie Textmarker
  (Wunsch Dieter Erdmann, erstmals Eltern-Kind-Turnen auf `turnen-kinderturnen.html`).

## Logo & Icons

- Vereinslogo (optimiert von Dieter Erdmann, 16.10.2026): `assets/images/logo/vereinslogo.png` (815×990,
  Original), `vereinslogo-100x121.png` (Kopf/Fuß, 44 px hoch), `vereinslogo-58x70.png`. Das alte Logo mit
  grauem Rand ist entfernt.
- Favicon `favicon.ico` (Repo-Root, 48 px) = von Dieter Erdmann selbst optimiert (16.10.2026) – NICHT neu erzeugen.
  Homescreen: `apple-touch-icon.png` (weiß, 180) und Manifest `icon-192/512.png` (transparent, „any“) –
  Wappen ca. 70 % hoch. KEIN maskable-Icon mehr (Chrome/Edge haben es angeschnitten, Firefox mit „any“
  sah am besten aus – Test Dieter Erdmann 16.10.2026). Weißer Hintergrund kommt vom Android-Launcher.
  Aus `vereinslogo.png` erzeugt (ImageMagick `-resize x… -extent`).

## Termine

- **Am 01.10.2027:** Jannes Anschrift im Impressum (`impressum.html`, „Verantwortlich
  für den Inhalt nach § 18 Abs. 2 MStV“) ändern auf **Annemarie-Griesinger-Ring 23,
  74523 Schwäbisch Hall** (bisher Wirtsgasse 25). Nicht vorher ändern.

## Offene Punkte (Stand 5.10.2026 – beim Erledigen hier streichen)

- **Inhalte, die Janne noch liefert:**
  - Antworten zu den offenen Fragen der Zeitreise (siehe Abschnitt Bilder)
- **Strato-Postfach verwaltung@ aufräumen (später, keine Eile):** alte Mail-Kopien (~250 KB) löschen – Thilo
  fragen, ob er das Passwort hat; sonst bei Strato neues Passwort setzen (vorher Thilo fragen, ob er das
  Postfach direkt in Outlook/Handy nutzt), Webmail https://webmail.strato.de/appsuite/, Papierkorb leeren.
- **Fehlende Fotos** (Platzhalter erscheint automatisch, Dateiname = vorname-nachname.jpg):
  - Trainer `assets/images/team/`: Benjamin Bradtke (D + F),
    Erik Nizezki, Johann Schwab (E), Berkan Celik, Adrian Haag, Sead Begtasevic,
    Waldemar Fichter, Maxim Lotz, Mattias Teinert (F),
    Andreas Schneider, Andrija Martinovic (Bambini)
  - Schiedsrichter `assets/images/schiedsrichter/`: Erik Kronmüller, Ricardo
    Kosche, Rolf Baumann
  - Marvin Lamm (`assets/images/dart/`), Christine Schmidt (`assets/images/kurse/`)
  - Gisela Böhm (Vorstand, bisher `assets/images/Vorstand/platzhalter.png`)
- **Alte Seite (Entscheidung Janne, 14.10.2026):** wird beim Go-live gesichert, vorerst wird
  NICHTS weiter übernommen (Pilates/Rückenfit, alte Spielberichte, Pokal-Seiten, Bambini-Cup,
  Dart DLH-Pokal, Puzzles, Liga-Archiv, Linkliste). Bei Bedarf später aus der Sicherung.
  Ausnahme (16.10.2026, Wunsch Janne nach Hinweis Dieter Erdmann): Vereinsjubiläen 50/75/100 Jahre
  und die übrigen Galerien (Feiern, Vatertag, Weihnachtsmarkt, Arbeitsdienst,
  Trainingslager, Stadtmeisterschaft, Pokalfinale) sind übernommen – siehe „Vereinsjubiläen“ und „Bilder“.
- **Prüfen:** FuPa- und fussball.de-Widgets auf der Live-Seite (hier im Container
  nicht testbar); Datenschutzerklärung gegenlesen lassen, v. a. Rechtsgrundlage
  lit. f für die direkt eingebundenen Dienste.
- **Go-live am 16.10.2026 erledigt** (Domain → `/website`, www/http-Weiterleitung und Kontaktformular geprüft).
  GitHub Pages abgeschaltet (16.10.). Danach noch: Test-Subdomain `test` und alte WordPress-Dateien/Datenbank nach
  2–4 Wochen löschen, Passwörter ändern, Max Mega Menu Pro prüfen (siehe Hosting-Abschnitt).
  Direkt nach der Umstellung gelegentlich „503“ auf tsv-hessental.de (nicht auf test.) – beobachten,
  bei Dauerproblem Strato-Support.
- **WordPress-Reste im Webspace-Hauptverzeichnis (22.10.2026):** Dieter Erdmann löscht sie (Freigabe Janne).
  Vorgaben: keine Domain/Subdomain mehr auf `/`; Haupt-`.htaccess` erst in `.htaccess-alt` umbenennen und
  http→https + Startseite prüfen (wirkt auch auf `/website`); `.user.ini` + `aios-bootstrap.php` zusammen löschen;
  `info.php` und `google7523512c84a3c277.html` dürfen weg; `website`, `cgi-bin`, `cgi-data`, `php.ini` (Inhalt
  noch unklar) bleiben. Danach Live-Seite prüfen, Datenbank dbs16037730 löschen, Max Mega Menu Pro kündigen.
- **Mitglieder-/Anwesenheits-App eines Kollegen (seit 27.10.2026, Freigabe Janne):** Subdomain
  `anmeldung.tsv-hessental.de` → A-Record 84.119.245.151 (Vodafone-Privatkunden-IP, Server vermutlich bei ihm zu
  Hause; IP evtl. dynamisch → ggf. CNAME auf DynDNS). Dort läuft seine Web-App „TSV Hessental · Anwesenheit“
  (nginx, leitet auf `/mitglied-werden`), gleiche App unter `https://tsv.sbitc.de/spieler`.
  Konzept: vollständiger Mitgliedsantrag wird NUR von Trainer/Admin in der App eingeleitet (nicht extern);
  `anmeldung.` = Mini-Variante mit Stammdaten, leitet weiter zu tsv.sbitc.de.
  Offen (Janne klärt mit Kollege + Rainer Brandtner als Vorstand): welche Stammdaten genau, wo gespeichert
  (Heimserver oder sbitc.de, wem gehört sbitc.de), Impressum-/Datenschutz-Links in der App, Zustimmung Vorstand,
  Vertraulichkeit/Backups. Danach: Datenschutzerklärung ergänzen; ggf. Button „Online anmelden“ auf
  `mitglied-werden.html`.
  **Umgesetzt 27.10.2026 (Janne):** Buttons „Online Mitglied werden“ → https://anmeldung.tsv-hessental.de auf
  `mitglied-werden.html` (ersetzt den PDF-Antrag, PDF gelöscht) und auf der Startseite (Hero). Menü-/Fußzeilen-Links
  „Mitglied werden“ zeigen weiter auf `mitglied-werden.html` (Infoseite mit Ansprechpartner Thomas Thiel).
  **Datenschutz ergänzt 28.10.2026:** Abschnitt „Online-Mitgliedsantrag“ in `datenschutzerklaerung.html` (Text von
  Janne/Kollege, geprüft): Betreiber SBITC GmbH, Geschwister-Scholl-Str. 21, 74523 Schwäbisch Hall (eigene Räume, AVV),
  Mailversand Microsoft 365 (DPF), WFV-Übermittlung für Spielerlaubnis, Löschfristen, Spam-Schutz (IP-Hash 2 Tage).
  Noch offen: Zustimmung Vorstand (Rainer).
  Postfach `anmeldung@tsv-hessental.de` bei Strato angelegt (28.10.2026, Passwort nur bei Janne/Kollege, NIE in
  Chat/Repo) – Kollege soll den App-Versand von Microsoft 365 auf Strato-SMTP (smtp.strato.de, 465/587) umstellen.
  Danach im Datenschutz-Abschnitt „Online-Mitgliedsantrag“ Microsoft 365 + USA-Satz durch Strato (AVV besteht)
  ersetzen – ERST nach bestätigter Umstellung. Filter „Umleitung zu Sead“: alle Mails → tsv@sbitc.de, danach Verwerfen.
- **Ganz zum Schluss (nach allem anderen):** Tarifwechsel bei Strato prüfen.

## Finale Abstimmung vor Go-live (13.10.2026) – NOCH NICHT UMSETZEN, erst Rückfragen klären

1. ~~Jubiläumszeitschriften~~ erledigt: Archiv → Vereinsjubiläen (`archiv-vereinsjubilaeen.html`)
   mit 50/75/100 Jahre (Texte + Bilder von der alten Seite übernommen, 16.10.2026).
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
10. ~~Fahrradgruppe~~ erledigt (23.10.2026): `freizeit-fahrradgruppe.html` „Fit durch Radeln – E-Bike-Touren“
    (freitags 18 Uhr Sportplatz, ca. 30 km, Einkehr), Übungsleiterin Susanne Rieck, Ansprechpartner Karl-Heinz
    Fischer (ohne Fotos), Galerie `assets/images/fahrradgruppe/` (4 Bilder + thumbs).
11. ~~Gasteltern-Beitrag~~ erledigt (Mitteilung 02.10.2026, U12 Bundesliga Cup, Link zur Anmeldeseite)

## Hosting / Go-live (erfolgt 16.10.2026)

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
- `SITE_URL` in `tools/mitteilungen.js` steht seit dem Go-live auf https://tsv-hessental.de/.
- kontakt.php am 15.10.2026 auf test.tsv-hessental.de erfolgreich getestet (Mail kommt an,
  Antworten geht an Absender). verwaltung@ leitet um an Thilo, Marco Ebinger und Janne (seit 15.10.); „Verwerfen“ dahinter hat
  Dieter Erdmann am 17.10.2026 ergänzt. Vorher aufgelaufene Mails (ca. 250 KB, nur Kopien) im Postfach löschen –
  Passwort des Postfachs hat wohl nur Thilo.
- GitHub Pages am 16.10.2026 abgeschaltet, lief aber wieder mit („pages build and deployment“ bei jedem Push) –
  am 19.10.2026 von Janne erneut abgeschaltet (Settings → Pages). Läuft der Job wieder, dort erneut prüfen.
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
- Teaser (`.news-item--teaser`) sind Karten wie `.partner-card` (4px roter Rand links, Schatten), 2rem Abstand (Wunsch Dieter Erdmann).
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
- Fußzeile: Stadtwerke-Logo (`.footer-sponsor`, max. 96 px hoch) verlinkt auf https://stadtwerke-hall.de/.
- Ansprechpartner Werbung = NUR Rainer Brandtner (1. Vorstand, Foto aus `Vorstand/`) auf `werbepartner.html`
  und `werbepartner-werden.html`. Markus Gerstenberg wollte am 21.10.2026 komplett raus (druckt nur Rechnungen) –
  NICHT wieder als Ansprechpartner eintragen.
- `werbepartner.html` Kopf: Box Ansprechpartner so breit, dass Name/E-Mail einzeilig sind (Schrift wie
  „Mitglied werden“), Link „Werbepartner werden →“ links unter dem Text (`.page-header__link`).
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
- Archiv-Menü auf allen Seiten: Mitteilungen, Erfolge, Hauptversammlungen, Vereinsjubiläen (alte Bilder
  gehören in den Hauptmenüpunkt „Bilder“).

## Hauptversammlungen (Archiv)

- `archiv-hauptversammlungen.html`: je HV ein `article.hv-bericht` (id `hv-JJJJ`, neueste oben) mit Datum,
  Titelbild `assets/images/archiv/hauptversammlungen/JJJJ.jpg`, fettem Leitsatz `.hv-lead`, Bericht,
  Ehrennadel-Tabelle (Gold/Silber/Bronze) und Button zur Galerie `bilder-hauptversammlung.html#hv-JJJJ`
  (Alben 2026–2017 unter `assets/images/bilder/hauptversammlung/JJJJ/`). 2016–2025 von der alten Seite
  übernommen (16.10.2026).
- HV-Protokolle als PDF online (Entscheidung Janne, 16.10.2026): `assets/downloads/hauptversammlung/
  JJJJ-MM-TT-hv-protokoll.pdf` (2022–2026), Button „Protokoll (PDF)“ neben dem Galerie-Button.
- NICHT veröffentlichen: Zeitungsartikel des Haller Tagblatts (Urheberrecht).
- Erfolge der Senioren (Meister 2022/2023, Hallenstadtmeister 2020/2024) stehen in `js/erfolge.js`.

## Vereinsjubiläen (Archiv)

- Übersicht `archiv-vereinsjubilaeen.html` (früher `archiv-jubilaeumszeitschriften.html`, Weiterleitung
  in `.htaccess`) mit drei Karten (Cover = Original-Titelseiten unter `assets/downloads/jubilaeum/cover/`, `.doc-card__cover` im
  Seitenformat 210/297, nicht beschnitten, alle gleich hoch) → `archiv-jubilaeum-2023.html` (Festzeitschrift-PDF + Galerie der
  Feier am 3.11.2023, 203 Bilder unter `assets/images/archiv/jubilaeum/2023/` + `thumbs/`),
  `archiv-jubilaeum-1998.html` und `archiv-jubilaeum-1973.html` (Kapitel aus den Festschriften,
  Sprungleiste, `section.jubi-kapitel`, Tabellen `.jubi-tabelle`, Bilder `.jubi-bilder` unter
  `assets/images/archiv/jubilaeum/1973|1998/`; Großansicht über `data-gallery`).
- Texte stammen 1:1 von der alten Seite (nur offensichtliche Tippfehler korrigiert, z. B. „lgnatz“,
  „7973“, „19. bis 18. Juni 1998“ → „18. bis 19. Juni 1998“).

## Bilder (Fotoalben)

- Menü „Bilder“: je Rubrik eine Seite `bilder-<rubrik>.html` (bisher:
  `bilder-hauptversammlung.html`, `bilder-dorfpokal.html` (Alben 2024, 2023, 2019, 2018,
  2017, 2016 – ältere von der alten Seite übernommen),
  `bilder-vereinsleben.html` (Vatertag 2017–2023, Weihnachtsmarkt 2017/2018, Abschlussfete 2016/17,
  Sportplatzputzete 2017; Hochzeitsfotos bewusst NICHT, Janne 16.10.2026), `bilder-fussball.html` (VfB-Fußballschule Wochenend-Camp Juli 2025 – Fotos von Dieter Erdmann, 17.10.2026; Hallenstadtmeisterschaft 18.01.2025
  Senioren + Aktive, Bezirkspokal-Finale 2017/18, Trainingslager Oberstdorf 2018) – beide 16.10.2026
  von der alten Seite übernommen –,
  `bilder-vereinsheimbau.html`, `bilder-terrassenueberdachung.html` (Bau 2026, verlinkt aus der
  Mitteilung 30.09.2026)), darin pro Anlass ein `.gallery-album`
  (neuestes oben) mit Datum, Titel, „Fotos: …“ und `<div class="gallery">`.
- Bilder: `assets/images/bilder/<rubrik>/<jahr oder anlass>/01.jpg …` plus
  Vorschaubilder in `thumbs/` (400 px hoch). Link = großes Bild, img = Vorschau.
- `initGalleries` (js/main.js) macht daraus die Großansicht (Pfeile, Esc, Wischen). Bildkommentar in
  der Großansicht: `data-caption="…"` am Link (oder `figcaption` der umgebenden `figure`).
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
- Zeitreise: Trainingslager, Stadtmeisterschaft, Feiern, Arbeitsdienst bewusst NICHT im Zeitstrahl –
  diese Bilder stehen auf `bilder-vereinsleben.html` / `bilder-fussball.html`.

## Downloads (PDF)

- Jubiläumszeitschriften: `archiv-jubilaeum-2023.html` (verlinkt aus `archiv-vereinsjubilaeen.html`), Dateien unter
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
  max. 5 Nachrichten/Stunde/IP. Anlagen optional (`anlage[]`, mehrere): bis 5 Dateien PDF/JPG/PNG, zusammen
  max. 15 MB (als Mail ~20 MB, passt zu Gmail). KEIN Word (Makros, Hinweis Dieter Erdmann 18.10.2026).
  Fotos über 1,5 MB verkleinert `anlagenVorbereiten` (js/main.js) vor dem Senden auf 2400 px JPEG
  (Handyfoto 10 MB → ca. 1 MB). Limits in kontakt.php UND js/main.js gleich halten.

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
  Ganz unten „Frühere Mannschaften“ (`#archiv`, `.senioren-archiv`): Mannschaftsfotos 2024–2017 von der
  alten Seite (`assets/images/senioren/archiv/`) mit Aufstellung.

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
  Foto-Platzhalter, nur der Hinweistext. 2025/26 (A/B/C): kein Mannschaftsfoto vorhanden → nur
  Überschrift + Liga, kein Platzhalter.
- D-Junioren und jünger bekommen kein Archiv.
- D- und E-Junioren: nur aktuelle Seite (Trainer + fussball.de-Widget), kein
  Archiv. Trainerfotos unter `assets/images/team/vorname-nachname.jpg`; fehlt
  ein Foto, erscheint automatisch ein Platzhalter. E1 = Quali-Staffel 19,
  E2 = Quali-Staffel 20, D1 = Quali-Staffel 11, D2 = Quali-Staffel 10 (Stand 2026/27). E3 = nur Trainer
  Quyen Ngo (Foto 20.10.2026), noch ohne Tabelle (Widget-Code fehlt). fussball.de-Widgets
  müssen dort für die Domain „tsv-hessental.de“ (ohne www) angelegt sein, sonst laden sie nicht.
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
