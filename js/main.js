/**
 * TSV Hessental – gemeinsames Frontend-Skript für alle Seiten.
 * Enthält: mobiles Navigations-Menü, Dropdown-Untermenüs, Mannschaftsarchiv.
 */

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initSubmenus();
  initContactForm();
  initTeamArchive();
  updateFooterYear();
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
 * Da dieses Projekt (noch) kein Backend besitzt, wird das Absenden des
 * Kontaktformulars clientseitig abgefangen und dem Nutzer eine
 * Bestätigung angezeigt. Sobald ein Formular-Endpunkt zur Verfügung
 * steht, kann hier der echte Versand (fetch/POST) ergänzt werden.
 */
function initContactForm() {
  var form = document.querySelector("#contact-form");

  if (!form) {
    return;
  }

  var status = form.querySelector(".form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var name = form.querySelector("#name").value.trim();

    if (status) {
      status.textContent =
        "Vielen Dank, " + name + "! Deine Nachricht wurde erfasst. " +
        "Hinweis: Dieses Formular ist noch nicht an ein Backend angebunden – " +
        "die Anbindung folgt in einem späteren Schritt.";
      status.classList.add("is-visible");
    }

    form.reset();
  });
}

/**
 * Mannschaftsarchiv: Die Nummern-Buttons tauschen Foto und Bildunterschrift
 * aus (Bildpfad in data-src, Text in data-title). Fehlt ein Foto noch,
 * wird stattdessen ein Platzhalter "Foto folgt" angezeigt.
 */
function initTeamArchive() {
  var tabs = document.querySelectorAll(".archive-tab");
  var panel = document.querySelector(".archive-panel");

  if (!tabs.length || !panel) {
    return;
  }

  var photo = panel.querySelector(".archive-panel__photo");
  var img = photo.querySelector("img");
  var caption = panel.querySelector(".archive-panel__caption");

  img.addEventListener("error", function () {
    photo.classList.add("is-missing");
  });
  img.addEventListener("load", function () {
    photo.classList.remove("is-missing");
  });

  // Falls das erste Bild schon vor dem Skript fehlgeschlagen ist
  if (img.complete && img.naturalWidth === 0) {
    photo.classList.add("is-missing");
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (other) {
        other.setAttribute("aria-selected", "false");
      });
      tab.setAttribute("aria-selected", "true");

      var title = tab.getAttribute("data-title");
      photo.classList.remove("is-missing");
      img.src = tab.getAttribute("data-src");
      img.alt = "Mannschaftsfoto: " + title;
      caption.textContent = title;
    });
  });
}
