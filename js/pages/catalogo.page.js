/* ═══════════════════════════════════════════════════════
   CATÁLOGO PAGE — js/pages/catalogo.page.js
   ═══════════════════════════════════════════════════════ */

const CatalogoPage = {
  _allProducts: [],
  _currentCategory: "todos",
  _searchTerm: "",

  async init() {
    SEO.updateMeta({
      title: "Catálogo de Productos | J&C Tienda - Padre Hurtado",
      description: "Explora nuestros productos: dulces, chocolates, regalos y más. Disponible en Padre Hurtado y Maipú.",
      url: "https://jyc-tienda.cl/catalogo"
    });
    SEO.setActive("/catalogo");

    const grid     = document.getElementById("catalogo-grid");
    const filtersEl= document.getElementById("catalogo-filters");
    const searchEl = document.getElementById("catalogo-search");
    if (!grid) return;

    // Skeleton mientras carga
    Skeleton.renderGrid(grid, 8);

    // Cargar categorías y productos en paralelo
    const [categories, products] = await Promise.all([
      ProductsService.getCategories(),
      ProductsService.getAllProducts()
    ]);

    this._allProducts = products;

    // Renderizar filtros
    if (filtersEl) this._renderFilters(filtersEl, categories);

    // Verificar categoría pre-seleccionada (desde Home)
    const savedCat = sessionStorage.getItem("jyc_selected_category");
    if (savedCat) {
      this._currentCategory = savedCat;
      sessionStorage.removeItem("jyc_selected_category");
    }

    // Verificar URL param
    const urlParams = new URLSearchParams(window.location.search);
    const urlCat = urlParams.get("categoria");
    if (urlCat) this._currentCategory = urlCat;

    // Marcar filtro activo
    if (filtersEl) {
      const activeChip = filtersEl.querySelector(`[data-category="${this._currentCategory}"]`);
      if (activeChip) {
        filtersEl.querySelectorAll(".category-chip").forEach(c => c.classList.remove("active"));
        activeChip.classList.add("active");
      }
    }

    // Buscador
    if (searchEl) {
      searchEl.addEventListener("input", (e) => {
        this._searchTerm = e.target.value;
        this._applyFilters(grid);
      });
    }

    this._applyFilters(grid);
  },

  _renderFilters(container, categories) {
    container.innerHTML = "";
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "category-chip" + (cat.id === this._currentCategory ? " active" : "");
      btn.dataset.category = cat.id;
      btn.textContent = (cat.icon ? cat.icon + " " : "") + cat.name;
      btn.addEventListener("click", () => {
        this._currentCategory = cat.id;
        container.querySelectorAll(".category-chip").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        const grid = document.getElementById("catalogo-grid");
        this._applyFilters(grid);
      });
      container.appendChild(btn);
    });
  },

  async _applyFilters(grid) {
    if (!grid) return;

    // Fade out rápido
    grid.style.opacity = "0.4";
    grid.style.transform = "translateY(4px)";

    let products = this._currentCategory === "todos"
      ? this._allProducts
      : this._allProducts.filter(p => p.category === this._currentCategory);

    if (this._searchTerm) {
      products = ProductsService.searchProducts(products, this._searchTerm);
    }

    await new Promise(r => setTimeout(r, 150));

    grid.style.transition = "opacity .35s, transform .35s";
    grid.style.opacity = "1";
    grid.style.transform = "translateY(0)";

    ProductCard.renderGrid(products, grid);

    // Actualizar contador
    const countEl = document.getElementById("catalogo-count");
    if (countEl) countEl.textContent = products.length + " producto" + (products.length !== 1 ? "s" : "");
  }
};
