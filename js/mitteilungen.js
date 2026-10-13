/**
 * TSV Hessental – alle Mitteilungen und Spielberichte an einer Stelle.
 *
 * Neue Mitteilung: GANZ OBEN in die Liste einfügen (neueste zuerst) und danach
 *   node tools/mitteilungen.js
 * ausführen. Das Skript erzeugt für jeden Eintrag eine eigene Seite
 * mitteilungen/<id>.html (verlinkbar, mit Linkvorschau für WhatsApp & Co.).
 *
 * Felder:
 *   id        eindeutig, nur a-z, 0-9 und "-", Muster JJJJ-MM-TT-stichwort
 *             (wird Dateiname – später nicht mehr ändern, sonst gehen Links kaputt)
 *   datum     Anzeige-Datum, z. B. "12. Oktober 2026"
 *   titel     Überschrift
 *   text      kompletter Text; einfaches HTML erlaubt, Absätze mit </p><p>,
 *             Links z. B. <a href="vorstand.html">…</a> (Pfad wie von der Startseite aus)
 *   kategorie optional "spielbericht" – erscheint auf der Startseite im eigenen
 *             Bereich „Spielberichte“ statt unter „Aktuelle Mitteilungen“
 *   teaser    optional eigener Kurztext für Startseite/Archiv
 *             (sonst automatisch die ersten ca. 100 Zeichen des Textes + „Weiterlesen“)
 *   komplett  optional true – auf Startseite/Archiv den ganzen Text zeigen statt Teaser
 *   bilder    optional, Dateien unter assets/images/mitteilungen/:
 *               bilder: [
 *                 { datei: "assets/images/mitteilungen/sieg-vellberg.jpg", beschreibung: "Jubel nach dem 2:4" },
 *                 "assets/images/mitteilungen/zweites-bild.jpg"
 *               ]
 *   archiv    optional true – nicht mehr auf der Startseite anzeigen
 *
 * Startseite: je die drei neuesten Mitteilungen und Spielberichte als Teaser.
 * Archiv -> Mitteilungen (archiv-mitteilungen.html): alle Einträge.
 */

var MITTEILUNGEN = [
  {
    id: "2026-10-17-neue-website",
    datum: "17. Oktober 2026",
    komplett: true,
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
    id: "2026-10-12-a3-abstiegsrunde",
    datum: "12. Oktober 2026",
    kategorie: "spielbericht",
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
    id: "2026-09-30-terrassenueberdachung",
    datum: "30. September 2026",
    titel: "Neue Terrassenüberdachung: Werbeplätze und Spenden",
    text:
      "Mit der neuen Terrassenüberdachung werden weitere Werbeplätze verfügbar: " +
      "Insgesamt gibt es 18 neue Werbeplätze direkt über der Haupttribüne (sechs davon " +
      "bereits vergeben). Darüber hinaus sind auch normale Spenden – egal ob von " +
      "Privatpersonen oder Gewerbetreibenden – möglich. Ab einer Summe von 250 € werden " +
      "sie namentlich an der Spendentafel aufgeführt! Die Überdachung erstreckt sich über " +
      "die komplette Haupttribüne und bietet den Zuschauern Schutz vor Regen und Sonne.</p><p>" +
      "🫵🏼 Zeig Präsenz und unterstütze unseren Verein und seine Jugend. Schließlich geht " +
      "es hier um das gesamte Vereinsleben, nicht nur um die Fußballabteilung!</p><p>" +
      "🎯 Mit einer Werbebande zu einem fairen Preis an unserer Sportstätte erreichst du " +
      "Mitglieder, Fans und Besucher – direkt vor Ort.</p><p>" +
      "📩 Interesse geweckt? Melde dich gerne bei unserem Vereinsvorstand Rainer Brandtner " +
      "unter <a href=\"tel:+491706330310\">0170 / 633 03 10</a> oder über unser " +
      "<a href=\"kontaktformular.html?thema=Terrassen%C3%BCberdachung\">Kontaktformular</a>. " +
      "Spenden gerne direkt an: Volksbank, IBAN DE97 6229 0110 0002 0000 08.</p><p>" +
      "📸 Bilder vom Bau gibt es in unserer <a href=\"bilder-terrassenueberdachung.html\">Bildergalerie</a>.",
    bilder: [
      { datei: "assets/images/mitteilungen/2026-09-30-terrassenueberdachung.jpg", beschreibung: "Die neue Terrassenüberdachung über der Haupttribüne am Vereinsheim" }
    ]
  },
  {
    id: "2026-09-14-schwieriger-saisonstart",
    datum: "14. September 2026",
    kategorie: "spielbericht",
    titel: "Hessentaler erste Mannschaft mit schwierigem Saisonstart",
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
    id: "2026-04-neuer-2-vorstand",
    datum: "April 2026",
    archiv: true,
    titel: "Neuer 2. Vorstand: Marco Ebinger folgt auf Jens Ritter",
    text:
      "Bei der Hauptversammlung im April 2026 wurde Marco Ebinger zum " +
      "neuen 2. Vorstand gewählt und tritt die Nachfolge von Jens " +
      "Ritter an. Wer sich für den kompletten Vorstand interessiert, " +
      "findet alle Ansprechpartner auf der <a href=\"vorstand.html\">Vorstand-Seite</a>."
  }
];
