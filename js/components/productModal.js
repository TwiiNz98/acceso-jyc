/* ═══════════════════════════════════════════════════════
   PRODUCT MODAL — js/components/productModal.js
   ═══════════════════════════════════════════════════════ */

const ProductModal = {
  _modal:    null,
  _overlay:  null,
  _isOpen:   false,

  init() {
    this._modal   = document.getElementById("product-modal");
    this._overlay = document.getElementById("modal-overlay");
    if (!this._modal) return;

    // Cerrar con overlay
    this._overlay.addEventListener("click", () => this.close());

    // Botón ×
    document.getElementById("modal-close").addEventListener("click", () => this.close());
    document.getElementById("modal-close-btn").addEventListener("click", () => this.close());

    // Cerrar con Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this._isOpen) this.close();
    });
  },

  open(product) {
    if (!this._modal) return;
    const discount = Formatters.discount(product.price, product.comparePrice);
    const hasCompare = product.comparePrice && product.comparePrice > product.price;

    // Imagen
    const imgEl = document.getElementById("modal-product-image");
    if (product.imageUrl) {
      imgEl.src = product.imageUrl;
      imgEl.alt = product.imageAlt || product.name;
      imgEl.style.display = "block";
      // Limpiar emoji anterior si había
      const prev = this._modal.querySelector(".modal__emoji-fallback");
      if (prev) prev.remove();
    } else {
      imgEl.style.display = "none";
      // Agregar emoji fallback
      let emojiEl = this._modal.querySelector(".modal__emoji-fallback");
      if (!emojiEl) {
        emojiEl = document.createElement("div");
        emojiEl.className = "modal__emoji-fallback";
        emojiEl.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;";
        imgEl.parentNode.insertBefore(emojiEl, imgEl);
      }
      emojiEl.textContent = product.imageEmoji || "🛍️";
    }

    // Badge
    const badgeEl = document.getElementById("modal-product-badge");
    if (product.badge) {
      badgeEl.textContent = product.badge;
      badgeEl.className = "modal__badge badge badge--" + product.badge.toLowerCase();
      badgeEl.style.display = "inline-block";
    } else {
      badgeEl.style.display = "none";
    }

    // Texto
    document.getElementById("modal-product-category").textContent = product.categoryLabel || product.category;
    document.getElementById("modal-product-name").textContent = product.name;
    document.getElementById("modal-product-description").textContent = product.description || "Consulta por WhatsApp para más información.";
    document.getElementById("modal-product-price").textContent = Formatters.price(product.price);

    // Precio tachado
    const compareEl = document.getElementById("modal-product-compare");
    if (hasCompare) {
      compareEl.textContent = Formatters.price(product.comparePrice);
      compareEl.style.display = "inline";
    } else {
      compareEl.style.display = "none";
    }

    // Porcentaje descuento
    const discEl = document.getElementById("modal-product-discount");
    if (discount) {
      discEl.textContent = "–" + discount + "%";
      discEl.style.display = "inline-block";
    } else {
      discEl.style.display = "none";
    }

    // WhatsApp button
    const waBtn = document.getElementById("modal-whatsapp-btn");
    waBtn.href = WhatsApp.buildUrl(WhatsApp.buildProductMessage(product));
    waBtn.onclick = () => Toast.show("Abriendo WhatsApp…", "whatsapp", 2000);

    // Abrir
    this._modal.classList.add("open");
    this._modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    this._isOpen = true;
  },

  close() {
    if (!this._modal || !this._isOpen) return;
    this._modal.classList.remove("open");
    this._modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    this._isOpen = false;
  }
};
