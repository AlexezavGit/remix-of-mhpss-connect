import { motion } from "framer-motion";

type Item = {
  name: string;
  layer: "FinTech" | "Клінічний" | "Цифровий" | "Дані" | "Регуляторний";
  impact: number; // 1..5
  feasibility: number; // 1..5
  quickWin?: boolean;
};

const items: Item[] = [
  { name: "Проєкт з банківським сектором", layer: "FinTech", impact: 5, feasibility: 4, quickWin: true },
  { name: "P2P платежі / спільнокошт", layer: "FinTech", impact: 4, feasibility: 5, quickWin: true },
  { name: "EMDR тренінг Геха", layer: "Клінічний", impact: 5, feasibility: 4, quickWin: true },
  { name: "VR Bravemind адаптація", layer: "Клінічний", impact: 5, feasibility: 3 },
  { name: "Центр експертизи КНУ", layer: "Клінічний", impact: 4, feasibility: 4 },
  { name: "Перший dataset 10 років", layer: "Дані", impact: 4, feasibility: 4 },
  { name: "Корпоративна філантропія", layer: "FinTech", impact: 3, feasibility: 5, quickWin: true },
  { name: "Крипто-кампейн ЮНІСЕФ", layer: "FinTech", impact: 3, feasibility: 4, quickWin: true },
  { name: "Наскрізні показники ВВП", layer: "Дані", impact: 4, feasibility: 3 },
  { name: "Податкові преференції", layer: "Регуляторний", impact: 4, feasibility: 3 },
  { name: "Regulatory sandbox", layer: "Регуляторний", impact: 4, feasibility: 3 },
  { name: "Тренінги побратимів", layer: "Цифровий", impact: 3, feasibility: 4, quickWin: true },
  { name: "SIBs / DIBs запуск", layer: "FinTech", impact: 5, feasibility: 2 },
  { name: "eHealth інтеграція (FHIR)", layer: "Цифровий", impact: 3, feasibility: 3 },
];

const layerColor: Record<Item["layer"], string> = {
  FinTech: "hsl(var(--gold-bright))",
  Клінічний: "hsl(var(--sky, 200 90% 60%))",
  Цифровий: "hsl(var(--primary))",
  Дані: "hsl(var(--copper-bright))",
  Регуляторний: "hsl(var(--emerald, 140 60% 45%))",
};

const ImpactFeasibilityMatrix = () => {
  const quickWins = items.filter((x) => x.quickWin);
  // grid: 500x500, padding 40
  const P = 44;
  const W = 520;
  const H = 460;
  const inner = { x: P, y: P, w: W - 2 * P, h: H - 2 * P };
  const xFor = (f: number) => inner.x + ((f - 1) / 4) * inner.w;
  const yFor = (i: number) => inner.y + inner.h - ((i - 1) / 4) * inner.h;

  return (
    <section id="prioritization" className="py-20 bg-transparent scroll-mt-32">
      <div className="section-container">
        <div className="max-w-3xl mb-8">
          <span className="tag-fintech mb-3">Пріоритизація</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            Матриця Impact × Feasibility
          </h2>
          <p className="text-secondary-foreground text-lg">
            14 проєктів на площині «вплив на систему × здійсненність у горизонті року». Верхній правий квадрант — quick wins року 1.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="card-elevated p-6">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
              {/* quadrant fill */}
              <rect
                x={xFor(3)}
                y={yFor(5)}
                width={inner.x + inner.w - xFor(3)}
                height={yFor(3) - yFor(5)}
                fill="hsl(var(--gold-bright) / 0.06)"
              />
              {/* grid */}
              {[1, 2, 3, 4, 5].map((v) => (
                <g key={v}>
                  <line x1={xFor(v)} y1={inner.y} x2={xFor(v)} y2={inner.y + inner.h} stroke="hsl(var(--foreground) / 0.08)" />
                  <line x1={inner.x} y1={yFor(v)} x2={inner.x + inner.w} y2={yFor(v)} stroke="hsl(var(--foreground) / 0.08)" />
                </g>
              ))}
              {/* axes */}
              <line x1={inner.x} y1={inner.y + inner.h} x2={inner.x + inner.w} y2={inner.y + inner.h} stroke="hsl(var(--foreground) / 0.4)" />
              <line x1={inner.x} y1={inner.y} x2={inner.x} y2={inner.y + inner.h} stroke="hsl(var(--foreground) / 0.4)" />
              {/* axis labels */}
              <text x={inner.x + inner.w / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="hsl(var(--foreground) / 0.6)" style={{ fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Feasibility →
              </text>
              <text
                x={12}
                y={inner.y + inner.h / 2}
                textAnchor="middle"
                fontSize="11"
                fill="hsl(var(--foreground) / 0.6)"
                transform={`rotate(-90 12 ${inner.y + inner.h / 2})`}
                style={{ fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                Impact →
              </text>
              <text x={xFor(4.5)} y={yFor(4.7)} fontSize="9" fill="hsl(var(--gold-bright))" style={{ fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Quick Wins
              </text>

              {/* dots */}
              {items.map((it, i) => (
                <motion.g
                  key={it.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <circle
                    cx={xFor(it.feasibility)}
                    cy={yFor(it.impact)}
                    r={it.quickWin ? 9 : 6}
                    fill={layerColor[it.layer]}
                    fillOpacity={0.85}
                    stroke={it.quickWin ? "hsl(var(--gold-bright))" : "transparent"}
                    strokeWidth="1.5"
                  />
                </motion.g>
              ))}
            </svg>
            {/* legend */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {Object.entries(layerColor).map(([k, c]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">{k}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick wins list */}
          <div className="card-elevated p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--gold-bright))] mb-4">
              Quick Wins · Рік 1
            </div>
            <div className="space-y-3">
              {quickWins.map((q) => (
                <div key={q.name} className="flex items-start gap-3 pb-3 border-b border-border/30 last:border-0">
                  <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: layerColor[q.layer] }} />
                  <div className="flex-1">
                    <div className="font-display text-sm font-bold text-foreground">{q.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-0.5">
                      {q.layer} · Impact {q.impact}/5 · Feasibility {q.feasibility}/5
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactFeasibilityMatrix;
