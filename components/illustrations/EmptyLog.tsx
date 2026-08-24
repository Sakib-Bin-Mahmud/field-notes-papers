export default function EmptyLog({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" width="112" height="94" className={className} aria-hidden>
      <rect x="30" y="20" width="56" height="66" rx="3" fill="#F1EEE6" stroke="#1B2430" strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1="40" y1="34" x2="76" y2="34" stroke="#1B2430" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="40" y1="44" x2="76" y2="44" stroke="#1B2430" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="40" y1="54" x2="66" y2="54" stroke="#1B2430" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="40" y1="64" x2="72" y2="64" stroke="#1B2430" strokeOpacity="0.2" strokeWidth="1.5" />
      <g transform="translate(76 66) rotate(38)">
        <rect x="-3.5" y="-30" width="7" height="34" rx="2" fill="#3B5BDB" />
        <path d="M-3.5 4 L0 12 L3.5 4 Z" fill="#FFC53D" />
      </g>
    </svg>
  );
}
