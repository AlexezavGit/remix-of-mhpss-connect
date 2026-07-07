import { useMemo } from "react";

// Deterministic mini sparkline-style bar chart derived from the metric label,
// so each metric gets a consistent visual signature (indicator, not data).
export const MiniBars = ({
  seed,
  color = "currentColor",
  trend = "up",
  bars = 6,
  height = 12,
}: {
  seed: string;
  color?: string;
  trend?: "up" | "down" | "flat";
  bars?: number;
  height?: number;
}) => {
  const values = useMemo(() => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    const rand = () => {
      h = (h * 1103515245 + 12345) & 0x7fffffff;
      return h / 0x7fffffff;
    };
    return Array.from({ length: bars }, (_, i) => {
      const bias =
        trend === "up" ? i / (bars - 1) : trend === "down" ? 1 - i / (bars - 1) : 0.5;
      return Math.max(0.25, Math.min(1, 0.35 + 0.55 * rand() + 0.25 * bias));
    });
  }, [seed, bars, trend]);

  const gap = 1.5;
  const barW = 2.5;
  const w = bars * (barW + gap);

  return (
    <svg
      width={w}
      height={height}
      viewBox={`0 0 ${w} ${height}`}
      aria-hidden
      className="shrink-0"
    >
      {values.map((v, i) => (
        <rect
          key={i}
          x={i * (barW + gap)}
          y={height - v * height}
          width={barW}
          height={v * height}
          fill={color}
          opacity={0.5 + 0.5 * (i / (bars - 1))}
        />
      ))}
    </svg>
  );
};
