/* CHOCO Content Lab — mini site v2
   Header state, mobile menu, and the quote form's mailto fallback.
   The form has no backend yet (P8): submitting opens the visitor's
   email app addressed to ryan.ding@chocoent.com and calvin.fu@chocoent.com. Wire P8 to a
   real endpoint (form service / CRM) before launch. */
(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", function () {
    var open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  document.querySelectorAll(".main-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  var form = document.getElementById("quoteForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var name = (data.get("name") || "").trim();
    var company = (data.get("company") || "").trim();
    var contact = (data.get("contact") || "").trim();
    var destination = (data.get("destination") || "").trim();
    var subject = "Quote request — " + (company || name);
    var body = [
      "Name: " + name,
      "Company / brand: " + company,
      "Email or WeChat: " + contact,
      "Where do you want the brand to land? " + destination,
      "",
      "— sent from chococontentlab.com"
    ].join("\n");
    var note = document.getElementById("formNote");
    if (note) note.hidden = false;
    window.location.href =
      "mailto:ryan.ding@chocoent.com,calvin.fu@chocoent.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
})();
