"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, NotebookPen, X, ChevronDown } from "lucide-react";
import { Paper } from "@/lib/types";
import TierBadge from "./TierBadge";

const TAB_COLOR: Record<Paper["tier"], string> = {
  Core: "bg-core",
  Adjacent: "bg-adjacent",
  Broaden: "bg-broaden",
};

const SHADOW: Record<Paper["tier"], string> = {
  Core: "shadow-card-core hover:shadow-card-core-hover",
  Adjacent: "shadow-card-adjacent hover:shadow-card-adjacent-hover",
  Broaden: "shadow-card-broaden hover:shadow-card-broaden-hover",
};

const HOVER_BORDER: Record<Paper["tier"], string> = {
  Core: "hover:border-core/40",
  Adjacent: "hover:border-adjacent/40",
  Broaden: "hover:border-broaden/40",
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
  const [expanded, setExpanded] = useState(false);
  const isLong = paper.abstract.length > 220;

  const logHref = `/log?paperId=${encodeURIComponent(paper.id)}&title=${encodeURIComponent(
    paper.title
  )}&url=${encodeURIComponent(paper.url)}`;

  return (
    <article
      className={`group relative bg-white/70 bg-card-lines border border-paper-line rounded-sm pl-5 pr-4 sm:pr-5 py-4 overflow-hidden transition-all duration-200 ease-out-soft hover:-translate-y-0.5 ${SHADOW[paper.tier]} ${HOVER_BORDER[paper.tier]}`}
    >
      <span
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${TAB_COLOR[paper.tier]} transition-[width] duration-200 ease-out-soft group-hover:w-2`}
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
      <p className="text-sm italic text-ink-soft/90 mb-2">{authorLine(paper.authors)}</p>
      <p
        className={`text-sm text-ink-soft/90 leading-relaxed mb-1.5 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {paper.abstract}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 mb-3 font-mono text-[11px] uppercase tracking-wide text-accent hover:text-accent/80 transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown
            size={12}
            strokeWidth={2.5}
            className={`transition-transform duration-200 ease-out-soft ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>
      )}
      {!isLong && <div className="mb-3" />}

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs uppercase tracking-wide">
        <a
          href={paper.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-ink text-paper transition-colors hover:bg-ink/85"
        >
          <ExternalLink size={13} strokeWidth={2.25} aria-hidden />
          Open paper
        </a>
        <Link
          href={logHref}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-ink/30 text-ink transition-colors hover:bg-ink/5"
        >
          <NotebookPen size={13} strokeWidth={2.25} aria-hidden />
          Log this one
        </Link>
        {onSkip && (
          <button
            onClick={() => onSkip(paper.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-ink-soft transition-colors hover:text-accent"
          >
            <X size={13} strokeWidth={2.25} aria-hidden />
            Skip
          </button>
        )}
      </div>
    </article>
  );
}
