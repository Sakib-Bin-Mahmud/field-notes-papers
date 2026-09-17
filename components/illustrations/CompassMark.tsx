export default function CompassMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" className={className} aria-hidden>
      <circle cx="10" cy="10" r="9" fill="#0B132B" stroke="#C9A44C" strokeWidth="1.4" />
      <path d="M10 4 L12.2 9.4 L10 12 L7.8 9.4 Z" fill="#C9A44C" />
      <path d="M10 16 L12.2 10.6 L10 8 L7.8 10.6 Z" fill="#F7F5F0" fillOpacity="0.7" />
      <circle cx="10" cy="10" r="1.3" fill="#F7F5F0" />
    </svg>
  );
}
