export default function CompassMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" className={className} aria-hidden>
      <circle cx="10" cy="10" r="9" fill="#F1EEE6" stroke="#B5482E" strokeWidth="1.4" />
      <path d="M10 4 L12.2 9.4 L10 12 L7.8 9.4 Z" fill="#FF6B47" />
      <path d="M10 16 L12.2 10.6 L10 8 L7.8 10.6 Z" fill="#B5482E" />
      <circle cx="10" cy="10" r="1.3" fill="#1B2430" />
    </svg>
  );
}
