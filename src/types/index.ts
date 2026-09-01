export interface NavLink {
  label: string;
  href: string;
}

export interface ProfessionalStat {
  value: string;
  label: string;
}

export type ResponsibilityIcon = "target" | "trending" | "chart" | "folders" | "spark" | "arrow";

export interface ResponsibilityModule {
  number: string;
  icon: ResponsibilityIcon;
  /** Palabra clave grande, ej. "META ADS". Es la lectura principal, no un bullet. */
  keyword: string;
  description: string;
  /** Una o dos tarjetas por experiencia pueden llevar acento celeste/bordó — el resto queda neutro. */
  accent?: "celeste" | "bordo";
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  /** Ej: "Rol principal" o "Part time · 100% remoto" — se muestra como badge. */
  modality?: string;
  /** Etiqueta corta opcional de foco, ej. "PAID MEDIA FOCUS" — solo para la experiencia principal. */
  focusTag?: string;
  summary: string;
  /** Exactamente 3 etiquetas cortas de impacto, visibles con la tarjeta cerrada (ej. "Meta Ads", "+8 cuentas", "Reporting"). */
  impactTags: [string, string, string];
  /** Módulos visuales de la grilla de responsabilidades — todos con el mismo peso visual. */
  responsibilities: ResponsibilityModule[];
}

export type SkillIcon = "compass" | "trending" | "pencil" | "folders";

export interface SkillModule {
  id: string;
  number: string;
  title: string;
  icon: SkillIcon;
  /** Descripción de una línea, visible en la pestaña compacta. */
  tagline: string;
  /** Título expresivo del panel (ej. "Analizar para encontrar una dirección clara."). */
  panelTitle: string;
  /** Detalle completo, visible solo en el panel del módulo seleccionado. */
  details: string[];
}

export type ToolGroupId = "paid-media" | "organizacion" | "creatividad";

export interface ToolEntry {
  name: string;
  /** Ruta al logo oficial (SVG o PNG) — siempre requerido, sin estado pendiente. */
  logo: string;
  description: string;
  group: ToolGroupId;
}

export interface AiToolCard {
  id: string;
  title: string;
  /** 1 o 2 logos oficiales (ej. ChatGPT + Codex comparten el logo de OpenAI). */
  logos: { src: string; alt: string }[];
  /** Descripción completa, mostrada en el tooltip. */
  description: string;
  /** Etiqueta mínima de uso, visible siempre debajo del nombre (ej. "Research + web"). */
  usageTag: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  program: string;
  period: string;
  /** Nombre de "carpeta" del sistema de archivo, ej. "PUBLICIDAD". */
  folderName: string;
  description?: string;
  /** Exactamente 3 aprendizajes o áreas vinculadas, mostrados al abrir. */
  learnings?: [string, string, string];
}

export interface AboutPillar {
  /** Slug corto en inglés para el nombre de archivo mostrado (ej. "strategy" → "strategy_01"). */
  id: string;
  title: string;
  description: string;
  /** Frase corta al abrirse (ej. "Primero, entender el escenario"). */
  label: string;
  /** Párrafo breve que explica cómo se aplica en la práctica. */
  body: string;
  /** Puntos clave, en el orden en que se muestran. */
  points: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface ResultMetric {
  value: string;
  label: string;
}

export interface ResultPeriod {
  period: string;
  metrics: ResultMetric[];
}

export interface ExecutionGroup {
  title: string;
  items: string[];
}

export type ParticipationCategory = "estrategia" | "creatividad" | "implementacion";

export interface ParticipationItem {
  text: string;
  category: ParticipationCategory;
  /** Aporte principal del proyecto: se destaca visualmente en la grilla. */
  highlight?: boolean;
}

export interface CaseStudy {
  id: string;
  name: string;
  tagline?: string;
  /** Categoría completa, se usa en el modal. */
  category: string;
  /** Etiqueta corta para la tarjeta (ej. "Paid Media"). */
  cardType: string;
  featured: boolean;
  /**
   * Si es false, el caso no se renderiza (queda en el código, listo para
   * activarse cuando haya material). Por defecto se considera activo.
   */
  active?: boolean;
  statusLabel?: string;
  /** Descripción corta (máximo ~2 líneas) para la tarjeta. */
  cardDescription: string;
  /** Rubro/industria en 1-3 palabras (ej. "Indumentaria premium"), tomado del `context` real. */
  industry: string;
  /** 2-3 etiquetas cortas para la tarjeta. */
  cardTags: string[];
  context: string;
  challenge: string;
  objective: string;
  audience?: string;
  insight?: string;
  concept?: string;
  participation: ParticipationItem[];
  strategy?: string[];
  execution?: ExecutionGroup[];
  channels?: string[];
  tools: string[];
  resultPeriods?: ResultPeriod[];
  /** Conclusión breve para el bloque de resultados (PerformanceVisual). */
  resultsConclusion?: string;
  /**
   * Métricas resumidas para la portada de la tarjeta, usadas cuando el caso
   * no tiene imágenes de campaña propias (gallery vacío) — reemplaza la
   * captura de reporte por una composición de 2-3 cifras.
   */
  coverStats?: { eyebrow: string; metrics: ResultMetric[] };
  learnings: string;
  gallery: GalleryImage[];
}

export interface AcademicCampaign {
  id: string;
  name: string;
  concept: string;
  category: string;
  /** Etiqueta corta para la tarjeta. */
  cardType: string;
  /** 2-3 etiquetas cortas para la tarjeta. */
  cardTags: string[];
  authorsNote?: string;
  cardDescription: string;
  /** Rubro/industria en 1-3 palabras, tomado del `context` real. */
  industry: string;
  context: string;
  problem?: string;
  objective?: string;
  audience?: string;
  insight?: string;
  tone?: string[];
  development: string[];
  participation?: string;
  gallery: GalleryImage[];
}

/**
 * Forma unificada que consume CaseModal, sea el contenido de un caso
 * profesional o de una campaña académica.
 */
export interface CaseModalContent {
  kind: "profesional" | "academico";
  id: string;
  name: string;
  tagline?: string;
  industry: string;
  category: string;
  concept?: string;
  context: string;
  challenge?: string;
  objective?: string;
  audience?: string;
  insight?: string;
  participation?: ParticipationItem[];
  authorsNote?: string;
  strategy?: string[];
  execution?: ExecutionGroup[];
  tone?: string[];
  tools?: string[];
  resultPeriods?: ResultPeriod[];
  resultsConclusion?: string;
  learnings?: string;
  gallery: GalleryImage[];
  disclaimer?: string;
}
