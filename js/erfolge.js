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
 *   liga:  "Kreisliga A3 Rems/Murr/Hall"
 *   text:  "Kurzer Bericht …"   (einfaches HTML erlaubt, z. B. Links)
 *   bild:  "assets/images/erfolge/2425-reservemeister.jpg"
 *   link:  "fussball-herren-1-2425.html"   (Archivseite der Saison)
 */

var ERFOLGE = [
  {
    saison: "2024/25",
    mannschaft: "2. Mannschaft",
    erfolg: "Reservemeister",
    liga: "Kreisliga A3 Rems/Murr/Hall",
    bild: "assets/images/erfolge/2425-reservemeister.jpg",
    link: "fussball-herren-1-2425.html"
  },
  {
    saison: "2023/24",
    mannschaft: "C-Junioren",
    erfolg: "Meister",
    liga: "C-Junioren Kreisstaffel 3 Hohenlohe",
    link: "fussball-jugend-c-2324.html"
  },
  {
    saison: "2021/22",
    mannschaft: "B-Junioren",
    erfolg: "Meister",
    liga: "B-Junioren Leistungsstaffel Hohenlohe",
    link: "fussball-jugend-b-2122.html"
  }
];
