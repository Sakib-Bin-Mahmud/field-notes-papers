import { Tier } from "@/lib/types";

const STYLES: Record<Tier, string> = {
  Core: "bg-core-bg text-core border-core/30",
  Adjacent: "bg-adjacent-bg text-adjacent border-adjacent/30",
  Broaden: "bg-broaden-bg text-broaden border-broaden/30",
};

export default function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm border font-mono text-[11px] uppercase tracking-wide ${STYLES[tier]}`}
    >
      {tier}
    </span>
  );
}
