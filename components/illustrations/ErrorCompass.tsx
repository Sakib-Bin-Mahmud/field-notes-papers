export default function ErrorCompass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" width="96" height="80" className={className} aria-hidden>
      <circle cx="60" cy="48" r="30" fill="#F1DDD5" stroke="#8A3B2E" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="60" cy="48" r="30" fill="none" stroke="#8A3B2E" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="1 5" />
      <g transform="translate(60 48) rotate(28)">
        <path d="M0 -18 L6 4 L0 0 L-6 4 Z" fill="#FF6B47" />
        <path d="M0 18 L6 -4 L0 0 L-6 -4 Z" fill="#1B2430" fillOpacity="0.5" />
      </g>
      <circle cx="60" cy="48" r="3" fill="#1B2430" />
      <path
        d="M22 78 Q30 82 36 76 T50 78"
        fill="none"
        stroke="#8A3B2E"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
