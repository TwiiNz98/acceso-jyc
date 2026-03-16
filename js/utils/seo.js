const SEO = {
  updateMeta({ title, description, url, image } = {}) {
    if (title) document.title = title + " | J&C Tienda";
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", description);
    }
    if (url) {
      let c = document.querySelector('link[rel="canonical"]');
      if (c) c.setAttribute("href", url);
      let og = document.querySelector('meta[property="og:url"]');
      if (og) og.setAttribute("content", url);
    }
  },
  setActive(path) {
    document.querySelectorAll(".navbar__link").forEach(a => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === path || (path !== "/" && href !== "/" && path.startsWith(href)));
    });
  }
};
