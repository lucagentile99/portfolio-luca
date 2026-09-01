import type { AiToolCard, SkillModule, ToolEntry, ToolGroupId } from "../types";

export const toolGroupLabels: Record<ToolGroupId, string> = {
  "paid-media": "Paid Media",
  organizacion: "Organización",
  creatividad: "Creatividad",
};

export const skillsIntro = {
  eyebrow: "SKILLS & TOOLS",
  title: "De la estrategia a la ejecución.",
  subtitle: "Un proceso que conecta análisis, ideas, implementación y resultados.",
};

/**
 * Todo el contenido de estos módulos y del stack de herramientas está
 * confirmado por el CV o demostrado directamente por el trabajo mostrado en
 * Proyectos. No se incluyen herramientas sin confirmar (p. ej. Google Ads,
 * GA4, Looker Studio).
 */
export const skillModules: SkillModule[] = [
  {
    id: "estrategia",
    number: "01",
    title: "Estrategia",
    icon: "compass",
    tagline: "Investigación y planificación con dirección clara.",
    panelTitle: "Definición de objetivos, audiencias y medios para cada campaña.",
    details: [
      "Investigación de mercado y competencia",
      "Definición de audiencias y objetivos",
      "Planificación de medios y campañas integrales",
    ],
  },
  {
    id: "paid-media",
    number: "02",
    title: "Paid Media",
    icon: "trending",
    tagline: "Meta Ads, presupuestos y resultados medibles.",
    panelTitle: "Gestión de campañas en Meta Ads, presupuestos y métricas de resultado.",
    details: [
      "Segmentación y remarketing en Meta Ads",
      "Gestión activa de presupuestos",
      "Seguimiento de CTR, CPC, CPM y ROAS",
    ],
  },
  {
    id: "contenido",
    number: "03",
    title: "Contenido y creatividad",
    icon: "pencil",
    tagline: "Concepto, copy y dirección visual con foco.",
    panelTitle: "Desarrollo de contenido, copy y dirección visual para cada campaña.",
    details: [
      "Estrategia de contenido y copywriting",
      "Identidad visual y dirección creativa",
      "Calendarios, piezas y email marketing",
    ],
  },
  {
    id: "gestion",
    number: "04",
    title: "Gestión de proyectos",
    icon: "folders",
    tagline: "Cuentas, equipos y entregas en movimiento.",
    panelTitle: "Coordinación de cuentas, clientes, equipos y entregas.",
    details: ["+8 cuentas gestionadas en simultáneo", "Relación directa con clientes", "Equipos, entregas y reportes alineados"],
  },
];

export const toolStackIntro = {
  title: "TOOL STACK",
  subtitle: "Herramientas que forman parte de mi trabajo cotidiano.",
};

// Codex no tiene un logo oficial distinto del de OpenAI, y Claude Code
// tampoco tiene uno distinto del de Claude — en ambos casos, la marca
// oficial usa el mismo isotipo para el producto base y su variante de
// código. Por eso cada tarjeta muestra un solo logo real (no inventado).
export const aiTools: AiToolCard[] = [
  {
    id: "chatgpt-codex",
    title: "ChatGPT + Codex",
    logos: [{ src: "/images/logos/openai.svg", alt: "Logo de OpenAI (ChatGPT y Codex)" }],
    description:
      "Desarrollo de workflows, investigación, análisis de archivos, creación de recursos y construcción o ajuste de páginas web mediante agentes de código.",
    usageTag: "Research + web",
  },
  {
    id: "claude-code",
    title: "Claude + Claude Code",
    logos: [{ src: "/images/logos/claude.svg", alt: "Logo de Claude (Claude y Claude Code)" }],
    description:
      "Desarrollo de sistemas de contenido, prompts maestros y análisis de documentos, junto con implementación, corrección y validación de proyectos web desde el código.",
    usageTag: "Contenido + código",
  },
  {
    id: "gemini",
    title: "Gemini",
    logos: [{ src: "/images/logos/gemini.svg", alt: "Logo de Google Gemini" }],
    description:
      "Investigación en profundidad, análisis multimodal y de archivos, contraste de información y organización de contenidos vinculados con el ecosistema de Google.",
    usageTag: "Análisis multimodal",
  },
];

// Logos oficiales en public/images/logos. MasterMetrics: archivo provisto
// por Luca (mastermetrics-logo.png). Google Workspace: composición de los
// 4 logos oficiales (Drive, Docs, Sheets, Slides) — no existe un ícono
// oficial único de "Workspace" en los bancos de marcas disponibles.
export const toolStack: ToolEntry[] = [
  {
    name: "Meta Ads Manager",
    logo: "/images/logos/meta.svg",
    description:
      "Configuración y seguimiento de campañas, audiencias, presupuestos y KPIs como CTR, CPC, CPM, ROAS y conversiones.",
    group: "paid-media",
  },
  {
    name: "Meta Business Suite",
    logo: "/images/logos/meta.svg",
    description:
      "Programación de publicaciones e historias, organización de calendarios y revisión del rendimiento orgánico en Facebook e Instagram.",
    group: "paid-media",
  },
  {
    name: "MasterMetrics",
    logo: "/images/logos/mastermetrics.png",
    description:
      "Armado y lectura de dashboards, centralización de métricas y preparación de reportes de campañas y contenidos.",
    group: "paid-media",
  },
  {
    name: "Canva",
    logo: "/images/logos/canva.svg",
    description: "Diseño y adaptación de piezas para redes, presentaciones, documentos visuales y formatos digitales.",
    group: "creatividad",
  },
  {
    name: "Adobe Illustrator",
    logo: "/images/logos/adobeillustrator.svg",
    description: "Edición de vectores, tipografías, logotipos y recursos gráficos para diferentes formatos.",
    group: "creatividad",
  },
  {
    name: "Adobe Photoshop",
    logo: "/images/logos/adobephotoshop.svg",
    description: "Retoque y adaptación de imágenes mediante recortes, capas, máscaras, ajustes de color y composiciones.",
    group: "creatividad",
  },
  {
    name: "Google Workspace",
    logo: "/images/logos/google-workspace.svg",
    description: "Organización en Drive y creación colaborativa de calendarios, documentos, presentaciones y reportes.",
    group: "organizacion",
  },
  {
    name: "Trello",
    logo: "/images/logos/trello.svg",
    description: "Organización de proyectos mediante tableros, listas, tarjetas, checklists y fechas de entrega.",
    group: "organizacion",
  },
  {
    name: "ClickUp",
    logo: "/images/logos/clickup.svg",
    description: "Creación y seguimiento de tareas, responsables, prioridades y estados para coordinar proyectos y entregas.",
    group: "organizacion",
  },
];

export interface LanguageEntry {
  code: "ES" | "EN";
  language: string;
  level: string;
  description: string;
  /** Nivel dentro de una escala de 6 (equivalente a los niveles del MCER: A1-C2). No es un porcentaje. */
  scale: number;
}

export const languagesIntro = "Comunicación y trabajo con herramientas en español e inglés.";

export const languages: LanguageEntry[] = [
  {
    code: "ES",
    language: "Español",
    level: "Nativo",
    description: "Comunicación, redacción creativa y presentación de estrategias.",
    scale: 6,
  },
  {
    code: "EN",
    language: "Inglés",
    level: "Intermedio alto · B2",
    description: "Comprensión de briefs, documentación y herramientas profesionales.",
    scale: 4,
  },
];
