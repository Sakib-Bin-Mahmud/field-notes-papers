import { RotateCw } from "lucide-react";
import ErrorCompass from "./illustrations/ErrorCompass";

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
      <div className="flex items-start gap-4">
        <ErrorCompass className="shrink-0 -my-2" />
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-sm font-semibold text-broaden mb-0.5">{message}</p>
          {detail && <p className="text-sm text-broaden/80 leading-relaxed">{detail}</p>}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-1.5 rounded-sm border border-broaden/30 bg-white/50 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-broaden transition-all duration-200 ease-spring hover:bg-white/80 hover:-translate-y-0.5"
            >
              <RotateCw size={13} strokeWidth={2} aria-hidden />
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
