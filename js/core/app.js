/* ═══════════════════════════════════════════════════════
   APP.JS — js/core/app.js
   Punto de entrada: inicializa todos los sistemas
   ═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", async () => {

  // ── 1. Componentes globales ──
  Navbar.init();
  ProductModal.init();
  Animations.init();

  // ── 2. Settings (WhatsApp, anuncio, links) ──
  const settings = await SettingsService.getSettings();
  await WhatsApp.init();

  // WhatsApp FAB y navbar
  const contactUrl = WhatsApp.buildUrl(WhatsApp.buildContactMessage());
  WhatsApp.setAllLinks(contactUrl);

  // Announcement bar
  if (settings.showAnnouncement && settings.announcement) {
    const bar  = document.getElementById("announcement-bar");
    const text = document.getElementById("announcement-text");
    if (bar && text) {
      text.textContent = settings.announcement;
      bar.style.display = "block";
      // Ajustar padding-top del body
      document.body.style.paddingTop = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--navbar-h")) + bar.offsetHeight) + "px";
    }
  }

  // Instagram footer
  const igEl = document.getElementById("footer-instagram");
  if (igEl && settings.instagramUrl) igEl.href = settings.instagramUrl;

  // Footer address
  const addrEl = document.getElementById("footer-address");
  if (addrEl && settings.address) addrEl.innerHTML = settings.address.replace(",", ",<br>");

  // Footer hours
  const footerHours = document.getElementById("footer-hours-list");
  if (footerHours && settings.hours) {
    footerHours.innerHTML = settings.hours.map(h =>
      `<li><span>${h.day}</span><span>${h.close ? h.open + " – " + h.close : h.open}</span></li>`
    ).join("");
  }

  // ── 3. Iniciar router SPA ──
  Router.init();
});
