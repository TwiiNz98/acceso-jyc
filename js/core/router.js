/* ═══════════════════════════════════════════════════════
   ROUTER — js/core/router.js
   SPA con History API, fetch de partials, controladores
   ═══════════════════════════════════════════════════════ */

const Router = {
  _routes: {
    "/":          { partial: "partials/home.html",      controller: () => HomePage.init()     },
    "/productos": { partial: "partials/home.html",      controller: () => HomePage.init()     },
    "/catalogo":  { partial: "partials/catalogo.html",  controller: () => CatalogoPage.init() },
    "/nosotros":  { partial: "partials/nosotros.html",  controller: () => NosotrosPage.init() },
    "/contacto":  { partial: "partials/contacto.html",  controller: () => ContactoPage.init() },
    "/404":       { partial: "partials/404.html",       controller: () => {}                  }
  },
  _partialCache: {},
  _currentPath:  null,

  init() {
    // Interceptar clicks en links con data-link
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-link]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto")) return;
      e.preventDefault();
      this.navigate(href);
    });

    // Botón Atrás / Adelante del navegador
    window.addEventListener("popstate", () => {
      this.loadRoute(window.location.pathname, false);
    });

    // Carga inicial
    this.loadRoute(window.location.pathname, false);
  },

  navigate(path) {
    // Limpiar query string para comparar ruta base
    const basePath = path.split("?")[0];
    if (basePath === this._currentPath) return;
    history.pushState({}, "", path);
    this.loadRoute(basePath, true);
  },

  async loadRoute(path, animate = true) {
    // Normalizar path
    let normalPath = path === "" ? "/" : path;
    if (normalPath !== "/" && normalPath.endsWith("/")) normalPath = normalPath.slice(0,-1);

    const route = this._routes[normalPath] || this._routes["/404"];
    this._currentPath = normalPath;

    const app = document.getElementById("app");
    if (!app) return;

    // ── Animación de salida ──
    if (animate) {
      app.classList.add("is-leaving");
      await new Promise(r => setTimeout(r, 200));
    }

    // ── Cargar partial (con caché) ──
    try {
      let html;
      if (this._partialCache[route.partial]) {
        html = this._partialCache[route.partial];
      } else {
        const res = await fetch(route.partial);
        if (!res.ok) throw new Error("404");
        html = await res.text();
        this._partialCache[route.partial] = html;
      }

      app.innerHTML = html;
    } catch {
      app.innerHTML = await this._loadFallback();
    }

    // ── Scroll al top ──
    window.scrollTo({ top: 0, behavior: "instant" });

    // ── Animación de entrada ──
    app.classList.remove("is-leaving");
    if (animate) {
      app.classList.add("is-entering");
      setTimeout(() => app.classList.remove("is-entering"), 400);
    }

    // ── Ejecutar controlador de página ──
    try {
      await route.controller();
    } catch(err) {
      console.error("Error en controlador:", err);
    }
  },

  async _loadFallback() {
    try {
      const res = await fetch("partials/404.html");
      if (res.ok) return res.text();
    } catch {}
    return `<div style="text-align:center;padding:80px 20px;">
      <h1 style="font-size:60px;font-family:'Fraunces',serif;">404</h1>
      <p>Página no encontrada</p>
      <a href="/" data-link style="color:#D94F2B;font-weight:600;">Volver al inicio →</a>
    </div>`;
  }
};
