import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_INTERESTS } from "@/lib/interests";
import { fetchArxivForGroup, fetchSemanticScholarForGroup } from "@/lib/sources";
import { buildShortlist, dedupePapers } from "@/lib/scoring";
import { InterestGroup, Paper } from "@/lib/types";

// Cache this route's response for a day so we're not hitting arXiv /
// Semantic Scholar on every page load.
export const revalidate = 86400;

export async function POST(req: NextRequest) {
  return handle(req);
}

export async function GET(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  let interests: InterestGroup[] = DEFAULT_INTERESTS;
  try {
    const body = await req.json().catch(() => null);
    if (body?.interests && Array.isArray(body.interests) && body.interests.length > 0) {
      interests = body.interests;
    }
  } catch {
    // no body / GET request — fall back to defaults
  }

  const results = await Promise.allSettled(
    interests.flatMap((group) => [
      fetchArxivForGroup(group),
      fetchSemanticScholarForGroup(group),
    ])
  );

  const allPapers: Paper[] = results
    .filter((r): r is PromiseFulfilledResult<Paper[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);

  const failedSources = results.filter((r) => r.status === "rejected").length;

  const deduped = dedupePapers(allPapers);
  const shortlist = buildShortlist(deduped, 10, 3);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    totalFound: deduped.length,
    failedSources,
    shortlist,
  });
}
