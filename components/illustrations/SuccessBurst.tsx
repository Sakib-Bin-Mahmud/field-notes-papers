const SPARKS = [
  { x: -16, y: -14, color: "#FF6B47", delay: 40 },
  { x: 16, y: -14, color: "#FFC53D", delay: 90 },
  { x: -18, y: 10, color: "#3B5BDB", delay: 60 },
  { x: 18, y: 10, color: "#FF6B47", delay: 110 },
];

export default function SuccessBurst({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-6 w-6 shrink-0 items-center justify-center ${className}`} aria-hidden>
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="spark h-1 w-1 animate-spark-out"
          style={
            {
              backgroundColor: s.color,
              left: "50%",
              top: "50%",
              animationDelay: `${s.delay}ms`,
              "--spark-x": `${s.x}px`,
              "--spark-y": `${s.y}px`,
            } as React.CSSProperties
          }
        />
      ))}
      <svg viewBox="0 0 24 24" width="20" height="20" className="relative animate-pop-in">
        <circle cx="12" cy="12" r="11" fill="#3D6B4F" />
        <path
          d="M7 12.5 L10.3 16 L17 8.5"
          fill="none"
          stroke="#F1EEE6"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={48}
          strokeDasharray={48}
          className="animate-draw-check"
        />
      </svg>
    </span>
  );
}
