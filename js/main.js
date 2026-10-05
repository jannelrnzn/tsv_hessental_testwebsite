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
  initSponsorBar();
  initSuccesses();
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

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "X-Requested-With": "fetch" }
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        zeige(data.meldung, data.ok);
        if (data.ok) {
          form.reset();
          if (ts) {
            ts.value = Math.floor(Date.now() / 1000);
          }
        }
      })
      .catch(function () {
        zeige("Ihre Nachricht konnte leider nicht gesendet werden. Bitte schreiben Sie uns direkt an verwaltung@tsv-hessental.de.", false);
      })
      .then(function () {
        button.disabled = false;
      });
  });
}

/**
 * Mitteilungen aus js/mitteilungen.js (Liste MITTEILUNGEN, neueste zuerst).
 * Startseite:  <div class="news-list" data-news="latest">  -> die drei neuesten
 * Archivseite: <div class="news-list" data-news="archive"> -> alle älteren
 */
var NEWS_ON_HOMEPAGE = 3;

function initNews() {
  var lists = document.querySelectorAll("[data-news]");

  if (!lists.length || typeof MITTEILUNGEN === "undefined") {
    return;
  }

  lists.forEach(function (list) {
    var items = list.getAttribute("data-news") === "latest"
      ? MITTEILUNGEN.slice(0, NEWS_ON_HOMEPAGE)
      : MITTEILUNGEN.slice(NEWS_ON_HOMEPAGE);

    if (!items.length) {
      list.innerHTML = "<p>Derzeit gibt es keine älteren Mitteilungen.</p>";
      return;
    }

    list.innerHTML = items.map(function (item) {
      return (
        '<article class="news-item">' +
          '<span class="news-item__date">' + item.datum + "</span>" +
          '<h3 class="news-item__title">' + item.titel + "</h3>" +
          "<p>" + item.text + "</p>" +
          renderNewsImages(item.bilder) +
        "</article>"
      );
    }).join("");
  });
}

/**
 * Optionale Bilder einer Mitteilung. Jedes Bild ist entweder nur der Pfad
 * ("assets/images/mitteilungen/foto.jpg") oder { datei: "...", beschreibung: "..." }.
 * Ein Klick öffnet das Bild in voller Größe.
 */
function renderNewsImages(bilder) {
  if (!bilder || !bilder.length) {
    return "";
  }

  var images = bilder.map(function (bild) {
    var datei = typeof bild === "string" ? bild : bild.datei;
    var beschreibung = (typeof bild === "string" ? "" : bild.beschreibung || "").replace(/"/g, "&quot;");
    return (
      '<a href="' + datei + '" target="_blank" rel="noopener">' +
        '<img src="' + datei + '" alt="' + beschreibung + '" loading="lazy">' +
      "</a>"
    );
  }).join("");

  var modifier = bilder.length === 1 ? " news-item__images--single" : "";
  return '<div class="news-item__images' + modifier + '">' + images + "</div>";
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
  script.src = "js/sponsoren.js";
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
      '<a class="sponsor-bar__item" href="werbepartner.html">' +
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
        (item.link ? '<a class="success-card__link" href="' + item.link + '">Zur Saison ' + item.saison + " →</a>" : "") +
      "</div>" +
    "</article>"
  );
}
