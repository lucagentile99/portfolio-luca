import type { AcademicCampaign } from "../types";

export const academicIntro = {
  eyebrow: "integrated campaigns",
  phrase: "De la investigación a la ejecución.",
  disclaimer:
    "Proyecto desarrollado con fines académicos. La propuesta no implica necesariamente una implementación comercial por parte de la marca.",
};

// Orden: Yelmo, Avira, Riccitelli — mismo criterio de curaduría que los
// casos profesionales (src/data/projects.ts).
export const academicCampaigns: AcademicCampaign[] = [
  {
    id: "yelmo",
    name: "Yelmo — Tu match del verano",
    concept: "Tu match del verano",
    category: "Campaña integral académica · Estrategia · Creatividad · Medios",
    cardType: "Campaña integral académica",
    cardTags: ["Estrategia", "Creatividad"],
    authorsNote: "Proyecto académico grupal (García, Gentile, Muñoz y Pereira).",
    cardDescription:
      "Campaña estacional que conecta producto y ocasión de consumo bajo un concepto inspirado en apps de citas.",
    industry: "Electrodomésticos",
    context:
      "Yelmo es una marca de pequeños electrodomésticos, entre ellos su línea de Air Fryers, en una categoría saturada de alternativas genéricas.",
    problem: "Diferenciar a Yelmo dentro de una categoría saturada, posicionándola como una opción práctica, actual y confiable frente a alternativas genéricas o centradas solo en el precio.",
    objective:
      "Captar nuevos compradores de 25 a 35 años y ampliar las ocasiones de uso de la Air Fryer más allá del invierno: comidas de verano, encuentros con amigos y la vuelta a la rutina en marzo.",
    audience: "Jóvenes adultos de 25 a 35 años (BC1C2) que están formando, equipando o renovando su hogar.",
    insight: "Usar los códigos de las aplicaciones de citas para presentar la Air Fryer como una solución compatible con el ritmo del verano.",
    development: [
      "Vía pública secuencial con estética de aplicación de citas: perfiles, corazones y matches.",
      "Carrusel digital para redes: 'Chau vacaciones, hola oficina' y 'Tu match para la vuelta a la rutina'.",
      "Líneas de campaña: 'Este San Valentín, hacé match con Yelmo', 'Amor a primera receta', 'Si te hace pasar calor, no es amor'.",
    ],
    gallery: [
      { src: "/images/academic/yelmo/yelmo-cover.webp", alt: "Pieza de vía pública de Yelmo Air Fryer para San Valentín, 'Por fin, un match que dura más que una cena'" },
      { src: "/images/academic/yelmo/yelmo-concepto.webp", alt: "Piezas del concepto creativo 'Tu match del verano' de Yelmo Air Fryer" },
      { src: "/images/academic/yelmo/yelmo-carrusel.webp", alt: "Carrusel digital de Yelmo Air Fryer para redes sociales, 'Chau vacaciones, hola oficina'" },
      { src: "/images/academic/yelmo/yelmo-via-publica.webp", alt: "Mockup de vía pública de la campaña Yelmo en pantallas de subte" },
    ],
  },
  {
    id: "avira",
    name: "AVIRA — La suerte tranquiliza. La previsión protege.",
    concept: "La suerte tranquiliza. La previsión protege.",
    category: "Campaña integral académica · Estrategia · Concepto creativo · Seguros",
    cardType: "Campaña integral académica",
    cardTags: ["Concepto creativo", "Estrategia"],
    authorsNote: "Proyecto académico grupal.",
    cardDescription:
      "Campaña que contrapone la confianza en la suerte con el valor concreto de anticiparse y estar protegido.",
    industry: "Seguros",
    context:
      "AVIRA, aseguradores de vida y retiro. En Argentina la conciencia aseguradora se presenta en apenas el 10% de la población.",
    problem: "Comunicar previsión sin recurrir exclusivamente al miedo, la muerte o mensajes negativos, en una categoría que suele evitarse ('es para gente grande', 'es muy caro', 'después lo veo').",
    objective: "Aumentar el interés y la consideración de los seguros de vida en Argentina, especialmente en públicos jóvenes y adultos económicamente activos.",
    insight: "Las personas depositan tranquilidad en amuletos, rituales o supersticiones para reducir la ansiedad frente a un futuro impredecible, cuando la protección real surge de decisiones concretas de previsión.",
    development: [
      "Propuesta audiovisual centrada en la diferencia entre la tranquilidad momentánea de la suerte y la protección real de la previsión.",
      "Propuesta de advergaming 'Safe Run': un juego tipo runner donde el jugador recolecta amuletos de la suerte (beneficio temporal) o puntos de protección AVIRA (protección duradera).",
    ],
    gallery: [
      { src: "/images/academic/avira/avira-billboard.webp", alt: "Pieza de vía pública de AVIRA, 'La suerte tranquiliza. La previsión protege'" },
      { src: "/images/academic/avira/avira-storyboard.webp", alt: "Storyboard de la propuesta audiovisual de AVIRA sobre la previsión real" },
      { src: "/images/academic/avira/avira-advergame.webp", alt: "Mockup del advergame Safe Run de AVIRA, con amuletos y escudos de protección" },
    ],
  },
  {
    id: "riccitelli",
    name: "Riccitelli Wines — Sin Filtros",
    concept: "Sin Filtros",
    category: "Campaña integral académica · Estrategia · Dirección creativa · Diseño multiformato",
    cardType: "Campaña integral académica",
    cardTags: ["Dirección creativa", "Branding"],
    authorsNote:
      "Proyecto académico grupal. El desarrollo estratégico y creativo se realizó en equipo — no se atribuye autoría individual exclusiva de las piezas.",
    cardDescription:
      "Identidad y piezas para una línea de vinos naturales, con una estética joven, artística y disruptiva.",
    industry: "Vinos naturales",
    context:
      "Riccitelli Wines es una bodega mendocina fundada en 2009 por Matías Riccitelli, reconocida por una propuesta creativa, joven e irreverente. El proyecto se concentró en V.I.N.O — Viticultura Independiente Natural & Orgánica.",
    problem: "Posicionar V.I.N.O como una propuesta natural, auténtica y disruptiva para una nueva generación, alejándose de la comunicación solemne de la categoría.",
    objective: "Comunicar naturalidad, transparencia y personalidad.",
    audience: "Personas de 25 a 45 años: profesionales, foodies, sommeliers y consumidores cosmopolitas interesados en gastronomía, arte, música y cultura contemporánea.",
    insight: "La elaboración natural del vino se relaciona con una actitud auténtica: expresarse sin máscaras y sin seguir los códigos tradicionales de la categoría.",
    tone: ["Rebelde", "Auténtico", "Urbano", "Artístico", "Directo", "Joven", "Sin solemnidad"],
    development: [
      "Sistema visual y piezas: revista, tarjetas para degustaciones, adaptaciones por variedad, mockups y banners.",
      "Racional creativo: una propuesta académica construida alrededor de la mínima intervención, la elaboración natural y una identidad visual contemporánea, con una estética que rompe los códigos solemnes del vino tradicional.",
      "Según el material desarrollado para el proyecto académico, la línea se presenta sin agregado de químicos ni sulfitos — una afirmación del propio material de marca, no verificada de forma independiente para este portfolio.",
    ],
    gallery: [
      { src: "/images/academic/riccitelli/riccitelli-mockup-botellas.webp", alt: "Mockup editorial con las cuatro variedades de la línea V.I.N.O" },
      { src: "/images/academic/riccitelli/riccitelli-concepto-clarete.webp", alt: "Mockup de botella V.I.N.O Clarete con tarjeta de degustación" },
      { src: "/images/academic/riccitelli/riccitelli-banner-web.webp", alt: "Banners web de la campaña V.I.N.O, series Kung Fu e Invader" },
      { src: "/images/academic/riccitelli/riccitelli-institucional.webp", alt: "Fotografía institucional de una copa de vino en el viñedo" },
      { src: "/images/academic/riccitelli/riccitelli-cover.webp", alt: "Portada de la campaña V.I.N.O de Riccitelli Wines sobre fondo de tierra" },
    ],
  },
];
