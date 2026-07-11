/**
 * TickScale — Bloomberg-style horizontal ruler with regular minor ticks
 * and taller ticks every N steps. Used as unifying separator between
 * the three CopperRing rows (global menu · page menu · ticker).
 *
 * Purely presentational; no data. Colors come from the design tokens.
 */
const TickScale = ({
  minor = 48,
  majorEvery = 6,
  height = 10,
  className = "",
}: {
  /** Number of minor ticks across the width. */
  minor?: number;
  /** Every Nth tick is drawn taller (major). */
  majorEvery?: number;
  /** Total SVG height in px. */
  height?: number;
  className?: string;
}) => {
  const ticks = Array.from({ length: minor + 1 }, (_, i) => i);
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <svg
        viewBox={`0 0 ${minor} ${height}`}
        preserveAspectRatio="none"
        width="100%"
        height={height}
        className="block"
      >
        {/* baseline */}
        <line
          x1={0}
          y1={height - 0.5}
          x2={minor}
          y2={height - 0.5}
          stroke="hsl(var(--gold-bright) / 0.35)"
          strokeWidth={0.3}
        />
        {ticks.map((i) => {
          const isMajor = i % majorEvery === 0;
          const h = isMajor ? height : height * 0.45;
          return (
            <line
              key={i}
              x1={i}
              y1={height - h}
              x2={i}
              y2={height}
              stroke={
                isMajor
                  ? "hsl(var(--gold-bright) / 0.7)"
                  : "hsl(var(--foreground) / 0.28)"
              }
              strokeWidth={isMajor ? 0.35 : 0.22}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default TickScale;
