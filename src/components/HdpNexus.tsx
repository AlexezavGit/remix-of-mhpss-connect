import { motion } from "framer-motion";

/**
 * HDP Nexus — three overlapping circles (Humanitarian × Clinical × Sustainable)
 * meeting at a "Nexus" convergence point. Pure SVG infographic.
 */
const HdpNexus = () => {
  const nodes = [
    { key: "humanitarian", label: "Гуманітарне", stat: "3.9M бенефіціарів", cx: 200, cy: 180, color: "hsl(var(--coral))" },
    { key: "clinical", label: "Клінічне", stat: "89% у диспансери", cx: 400, cy: 180, color: "hsl(var(--sky, 200 90% 60%))" },
    { key: "sustainable", label: "Сталий розвиток", stat: "4-5% ВВП у ЄС", cx: 300, cy: 340, color: "hsl(var(--emerald, 140 60% 45%))" },
  ];

  return (
    <section id="nexus" className="py-24 bg-transparent scroll-mt-32">
      <div className="section-container">
        <div className="max-w-3xl mb-10">
          <span className="tag-gold mb-3">Точка конвергенції</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            HDP Nexus для MHPSS
          </h2>
          <p className="text-secondary-foreground text-lg">
            Стоїмо на точці конвергенції між гуманітарним реагуванням, клінічною практикою та сталим розвитком.
            Технологічний розвиток з FinTech і війна, здатна мобілізувати ресурси — два вектори, що створюють
            вікно можливостей для «стада газелей».
          </p>
        </div>

        <div className="card-elevated p-6 md:p-10">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div className="relative">
              <svg viewBox="0 0 600 500" className="w-full h-auto" role="img" aria-label="HDP Nexus diagram">
                {/* soft grid */}
                <defs>
                  <radialGradient id="nx-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--gold-bright))" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="hsl(var(--gold-bright))" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* nexus glow */}
                <circle cx="300" cy="240" r="120" fill="url(#nx-glow)" />

                {/* connection lines */}
                {nodes.map((a, i) =>
                  nodes.slice(i + 1).map((b) => (
                    <line
                      key={a.key + b.key}
                      x1={a.cx}
                      y1={a.cy}
                      x2={b.cx}
                      y2={b.cy}
                      stroke="hsl(var(--foreground) / 0.15)"
                      strokeDasharray="3 4"
                    />
                  )),
                )}

                {/* circles */}
                {nodes.map((n, i) => (
                  <motion.g
                    key={n.key}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, type: "spring", stiffness: 90 }}
                  >
                    <circle
                      cx={n.cx}
                      cy={n.cy}
                      r={120}
                      fill={n.color}
                      fillOpacity="0.12"
                      stroke={n.color}
                      strokeOpacity="0.55"
                      strokeWidth="1.5"
                    />
                    <circle cx={n.cx} cy={n.cy} r={5} fill={n.color} />
                    <text
                      x={n.cx}
                      y={n.cy - 140}
                      textAnchor="middle"
                      className="font-display font-bold"
                      fontSize="18"
                      fill="hsl(var(--foreground))"
                    >
                      {n.label}
                    </text>
                    <text
                      x={n.cx}
                      y={n.cy - 120}
                      textAnchor="middle"
                      fontSize="11"
                      fill="hsl(var(--foreground) / 0.6)"
                      style={{ fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      {n.stat}
                    </text>
                  </motion.g>
                ))}

                {/* nexus label */}
                <g>
                  <circle
                    cx={300}
                    cy={240}
                    r={38}
                    fill="hsl(var(--background))"
                    stroke="hsl(var(--gold-bright))"
                    strokeWidth="2"
                  />
                  <text
                    x={300}
                    y={244}
                    textAnchor="middle"
                    className="font-display font-bold"
                    fontSize="14"
                    fill="hsl(var(--gold-bright))"
                    style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    NEXUS
                  </text>
                </g>
              </svg>
            </div>

            <div className="space-y-4">
              {nodes.map((n) => (
                <div key={n.key} className="flex gap-3 items-start p-4 rounded-lg border border-border/60 bg-card/40">
                  <span
                    className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: n.color }}
                  />
                  <div>
                    <div className="font-display text-base font-bold text-foreground">{n.label}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/55">{n.stat}</div>
                  </div>
                </div>
              ))}
              <div className="p-4 rounded-lg border border-[hsl(var(--gold-bright)/0.35)] bg-[hsl(var(--gold-bright)/0.05)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--gold-bright))] mb-1">
                  Вікно можливостей
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  FinTech-конвергенція × ресурси війни × «стадо газелей» приватної практики.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HdpNexus;
