import { AlertTriangle, RotateCw } from "lucide-react";

export default function ErrorState({
  message,
  detail,
  onRetry,
}: {
  message: string;
  detail?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-sm border border-broaden/25 bg-broaden-bg/70 shadow-card-broaden px-5 py-5 animate-fade-slide-up">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-broaden/15 text-broaden">
          <AlertTriangle size={16} strokeWidth={2} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-broaden mb-0.5">{message}</p>
          {detail && <p className="text-sm text-broaden/80 leading-relaxed">{detail}</p>}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-sm border border-broaden/30 bg-white/50 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-broaden transition-colors hover:bg-white/80"
          >
            <RotateCw size={13} strokeWidth={2} aria-hidden />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
