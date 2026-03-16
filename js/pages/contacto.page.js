/* CONTACTO PAGE — js/pages/contacto.page.js */
const ContactoPage = {
  async init() {
    SEO.updateMeta({
      title: "Contacto | J&C Tienda - Padre Hurtado",
      description: "Contáctanos por WhatsApp o visítanos en Padre Hurtado. Horarios de atención y ubicación.",
      url: "https://jyc-tienda.cl/contacto"
    });
    SEO.setActive("/contacto");

    const settings = await SettingsService.getSettings();

    // Dirección
    const addrEl = document.getElementById("contacto-address-text");
    if (addrEl) addrEl.textContent = settings.address || "";

    // Links WhatsApp
    const directWaEl = document.getElementById("contacto-wa-link");
    if (directWaEl) directWaEl.href = WhatsApp.buildUrl(WhatsApp.buildContactMessage());

    // Horarios
    const hoursEl = document.getElementById("contacto-hours-list");
    if (hoursEl && settings.hours) {
      hoursEl.innerHTML = settings.hours.map(h =>
        `<li><span>${h.day}</span><span>${h.close ? h.open + " – " + h.close : h.open}</span></li>`
      ).join("");
    }

    // Instagram
    const igEl = document.getElementById("contacto-instagram-link");
    if (igEl && settings.instagramUrl) igEl.href = settings.instagramUrl;

    // Formulario → WhatsApp
    const form = document.getElementById("contacto-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name    = document.getElementById("form-name")?.value.trim() || "";
        const product = document.getElementById("form-product")?.value.trim() || "";
        const msg     = document.getElementById("form-message")?.value.trim() || "";
        if (!name || !msg) {
          Toast.show("Por favor completa nombre y mensaje", "warning");
          return;
        }
        const waMsg = WhatsApp.buildFormMessage(name, product, msg);
        const url   = WhatsApp.buildUrl(waMsg);
        window.open(url, "_blank", "noopener");
        Toast.show("¡Abriendo WhatsApp! Te responderemos pronto.", "success");
        form.reset();
      });
    }

    Animations.observeAll(document.getElementById("app"));
  }
};
