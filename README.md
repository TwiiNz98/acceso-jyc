# J&C Tienda — Sitio Web Oficial
### Versión 1.0 | HTML + CSS + JavaScript + Firebase

---

## 📦 ESTRUCTURA DEL PROYECTO

```
jyc-tienda/
├── index.html                 ← Página principal (shell SPA)
├── manifest.json              ← PWA config
├── robots.txt                 ← SEO crawlers
├── sitemap.xml                ← Mapa del sitio
├── firebase.json              ← Deploy en Firebase Hosting
├── .htaccess                  ← Routing en hosting Apache
│
├── css/
│   ├── main.css               ← Variables y estilos base
│   ├── animations.css         ← Animaciones keyframes
│   ├── responsive.css         ← Media queries
│   └── components/            ← Estilos por componente
│   └── pages/                 ← Estilos por página
│
├── js/
│   ├── core/
│   │   ├── app.js             ← Punto de entrada
│   │   ├── firebase-init.js   ← ⚠️ CONFIGURAR FIREBASE AQUÍ
│   │   └── router.js          ← Router SPA
│   ├── services/
│   │   ├── products.service.js ← Datos de productos
│   │   └── settings.service.js ← Configuración de la tienda
│   ├── components/            ← Carrusel, modal, cards...
│   ├── pages/                 ← Controladores por página
│   └── utils/                 ← Helpers (whatsapp, seo...)
│
├── partials/                  ← HTML por página (cargado por router)
│   ├── home.html
│   ├── catalogo.html
│   ├── nosotros.html
│   ├── contacto.html
│   └── 404.html
│
└── assets/
    └── images/                ← Logo, og-image, etc.
```

---

## 🚀 INICIO RÁPIDO — Subir el sitio

### Opción A: Firebase Hosting (Recomendado)

1. Instalar Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Iniciar sesión:
   ```bash
   firebase login
   ```
3. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
4. Editar `js/core/firebase-init.js` con tus credenciales
5. Subir el sitio:
   ```bash
   firebase deploy
   ```

### Opción B: Hosting compartido (cPanel, Hostinger, etc.)

1. Subir TODOS los archivos por FTP o el administrador de archivos
2. El archivo `.htaccess` ya está configurado para el routing SPA
3. Asegúrate de que Apache tenga `mod_rewrite` habilitado

### Opción C: Netlify / Vercel

- Netlify: Arrastra la carpeta del proyecto al dashboard
  - En Site settings → Build → añade redirect: `/* /index.html 200`
- Vercel: `vercel deploy` desde la carpeta del proyecto

---

## ⚙️ CONFIGURACIÓN INICIAL OBLIGATORIA

### 1. Número de WhatsApp

Edita `js/services/settings.service.js`, línea:
```javascript
whatsappNumber: "56912345678",  // ← Cambia por tu número real
```
Formato: código de país + número, sin espacios ni +. Ej: `56912345678`

### 2. Firebase (si quieres productos desde la nube)

Edita `js/core/firebase-init.js`:
```javascript
const firebaseConfig = {
  apiKey:            "TU-API-KEY",
  authDomain:        "tu-proyecto.firebaseapp.com",
  projectId:         "tu-proyecto-id",
  storageBucket:     "tu-proyecto.appspot.com",
  messagingSenderId: "TU-SENDER-ID",
  appId:             "TU-APP-ID"
};
```
Puedes obtener estos datos en Firebase Console → Configuración del proyecto.

**Si NO configuras Firebase**, el sitio funciona igual con los productos de demo que están en `js/services/products.service.js`.

### 3. Dominio y SEO

En `index.html`, cambia todas las ocurrencias de `https://jyc-tienda.cl` por tu dominio real.
También edita en `sitemap.xml`.

---

## 📝 NOTA PARA EL USUARIO
### Cómo personalizar el sitio

#### Cambiar textos principales

| Qué cambiar | Dónde |
|---|---|
| Nombre de la tienda | `js/services/settings.service.js` → `storeName` |
| Número de WhatsApp | `js/services/settings.service.js` → `whatsappNumber` |
| Dirección | `js/services/settings.service.js` → `address` |
| Horarios | `js/services/settings.service.js` → `hours` |
| Instagram | `js/services/settings.service.js` → `instagramUrl` |
| Anuncio superior | `js/services/settings.service.js` → `announcement` |
| Slides del hero | `js/services/settings.service.js` → `heroSlides` |

#### Cambiar colores

Todos los colores están en `css/main.css` al inicio del archivo:
```css
:root {
  --c-terra:    #D94F2B;  ← Color principal (terracota)
  --c-black:    #1A1A1A;  ← Navbar y fondo oscuro
  --c-cream:    #FDF6EE;  ← Fondo claro
  --c-whatsapp: #25A244;  ← Color botón WhatsApp
}
```

#### Cambiar tipografía

En `css/main.css`:
```css
--font-display: 'Fraunces', Georgia, serif;  ← Títulos grandes
--font-body:    'Plus Jakarta Sans', ...;    ← Texto general
```
Puedes reemplazar por cualquier fuente de Google Fonts.

#### Cambiar logo

Reemplaza `assets/images/logo/favicon.svg` con tu logo.
El texto "J&C" del navbar está en `index.html` en el elemento `.navbar__logo-icon`.

#### Cambiar textos de secciones

Cada sección tiene su archivo:
- **Inicio** → `partials/home.html`
- **Catálogo** → `partials/catalogo.html`
- **Nosotros** → `partials/nosotros.html`
- **Contacto** → `partials/contacto.html`

Son archivos HTML normales, edita el texto directamente.

---

## 🛒 NOTA PARA EL CLIENTE
### Cómo usar el sitio

#### El sitio tiene estas secciones:

1. **Inicio** — Presentación con carrusel y productos destacados
2. **Productos** — Vista rápida de los más populares
3. **Catálogo** — Todos los productos con filtros y búsqueda
4. **Nosotros** — Historia, valores y ubicación en el mapa
5. **Contacto** — Formulario que abre WhatsApp y datos de contacto

#### Cómo hacer un pedido:

1. Navega al catálogo
2. Haz clic en el producto que te interesa
3. En la card o en el modal, presiona **"Pedir por WhatsApp"**
4. Se abre WhatsApp con el mensaje ya escrito
5. Envíalo y espera la respuesta del negocio

#### El botón verde flotante (esquina inferior derecha):
Siempre visible en todo el sitio. Al hacer clic abre WhatsApp directamente.

#### Búsqueda y filtros:
- En el Catálogo puedes **filtrar por categoría** (Chocolates, Dulces, Regalos...)
- O usar la **barra de búsqueda** para encontrar un producto específico por nombre

---

## 🔧 NOTA PARA EL ADMINISTRADOR
### Cómo agregar y gestionar productos

### OPCIÓN 1: Sin Firebase (Modo Demo / Local)
Edita directamente el array `DEMO_PRODUCTS` en `js/services/products.service.js`:

```javascript
const DEMO_PRODUCTS = [
  // Copia y pega este bloque para cada nuevo producto:
  {
    id: "prod-009",                          // ID único (número siguiente)
    name: "Nombre del Producto",             // ← Cambia esto
    slug: "nombre-del-producto",             // URL amigable (sin tildes, con guiones)
    description: "Descripción del producto.", // ← Cambia esto
    price: 2990,                             // Precio en CLP (solo número)
    comparePrice: 3500,                      // Precio tachado (null si no hay)
    category: "chocolates",                  // Una de: chocolates|dulces|regalos|hogar|temporada|variados
    categoryLabel: "Chocolates",             // Nombre de la categoría con mayúscula
    tags: ["chocolate", "regalo"],           // Palabras clave para búsqueda
    imageUrl: "",                            // URL de imagen (vacío = usa emoji)
    imageEmoji: "🍫",                        // Emoji que se muestra si no hay imagen
    imageAlt: "Descripción de la imagen",    // Texto alternativo SEO
    stock: 20,                               // Cantidad disponible
    featured: true,                          // true = aparece en inicio
    active: true,                            // false = oculto en el catálogo
    badge: "Nuevo",                          // Nuevo | Temporada | Oferta | null
    seasonal: false                          // true = producto de temporada
  },
  // ... resto de productos
];
```

### OPCIÓN 2: Con Firebase (Recomendado para producción)
Una vez que Firebase esté configurado, los productos se agregan desde Firestore:

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto → **Firestore Database**
3. Crea la colección `products`
4. Agrega un nuevo documento con estos campos:

```
name:          "Nombre del Producto"        (string)
slug:          "nombre-del-producto"         (string)
description:   "Descripción..."              (string)
price:         2990                          (number)
comparePrice:  null                          (null o number)
category:      "chocolates"                  (string)
categoryLabel: "Chocolates"                  (string)
tags:          ["tag1", "tag2"]              (array)
imageUrl:      "https://..."                 (string o vacío)
imageEmoji:    "🍫"                          (string)
imageAlt:      "Descripción SEO"             (string)
stock:         20                            (number)
featured:      true                          (boolean)
active:        true                          (boolean)
badge:         "Nuevo"                       (string o null)
seasonal:      false                         (boolean)
createdAt:     (Timestamp del servidor)
```

### Agregar imágenes de productos

**Opción A — URL externa:** Sube la imagen a cualquier servicio (Google Drive, Imgur, Cloudinary) y copia la URL en el campo `imageUrl`.

**Opción B — Firebase Storage:**
1. En Firebase Console → Storage → Upload file
2. Copia la URL pública generada
3. Pégala en el campo `imageUrl` del producto

**Opción C — Sin imagen:** Deja `imageUrl: ""` y pon un emoji en `imageEmoji`. El sitio lo mostrará automáticamente.

### Activar / desactivar un producto

Cambia el campo `active` a `false` para ocultarlo del catálogo sin eliminarlo.

### Crear una categoría nueva

En `DEMO_CATEGORIES` (mismo archivo), agrega:
```javascript
{ id: "snacks", name: "Snacks", icon: "🥨", order: 7, active: true }
```
Y asegúrate de usar ese mismo `id` en los productos de esa categoría.

### Cambiar configuración de la tienda (WhatsApp, horarios, anuncio)

Todo en `js/services/settings.service.js` → objeto `DEMO_SETTINGS`.

Con Firebase: crea el documento `settings/store` en Firestore con los mismos campos.

---

## 🔒 SEGURIDAD

Si usas Firebase, configura las reglas de Firestore para lectura pública y escritura solo autenticada:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lectura pública para productos, categorías, settings
    match /products/{doc}   { allow read: if true; allow write: if request.auth != null; }
    match /categories/{doc} { allow read: if true; allow write: if request.auth != null; }
    match /settings/{doc}   { allow read: if true; allow write: if request.auth != null; }
  }
}
```

---

## 🌐 SEO LOCAL

El sitio está optimizado para búsquedas como:
- "tienda Padre Hurtado"
- "dulces Santiago"
- "chocolates Maipú"
- "regalos Ciudad Satélite"

Para mejorar el posicionamiento local:
1. **Google Business Profile** → Registra tu negocio en [Google My Business](https://business.google.com)
2. Verifica que la dirección en el Schema markup coincida con la de Google Maps
3. Pide a tus clientes que dejen reseñas en Google

---

## 📞 SOPORTE

¿Tienes dudas sobre la configuración? El sitio fue desarrollado con:
- **HTML5 + CSS3 + JavaScript ES6+** — Sin frameworks externos
- **Firebase v10** — Base de datos y hosting en la nube
- **Google Fonts** — Fraunces + Plus Jakarta Sans

---

*J&C Tienda v1.0 — Padre Hurtado, Santiago de Chile*
