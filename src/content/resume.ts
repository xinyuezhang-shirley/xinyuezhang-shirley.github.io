export const resumeUrl = "/Xinyue_Zhang_Resume.pdf";

export const education = [
  {
    school: "Stanford University",
    degree: "Master of Science in Computer Science",
    detail: "Concentration: Information Management and Analytics · GPA 3.90",
    dates: "Anticipated graduation December 2026",
    courses: [
      "Decision Making Under Uncertainty (Reinforcement Learning)",
      "Machine Learning",
      "Introduction to Big Data Systems",
      "Operating Systems",
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
      "Game Design and Development",
      "Foundations of Data Science",
      "Design and Analysis of Algorithms",
    ],
  },
];

export const skills = {
  languages: ["Python", "SQL", "C++", "JavaScript", "Java", "C#", "HTML", "CSS"],
  tools: [
    "React.js",
    "MySQL",
    "Pandas",
    "PySpark",
    "Airflow",
    "NumPy",
    "Tableau",
    "MongoDB",
    "AWS",
    "scikit-learn",
    "TensorFlow",
    "Matplotlib",
    "Unity",
    "Arduino",
  ],
  human: ["Native Mandarin Chinese", "Conversational Spanish"],
};

export const experience = [
  {
    role: "Software Engineering Intern",
    org: "PwC (PricewaterhouseCoopers)",
    dates: "Jun 2025 – Aug 2025",
    bullets: [
      "Configured a multi-agent Langflow system wrapped around an internal RAG pipeline to route queries between retrieval and conversational agents, with support for translation and response post-processing.",
      "Contributed to internal Retrieval-Augmented Generation (RAG) prototypes by implementing backend evaluation logic and assisting with data retrieval workflows to improve document relevance and response quality.",
      "Refactored full-stack data storage and frontend rendering logic to address bugs caused by hierarchical structuring and cascading UI behavior, improving overall platform stability.",
    ],
  },
  {
    role: "Data Analyst Intern (ML & Data Engineering Focus)",
    org: "Tesla",
    dates: "Mar 2025 – Jun 2025",
    bullets: [
      "Designed and deployed a production ML pipeline processing fleet-scale time-series vehicle telemetry to predict brake system degradation, with model outputs integrated into live monitoring and diagnostics tools.",
      "Built an end-to-end data pipeline with a human-in-the-loop workflow to surface high-risk vehicles, accelerating thermal-related issue detection and root-cause investigation.",
      "Drove cross-functional debugging of production data and firmware regressions, partnering with firmware and engineering teams to identify systemic issues and improve reliability of brake system diagnostics.",
    ],
  },
  {
    role: "Teaching Assistant",
    org: "Northwestern University",
    dates: "Sep 2023 – Dec 2023",
    bullets: [
      "Led biweekly exercises and discussions, simplifying core concepts such as recursion and the ethical usage of technology.",
      "Managed a cohort of 10 students in class, providing personalized support to help them apply basic programming principles.",
    ],
  },
];

export const projects = [
  {
    name: "Differ: A Platform for Experiential Computing",
    org: "Delta Lab, Northwestern University",
    dates: "Dec 2023 – Sep 2025",
    bullets: [
      "First author on a CHI 2026 submission presenting Differ as a platform for reasoning about contextual differences in human experience design, with case studies grounded in real-world scenarios.",
      "Co-led research on computational models that enable system designers to evaluate differences in machine representations of abstract human experiences across different reference systems.",
      "Designed and implemented a lightweight data analysis framework connecting human concept expression with machine interpretation, surfacing actionable insights for inclusive, context-aware design.",
    ],
  },
  {
    name: "Data Analysis Platform Integration",
    org: "NU Solar Software Team Lead, Northwestern University",
    dates: "Sep 2023 – Mar 2025",
    bullets: [
      "Led the integration of a data analysis system that parses vehicle CAN data, automating data storage and processing on AWS.",
      "Led the implementation of two separate visualization pipelines: one for the driver dashboard to display real-time data, and another for backend time-series analysis to support engineering diagnostics.",
      "Utilized SQL for efficient data querying and Python for processing, ensuring that the platform operates across distributed systems.",
    ],
  },
];
