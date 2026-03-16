/* NAVBAR — js/components/navbar.js */
const Navbar = {
  init() {
    const navbar     = document.getElementById("navbar");
    const hamburger  = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");

    // Scroll: agrega clase "scrolled"
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 80);
    }, { passive: true });

    // Hamburger toggle
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Cerrar menú al hacer click en un link móvil
    mobileMenu.querySelectorAll(".navbar__mobile-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });

    // Año footer
    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
};
