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

## Mannschaftsarchiv Fußball Herren (1. & 2. Mannschaft)

- 1. und 2. Mannschaft sind auf demselben Mannschaftsfoto; beide Seiten
  (`fussball-herren-1.html`, `fussball-herren-2.html`) zeigen das aktuelle
  Foto mit Aufstellung über dem FuPa-Widget; die Archiv-Buttons 1–13 stehen dort
  in einem eigenen Bereich „Frühere Mannschaften“ ganz unten (`#archiv`).
- Saisonseiten (Archiv): Überschrift „Fußball Herren JJJJ/JJ“ über dem Foto,
  darunter Foto + Aufstellung, darunter die Archiv-Buttons 1–13.
- Button 1 = aktuelle Saison und verweist auf die aktuelle Mannschaftsseite selbst
  (keine eigene Archivseite).
- Buttons 2–13 = Saisonseiten `fussball-herren-1-JJJJ.html` (z. B. `-2526` für
  2025/26), gemeinsam für beide Mannschaften.
- Fotos: `assets/images/archiv/herren-1/JJJJ.jpg`.
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
   Saisonseite erzeugen, mit Foto `2627.jpg` und der Aufstellung, die bisher
   auf den Hauptseiten steht.
2. Neues Foto `2728.jpg` mit neuer Aufstellung auf beiden Hauptseiten einsetzen
   (Eyebrow „Saison 2027/28“, Bildunterschrift anpassen).
3. Button-Leisten auf allen Seiten neu setzen: 1 = aktuelle Seite,
   2 = 2026/27, … 13 = älteste Saison; die dann älteste Saisonseite entfällt.
4. Menütexte „1./2. Mannschaft 2026/27“ in der Navigation aller Seiten anpassen.
5. Jugend-Archive (A/B/C) analog umstellen: neue Saisonseite für 2026/27,
   Buttons neu setzen, älteste Saisonseite entfällt.
