import { motion } from "framer-motion";

const outputs = [
  {
    n: "01",
    icon: "◆",
    order: "Перший",
    title: "Pitch Deck / Інвестори",
    body: "Для банківського сектору, ЕБРД, корпоративних партнерів. ROI-орієнтовано, SIBs/DIBs фреймворк.",
    audience: "ЕБРД, НБУ, банки, корпорації",
  },
  {
    n: "02",
    icon: "▤",
    order: "Другий",
    title: "Пропозиція для донора",
    body: "Для USAID, GFF, World Bank, ЮНІСЕФ. Теорія змін, LogFrame, вплив на DALY.",
    audience: "USAID, World Bank, UNICEF, EU",
  },
  {
    n: "03",
    icon: "★",
    order: "Третій",
    title: "Пропозиція для Посольства США",
    body: "Якірна інвестиція $2B у контексті. Узгодженість з Grand Bargain та реформами Tom Fletcher.",
    audience: "Посольство США",
  },
  {
    n: "04",
    icon: "▲",
    order: "Четвертий",
    title: "Policy Brief для КМУ",
    body: "Стратегічний документ: регуляторний sandbox, податкові преференції, поетапна ліцензія.",
    audience: "Координаційна рада КМУ, МОЗ, МінЕконом",
  },
  {
    n: "05",
    icon: "◐",
    order: "Живий документ",
    title: "Стратегічна карта",
    body: "Інтерактивна візуалізація для стейкхолдерів. Theory of Change, фінансова модель, пріоритизація.",
    audience: "Цей сайт · dashboard.feelagain.me",
  },
];

const OutputFormats = () => (
  <section id="outputs" className="py-20 bg-transparent scroll-mt-32">
    <div className="section-container">
      <div className="max-w-3xl mb-10">
        <span className="tag-gold mb-3">Вихідні формати</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
          Від стратегії до дії
        </h2>
        <p className="text-secondary-foreground text-lg">
          П'ять деліверейблів, які консорціум може підготувати під конкретного стейкхолдера — з тих самих
          цифр і тієї ж теорії змін.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {outputs.map((o, i) => (
          <motion.div
            key={o.n}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="card-elevated p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                aria-hidden
                className="w-9 h-9 rounded-md flex items-center justify-center text-[hsl(var(--gold-bright))] bg-[hsl(var(--gold-bright)/0.08)] border border-[hsl(var(--gold-bright)/0.3)] font-display text-lg"
              >
                {o.icon}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                {o.n} · {o.order}
              </span>
            </div>
            <div className="font-display text-lg font-bold text-foreground mb-2">{o.title}</div>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-4 flex-1">{o.body}</p>
            <div className="pt-3 border-t border-border/40">
              <div className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 mb-0.5">Аудиторія</div>
              <div className="text-xs text-foreground/80">{o.audience}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default OutputFormats;
