import DirectionPageLayout from "@/components/DirectionPageLayout";
import { motion } from "framer-motion";

const capacity = [
  {
    t: "Розвиток місткості",
    b: "Тренінги: EMDR (Geha · WHO-стандарт, 8–12 сесій), VR Bravemind (USC ICT, ~90% завершуваність), mhGAP для громадських працівників.",
  },
  {
    t: "Клінічна доказова досконалість",
    b: "Адаптація ізраїльського протоколу (8–12 сесій замість 12–20). Низька рецидивність.",
  },
  {
    t: "Освіта · Університети",
    b: "Центр експертизи в КНУ ім. Шевченка: розробка методології оцінки впливу на ВВП, аналіз дата-сету, дистанційне підвищення кваліфікації.",
  },
  {
    t: "Метчинг + Clinical Proof-of-Stake",
    b: "10 верифікованих кейсів для входу. Outcome-based ranking фахівців. Метчинг бенефіціара та фахівця за мовою, локацією, тяжкістю.",
  },
  {
    t: "Вихід приватної практики з тіні",
    b: "Економічні умови: дохід 70% від європейського, знижене податкове навантаження, спрощений ліцензійний шлях.",
  },
];

const gazelles = [
  { src: "Гуманітарний сектор", v: "1.0–1.6K", note: "клінічних фахівців з мобільних бригад" },
  { src: "Формалізована приватна практика (API)", v: "1.5–2K", note: "b17, helppoint, PsyChat" },
  { src: "Статистична тінь (ФОП)", v: "6.5–15K", note: "30–40% конверсія за умов 3-річних канікул" },
  { src: "Діаспора-супервайзинг", v: "3–5K", note: "українські фахівці за кордоном" },
  { src: "Тимчасово виїхавші — повернення", v: "2–3K", note: "окрема програма повернення" },
  { src: "Випускники ЗВО (МОН)", v: "5–8K/рік", note: "за 12–15% → 30–40% конверсії (IAPT-модель)" },
];

const SustainabilityPage = () => (
  <DirectionPageLayout
    tag="03 · Сталий розвиток"
    title="Трансформація гуманітарних бюджетів у ресурси сталого розвитку"
    lead="Розвиток місткості сектору, клінічна доказова досконалість, перетікання фахівців у приватну практику, центр експертизи. Прогнози — консервативні."
  >
    <section className="py-16 bg-transparent">
      <div className="section-container space-y-14">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Капасіті сектору
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capacity.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-elevated p-5"
              >
                <div className="font-display text-base font-bold text-foreground mb-2">{c.t}</div>
                <p className="text-sm text-secondary-foreground leading-relaxed">{c.b}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Звідки 50–60K фахівців
          </h2>
          <p className="text-sm text-secondary-foreground mb-2 max-w-3xl">
            Шлях формування «стада газелей» приватної практики MHPSS. Загальна цільова місткість —
            50–60K активних практикуючих фахівців.
          </p>
          <p className="text-[11px] text-muted-foreground italic mb-6 max-w-3xl">
            * Цифри консервативні. Допущення: 3-річні податкові канікули для виходу з тіні,
            оплачуване clinical placement (модель IAPT UK, конверсія 60–70%), діаспорна
            супервізійна модель 1:8.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {gazelles.map((g, i) => (
              <div key={i} className="card-elevated p-4">
                <div className="stat-number text-2xl mb-1">{g.v}</div>
                <div className="font-display text-sm font-semibold text-foreground">{g.src}</div>
                <div className="text-[11px] text-muted-foreground italic mt-1">{g.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Діаспора-супервайзинг
          </h2>
          <p className="text-sm text-secondary-foreground mb-4 max-w-3xl">
            Залучення українських фахівців за кордоном (Польща, Німеччина, Канада, США) як
            супервізорів та терапевтів — мовний матчинг, асинхронний + синхронний формат, Дія-auth.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Повернення тимчасово виїхавших
          </h2>
          <p className="text-sm text-secondary-foreground max-w-3xl">
            Окрема програма повернення кваліфікованих психологів і психотерапевтів — оплачуване
            clinical placement, гарантоване працевлаштування, кросс-бордерні платежі через
            банківський layer.
          </p>
        </div>

        <div className="mt-2 grid md:grid-cols-2 gap-4">
          <a
            href="#"
            className="card-elevated p-5 border border-[hsl(var(--gold)/0.3)] hover:border-[hsl(var(--gold))] transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold-bright))] font-mono mb-2">
              Інтерфейс
            </div>
            <div className="font-display text-base font-bold text-foreground">
              Потоки фахівців · professional journey →
            </div>
          </a>
          <a
            href="#"
            className="card-elevated p-5 border border-accent/30 hover:border-accent transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-accent font-mono mb-2">
              Інтерфейс
            </div>
            <div className="font-display text-base font-bold text-foreground">
              Інтерфейси користувачів →
            </div>
          </a>
        </div>
      </div>
    </section>
  </DirectionPageLayout>
);

export default SustainabilityPage;
