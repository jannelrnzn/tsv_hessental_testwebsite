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
    id: "2026-10-13-besenausfahrt",
    datum: "13. Oktober 2026",
    titel: "Einladung zur Besenausfahrt 2026",
    text:
      "Liebe Freunde, Familien und Fans, es ist wieder soweit – die Besenausfahrt 2026 " +
      "steht vor der Tür! Gemeinsam machen wir uns mit dem Bus vom Sportplatz in Hessental " +
      "auf den Weg nach Adolzfurt. Zum dritten Mal dürfen wir dabei die gemütliche " +
      "Besenwirtschaft des Weinguts Birkert besuchen und freuen uns auf einen " +
      "stimmungsvollen Abend mit euch allen.</p><p>" +
      "📅 Freitag, 6. November 2026<br>" +
      "🚌 Abfahrt 17:30 Uhr am Sportplatz Hessental, Rückfahrt ca. 0:00 Uhr<br>" +
      "💶 Kosten für die Fahrt: 15 €</p><p>" +
      "Bitte meldet euch bis spätestens <strong>16. Oktober 2026</strong> bei Marcel Fischer an. " +
      "Sei dabei – gemeinsam ist's am schönsten!",
    bilder: [
      { datei: "assets/images/mitteilungen/2026-10-13-besenausfahrt.jpg", beschreibung: "Einladung zur Besenausfahrt 2026 zum Weingut Birkert in Adolzfurt" }
    ]
  },
  {
    id: "2026-10-12-a3-abstiegsrunde",
    datum: "12. Oktober 2026",
    kategorie: "spielbericht",
    titel: "Die Fußball-Herren des TSV müssen in die A3-Abstiegsrunde",
    text:
      "Nach dem achten Spieltag der Haller Staffel der Kreisliga A3 ist es nun amtlich: Die erste Mannschaft " +
      "des TSV Hessental muss zusammen mit allen Teams bis einschließlich zum vierten Tabellenplatz " +
      "(aktuell SGM Rosengarten) in die Abstiegsrunde mit den fünf letztplatzierten Mannschaften der " +
      "Crailsheimer A3-Staffel. Das 5:5-Spektakel gegen den SV Tüngental hat leider die letzten Hoffnungen " +
      "auf eine Aufholjagd begraben. In der Abstiegsrunde steigen von elf Mannschaften mindestens sieben (!) " +
      "direkt ab. Diese Zahl kann sich im Falle weiterer Bezirksliga-Absteiger, die regional der A3 " +
      "zugeordnet wären, sogar noch erhöhen.</p><p>" +
      "<strong>Die Ergebnisse der abgeschlossenen Qualifikationsrunde im Überblick:</strong></p><p>" +
      "<strong>TSV Hessental – SC Bühlertann 1:1</strong><br>Nach einer schwachen ersten Halbzeit glich Tim Di Mattia per Volley nach Vorlage von Roman Otto aus (62.). In der 75. Minute wurde Yannik Frey im Strafraum gefoult, doch beim fälligen Strafstoß scheiterte Marco Fischer am Gästekeeper.</p><p>" +
      "<strong>Spfr Bühlerzell – TSV Hessental 4:1</strong><br>Den zwischenzeitlichen Ausgleich erzielte Tim Di Mattia nach einem Eckball von Yannik Frey (35.). Nach zwei Platzverweisen gegen Luca Schor und Oliver Köhler beendete Hessental die Partie zu neunt.</p><p>" +
      "<strong>TSV Hessental – SGM Rosengarten 2:2</strong><br>In einem temporeichen und hitzigen Duell trennten sich zwei Konkurrenten im Rennen um die Aufstiegsrunde mit einem Unentschieden. In der 21. Minute stieg Janne Lorenzen nach einem langen Eckball von Roman Otto am höchsten und traf per Kopf zur Hessentaler Führung. Nach der Pause erhöhte Tim Di Mattia, ebenfalls per Kopf, auf 2:0 (46.), was aber nicht zum Sieg reichte. Auch dieses Spiel beendete Hessental nach einem Platzverweis gegen Lukas Bubeck nur zu zehnt. Die Gäste kamen in der Nachspielzeit noch zum Ausgleich.</p><p>" +
      "<strong>TSV Michelfeld – TSV Hessental 7:0</strong><br>In Michelfeld kam Hessental deutlich unter die Räder.</p><p>" +
      "<strong>TSV Hessental – SC Steinbach-Comburg 0:3</strong><br>Die Gäste gewannen das Derby am Ende verdient gegen harmlose Hessentaler.</p><p>" +
      "<strong>SGM Vellberg/Obersontheim II – TSV Hessental 2:4</strong><br>Nach der Führung der Gastgeber kam Hessental durch ein Eigentor zum 1:1-Ausgleich (38.). Nach erneutem Rückstand staubte Dennis Schuller kurz vor dem Halbzeitpfiff zum 2:2 ab (45.). Nach der Pause brachte Steffen Schweikert seine Farben erstmals in Führung (48.), und Tim Di Mattia erhöhte per Handelfmeter auf 2:4 (69.).</p><p>" +
      "<strong>TSV Hessental – TSV Sulzdorf 1:0</strong><br>Den goldenen und einzigen Treffer des Tages erzielte Steffen Schweikert in der 70. Minute nach starker Vorarbeit von Kapitän Yannik Frey. Er sicherte damit den Derbysieg und nährte die Hoffnungen auf die Aufstiegsrunde. Zuvor war Tim Di Mattia in der 41. Minute per Foulelfmeter am Gästetorwart gescheitert.</p><p>" +
      "<strong>TSV Hessental – SV Tüngental 5:5</strong><br>Die Gäste aus Tüngental gingen fünfmal in Führung, und Hessental fand jedes Mal eine Antwort – das Unentschieden bedeutete aber schon vor dem letzten Spieltag den Gang in die Abstiegsrunde. Nur drei Minuten nach der Gästeführung glich Tim Di Mattia nach Vorlage von Mathis Kritsch zum 1:1 aus (13.). Tüngental ging in der 45. Minute erneut in Führung, doch direkt nach dem Wiederanpfiff glich Dino Ventura in der Nachspielzeit der ersten Halbzeit nach Hereingabe von Yannik Frey zum 2:2 aus (45.+3). Tüngental legte nach der Pause zum 3:2 vor, ehe Ventura nur vier Minuten später mit seinem zweiten Treffer das 3:3 herstellte. In der 78. Minute führte wieder Tüngental. Doch auch diesmal antworteten die Gastgeber: Oliver Köhler köpfte in der 84. Minute nach Yannik Freys bereits dritter Vorlage zum 4:4 ein. Die Schlussphase hielt noch zwei weitere Treffer bereit. Tüngental ging in der 90. Minute mit 5:4 in Führung. Als alles auf einen Auswärtssieg hindeutete, wurde Ventura im Strafraum zu Fall gebracht. Köhler verwandelte den Foulelfmeter in der 95. Minute zum 5:5 – das zehnte Tor dieser Partie.</p><p>" +
      "Spielplan, Tabelle und Kader gibt es auf der Seite unserer <a href=\"fussball-herren-1.html\">1. Mannschaft</a>."
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
