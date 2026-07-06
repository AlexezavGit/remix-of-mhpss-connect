import { motion } from "framer-motion";

const components = [
  { name: "Skin in the Game", weight: 25, desc: "Особистий внесок бенефіціара / громади (соціальний договір)" },
  { name: "Співфінансування", weight: 20, desc: "Кількість джерел (blended finance leverage)" },
  { name: "Демогр. мультиплікатор", weight: 20, desc: "Ветеран / медик / Heavy Industry = вища вага" },
  { name: "Ймовірність завершення", weight: 20, desc: "На основі регресного датасету" },
  { name: "Клінічна терміновість", weight: 15, desc: "Пріоритет гострих випадків" },
];

const waterfallSteps = [
  { actor: "Громада", amount: "1 грн символічний", role: "Соціальний договір" },
  { actor: "Бізнес", amount: "CSR", role: "Валідація потреби" },
  { actor: "Локальний фонд", amount: "Регіональний ресурс", role: "Зниження ризику" },
  { actor: "Глобальний донор", amount: "Дофінансування", role: "Не зможе відмовити" },
];

const ScoringMatrix = () => {
  return (
    <section id="scoring" className="py-24 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="tag-fintech mb-4">Addendum: Розділ 18</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Scoring Matrix <span className="gold-gradient-text">смарт-контракту</span>
          </h2>
          <p className="text-secondary-foreground max-w-3xl text-lg">
            Операціоналізує «оплату за результат» через вагову матрицю, не binary pass/fail.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scoring weights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-elevated p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">Вагові компоненти</h3>
            <div className="space-y-5">
              {components.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                    <span className="stat-number text-lg">{c.weight}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.weight * 4}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Reverse Waterfall */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-elevated p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Reverse Waterfall</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Механізм де-ризикування: кожен наступний учасник бачить попередній внесок як валідацію потреби.
            </p>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 to-accent/20" />
              <div className="space-y-6">
                {waterfallSteps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-3 top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-card z-10" />
                    <div className="p-4 rounded-lg border border-border bg-muted/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display text-sm font-semibold text-foreground">{s.actor}</span>
                        <span className="text-xs text-primary font-mono">{s.amount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{s.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-xs text-primary font-medium">
                Донор не зможе відмовитись від дофінансування кейсів з ідентифікованими бенефіціарами і частково передплаченими послугами
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScoringMatrix;
