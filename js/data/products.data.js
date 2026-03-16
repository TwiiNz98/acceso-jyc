/**
 * products.data.js
 * Datos locales de productos (fallback cuando Firebase no está configurado)
 *
 * ================================================
 * NOTA PARA EL ADMINISTRADOR — AGREGAR PRODUCTOS
 * ================================================
 * Para agregar un producto NUEVO en este archivo:
 * 1. Copia el bloque { } de un producto existente
 * 2. Pega al final del array (antes del ] )
 * 3. Cambia el id (número mayor al último)
 * 4. Modifica nombre, precio, categoría, etc.
 * 5. Guarda el archivo — el sitio se actualiza solo
 *
 * CAMPOS DISPONIBLES:
 *   id:           Número único (1, 2, 3...)
 *   name:         Nombre del producto
 *   category:     "dulces" | "chocolates" | "regalos" | "hogar" | "temporada"
 *   emoji:        Emoji que se muestra si no hay imagen (ejemplo: "🍫")
 *   imageUrl:     Ruta a la imagen (ejemplo: "assets/images/mi-producto.jpg")
 *                 Déjalo "" si no tienes imagen aún
 *   price:        Precio en CLP sin puntos (ejemplo: 2990)
 *   comparePrice: Precio anterior tachado, null si no hay oferta
 *   description:  Descripción corta del producto
 *   badge:        "Nuevo" | "Temporada" | "Oferta" | "Limitado" | null
 *   featured:     true = aparece en inicio, false = solo en catálogo
 *   active:       true = visible, false = oculto
 *   stock:        Unidades disponibles (0 = aparece como agotado)
 * ================================================
 */

window.JYC_PRODUCTS_DATA = [
  {
    id: 1,
    name: "Chocolate Relleno Surtido",
    category: "chocolates",
    emoji: "🍫",
    imageUrl: "",
    price: 2990,
    comparePrice: 3500,
    description: "Caja de chocolates rellenos con sabores variados. Perfecta para regalar o disfrutar en familia.",
    badge: "Oferta",
    featured: true,
    active: true,
    stock: 25
  },
  {
    id: 2,
    name: "Gomitas Frutales Mix",
    category: "dulces",
    emoji: "🍬",
    imageUrl: "",
    price: 990,
    comparePrice: null,
    description: "Mezcla de gomitas con sabores frutales. Sin gluten. Bolsa de 250g.",
    badge: "Nuevo",
    featured: true,
    active: true,
    stock: 50
  },
  {
    id: 3,
    name: "Set Regalo Premium",
    category: "regalos",
    emoji: "🎁",
    imageUrl: "",
    price: 4990,
    comparePrice: 6990,
    description: "Set de regalo con selección de chocolates y dulces. Presentación de lujo, ideal para cumpleaños y aniversarios.",
    badge: "Oferta",
    featured: true,
    active: true,
    stock: 12
  },
  {
    id: 4,
    name: "Caramelos Duros Variados",
    category: "dulces",
    emoji: "🍭",
    imageUrl: "",
    price: 1490,
    comparePrice: null,
    description: "Bolsa de caramelos duros con sabores a frutas y menta. 300g.",
    badge: null,
    featured: false,
    active: true,
    stock: 30
  },
  {
    id: 5,
    name: "Alfajores de Manjar",
    category: "dulces",
    emoji: "🎂",
    imageUrl: "",
    price: 2490,
    comparePrice: null,
    description: "Alfajores artesanales rellenos con manjar. Caja de 6 unidades.",
    badge: "Nuevo",
    featured: true,
    active: true,
    stock: 20
  },
  {
    id: 6,
    name: "Jabón Líquido para Manos",
    category: "hogar",
    emoji: "🧴",
    imageUrl: "",
    price: 1990,
    comparePrice: null,
    description: "Jabón líquido antibacterial aroma lavanda. 500ml.",
    badge: null,
    featured: false,
    active: true,
    stock: 35
  },
  {
    id: 7,
    name: "Caja Chocolates Finos",
    category: "chocolates",
    emoji: "🎀",
    imageUrl: "",
    price: 6990,
    comparePrice: null,
    description: "Caja premium con 12 bombones de chocolate. Presentación elegante para regalo.",
    badge: null,
    featured: true,
    active: true,
    stock: 8
  },
  {
    id: 8,
    name: "Velas Aromáticas Decorativas",
    category: "hogar",
    emoji: "🕯️",
    imageUrl: "",
    price: 2990,
    comparePrice: null,
    description: "Set de 3 velas aromáticas decorativas. Aromas: vainilla, canela y naranja.",
    badge: null,
    featured: false,
    active: true,
    stock: 18
  },
  {
    id: 9,
    name: "Caja Navideña Especial",
    category: "temporada",
    emoji: "🎄",
    imageUrl: "",
    price: 7990,
    comparePrice: 9990,
    description: "Edición especial de temporada con surtido navideño. Chocolate, dulces y sorpresas.",
    badge: "Temporada",
    featured: true,
    active: true,
    stock: 15
  },
  {
    id: 10,
    name: "Chocolates de Temporada",
    category: "temporada",
    emoji: "✨",
    imageUrl: "",
    price: 3490,
    comparePrice: null,
    description: "Edición limitada de temporada. Sabores exclusivos disponibles por tiempo limitado.",
    badge: "Temporada",
    featured: false,
    active: true,
    stock: 22
  },
  {
    id: 11,
    name: "Set Cumpleaños Deluxe",
    category: "regalos",
    emoji: "🎂",
    imageUrl: "",
    price: 8990,
    comparePrice: null,
    description: "El regalo perfecto para cumpleaños. Incluye chocolates, dulces y tarjeta personalizada.",
    badge: null,
    featured: false,
    active: true,
    stock: 10
  },
  {
    id: 12,
    name: "Maní Confitado",
    category: "dulces",
    emoji: "🥜",
    imageUrl: "",
    price: 1290,
    comparePrice: null,
    description: "Maní confitado con caramelo y chocolate. Bolsa de 200g.",
    badge: null,
    featured: false,
    active: true,
    stock: 40
  }
];

window.JYC_CATEGORIES_DATA = [
  { id: "todos",      name: "Todos",           emoji: "🛒", order: 0 },
  { id: "dulces",     name: "Dulces",          emoji: "🍬", order: 1 },
  { id: "chocolates", name: "Chocolates",      emoji: "🍫", order: 2 },
  { id: "regalos",    name: "Regalos",         emoji: "🎁", order: 3 },
  { id: "hogar",      name: "Artículos Hogar", emoji: "🏠", order: 4 },
  { id: "temporada",  name: "Temporada",       emoji: "✨", order: 5 }
];

window.JYC_HERO_SLIDES = [
  {
    title:    "Dulces momentos\npara toda la familia",
    subtitle: "Los mejores chocolates, dulces y regalos en Padre Hurtado",
    eyebrow:  "Tu tienda de barrio",
    cta:      "Ver productos",
    ctaLink:  "#/catalogo",
    bg:       "linear-gradient(135deg, #2C1810 0%, #1A0A05 100%)"
  },
  {
    title:    "Regalos especiales\npara cada ocasión",
    subtitle: "Sets premium de regalo listos para entregar. ¡Pide por WhatsApp!",
    eyebrow:  "Sets de regalo",
    cta:      "Ver regalos",
    ctaLink:  "#/catalogo",
    bg:       "linear-gradient(135deg, #0F2818 0%, #1A2820 100%)"
  },
  {
    title:    "Productos de\ntemporada llegaron",
    subtitle: "Ediciones limitadas y productos especiales de la temporada",
    eyebrow:  "Temporada especial",
    cta:      "Ver temporada",
    ctaLink:  "#/catalogo",
    bg:       "linear-gradient(135deg, #1A1530 0%, #0F0F1A 100%)"
  }
];

// Configuración general de la tienda
// MODIFICAR AQUÍ para cambiar datos del negocio
window.JYC_SETTINGS = {
  whatsappNumber: "56912345678",   // ← CAMBIA ESTE NÚMERO por el real
  storeName:      "J&C Tienda",
  address:        "Padre Hurtado, Región Metropolitana, Chile",
  instagram:      "https://instagram.com/jyc.tienda",
  announcement:   "🎉 ¡Bienvenidos a J&C! Pedidos por WhatsApp — Padre Hurtado y comunas cercanas"
};
