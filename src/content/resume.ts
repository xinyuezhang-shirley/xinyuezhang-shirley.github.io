/**
 * Resume content — source of truth mirrors public/Xinyue_Zhang_Resume.pdf.
 * Portfolio links are only attached where a listed entry has a direct case study.
 */

export const resumeUrl = "/Xinyue_Zhang_Resume.pdf";

/** Re-export site contact — keep resume masthead in sync with content/contact. */
export { contact } from "@/content/contact";

export type ResumeAction = {
  label: string;
  href: string;
  external?: boolean;
};

/** Explicit preview mapping — never inferred from the repo. */
export type ResumePreview = {
  entryId: string;
  title: string;
  caption?: string;
  /** Only set when the asset is verified for this exact entry */
  image?: string;
  destination?: string;
};

export const education = [
  {
    id: "edu-stanford",
    school: "Stanford University",
    degree: "Master of Science in Computer Science",
    detail: "Concentration: Information Management and Analytics · GPA: 3.97",
    dates: "Anticipated Graduation: December 2026",
    courses: [
      "Decision Making Under Uncertainty",
      "Machine Learning",
      "Mining Massive Datasets",
    ],
  },
  {
    id: "edu-northwestern",
    school: "Northwestern University",
    degree: "Bachelor of Science in Computer Science",
    detail: "Murphy Scholar, Summa Cum Laude · GPA: 3.99",
    dates: "Graduated June 2025",
    courses: [
      "Scalable Software Architecture",
      "Introduction to Networking",
      "Foundations of Security",
    ],
  },
];

export const skills = {
  programming: [
    "Python",
    "SQL",
    "C++",
    "JavaScript",
    "TypeScript",
    "Java",
    "C#",
  ],
  cloud: [
    "Kubernetes",
    "Docker",
    "Linux",
    "AWS (EKS, EC2, Lambda, SQS)",
    "AWS CDK",
    "Git",
    "Airflow",
  ],
  ai: ["PyTorch", "TensorFlow", "Langflow"],
  web: ["React", "Node.js", "Express", "REST APIs", "HTML", "CSS"],
};

export type ExperienceEntry = {
  id: string;
  role: string;
  org?: string;
  dates: string;
  bullets: string[];
  /** Single restrained portfolio action, if any */
  action?: ResumeAction;
};

export const experience: ExperienceEntry[] = [
  {
    id: "exp-ironclad",
    role: "Software Engineering Intern",
    org: "Ironclad",
    dates: "June 2026 – Present",
    bullets: [
      "Architecting an end-to-end contract lifecycle platform that transforms chat-based procurement requests into structured contracting workflows, coordinating agent orchestration, information retrieval, decision-making, and downstream execution processes.",
      "Developing specialized contract classification and risk assessment agents that leverage retrieved contract metadata and business context to generate provenance-aware recommendations and structured outputs for redlining, execution, and review workflows.",
    ],
    action: { label: "Ironclad", href: "/work/ironclad" },
  },
  {
    id: "exp-pwc",
    role: "Software Engineering Intern",
    org: "PwC",
    dates: "June 2025 – August 2025",
    bullets: [
      "Designed a multi-agent enterprise knowledge assistant using Langflow orchestration, implementing supervisor, retrieval, and response-generation workflows that routed employee questions through Azure AI Search and citation-grounded RAG pipelines over internal documentation, with architecture designed to support PwC's global workforce of 300K+ employees.",
      "Built automated evaluation pipelines for a citation-grounded RAG system using a human-curated benchmark spanning 50+ internal documents and hundreds of representative queries, and performing manual edge-case testing and prompt refinement to improve retrieval recall, answer grounding, and hallucination detection.",
      "Refactored backend storage and frontend rendering architecture to resolve hierarchical data consistency issues and cascading UI failures, improving platform reliability and ensuring accurate navigation of documentation across newly restructured organizational workflows.",
    ],
    action: { label: "PwC", href: "/work/pwc" },
  },
  {
    id: "exp-tesla",
    role: "Data Analyst Intern",
    org: "Tesla",
    dates: "March 2025 – June 2025",
    bullets: [
      "Architected a fleet-scale brake deterioration detection platform processing telemetry from 1M+ Model 3 vehicles, designing data ingestion, feature engineering, model inference, and visualizations to identify vehicles at risk of brake fluid leaks.",
      "Built a Spark-based serving pipeline that automated daily fleet health analysis, generating vehicle-level risk scores and surfacing high-priority cases through internal dashboards used by chassis and service teams.",
      "Delivered a 96.6% precision model validated on serviced vehicles, identifying approximately 25% of deteriorating brake systems up to two months before service and enabling transition from manual investigations to continuous fleet monitoring.",
    ],
    action: { label: "Tesla", href: "/work/tesla" },
  },
];

export type ProjectEntry = {
  id: string;
  name: string;
  org?: string;
  dates: string;
  bullets: string[];
  action?: ResumeAction;
};

export const projects: ProjectEntry[] = [
  {
    id: "proj-muselab",
    name: "MuseLab: a Multi-Agent Literary Intelligence Platform",
    dates: "March 2026 – June 2026",
    bullets: [
      "Designed a full-stack literary analysis platform using React, TypeScript, Express, and PostgreSQL, implementing literary-analysis services, semantic visualization engines, and built evaluation systems to support end-to-end revision workflows.",
      "Developed a 14-agent reasoning architecture combining literary-analysis agents with human-in-the-loop evaluation agents, enabling autonomous critique of both user manuscripts and the platform itself through specialized workflows for interpretation, software quality, UX evaluation, and design review.",
    ],
    action: { label: "MuseLab", href: "/work/muselab" },
  },
];

/**
 * Verified margin previews only.
 * No image unless the asset belongs to this exact resume entry.
 * Currently no dedicated stills are mapped — titles/captions only.
 */
export const resumePreviews: ResumePreview[] = [
  {
    entryId: "exp-ironclad",
    title: "Ironclad",
    caption: "Contract lifecycle · multi-agent workflows",
    destination: "/work/ironclad",
  },
  {
    entryId: "exp-pwc",
    title: "PwC",
    caption: "Multi-agent enterprise knowledge assistant",
    destination: "/work/pwc",
  },
  {
    entryId: "exp-tesla",
    title: "Tesla · Brake health",
    caption: "Fleet telemetry · deterioration detection",
    destination: "/work/tesla",
  },
  {
    entryId: "proj-muselab",
    title: "MuseLab",
    caption: "Multi-agent literary intelligence",
    destination: "/work/muselab",
  },
];

export function previewFor(entryId: string): ResumePreview | undefined {
  return resumePreviews.find((p) => p.entryId === entryId);
}
