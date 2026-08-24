import { Target, Link2, Compass } from "lucide-react";
import { Tier } from "@/lib/types";

const STYLES: Record<Tier, string> = {
  Core: "bg-core-bg text-core border-core/30",
  Adjacent: "bg-adjacent-bg text-adjacent border-adjacent/30",
  Broaden: "bg-broaden-bg text-broaden border-broaden/30",
};

const ICONS: Record<Tier, typeof Target> = {
  Core: Target,
  Adjacent: Link2,
  Broaden: Compass,
};

export default function TierBadge({ tier }: { tier: Tier }) {
  const Icon = ICONS[tier];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border font-mono text-[11px] uppercase tracking-wide ${STYLES[tier]}`}
    >
      <Icon size={11} strokeWidth={2.25} aria-hidden />
      {tier}
    </span>
  );
}
