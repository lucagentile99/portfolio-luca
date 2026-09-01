import type { AcademicCampaign } from "../types";

export const academicIntro = {
  eyebrow: "integrated campaigns",
  phrase: "From research to execution.",
  disclaimer:
    "Developed for academic purposes. This proposal does not necessarily imply a commercial implementation by the brand.",
};

export const academicCampaigns: AcademicCampaign[] = [
  {
    id: "yelmo",
    name: "Yelmo — Your Summer Match",
    concept: "Your summer match",
    category: "Academic integrated campaign · Strategy · Creativity · Media",
    cardType: "Academic integrated campaign",
    cardTags: ["Strategy", "Creativity"],
    authorsNote: "Group academic project (García, Gentile, Muñoz and Pereira).",
    cardDescription:
      "A seasonal campaign that connects the product with an occasion of use under a concept inspired by dating apps.",
    industry: "Appliances",
    context:
      "Yelmo is a small-appliance brand, including its Air Fryer line, in a category saturated with generic alternatives.",
    problem: "Differentiate Yelmo within a saturated category, positioning it as a practical, current and trustworthy option against generic or purely price-driven alternatives.",
    objective:
      "Capture new buyers aged 25 to 35 and expand the Air Fryer's occasions of use beyond winter: summer meals, get-togethers with friends and the back-to-routine period in March.",
    audience: "Young adults aged 25 to 35 (BC1C2) who are furnishing, equipping or renovating their home.",
    insight: "Use dating-app codes to present the Air Fryer as a match that fits the pace of summer.",
    development: [
      "Sequential out-of-home with a dating-app aesthetic: profiles, hearts and matches.",
      "Digital carousel for social media: 'Bye vacation, hello office' and 'Your match for the back-to-routine'.",
      "Campaign lines: 'This Valentine's Day, match with Yelmo', 'Love at first recipe', 'If it makes you sweat, it's not love'.",
    ],
    gallery: [
      { src: "/images/academic/yelmo/yelmo-cover.webp", alt: "Yelmo Air Fryer out-of-home piece for Valentine's Day, 'Finally, a match that lasts longer than dinner'" },
      { src: "/images/academic/yelmo/yelmo-concepto.webp", alt: "Pieces from Yelmo Air Fryer's 'Your summer match' creative concept" },
      { src: "/images/academic/yelmo/yelmo-carrusel.webp", alt: "Yelmo Air Fryer digital carousel for social media, 'Bye vacation, hello office'" },
      { src: "/images/academic/yelmo/yelmo-via-publica.webp", alt: "Out-of-home mockup of the Yelmo campaign on subway screens" },
    ],
  },
  {
    id: "avira",
    name: "AVIRA — Luck reassures. Foresight protects.",
    concept: "Luck reassures. Foresight protects.",
    category: "Academic integrated campaign · Strategy · Creative concept · Insurance",
    cardType: "Academic integrated campaign",
    cardTags: ["Creative concept", "Strategy"],
    authorsNote: "Group academic project.",
    cardDescription:
      "A campaign that contrasts the comfort of relying on luck with the concrete value of planning ahead and being protected.",
    industry: "Insurance",
    context:
      "AVIRA, life and retirement insurers. In Argentina, insurance awareness reaches barely 10% of the population.",
    problem: "Communicate foresight without relying solely on fear, death or negative messaging, in a category people tend to avoid ('it's for older people', 'it's too expensive', 'I'll deal with it later').",
    objective: "Increase interest in and consideration of life insurance in Argentina, especially among young and economically active adults.",
    insight: "People place their trust in charms, rituals or superstitions to ease anxiety about an unpredictable future, when real protection comes from concrete planning decisions.",
    development: [
      "An audiovisual proposal centered on the difference between the momentary comfort of luck and the real protection of foresight.",
      "An advergaming proposal, 'Safe Run': a runner-style game where the player collects lucky charms (temporary benefit) or AVIRA protection points (lasting protection).",
    ],
    gallery: [
      { src: "/images/academic/avira/avira-billboard.webp", alt: "AVIRA out-of-home piece, 'Luck reassures. Foresight protects.'" },
      { src: "/images/academic/avira/avira-storyboard.webp", alt: "Storyboard for AVIRA's audiovisual proposal about real foresight" },
      { src: "/images/academic/avira/avira-advergame.webp", alt: "Mockup of AVIRA's Safe Run advergame, with charms and protection shields" },
    ],
  },
  {
    id: "riccitelli",
    name: "Riccitelli Wines — No Filters",
    concept: "No Filters",
    category: "Academic integrated campaign · Strategy · Creative direction · Multi-format design",
    cardType: "Academic integrated campaign",
    cardTags: ["Creative direction", "Branding"],
    authorsNote:
      "Group academic project. The strategic and creative development was carried out as a team — no exclusive individual authorship of the pieces is claimed.",
    cardDescription:
      "Identity and pieces for a natural wine line, with a young, artistic and disruptive aesthetic.",
    industry: "Natural wines",
    context:
      "Riccitelli Wines is a winery from Mendoza founded in 2009 by Matías Riccitelli, known for a creative, young and irreverent approach. The project focused on V.I.N.O — Independent Natural & Organic Viticulture.",
    problem: "Position V.I.N.O as a natural, authentic and disruptive proposal for a new generation, moving away from the category's solemn communication style.",
    objective: "Communicate naturalness, transparency and personality.",
    audience: "People aged 25 to 45: professionals, foodies, sommeliers and cosmopolitan consumers interested in gastronomy, art, music and contemporary culture.",
    insight: "Natural winemaking relates to an authentic attitude: expressing yourself without masks and without following the category's traditional codes.",
    tone: ["Rebellious", "Authentic", "Urban", "Artistic", "Direct", "Young", "Unpretentious"],
    development: [
      "Visual system and pieces: magazine, tasting cards, variety-specific adaptations, mockups and banners.",
      "Creative rationale: an academic proposal built around minimal intervention, natural winemaking and a contemporary visual identity, with an aesthetic that breaks the solemn codes of traditional wine.",
      "According to the material developed for the academic project, the line is presented without added chemicals or sulfites — a claim from the brand's own material, not independently verified for this portfolio.",
    ],
    gallery: [
      { src: "/images/academic/riccitelli/riccitelli-mockup-botellas.webp", alt: "Editorial mockup with the four varieties of the V.I.N.O line" },
      { src: "/images/academic/riccitelli/riccitelli-concepto-clarete.webp", alt: "Mockup of the V.I.N.O Clarete bottle with a tasting card" },
      { src: "/images/academic/riccitelli/riccitelli-banner-web.webp", alt: "Web banners for the V.I.N.O campaign, Kung Fu and Invader series" },
      { src: "/images/academic/riccitelli/riccitelli-institucional.webp", alt: "Institutional photograph of a glass of wine in the vineyard" },
      { src: "/images/academic/riccitelli/riccitelli-cover.webp", alt: "Cover of Riccitelli Wines' V.I.N.O campaign over a soil background" },
    ],
  },
];
