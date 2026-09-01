import type { AboutPillar } from "../types";

// Título corto de la columna de proceso dentro de "Sobre mí" (fusionado con
// lo que antes era la sección "Cómo trabajo" — ver PersonalIntro.tsx).
export const aboutTitle = "Estrategia, creatividad y resultados";

export const aboutHint = "Ver cómo lo aplico +";

// Imágenes reales de proyectos propios (no stock) — ver public/images/academic
// y public/images/projects.
export const aboutPillars: AboutPillar[] = [
  {
    id: "strategy",
    title: "Pensamiento estratégico",
    description: "Investigación, planificación de medios y detección de oportunidades para cada marca.",
    label: "Primero, entender el escenario",
    body: "Antes de desarrollar una campaña, analizo la marca, el contexto, el público y los objetivos. Esta etapa permite encontrar una oportunidad concreta y convertirla en una estrategia con dirección.",
    points: [
      "Análisis de marca y competencia.",
      "Definición de público y objetivos.",
      "Investigación de referencias y tendencias.",
      "Planificación de contenidos y medios.",
    ],
  },
  {
    id: "creative",
    title: "Criterio creativo",
    description: "Desarrollo de conceptos y piezas que conectan con el público en cada formato.",
    label: "De la estrategia a una idea reconocible",
    body: "Transformo el análisis inicial en un concepto capaz de ordenar toda la comunicación. La idea no queda solamente en un claim: se adapta al contenido, la identidad visual y los diferentes puntos de contacto de la campaña.",
    points: [
      "Desarrollo de conceptos creativos.",
      "Definición de tono y dirección visual.",
      "Adaptación a feed, historias, anuncios y email.",
      "Selección y coordinación de piezas.",
    ],
  },
  {
    id: "results",
    title: "Orientación a resultados",
    description: "Seguimiento de KPIs, optimización de campañas y reporting para decisiones concretas.",
    label: "Medir para seguir mejorando",
    body: "Una campaña no termina cuando se publica. Analizo el rendimiento, identifico oportunidades y utilizo los resultados para ajustar la pauta, el contenido y las próximas decisiones.",
    points: [
      "Seguimiento de CTR, CPC, CPM y ROAS.",
      "Control de inversión y distribución del presupuesto.",
      "Optimización de campañas en Meta Ads.",
      "Elaboración de reportes y próximos pasos.",
    ],
  },
];
