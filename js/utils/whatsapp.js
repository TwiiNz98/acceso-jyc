const WhatsApp = {
  _number: null,
  async init() {
    const s = await SettingsService.getSettings();
    this._number = s.whatsappNumber || "56912345678";
  },
  getNumber() { return this._number || "56912345678"; },
  buildUrl(message) {
    return "https://wa.me/" + this.getNumber() + "?text=" + encodeURIComponent(message);
  },
  buildProductMessage(product) {
    return (
      "Hola J&C! 👋\n" +
      "Me interesa este producto:\n\n" +
      "📦 *" + product.name + "*\n" +
      "💰 Precio: " + Formatters.price(product.price) + "\n" +
      "🏷️ Categoría: " + (product.categoryLabel || product.category) + "\n\n" +
      "¿Está disponible? ¿Cómo coordino el pedido?"
    );
  },
  buildContactMessage() {
    return "Hola J&C! 👋\nMe gustaría hacer una consulta.";
  },
  buildFormMessage(name, product, message) {
    return (
      "Hola J&C! 👋\n" +
      "Mi nombre es *" + name + "*\n" +
      (product ? "Producto de interés: " + product + "\n" : "") +
      "\n" + message
    );
  },
  setAllLinks(url) {
    ["navbar-whatsapp","mobile-whatsapp","whatsapp-fab","footer-phone"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = url || this.buildUrl(this.buildContactMessage());
    });
  }
};
