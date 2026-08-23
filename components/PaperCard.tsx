"use client";

import Link from "next/link";
import { Paper } from "@/lib/types";
import TierBadge from "./TierBadge";

const TAB_COLOR: Record<Paper["tier"], string> = {
  Core: "bg-core",
  Adjacent: "bg-adjacent",
  Broaden: "bg-broaden",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "date unknown";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function authorLine(authors: string[]) {
  if (authors.length === 0) return "Unknown authors";
  if (authors.length <= 3) return authors.join(", ");
  return `${authors.slice(0, 3).join(", ")}, et al.`;
}

export default function PaperCard({
  paper,
  onSkip,
}: {
  paper: Paper;
  onSkip?: (id: string) => void;
}) {
  const logHref = `/log?paperId=${encodeURIComponent(paper.id)}&title=${encodeURIComponent(
    paper.title
  )}&url=${encodeURIComponent(paper.url)}`;

  return (
    <article className="relative bg-white/70 border border-paper-line rounded-sm shadow-sm pl-5 pr-4 sm:pr-5 py-4 overflow-hidden">
      <span
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${TAB_COLOR[paper.tier]}`}
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <TierBadge tier={paper.tier} />
        <span className="font-mono text-[11px] text-ink-soft/80 uppercase tracking-wide">
          {paper.source} · {formatDate(paper.publishedDate)}
        </span>
        <span className="font-mono text-[11px] text-ink-soft/60">· {paper.matchedGroup}</span>
      </div>

      <h3 className="font-display text-lg font-semibold leading-snug text-ink mb-1">
        {paper.title}
      </h3>
      <p className="text-sm italic text-ink-soft mb-2">{authorLine(paper.authors)}</p>
      <p className="text-sm text-ink-soft/90 leading-relaxed line-clamp-3 mb-4">
        {paper.abstract}
      </p>

      <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wide">
        <a
          href={paper.url}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-sm bg-ink text-paper hover:bg-ink/85 transition-colors"
        >
          Open paper ↗
        </a>
        <Link
          href={logHref}
          className="px-3 py-1.5 rounded-sm border border-ink/30 text-ink hover:bg-ink/5 transition-colors"
        >
          Log this one
        </Link>
        {onSkip && (
          <button
            onClick={() => onSkip(paper.id)}
            className="px-3 py-1.5 rounded-sm text-ink-soft hover:text-accent transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </article>
  );
}
