import type { AiToolCard, SkillModule, ToolEntry, ToolGroupId } from "../types";

export const toolGroupLabels: Record<ToolGroupId, string> = {
  "paid-media": "Paid Media",
  organizacion: "Organization",
  creatividad: "Creativity",
};

export const skillsIntro = {
  eyebrow: "SKILLS & TOOLS",
  title: "From strategy to execution.",
  subtitle: "A process that connects analysis, ideas, implementation and results.",
};

export const skillModules: SkillModule[] = [
  {
    id: "estrategia",
    number: "01",
    title: "Strategy",
    icon: "compass",
    tagline: "Research and planning with clear direction.",
    panelTitle: "Defining objectives, audiences and media for each campaign.",
    details: [
      "Market and competitor research",
      "Defining audiences and objectives",
      "Media planning and integrated campaigns",
    ],
  },
  {
    id: "paid-media",
    number: "02",
    title: "Paid Media",
    icon: "trending",
    tagline: "Meta Ads, budgets and measurable results.",
    panelTitle: "Managing Meta Ads campaigns, budgets and performance metrics.",
    details: [
      "Segmentation and remarketing in Meta Ads",
      "Active budget management",
      "Tracking CTR, CPC, CPM and ROAS",
    ],
  },
  {
    id: "contenido",
    number: "03",
    title: "Content & creativity",
    icon: "pencil",
    tagline: "Concept, copy and focused visual direction.",
    panelTitle: "Developing content, copy and visual direction for each campaign.",
    details: [
      "Content strategy and copywriting",
      "Visual identity and creative direction",
      "Calendars, pieces and email marketing",
    ],
  },
  {
    id: "gestion",
    number: "04",
    title: "Project management",
    icon: "folders",
    tagline: "Accounts, teams and deliverables in motion.",
    panelTitle: "Coordinating accounts, clients, teams and deliverables.",
    details: ["+8 accounts managed simultaneously", "Direct client relationships", "Aligned teams, deliverables and reports"],
  },
];

export const toolStackIntro = {
  title: "TOOL STACK",
  subtitle: "Tools that are part of my everyday work.",
};

export const aiTools: AiToolCard[] = [
  {
    id: "chatgpt-codex",
    title: "ChatGPT + Codex",
    logos: [{ src: "/images/logos/openai.svg", alt: "OpenAI logo (ChatGPT and Codex)" }],
    description:
      "Building workflows, research, file analysis, resource creation, and building or adjusting web pages through code agents.",
    usageTag: "Research + web",
  },
  {
    id: "claude-code",
    title: "Claude + Claude Code",
    logos: [{ src: "/images/logos/claude.svg", alt: "Claude logo (Claude and Claude Code)" }],
    description:
      "Building content systems, master prompts and document analysis, along with implementing, fixing and validating web projects straight from the code.",
    usageTag: "Content + code",
  },
  {
    id: "gemini",
    title: "Gemini",
    logos: [{ src: "/images/logos/gemini.svg", alt: "Google Gemini logo" }],
    description:
      "In-depth research, multimodal and file analysis, cross-checking information and organizing content linked to the Google ecosystem.",
    usageTag: "Multimodal analysis",
  },
];

export const toolStack: ToolEntry[] = [
  {
    name: "Meta Ads Manager",
    logo: "/images/logos/meta.svg",
    description:
      "Setting up and tracking campaigns, audiences, budgets and KPIs like CTR, CPC, CPM, ROAS and conversions.",
    group: "paid-media",
  },
  {
    name: "Meta Business Suite",
    logo: "/images/logos/meta.svg",
    description:
      "Scheduling posts and stories, organizing calendars and reviewing organic performance on Facebook and Instagram.",
    group: "paid-media",
  },
  {
    name: "MasterMetrics",
    logo: "/images/logos/mastermetrics.png",
    description:
      "Building and reading dashboards, centralizing metrics and preparing campaign and content reports.",
    group: "paid-media",
  },
  {
    name: "Canva",
    logo: "/images/logos/canva.svg",
    description: "Designing and adapting pieces for social media, presentations, visual documents and digital formats.",
    group: "creatividad",
  },
  {
    name: "Adobe Illustrator",
    logo: "/images/logos/adobeillustrator.svg",
    description: "Editing vectors, typefaces, logos and graphic resources for different formats.",
    group: "creatividad",
  },
  {
    name: "Adobe Photoshop",
    logo: "/images/logos/adobephotoshop.svg",
    description: "Retouching and adapting images through cropping, layers, masks, color adjustments and compositions.",
    group: "creatividad",
  },
  {
    name: "Google Workspace",
    logo: "/images/logos/google-workspace.svg",
    description: "Organizing files in Drive and collaboratively building calendars, documents, presentations and reports.",
    group: "organizacion",
  },
  {
    name: "Trello",
    logo: "/images/logos/trello.svg",
    description: "Organizing projects through boards, lists, cards, checklists and due dates.",
    group: "organizacion",
  },
  {
    name: "ClickUp",
    logo: "/images/logos/clickup.svg",
    description: "Creating and tracking tasks, owners, priorities and statuses to coordinate projects and deliverables.",
    group: "organizacion",
  },
];

export interface LanguageEntry {
  code: "ES" | "EN";
  language: string;
  level: string;
  description: string;
  scale: number;
}

export const languagesIntro = "Communication and working with tools in Spanish and English.";

export const languages: LanguageEntry[] = [
  {
    code: "ES",
    language: "Spanish",
    level: "Native",
    description: "Communication, creative writing and presenting strategies.",
    scale: 6,
  },
  {
    code: "EN",
    language: "English",
    level: "Upper-intermediate · B2",
    description: "Understanding briefs, documentation and professional tools.",
    scale: 4,
  },
];
