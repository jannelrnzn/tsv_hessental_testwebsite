# TSV Hessental – Testwebsite

Statische Website (HTML/CSS/JS, kein Build). Veröffentlicht über GitHub Pages:
https://jannelrnzn.github.io/tsv_hessental_testwebsite/

## Arbeitsweise

- Änderungen direkt auf `main` pushen, damit sie unter GitHub Pages sichtbar sind.
- Antworten und Commit-Messages auf Deutsch.
- Bilder, die über die GitHub-Weboberfläche hochgeladen werden, landen oft im
  Repo-Root oder mit Originalnamen – an die richtige Stelle verschieben,
  sinnvoll umbenennen und auf max. 2400 px Breite verkleinern.

## Hosting / Go-live (geplant 17.10.2026)

- Strato-Paket „Hosting Pro“ (Vertrag des Vereins seit 2006), Domain
  tsv-hessental.de inkl. E-Mail hängt daran. Zugang (Kundenlogin + SFTP)
  bekommt Janne selbst.
- Ablauf: alte Seite sichern → Dateien per SFTP in eigenen Ordner (ohne `.git`,
  `.devserver`, `.gitignore`, `CLAUDE.md`) → Test über Subdomain → Domain-Ziel
  umstellen. Mail-Einstellungen der Domain nicht anfassen.
- Danach: Strato als Hoster in der Datenschutzerklärung + AVV, kontakt.php
  echt testen, `noreply@` anlegen, GitHub Pages abschalten.
- **Entschieden (Janne):** Änderungen nach dem Go-live laufen weiter über GitHub
  und werden **automatisch per GitHub Action (SFTP) zu Strato** hochgeladen –
  bei jedem Push auf `main`, nur geänderte Dateien. Zugangsdaten trägt Janne
  selbst als Repository-Secrets ein (nie in Chat oder Code). Keine eigene
  Testumgebung; Änderungen vorher lokal prüfen. Action zum Go-live einrichten.
- **Nach dem Go-live erinnern:** Tarifwechsel bei Strato prüfen (alter Tarif,
  vergleichsweise teuer). Erst nach dem Go-live, nicht vorher.

## Mitteilungen

- Alle Mitteilungen stehen nur in `js/mitteilungen.js` (Liste `MITTEILUNGEN`,
  neueste zuerst). Neue Mitteilung = neuer Eintrag ganz oben.
- `js/main.js` (`initNews`) zeigt auf der Startseite die drei neuesten
  (`data-news="latest"`), `archiv-mitteilungen.html` alle älteren
  (`data-news="archive"`). Nichts von Hand verschieben.
  Soll eine Mitteilung vorzeitig ins Archiv: `archiv: true` setzen.
- Optional `bilder: [...]` pro Mitteilung (Pfad oder `{ datei, beschreibung }`),
  Bilder liegen unter `assets/images/mitteilungen/`. Ein Bild wird groß, mehrere
  als Raster angezeigt; Klick öffnet das Bild in voller Größe.

## Sponsorenleiste

- Leiste „Danke an unsere Sponsoren“ unter dem Menü auf allen Seiten; wird von
  `js/main.js` (`initSponsorBar`) automatisch eingefügt, HTML-Seiten brauchen
  nichts. Daten in `js/sponsoren.js` (Liste `SPONSOREN`, `name` + `adresse`),
  zufällige Reihenfolge, Wechsel alle 4 s, Pause beim Drüberfahren.
- Bei neuen/entfallenen Werbepartnern `werbepartner.html` UND `js/sponsoren.js`
  anpassen.

## Erfolge (Archiv)

- `archiv-erfolge.html` zeigt alle Erfolge aus `js/erfolge.js` (Liste `ERFOLGE`:
  `saison`, `mannschaft`, `erfolg`, optional `datum`, `liga`, `text`, `bild`,
  `aufstellung` (Liste aus `titel` + `namen`), `link`).
  Reihenfolge egal – `initSuccesses` in `js/main.js` sortiert nach Saison und
  gruppiert nach Jahrzehnten (mit Sprungleiste). Bilder unter `assets/images/erfolge/`.
- Archiv-Menü auf allen Seiten: Mitteilungen, Erfolge (alte Bilder gehören
  in den Hauptmenüpunkt „Bilder“).

## Bilder (Fotoalben)

- Menü „Bilder“: je Rubrik eine Seite `bilder-<rubrik>.html` (bisher:
  `bilder-hauptversammlung.html`, `bilder-dorfpokal.html`,
  `bilder-vereinsheimbau.html`), darin pro Anlass ein `.gallery-album`
  (neuestes oben) mit Datum, Titel, „Fotos: …“ und `<div class="gallery">`.
- Bilder: `assets/images/bilder/<rubrik>/<jahr oder anlass>/01.jpg …` plus
  Vorschaubilder in `thumbs/` (400 px hoch). Link = großes Bild, img = Vorschau.
- `initGalleries` (js/main.js) macht daraus die Großansicht (Pfeile, Esc, Wischen).
- `bilder-zeitreise.html`: Zeitstrahl (älteste zuerst, „Ohne Jahr“ am Ende) aus
  `article.timeline-item` mit Jahr, Titel, Foto(s) und optional
  `dl.archive-lineup`; Sprungleiste `.timeline-jump`. Bilder unter
  `assets/images/bilder/zeitreise/JJJJ-mannschaft.jpg`. Großansicht über
  `data-gallery` am Zeitstrahl.
- Noch offen: Spielerlegenden (Menülink noch `#`).
- Bewusst NICHT übernommen (Janne): Trainingslager, Stadtmeisterschaft,
  Feiern, Arbeitsdienst.

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

- `fussball-herren-senioren.html` unter „Fußball Herren“ im Menü; vorerst nur
  Platzhalter „Informationen folgen“, Inhalte liefert Janne später.

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
