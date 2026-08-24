const VARIANTS = {
  today: {
    dots: [
      { cx: 14, cy: 44, r: 3, fill: "#FF6B47" },
      { cx: 34, cy: 20, r: 2.5, fill: "#3B5BDB" },
      { cx: 58, cy: 34, r: 4, fill: "#FFC53D" },
      { cx: 82, cy: 16, r: 2.5, fill: "#FF6B47" },
      { cx: 100, cy: 40, r: 3, fill: "#3B5BDB" },
    ],
    lines: [
      [14, 44, 34, 20],
      [34, 20, 58, 34],
      [58, 34, 82, 16],
      [82, 16, 100, 40],
    ],
    burstAt: [58, 34],
    burstColor: "#B5482E",
  },
  log: {
    dots: [
      { cx: 16, cy: 22, r: 2.5, fill: "#3B5BDB" },
      { cx: 40, cy: 42, r: 3, fill: "#FFC53D" },
      { cx: 66, cy: 18, r: 2.5, fill: "#FF6B47" },
      { cx: 92, cy: 36, r: 3.5, fill: "#3B5BDB" },
    ],
    lines: [
      [16, 22, 40, 42],
      [40, 42, 66, 18],
      [66, 18, 92, 36],
    ],
    burstAt: [92, 36],
    burstColor: "#3B5BDB",
  },
  settings: {
    dots: [
      { cx: 18, cy: 34, r: 3, fill: "#FFC53D" },
      { cx: 46, cy: 16, r: 2.5, fill: "#FF6B47" },
      { cx: 70, cy: 40, r: 3, fill: "#3B5BDB" },
      { cx: 96, cy: 22, r: 2.5, fill: "#FFC53D" },
    ],
    lines: [
      [18, 34, 46, 16],
      [46, 16, 70, 40],
      [70, 40, 96, 22],
    ],
    burstAt: [46, 16],
    burstColor: "#B5482E",
  },
} as const;

export default function HeaderMotif({
  variant,
  className = "",
}: {
  variant: keyof typeof VARIANTS;
  className?: string;
}) {
  const { dots, lines, burstAt, burstColor } = VARIANTS[variant];
  const [bx, by] = burstAt;

  return (
    <svg
      viewBox="0 0 116 60"
      width="116"
      height="60"
      className={className}
      aria-hidden
    >
      {lines.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#1B2430"
          strokeOpacity="0.18"
          strokeWidth="1.25"
        />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} />
      ))}
      <g transform={`translate(${bx} ${by})`} stroke={burstColor} strokeWidth="1.5" strokeLinecap="round">
        <line x1="-7" y1="0" x2="7" y2="0" />
        <line x1="0" y1="-7" x2="0" y2="7" />
        <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5" />
        <line x1="-4.5" y1="4.5" x2="4.5" y2="-4.5" />
      </g>
    </svg>
  );
}
