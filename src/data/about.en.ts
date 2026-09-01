import type { AboutPillar } from "../types";

export const aboutTitle = "Strategy, creativity and results";

export const aboutHint = "See how I apply it +";

export const aboutPillars: AboutPillar[] = [
  {
    id: "strategy",
    title: "Strategic thinking",
    description: "Research, media planning and spotting opportunities for each brand.",
    label: "First, understand the landscape",
    body: "Before developing a campaign, I analyze the brand, the context, the audience and the objectives. This stage helps find a concrete opportunity and turn it into a strategy with direction.",
    points: [
      "Brand and competitor analysis.",
      "Defining audience and objectives.",
      "Research on references and trends.",
      "Content and media planning.",
    ],
  },
  {
    id: "creative",
    title: "Creative judgment",
    description: "Developing concepts and pieces that connect with the audience in every format.",
    label: "From strategy to a recognizable idea",
    body: "I turn the initial analysis into a concept capable of giving direction to all communication. The idea doesn't stay in a tagline: it adapts to content, visual identity and the campaign's different touchpoints.",
    points: [
      "Development of creative concepts.",
      "Defining tone and visual direction.",
      "Adapting to feed, stories, ads and email.",
      "Selecting and coordinating pieces.",
    ],
  },
  {
    id: "results",
    title: "Results orientation",
    description: "Tracking KPIs, optimizing campaigns and reporting for concrete decisions.",
    label: "Measuring to keep improving",
    body: "A campaign doesn't end when it's published. I analyze performance, identify opportunities and use the results to adjust media spend, content and next decisions.",
    points: [
      "Tracking CTR, CPC, CPM and ROAS.",
      "Monitoring investment and budget distribution.",
      "Optimizing Meta Ads campaigns.",
      "Reporting and next steps.",
    ],
  },
];
