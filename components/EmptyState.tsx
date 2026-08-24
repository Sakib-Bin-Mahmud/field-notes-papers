import { LucideIcon } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-sm border border-paper-line bg-gradient-to-b from-white/60 to-paper-line/20 shadow-panel px-6 py-10 text-center animate-fade-slide-up">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-core-bg text-core">
        <Icon size={22} strokeWidth={1.75} aria-hidden />
      </div>
      <p className="font-display text-lg font-semibold text-ink mb-1.5">{title}</p>
      <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
