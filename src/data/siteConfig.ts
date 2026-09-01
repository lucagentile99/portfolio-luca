import type { NavLink } from "../types";

export const siteConfig = {
  name: "Luca Martín Gentile",
  shortName: "Luca Gentile",
  initials: "LG",
  headline: "Digital Media Planner · Paid Media · Campaign Strategy",
  location: "Capital Federal, Argentina",
  availability: "Disponible para oportunidades remotas o en CABA",
  email: "lucagentile2012@gmail.com",
  linkedin: "https://www.linkedin.com/in/luca-martin-gentile",
  linkedinLabel: "linkedin.com/in/luca-martin-gentile",
  cvPath: "/cv/luca-gentile-cv.pdf",
  photoPath: "/images/profile/luca-gentile.webp",
  // Completar cuando exista un dominio propio. Se deja vacío a propósito:
  // mientras esté vacío no se publican canonical/OG/JSON-LD con una URL de ejemplo.
  siteUrl: "",
};

export const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Contacto desde tu portfolio")}`;

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Campañas", href: "#campanas" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Formación", href: "#educacion" },
  { label: "Contacto", href: "#contacto" },
];
