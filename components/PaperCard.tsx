"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, NotebookPen, X, ChevronDown } from "lucide-react";
import { Paper } from "@/lib/types";
import { getLogEntries } from "@/lib/storage";
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
  index,
  onSkip,
}: {
  paper: Paper;
  index?: number;
  onSkip?: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [logged, setLogged] = useState(false);
  const isLong = paper.abstract.length > 220;

  useEffect(() => {
    setLogged(getLogEntries().some((e) => e.id === paper.id));
  }, [paper.id]);

  const logHref = `/log?paperId=${encodeURIComponent(paper.id)}&title=${encodeURIComponent(
    paper.title
  )}&url=${encodeURIComponent(paper.url)}`;

  const noteNumber = typeof index === "number" ? String(index + 1).padStart(3, "0") : null;

  return (
    <article
      className={`group relative bg-aged/70 bg-card-lines border border-paper-line rounded-sm pl-5 pr-4 sm:pr-5 py-4 overflow-hidden transition-all duration-200 ease-spring hover:-translate-y-1 ${SHADOW[paper.tier]} ${HOVER_BORDER[paper.tier]}`}
    >
      <span
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${TAB_COLOR[paper.tier]} transition-[width] duration-200 ease-out-soft group-hover:w-2`}
        aria-hidden
      />
      {noteNumber && (
        <p className="chapter-mark font-mono text-[10px] uppercase tracking-widest text-brass/80 mb-1">
          Research Note {noteNumber}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <TierBadge tier={paper.tier} />
        <span className="font-mono text-[11px] text-ink-soft/80 uppercase tracking-wide">
          {paper.source} · {formatDate(paper.publishedDate)}
        </span>
        <span className="font-mono text-[11px] text-ink-soft/60">· {paper.matchedGroup}</span>
        {logged && (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-brass">
            ✦ Logged
          </span>
        )}
      </div>

      <h3 className="font-body text-lg font-semibold leading-snug text-ink mb-1">
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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-cobalt text-white transition-all duration-150 ease-spring hover:bg-cobalt/90 active:scale-95"
        >
          Read paper
          <ArrowRight size={13} strokeWidth={2.25} aria-hidden className="transition-transform duration-200 ease-spring group-hover:translate-x-0.5" />
        </a>
        <Link
          href={logHref}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-ink/30 text-ink transition-all duration-150 ease-spring hover:bg-ink/5 active:scale-95"
        >
          <NotebookPen size={13} strokeWidth={2.25} aria-hidden />
          Log this one
        </Link>
        {onSkip && (
          <button
            onClick={() => onSkip(paper.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-ink-soft transition-all duration-150 ease-spring hover:text-accent active:scale-95"
          >
            <X size={13} strokeWidth={2.25} aria-hidden />
            Skip
          </button>
        )}
      </div>
    </article>
  );
}
