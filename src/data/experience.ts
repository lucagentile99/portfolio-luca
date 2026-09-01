import type { ExperienceEntry } from "../types";

/**
 * Las fechas de Melancia e Impulso se superponen a propósito: Luca trabajó
 * en los dos lugares en simultáneo (Impulso era part time y remoto). La
 * etiqueta de modalidad de Impulso ("Part time · 100% remoto") ya deja esto
 * en claro, así que no se repite en un bloque de texto aparte.
 */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: "melancia",
    company: "Melancia Digital — Agencia",
    role: "Project Manager de Marketing Digital & Paid Media",
    period: "Febrero de 2024 – Actualidad",
    modality: "Rol principal",
    focusTag: "PAID MEDIA FOCUS",
    impactTags: ["Meta Ads", "+8 cuentas", "Reporting"],
    summary:
      "Gestión estratégica de más de 8 cuentas, con foco en planificación, implementación y optimización de campañas en Meta Ads. Seguimiento diario de inversión y KPIs, elaboración de reportes y coordinación con equipos de contenido y diseño para transformar los objetivos comerciales de cada marca en acciones concretas.",
    responsibilities: [
      {
        number: "01",
        icon: "target",
        keyword: "Meta Ads",
        description: "Campañas, audiencias, presupuestos y optimización.",
        accent: "celeste",
      },
      {
        number: "02",
        icon: "trending",
        keyword: "Performance",
        description: "KPIs, conversiones y oportunidades de mejora.",
      },
      {
        number: "03",
        icon: "chart",
        keyword: "Reporting",
        description: "Métricas convertidas en decisiones accionables.",
      },
      {
        number: "04",
        icon: "folders",
        keyword: "Gestión multicuenta",
        description: "+8 cuentas, equipos, clientes y entregas alineadas.",
        accent: "bordo",
      },
      {
        number: "05",
        icon: "spark",
        keyword: "Estrategia y contenido",
        description: "Research, calendarios, copys y propuestas de campaña.",
      },
    ],
  },
  {
    id: "impulso",
    company: "Impulso (Consultora Integral)",
    role: "Project Manager & Paid Media",
    period: "Diciembre 2024 – Marzo 2026",
    modality: "Part time · 100% remoto",
    impactTags: ["Paid Media", "10-12 cuentas", "100% remoto"],
    summary:
      "Posición part time y 100% remota, desarrollada en paralelo con mi trabajo en Melancia. Gestión simultánea de entre 10 y 12 cuentas, coordinación de proyectos, planificación de campañas de Meta Ads, seguimiento de presupuestos y análisis de resultados, adaptando la estrategia a los objetivos y necesidades de cada cliente.",
    responsibilities: [
      {
        number: "01",
        icon: "target",
        keyword: "Paid Media",
        description: "Campañas, audiencias, presupuestos y seguimiento.",
        accent: "celeste",
      },
      {
        number: "02",
        icon: "folders",
        keyword: "Gestión de cuentas",
        description: "Proyectos de contenido y pauta para distintas industrias.",
      },
      {
        number: "03",
        icon: "chart",
        keyword: "Clientes y reporting",
        description: "Resultados, reuniones y próximos pasos accionables.",
      },
      {
        number: "04",
        icon: "arrow",
        keyword: "Coordinación remota",
        description: "Tareas, prioridades y entregas en un equipo distribuido.",
      },
    ],
  },
];
