const Animations = {
  _observer: null,
  init() {
    this._observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          this._observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    this.observeAll();
  },
  observeAll(root = document) {
    root.querySelectorAll(".animate-on-scroll, .reveal-clip").forEach(el => {
      this._observer && this._observer.observe(el);
    });
  },
  staggerChildren(container, baseDelay = 80) {
    if (!container) return;
    container.querySelectorAll(".animate-on-scroll").forEach((el, i) => {
      el.style.transitionDelay = (i * baseDelay) + "ms";
    });
    this.observeAll(container);
  }
};
