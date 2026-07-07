import { motion } from "framer-motion";

const sources = [
  { label: "Спільнокошт / P2P", pct: 15, color: "hsl(var(--coral))" },
  { label: "Корпоративна філантропія", pct: 10, color: "hsl(var(--sky, 200 90% 60%))" },
  { label: "Обласні бюджети + кредити", pct: 15, color: "hsl(var(--gold-bright))" },
  { label: "Бюджетне співфінансування", pct: 20, color: "hsl(var(--emerald, 140 60% 45%))" },
  { label: "Системний фонд ЕБРД–НБУ", pct: 25, color: "hsl(var(--copper-bright))" },
  { label: "Донори (SIBs/DIBs/RBF)", pct: 15, color: "hsl(var(--primary))" },
];

const levels = [
  { n: 1, range: "$375–675M", title: "Найближче оточення", body: "Соціальний договір, P2P Монобанк, спільнокошт", risk: "Низький ризик, високе довір'я" },
  { n: 2, range: "$625M–1.125B", title: "Корпоративний + обласний", body: "CSR банків, обласні бюджети, кредити на відновлення", risk: "Де-ризикування через Рівень 1" },
  { n: 3, range: "$1.125–2.025B", title: "Бюджетне + системний фонд", body: "Держбюджет, ЕБРД–НБУ фонд, хартія людського капіталу", risk: "Де-ризиковане Рівнями 1+2" },
  { n: 4, range: "$375–675M", title: "Міжнародне фінансування", body: "SIBs, DIBs, RBF (World Bank GFF), якірна інвестиція", risk: "Страхування ризиків нестачі" },
];

const BlendedFinance = () => {
  // Build donut segments
  const total = sources.reduce((s, x) => s + x.pct, 0);
  const R = 90;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <section id="blended" className="py-20 bg-transparent scroll-mt-32">
      <div className="section-container">
        <div className="max-w-3xl mb-10">
          <span className="tag-fintech mb-3">Фінансова модель</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            Blended Finance
          </h2>
          <p className="text-secondary-foreground text-lg">
            Диверсифікована ресурсна мобілізація з де-ризикуванням через послідовне нарощування шарів фінансування.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 mb-14">
          {/* Donut */}
          <div className="card-elevated p-6 flex flex-col items-center justify-center">
            <div className="relative">
              <svg width="260" height="260" viewBox="0 0 260 260">
                <g transform="translate(130,130) rotate(-90)">
                  {sources.map((s) => {
                    const len = (s.pct / total) * C;
                    const seg = (
                      <circle
                        key={s.label}
                        r={R}
                        fill="none"
                        stroke={s.color}
                        strokeWidth="26"
                        strokeDasharray={`${len} ${C - len}`}
                        strokeDashoffset={-offset}
                      />
                    );
                    offset += len;
                    return seg;
                  })}
                </g>
                <text x="130" y="122" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground) / 0.55)" style={{ fontFamily: "monospace", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Загальна потреба
                </text>
                <text x="130" y="150" textAnchor="middle" className="font-display font-bold" fontSize="28" fill="hsl(var(--gold-bright))">
                  $2.5–4.5B
                </text>
                <text x="130" y="170" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground) / 0.5)">
                  50M год × $70/год
                </text>
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="card-elevated p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 mb-4">
              Структура фінансування
            </div>
            <div className="space-y-3">
              {sources.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
                  <div className="flex-1 flex items-baseline justify-between gap-3 border-b border-border/40 pb-2">
                    <span className="text-sm text-foreground">{s.label}</span>
                    <span className="font-display font-bold text-[hsl(var(--gold-bright))]">{s.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* De-risking levels */}
        <div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
            Послідовність де-ризикування
          </h3>
          <div className="grid md:grid-cols-4 gap-3">
            {levels.map((l, i) => (
              <motion.div
                key={l.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-elevated p-5 relative"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
                    Рівень {l.n}
                  </div>
                  <div className="font-display text-[hsl(var(--gold-bright))] font-bold text-sm">{l.range}</div>
                </div>
                <div className="font-display text-base font-bold text-foreground mb-1.5">{l.title}</div>
                <p className="text-xs text-secondary-foreground leading-relaxed mb-3">{l.body}</p>
                <div className="font-mono text-[9px] uppercase tracking-widest text-[hsl(var(--emerald,140_60%_45%))]">
                  {l.risk}
                </div>
                {/* Growing bar */}
                <div className="mt-3 h-1 rounded-full bg-foreground/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${25 * l.n}%`, background: "linear-gradient(90deg, hsl(var(--gold-bright)), hsl(var(--copper-bright)))" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlendedFinance;
