export interface CaseFigure {
  plate: string;
  src: string;
  alt: string;
  caption: string;
}

export interface WorkProject {
  slug: string;
  title: string;
  role: string;
  org: string;
  dates: string;
  tags: string[];
  teaser: string;
  /** Short claim shown as pull-quote when present. */
  claim?: string;
  story: string[];
  /** Editorial figures inserted after the first story block. */
  figures?: CaseFigure[];
  /** Show Evidence→Claim stack (MuseLab lineage). */
  showInterpretationStack?: boolean;
  /** Story paragraphs after figures / stack. */
  closing?: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoVideoUrl?: string;
}

export interface Artwork {
  slug: string;
  title: string;
  medium: string;
  image: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Photograph {
  slug: string;
  title: string;
  category: string;
  image: string;
}

export interface Poem {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export interface ResearchProject {
  slug: string;
  title: string;
  venue: string;
  org: string;
  dates: string;
  authors?: string[];
  tags: string[];
  abstract: string;
  keyFindings: string[];
  story?: string[];
  pdfUrl?: string;
}
