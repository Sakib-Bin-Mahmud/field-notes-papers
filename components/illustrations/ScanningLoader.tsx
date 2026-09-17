export default function ScanningLoader({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" width="28" height="28" className={className} aria-hidden>
      <circle cx="30" cy="30" r="21" fill="none" stroke="#E1D8C4" strokeWidth="3" />
      <circle
        cx="30"
        cy="30"
        r="21"
        fill="none"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="18 112"
      />
      <g className="origin-center animate-needle-spin" style={{ transformOrigin: "30px 30px" }}>
        <path d="M30 14 L34 30 L30 30 L26 30 Z" fill="#C9A44C" />
        <path d="M30 46 L34 30 L30 30 L26 30 Z" fill="#111827" fillOpacity="0.45" />
      </g>
      <circle cx="30" cy="30" r="2.5" fill="#111827" />
    </svg>
  );
}
