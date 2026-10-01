# TSV Hessental – Testwebsite

Statische Website (HTML/CSS/JS, kein Build). Veröffentlicht über GitHub Pages:
https://jannelrnzn.github.io/tsv_hessental_testwebsite/

## Arbeitsweise

- Änderungen direkt auf `main` pushen, damit sie unter GitHub Pages sichtbar sind.
- Antworten und Commit-Messages auf Deutsch.
- Bilder, die über die GitHub-Weboberfläche hochgeladen werden, landen oft im
  Repo-Root oder mit Originalnamen – an die richtige Stelle verschieben,
  sinnvoll umbenennen und auf max. 2400 px Breite verkleinern.

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
