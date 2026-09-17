function Line({ className = "" }: { className?: string }) {
  return <span className={`block rounded-sm skeleton-shimmer animate-shimmer ${className}`} />;
}

export function PaperCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="relative bg-aged/70 border border-paper-line rounded-sm shadow-card pl-5 pr-4 sm:pr-5 py-4 overflow-hidden animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden
    >
      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-paper-line" />
      <div className="flex items-center gap-2 mb-3">
        <Line className="h-4 w-16" />
        <Line className="h-3 w-28" />
      </div>
      <Line className="h-5 w-4/5 mb-2" />
      <Line className="h-5 w-1/2 mb-3" />
      <Line className="h-3 w-2/5 mb-3" />
      <Line className="h-3 w-full mb-1.5" />
      <Line className="h-3 w-full mb-1.5" />
      <Line className="h-3 w-3/4 mb-4" />
      <div className="flex gap-3">
        <Line className="h-7 w-28" />
        <Line className="h-7 w-24" />
      </div>
    </div>
  );
}

export function LogEntrySkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="border border-paper-line bg-aged/50 rounded-sm px-4 py-3 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden
    >
      <Line className="h-3 w-20 mb-2" />
      <Line className="h-4 w-3/5 mb-2" />
      <Line className="h-3 w-2/5" />
    </div>
  );
}
