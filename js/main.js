/**
 * TSV Hessental – gemeinsames Frontend-Skript für alle Seiten.
 * Enthält: mobiles Navigations-Menü, Dropdown-Untermenüs.
 */

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initSubmenus();
  initContactForm();
  updateFooterYear();
  initNews();
  initShare();
  initTermine();
  initSponsorBar();
  initSuccesses();
  initConsentEmbeds();
  initConsentReset();
  initGalleries();
  initJerseyFlip();
  initHashTarget();
});

function updateFooterYear() {
  var yearEl = document.querySelector("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initMobileNav() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll(".submenu a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Klick-gesteuerte Dropdown-Untermenüs (z. B. "Fußball Herren" -> "1. Mannschaft").
 * Funktioniert per Klick statt Hover, damit es auch auf Touch-Geräten geht.
 */
function initSubmenus() {
  var items = document.querySelectorAll(".has-submenu");

  items.forEach(function (item) {
    var trigger = item.querySelector(".nav-link");
    if (!trigger) {
      return;
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = item.classList.contains("is-open");

      items.forEach(function (other) {
        other.classList.remove("is-open");
      });

      if (!isOpen) {
        item.classList.add("is-open");
      }
    });
  });

  document.addEventListener("click", function () {
    items.forEach(function (item) {
      item.classList.remove("is-open");
    });
  });
}

/**
 * Kontaktformular: Versand über kontakt.php (PHP, z. B. bei Strato).
 * Auf GitHub Pages bzw. lokal ohne Server gibt es kein PHP – dort wird
 * nur eine Testmeldung angezeigt und nichts verschickt.
 */
var ANLAGEN_MAX = 5;                        // wie in kontakt.php
var ANLAGEN_MAX_BYTES = 15 * 1024 * 1024;   // zusammen, wie in kontakt.php
var FOTO_MAX_PIXEL = 2400;                  // längste Seite nach dem Verkleinern

/**
 * Baut die Formulardaten: Fotos über 1,5 MB (typisch Handy, oft ~10 MB) werden vorher
 * auf 2400 px verkleinert und als JPEG gespeichert, damit mehrere Bilder ins Limit passen.
 */
function anlagenVorbereiten(form) {
  var daten = new FormData(form);
  var dateien = daten.getAll("anlage[]").filter(function (datei) { return datei && datei.size > 0; });
  daten.delete("anlage[]");

  if (dateien.length > ANLAGEN_MAX) {
    return Promise.reject(anlagenFehler("Bitte höchstens " + ANLAGEN_MAX + " Anlagen auswählen."));
  }

  return Promise.all(dateien.map(fotoVerkleinern)).then(function (fertig) {
    var summe = 0;
    fertig.forEach(function (datei) {
      summe += datei.size;
      daten.append("anlage[]", datei, datei.name);
    });
    if (summe > ANLAGEN_MAX_BYTES) {
      throw anlagenFehler("Die Anlagen sind zusammen zu groß (höchstens 15 MB). Bitte weniger oder kleinere Dateien wählen.");
    }
    return daten;
  });
}

function anlagenFehler(text) {
  var fehler = new Error(text);
  fehler.anlagen = true;
  return fehler;
}

function fotoVerkleinern(datei) {
  if (!/^image\/(jpeg|png)$/.test(datei.type) || datei.size < 1.5 * 1024 * 1024 || !window.createImageBitmap) {
    return Promise.resolve(datei);
  }
  return createImageBitmap(datei, { imageOrientation: "from-image" })
    .then(function (bild) {
      var faktor = Math.min(1, FOTO_MAX_PIXEL / Math.max(bild.width, bild.height));
      var canvas = document.createElement("canvas");
      canvas.width = Math.round(bild.width * faktor);
      canvas.height = Math.round(bild.height * faktor);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff"; // transparente PNG nicht schwarz werden lassen
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bild, 0, 0, canvas.width, canvas.height);
      return new Promise(function (fertig) {
        canvas.toBlob(function (blob) {
          if (!blob || blob.size >= datei.size) {
            fertig(datei);
            return;
          }
          fertig(new File([blob], datei.name.replace(/\.(png|jpe?g)$/i, "") + ".jpg", { type: "image/jpeg" }));
        }, "image/jpeg", 0.85);
      });
    })
    .catch(function () { return datei; });
}

function initContactForm() {
  var form = document.querySelector("#contact-form");

  if (!form) {
    return;
  }

  var status = form.querySelector(".form-status");
  var button = form.querySelector('button[type="submit"]');
  var ts = form.querySelector("#form-ts");
  var ohnePhp = location.protocol === "file:" || /github\.io$/.test(location.hostname);

  if (ts) {
    ts.value = Math.floor(Date.now() / 1000);
  }

  function zeige(text, ok) {
    if (!status) {
      return;
    }
    status.textContent = text;
    status.classList.toggle("is-error", !ok);
    status.classList.add("is-visible");
  }

  // Rückmeldung nach Versand ohne JavaScript (kontakt.php leitet mit ?status=… zurück)
  var params = new URLSearchParams(location.search);

  // Thema vorbelegen, z. B. kontaktformular.html?thema=Engagement%20%26%20Ehrenamt
  var themaFeld = form.querySelector("#thema");
  if (themaFeld && params.get("thema") && !themaFeld.value) {
    themaFeld.value = params.get("thema").slice(0, 150);
  }
  if (params.get("status") === "ok") {
    zeige("Vielen Dank! Ihre Nachricht wurde gesendet.", true);
  } else if (params.get("status") === "fehler") {
    zeige("Ihre Nachricht konnte leider nicht gesendet werden. Bitte prüfen Sie Ihre Angaben.", false);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (ohnePhp) {
      zeige("Testversion: Auf dieser Vorschau-Seite werden keine Nachrichten verschickt. " +
            "Auf der fertigen Website geht die Nachricht an verwaltung@tsv-hessental.de.", true);
      return;
    }

    button.disabled = true;
    zeige("Nachricht wird gesendet …", true);

    anlagenVorbereiten(form)
      .then(function (daten) {
        return fetch(form.action, {
          method: "POST",
          body: daten,
          headers: { "X-Requested-With": "fetch" }
        });
      })
      .then(function (response) {
        if (response.status === 413) {
          return { ok: false, meldung: "Die Anlagen sind zu groß. Bitte höchstens 5 Dateien mit zusammen 15 MB senden." };
        }
        return response.json();
      })
      .then(function (data) {
        zeige(data.meldung, data.ok);
        if (data.ok) {
          form.reset();
          if (ts) {
            ts.value = Math.floor(Date.now() / 1000);
          }
        }
      })
      .catch(function (fehler) {
        zeige(fehler && fehler.anlagen ? fehler.message :
          "Ihre Nachricht konnte leider nicht gesendet werden. Bitte schreiben Sie uns direkt an verwaltung@tsv-hessental.de.", false);
      })
      .then(function () {
        button.disabled = false;
      });
  });
}

/**
 * Wurzel der Website (Ordner, in dem js/main.js liegt). Damit funktionieren
 * Links auch auf Seiten in Unterordnern (z. B. mitteilungen/<id>.html).
 */
function siteUrl(path) {
  var self = document.querySelector('script[src*="js/main.js"]');
  var root = self ? self.src.replace(/js\/main\.js.*$/, "") : "";
  return root + path;
}

/**
 * Mitteilungen aus js/mitteilungen.js (Liste MITTEILUNGEN, neueste zuerst),
 * jeweils als Teaser mit Link auf die eigene Seite mitteilungen/<id>.html.
 * Startseite:  data-news="latest"        -> die drei neuesten Mitteilungen
 *              data-news="spielberichte" -> die drei neuesten Spielberichte
 *              (ohne Einträge wird der umgebende [data-news-section] ausgeblendet)
 * Archivseite: data-news="archive"       -> alle, mit Filter [data-news-filter]
 */
var NEWS_ON_HOMEPAGE = 3;
var NEWS_TEASER_LENGTH = 100;

function isSpielbericht(item) {
  return item.kategorie === "spielbericht";
}

function initNews() {
  var lists = document.querySelectorAll("[data-news]");

  if (!lists.length || typeof MITTEILUNGEN === "undefined") {
    return;
  }

  lists.forEach(function (list) {
    var art = list.getAttribute("data-news");
    var items = MITTEILUNGEN;

    if (art === "latest" || art === "spielberichte") {
      items = MITTEILUNGEN.filter(function (item) {
        return !item.archiv && isSpielbericht(item) === (art === "spielberichte");
      }).slice(0, NEWS_ON_HOMEPAGE);
    }

    var section = list.closest("[data-news-section]");
    if (section) {
      section.hidden = !items.length;
    }

    if (!items.length) {
      list.innerHTML = "<p>Derzeit gibt es keine Mitteilungen.</p>";
      return;
    }

    list.innerHTML = items.map(function (item) {
      return renderNewsTeaser(item, art === "archive");
    }).join("");

    if (art === "archive") {
      initNewsFilter(list);
    }
  });
}

function renderNewsTeaser(item, mitKategorie) {
  var url = siteUrl("mitteilungen/" + item.id + ".html");
  var bild = item.bilder && item.bilder.length ? item.bilder[0] : null;
  var bildHtml = "";

  if (bild) {
    var datei = typeof bild === "string" ? bild : bild.datei;
    var beschreibung = (typeof bild === "string" ? "" : bild.beschreibung || "").replace(/"/g, "&quot;");
    bildHtml =
      '<a class="news-item__thumb" href="' + url + '" tabindex="-1" aria-hidden="true">' +
        '<img src="' + siteUrl(datei) + '" alt="' + beschreibung + '" loading="lazy">' +
      "</a>";
  }

  var kategorie = mitKategorie && isSpielbericht(item)
    ? ' <span class="news-item__tag">Spielbericht</span>'
    : "";

  return (
    '<article class="news-item news-item--teaser' + (bildHtml ? " news-item--media" : "") + '"' +
      ' data-kategorie="' + (isSpielbericht(item) ? "spielbericht" : "mitteilung") + '">' +
      '<div class="news-item__body">' +
        '<span class="news-item__date">' + item.datum + kategorie + "</span>" +
        '<h3 class="news-item__title"><a href="' + url + '">' + item.titel + "</a></h3>" +
        (item.komplett
          ? "<p>" + item.text + "</p>"
          : "<p>" + newsTeaser(item) + "</p>" +
            '<a class="news-item__more" href="' + url + '">Weiterlesen <span aria-hidden="true">→</span></a>') +
      "</div>" +
      bildHtml +
    "</article>"
  );
}

/** Eigener Teaser oder die ersten NEWS_TEASER_LENGTH Zeichen des Textes (ohne HTML), am Wortende gekürzt. */
function newsTeaser(item) {
  if (item.teaser) {
    return item.teaser;
  }
  var tmp = document.createElement("div");
  tmp.innerHTML = item.text.replace(/<\/p>\s*<p>/g, " ");
  var text = tmp.textContent.replace(/\s+/g, " ").trim();
  if (text.length <= NEWS_TEASER_LENGTH) {
    return escapeHtml(text);
  }
  var cut = text.slice(0, NEWS_TEASER_LENGTH);
  cut = cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.–-]+$/, "");
  return escapeHtml(cut) + " …";
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Archiv: Filter-Buttons Alle / Mitteilungen / Spielberichte */
function initNewsFilter(list) {
  var filter = document.querySelector("[data-news-filter]");
  if (!filter) {
    return;
  }
  var buttons = filter.querySelectorAll("button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var wert = button.getAttribute("data-filter");
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", b === button ? "true" : "false");
      });
      list.querySelectorAll(".news-item").forEach(function (item) {
        item.hidden = wert !== "alle" && item.getAttribute("data-kategorie") !== wert;
      });
    });
  });
}

/** Einzelseite einer Mitteilung: Link teilen (Handy) bzw. kopieren (PC). */
function initShare() {
  var button = document.querySelector("[data-share]");
  if (!button) {
    return;
  }

  button.addEventListener("click", function () {
    var url = window.location.href.split("#")[0];
    var label = button.querySelector("span");

    if (navigator.share) {
      navigator.share({ title: document.title, url: url }).catch(function () {});
      return;
    }

    function fertig(text) {
      label.textContent = text;
      setTimeout(function () { label.textContent = "Link kopieren"; }, 2500);
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        fertig("Link kopiert ✓");
      }, function () {
        window.prompt("Link zum Kopieren:", url);
      });
    } else {
      window.prompt("Link zum Kopieren:", url);
    }
  });
}

/**
 * Leiste „Danke an unsere Sponsoren“ unter dem Menü auf allen Seiten.
 * Die Sponsoren stehen in js/sponsoren.js (Liste SPONSOREN) und werden hier
 * nachgeladen, damit nicht jede HTML-Seite ein eigenes <script> braucht.
 */
var SPONSOR_INTERVAL_MS = 4000;

function initSponsorBar() {
  var header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  var script = document.createElement("script");
  // Version aus dem eigenen <script src="js/main.js?v=…"> übernehmen (Cache-Busting)
  var self = document.querySelector('script[src*="js/main.js"]');
  var version = self && self.src.indexOf("?v=") > -1 ? self.src.split("?v=")[1] : "";
  script.src = siteUrl("js/sponsoren.js") + (version ? "?v=" + version : "");
  script.onload = function () {
    if (typeof SPONSOREN === "undefined" || !SPONSOREN.length) {
      return;
    }
    renderSponsorBar(header, shuffle(SPONSOREN.slice()));
  };
  document.head.appendChild(script);
}

function renderSponsorBar(header, sponsors) {
  var bar = document.createElement("aside");
  bar.className = "sponsor-bar";
  bar.setAttribute("aria-label", "Unsere Sponsoren");
  bar.innerHTML =
    '<div class="container">' +
      '<span class="sponsor-bar__label">Danke an unsere Sponsoren</span>' +
      '<a class="sponsor-bar__item" href="' + siteUrl("werbepartner.html") + '">' +
        '<strong class="sponsor-bar__name"></strong>' +
        '<span class="sponsor-bar__address"></span>' +
      "</a>" +
    "</div>";
  header.insertAdjacentElement("afterend", bar);

  var item = bar.querySelector(".sponsor-bar__item");
  var name = bar.querySelector(".sponsor-bar__name");
  var address = bar.querySelector(".sponsor-bar__address");
  var index = 0;
  var paused = false;

  function show(i) {
    name.textContent = sponsors[i].name;
    address.textContent = sponsors[i].adresse;
  }

  show(index);

  // Beim Drüberfahren mit der Maus anhalten, damit man in Ruhe lesen kann
  bar.addEventListener("mouseenter", function () { paused = true; });
  bar.addEventListener("mouseleave", function () { paused = false; });

  setInterval(function () {
    if (paused || document.hidden) {
      return;
    }
    item.classList.add("is-fading");
    setTimeout(function () {
      index = (index + 1) % sponsors.length;
      show(index);
      item.classList.remove("is-fading");
    }, 300);
  }, SPONSOR_INTERVAL_MS);
}

function shuffle(list) {
  for (var i = list.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  }
  return list;
}

/**
 * Archiv -> Erfolge: rendert ERFOLGE aus js/erfolge.js in <div data-successes>,
 * sortiert nach Saison (neueste zuerst) und gruppiert nach Jahrzehnten.
 */
function initSuccesses() {
  var root = document.querySelector("[data-successes]");

  if (!root || typeof ERFOLGE === "undefined") {
    return;
  }

  if (!ERFOLGE.length) {
    root.innerHTML = "<p>Hier werden bald unsere Erfolge aufgelistet.</p>";
    return;
  }

  function startYear(item) {
    return parseInt(String(item.saison).slice(0, 4), 10) || 0;
  }

  var items = ERFOLGE.slice().sort(function (a, b) {
    return startYear(b) - startYear(a);
  });

  var decades = [];
  var groups = {};
  items.forEach(function (item) {
    var decade = Math.floor(startYear(item) / 10) * 10;
    if (!groups[decade]) {
      groups[decade] = [];
      decades.push(decade);
    }
    groups[decade].push(item);
  });

  var nav =
    '<nav class="success-nav" aria-label="Jahrzehnte">' +
      decades.map(function (d) {
        return '<a href="#erfolge-' + d + '">' + d + "er</a>";
      }).join("") +
    "</nav>";

  var sections = decades.map(function (d) {
    return (
      '<section class="success-decade" id="erfolge-' + d + '">' +
        '<h2 class="success-decade__title">' + d + "er Jahre</h2>" +
        '<div class="success-list">' + groups[d].map(renderSuccess).join("") + "</div>" +
      "</section>"
    );
  }).join("");

  root.innerHTML = nav + sections;
}

function renderSuccess(item) {
  var image = item.bild
    ? '<a class="success-card__image" href="' + item.bild + '" target="_blank" rel="noopener">' +
        '<img src="' + item.bild + '" alt="' + (item.mannschaft + " " + item.saison).replace(/"/g, "&quot;") + '" loading="lazy">' +
      "</a>"
    : "";

  return (
    '<article class="success-card' + (item.bild ? " success-card--with-image" : "") + '">' +
      image +
      '<div class="success-card__body">' +
        '<span class="success-card__season">' + item.saison + (item.datum ? " · " + item.datum : "") + "</span>" +
        '<h3 class="success-card__title">' + item.erfolg + "</h3>" +
        '<p class="success-card__team">' + item.mannschaft + "</p>" +
        (item.liga ? '<p class="success-card__league">' + item.liga + "</p>" : "") +
        (item.text ? "<p>" + item.text + "</p>" : "") +
        (item.aufstellung && item.aufstellung.length
          ? '<dl class="archive-lineup">' + item.aufstellung.map(function (row) {
              return "<div><dt>" + row.titel + "</dt><dd>" + row.namen + "</dd></div>";
            }).join("") + "</dl>"
          : "") +
        (item.link ? '<a class="success-card__link" href="' + item.link + '">' + (item.linktext || "Zur Saison " + item.saison) + " →</a>" : "") +
      "</div>" +
    "</article>"
  );
}

/**
 * 2-Klick-Lösung für externe Inhalte (Datenschutz).
 * Container mit data-consent="<dienst>" laden ihre Inhalte erst nach Zustimmung:
 *   <script type="text/plain" data-consent-src="…">  -> wird zu echtem Skript
 *   <iframe data-consent-src="…">                      -> bekommt src
 * Ein Klick lädt alle Inhalte desselben Dienstes auf der Seite. Optional wird die
 * Zustimmung im Browser gespeichert (localStorage, kein Cookie) und kann auf der
 * Datenschutz-Seite widerrufen werden.
 */
var CONSENT_SERVICES = {
  fupa: {
    name: "FuPa",
    anbieter: "FuPa GmbH",
    datenschutz: "https://www.fupa.net/datenschutz",
    alternative: { text: "TSV Hessental direkt auf FuPa ansehen", url: "https://www.fupa.net/club/tsv-hessental" }
  },
  fussballde: {
    name: "fussball.de",
    anbieter: "DFB Medien GmbH & Co. KG",
    datenschutz: "https://www.fussball.de/datenschutz"
  },
  googlemaps: {
    name: "Google Maps",
    anbieter: "Google Ireland Limited",
    datenschutz: "https://policies.google.com/privacy",
    alternative: { text: "In Google Maps öffnen", url: "https://www.google.com/maps/search/?api=1&query=TSV+Hessental+Sportplatz" }
  }
};
var CONSENT_PREFIX = "tsv-consent-";

// Zustimmungsabfrage („Inhalt laden“) vor FuPa, fussball.de und Google Maps.
// Vorerst ausgeschaltet: externe Inhalte werden direkt geladen.
// Wieder einschalten: auf true setzen (Datenschutzerklärung dann wieder passend).
var CONSENT_ABFRAGE = false;

function consentGespeichert(dienst) {
  try {
    return localStorage.getItem(CONSENT_PREFIX + dienst) === "1";
  } catch (e) {
    return false;
  }
}

function initConsentEmbeds() {
  var container = document.querySelectorAll("[data-consent]");
  var geladen = {};

  if (!container.length) {
    return;
  }

  function laden(dienst) {
    if (geladen[dienst]) {
      return;
    }
    geladen[dienst] = true;

    document.querySelectorAll('[data-consent="' + dienst + '"]').forEach(function (box) {
      var hinweis = box.querySelector(".consent-box");
      if (hinweis) {
        hinweis.remove();
      }
      box.classList.remove("consent-pending");

      box.querySelectorAll("iframe[data-consent-src]").forEach(function (frame) {
        frame.src = frame.getAttribute("data-consent-src");
      });
      box.querySelectorAll("script[data-consent-src]").forEach(function (alt) {
        var skript = document.createElement("script");
        skript.src = alt.getAttribute("data-consent-src");
        alt.replaceWith(skript);
      });
    });
  }

  container.forEach(function (box) {
    var dienst = box.getAttribute("data-consent");
    var info = CONSENT_SERVICES[dienst];

    if (!info) {
      return;
    }
    if (!CONSENT_ABFRAGE || consentGespeichert(dienst)) {
      laden(dienst);
      return;
    }

    box.classList.add("consent-pending");

    var hinweis = document.createElement("div");
    hinweis.className = "consent-box";
    hinweis.innerHTML =
      '<p class="consent-box__title">Externer Inhalt von ' + info.name + "</p>" +
      "<p>An dieser Stelle wird ein Inhalt von " + info.name + " (" + info.anbieter + ") angezeigt. " +
      "Beim Laden werden Daten, insbesondere deine IP-Adresse, an diesen Anbieter übertragen. " +
      'Mehr dazu in unserer <a href="' + siteUrl("datenschutzerklaerung.html") + '">Datenschutzerklärung</a> und bei ' +
      '<a href="' + info.datenschutz + '" target="_blank" rel="noopener">' + info.name + " ↗</a>.</p>" +
      '<label class="consent-box__remember"><input type="checkbox"> Für ' + info.name + " merken</label>" +
      '<button type="button" class="btn btn--primary">Inhalt laden</button>' +
      (info.alternative
        ? ' <a class="consent-box__alt" href="' + info.alternative.url + '" target="_blank" rel="noopener">' + info.alternative.text + " ↗</a>"
        : "");

    hinweis.querySelector("button").addEventListener("click", function () {
      if (hinweis.querySelector("input").checked) {
        try {
          localStorage.setItem(CONSENT_PREFIX + dienst, "1");
        } catch (e) {
          // Speichern nicht möglich (z. B. privater Modus) – Inhalt trotzdem laden
        }
      }
      laden(dienst);
    });

    box.insertBefore(hinweis, box.firstChild);
  });
}

/** Datenschutz-Seite: gespeicherte Zustimmungen widerrufen. */
function initConsentReset() {
  var button = document.querySelector("#consent-reset");
  if (!button) {
    return;
  }

  var status = document.querySelector("#consent-status");

  function anzeigen() {
    var aktiv = Object.keys(CONSENT_SERVICES).filter(consentGespeichert).map(function (d) {
      return CONSENT_SERVICES[d].name;
    });
    if (status) {
      status.textContent = aktiv.length
        ? "Gespeicherte Zustimmungen in diesem Browser: " + aktiv.join(", ") + "."
        : "In diesem Browser sind keine Zustimmungen gespeichert.";
    }
  }

  anzeigen();
  button.addEventListener("click", function () {
    try {
      Object.keys(CONSENT_SERVICES).forEach(function (d) {
        localStorage.removeItem(CONSENT_PREFIX + d);
      });
    } catch (e) {
      // nichts gespeichert oder Speicher nicht verfügbar
    }
    anzeigen();
    if (status) {
      status.textContent += " Deine Zustimmungen wurden widerrufen.";
    }
  });
}

/**
 * Bildergalerien (.gallery): Klick auf ein Vorschaubild öffnet die Großansicht
 * mit Vor/Zurück (Pfeiltasten, Wischen) und Schließen (Esc). Ohne JavaScript
 * öffnen die Links einfach das Bild.
 */
function initGalleries() {
  // .gallery = Bilderraster, [data-gallery] = beliebiger Bereich mit Bildlinks (z. B. Zeitstrahl)
  var galerien = document.querySelectorAll(".gallery, [data-gallery]");
  if (!galerien.length) {
    return;
  }

  var box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Bild in Großansicht");
  box.innerHTML =
    '<img class="lightbox__img" alt="">' +
    '<button type="button" class="lightbox__btn lightbox__close" aria-label="Schließen">&times;</button>' +
    '<button type="button" class="lightbox__btn lightbox__prev" aria-label="Vorheriges Bild">&#8249;</button>' +
    '<button type="button" class="lightbox__btn lightbox__next" aria-label="Nächstes Bild">&#8250;</button>' +
    '<p class="lightbox__count" aria-live="polite"></p>';
  document.body.appendChild(box);

  var bild = box.querySelector(".lightbox__img");
  var zaehler = box.querySelector(".lightbox__count");
  var links = [];
  var index = 0;
  var ausloeser = null;

  function zeigen(i) {
    index = (i + links.length) % links.length;
    var link = links[index];
    bild.src = link.href;
    bild.alt = link.querySelector("img").alt;
    // Bildkommentar: data-caption am Link oder figcaption der umgebenden figure
    var figur = link.closest("figure");
    var unterschrift = link.getAttribute("data-caption") ||
      (figur && figur.querySelector("figcaption") ? figur.querySelector("figcaption").textContent : "");
    zaehler.textContent = (index + 1) + " / " + links.length + (unterschrift ? " · " + unterschrift.replace(/\s+/g, " ").trim() : "");
  }

  function oeffnen(galerie, link) {
    links = Array.prototype.slice.call(galerie.querySelectorAll("a"));
    ausloeser = link;
    zeigen(links.indexOf(link));
    box.hidden = false;
    document.body.style.overflow = "hidden";
    box.querySelector(".lightbox__close").focus();
  }

  function schliessen() {
    box.hidden = true;
    bild.removeAttribute("src");
    document.body.style.overflow = "";
    if (ausloeser) {
      ausloeser.focus();
    }
  }

  galerien.forEach(function (galerie) {
    galerie.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) {
        return;
      }
      e.preventDefault();
      oeffnen(galerie, link);
    });
  });

  box.querySelector(".lightbox__close").addEventListener("click", schliessen);
  box.querySelector(".lightbox__prev").addEventListener("click", function () { zeigen(index - 1); });
  box.querySelector(".lightbox__next").addEventListener("click", function () { zeigen(index + 1); });
  box.addEventListener("click", function (e) {
    if (e.target === box) {
      schliessen();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (box.hidden) {
      return;
    }
    if (e.key === "Escape") { schliessen(); }
    if (e.key === "ArrowLeft") { zeigen(index - 1); }
    if (e.key === "ArrowRight") { zeigen(index + 1); }
  });

  var startX = null;
  box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (startX === null) {
      return;
    }
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      zeigen(dx < 0 ? index + 1 : index - 1);
    }
    startX = null;
  });
}

/**
 * Startseite: die nächsten drei Termine aus js/termine.js als feste Liste.
 * Vergangene Termine (vor heute) werden nicht angezeigt.
 */
function initTermine() {
  var box = document.querySelector("[data-termine]");
  if (!box || typeof TERMINE === "undefined") {
    return;
  }

  var heute = new Date();
  heute.setHours(0, 0, 0, 0);
  var tage = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  var kommende = TERMINE.map(function (termin) {
    var teile = termin.datum.split("-");
    return { termin: termin, tag: new Date(+teile[0], +teile[1] - 1, +teile[2]) };
  }).filter(function (eintrag) {
    return eintrag.tag >= heute;
  }).sort(function (a, b) {
    return a.tag - b.tag;
  }).slice(0, 3);

  if (!kommende.length) {
    return;
  }

  function zweistellig(zahl) {
    return (zahl < 10 ? "0" : "") + zahl;
  }

  box.querySelector(".termine-list").innerHTML = kommende.map(function (eintrag) {
    var d = eintrag.tag;
    return (
      '<article class="termin-card">' +
        '<p class="termin-card__date">' + tage[d.getDay()] + ", " +
          zweistellig(d.getDate()) + "." + zweistellig(d.getMonth() + 1) + "." + d.getFullYear() + "</p>" +
        '<h3 class="termin-card__title">' + eintrag.termin.titel + "</h3>" +
        (eintrag.termin.info ? '<p class="termin-card__info">' + eintrag.termin.info + "</p>" : "") +
      "</article>"
    );
  }).join("");
  box.hidden = false;
}

/** Dart-Seiten: Trikot per Klick/Tipp umdrehen (Vorder-/Rückseite). */
function initJerseyFlip() {
  document.querySelectorAll("[data-jersey-flip]").forEach(function (button) {
    var wrap = button.parentElement;
    var label = wrap ? wrap.querySelector("[data-jersey-side]") : null;

    button.addEventListener("click", function () {
      var hinten = button.classList.toggle("is-flipped");
      button.setAttribute("aria-pressed", hinten ? "true" : "false");
      button.setAttribute("aria-label", "Trikot umdrehen – zeigt die " + (hinten ? "Vorderseite" : "Rückseite"));
      if (label) {
        label.textContent = hinten ? "Rückseite" : "Vorderseite";
      }
    });
  });
}

/**
 * Sprungziele (#anker) festhalten: Widgets und Bilder oberhalb laden oft erst nach dem Sprung
 * und schieben das Ziel nach unten. Bis zu 8 Sekunden wird nachjustiert – aber nur, solange
 * der Besucher noch nicht selbst scrollt oder klickt.
 */
function initHashTarget() {
  if (!location.hash || !("ResizeObserver" in window)) {
    return;
  }
  var ziel = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!ziel) {
    return;
  }
  var aktiv = true;
  ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (ereignis) {
    window.addEventListener(ereignis, function () { aktiv = false; }, { once: true, passive: true });
  });
  var beobachter = new ResizeObserver(function () {
    if (aktiv) {
      ziel.scrollIntoView({ block: "start" });
    }
  });
  beobachter.observe(document.body);
  setTimeout(function () { beobachter.disconnect(); }, 8000);
}
