<?php
/*
 * DEMO-SEITE (passwortgeschützt, nicht verlinkt): SPG-Onlineform-Mitgliederantrag zum Testen
 * (Wunsch Thomas Thiel, 13.11.2026). Adresse: https://tsv-hessental.de/mitglied-werden-demo.php
 *
 * SPG-Link: Nach der Freischaltung bei spg-direkt.de (Service -> SPG-Onlineform-Mitgliederantrag) kommt per
 * E-Mail die SPG-Onlineform-ID. Link = https://online.spg-direkt.de/start/<ID> -> unten bei $SPG_LINK eintragen.
 *
 * Passwort: steht NIE im Repository. Janne trägt es als GitHub-Secret DEMO_PASSWORT ein; tools/build.sh legt
 * beim Upload daraus .demo-passwort.php (nur der Hash) an. Ohne Secret ist die Seite gesperrt.
 * Kopf/Menü/Fuß sind eine Kopie von mitglied-werden.html (Stand 16.11.2026) – bei Übernahme in die echte Seite neu bauen.
 */
$SPG_LINK = 'https://online.spg-direkt.de/start/b18795e9-6f65-4d38-bc04-a09f67aeeedb';

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');
session_set_cookie_params(['httponly' => true, 'secure' => !empty($_SERVER['HTTPS']), 'samesite' => 'Lax']);
session_start();

$hashDatei = __DIR__ . '/.demo-passwort.php';
$hash = is_file($hashDatei) ? (include $hashDatei) : '';
$fehler = '';
if (isset($_GET['abmelden'])) {
  $_SESSION = [];
  session_destroy();
  header('Location: mitglied-werden-demo.php');
  exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if ($hash && password_verify((string)($_POST['passwort'] ?? ''), $hash)) {
    session_regenerate_id(true);
    $_SESSION['demo'] = true;
    header('Location: mitglied-werden-demo.php');
    exit;
  }
  sleep(2);
  $fehler = 'Das Passwort ist falsch.';
}
$angemeldet = !empty($_SESSION['demo']);
?><!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demo: Online-Mitgliedsantrag | TSV Hessental</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" href="favicon.ico?v=3">
  <link rel="apple-touch-icon" href="assets/images/icons/apple-touch-icon.png?v=4">
  <link rel="manifest" href="site.webmanifest?v=4">
  <meta name="theme-color" content="#c8102e">
  <link rel="stylesheet" href="css/style.css?v=202611170843">
  <script src="js/main.js?v=202611170843" defer></script>
</head>
<body>

  <a class="skip-link" href="#main-content">Zum Inhalt springen</a>

  <!-- ============================= Header ============================= -->
  <header class="site-header">
    <div class="container">
      <a class="logo" href="index.html">
        <img class="logo__icon" src="assets/images/logo/vereinslogo-100x121.png" alt="TSV Hessental Vereinswappen">
        <span>
          TSV Hessental
          <span class="logo__text-sub">1923 e.V.</span>
        </span>
      </a>

      <button class="nav-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Navigation öffnen">
        <span class="nav-toggle__bar"></span>
        <span class="nav-toggle__bar"></span>
        <span class="nav-toggle__bar"></span>
      </button>

      <nav class="main-nav" id="main-nav" aria-label="Hauptnavigation">
        <ul class="main-nav__list">
          <li><a href="index.html">Startseite</a></li>
          <li class="has-submenu">
            <button class="nav-link" aria-expanded="false">
              Fußball Herren <span class="nav-caret">▾</span>
            </button>
            <ul class="submenu">
              <li><a href="fussball-herren-abteilungsleitung.html">Abteilungsleitung</a></li>
              <li><a href="fussball-herren-1.html">1. Mannschaft 2026/27</a></li>
              <li><a href="fussball-herren-2.html">2. Mannschaft 2026/27</a></li>
              <li><a href="fussball-herren-senioren.html">Senioren</a></li>
              <li><a href="fussball-herren-schiedsrichter.html">Schiedsrichter</a></li>
              <li><a href="fussball-herren-stadionhefte.html">Stadionhefte</a></li>
            </ul>
          </li>
          <li class="has-submenu">
            <button class="nav-link" aria-expanded="false">
              Jugendfußball <span class="nav-caret">▾</span>
            </button>
            <ul class="submenu">
              <li><a href="fussball-jugend-abteilungsleitung.html">Jugendleitung</a></li>
              <li><a href="fussball-jugend-a.html">A-Junioren (U19)</a></li>
              <li><a href="fussball-jugend-b.html">B-Junioren (U17)</a></li>
              <li><a href="fussball-jugend-c.html">C-Junioren (U15)</a></li>
              <li><a href="fussball-jugend-d.html">D-Junioren (U13)</a></li>
              <li><a href="fussball-jugend-e.html">E-Junioren (U11)</a></li>
              <li><a href="fussball-jugend-f.html">F-Junioren (U9)</a></li>
              <li><a href="fussball-jugend-bambini.html">G-Junioren (Bambini)</a></li>
            </ul>
          </li>
          <li class="has-submenu">
            <button class="nav-link" aria-expanded="false">
              Turnen <span class="nav-caret">▾</span>
            </button>
            <ul class="submenu">
              <li><a href="turnen-abteilungsleitung.html">Abteilungsleitung</a></li>              
              <li><a href="turnen-kinderturnen.html">Kinderturnen</a></li>
              <li><a href="turnen-fitnessgruppe.html">Fitnessgruppe</a></li>
              <li><a href="turnen-frauengruppe-50.html">Frauengruppe 50+</a></li>
            </ul>
          </li>
          <li class="has-submenu">
            <button class="nav-link" aria-expanded="false">
              Kurse &amp; Freizeit <span class="nav-caret">▾</span>
            </button>
            <ul class="submenu">
              <li><a href="kurse-step-aerobic.html">Step Aerobic</a></li>
              <li><a href="kurse-anni-fit.html">anni.fit</a></li>
              <li><a href="freizeit-fahrradgruppe.html">Fahrradgruppe</a></li>
            </ul>
          </li>
          <li class="has-submenu">
            <button class="nav-link" aria-expanded="false">
              Dart <span class="nav-caret">▾</span>
            </button>
            <ul class="submenu">
              <li><a href="dart-scorpions-1.html">Scorpions I</a></li>
              <li><a href="dart-scorpions-2.html">Scorpions II</a></li>
            </ul>
          </li>
          <li class="has-submenu">
            <button class="nav-link" aria-expanded="false">
              Bilder <span class="nav-caret">▾</span>
            </button>
            <ul class="submenu">
              <li><a href="bilder-hauptversammlung.html">Hauptversammlung</a></li>
              <li><a href="bilder-dorfpokal.html">Dorfpokal</a></li>
              <li><a href="bilder-vereinsleben.html">Vereinsleben</a></li>
              <li><a href="bilder-fussball.html">Fußball</a></li>
              <li><a href="bilder-vereinsheimbau.html">Vereinsheimbau 1970-1973</a></li>
              <li><a href="bilder-terrassenueberdachung.html">Terrassenüberdachung</a></li>
              <li><a href="bilder-zeitreise.html">Zeitreise</a></li>
              <li><a href="bilder-spielerlegenden.html">Spielerlegenden</a></li>
            </ul>
          </li>
          <li class="has-submenu">
            <button class="nav-link" aria-expanded="false">
              Partner &amp; VIP <span class="nav-caret">▾</span>
            </button>
            <ul class="submenu">
              <li><a href="werbepartner.html">Werbepartner</a></li>
              <li><a href="werbepartner-werden.html">Werbepartner werden</a></li>
              <li><a href="vip-karte.html">VIP-Karte</a></li>
              <li><a href="fan-bande.html">Fan-Bande</a></li>
            </ul>
          </li>
          <li class="has-submenu is-active">
            <button class="nav-link" aria-expanded="false">
              Kontakt <span class="nav-caret">▾</span>
            </button>
            <ul class="submenu">
              <li><a href="vorstand.html">Vorstand</a></li>
              <li><a href="kontaktformular.html">Kontaktformular</a></li>
              <li><a href="mitglied-werden.html">Mitglied werden</a></li>
              <li><a href="mitgliederverwaltung.html">Mitgliederverwaltung</a></li>
              <li><a href="engagement-ehrenamt.html">Engagement &amp; Ehrenamt</a></li>
            </ul>
          </li>
          <li class="has-submenu">
            <button class="nav-link" aria-expanded="false">
              Archiv <span class="nav-caret">▾</span>
            </button>
            <ul class="submenu">
              <li><a href="archiv-mitteilungen.html">Mitteilungen</a></li>
              <li><a href="archiv-erfolge.html">Erfolge</a></li>
              <li><a href="archiv-hauptversammlungen.html">Hauptversammlungen</a></li>
              <li><a href="archiv-vereinsjubilaeen.html">Vereinsjubiläen</a></li>
              </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main-content">

    <header class="page-header">
      <div class="container">
        <span class="eyebrow">Nur zum Testen</span>
        <h1>Demo: Online-Mitgliedsantrag</h1>
        <p>Diese Seite ist nicht öffentlich und nur für den Test der Anbindung an SPG-Verein gedacht.<br>
          Bitte hier keine echten Anträge stellen.</p>
      </div>
    </header>

    <section class="section">
      <div class="container">
<?php if (!$hash): ?>
        <p class="hinweis-marker">Die Demo-Seite ist noch nicht eingerichtet (Passwort fehlt).</p>
<?php elseif (!$angemeldet): ?>
        <form method="post" class="contact-form" style="max-width: 420px;">
          <div class="form-field">
            <label for="passwort">Passwort</label>
            <input type="password" id="passwort" name="passwort" required autocomplete="current-password" autofocus>
          </div>
<?php if ($fehler): ?>
          <p class="hinweis-marker"><?= htmlspecialchars($fehler) ?></p>
<?php endif; ?>
          <button type="submit" class="btn btn--primary">Anmelden</button>
        </form>
<?php else: ?>
        <p class="hinweis-marker">Demo – Testumgebung für den SPG-Online-Mitgliedsantrag. Es wird nichts auf der öffentlichen Website angezeigt.</p>
<?php if ($SPG_LINK): ?>
        <iframe src="<?= htmlspecialchars($SPG_LINK) ?>" title="Online-Mitgliedsantrag (SPG-Verein)" style="width: 100%; height: 1400px; border: 1px solid var(--color-gray-300); border-radius: 8px;" loading="lazy"></iframe>
        <p class="download-link" style="margin-top: var(--space-sm);"><a href="<?= htmlspecialchars($SPG_LINK) ?>" target="_blank" rel="noopener">Antrag in neuem Fenster öffnen ↗</a></p>
<?php else: ?>
        <p>Hier erscheint der Online-Antrag, sobald der SPG-Link eingetragen ist (SPG-Onlineform-ID aus der Freischaltungs-E-Mail von SPG).</p>
<?php endif; ?>
        <p style="margin-top: var(--space-md);"><a href="mitglied-werden-demo.php?abmelden=1">Abmelden</a></p>
<?php endif; ?>
      </div>
    </section>

  </main>

  <!-- ============================= Footer ============================= -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="logo" href="index.html">
            <img class="logo__icon" src="assets/images/logo/vereinslogo-100x121.png" alt="TSV Hessental Vereinswappen">
            <span>
              TSV Hessental
              <span class="logo__text-sub">1923 e.V.</span>
            </span>
          </a>
          <p class="footer-brand__claim">Tradition unterm Einkorn</p>
          <div class="social-links">
            <a href="https://www.instagram.com/tsv_hessental/" target="_blank" rel="noopener" aria-label="TSV Hessental auf Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
          <div class="footer-sponsor">
            <a href="https://stadtwerke-hall.de/" target="_blank" rel="noopener"><img src="assets/images/sponsoren/logos/stadtwerke.png" alt="Stadtwerke Schwäbisch Hall GmbH"></a>
            <span>Hauptsponsor</span>
          </div>
        </div>

        <div>
          <h3 class="footer-heading">Schnellzugriff</h3>
          <ul class="footer-links">
            <li><a href="mitglied-werden.html">Mitglied werden</a></li>
            <li><a href="archiv-mitteilungen.html">Mitteilungen</a></li>
            <li><a href="vorstand.html">Vorstand</a></li>
            <li><a href="werbepartner-werden.html">Werbepartner werden</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-heading">Kontakt</h3>
          <p class="footer-address">Sportgelände &amp; Vereinsheim<br>Im Wachholder<br>74523 Schwäbisch Hall</p>
          <ul class="footer-links">
            <li><a href="kontaktformular.html">Kontaktformular</a></li>
            <li><a href="mailto:verwaltung@tsv-hessental.de">verwaltung@tsv-hessental.de</a></li>
            <li><a href="anfahrt.html">Anfahrt</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; <span id="year">2026</span> TSV Hessental 1923 e.V. - Janne Lorenzen</span>
        <ul class="footer-legal">
          <li><a href="datenschutzerklaerung.html">Datenschutzerklärung</a></li>
          <li><a href="impressum.html">Impressum</a></li>
        </ul>
      </div>
    </div>
  </footer>

</body>
</html>
