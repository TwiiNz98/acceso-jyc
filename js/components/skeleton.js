const Skeleton = {
  createCard() {
    const el = document.createElement("div");
    el.className = "skeleton-card";
    el.innerHTML = `
      <div class="skeleton-card__image skeleton"></div>
      <div class="skeleton-card__body">
        <div class="skeleton-card__line skeleton skeleton-card__line--sm"></div>
        <div class="skeleton-card__line skeleton skeleton-card__line--md"></div>
        <div class="skeleton-card__line skeleton skeleton-card__line--lg"></div>
        <div class="skeleton-card__btn skeleton"></div>
      </div>`;
    return el;
  },
  renderGrid(container, count = 8) {
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < count; i++) container.appendChild(this.createCard());
  }
};
