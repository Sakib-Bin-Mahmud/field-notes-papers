export default function EmptyToday({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" width="112" height="94" className={className} aria-hidden>
      <rect x="24" y="38" width="60" height="46" rx="3" fill="#E1D8C4" stroke="#111827" strokeOpacity="0.25" strokeWidth="1.5" />
      <rect x="32" y="30" width="60" height="46" rx="3" fill="#EFEAE0" stroke="#111827" strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1="40" y1="42" x2="82" y2="42" stroke="#111827" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="40" y1="52" x2="82" y2="52" stroke="#111827" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="40" y1="62" x2="70" y2="62" stroke="#111827" strokeOpacity="0.2" strokeWidth="1.5" />
      <g transform="translate(84 22) rotate(-12)">
        <circle r="16" fill="#C9A44C" />
        <path
          d="M-7 0.5 L-2.5 6 L8 -6.5"
          fill="none"
          stroke="#F7F5F0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
