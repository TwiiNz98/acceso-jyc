/* NOSOTROS PAGE — js/pages/nosotros.page.js */
const NosotrosPage = {
  async init() {
    SEO.updateMeta({
      title: "Sobre Nosotros | J&C Tienda - Padre Hurtado",
      description: "Conoce J&C, tu tienda de confianza en Padre Hurtado. Historia, valores y compromiso con la comunidad.",
      url: "https://jyc-tienda.cl/nosotros"
    });
    SEO.setActive("/nosotros");

    const settings = await SettingsService.getSettings();

    // Mapa
    const mapIframe = document.getElementById("nosotros-map-iframe");
    if (mapIframe && settings.googleMapsEmbed) {
      mapIframe.src = settings.googleMapsEmbed;
    }

    // Horarios
    const hoursEl = document.getElementById("nosotros-hours-list");
    if (hoursEl && settings.hours) {
      hoursEl.innerHTML = settings.hours.map(h =>
        `<li><span>${h.day}</span><span>${h.close ? h.open + " – " + h.close : h.open}</span></li>`
      ).join("");
    }

    Animations.observeAll(document.getElementById("app"));
  }
};
