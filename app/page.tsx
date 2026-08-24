"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Inbox, SearchX } from "lucide-react";
import PaperCard from "@/components/PaperCard";
import { PaperCardSkeleton } from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import StatsStrip from "@/components/StatsStrip";
import { toast } from "@/components/Toaster";
import { Paper, InterestGroup, Tier } from "@/lib/types";
import { getSkippedIds, skipPaper } from "@/lib/storage";
import { INTERESTS_STORAGE_KEY } from "@/lib/interests";

interface DiscoverResponse {
  generatedAt: string;
  totalFound: number;
  failedSources: number;
  shortlist: Paper[];
}

const TIERS: Tier[] = ["Core", "Adjacent", "Broaden"];
type SortMode = "date" | "score";

const TIER_CHIP_ACTIVE: Record<Tier, string> = {
  Core: "bg-core text-white border-core",
  Adjacent: "bg-adjacent text-white border-adjacent",
  Broaden: "bg-broaden text-white border-broaden",
};

export default function TodayPage() {
  const [data, setData] = useState<DiscoverResponse | null>(null);
  const [visible, setVisible] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<Set<Tier>>(new Set());
  const [sortMode, setSortMode] = useState<SortMode>("score");

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
    toast("Skipped — won't resurface", "info");
  }

  function toggleTier(t: Tier) {
    setTierFilter((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  const filteredSorted = useMemo(() => {
    let list = visible;
    if (tierFilter.size > 0) {
      list = list.filter((p) => tierFilter.has(p.tier));
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.abstract.toLowerCase().includes(q) ||
          p.authors.some((a) => a.toLowerCase().includes(q)) ||
          p.matchedGroup.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      if (sortMode === "score") return b.score - a.score;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });
    return list;
  }, [visible, tierFilter, search, sortMode]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const filtersActive = tierFilter.size > 0 || search.trim().length > 0;

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-1.5">{today}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-2 tracking-tight">
          Today&apos;s shortlist
        </h1>
        <p className="text-ink-soft max-w-2xl leading-relaxed mb-5">
          Auto-discovered from arXiv and Semantic Scholar based on your interest profile,
          refreshed once a day. Pick whichever fits your energy — log it, or skip and it won&apos;t
          resurface.
        </p>

        {!loading && !error && visible.length > 0 && (
          <StatsStrip visible={visible} totalFound={data?.totalFound ?? null} generatedAt={data?.generatedAt ?? null} />
        )}
      </div>

      {!loading && !error && visible.length > 0 && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search
              size={15}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60"
              aria-hidden
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, author, topic…"
              className="w-full rounded-sm border border-paper-line bg-white/60 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft/50 transition-colors focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {TIERS.map((t) => {
              const active = tierFilter.has(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTier(t)}
                  className={`rounded-sm border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                    active
                      ? TIER_CHIP_ACTIVE[t]
                      : "border-paper-line bg-white/50 text-ink-soft hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              );
            })}
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="rounded-sm border border-paper-line bg-white/50 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              <option value="score">Sort: signal</option>
              <option value="date">Sort: newest</option>
            </select>
          </div>
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <PaperCardSkeleton key={i} delay={i * 90} />
          ))}
        </div>
      )}

      {!loading && error && (
        <ErrorState
          message="Couldn't load today's shortlist"
          detail={`${error}. arXiv and Semantic Scholar occasionally rate-limit or time out — a retry usually fixes it.`}
          onRetry={load}
        />
      )}

      {!loading && !error && visible.length === 0 && (
        <EmptyState
          icon={Inbox}
          title="Nothing left in today's shortlist"
          description={
            <>
              Everything&apos;s been read or skipped. Check back tomorrow, or adjust your
              interests in{" "}
              <a href="/settings" className="underline text-ink hover:text-accent">
                Settings
              </a>
              .
            </>
          }
        />
      )}

      {!loading && !error && visible.length > 0 && filteredSorted.length === 0 && (
        <EmptyState
          icon={SearchX}
          title="No matches"
          description="Nothing in today's shortlist matches your current search and filters."
          action={
            <button
              onClick={() => {
                setSearch("");
                setTierFilter(new Set());
              }}
              className="px-3 py-1.5 rounded-sm border border-ink/30 font-mono text-xs uppercase tracking-wide text-ink hover:bg-ink/5 transition-colors"
            >
              Clear filters
            </button>
          }
        />
      )}

      {!loading && !error && filteredSorted.length > 0 && (
        <div key={`${search}|${Array.from(tierFilter).join(",")}|${sortMode}`} className="stagger-in space-y-4">
          {filteredSorted.map((paper) => (
            <PaperCard key={paper.id} paper={paper} onSkip={handleSkip} />
          ))}
        </div>
      )}

      {data && (
        <p className="mt-8 font-mono text-[11px] text-ink-soft/60">
          {filtersActive && `Showing ${filteredSorted.length} of ${visible.length} · `}
          Scanned {data.totalFound} candidate papers · generated{" "}
          {new Date(data.generatedAt).toLocaleString()}
          {data.failedSources > 0 && ` · ${data.failedSources} source lookups failed`}
        </p>
      )}
    </div>
  );
}
