"use client";

import { useEffect, useState } from "react";
import PaperCard from "@/components/PaperCard";
import { Paper, InterestGroup } from "@/lib/types";
import { getSkippedIds, skipPaper } from "@/lib/storage";
import { INTERESTS_STORAGE_KEY } from "@/lib/interests";

interface DiscoverResponse {
  generatedAt: string;
  totalFound: number;
  failedSources: number;
  shortlist: Paper[];
}

export default function TodayPage() {
  const [data, setData] = useState<DiscoverResponse | null>(null);
  const [visible, setVisible] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      let interests: InterestGroup[] | null = null;
      const raw = localStorage.getItem(INTERESTS_STORAGE_KEY);
      if (raw) interests = JSON.parse(raw);

      const res = await fetch("/api/discover", {
        method: interests ? "POST" : "GET",
        headers: interests ? { "Content-Type": "application/json" } : undefined,
        body: interests ? JSON.stringify({ interests }) : undefined,
      });
      if (!res.ok) throw new Error(`Discovery request failed (${res.status})`);
      const json: DiscoverResponse = await res.json();
      setData(json);

      const skipped = new Set(getSkippedIds());
      setVisible(json.shortlist.filter((p) => !skipped.has(p.id)));
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong fetching today's papers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSkip(id: string) {
    skipPaper(id);
    setVisible((v) => v.filter((p) => p.id !== id));
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-1">{today}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-2">
          Today&apos;s shortlist
        </h1>
        <p className="text-ink-soft max-w-2xl">
          Auto-discovered from arXiv and Semantic Scholar based on your interest profile,
          refreshed once a day. Pick whichever fits your energy — log it, or skip and it won&apos;t
          resurface.
        </p>
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 rounded-sm border border-paper-line bg-white/40 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="border border-broaden/30 bg-broaden-bg rounded-sm px-4 py-3 text-sm text-broaden">
          Couldn&apos;t load today&apos;s shortlist: {error}. Try refreshing — arXiv and Semantic
          Scholar occasionally rate-limit or time out.
        </div>
      )}

      {!loading && !error && visible.length === 0 && (
        <div className="border border-paper-line bg-white/50 rounded-sm px-4 py-6 text-center text-ink-soft">
          Nothing left in today&apos;s shortlist — everything&apos;s been read or skipped. Check
          back tomorrow, or adjust your interests in{" "}
          <a href="/settings" className="underline text-ink">
            Settings
          </a>
          .
        </div>
      )}

      {!loading && !error && visible.length > 0 && (
        <div className="space-y-4">
          {visible.map((paper) => (
            <PaperCard key={paper.id} paper={paper} onSkip={handleSkip} />
          ))}
        </div>
      )}

      {data && (
        <p className="mt-6 font-mono text-[11px] text-ink-soft/60">
          Scanned {data.totalFound} candidate papers · generated{" "}
          {new Date(data.generatedAt).toLocaleString()}
          {data.failedSources > 0 && ` · ${data.failedSources} source lookups failed`}
        </p>
      )}
    </div>
  );
}
