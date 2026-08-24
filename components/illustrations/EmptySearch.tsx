export default function EmptySearch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" width="112" height="94" className={className} aria-hidden>
      <rect x="28" y="24" width="54" height="58" rx="3" fill="#F1EEE6" stroke="#1B2430" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="37" y1="38" x2="73" y2="38" stroke="#1B2430" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="2 4" />
      <line x1="37" y1="48" x2="73" y2="48" stroke="#1B2430" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="2 4" />
      <line x1="37" y1="58" x2="60" y2="58" stroke="#1B2430" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="2 4" />
      <g transform="translate(72 62)">
        <circle r="15" fill="none" stroke="#3B5BDB" strokeWidth="4" />
        <line x1="10.5" y1="10.5" x2="22" y2="22" stroke="#3B5BDB" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="-3" cy="-3" r="4" fill="#FFC53D" fillOpacity="0.9" />
      </g>
    </svg>
  );
}
