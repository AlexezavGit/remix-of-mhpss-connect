/**
 * QuestPaths — three thin vertical SVG paths that run down the entire page,
 * representing the three audiences' journeys (Donor / Provider / Beneficiary).
 *
 * They start at different vertical offsets (each audience enters the program
 * at a different moment) and converge at shared milestones (sync points)
 * where group interaction becomes possible. Sync points are marked by small
 * gold nodes.
 *
 * The component is fixed and sits behind all content (pointer-events-none),
 * giving the impression of a long quest map the user scrolls along.
 */
const PATHS = [
  {
    id: "donor",
    color: "hsl(var(--copper-bright))",
    label: "Donor",
    // Start offset (in viewport heights from top) — donor enters earliest
    startVH: 0.2,
    xPct: 14,
  },
  {
    id: "provider",
    color: "hsl(var(--accent))",
    label: "Provider",
    startVH: 0.45,
    xPct: 50,
  },
  {
    id: "beneficiary",
    color: "hsl(var(--gold-bright))",
    label: "Beneficiary",
    startVH: 0.75,
    xPct: 86,
  },
];

// Shared sync points (in viewport heights from top of document):
// where any two/three pathways align horizontally → group interaction possible.
const SYNC_POINTS_VH = [2.0, 3.6, 5.4, 7.1, 8.8];

const QuestPaths = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ mixBlendMode: "screen", opacity: 0.35 }}
    >
      <svg
        className="absolute top-0 left-0 w-full h-[1000vh]"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {PATHS.map((p) => (
          <line
            key={p.id}
            x1={`${p.xPct}%`}
            x2={`${p.xPct}%`}
            y1={`${p.startVH * 100}vh`}
            y2="1000vh"
            stroke={p.color}
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.55"
          />
        ))}
        {SYNC_POINTS_VH.map((y, i) => (
          <g key={i}>
            {/* horizontal sync connector */}
            <line
              x1={`${PATHS[0].xPct}%`}
              x2={`${PATHS[2].xPct}%`}
              y1={`${y * 100}vh`}
              y2={`${y * 100}vh`}
              stroke="hsl(var(--gold-bright))"
              strokeWidth="0.5"
              strokeDasharray="2 4"
              opacity="0.45"
            />
            {PATHS.map((p) => (
              <circle
                key={`${i}-${p.id}`}
                cx={`${p.xPct}%`}
                cy={`${y * 100}vh`}
                r="3"
                fill="hsl(var(--gold-bright))"
                opacity="0.7"
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default QuestPaths;
