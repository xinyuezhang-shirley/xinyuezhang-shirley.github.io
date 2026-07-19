export const resumeUrl = "/Xinyue_Zhang_Resume.pdf";

export const education = [
  {
    school: "Stanford University",
    degree: "Master of Science in Computer Science",
    detail: "Concentration: Information Management and Analytics · GPA 3.97",
    dates: "Anticipated graduation December 2026",
    courses: [
      "Decision Making Under Uncertainty",
      "Machine Learning",
      "Mining Massive Datasets",
    ],
  },
  {
    school: "Northwestern University",
    degree: "Bachelor of Science in Computer Science",
    detail: "Murphy Scholar, Summa Cum Laude · GPA 3.99",
    dates: "Graduated June 2025",
    courses: [
      "Scalable Software Architecture",
      "Introduction to Networking",
      "Foundations of Security",
    ],
  },
];

export const skills = {
  languages: [
    "Python",
    "SQL",
    "C++",
    "JavaScript",
    "TypeScript",
    "Java",
    "C#",
  ],
  tools: [
    "Kubernetes",
    "Docker",
    "Linux",
    "AWS (EKS, EC2, Lambda, SQS)",
    "AWS CDK",
    "Git",
    "Airflow",
    "PyTorch",
    "TensorFlow",
    "Langflow",
    "React",
    "Node.js",
    "Express",
    "REST APIs",
    "HTML",
    "CSS",
  ],
  human: ["Native Mandarin Chinese", "Conversational Spanish"],
};

export const experience = [
  {
    role: "Software Engineering Intern",
    org: "Ironclad",
    dates: "Jun 2026 – Present",
    bullets: [
      "Architecting an end-to-end contract lifecycle platform that transforms chat-based procurement requests into structured contracting workflows, coordinating agent orchestration, information retrieval, decision-making, and downstream execution processes.",
      "Developing specialized contract classification and risk assessment agents that leverage retrieved contract metadata and business context to generate provenance-aware recommendations and structured outputs for redlining, execution, and review workflows.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "Confidential",
    dates: "Jan 2026 – Jun 2026",
    bullets: [
      "Architected an enterprise AI query platform enabling natural language access to structured databases and enterprise documents through a unified Query Router that classified user intent and orchestrated Text-to-SQL, RAG, and hybrid retrieval pipelines with intelligent fallback across heterogeneous data sources.",
      "Built production Text-to-SQL and citation-grounded RAG systems with automated schema selection for 100+ table databases, grounded retrieval, and LLM guardrails on an internal benchmark suite.",
      "Optimized production performance through multi-layer Redis caching, multi-tenant security, and request auditing, reducing LLM API calls while improving P95 latency.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "PwC (PricewaterhouseCoopers)",
    dates: "Jun 2025 – Aug 2025",
    bullets: [
      "Designed a multi-agent enterprise knowledge assistant using Langflow orchestration, implementing supervisor, retrieval, and response-generation workflows that routed employee questions through Azure AI Search and citation-grounded RAG pipelines over internal documentation, with architecture designed to support PwC's global workforce of 300K+ employees.",
      "Built automated evaluation pipelines for a citation-grounded RAG system using a human-curated benchmark spanning 50+ internal documents and hundreds of representative queries, and performing manual edge-case testing and prompt refinement to improve retrieval recall, answer grounding, and hallucination detection.",
      "Refactored backend storage and frontend rendering architecture to resolve hierarchical data consistency issues and cascading UI failures, improving platform reliability and ensuring accurate navigation of documentation across newly restructured organizational workflows.",
    ],
  },
  {
    role: "Data Analyst Intern",
    org: "Tesla",
    dates: "Mar 2025 – Jun 2025",
    bullets: [
      "Architected a fleet-scale brake deterioration detection platform processing telemetry from 1M+ Model 3 vehicles, designing data ingestion, feature engineering, model inference, and visualizations to identify vehicles at risk of brake fluid leaks.",
      "Built a Spark-based serving pipeline that automated daily fleet health analysis, generating vehicle-level risk scores and surfacing high-priority cases through internal dashboards used by chassis and service teams.",
      "Delivered a 96.6% precision model validated on serviced vehicles, identifying approximately 25% of deteriorating brake systems up to two months before service and enabling transition from manual investigations to continuous fleet monitoring.",
    ],
  },
];

export const projects = [
  {
    name: "MuseLab: a Multi-Agent Literary Intelligence Platform",
    org: "Independent project",
    dates: "Mar 2026 – Jun 2026",
    bullets: [
      "Designed a full-stack literary analysis platform using React, TypeScript, Express, and PostgreSQL, implementing literary-analysis services, semantic visualization engines, and built evaluation systems to support end-to-end revision workflows.",
      "Developed a 14-agent reasoning architecture combining literary-analysis agents with human-in-the-loop evaluation agents, enabling autonomous critique of both user manuscripts and the platform itself through specialized workflows for interpretation, software quality, UX evaluation, and design review.",
    ],
  },
];
