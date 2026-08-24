import { Layers, Search, Sparkles } from "lucide-react";
import { Paper } from "@/lib/types";

function tierCount(papers: Paper[], tier: Paper["tier"]) {
  return papers.filter((p) => p.tier === tier).length;
}

export default function StatsStrip({
  visible,
  totalFound,
  generatedAt,
}: {
  visible: Paper[];
  totalFound: number | null;
  generatedAt: string | null;
}) {
  const stats = [
    {
      icon: Sparkles,
      label: "In shortlist",
      value: visible.length,
      tint: "text-accent bg-accent/10",
    },
    {
      icon: Layers,
      label: "Core matches",
      value: tierCount(visible, "Core"),
      tint: "text-core bg-core-bg",
    },
    {
      icon: Search,
      label: "Candidates scanned",
      value: totalFound ?? "—",
      tint: "text-ink-soft bg-paper-line/40",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 rounded-sm border border-paper-line bg-white/50 shadow-panel p-2 sm:p-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2.5 sm:gap-3 rounded-sm px-2.5 sm:px-3 py-2"
        >
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${s.tint}`}>
            <s.icon size={16} strokeWidth={2} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="font-heading text-xl sm:text-2xl font-semibold text-ink leading-none">
              {s.value}
            </p>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-ink-soft/80 truncate">
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
