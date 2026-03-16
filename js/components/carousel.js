/* ═══════════════════════════════════════════════════════
   CAROUSEL — js/components/carousel.js
   Hero carousel + Products strip auto-scroll
   ═══════════════════════════════════════════════════════ */

const HeroCarousel = {
  _track:     null,
  _dots:      null,
  _slides:    [],
  _current:   0,
  _timer:     null,
  _interval:  5000,

  init(containerEl) {
    this._track = containerEl.querySelector(".hero__track");
    const dotsCnt = containerEl.querySelector(".hero__dots");
    this._slides = Array.from(containerEl.querySelectorAll(".hero__slide"));
    if (!this._slides.length) return;

    // Crear dots
    dotsCnt.innerHTML = "";
    this._slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "hero__dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Slide " + (i+1));
      dot.addEventListener("click", () => this.goTo(i));
      dotsCnt.appendChild(dot);
    });
    this._dots = Array.from(dotsCnt.querySelectorAll(".hero__dot"));

    // Flechas
    const prev = containerEl.querySelector(".hero__arrow--prev");
    const next = containerEl.querySelector(".hero__arrow--next");
    if (prev) prev.addEventListener("click", () => this.prev());
    if (next) next.addEventListener("click", () => this.next());

    // Touch / swipe
    let startX = 0;
    containerEl.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    containerEl.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    }, { passive: true });

    // Pause on hover
    containerEl.addEventListener("mouseenter", () => this._stopTimer());
    containerEl.addEventListener("mouseleave", () => this._startTimer());

    this.goTo(0);
    this._startTimer();
  },

  goTo(index) {
    const n = this._slides.length;
    this._current = ((index % n) + n) % n;
    if (this._track) this._track.style.transform = "translateX(-" + (this._current * 100) + "%)";
    this._slides.forEach((s, i) => s.classList.toggle("active", i === this._current));
    this._dots.forEach((d, i) => d.classList.toggle("active", i === this._current));
  },

  next()   { this.goTo(this._current + 1); },
  prev()   { this.goTo(this._current - 1); },

  _startTimer() {
    this._stopTimer();
    this._timer = setInterval(() => this.next(), this._interval);
  },
  _stopTimer() {
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  }
};

/* ── Products Strip: auto-scroll hacia la izquierda ── */
const ProductsStrip = {
  init(stripEl) {
    if (!stripEl) return;
    const inner = stripEl.querySelector(".products-strip__inner");
    if (!inner) return;
    // Duplicar contenido para efecto loop continuo
    const clone = inner.cloneNode(true);
    stripEl.querySelector(".products-strip__wrapper").appendChild(clone);

    // Pausa en hover
    inner.parentElement.addEventListener("mouseenter", () => {
      inner.style.animationPlayState = "paused";
      clone.style.animationPlayState = "paused";
    });
    inner.parentElement.addEventListener("mouseleave", () => {
      inner.style.animationPlayState = "running";
      clone.style.animationPlayState = "running";
    });
  },

  async loadAndRender(containerEl) {
    if (!containerEl) return;
    try {
      const products = await ProductsService.getFeaturedProducts();
      if (!products || !products.length) { containerEl.closest(".products-strip").style.display = "none"; return; }

      const wrapper = containerEl.querySelector(".products-strip__wrapper");
      if (!wrapper) return;

      // Limpiar skeleton
      wrapper.innerHTML = "";
      const inner = document.createElement("div");
      inner.className = "products-strip__inner";

      products.forEach(p => {
        const item = document.createElement("div");
        item.className = "products-strip__item";
        item.dataset.productId = p.id;
        item.innerHTML = p.imageUrl
          ? `<img class="products-strip__img" src="${p.imageUrl}" alt="${p.name}" loading="lazy">`
          : `<div class="products-strip__emoji">${p.imageEmoji || "🛍️"}</div>`;
        item.innerHTML += `
          <span class="products-strip__name">${p.name}</span>
          <span class="products-strip__price">${Formatters.price(p.price)}</span>`;
        item.addEventListener("click", () => ProductModal.open(p));
        inner.appendChild(item);
      });

      wrapper.appendChild(inner);
      // Duplicar para loop
      const clone = inner.cloneNode(true);
      clone.querySelectorAll(".products-strip__item").forEach((item, i) => {
        if (products[i]) item.addEventListener("click", () => ProductModal.open(products[i % products.length]));
      });
      wrapper.appendChild(clone);

      // Pause on hover
      wrapper.addEventListener("mouseenter", () => {
        inner.style.animationPlayState = "paused";
        clone.style.animationPlayState = "paused";
      });
      wrapper.addEventListener("mouseleave", () => {
        inner.style.animationPlayState = "running";
        clone.style.animationPlayState = "running";
      });
    } catch(e) {
      containerEl.closest(".products-strip").style.display = "none";
    }
  }
};
