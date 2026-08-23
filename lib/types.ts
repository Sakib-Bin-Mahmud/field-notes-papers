export type Tier = "Core" | "Adjacent" | "Broaden";

export interface InterestGroup {
  id: string;
  label: string;
  tier: Tier;
  keywords: string[];
  arxivCategories: string[];
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  url: string;
  pdfUrl?: string;
  source: "arXiv" | "Semantic Scholar";
  publishedDate: string; // ISO date
  matchedGroup: string; // InterestGroup label
  tier: Tier;
  matchedKeywords: string[];
  score: number;
}

export interface LogEntry {
  id: string; // paper id
  date: string; // ISO date logged
  title: string;
  url: string;
  contribution: string;
  method: string;
  relevanceTag: string;
  followUpFlag: string;
  timeSpentMinutes: number | null;
}

export interface SavedPaper extends Paper {
  status: "shortlisted" | "read" | "skipped";
  savedAt: string;
}
