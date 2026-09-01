import type { CaseStudy } from "../types";

// Gemelo en inglés de projects.ts — misma forma, mismos ids, mismas
// imágenes y cifras reales. Solo cambia el idioma del texto.
export const caseStudies: CaseStudy[] = [
  {
    id: "wellington",
    name: "Wellington Polo Club",
    tagline: "Content strategy and integrated campaign",
    category: "Content strategy · Creative direction · Integrated campaign · Apparel",
    cardType: "Integrated campaign",
    featured: true,
    statusLabel: "Current project",
    cardDescription: "An integrated system of content, campaigns and paid media for a premium apparel brand.",
    industry: "Premium apparel",
    cardTags: ["Creative direction", "Integrated campaign", "Meta Ads"],
    context:
      "Wellington Polo Club is an Argentine premium menswear brand, founded in 2014, positioned around the heritage of polo: elegance, discipline and tradition. Its communication needed to evolve from standalone posts into a system with its own identity, able to keep a recognizable tone across social media, campaigns, ads and email marketing.",
    challenge:
      "The challenge wasn't just producing content, but building a brand grammar: rules, criteria and processes so every piece felt authentically Wellington, no matter the format or who produced it. Communication also had to respond to launches, online store traffic, physical store visits, stock rotation, promotions, seasonal campaigns and keeping the premium positioning intact.",
    objective:
      "Design an integrated system connecting organic content, paid media, email marketing and seasonal campaigns, keeping a consistent identity throughout.",
    insight:
      "Polo heritage shouldn't work only as a visual resource, but as a source for the communication itself: every message had to relate to something authentic about Wellington (its history, products, universe and values).",
    participation: [
      { text: "Content strategy", category: "estrategia", highlight: true },
      { text: "Brand and competitor research", category: "estrategia" },
      { text: "Developing creative territories", category: "creatividad", highlight: true },
      { text: "Campaign conceptualization", category: "creatividad" },
      { text: "Creative direction", category: "creatividad", highlight: true },
      { text: "Copywriting", category: "creatividad" },
      { text: "Feed & Stories planning", category: "implementacion" },
      { text: "Meta Ads", category: "implementacion" },
      { text: "Email marketing", category: "implementacion" },
      { text: "Brand documentation", category: "implementacion" },
      { text: "Editorial review and quality control", category: "implementacion" },
    ],
    strategy: [
      "Communication guide with a copy structure based on hook, development and CTA.",
      "Voseo rules and a list of words to avoid.",
      "Tone differentiation across Feed, Stories, ads and email.",
      "Image criteria: clean compositions and consistency between product, image and copy.",
      "Editorial review and systematic incorporation of client feedback.",
    ],
    execution: [
      {
        title: "Social media",
        items: [
          "Monthly calendars with product distribution and continuity week to week.",
          "Feed and Stories adapted per format, with quality control.",
        ],
      },
      {
        title: "Meta Ads",
        items: [
          "Static ads and carousels with a defined objective per piece.",
          "Copy and CTA adapted to the audience of each campaign.",
        ],
      },
      {
        title: "Email marketing",
        items: [
          "Campaign adaptation with product and benefit hierarchy.",
          "Conversion-oriented messaging that kept the premium tone.",
        ],
      },
      {
        title: "Commercial campaigns",
        items: [
          "Final Sale, discounts, promotions, 3x2, launches and new season.",
          "Own activations with brand identity instead of generic formats: 'Julio se viste de WPC' (a benefit for anyone named Julio, verified with ID in store), post-match coupons during the World Cup, and a surprise-voucher mechanic for Friend's Day.",
        ],
      },
    ],
    channels: ["Instagram", "Meta Ads", "Email marketing"],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Canva", "Google Workspace"],
    learnings:
      "A brand's consistency isn't held up by a static manual alone, but by a process: documented rules, shared criteria, quality control and editorial review.",
    gallery: [
      { src: "/images/projects/wellington/wellington-cover.webp", alt: "Editorial campaign photograph for Wellington Polo Club, two models wearing the brand's sweaters" },
      { src: "/images/projects/wellington/wellington-dia-amigo.webp", alt: "Web banner for Wellington Polo Club's Friend's Day campaign" },
      { src: "/images/projects/wellington/wellington-feed-agosto.webp", alt: "Instagram feed cover, Wellington Polo Club's Final Sale campaign" },
      { src: "/images/projects/wellington/wellington-historias-producto.webp", alt: "Instagram Story featuring the Buzo Surco product from Wellington Polo Club" },
      { src: "/images/projects/wellington/wellington-meta-ads.webp", alt: "Meta Ads ad for the Pehuén Sweater from Wellington Polo Club" },
      { src: "/images/projects/wellington/wellington-final-sale-banner.webp", alt: "Banner for Wellington Polo Club's Final Sale campaign" },
    ],
  },
  {
    id: "full-power",
    name: "Full Power",
    tagline: "Performance optimization and management",
    category: "Paid Media · E-commerce · Performance",
    cardType: "Paid Media",
    featured: true,
    cardDescription: "Meta Ads conversion campaigns for e-commerce, focused on remarketing and ROAS.",
    industry: "Fitness & sports",
    cardTags: ["Meta Ads", "Performance"],
    context:
      "Full Power is a sports apparel and supplements store with online sales. The work focused on conversion campaigns, combining remarketing, high-intent audiences and strategic budget distribution across Black Friday, Cyber Monday and the lower-demand months that followed.",
    challenge:
      "Sustaining the purchase volume achieved during the November events (Black Friday and Cyber Monday) once the promotional peak was over, in a post-promotional scenario with lower purchase intent.",
    objective:
      "Generate purchases, optimize spend, capitalize on Cyber Monday and Black Friday, and sustain results during the lower-demand months.",
    participation: [
      { text: "Campaign planning", category: "estrategia", highlight: true },
      { text: "Audience segmentation", category: "estrategia" },
      { text: "Budget management", category: "implementacion" },
      { text: "Optimization and reporting", category: "implementacion", highlight: true },
    ],
    strategy: [
      "Custom audience segmentation and remarketing to visitors with purchase intent.",
      "Optimization to the purchase event and prioritizing audiences with higher conversion likelihood.",
      "Creatives oriented toward urgency and benefits.",
      "Tracking and reallocating budget across Remarketing, Advantage+ Shopping and Traffic campaigns.",
    ],
    tools: ["Meta Ads Manager", "Meta Business Suite"],
    resultPeriods: [
      {
        period: "November (Black Friday / Cyber Monday)",
        metrics: [
          { value: "432", label: "purchases" },
          { value: "34,963", label: "total reach" },
          { value: "105.45", label: "average ROAS" },
        ],
      },
      {
        period: "December",
        metrics: [
          { value: "160", label: "purchases" },
          { value: "19,097", label: "reach (+31.2%)" },
          { value: "188,252", label: "impressions (+18.0%)" },
          { value: "37.72", label: "ROAS (remarketing)" },
          { value: "ARS 2,610", label: "average cost per purchase" },
        ],
      },
      {
        period: "January",
        metrics: [
          { value: "164", label: "purchases (+2.5%)" },
          { value: "27,248", label: "reach (+33.8%)" },
          { value: "35.70", label: "ROAS" },
        ],
      },
    ],
    learnings:
      "The highest volume was reached during Cyber Monday and Black Friday. Afterward, the strategy shifted toward stabilizing results through remarketing and intent-based segmentation, sustaining conversions during the lower-demand months.",
    gallery: [
      { src: "/images/projects/full-power/fullpower-banner-cyber.webp", alt: "Full Power Cyber campaign banner with discounts of up to 95%" },
      { src: "/images/projects/full-power/fullpower-producto-creatina.webp", alt: "Product piece: Full Power Creatine with a bank-transfer discount" },
      { src: "/images/projects/full-power/fullpower-lifestyle.webp", alt: "Full Power Cyber campaign piece focused on sportswear" },
    ],
  },
  {
    id: "east-west",
    name: "East West",
    tagline: "Scaling traffic, messaging and sales campaigns",
    category: "Paid Media · Meta Ads · E-commerce",
    cardType: "Paid Media",
    featured: true,
    cardDescription: "Scaling traffic, messaging and sales campaigns on Meta Ads for an online apparel store.",
    industry: "Fashion & e-commerce",
    cardTags: ["Meta Ads", "E-commerce"],
    context:
      "East West is an apparel brand with online sales. The work combined three campaign objectives at once — traffic, messaging and sales — with monthly tracking to decide where to scale spend.",
    challenge:
      "Scaling investment without losing efficiency: in January, the sales campaign (with an Add to Cart objective) was still in its learning phase and generating few direct purchases.",
    objective:
      "Sustain low-cost traffic and conversations while the algorithm learned about the sales campaign, in order to scale it as soon as it started performing.",
    participation: [
      { text: "Planning traffic, messaging and sales campaigns", category: "estrategia", highlight: true },
      { text: "Selecting pieces based on results", category: "creatividad" },
      { text: "Monthly spend and results tracking", category: "implementacion", highlight: true },
      { text: "Writing up insights and next steps", category: "implementacion" },
    ],
    strategy: [
      "Traffic campaign optimized to Add to Cart, focused on volume at minimum cost.",
      "Messaging campaign working remarketing and closeness with the audience.",
      "Sales campaign scaled progressively as the algorithm accumulated conversion data.",
    ],
    channels: ["Meta Ads", "Instagram"],
    tools: ["Meta Ads Manager", "Meta Business Suite"],
    resultPeriods: [
      {
        period: "January 2026 · Traffic campaign",
        metrics: [
          { value: "60,861", label: "reach (+144%)" },
          { value: "2,842", label: "website visits (+553%)" },
          { value: "USD 0.02", label: "cost per result (-60%)" },
        ],
      },
      {
        period: "January 2026 · Messaging campaign",
        metrics: [
          { value: "327", label: "conversations started (+445%)" },
          { value: "USD 0.71", label: "cost per conversation (-35%)" },
        ],
      },
      {
        period: "February 2026 · Sales campaign",
        metrics: [
          { value: "15.55", label: "ROAS (+235.1%)" },
          { value: "67", label: "sales (+6,600%)" },
          { value: "81,181", label: "reach (+274.8%)" },
        ],
      },
    ],
    resultsConclusion:
      "The optimization significantly widened reach, increased visits and consolidated a sales campaign with a 15.55 ROAS.",
    learnings:
      "The sales campaign launched with an Add to Cart objective to speed up the algorithm's learning: in January, still in its learning phase, it generated few direct purchases; by February, with more accumulated data, it scaled to 67 sales and a 15.55 ROAS. Across all three campaigns, reels (especially with a person talking to camera) significantly outperformed static pieces.",
    coverStats: {
      eyebrow: "PERFORMANCE OVERVIEW",
      metrics: [
        { value: "15.55", label: "ROAS" },
        { value: "67", label: "sales" },
        { value: "81,181", label: "people reached" },
      ],
    },
    gallery: [],
  },
  {
    id: "remax",
    name: "RE/MAX María Inés",
    tagline: "Content coordination and digital strategy",
    category: "Social Media · Content · Real Estate",
    cardType: "Social Media",
    featured: true,
    cardDescription: "Content and digital strategy to position a real-estate account and generate inquiries.",
    industry: "Real estate",
    cardTags: ["Social Media", "Content"],
    context:
      "RE/MAX María Inés Capristo is a real-estate account focused on professional positioning, property acquisition, listing promotion and generating inquiries, with an active presence on Instagram and LinkedIn.",
    challenge: "Sustaining consistent, quality communication in a category where trust and closeness are decisive for generating an inquiry.",
    objective: "Strengthen the account's professional positioning and generate inquiries through listing content, property promotion and educational content.",
    participation: [
      { text: "Lead-generation strategy", category: "estrategia", highlight: true },
      { text: "Market research", category: "estrategia" },
      { text: "Property and educational content", category: "creatividad", highlight: true },
      { text: "Video scripts", category: "creatividad" },
      { text: "Monthly calendars", category: "implementacion" },
      { text: "AI-assisted interior staging", category: "implementacion", highlight: true },
    ],
    strategy: [
      "Daily sequences and Stories combining properties, educational content and closeness with the audience.",
      "Using AI for space staging, preserving real architecture, perspective and layout, with a disclaimer on generated images.",
      "Combined presence on Instagram and LinkedIn.",
    ],
    channels: ["Instagram", "LinkedIn", "Meta Ads"],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Canva", "AI staging tools"],
    resultPeriods: [
      {
        period: "Instagram · May 2026",
        metrics: [
          { value: "44.2K", label: "views" },
          { value: "37.5K", label: "reach" },
          { value: "393", label: "interactions" },
          { value: "+47", label: "new followers" },
        ],
      },
      {
        period: "Facebook · May 2026",
        metrics: [
          { value: "38.1K", label: "views (+31.8%)" },
          { value: "868", label: "link clicks (+135.9%)" },
          { value: "+4", label: "new followers" },
        ],
      },
      {
        period: "LinkedIn · May 2026",
        metrics: [
          { value: "404", label: "impressions" },
          { value: "210", label: "reach" },
          { value: "10", label: "interactions" },
        ],
      },
      {
        period: "Meta Ads · Traffic · May 2026",
        metrics: [
          { value: "41,009", label: "reach" },
          { value: "1,916", label: "profile visits (+1.27%)" },
          { value: "USD 0.03", label: "cost per visit" },
        ],
      },
      {
        period: "Meta Ads · Messages · May 2026",
        metrics: [
          { value: "284", label: "conversations started (+26.22%)" },
          { value: "USD 0.88", label: "cost per conversation (-16.98%)" },
        ],
      },
    ],
    learnings:
      "Instagram is the strongest platform in the account's organic ecosystem, while LinkedIn works better for positioning than for volume. In paid media, reels outperformed carousels in the messaging campaign (more closeness and conversion), while carousels still perform well for traffic. AI applied to property staging works as a production tool, not as a result in itself.",
    gallery: [
      { src: "/images/projects/remax/remax-post-casaenventa.webp", alt: "RE/MAX Instagram post: house for sale in Villa Luro" },
      { src: "/images/projects/remax/remax-historia-invertir.webp", alt: "RE/MAX Instagram Story about real-estate investing" },
      { src: "/images/projects/remax/remax-linkedin-decisiones.webp", alt: "RE/MAX LinkedIn piece: 6 decisions before going to market" },
    ],
  },
  {
    id: "quinton",
    name: "Viñedos y Olivares del Quintón",
    tagline: "Integrated content and paid media strategy",
    category: "Social Media · Content · Reporting · Food & tourism",
    cardType: "Social Media",
    featured: true,
    cardDescription: "Content and paid media to turn a tourism and dining offering into bookings and inquiries.",
    industry: "Wine tourism & dining",
    cardTags: ["Tourism", "Content"],
    context:
      "Viñedos y Olivares del Quintón combines a tourism offering, a restaurant and tastings. The work covered organic and paid content on Instagram and Facebook, with calendars and a seasonal campaign for September.",
    challenge: "Maintaining an active, coherent presence on two platforms with different audiences and formats, without mixing up their results.",
    objective: "Turn the tourism and dining offering into a digital system geared toward bookings, visits and inquiries.",
    participation: [
      { text: "Bookings strategy", category: "estrategia", highlight: true },
      { text: "Coordinating content, design and paid media", category: "estrategia", highlight: true },
      { text: "Daily calendars and Stories", category: "implementacion" },
      { text: "Organic and paid reports", category: "implementacion" },
      { text: "Remarketing", category: "implementacion" },
    ],
    strategy: ["Daily content about the restaurant, tours and tastings.", "Messaging and remarketing campaigns.", "Seasonal campaign planned for September."],
    channels: ["Instagram", "Facebook"],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Canva"],
    learnings:
      "Instagram and Facebook respond to different logics for this account: keeping them separate in planning avoided misleading comparisons between platforms and periods, and allowed adjusting the strategy for each one independently.",
    gallery: [
      { src: "/images/projects/quinton/quinton-portada-escapada.webp", alt: "'A getaway to Quintón' editorial piece with sunset over the vineyard" },
      { src: "/images/projects/quinton/quinton-sabores-origen.webp", alt: "'Flavors with origin' piece about the olive grove at Viñedos y Olivares del Quintón" },
      { src: "/images/projects/quinton/quinton-entrada.webp", alt: "Photograph of the main entrance at Viñedos y Olivares del Quintón" },
    ],
  },
  {
    id: "indusnor",
    name: "INDUSNOR",
    tagline: "B2B strategy and industrial positioning",
    category: "B2B strategy · Content · Industrial communication",
    cardType: "B2B strategy",
    featured: false,
    cardDescription: "B2B content strategy to build trust and generate qualified inquiries.",
    industry: "Industry & construction",
    cardTags: ["Strategy", "B2B"],
    context:
      "Indusnor offers industrial solutions for construction, logistics and industry (hydraulic ramps, doors, macrofiber, among other products). Its communication needed to overcome distrust around competitive prices and a lack of accessible technical information for a B2B audience.",
    challenge: "Communicating trust and technical backing to B2B audiences that tend to distrust competitive prices due to a lack of clear information to compare suppliers.",
    objective: "Build positioning and trust for a B2B industrial brand, generating qualified inquiries through educational content.",
    participation: [
      { text: "Market research", category: "estrategia", highlight: true },
      { text: "Identifying B2B audiences", category: "estrategia" },
      { text: "Defining content pillars", category: "creatividad", highlight: true },
      { text: "Proposing the salesperson as spokesperson", category: "creatividad", highlight: true },
      { text: "Adapting pieces for Meta Ads", category: "implementacion" },
    ],
    strategy: [
      "Brand differentiators: direct import, selected suppliers in China, over 70 years of experience, a two-year warranty and technical advice.",
      "Technical education through carousels, Stories and reels, with a WhatsApp CTA.",
      "Remarketing to audiences that already engaged with technical content.",
    ],
    channels: ["Instagram", "Facebook", "Meta Ads"],
    tools: ["Meta Business Suite", "Canva"],
    resultPeriods: [
      {
        period: "July 2026 · organic",
        metrics: [
          { value: "200.2K", label: "views on Facebook (+36.4%)" },
          { value: "121.8K", label: "viewers on Facebook (+89.7%)" },
          { value: "109.2K", label: "views on Instagram" },
          { value: "54.3K", label: "reach on Instagram" },
        ],
      },
    ],
    learnings:
      "Educational content (technical differentiators, warranties, use cases) drives better traction than purely commercial messaging in a B2B category where the main barrier is distrust around price.",
    gallery: [
      { src: "/images/projects/indusnor/indusnor-intro.webp", alt: "Instagram piece '¿Por qué elegir Indusnor?' showcasing industrial solutions" },
      { src: "/images/projects/indusnor/indusnor-deposito.webp", alt: "Photograph of an industrial warehouse with the Indusnor brand" },
    ],
  },
  {
    id: "oma-sushi",
    name: "OMA Sushi",
    tagline: "Planning and managing digital campaigns",
    category: "Meta Ads · Full funnel · Dining",
    cardType: "Paid Media",
    featured: false,
    cardDescription: "Reach and traffic campaigns on Meta Ads for a restaurant with its own delivery service.",
    industry: "Dining",
    cardTags: ["Meta Ads", "Email marketing"],
    context:
      "OMA Sushi is a restaurant with its own delivery service. The work combined email marketing and Meta Ads reach and traffic campaigns during the first two weeks of July.",
    challenge: "Building awareness of the brand's own delivery service and driving traffic to the Instagram profile as a step before working on conversions.",
    objective: "Awareness and traffic as the first stages of a full funnel, before moving on to conversion campaigns.",
    participation: [
      { text: "Planning reach and traffic campaigns", category: "estrategia", highlight: true },
      { text: "Selecting pieces based on results", category: "creatividad" },
      { text: "Email marketing", category: "implementacion" },
      { text: "Heatmap analysis and next steps", category: "implementacion", highlight: true },
    ],
    strategy: [
      "Reach campaign with reels and carousels as the most effective formats.",
      "Traffic campaign geared toward Instagram profile visits.",
      "First email marketing send with open, click and heatmap tracking.",
    ],
    channels: ["Meta Ads", "Email marketing", "Instagram"],
    tools: ["Meta Ads Manager", "Meta Business Suite"],
    resultPeriods: [
      {
        period: "July 2–15 · Reach campaign",
        metrics: [
          { value: "160,702", label: "reach" },
          { value: "172,277", label: "impressions" },
          { value: "ARS 199.23", label: "cost per result" },
        ],
      },
      {
        period: "July 2–15 · Traffic campaign",
        metrics: [
          { value: "30,109", label: "reach" },
          { value: "3,163", label: "Instagram profile visits" },
          { value: "ARS 30.20", label: "cost per result" },
        ],
      },
      {
        period: "Email marketing · first send",
        metrics: [
          { value: "5,268", label: "emails sent (97% delivered)" },
          { value: "19%", label: "open rate" },
          { value: "8%", label: "click rate" },
        ],
      },
    ],
    learnings:
      "Reels were the most effective format for both reach and traffic. The email heatmap showed the benefit button concentrated most of the clicks, confirming the importance of a clear visual CTA. The natural next step is extending the reach campaign and moving toward conversion objectives.",
    gallery: [
      { src: "/images/projects/oma-sushi/omasushi-cover-chopsticks.webp", alt: "OMA Sushi exclusive delivery campaign piece" },
      { src: "/images/projects/oma-sushi/omasushi-menu-nigiri.webp", alt: "OMA Sushi product piece featuring a nigiri selection" },
    ],
  },
];
