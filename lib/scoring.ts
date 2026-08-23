import { Paper, Tier } from "./types";

const TIER_WEIGHT: Record<Tier, number> = {
  Core: 30,
  Adjacent: 18,
  Broaden: 10,
};

/** Newer papers score higher, decaying smoothly over ~60 days. */
function recencyScore(publishedDate: string): number {
  const published = new Date(publishedDate).getTime();
  if (Number.isNaN(published)) return 0;
  const days = (Date.now() - published) / (1000 * 60 * 60 * 24);
  if (days < 0) return 40;
  return Math.max(0, 40 - days * (40 / 60));
}

function keywordScore(paper: Paper): number {
  const haystack = `${paper.title} ${paper.abstract}`.toLowerCase();
  const hits = paper.matchedKeywords.filter((k) => haystack.includes(k.toLowerCase())).length;
  return Math.min(hits, 3) * 6;
}

export function scorePaper(paper: Paper): number {
  return recencyScore(paper.publishedDate) + keywordScore(paper) + TIER_WEIGHT[paper.tier];
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** De-duplicate papers that appear from both arXiv and Semantic Scholar. */
export function dedupePapers(papers: Paper[]): Paper[] {
  const seen = new Map<string, Paper>();
  for (const p of papers) {
    const key = normalizeTitle(p.title);
    const existing = seen.get(key);
    // Prefer the arXiv version (has a reliable pdfUrl) if there's a duplicate.
    if (!existing || (existing.source === "Semantic Scholar" && p.source === "arXiv")) {
      seen.set(key, p);
    }
  }
  return Array.from(seen.values());
}

/**
 * Build the daily shortlist: score everything, then take the best few,
 * capped per interest group so one prolific topic doesn't crowd out the rest.
 */
export function buildShortlist(papers: Paper[], maxTotal = 10, maxPerGroup = 3): Paper[] {
  const scored = papers
    .map((p) => ({ ...p, score: scorePaper(p) }))
    .sort((a, b) => b.score - a.score);

  const perGroupCount = new Map<string, number>();
  const shortlist: Paper[] = [];

  for (const paper of scored) {
    const count = perGroupCount.get(paper.matchedGroup) ?? 0;
    if (count >= maxPerGroup) continue;
    shortlist.push(paper);
    perGroupCount.set(paper.matchedGroup, count + 1);
    if (shortlist.length >= maxTotal) break;
  }

  return shortlist;
}
