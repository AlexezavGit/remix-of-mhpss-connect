import { motion } from "framer-motion";

interface Milestone {
  label: string;
  done?: boolean;
}

interface Phase {
  year: string;
  title: string;
  subtitle: string;
  milestones: Milestone[];
  color: "primary" | "accent" | "emerald";
}

const phases: Phase[] = [
  {
    year: "2025",
    title: "Перевірка механік",
    subtitle: "Наявні бюджети USAID / гуманітарних кластерів, ставка 5-7% замість накладних 30%+",
    color: "primary",
    milestones: [
      { label: "Банківський сектор: VR-кімнати + CSR пілот" },
      { label: "Перший датасет 10 років приватної практики" },
      { label: "P2P платежі + крипто-кампейн (ЮНІСЕФ)" },
      { label: "EMDR адаптація (Geha, Ізраїль)" },
      { label: "MVP цифрової координації — API-first" },
      { label: "EBRD-НБУ-38 банків: Хартія активована" },
    ],
  },
  {
    year: "2026",
    title: "Регіональне покриття + військові",
    subtitle: "Змішане фінансування, VR-терапія (Bravemind), пісочниця МОЗ",
    color: "accent",
    milestones: [
      { label: "VR Bravemind (Skip Rizzo / USC ICT) — розгортання" },
      { label: "Центр експертизи КНУ — методологія впливу на ВВП" },
      { label: "Регуляторна пісочниця: поетапна ліцензія" },
      { label: "HL7 FHIR інтеграція з ЕСОЗ + DHIS2" },
      { label: "Системний фонд EBRD — змішане фінансування" },
      { label: "Франчайз-модель приватної практики (пілот)" },
    ],
  },
  {
    year: "2027+",
    title: "Національний масштаб + експорт",
    subtitle: "Синхронізація з ЕСОЗ, ліцензія як послуга (операційні витрати замість капітальних), експорт моделі",
    color: "emerald",
    milestones: [
      { label: "SIBs/DIBs інструменти — повернення при KPI" },
      { label: "Наскрізні показники → ВВП (DALY averted)" },
      { label: "50-60K «газелей» — національне покриття" },
      { label: "Цифрова координація — повна автоматизація" },
      { label: "Експорт моделі: SaaS для конфліктних зон" },
      { label: "Діаспора-hub: дистанційна практика через API" },
    ],
  },
];

const colorMap = {
  primary: {
    dot: "bg-primary",
    line: "from-primary/60 to-primary/10",
    badge: "bg-primary/10 text-primary border-primary/20",
    glow: "shadow-[0_0_20px_hsl(168_80%_48%/0.3)]",
    bar: "bg-primary/20",
    barFill: "bg-primary",
  },
  accent: {
    dot: "bg-accent",
    line: "from-accent/60 to-accent/10",
    badge: "bg-accent/10 text-accent border-accent/20",
    glow: "shadow-[0_0_20px_hsl(240_60%_65%/0.3)]",
    bar: "bg-accent/20",
    barFill: "bg-accent",
  },
  emerald: {
    dot: "bg-emerald",
    line: "from-emerald/60 to-emerald/10",
    badge: "bg-emerald/10 text-emerald border-emerald/20",
    glow: "shadow-[0_0_20px_hsl(155_55%_40%/0.3)]",
    bar: "bg-emerald/20",
    barFill: "bg-emerald",
  },
};

const Roadmap = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="tag-fintech mb-4">Дорожня карта 2025–2027</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-4 text-foreground">
            Без державного бюджету{" "}
            <span className="gold-gradient-text">на старті</span>
          </h2>
          <p className="text-secondary-foreground max-w-2xl text-lg">
            Три фази трансформації — від перевірки механік до національного масштабу та експорту моделі
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/40 to-emerald/40" />

          <div className="space-y-12 md:space-y-0">
            {phases.map((phase, phaseIdx) => {
              const colors = colorMap[phase.color];
              const isLeft = phaseIdx % 2 === 0;

              return (
                <motion.div
                  key={phase.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: phaseIdx * 0.15 }}
                  className={`relative md:flex md:items-start md:gap-8 md:pb-16 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center">
                    <div
                      className={`w-5 h-5 rounded-full ${colors.dot} ${colors.glow} border-4 border-background`}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className={`card-elevated p-6 border ${colors.badge.split(" ")[2] || "border-border"} hover:border-opacity-50 transition-colors`}>
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold border ${colors.badge}`}
                        >
                          {phase.year}
                        </span>
                        <div className={`md:hidden w-3 h-3 rounded-full ${colors.dot}`} />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">
                        {phase.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                        {phase.subtitle}
                      </p>

                      {/* Milestones */}
                      <div className="space-y-3">
                        {phase.milestones.map((m, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: phaseIdx * 0.15 + i * 0.06 }}
                            className="flex items-start gap-2.5"
                          >
                            <div
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`}
                            />
                            <span className="text-sm text-secondary-foreground leading-snug">
                              {m.label}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary/20 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">
                Запит: вплив, а не фінансування
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
              {[
                { org: "USAID", role: "Сигнал узгодження" },
                { org: "МОЗ і Мінекономіки", role: "Регуляторна пісочниця" },
                { org: "EBRD Banking", role: "Дотримання Хартії" },
                { org: "Мотивація, не примус", role: "Стимул виходу з тіні" },
              ].map((ask) => (
                <div
                  key={ask.org}
                  className="p-3 rounded-lg bg-card border border-border text-center"
                >
                  <div className="font-mono text-xs text-primary font-bold mb-1">
                    {ask.org}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {ask.role}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
