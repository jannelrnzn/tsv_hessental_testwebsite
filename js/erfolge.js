/**
 * TSV Hessental – alle Erfolge (Meisterschaften, Aufstiege, Pokalsiege …).
 *
 * Wird auf archiv-erfolge.html angezeigt. Reihenfolge in der Liste ist egal:
 * die Seite sortiert automatisch nach Saison (neueste zuerst) und baut die
 * Sprungleiste nach Jahrzehnten selbst.
 *
 * Pflichtfelder:
 *   saison:     "2024/25"  (bei Turnieren o. Ä. auch nur ein Jahr: "1987")
 *   mannschaft: "2. Mannschaft"
 *   erfolg:     "Meister der Reserverunde"
 *
 * Optional:
 *   datum: "Juni 2025"   (erscheint neben der Saison)
 *   liga:  "Kreisliga A3 Rems/Murr/Hall"
 *   text:  "Kurzer Bericht …"   (einfaches HTML erlaubt, z. B. Links)
 *   bild:  "assets/images/erfolge/2425-reservemeister.jpg"
 *   aufstellung: [ { titel: "Stehend v.l.n.r.", namen: "Max Muster, …" }, … ]
 *   link:  "fussball-herren-1-2425.html"   (Archivseite der Saison)
 */

var ERFOLGE = [
  {
    saison: "2024/25",
    datum: "Juni 2025",
    mannschaft: "2. Mannschaft",
    erfolg: "Reservemeister",
    liga: "Kreisliga A3 Rems/Murr/Hall",
    text:
      "Mit 32 Punkten aus 12 Spielen, einem Torverhältnis von 44:10 und ohne " +
      "Niederlage holte sich die zweite Mannschaft den Meistertitel in der " +
      "Reserveliga. Das Team, das von Endrit Memeti und Michael Kolegov " +
      "trainiert wurde, erhielt am letzten Spieltag mit einem beeindruckenden " +
      "5:3-Derbysieg über den SC Steinbach-Comburg den Meisterwimpel beim " +
      "Saisonabschluss unterm Einkorn.",
    bild: "assets/images/erfolge/2425-reservemeister.jpg",
    link: "fussball-herren-1-2425.html"
  },
  {
    saison: "2024/25",
    datum: "28. Mai 2025",
    mannschaft: "C-Junioren (SGM Hessental-Sulzdorf)",
    erfolg: "Meister",
    liga: "C-Junioren Kreisstaffel 6 Rems/Murr/Hall",
    text:
      "Mit der vollen Ausbeute von 21 Punkten aus sieben Spielen und einem " +
      "Torverhältnis von 33:4 krönt sich unsere C-Jugend SGM in der " +
      "Kreisstaffel 6 Rems/Murr/Hall zum Meister! Gratulation an die " +
      "Mannschaft und das Trainerteam rund um Michael Frey.",
    bild: "assets/images/archiv/jugend-c/2425.jpg",
    aufstellung: [
      { titel: "Stehend v.l.n.r.", namen: "Erik Lay, Felix Beck, Robin Bölz, Paul Haman, Adrian Fabian, Michael Frey (Chefcoach), Ilja Kramlich, Joa Siegel, Rafael Ramirez, Markus Pröllochs (Trainer), Jamal Gilgi" },
      { titel: "Kniend v.l.n.r.", namen: "Finn Mildner, Niels Nannerup, Fabio Scholl, Ianis Varan, Hanno Schimoneck, Mohammad Sorany, Karosch Musa Kadir" },
      { titel: "Liegend", namen: "Leon Schulz" },
      { titel: "Nicht auf dem Bild", namen: "Ledion Marovci, Jonas Pröllochs, Tom Scheurich, Heiko Pröllochs (Trainer), Morten Nannerup (Trainer)" }
    ],
    link: "fussball-jugend-c-2425.html"
  },
  {
    saison: "2021/22",
    mannschaft: "B-Junioren",
    erfolg: "Meister",
    liga: "B-Junioren Leistungsstaffel Hohenlohe",
    text:
      "Ungeschlagen wurde das Team der Jahrgänge 2005/06 Meister in der " +
      "B-Junioren Leistungsstaffel Hohenlohe. Mit einem souveränen " +
      "Torverhältnis von 15:5 Toren und 21 Punkten aus 9 Spielen grüßt die " +
      "B-Jugend, trainiert von Dimitri Stergiou, nach dem letzten Spieltag " +
      "von der Tabellenspitze. Mit zwei Punkten Abstand auf die SGM " +
      "Mulfingen/Hollenbach wurde der Aufstieg in die Regionenstaffel wegen " +
      "der Corona-Regelungen leider verwehrt.",
    bild: "assets/images/archiv/jugend-b/2122.jpg",
    link: "fussball-jugend-b-2122.html"
  }
];
