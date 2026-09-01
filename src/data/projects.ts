import type { CaseStudy } from "../types";

/**
 * Casos profesionales, ordenados directamente por relevancia (ya no hay
 * filtros en la sección — este orden ES el orden final que se muestra):
 * Wellington, Full Power, East West, RE/MAX, Quintón como principales;
 * Indusnor y OMA Sushi como complementarios.
 *
 * Notas de curaduría (no eliminar sin avisar a Luca):
 * - East West: activado. Reporte real recibido ("Reporte East West.pdf",
 *   enero-febrero 2026) — las cifras y la galería salen de ese archivo. Las
 *   imágenes son capturas del propio reporte (no hay piezas de campaña
 *   sueltas para esta cuenta en el material disponible).
 * - RE/MAX: activado con cifras reales de mayo 2026 ("REPORTE MAYO 2026
 *   Remax.pdf").
 * - Quintón: no hay un reporte cuantitativo en el material (solo
 *   calendarios de contenido y una presentación institucional), así que no
 *   se publican números como resultados confirmados — no muestra bloque de
 *   Resultados en el modal. Si en el futuro se confirma un reporte, agregar
 *   `resultPeriods` con las cifras reales.
 * - OMA Sushi: el reporte real disponible ("Reporte OMA Sushi - Julio
 *   2025.pdf") es de una campaña de Alcance + Tráfico, no de Compras. Las
 *   cifras que se habían mencionado antes (170 compras, $3.111,04, etc.) no
 *   aparecen en ese archivo, así que se reemplazaron por las cifras reales
 *   y verificables del reporte.
 * - Full Power e Indusnor: verificadas contra los reportes reales
 *   ("Reporte Full Power.pdf", "REPORTE Indusnor JULIO 2026.pdf").
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "wellington",
    name: "Wellington Polo Club",
    tagline: "Estrategia de contenido y campaña integral",
    category: "Estrategia de contenido · Dirección creativa · Campaña integral · Indumentaria",
    cardType: "Campaña integral",
    featured: true,
    statusLabel: "Proyecto actual",
    cardDescription: "Sistema integral de contenido, campañas y pauta para una marca de indumentaria premium.",
    industry: "Indumentaria premium",
    cardTags: ["Dirección creativa", "Campaña integral", "Meta Ads"],
    context:
      "Wellington Polo Club es una marca argentina de indumentaria masculina premium, fundada en 2014, con un posicionamiento inspirado en la herencia del polo: elegancia, disciplina y tradición. La comunicación necesitaba evolucionar desde publicaciones independientes hacia un sistema con identidad propia, capaz de mantener un tono reconocible en redes, campañas, anuncios y email marketing.",
    challenge:
      "El desafío no era solo generar contenido, sino construir una gramática de marca: reglas, criterios y procesos para que cada pieza se sintiera auténticamente Wellington, sin importar el formato o quién la produjera. La comunicación también debía responder a lanzamientos, tráfico a tienda online, visitas a tiendas físicas, rotación de stock, promociones, campañas estacionales y conservación del posicionamiento premium.",
    objective:
      "Diseñar un sistema integral que conectara contenido orgánico, pauta, email marketing y campañas estacionales, manteniendo una identidad consistente.",
    insight:
      "La herencia del polo no debía funcionar solo como recurso visual, sino como fuente de la comunicación: cada mensaje debía relacionarse con algo auténtico de Wellington (su historia, productos, universo y valores).",
    participation: [
      { text: "Estrategia de contenido", category: "estrategia", highlight: true },
      { text: "Investigación de marca y de competencia", category: "estrategia" },
      { text: "Desarrollo de territorios creativos", category: "creatividad", highlight: true },
      { text: "Conceptualización de campañas", category: "creatividad" },
      { text: "Dirección creativa", category: "creatividad", highlight: true },
      { text: "Redacción", category: "creatividad" },
      { text: "Planificación de Feed e Historias", category: "implementacion" },
      { text: "Anuncios para Meta Ads", category: "implementacion" },
      { text: "Email marketing", category: "implementacion" },
      { text: "Documentación de marca", category: "implementacion" },
      { text: "Revisión editorial y control de calidad", category: "implementacion" },
    ],
    strategy: [
      "Guía de comunicación con estructura de copy basada en hook, desarrollo y CTA.",
      "Reglas de voseo y lista de palabras a evitar.",
      "Diferenciación de tono entre Feed, Historias, anuncios y email.",
      "Criterios de imagen: composiciones limpias y correspondencia entre producto, imagen y texto.",
      "Revisión editorial e incorporación sistemática del feedback del cliente.",
    ],
    execution: [
      {
        title: "Redes sociales",
        items: [
          "Calendarios mensuales con distribución de producto y continuidad entre semanas.",
          "Feed e Historias adaptados por formato, con control de calidad.",
        ],
      },
      {
        title: "Meta Ads",
        items: [
          "Placas y carruseles con objetivo definido por pieza.",
          "Adaptación de copies y CTA al público de cada campaña.",
        ],
      },
      {
        title: "Email marketing",
        items: [
          "Adaptación de campañas con jerarquización de producto y beneficio.",
          "Mensajes orientados a conversión, conservando el tono premium.",
        ],
      },
      {
        title: "Campañas comerciales",
        items: [
          "Final Sale, descuentos, promociones, 3x2, lanzamientos y nueva temporada.",
          "Activaciones propias con identidad de marca en vez de formatos genéricos: 'Julio se viste de WPC' (beneficio para personas llamadas Julio, con DNI en local), cupones post-partido durante el Mundial y una mecánica de voucher sorpresa para el Día del Amigo.",
        ],
      },
    ],
    channels: ["Instagram", "Meta Ads", "Email marketing"],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Canva", "Google Workspace"],
    learnings:
      "La consistencia de una marca no se sostiene únicamente con un manual estático, sino con un proceso: reglas documentadas, criterios compartidos, control de calidad y revisión editorial.",
    gallery: [
      { src: "/images/projects/wellington/wellington-cover.webp", alt: "Fotografía editorial de campaña de Wellington Polo Club, dos modelos con buzos de la marca" },
      { src: "/images/projects/wellington/wellington-dia-amigo.webp", alt: "Banner web de campaña Día del Amigo de Wellington Polo Club" },
      { src: "/images/projects/wellington/wellington-feed-agosto.webp", alt: "Portada de feed de Instagram, campaña Final Sale de Wellington Polo Club" },
      { src: "/images/projects/wellington/wellington-historias-producto.webp", alt: "Historia de Instagram con producto Buzo Surco de Wellington Polo Club" },
      { src: "/images/projects/wellington/wellington-meta-ads.webp", alt: "Anuncio de Meta Ads del Sweater Pehuén de Wellington Polo Club" },
      { src: "/images/projects/wellington/wellington-final-sale-banner.webp", alt: "Banner de campaña Final Sale de Wellington Polo Club" },
    ],
  },
  {
    id: "full-power",
    name: "Full Power",
    tagline: "Optimización y gestión de performance",
    category: "Paid Media · E-commerce · Performance",
    cardType: "Paid Media",
    featured: true,
    cardDescription: "Campañas de conversión en Meta Ads para e-commerce, con foco en remarketing y ROAS.",
    industry: "Fitness & deporte",
    cardTags: ["Meta Ads", "Performance"],
    context:
      "Full Power es una tienda de indumentaria y suplementos deportivos con venta online. El trabajo se concentró en campañas de conversión, combinando remarketing, audiencias de alta intención y distribución estratégica del presupuesto entre Black Friday, CyberMonday y los meses de menor demanda posteriores.",
    challenge:
      "Sostener el volumen de compras logrado durante los eventos de noviembre (Black Friday y CyberMonday) una vez terminado el pico promocional, en un escenario post-promocional con menor intención de compra.",
    objective:
      "Generar compras, optimizar la inversión, aprovechar CyberMonday y Black Friday, y mantener resultados durante los meses de menor demanda.",
    participation: [
      { text: "Planificación de campañas", category: "estrategia", highlight: true },
      { text: "Segmentación de audiencias", category: "estrategia" },
      { text: "Gestión de presupuesto", category: "implementacion" },
      { text: "Optimización y reporting", category: "implementacion", highlight: true },
    ],
    strategy: [
      "Segmentación de audiencias personalizadas y remarketing a visitantes con intención de compra.",
      "Optimización al evento de compra y priorización de públicos con mayor probabilidad de conversión.",
      "Creatividades orientadas a urgencia y beneficios.",
      "Seguimiento y redistribución presupuestaria entre campañas de Remarketing, Compra Advantage y Tráfico.",
    ],
    tools: ["Meta Ads Manager", "Meta Business Suite"],
    resultPeriods: [
      {
        period: "Noviembre (Black Friday / CyberMonday)",
        metrics: [
          { value: "432", label: "compras" },
          { value: "34.963", label: "alcance total" },
          { value: "105,45", label: "ROAS promedio" },
        ],
      },
      {
        period: "Diciembre",
        metrics: [
          { value: "160", label: "compras" },
          { value: "19.097", label: "alcance (+31,2%)" },
          { value: "188.252", label: "impresiones (+18,0%)" },
          { value: "37,72", label: "ROAS (remarketing)" },
          { value: "ARS 2.610", label: "costo promedio por compra" },
        ],
      },
      {
        period: "Enero",
        metrics: [
          { value: "164", label: "compras (+2,5%)" },
          { value: "27.248", label: "alcance (+33,8%)" },
          { value: "35,70", label: "ROAS" },
        ],
      },
    ],
    learnings:
      "El mayor volumen se alcanzó durante CyberMonday y Black Friday. Después, la estrategia se orientó a estabilizar resultados mediante remarketing y segmentación por intención, manteniendo conversiones durante los meses de menor demanda.",
    gallery: [
      { src: "/images/projects/full-power/fullpower-banner-cyber.webp", alt: "Banner de campaña Cyber Full Power con descuentos de hasta 95%" },
      { src: "/images/projects/full-power/fullpower-producto-creatina.webp", alt: "Pieza de producto: Creatina Full Power con descuento por transferencia" },
      { src: "/images/projects/full-power/fullpower-lifestyle.webp", alt: "Pieza de campaña Cyber Full Power con foco en indumentaria deportiva" },
    ],
  },
  {
    // Activado: reporte real recibido ("Reporte East West.pdf", enero-febrero
    // 2026). Cifras verificadas contra ese archivo.
    id: "east-west",
    name: "East West",
    tagline: "Escalado de campañas de tráfico, mensajes y ventas",
    category: "Paid Media · Meta Ads · E-commerce",
    cardType: "Paid Media",
    featured: true,
    cardDescription: "Escalado de campañas de tráfico, mensajes y ventas en Meta Ads para indumentaria online.",
    industry: "Moda & e-commerce",
    cardTags: ["Meta Ads", "E-commerce"],
    context:
      "East West es una marca de indumentaria con venta online. El trabajo combinó tres objetivos de campaña en simultáneo — tráfico, mensajes y ventas — con seguimiento mensual para decidir dónde escalar presupuesto.",
    challenge:
      "Escalar inversión sin perder eficiencia: en enero la campaña de ventas (con objetivo Add to Cart) estaba en fase de aprendizaje y todavía generaba pocas compras directas.",
    objective:
      "Sostener tráfico y conversaciones a bajo costo mientras el algoritmo aprendía sobre la campaña de ventas, para escalarla en cuanto empezara a rendir.",
    participation: [
      { text: "Planificación de campañas de tráfico, mensajes y ventas", category: "estrategia", highlight: true },
      { text: "Selección de piezas por resultados", category: "creatividad" },
      { text: "Seguimiento mensual de inversión y resultados", category: "implementacion", highlight: true },
      { text: "Redacción de insights y próximos pasos", category: "implementacion" },
    ],
    strategy: [
      "Campaña de tráfico optimizada a Add to Cart, con foco en volumen a costo mínimo.",
      "Campaña de mensajes trabajando remarketing y cercanía con la audiencia.",
      "Campaña de ventas escalada progresivamente a medida que el algoritmo acumulaba datos de conversión.",
    ],
    channels: ["Meta Ads", "Instagram"],
    tools: ["Meta Ads Manager", "Meta Business Suite"],
    resultPeriods: [
      {
        period: "Enero 2026 · Campaña de tráfico",
        metrics: [
          { value: "60.861", label: "alcance (+144%)" },
          { value: "2.842", label: "visitas a la web (+553%)" },
          { value: "USD 0,02", label: "costo por resultado (-60%)" },
        ],
      },
      {
        period: "Enero 2026 · Campaña de mensajes",
        metrics: [
          { value: "327", label: "conversaciones iniciadas (+445%)" },
          { value: "USD 0,71", label: "costo por conversación (-35%)" },
        ],
      },
      {
        period: "Febrero 2026 · Campaña de ventas",
        metrics: [
          { value: "15,55", label: "ROAS (+235,1%)" },
          { value: "67", label: "ventas (+6.600%)" },
          { value: "81.181", label: "alcance (+274,8%)" },
        ],
      },
    ],
    resultsConclusion:
      "La optimización permitió ampliar significativamente el alcance, aumentar las visitas y consolidar una campaña de ventas con un ROAS de 15,55.",
    learnings:
      "La campaña de ventas se lanzó con objetivo Add to Cart para acelerar el aprendizaje del algoritmo: en enero, todavía en fase de aprendizaje, generó pocas compras directas; en febrero, con más datos acumulados, escaló a 67 ventas y un ROAS de 15,55. En las tres campañas, los reels (especialmente con una persona hablando a cámara) superaron ampliamente a las piezas estáticas.",
    coverStats: {
      eyebrow: "PERFORMANCE OVERVIEW",
      metrics: [
        { value: "15,55", label: "ROAS" },
        { value: "67", label: "ventas" },
        { value: "81.181", label: "personas alcanzadas" },
      ],
    },
    // Sin galería: el único material disponible eran capturas del reporte en
    // PDF (portada, tablas y gráficos internos), no piezas de campaña. Se
    // reemplazaron por PerformanceVisual (resultados) y coverStats (portada).
    // El PDF original se conserva como fuente en la carpeta del proyecto.
    gallery: [],
  },
  {
    id: "remax",
    name: "RE/MAX María Inés",
    tagline: "Coordinación de contenidos y estrategia digital",
    category: "Social Media · Contenidos · Real Estate",
    cardType: "Social Media",
    featured: true,
    cardDescription: "Contenido y estrategia digital para posicionar una cuenta inmobiliaria y generar consultas.",
    industry: "Real estate",
    cardTags: ["Social Media", "Contenido"],
    context:
      "RE/MAX María Inés Capristo es una cuenta inmobiliaria con foco en posicionamiento profesional, captación de propiedades, promoción de inmuebles y generación de consultas, con presencia activa en Instagram y LinkedIn.",
    challenge: "Sostener una comunicación constante y de calidad en una categoría donde la confianza y la cercanía son determinantes para generar una consulta.",
    objective: "Fortalecer el posicionamiento profesional de la cuenta y generar consultas a través de contenido de captación, promoción de inmuebles y contenido educativo.",
    participation: [
      { text: "Estrategia de captación", category: "estrategia", highlight: true },
      { text: "Investigación de mercado", category: "estrategia" },
      { text: "Contenido de propiedades y contenido educativo", category: "creatividad", highlight: true },
      { text: "Guiones para videos", category: "creatividad" },
      { text: "Calendarios mensuales", category: "implementacion" },
      { text: "Aplicación de IA para ambientaciones de interiores", category: "implementacion", highlight: true },
    ],
    strategy: [
      "Secuencias e historias diarias combinando propiedades, contenido educativo y cercanía con la audiencia.",
      "Uso de IA para ambientación de espacios, preservando arquitectura, perspectiva y distribución reales, con disclaimer sobre imágenes generadas.",
      "Presencia combinada en Instagram y LinkedIn.",
    ],
    channels: ["Instagram", "LinkedIn", "Meta Ads"],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Canva", "Herramientas de IA para ambientación"],
    resultPeriods: [
      {
        period: "Instagram · Mayo 2026",
        metrics: [
          { value: "44,2 mil", label: "visualizaciones" },
          { value: "37,5 mil", label: "alcance" },
          { value: "393", label: "interacciones" },
          { value: "+47", label: "nuevos seguidores" },
        ],
      },
      {
        period: "Facebook · Mayo 2026",
        metrics: [
          { value: "38,1 mil", label: "visualizaciones (+31,8%)" },
          { value: "868", label: "clics en enlace (+135,9%)" },
          { value: "+4", label: "nuevos seguidores" },
        ],
      },
      {
        period: "LinkedIn · Mayo 2026",
        metrics: [
          { value: "404", label: "impresiones" },
          { value: "210", label: "alcance" },
          { value: "10", label: "interacciones" },
        ],
      },
      {
        period: "Meta Ads · Tráfico · Mayo 2026",
        metrics: [
          { value: "41.009", label: "alcance" },
          { value: "1.916", label: "visitas al perfil (+1,27%)" },
          { value: "USD 0,03", label: "costo por visita" },
        ],
      },
      {
        period: "Meta Ads · Mensajes · Mayo 2026",
        metrics: [
          { value: "284", label: "conversaciones iniciadas (+26,22%)" },
          { value: "USD 0,88", label: "costo por conversación (-16,98%)" },
        ],
      },
    ],
    learnings:
      "Instagram es la plataforma más fuerte del ecosistema orgánico de la cuenta, mientras que LinkedIn funciona mejor para posicionamiento que para volumen. En pauta, los reels superaron a los carruseles en la campaña de mensajes (más cercanía y conversión), mientras que los carruseles siguen funcionando bien para tráfico. La IA aplicada a la ambientación de propiedades funciona como herramienta de producción, no como resultado en sí misma.",
    gallery: [
      { src: "/images/projects/remax/remax-post-casaenventa.webp", alt: "Posteo de Instagram de RE/MAX: casa en venta en Villa Luro" },
      { src: "/images/projects/remax/remax-historia-invertir.webp", alt: "Historia de Instagram de RE/MAX sobre inversión inmobiliaria" },
      { src: "/images/projects/remax/remax-linkedin-decisiones.webp", alt: "Pieza de LinkedIn de RE/MAX: 6 decisiones antes de salir al mercado" },
    ],
  },
  {
    id: "quinton",
    name: "Viñedos y Olivares del Quintón",
    tagline: "Estrategia integral de contenidos y pauta",
    category: "Social Media · Contenidos · Reporting · Gastronomía y turismo",
    cardType: "Social Media",
    featured: true,
    cardDescription: "Contenido y pauta para convertir una propuesta turística y gastronómica en reservas y consultas.",
    industry: "Enoturismo & gastronomía",
    cardTags: ["Turismo", "Contenido"],
    context:
      "Viñedos y Olivares del Quintón combina propuesta turística, restaurante y degustaciones. El trabajo cubrió contenido orgánico y de pauta en Instagram y Facebook, con calendarios y una campaña estacional para septiembre.",
    challenge: "Mantener presencia activa y coherente en dos plataformas con audiencias y formatos distintos, sin mezclar sus resultados.",
    objective: "Convertir la propuesta turística y gastronómica en un sistema digital orientado a reservas, visitas y consultas.",
    participation: [
      { text: "Estrategia de reservas", category: "estrategia", highlight: true },
      { text: "Coordinación entre contenido, diseño y pauta", category: "estrategia", highlight: true },
      { text: "Calendarios y historias diarias", category: "implementacion" },
      { text: "Reportes orgánicos y de pauta", category: "implementacion" },
      { text: "Remarketing", category: "implementacion" },
    ],
    strategy: ["Contenido diario sobre restaurante, recorridos y degustaciones.", "Campañas de mensajes y remarketing.", "Campaña estacional planificada para septiembre."],
    channels: ["Instagram", "Facebook"],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Canva"],
    learnings:
      "Instagram y Facebook responden a lógicas distintas para esta cuenta: mantenerlos separados en la planificación evitó comparaciones engañosas entre plataformas y períodos, y permitió ajustar la estrategia de cada una por separado.",
    gallery: [
      { src: "/images/projects/quinton/quinton-portada-escapada.webp", alt: "Pieza editorial 'Una escapada a Quintón' con atardecer sobre el viñedo" },
      { src: "/images/projects/quinton/quinton-sabores-origen.webp", alt: "Pieza 'Sabores con origen' sobre el olivar de Viñedos y Olivares del Quintón" },
      { src: "/images/projects/quinton/quinton-entrada.webp", alt: "Fotografía de la entrada principal de Viñedos y Olivares del Quintón" },
    ],
  },
  {
    id: "indusnor",
    name: "INDUSNOR",
    tagline: "Estrategia B2B y posicionamiento industrial",
    category: "Estrategia B2B · Contenidos · Comunicación industrial",
    cardType: "Estrategia B2B",
    featured: false,
    cardDescription: "Estrategia de contenidos B2B para generar confianza y consultas calificadas.",
    industry: "Industria & construcción",
    cardTags: ["Estrategia", "B2B"],
    context:
      "Indusnor ofrece soluciones industriales para construcción, logística e industria (rampas hidráulicas, puertas, macrofibra, entre otros productos). La comunicación necesitaba resolver desconfianza frente a precios competitivos y falta de información técnica accesible para un público B2B.",
    challenge: "Comunicar confianza y respaldo técnico a públicos B2B que suelen desconfiar de precios competitivos por falta de información clara para comparar proveedores.",
    objective: "Construir posicionamiento y confianza para una marca industrial B2B, generando consultas calificadas a partir de contenido educativo.",
    participation: [
      { text: "Investigación de mercado", category: "estrategia", highlight: true },
      { text: "Identificación de públicos B2B", category: "estrategia" },
      { text: "Definición de pilares de contenido", category: "creatividad", highlight: true },
      { text: "Propuesta de vendedor como vocero", category: "creatividad", highlight: true },
      { text: "Adaptación de piezas a Meta Ads", category: "implementacion" },
    ],
    strategy: [
      "Diferenciales de marca: importación directa, proveedores seleccionados en China, más de 70 años de experiencia, garantía de dos años y asesoramiento técnico.",
      "Educación técnica en carruseles, historias y reels, con CTA a WhatsApp.",
      "Remarketing sobre públicos que ya interactuaron con contenido técnico.",
    ],
    channels: ["Instagram", "Facebook", "Meta Ads"],
    tools: ["Meta Business Suite", "Canva"],
    resultPeriods: [
      {
        period: "Julio 2026 · orgánico",
        metrics: [
          { value: "200,2 mil", label: "visualizaciones en Facebook (+36,4%)" },
          { value: "121,8 mil", label: "espectadores en Facebook (+89,7%)" },
          { value: "109,2 mil", label: "visualizaciones en Instagram" },
          { value: "54,3 mil", label: "alcance en Instagram" },
        ],
      },
    ],
    learnings:
      "El contenido educativo (diferenciales técnicos, garantías, casos de uso) tracciona mejor que la comunicación puramente comercial en una categoría B2B donde la principal barrera es la desconfianza frente al precio.",
    gallery: [
      { src: "/images/projects/indusnor/indusnor-intro.webp", alt: "Pieza de Instagram '¿Por qué elegir Indusnor?' con soluciones industriales" },
      { src: "/images/projects/indusnor/indusnor-deposito.webp", alt: "Fotografía de depósito industrial con la marca Indusnor" },
    ],
  },
  {
    id: "oma-sushi",
    name: "OMA Sushi",
    tagline: "Planificación y gestión de campañas digitales",
    category: "Meta Ads · Full funnel · Gastronomía",
    cardType: "Paid Media",
    featured: false,
    cardDescription: "Campañas de alcance y tráfico en Meta Ads para un restaurante con delivery propio.",
    industry: "Gastronomía",
    cardTags: ["Meta Ads", "Email marketing"],
    context:
      "OMA Sushi es un restaurante con delivery propio. El trabajo combinó email marketing y campañas de Meta Ads de alcance y tráfico, en las primeras dos semanas de julio.",
    challenge: "Dar a conocer el delivery propio de la marca y llevar tráfico al perfil de Instagram como paso previo a trabajar conversiones.",
    objective: "Awareness y tráfico como primeras etapas de un funnel completo, antes de avanzar hacia campañas de conversión.",
    participation: [
      { text: "Planificación de campañas de alcance y tráfico", category: "estrategia", highlight: true },
      { text: "Selección de piezas por resultados", category: "creatividad" },
      { text: "Email marketing", category: "implementacion" },
      { text: "Análisis de mapa de calor y next steps", category: "implementacion", highlight: true },
    ],
    strategy: [
      "Campaña de alcance con reels y carruseles como formatos más efectivos.",
      "Campaña de tráfico orientada a visitas al perfil de Instagram.",
      "Primer envío de email marketing con seguimiento de aperturas, clics y mapa de calor.",
    ],
    channels: ["Meta Ads", "Email marketing", "Instagram"],
    tools: ["Meta Ads Manager", "Meta Business Suite"],
    resultPeriods: [
      {
        period: "2 al 15 de julio · Campaña de alcance",
        metrics: [
          { value: "160.702", label: "alcance" },
          { value: "172.277", label: "impresiones" },
          { value: "ARS 199,23", label: "costo por resultado" },
        ],
      },
      {
        period: "2 al 15 de julio · Campaña de tráfico",
        metrics: [
          { value: "30.109", label: "alcance" },
          { value: "3.163", label: "visitas al perfil de Instagram" },
          { value: "ARS 30,20", label: "costo por resultado" },
        ],
      },
      {
        period: "Email marketing · primer envío",
        metrics: [
          { value: "5.268", label: "envíos (97% entregados)" },
          { value: "19%", label: "tasa de apertura" },
          { value: "8%", label: "tasa de clics" },
        ],
      },
    ],
    learnings:
      "Los reels fueron el formato más efectivo tanto en alcance como en tráfico. El mapa de calor del email mostró que el botón de beneficio concentró la mayoría de los clics, lo que confirmó la importancia de un CTA visual claro. El siguiente paso natural es extender la campaña de alcance y avanzar hacia objetivos de conversión.",
    gallery: [
      { src: "/images/projects/oma-sushi/omasushi-cover-chopsticks.webp", alt: "Pieza de campaña de delivery exclusivo de OMA Sushi" },
      { src: "/images/projects/oma-sushi/omasushi-menu-nigiri.webp", alt: "Pieza de producto de OMA Sushi con selección de nigiris" },
    ],
  },
];
