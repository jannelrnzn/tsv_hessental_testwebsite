<?php
/**
 * TSV Hessental – Versand des Kontaktformulars (kontaktformular.html) per E-Mail.
 *
 * Läuft nur auf einem Webspace mit PHP (z. B. Strato), NICHT auf GitHub Pages.
 * Nach dem Umzug zu Strato nur die beiden Adressen unten prüfen/anpassen.
 *
 * Spamschutz:
 *   1. Honeypot: unsichtbares Feld "website" – Menschen sehen es nicht, Bots füllen es aus.
 *   2. Zeitprüfung: wer schneller als 3 Sekunden nach dem Laden absendet, ist ein Bot.
 *   3. Linkbegrenzung: mehr als 3 Links in der Nachricht werden abgelehnt.
 *   4. Sendelimit: höchstens 5 Nachrichten pro Stunde und IP-Adresse.
 */

// ===================== Einstellungen =====================
$EMPFAENGER = 'verwaltung@tsv-hessental.de';
// Absender muss ein Postfach/Adresse der eigenen Domain bei Strato sein,
// sonst landen die Mails im Spam oder werden gar nicht zugestellt.
$ABSENDER   = 'noreply@tsv-hessental.de';
$ABSENDER_NAME = 'TSV Hessental Website';

$MIN_SEKUNDEN     = 3;                 // Zeitprüfung
$MAX_LINKS        = 3;                 // Links in der Nachricht
$MAX_PRO_STUNDE   = 5;                 // Sendelimit je IP
$MAX_ANLAGE_BYTES = 5 * 1024 * 1024;   // 5 MB
$ERLAUBTE_ANLAGEN = [
    'pdf'  => ['application/pdf'],
    'jpg'  => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
    'png'  => ['image/png'],
    'doc'  => ['application/msword', 'application/octet-stream'],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream'],
];
// =========================================================

$istAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'fetch';

/** Antwort: per JSON (Formular mit JavaScript) oder Weiterleitung (ohne JavaScript). */
function antworten($ok, $meldung)
{
    global $istAjax;
    if ($istAjax) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 400);
        echo json_encode(['ok' => $ok, 'meldung' => $meldung]);
    } else {
        header('Location: kontaktformular.html?status=' . ($ok ? 'ok' : 'fehler') . '#contact-form', true, 303);
    }
    exit;
}

/** Bots bekommen eine scheinbare Erfolgsmeldung, damit sie nicht weiter probieren. */
function spam()
{
    antworten(true, 'Vielen Dank! Ihre Nachricht wurde gesendet.');
}

/** Entfernt Zeilenumbrüche, damit niemand zusätzliche Mail-Header einschleusen kann. */
function einzeilig($text)
{
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', $text));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: kontaktformular.html', true, 303);
    exit;
}

// ---------- Spamschutz ----------
if (!empty($_POST['website'])) {
    spam();
}

$ts = isset($_POST['ts']) ? (int) $_POST['ts'] : 0;
if ($ts > 0 && (time() - $ts) < $MIN_SEKUNDEN) {
    spam();
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unbekannt';
$limitDatei = sys_get_temp_dir() . '/tsv-kontakt-' . md5($ip);
$zeitpunkte = [];
if (is_file($limitDatei)) {
    $zeitpunkte = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($limitDatei))),
        function ($t) { return $t > time() - 3600; }
    );
}
if (count($zeitpunkte) >= $MAX_PRO_STUNDE) {
    antworten(false, 'Sie haben in kurzer Zeit zu viele Nachrichten gesendet. Bitte versuchen Sie es später erneut.');
}

// ---------- Eingaben prüfen ----------
$name      = einzeilig($_POST['name'] ?? '');
$email     = einzeilig($_POST['email'] ?? '');
$thema     = einzeilig($_POST['thema'] ?? '');
$nachricht = trim($_POST['nachricht'] ?? '');
$datenschutz = !empty($_POST['datenschutz']);

if ($name === '' || $thema === '' || $nachricht === '' || !$datenschutz) {
    antworten(false, 'Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Datenschutzhinweise.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    antworten(false, 'Bitte geben Sie eine gültige E-Mail-Adresse an.');
}
if (mb_strlen($name) > 100 || mb_strlen($thema) > 150 || mb_strlen($nachricht) > 5000) {
    antworten(false, 'Ihre Eingaben sind zu lang. Bitte kürzen Sie die Nachricht.');
}
if (preg_match_all('~(https?://|www\.)~i', $nachricht) > $MAX_LINKS) {
    spam();
}

// ---------- Anlage (optional) ----------
$anlage = null;
if (isset($_FILES['anlage']) && $_FILES['anlage']['error'] !== UPLOAD_ERR_NO_FILE) {
    $datei = $_FILES['anlage'];
    if ($datei['error'] !== UPLOAD_ERR_OK || $datei['size'] > $MAX_ANLAGE_BYTES) {
        antworten(false, 'Die Anlage konnte nicht übernommen werden (höchstens 5 MB).');
    }
    $endung = strtolower(pathinfo($datei['name'], PATHINFO_EXTENSION));
    $mime = function_exists('finfo_open')
        ? finfo_file(finfo_open(FILEINFO_MIME_TYPE), $datei['tmp_name'])
        : 'application/octet-stream';
    if (!isset($ERLAUBTE_ANLAGEN[$endung]) || !in_array($mime, $ERLAUBTE_ANLAGEN[$endung], true)) {
        antworten(false, 'Als Anlage sind nur PDF-, JPG-, PNG- und Word-Dateien erlaubt.');
    }
    $anlage = [
        'name' => preg_replace('~[^A-Za-z0-9._-]~', '_', basename($datei['name'])),
        'mime' => $mime,
        'daten' => file_get_contents($datei['tmp_name']),
    ];
}

// ---------- Mail zusammenbauen ----------
$betreff = '=?UTF-8?B?' . base64_encode('[Kontaktformular] ' . $thema) . '?=';
$text = "Neue Nachricht über das Kontaktformular der Website:\n\n"
      . "Name:    $name\n"
      . "E-Mail:  $email\n"
      . "Thema:   $thema\n"
      . ($anlage ? "Anlage:  {$anlage['name']}\n" : '')
      . "\nNachricht:\n----------\n$nachricht\n----------\n\n"
      . 'Gesendet am ' . date('d.m.Y \u\m H:i') . " Uhr.\n"
      . "Mit \"Antworten\" geht die Mail direkt an den Absender.\n";

$header  = 'From: =?UTF-8?B?' . base64_encode($ABSENDER_NAME) . "?= <$ABSENDER>\r\n";
$header .= 'Reply-To: =?UTF-8?B?' . base64_encode($name) . "?= <$email>\r\n";
$header .= "MIME-Version: 1.0\r\n";

if ($anlage) {
    $grenze = 'tsv-' . bin2hex(random_bytes(12));
    $header .= "Content-Type: multipart/mixed; boundary=\"$grenze\"\r\n";
    $inhalt  = "--$grenze\r\n"
             . "Content-Type: text/plain; charset=UTF-8\r\n"
             . "Content-Transfer-Encoding: base64\r\n\r\n"
             . chunk_split(base64_encode($text)) . "\r\n"
             . "--$grenze\r\n"
             . "Content-Type: {$anlage['mime']}; name=\"{$anlage['name']}\"\r\n"
             . "Content-Transfer-Encoding: base64\r\n"
             . "Content-Disposition: attachment; filename=\"{$anlage['name']}\"\r\n\r\n"
             . chunk_split(base64_encode($anlage['daten'])) . "\r\n"
             . "--$grenze--\r\n";
} else {
    $header .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $header .= "Content-Transfer-Encoding: base64\r\n";
    $inhalt  = chunk_split(base64_encode($text));
}

// "-f" setzt den Envelope-Absender – bei Strato wichtig für die Zustellung.
$gesendet = mail($EMPFAENGER, $betreff, $inhalt, $header, '-f' . $ABSENDER);

if (!$gesendet) {
    antworten(false, 'Ihre Nachricht konnte leider nicht gesendet werden. Bitte schreiben Sie uns direkt an verwaltung@tsv-hessental.de.');
}

$zeitpunkte[] = time();
@file_put_contents($limitDatei, implode(',', $zeitpunkte));

antworten(true, 'Vielen Dank, ' . $name . '! Ihre Nachricht wurde gesendet. Wir melden uns so schnell wie möglich.');
