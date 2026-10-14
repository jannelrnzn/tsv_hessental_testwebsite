# Go-live neue Website – Schritt für Schritt

Ziel: Die neue Website liegt bei Strato im Ordner **`/website`**, wird über eine
Test-Subdomain geprüft, und erst dann zeigt **tsv-hessental.de** auf diesen Ordner.
Die alte WordPress-Seite im Hauptverzeichnis bleibt unangetastet (nur gesichert).

> Zugangsdaten stehen in der Sesam-Tabelle (Zeile „Provider Strato“).
> Strato macht zusätzlich automatische Sicherungen (BackupControl: täglich + wöchentlich,
> mehrere Wochen zurück) – ein weiteres Sicherheitsnetz.
> Niemals in GitHub-Dateien, Chats oder E-Mails schreiben.

---

## Teil A – Vorbereitung (geht schon vor Freitag, nichts ist öffentlich sichtbar)

### A1. FileZilla: Verbindung testen
1. FileZilla öffnen → oben in der Schnellverbindung eintragen:
   - **Server:** `sftp://51307960.ssh.w1.strato.hosting`
   - **Benutzername:** `stu159484164` (früher „admin@tsv-hessental.de“) – alternativ `stu440994156`;
     beide unter Strato → Datenbanken und Webspace → SFTP & SSH, beide mit Zugriff auf `/`
   - **Passwort:** das Passwort aus Sesam zu admin@tsv-hessental.de (FTP). Klappt es nicht:
     bei Strato unter SFTP & SSH beim Benutzer über „⋮“ ein neues Passwort setzen
     (Website und E-Mail sind davon nicht betroffen) und in Sesam eintragen.
   - **Port:** `22`
2. „Verbinden“ → Rückfrage zum Server-Schlüssel mit „OK“ (und „immer vertrauen“) bestätigen.
3. Rechts erscheinen die Ordner (`wp-admin`, `wp-content`, …). **Nichts verschieben oder löschen.**

### A2. GitHub: Zugangsdaten für den automatischen Upload hinterlegen
1. https://github.com/jannelrnzn/tsv_hessental_testwebsite → **Settings** →
   **Secrets and variables** → **Actions** → **New repository secret**.
2. Zwei Secrets anlegen (genau diese Namen):
   - `STRATO_SFTP_USER` → derselbe Benutzername wie in FileZilla (z. B. `stu159484164`)
   - `STRATO_SFTP_PASSWORD` → dasselbe Passwort wie in FileZilla
3. Oben auf **Actions** → links **„Upload zu Strato“** → **Run workflow** → **Run workflow**.
4. Nach einigen Minuten grüner Haken ✅. Der erste Upload dauert länger (ca. 250 MB),
   danach werden nur noch geänderte Dateien übertragen.
5. In FileZilla (F5 = aktualisieren) gibt es jetzt den Ordner **`website`**.
   Rotes ❌ statt Haken? → Screenshot an Claude.

Ab jetzt landet jede Änderung an der Website automatisch in `/website`.

### A3. Test-Subdomain anlegen
1. Strato-Kundenbereich → **Domains** → **Domainverwaltung** → **Subdomain anlegen**
   (bzw. Zahnrad bei tsv-hessental.de → Subdomain).
2. Name: **`test`** → ergibt `test.tsv-hessental.de`.
3. Bei der Subdomain: **Umleitung** → **Intern** → Ordner **`website`** auswählen → Speichern.
   (Nur bei der **Subdomain**, nicht bei tsv-hessental.de!)
4. Nach ein paar Minuten `http://test.tsv-hessental.de` öffnen
   (evtl. ohne „s“, falls die Subdomain noch kein SSL-Zertifikat hat).

### A4. Testen auf test.tsv-hessental.de
- [ ] Startseite, Menü, ein paar Unterseiten, Bilder-Galerien, eine Mitteilung
- [ ] Am Handy ansehen
- [ ] FuPa- und fussball.de-Widgets laden (1. Mannschaft, Senioren, E-Junioren)
- [ ] Google-Karte auf „Anfahrt“
- [ ] **Kontaktformular**: Testnachricht schicken → kommt bei verwaltung@tsv-hessental.de an?
- [ ] Unsinnige Adresse aufrufen (z. B. `/gibtsnicht`) → „Seite nicht gefunden“ erscheint

---

## Teil B – Alte Seite sichern (Freitag, vor der Umstellung)

### B1. Dateien herunterladen
1. Auf dem eigenen PC einen Ordner anlegen, z. B. `TSV-alte-Website-2026-10-16`.
2. FileZilla: links diesen Ordner öffnen, rechts das Hauptverzeichnis.
3. Rechts alles markieren **außer** dem Ordner `website` → Rechtsklick → **Herunterladen**.
4. Warten, bis unten „Fehlgeschlagene Übertragungen: 0“ steht (kann dauern).

### B2. Datenbank exportieren
1. Strato → **Datenbanken und Webspace** → **Datenbankverwaltung**.
2. Bei der aktuellen Datenbank (Name siehe Sesam, beginnt mit `dbs…`) → **phpMyAdmin** öffnen
   (Benutzer `dbu…` und Datenbank-Passwort aus Sesam).
3. Oben **Exportieren** → Art „Schnell“, Format „SQL“ → **OK** → Datei in den Sicherungsordner.

### B3. Sicherung ablegen
Ordner zippen und in die Vereins-Dropbox legen (nicht öffentlich teilen).

---

## Teil C – Umstellung (Freitag) – NICHT ausloggen, bis alles geprüft ist

> Strato erlaubt keine neue Umleitung auf das Hauptverzeichnis. Rückgängig machen geht
> nur **in derselben Sitzung**. Deshalb: Teil A4 vorher vollständig erledigt haben.

1. Strato → **Domains** → **Domainverwaltung** → bei **tsv-hessental.de** auf
   „Umleitung Intern“ bzw. Zahnrad.
2. **Intern** → Ordner **`website`** anklicken → **Speichern**.
3. Kurz warten, dann in einem **privaten Browserfenster** prüfen:
   - [ ] https://tsv-hessental.de → neue Seite
   - [ ] https://www.tsv-hessental.de → leitet auf tsv-hessental.de
   - [ ] http://tsv-hessental.de (ohne s) → leitet auf https
   - [ ] Kontaktformular noch einmal testen
4. Alles gut → fertig 🎉 · Probleme → **nicht ausloggen**, Claude Bescheid geben.

---

## Teil D – Nach dem Go-live

- [ ] Claude Bescheid geben → stellt die Linkvorschau-Adresse dauerhaft um, danach
      **GitHub Pages abschalten** (Settings → Pages).
- [ ] Optional: Google Search Console einrichten und `https://tsv-hessental.de/sitemap.xml` einreichen.
- [ ] **Bis 30.10.2026:** WordPress-Plugin „Shortcodes Ultimate Pro“ kündigen (Auto-Verlängerung),
      „Max Mega Menu Pro“ prüfen.
- [ ] Passwörter ändern: Strato-Kundenlogin, SFTP (dann auch das GitHub-Secret anpassen!), E-Mail.
- [ ] Nach 2–4 Wochen ohne Probleme: alte WordPress-Dateien, Demo-Seite und Datenbank bei
      Strato löschen; Subdomain `test` löschen.
- [ ] Ganz zum Schluss: Tarifwechsel bei Strato prüfen.
