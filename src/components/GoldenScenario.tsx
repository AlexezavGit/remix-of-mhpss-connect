import { motion } from "framer-motion";

const stages = [
  {
    step: "01",
    name: "Онбординг",
    action: "Авторизація Дія (KYC). Скринінг PHQ-9, GAD-7. Визначення інтенсивності.",
    trigger: "Створення Smart-кейсу: ID + бронювання ресурсів (держ+донор+місцевий)",
    color: "primary",
  },
  {
    step: "02",
    name: "Вибір фахівця",
    action: "Фахівець з реєстру. Запис → eHealth запис + транзакція «очікування».",
    trigger: "Подвійний opt-in: терапевт + клієнт",
    color: "accent",
  },
  {
    step: "03",
    name: "Сесія",
    action: "Верифікація (QR/FaceID). Split-payment: психолог отримує миттєво.",
    trigger: "Податки автоматично. Донор бачить виконану послугу.",
    color: "emerald",
  },
  {
    step: "04",
    name: "Супровід",
    action: "Кейс-менеджер / AI моніторить динаміку. Інтеграція з ринком праці.",
    trigger: "Сигнал ризику при пропуску сесій.",
    color: "teal",
  },
  {
    step: "05",
    name: "Результат",
    action: "Закриття контракту: «Returned to Work.» Звіт ROI для держави.",
    trigger: "Дані до МОЗ/Мінекономіки для ВВП.",
    color: "primary",
  },
];


const colorMap: Record<string, { dot: string; bg: string }> = {
  primary: { dot: "bg-primary", bg: "bg-primary/5 border-primary/20" },
  accent: { dot: "bg-accent", bg: "bg-accent/5 border-accent/20" },
  emerald: { dot: "bg-emerald", bg: "bg-emerald/5 border-emerald/20" },
  teal: { dot: "bg-teal", bg: "bg-teal/5 border-teal/20" },
};

const GoldenScenario = () => {
  return (
    <section id="golden" className="py-24 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="tag-fintech mb-4">Addendum: Розділ 17</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Golden Scenario: <span className="gold-gradient-text">Beneficiary Journey</span>
          </h2>
          <p className="text-secondary-foreground max-w-3xl text-lg">
            Повний цикл від першого кліку до економічного ефекту. 
            Система = трекер прогресу + фінансовий гарант + інтегратор даних.
          </p>
        </motion.div>

        {/* Journey steps */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/40 to-emerald/40 hidden md:block" />
          
          <div className="space-y-6">
            {stages.map((s, i) => {
              const c = colorMap[s.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative md:ml-16"
                >
                  {/* Dot */}
                  <div className={`absolute -left-16 top-6 w-4 h-4 rounded-full ${c.dot} ring-4 ring-background z-10 hidden md:block`} />
                  
                  <div className={`card-elevated p-6 border ${c.bg}`}>
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="shrink-0">
                        <span className="font-mono text-2xl font-bold text-muted-foreground">{s.step}</span>
                        <h3 className="font-display text-lg font-semibold text-foreground">{s.name}</h3>
                      </div>
                      <div className="flex-1 grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Дія</div>
                          <p className="text-sm text-secondary-foreground">{s.action}</p>
                        </div>
                        <div>
                          <div className="text-[10px] text-primary uppercase tracking-wider mb-1">Тригер</div>
                          <p className="text-sm text-foreground">{s.trigger}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GoldenScenario;
