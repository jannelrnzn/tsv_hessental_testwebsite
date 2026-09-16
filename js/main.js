/**
 * TSV Hessental – gemeinsames Frontend-Skript für alle Seiten.
 * Enthält: mobiles Navigations-Menü, Dropdown-Untermenüs.
 */

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initSubmenus();
  initContactForm();
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
