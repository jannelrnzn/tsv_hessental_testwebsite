/**
 * TSV Hessental – alle Mitteilungen an einer Stelle.
 *
 * Neue Mitteilung: einfach GANZ OBEN in die Liste einfügen (neueste zuerst).
 * Die Startseite zeigt automatisch die drei neuesten, alle älteren erscheinen
 * unter Archiv -> Mitteilungen (archiv-mitteilungen.html).
 *
 * Im "text" ist einfaches HTML erlaubt, z. B. Links: <a href="vorstand.html">…</a>
 *
 * Optional Bilder: Dateien nach assets/images/mitteilungen/ hochladen und angeben:
 *   bilder: [
 *     { datei: "assets/images/mitteilungen/sieg-vellberg.jpg", beschreibung: "Jubel nach dem 2:4" },
 *     "assets/images/mitteilungen/zweites-bild.jpg"
 *   ]
 * Ohne "bilder" wird einfach keine Bildleiste angezeigt.
 *
 * Optional archiv: true – Mitteilung erscheint sofort im Archiv statt auf der
 * Startseite (die Startseite rückt dann mit der nächstälteren auf).
 */

var MITTEILUNGEN = [
  {
    datum: "17. Oktober 2026",
    titel: "Neue Website für unseren TSV ab dem 17. Oktober 2026",
    text:
      "Am Samstag, den 17. Oktober 2026, bekommt der TSV Hessental in Form " +
      "einer neuen, selbst entwickelten Website einen moderneren und " +
      "übersichtlicheren Webauftritt. Die Inhalte und Rubriken bleiben " +
      "weitgehend wie auf der alten Website – vor allem Layout und Gestaltung " +
      "bekommen einen ganz neuen Look! Ideen, Fragen oder Verbesserungsvorschläge " +
      "gerne über das <a href=\"kontaktformular.html\">Kontaktformular</a> oder " +
      "per E-Mail an <a href=\"mailto:jannelorenzen2005@gmail.com\">jannelorenzen2005@gmail.com</a>. " +
      "Wir wünschen viel Spaß mit der neuen Website!"
  },
  {
    datum: "12. Oktober 2026",
    titel: "Die Fußball-Herren des TSV müssen in die A3-Abstiegsrunde",
    text:
      "Nach dem achten Spieltag der Haller Staffel der Kreisliga A3 ist es nun " +
      "amtlich: Der TSV Hessental muss zusammen mit allen Teams bis einschließlich " +
      "zum vierten Tabellenplatz (aktuell SGM Rosengarten) in die Abstiegsrunde mit " +
      "den fünf letztplatzierten Mannschaften der Crailsheimer A3-Staffel. Das " +
      "5:5-Spektakel gegen den SV Tüngental hat leider die letzten Hoffnungen auf " +
      "eine Aufholjagd begraben. In der Abstiegsrunde steigen von elf Mannschaften " +
      "mindestens sechs (!) direkt ab. Diese Zahl kann sich im Falle weiterer " +
      "Bezirksliga-Absteiger, die regional der A3 zugeordnet wären, sogar noch erhöhen."
  },
  {
    datum: "14. September 2026",
    titel: "Hessentaler erste Mannschaft mit schwierigem Saisonstart",
    archiv: true,
    text:
      "Nach vier Spieltagen in der Kreisliga A3 Rems/Murr/Hall (Haller Staffel) wartet die Erste " +
      "noch auf den ersten Sieg: Auf ein 1:1 zum Auftakt gegen SC " +
      "Bühlertann folgte eine 1:4-Niederlage bei den Spfr Bühlerzell, dann " +
      "ein 2:2 gegen die SGM Rosengarten – und zuletzt ein deutliches " +
      "0:7 beim TSV Michelfeld. Die Mannschaft arbeitet weiter hart am " +
      "ersten Saisonsieg. Die zweite Mannschaft ist nach dem 2:2 in Bühlerzell " +
      "immernoch ungeschlagen und konnte aus drei Spielen 5 Punkte einfahren."
  },
  {
    datum: "April 2026",
    titel: "Neuer 2. Vorstand: Marco Ebinger folgt auf Jens Ritter",
    text:
      "Bei der Hauptversammlung im April 2026 wurde Marco Ebinger zum " +
      "neuen 2. Vorstand gewählt und tritt die Nachfolge von Jens " +
      "Ritter an. Wer sich für den kompletten Vorstand interessiert, " +
      "findet alle Ansprechpartner auf der <a href=\"vorstand.html\">Vorstand-Seite</a>."
  }
];
