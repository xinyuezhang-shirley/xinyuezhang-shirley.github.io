export type LabeledRef = { id: string; label: string };

export type DreamRelated = {
  id: string;
  title: string;
  shared: string[];
};

export type DreamEntry = {
  id: string;
  ordinal: number;
  dateLabel: string;
  title: string;
  atmosphere: string;
  symbols: LabeledRef[];
  places: LabeledRef[];
  people: LabeledRef[];
  emotions: LabeledRef[];
  excerpt: string;
  interpretation: string;
  previewSymbols: string[];
  related: DreamRelated[];
};

export type IndexRow = {
  id: string;
  label: string;
  count: number;
  dreamIds: string[];
};

export type DreamPattern = {
  id: string;
  label: string;
  evidence: string[];
  summary: string;
};

export type DreamTrajectory = {
  id: string;
  label: string;
  steps: string[];
  dreamIds: string[];
};

export type DreamConnection = {
  key: string;
  a: string;
  b: string;
  aTitle: string;
  bTitle: string;
  shared: string[];
};

export type DreamsCatalog = {
  generatedAt: string;
  opening: string;
  dreamCount: number;
  dreams: DreamEntry[];
  symbolIndex: IndexRow[];
  peopleIndex: IndexRow[];
  placesIndex: IndexRow[];
  emotionIndex: IndexRow[];
  patterns: DreamPattern[];
  trajectories: DreamTrajectory[];
  connections: DreamConnection[];
};
