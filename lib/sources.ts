import { XMLParser } from "fast-xml-parser";
import { InterestGroup, Paper } from "./types";

const ARXIV_BASE = "http://export.arxiv.org/api/query";
const S2_BASE = "https://api.semanticscholar.org/graph/v1/paper/search";

function makeId(source: string, rawId: string) {
  return `${source}:${rawId}`.replace(/\s+/g, "-");
}

/**
 * Fetch recent arXiv papers for one interest group.
 * Combines the group's arXiv categories (OR'd) with its keywords
 * (OR'd, matched against title/abstract), sorted by submission date.
 */
export async function fetchArxivForGroup(group: InterestGroup): Promise<Paper[]> {
  const catClause = group.arxivCategories.map((c) => `cat:${c}`).join("+OR+");
  const kwClause = group.keywords
    .map((k) => `abs:"${k}"`)
    .join("+OR+");
  const searchQuery = `(${catClause})+AND+(${kwClause})`;

  const url = `${ARXIV_BASE}?search_query=${searchQuery}&sortBy=submittedDate&sortOrder=descending&max_results=6`;

  const res = await fetch(url, {
    // arXiv has no rate-limit-friendly CORS story for the browser, but this
    // runs server-side, so that's a non-issue. Cache for a day.
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];

  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const parsed = parser.parse(xml);

  const feed = parsed?.feed;
  if (!feed || !feed.entry) return [];
  const entries = Array.isArray(feed.entry) ? feed.entry : [feed.entry];

  return entries.map((entry: any): Paper => {
    const rawId: string = entry.id ?? "";
    const arxivId = rawId.split("/abs/")[1] ?? rawId;
    const authorsRaw = entry.author
      ? Array.isArray(entry.author)
        ? entry.author
        : [entry.author]
      : [];
    const authors = authorsRaw.map((a: any) => a?.name ?? "Unknown");

    let pdfUrl: string | undefined;
    const links = entry.link
      ? Array.isArray(entry.link)
        ? entry.link
        : [entry.link]
      : [];
    const pdfLink = links.find((l: any) => l?.["@_title"] === "pdf");
    if (pdfLink) pdfUrl = pdfLink["@_href"];

    return {
      id: makeId("arxiv", arxivId),
      title: String(entry.title ?? "").replace(/\s+/g, " ").trim(),
      authors,
      abstract: String(entry.summary ?? "").replace(/\s+/g, " ").trim(),
      url: rawId,
      pdfUrl,
      source: "arXiv",
      publishedDate: entry.published ?? new Date().toISOString(),
      matchedGroup: group.label,
      tier: group.tier,
      matchedKeywords: group.keywords,
      score: 0,
    };
  });
}

/**
 * Fetch recent Semantic Scholar papers for one interest group.
 * Uses the first keyword as the primary query (S2's search is a single
 * free-text query, not a boolean OR), restricted to the last 2 years.
 */
export async function fetchSemanticScholarForGroup(group: InterestGroup): Promise<Paper[]> {
  const currentYear = new Date().getFullYear();
  const yearFilter = `${currentYear - 1}-${currentYear}`;
  const query = encodeURIComponent(group.keywords[0]);
  const fields = "title,abstract,authors,url,publicationDate,externalIds";
  const url = `${S2_BASE}?query=${query}&year=${yearFilter}&fields=${fields}&limit=6`;

  const res = await fetch(url, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];

  const data = await res.json();
  const items = data?.data ?? [];

  return items
    .filter((p: any) => p?.title)
    .map((p: any): Paper => {
      const arxivId = p?.externalIds?.ArXiv;
      return {
        id: makeId("s2", p.paperId),
        title: String(p.title ?? "").trim(),
        authors: (p.authors ?? []).map((a: any) => a?.name ?? "Unknown"),
        abstract: String(p.abstract ?? "No abstract available.").trim(),
        url: arxivId ? `https://arxiv.org/abs/${arxivId}` : p.url ?? "#",
        pdfUrl: arxivId ? `https://arxiv.org/pdf/${arxivId}` : undefined,
        source: "Semantic Scholar",
        publishedDate: p.publicationDate ?? `${currentYear}-01-01`,
        matchedGroup: group.label,
        tier: group.tier,
        matchedKeywords: group.keywords,
        score: 0,
      };
    });
}
