export default function EmptyState({
  illustration,
  title,
  description,
  action,
}: {
  illustration: React.ReactNode;
  title: string;
  description: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-sm border border-paper-line bg-gradient-to-b from-white/60 to-paper-line/20 shadow-panel px-6 py-10 text-center animate-fade-slide-up">
      <div className="mx-auto mb-3 flex items-center justify-center">{illustration}</div>
      <p className="font-heading text-xl font-semibold text-ink mb-1.5">{title}</p>
      <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
