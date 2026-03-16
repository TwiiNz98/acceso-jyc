/* Settings Service */
const DEMO_SETTINGS = {
  storeName:        "J&C Tienda",
  whatsappNumber:   "56950147783",
  address:          "Padre Hurtado, Región Metropolitana, Chile",
  googleMapsEmbed:  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13294.0!2d-70.8490!3d-33.5706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c1c5b36c8f69%3A0x9efcce2d3c0a44e!2sPadre%20Hurtado%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2scl!4v1700000000000",
  instagramUrl:     "https://instagram.com/jyc_tienda",
  announcement:     "🎉 ¡Llega tu pedido el mismo día en Padre Hurtado!",
  showAnnouncement: true,
  hours: [
    { day: "Lunes – Viernes", open: "11:00", close: "20:00" },
    { day: "Sábado",          open: "11:00", close: "18:00" },
    { day: "Domingo",         open: "Cerrado", close: "" }
  ],
  heroSlides: [
    { id: "s1", title: "Lo mejor del barrio,\nen tu puerta", subtitle: "Dulces, chocolates, regalos y más en Padre Hurtado.", ctaText: "Ver productos", ctaLink: "/catalogo", bgColor: "#2C1810", bgEmoji: "🍫", active: true },
    { id: "s2", title: "Regalos para\ncada ocasión", subtitle: "Sets especiales para cumpleaños y celebraciones.", ctaText: "Ver regalos", ctaLink: "/catalogo", bgColor: "#1A2C18", bgEmoji: "🎁", active: true },
    { id: "s3", title: "Ofertas de\ntemporada", subtitle: "Descuentos especiales en productos seleccionados.", ctaText: "Ver ofertas", ctaLink: "/catalogo", bgColor: "#2A1A10", bgEmoji: "🌟", active: true }
  ]
};

const SettingsService = {
  _cache: null,
  async getSettings() {
    if (this._cache) return this._cache;
    if (window.JYC_DEMO_MODE) { this._cache = DEMO_SETTINGS; return DEMO_SETTINGS; }
    try {
      const doc = await db.collection("settings").doc("store").get();
      this._cache = doc.exists ? { ...DEMO_SETTINGS, ...doc.data() } : DEMO_SETTINGS;
      return this._cache;
    } catch(e) { return DEMO_SETTINGS; }
  },
  async getHeroSlides() {
    const s = await this.getSettings();
    return (s.heroSlides || DEMO_SETTINGS.heroSlides).filter(sl => sl.active);
  }
};
