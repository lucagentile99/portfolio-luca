# Portfolio — Luca Gentile

Portfolio profesional de Luca Martín Gentile: Digital Media Planner, especialista en Paid
Media, estrategia de campañas y gestión de cuentas. Sitio construido en React + Vite +
TypeScript, sin backend, pensado para presentarse ante agencias, empresas y reclutadores.

Dirección visual inspirada en un escritorio editorial: carpetas, archivos y cursores como
lenguaje gráfico propio, paleta crema / marrón profundo con un azul de acento, tipografía
sans-serif de gran escala combinada con una serif itálica para detalles editoriales.

## Stack

- React 19 + TypeScript
- Vite 8, con `base: "./"` (rutas relativas) para que `dist/index.html` funcione tanto
  publicado en un hosting como abierto directamente con doble clic (`file://`)
- CSS organizado por componente + variables globales en `src/index.css`
- Sin librerías de UI externas (iconos en SVG inline, modal de casos y lightbox hechos a mano)
- Imágenes en formato WebP (convertidas con `cwebp`), resueltas en tiempo de ejecución con
  `src/utils/assetPath.ts` (ver más abajo)

## Instalación

Requiere [Node.js](https://nodejs.org/) 20 o superior.

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Por defecto queda disponible en `http://localhost:5173`.

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para publicar. Para previsualizar ese build localmente:

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Estructura del proyecto

```
src/
  components/
    Header, Hero, ProfessionalStats, About, Experience,
    Projects/            Casos profesionales: grilla con filtros + modal + lightbox
    CampanasIntegrales/  Campañas académicas (Yelmo, AVIRA, Riccitelli) + metodología,
                         reutiliza el mismo modal que Projects/
    Skills/              Habilidades + módulo de Idiomas (tarjetas ES/EN)
    Education, Contact, Footer
  data/                 Todo el contenido editable (ver tabla abajo)
  hooks/                useActiveSection (nav activo) y useReveal (animación de entrada)
  types/                Tipos TypeScript compartidos (CaseStudy, AcademicCampaign, ...)
  utils/
    assetPath.ts         Resuelve rutas de public/ contra el `base` de Vite (ver Stack)
    caseModal.ts          Adapta CaseStudy/AcademicCampaign a la forma que usa el modal
  index.css             Variables de diseño (color, tipografía, espaciado) + estilos base
public/
  cv/luca-gentile-cv.pdf
  images/                Todo en formato .webp
    profile/            Foto de Luca
    projects/<cuenta>/   Galería de cada caso profesional (incluye east-west/ y remax/)
    academic/<campaña>/  Galería de cada campaña académica
  favicon.svg            Favicon con el monograma "LG"
```

## Cómo editar el contenido

Todo el contenido "de texto" vive en `src/data/`, separado de los componentes:

| Archivo | Qué contiene |
|---|---|
| `src/data/siteConfig.ts` | Nombre, ubicación, email, LinkedIn, rutas de foto y CV, URL del sitio |
| `src/data/hero.ts` | Textos del Hero (kicker, título, descripción, etiquetas de la carpeta) |
| `src/data/stats.ts` | Indicadores de la franja de estadísticas |
| `src/data/about.ts` | Texto de "Sobre mí" y los pilares |
| `src/data/experience.ts` | Experiencia en Melancia e Impulso (textual del CV) |
| `src/data/projects.ts` | Los 7 casos profesionales, todos activos y con imágenes: Wellington, Full Power, RE/MAX, Quintón, Indusnor, OMA Sushi, East West |
| `src/data/academic.ts` | Metodología + las 3 campañas académicas, en orden de curaduría: Yelmo, AVIRA, Riccitelli |
| `src/data/skills.ts` | Grupos de habilidades + idiomas (`languages`, con nivel en escala de 6, sin porcentajes) |
| `src/data/education.ts` | Intro + formación académica, con palabra clave por formación para la línea de tiempo |

No hace falta tocar los componentes `.tsx` para actualizar textos: alcanza con editar estos
archivos de datos. Esto también deja el sitio listo para una futura versión en inglés: bastaría
con crear un segundo set de archivos de datos (o un objeto por idioma) sin tocar componentes.

### Reemplazar la foto

1. Colocar el archivo (jpg/png/webp, optimizado) en `public/images/profile/`.
2. Actualizar `photoPath` en `src/data/siteConfig.ts` si cambia el nombre de archivo.
3. Si `photoPath` queda vacío, el Hero muestra automáticamente el monograma "LG".

### Agregar o reemplazar el CV

1. Colocar el PDF en `public/cv/` como `luca-gentile-cv.pdf` (o actualizar `cvPath` en
   `src/data/siteConfig.ts` si se usa otro nombre).
2. El botón "Descargar CV" (Header, Hero y Contacto) ya apunta a esa ruta.

### Agregar imágenes a un caso

1. Colocar los archivos en `public/images/projects/<cuenta>/` (o `public/images/academic/<campaña>/`).
2. Agregar cada imagen al array `gallery` del caso correspondiente en `src/data/projects.ts`
   (o `academic.ts`), con un `alt` descriptivo.
3. La primera imagen del array se usa como portada de la tarjeta.

### Agregar un nuevo caso profesional

Sumar un objeto al array `caseStudies` en `src/data/projects.ts` siguiendo el tipo `CaseStudy`
(`src/types/index.ts`). Marcar `featured: true` para que aparezca en la grilla principal, o
`false` para que aparezca en "Casos complementarios". El orden del array define el orden en
pantalla.

### Desactivar temporalmente un caso

Si en el futuro falta material para alguna cuenta, se puede agregar `active: false` a su
objeto en `src/data/projects.ts`: no se renderiza en ningún lado (ni tarjeta, ni filtros, ni
modal), pero el objeto queda completo en el código, listo para reactivarse más adelante
completando los campos y volviendo a poner `active: true` (o quitando la propiedad).
Actualmente los 7 casos están activos.

## Publicar el sitio

1. Correr `npm run build`.
2. Subir el contenido de `dist/` a cualquier hosting estático (Vercel, Netlify, GitHub Pages,
   Cloudflare Pages, etc.).
3. Cuando exista un dominio propio:
   - Completar `siteUrl` en `src/data/siteConfig.ts`.
   - En `index.html`, agregar de nuevo `<link rel="canonical">`, `<meta property="og:url">` y
     el campo `"url"` del JSON-LD (se dejaron comentados/omitidos a propósito para no publicar
     una URL de ejemplo).
   - Agregar un `og:image` (1200×630 px) para previsualización en redes.

## Datos pendientes / a confirmar con Luca

- **Quintón**: el material disponible sigue siendo solo calendarios de contenido y una
  presentación institucional, sin un reporte de métricas — no se publica ningún número como
  resultado confirmado. Usa una descripción cualitativa en `resultsNote`, con un
  `[PENDIENTE: agregar reporte de métricas...]` explícito. Cuando exista un reporte real,
  reemplazar `resultsNote` por `resultPeriods` con las cifras.
- **Wellington**: sin métricas de resultado todavía (a pedido explícito: "proyecto en
  desarrollo"). Cuando haya resultados, agregarlos a `resultPeriods` en `projects.ts`.
- **Riccitelli**: la afirmación "sin químicos, sin sulfitos" viene del material académico de la
  marca — se dejó aclarado como tal (no verificada de forma independiente para este portfolio).
- **East West, RE/MAX, Full Power, OMA Sushi e Indusnor**: verificados contra reportes reales
  ("Reporte East West.pdf", "REPORTE MAYO 2026 Remax.pdf", "Reporte Full Power.pdf", "Reporte
  OMA Sushi - Julio 2025.pdf", "REPORTE Indusnor JULIO 2026.pdf") — sin cambios pendientes.
- **Fotografía**: se usó `foto perfil.jpg` (la única foto profesional real recibida). Si Luca
  prefiere otra, reemplazar `public/images/profile/luca-gentile.webp`.
- **CV**: se incorporó `Luca Martin Gentile - CV.pdf` (la versión más reciente encontrada,
  agosto 2026) como `public/cv/luca-gentile-cv.pdf`.
- **Dominio**: no hay un dominio propio todavía. `siteUrl` quedó vacío a propósito y el
  `index.html` omite canonical/OG/JSON-LD con URL hasta que exista uno real. También falta el
  `og:image` de 1200×630 px (marcado `[PENDIENTE]` en `index.html`).
- **Versión en inglés**: el header tiene un selector ES/EN visible (para que el espacio ya esté
  reservado en el diseño), pero el botón "EN" está deshabilitado a propósito — no existe
  todavía contenido en inglés y no se quiso inventar una traducción. El sitio ya separa todo el
  contenido en `src/data/`, lo que facilita agregar un segundo set de textos en inglés más
  adelante y activar el botón.
- **Contacto**: no tiene formulario — tres CTA directos (email, LinkedIn, CV), ya que el
  formulario anterior solo abría el cliente de correo (`mailto:`) y no enviaba nada realmente.
  Si más adelante se integra un servicio de formularios real (ej. Formspree, un backend
  propio), se puede agregar un formulario de nuevo.
