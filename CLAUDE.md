# TSV Hessental – Testwebsite

Statische Website (HTML/CSS/JS, kein Build). Veröffentlicht über GitHub Pages:
https://jannelrnzn.github.io/tsv_hessental_testwebsite/

## Arbeitsweise

- Änderungen direkt auf `main` pushen, damit sie unter GitHub Pages sichtbar sind.
- Antworten und Commit-Messages auf Deutsch.
- Bilder, die über die GitHub-Weboberfläche hochgeladen werden, landen oft im
  Repo-Root oder mit Originalnamen – an die richtige Stelle verschieben,
  sinnvoll umbenennen und auf max. 2400 px Breite verkleinern.

## Mitteilungen

- Alle Mitteilungen stehen nur in `js/mitteilungen.js` (Liste `MITTEILUNGEN`,
  neueste zuerst). Neue Mitteilung = neuer Eintrag ganz oben.
- `js/main.js` (`initNews`) zeigt auf der Startseite die drei neuesten
  (`data-news="latest"`), `archiv-mitteilungen.html` alle älteren
  (`data-news="archive"`). Nichts von Hand verschieben.
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
- Archiv-Menü auf allen Seiten: Mitteilungen, Vereinsjubiläen, Erfolge (alte Bilder gehören
  in den Hauptmenüpunkt „Bilder“).

## Kontaktformular

- `kontaktformular.html` sendet an `kontakt.php` (PHP, läuft erst bei Strato, nicht
  auf GitHub Pages – dort zeigt `initContactForm` nur eine Testmeldung).
- Empfänger `verwaltung@tsv-hessental.de`, Absender `noreply@tsv-hessental.de`
  (oben in `kontakt.php` einstellbar; Absender muss eine Adresse der eigenen
  Domain bei Strato sein). Antworten gehen per Reply-To an den Besucher.
- Spamschutz: Honeypot-Feld `website`, Mindestzeit 3 s (`ts`), max. 3 Links,
  max. 5 Nachrichten/Stunde/IP. Anlage optional: PDF/JPG/PNG/Word, max. 5 MB.

## Datenschutz: externe Inhalte (2-Klick-Lösung)

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
  ein Foto, erscheint automatisch ein Platzhalter. E-Junioren-Widget folgt noch,
  F-Junioren und Bambini kommen noch.

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
