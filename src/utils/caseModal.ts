import type { AcademicCampaign, CaseModalContent, CaseStudy } from "../types";

export function caseStudyToModalContent(caseStudy: CaseStudy): CaseModalContent {
  return {
    kind: "profesional",
    id: caseStudy.id,
    name: caseStudy.name,
    tagline: caseStudy.tagline,
    industry: caseStudy.industry,
    category: caseStudy.category,
    concept: caseStudy.concept,
    context: caseStudy.context,
    challenge: caseStudy.challenge,
    objective: caseStudy.objective,
    audience: caseStudy.audience,
    insight: caseStudy.insight,
    participation: caseStudy.participation,
    strategy: caseStudy.strategy,
    execution: caseStudy.execution,
    tools: caseStudy.tools,
    resultPeriods: caseStudy.resultPeriods,
    resultsConclusion: caseStudy.resultsConclusion,
    learnings: caseStudy.learnings,
    gallery: caseStudy.gallery,
  };
}

export function academicCampaignToModalContent(
  campaign: AcademicCampaign,
  disclaimer: string
): CaseModalContent {
  return {
    kind: "academico",
    id: campaign.id,
    name: campaign.name,
    industry: campaign.industry,
    category: campaign.category,
    concept: campaign.concept,
    context: campaign.context,
    challenge: campaign.problem,
    objective: campaign.objective,
    audience: campaign.audience,
    insight: campaign.insight,
    authorsNote: campaign.authorsNote,
    strategy: campaign.development,
    tone: campaign.tone,
    gallery: campaign.gallery,
    disclaimer,
  };
}
