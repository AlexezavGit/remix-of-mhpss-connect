import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useT } from "@/i18n";
import {
  PATHWAYS,
  Pathway,
  PathwayId,
  INTEGRATION_PORTS,
} from "@/data/ring-hub";

type View = "donor" | "architect";

/**
 * RingHub — presentation section placed BEFORE the hero on the landing page.
 *
 * Renders the FEEL AGAIN ring as a near-top-down circle split into three
 * sectors (Donor, Provider, Beneficiary) converging on the Outcome
 * Verification core. Donor View hides technical metadata; Architect View
 * exposes FHIR / VC / ISO 20022 detail.
 */

const SECTORS: { id: PathwayId; color: string }[] = [
  { id: "donor", color: "hsl(var(--teal))" },
  { id: "provider", color: "hsl(var(--copper-bright))" },
  { id: "beneficiary", color: "hsl(var(--gold))" },
];

const RingHub = () => {
  const { t, lang } = useT();
  const [view, setView] = useState<View>("donor");
  const [activeId, setActiveId] = useState<PathwayId>("donor");

  const active: Pathway = useMemo(
    () => PATHWAYS.find((p) => p.id === activeId)!,
    [activeId],
  );

  // SVG sector geometry
  const cx = 250;
  const cy = 250;
  const rOuter = 230;
  const rInner = 150;

  const arcPath = (startDeg: number, endDeg: number) => {
    const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
    const s = toRad(startDeg);
    const e = toRad(endDeg);
    const x1 = cx + rOuter * Math.cos(s);
    const y1 = cy + rOuter * Math.sin(s);
    const x2 = cx + rOuter * Math.cos(e);
    const y2 = cy + rOuter * Math.sin(e);
    const x3 = cx + rInner * Math.cos(e);
    const y3 = cy + rInner * Math.sin(e);
    const x4 = cx + rInner * Math.cos(s);
    const y4 = cy + rInner * Math.sin(s);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${large} 0 ${x4} ${y4} Z`;
  };

  const labelPos = (deg: number, r: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  return (
    <section id="hub" className="relative bg-background overflow-hidden border-b border-border">
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--copper)/0.25), transparent 60%)" }}
      />
      <div className="section-container py-20 lg:py-28">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[hsl(var(--copper-bright))] mb-3">
              {t("hub.kicker")}
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-[1.05] text-foreground">
              {t("hub.title")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-xl">
              {t("hub.lead")}
            </p>
          </div>

          {/* View toggle */}
          <div
            role="radiogroup"
            aria-label={t("hub.viewToggle")}
            className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card/60 backdrop-blur-sm"
          >
            {(["donor", "architect"] as View[]).map((v) => (
              <button
                key={v}
                role="radio"
                aria-checked={view === v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-full transition-colors ${
                  view === v
                    ? "bg-[hsl(var(--copper))] text-[hsl(var(--primary-foreground))]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(`hub.view.${v}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Ring */}
          <div className="relative aspect-square max-w-[560px] mx-auto w-full">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <defs>
                <radialGradient id="copperGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--copper-bright))" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="hsl(var(--copper))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--navy-deep))" stopOpacity="0" />
                </radialGradient>
                <pattern id="moire" width="6" height="6" patternUnits="userSpaceOnUse">
                  <path d="M0 3 L6 3" stroke="hsl(var(--copper-bright))" strokeWidth="0.3" opacity="0.18" />
                </pattern>
              </defs>

              {/* Halo */}
              <circle cx={cx} cy={cy} r={rOuter + 20} fill="url(#copperGrad)" />

              {/* Sectors */}
              {SECTORS.map((s, i) => {
                const start = i * 120;
                const end = (i + 1) * 120;
                const isActive = s.id === activeId;
                return (
                  <g
                    key={s.id}
                    role="button"
                    aria-label={PATHWAYS.find((p) => p.id === s.id)!.title[lang]}
                    tabIndex={0}
                    onClick={() => setActiveId(s.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActiveId(s.id);
                    }}
                    className="cursor-pointer focus:outline-none"
                  >
                    <path
                      d={arcPath(start + 2, end - 2)}
                      fill={s.color}
                      fillOpacity={isActive ? 0.55 : 0.22}
                      stroke={s.color}
                      strokeOpacity={isActive ? 0.9 : 0.5}
                      strokeWidth={isActive ? 2 : 1}
                      className="transition-all"
                    />
                    <path d={arcPath(start + 2, end - 2)} fill="url(#moire)" />
                    {/* Sector label */}
                    {(() => {
                      const mid = (start + end) / 2;
                      const lp = labelPos(mid, (rInner + rOuter) / 2);
                      const p = PATHWAYS.find((p) => p.id === s.id)!;
                      return (
                        <text
                          x={lp.x}
                          y={lp.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="13"
                          fontWeight="700"
                          fill="hsl(var(--foreground))"
                          className="font-display select-none pointer-events-none uppercase tracking-wider"
                        >
                          {p.title[lang].replace(/^Шлях |^.* pathway$/i, "").trim() ||
                            p.title[lang]}
                        </text>
                      );
                    })()}
                  </g>
                );
              })}

              {/* Flow lines from active sector to core */}
              {(() => {
                const sIdx = SECTORS.findIndex((s) => s.id === activeId);
                const mid = sIdx * 120 + 60;
                const lp = labelPos(mid, rInner - 4);
                return (
                  <motion.line
                    key={activeId}
                    x1={lp.x}
                    y1={lp.y}
                    x2={cx}
                    y2={cy}
                    stroke="hsl(var(--copper-bright))"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                );
              })()}

              {/* Core — Outcome Verification */}
              <circle
                cx={cx}
                cy={cy}
                r={rInner - 8}
                fill="hsl(var(--navy-mid))"
                stroke="hsl(var(--copper-bright))"
                strokeWidth="1.5"
              />
              <text
                x={cx}
                y={cy - 12}
                textAnchor="middle"
                fontSize="10"
                fill="hsl(var(--copper-bright))"
                className="font-mono uppercase tracking-widest"
              >
                {t("hub.core.kicker")}
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="hsl(var(--foreground))"
                className="font-display"
              >
                {t("hub.core.title")}
              </text>
              <text
                x={cx}
                y={cy + 28}
                textAnchor="middle"
                fontSize="9"
                fill="hsl(var(--muted-foreground))"
                className="font-mono"
              >
                {t("hub.core.note")}
              </text>

              {/* Integration ports on outer rim */}
              {INTEGRATION_PORTS.map((p) => {
                const lp = labelPos(p.deg, rOuter + 14);
                const tp = labelPos(p.deg, rOuter + 28);
                const highlight = p.id === "fintech";
                return (
                  <g key={p.id}>
                    <circle
                      cx={lp.x}
                      cy={lp.y}
                      r={highlight ? 6.5 : 5}
                      fill={highlight ? "hsl(var(--gold-bright))" : "hsl(var(--copper-bright))"}
                      stroke="hsl(var(--background))"
                      strokeWidth="1.5"
                    >
                      <title>{p.label}: {p.desc[lang]}</title>
                    </circle>
                    <text
                      x={tp.x}
                      y={tp.y}
                      textAnchor="middle"
                      fontSize={highlight ? 10 : 8}
                      fontWeight={highlight ? 700 : 400}
                      fill={highlight ? "hsl(var(--gold-bright))" : "hsl(var(--muted-foreground))"}
                      className="font-mono uppercase tracking-wider"
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Pathway detail panel */}
          <aside className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 lg:sticky lg:top-24">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[hsl(var(--copper-bright))]">
              {t(`hub.pathway.${activeId}`)}
            </div>
            <h3 className="mt-2 font-display font-bold text-xl text-foreground">
              {active.title[lang]}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {view === "donor" ? active.donor[lang] : active.architect[lang]}
            </p>

            <ol className="mt-5 space-y-3">
              {active.steps.map((step, i) => (
                <li
                  key={step.id}
                  className="rounded-lg border border-border/60 bg-background/40 p-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--copper))] text-[hsl(var(--primary-foreground))] text-[10px] font-mono font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground">
                        {step.label[lang]}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {view === "donor" ? step.donor[lang] : step.architect[lang]}
                      </div>
                      {view === "architect" && (
                        <div className="mt-2 text-[10px] font-mono text-[hsl(var(--teal))] break-all">
                          <span className="opacity-70">{step.tech.standard}</span>
                          <span className="opacity-50"> · </span>
                          <span>{step.tech.hint}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {view === "donor" && (
              <div className="mt-5 p-3 rounded-lg bg-[hsl(var(--copper))/0.1] border border-[hsl(var(--copper))/0.3]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--copper-bright))]">
                  {t("hub.confidence")}
                </div>
                <div className="text-sm text-foreground mt-1">
                  {t("hub.confidence.note")}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default RingHub;
