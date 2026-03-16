/* ═══════════════════════════════════════════════════════
   HOME PAGE — js/pages/home.page.js
   ═══════════════════════════════════════════════════════ */

const HomePage = {
  async init() {
    SEO.updateMeta({
      title: "J&C | Dulces, Chocolates y Regalos en Padre Hurtado, Santiago",
      description: "Tienda J&C en Padre Hurtado, Santiago. Dulces, chocolates, regalos y más. ¡Pide por WhatsApp!",
      url: "https://jyc-tienda.cl/"
    });
    SEO.setActive("/");

    // Cargar configuración
    const settings = await SettingsService.getSettings();

    // ── Hero carousel ──
    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      const slides = await SettingsService.getHeroSlides();
      this._renderHero(heroEl, slides);
      HeroCarousel.init(heroEl);
    }

    // ── Products strip ──
    const stripEl = document.getElementById("products-strip-section");
    if (stripEl) await ProductsStrip.loadAndRender(stripEl);

    // ── Categorías ──
    const catGrid = document.getElementById("categories-grid");
    if (catGrid) {
      const categories = await ProductsService.getCategories();
      this._renderCategories(catGrid, categories.filter(c => c.id !== "todos"));
    }

    // ── Productos destacados ──
    const featuredGrid = document.getElementById("featured-grid");
    if (featuredGrid) {
      Skeleton.renderGrid(featuredGrid, 4);
      const products = await ProductsService.getFeaturedProducts();
      ProductCard.renderGrid(products.slice(0, 8), featuredGrid);
    }

    // ── Animaciones ──
    Animations.observeAll(document.getElementById("app"));
  },

  _renderHero(heroEl, slides) {
    const track = heroEl.querySelector(".hero__track");
    if (!track || !slides.length) return;
    track.innerHTML = "";
    slides.forEach((slide, i) => {
      const div = document.createElement("div");
      div.className = "hero__slide" + (i === 0 ? " active" : "");

      // Fondo: imagen o color sólido con emoji
      const bgStyle = slide.imageUrl
        ? `background-image: url('${slide.imageUrl}');`
        : `background-color: ${slide.bgColor || "#2C1810"};`;

      const emojiHtml = !slide.imageUrl
        ? `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:flex-end;padding-right:10%;font-size:clamp(120px,18vw,220px);opacity:.15;pointer-events:none;user-select:none;">${slide.bgEmoji || "🛍️"}</div>`
        : "";

      div.innerHTML = `
        <div class="hero__slide-bg" style="${bgStyle}"></div>
        <div class="hero__slide-overlay"></div>
        ${emojiHtml}
        <div class="hero__slide-content">
          <p class="hero__eyebrow">J&amp;C Tienda · Padre Hurtado</p>
          <h1 class="hero__title">${slide.title.replace("\n", "<br>")}</h1>
          <p class="hero__subtitle">${slide.subtitle}</p>
          <div class="hero__actions">
            <a href="${slide.ctaLink || "/catalogo"}" class="btn btn--primary btn--lg" data-link>${slide.ctaText || "Ver productos"}</a>
            <a id="hero-wa-btn" href="#" class="btn btn--outline-light btn--lg" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>`;

      track.appendChild(div);
    });

    // WhatsApp en hero
    const waBtn = heroEl.querySelector("#hero-wa-btn");
    if (waBtn) waBtn.href = WhatsApp.buildUrl(WhatsApp.buildContactMessage());
  },

  _renderCategories(grid, categories) {
    grid.innerHTML = "";
    categories.slice(0, 6).forEach(cat => {
      const a = document.createElement("a");
      a.className = "category-card animate-on-scroll";
      a.href = "/catalogo";
      a.setAttribute("data-link", "");
      a.dataset.category = cat.id;
      a.innerHTML = `<span class="category-card__emoji">${cat.icon || "🛍️"}</span><span class="category-card__name">${cat.name}</span>`;
      a.addEventListener("click", (e) => {
        // Guardar categoría para que el catálogo la seleccione
        sessionStorage.setItem("jyc_selected_category", cat.id);
      });
      grid.appendChild(a);
    });
  }
};
