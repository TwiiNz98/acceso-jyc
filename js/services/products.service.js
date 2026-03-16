// products.service.js — Capa de acceso a datos (Firebase o local)
window.JYC_ProductsService = {

  async getAll() {
    if (window.JYC_Firebase.isConfigured) {
      try {
        const snap = await window.JYC_Firebase.db
          .collection('products')
          .where('active', '==', true)
          .get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) {
        console.warn('[J&C] Error Firebase, usando local.', e);
      }
    }
    return (window.JYC_PRODUCTS_DATA || []).filter(p => p.active);
  },

  async getFeatured() {
    const all = await this.getAll();
    return all.filter(p => p.featured);
  },

  async getByCategory(cat) {
    const all = await this.getAll();
    if (!cat || cat === 'todos') return all;
    return all.filter(p => p.category === cat);
  },

  async search(term) {
    const all = await this.getAll();
    const q = term.toLowerCase().trim();
    return all.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  },

  getCategories() {
    return window.JYC_CATEGORIES_DATA || [];
  },

  getHeroSlides() {
    return window.JYC_HERO_SLIDES || [];
  }
};
