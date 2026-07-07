import DirectionPageLayout from "@/components/DirectionPageLayout";
import { motion } from "framer-motion";
import BlendedFinance from "@/components/BlendedFinance";
import { usePageSections } from "@/context/PageNavContext";

const waterfall = [
  { k: "Найближче оточення", v: "P2P-внески, спільнокошт («банка», «толока»)" },
  { k: "Громада / ОТГ", v: "Місцеві фонди, символічний внесок 1₴ як skin-in-the-game" },
  { k: "Корпоративний сектор", v: "ESG-бюджети, Social Impact Bonds під забезпечення держави" },
  { k: "Локальні донори / банки", v: "ЕБРД, НБУ, 38 банків — Хартія інклюзії" },
  { k: "Глобальні донори", v: "WB HEAL × THRIVE, GFF, гуманітарні фонди" },
];

const sectors = [
  {
    n: "01",
    name: "Фінансовий сектор — перший",
    why: "Регулятор у периметрі · має пісочницю · підписав Хартію інклюзії та Римську Хартію за людський капітал · консолідований сектор з ресурсами та інструментами для запуску фінансових рейок.",
    pilot: "НБУ + 38 банків + ESG-бюджети",
    metric: "Pilot Q2 2026 · ~200K покритих співробітників банків · цифри на узгодженні",
  },
  {
    n: "02",
    name: "Корпоративний сектор",
    why: "Мультиплікація банківського кейсу. Матриця: регіональне покриття × галузь × громадський аутрич.",
    pilot: "Heavy industry + ІТ (Метінвест, ДТЕК, EPAM, SoftServe, Київстар)",
    metric: "Subscription-модель · регіональне покриття",
  },
  {
    n: "03",
    name: "Громадський аутрич",
    why: "Caritas, Червоний Хрест, CARE, ОТГ, мобільні MHPSS-бригади. Frontline / IDP / прифронтові громади.",
    pilot: "120 мобільних бригад · 24 обласних хаби",
    metric: "Reverse Waterfall: громада → бізнес → донор",
  },
];

const FinancePage = () => {
  usePageSections([
    { id: "waterfall", label: "Water­fall" },
    { id: "blended", label: "Blended Finance" },
    { id: "scoring", label: "Scoring" },
    { id: "sectors", label: "Сектори" },
  ]);
  return (
  <DirectionPageLayout
    tag="02 · Фінансування"
    title="Цифрові рейки для змішаного фінансування"
    lead="Як Visa або Mastercard для сектору MHPSS. Зворотній водоспад ресурсів — від найближчого оточення до глобальних донорів. Scoring Matrix, смарт-контракти, ескроу за результатом."
  >
    <BlendedFinance />
    <section className="py-16 bg-transparent">
      <div className="section-container space-y-14">
        {/* Reverse waterfall */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Зворотній водоспад ресурсів
          </h2>
          <p className="text-sm text-secondary-foreground mb-6 max-w-2xl">
            Мобілізація починається з найближчого оточення — це знижує ризики та створює соціальний
            договір. Обсяги по джерелах розраховуються від ресурсного потоку (показник з дашборду).
          </p>
          <div className="grid md:grid-cols-5 gap-3">
            {waterfall.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-elevated p-4"
              >
                <div className="font-mono text-[10px] text-accent mb-1">0{i + 1}</div>
                <div className="font-display text-sm font-bold text-foreground mb-1">{w.k}</div>
                <p className="text-xs text-secondary-foreground leading-relaxed">{w.v}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scoring Matrix */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Scoring Matrix та смарт-контракт
          </h2>
          <p className="text-sm text-secondary-foreground mb-6 max-w-2xl">
            Автоматизоване, KPI-засноване фінансування. Ескроу-релейс по триєдиній верифікації
            (Triple Verification Oracle): сесія підтверджена → дані валідовані → outcome
            досягнутий.
          </p>
          <div className="card-elevated p-6">
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-foreground">
              <div>
                <div className="font-mono text-xs text-primary mb-1">40%</div>
                Завершення процесу
                <div className="text-xs text-muted-foreground">сесії · частота · віхи</div>
              </div>
              <div>
                <div className="font-mono text-xs text-primary mb-1">45%</div>
                Клінічне покращення
                <div className="text-xs text-muted-foreground">≥30% зниження PCL-5/PHQ-9/GAD-7</div>
              </div>
              <div>
                <div className="font-mono text-xs text-primary mb-1">15%</div>
                Повернення до функціонування
                <div className="text-xs text-muted-foreground">WHO-DAS 2.0 · зайнятість</div>
              </div>
            </div>
          </div>
        </div>

        {/* SaaS / Розгортання */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            На чому тримається програма (модель відносин)
          </h2>
          <p className="text-sm text-secondary-foreground mb-6 max-w-3xl">
            Дегресивна ставка 7% → 3% від обороту, що проходить через рейки. Мінімальні обсяги, за
            яких це спрацьовує. Національні формати й інтереси системних банків та гуманітарних
            акторів. Humanitarian reset і Grand Bargain — досягнення локалізації &gt;25% з першого
            дня роботи програми.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card-elevated p-5">
              <div className="font-display text-base font-bold text-foreground mb-2">
                Запуск у пісочниці регулятора
              </div>
              <p className="text-xs text-secondary-foreground">
                НБУ Sandbox (Постанова №39/2023). Інструменти: SIB, Escrow, MHI як collateral,
                параметричне страхування.
              </p>
            </div>
            <div className="card-elevated p-5">
              <div className="font-display text-base font-bold text-foreground mb-2">
                Експорт національної моделі
              </div>
              <p className="text-xs text-secondary-foreground">
                Після стабільного циклу в Україні — упаковка моделі для країн з подібним
                гуманітарним профілем.
              </p>
            </div>
          </div>
        </div>

        {/* Sectors */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Чому фінансовий сектор — перший
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {sectors.map((s) => (
              <div key={s.n} className="card-elevated p-5 border border-primary/20">
                <div className="font-mono text-[10px] text-primary mb-1">{s.n}</div>
                <div className="font-display text-base font-bold text-foreground mb-2">
                  {s.name}
                </div>
                <p className="text-xs text-secondary-foreground leading-relaxed mb-3">{s.why}</p>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  Партнери пілоту
                </div>
                <div className="text-xs text-foreground mb-2">{s.pilot}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  KPI
                </div>
                <div className="font-mono text-xs text-primary">{s.metric}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 grid md:grid-cols-2 gap-4">
          <a
            href="#"
            className="card-elevated p-5 border border-primary/30 hover:border-primary transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">
              Інтерфейс
            </div>
            <div className="font-display text-base font-bold text-foreground">
              Шлях гуманітарного актора →
            </div>
          </a>
          <a
            href="#"
            className="card-elevated p-5 border border-[hsl(var(--gold)/0.3)] hover:border-[hsl(var(--gold))] transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold-bright))] font-mono mb-2">
              Інтерфейс
            </div>
            <div className="font-display text-base font-bold text-foreground">
              Шлях донора / фінансиста →
            </div>
          </a>
        </div>
      </div>
    </section>
  </DirectionPageLayout>
  );
};

export default FinancePage;
