import { motion } from "framer-motion";
import { useT } from "@/i18n";

const quadrants = [
  {
    n: "Q1",
    t: "Координація",
    b: "Алгоритми метчингу та обласні хаби розгортання — 24 регіони.",
  },
  { n: "Q2", t: "Якість", b: "Clinical Proof-of-Stake + outcome-based ranking фахівців." },
  { n: "Q3", t: "Прозорість", b: "Reverse Waterfall фінансування + tamper-evident audit-leдger." },
  { n: "Q4", t: "Місткість", b: "Платні clinical placements + франчайз-модель масштабування." },
];

const bus = [
  "Trembita · ESOZ — інтеграція з державними реєстрами",
  "Diia — auth і KYC для фахівців і бенефіціарів",
  "Гуманітарні системи (DHIS2, KoBo, ActivityInfo) — потоки даних",
  "Банківські рейки — acquiring, escrow, KYC",
];

const sandbox = [
  { k: "SIB", v: "Social Impact Bonds — повернення інвесторам за досягнення KPI" },
  { k: "Escrow", v: "Виплата з ескроу-рахунку за підтвердженим результатом" },
  { k: "MHI як collateral", v: "Mental Health Investment як забезпечення кредитування на відновлення" },
  { k: "Параметричне страхування", v: "Виплата за тригером без бюрократії" },
];

const HowItWorks = () => {
  const { t } = useT();
  return (
    <section id="how" className="py-20 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <span className="tag-gold mb-3">02</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            {t("how.title")}
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">{t("how.lead")}</p>
        </motion.div>

        {/* 4 quadrants */}
        <div className="mb-10">
          <div className="text-xs uppercase tracking-widest text-accent font-mono mb-4">
            Чотири квадранти цифрової архітектури
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quadrants.map((q, i) => (
              <motion.div
                key={q.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-elevated p-5"
              >
                <div className="font-mono text-xs text-accent mb-2">{q.n}</div>
                <div className="font-display text-lg font-bold text-foreground mb-1">{q.t}</div>
                <p className="text-xs text-secondary-foreground leading-relaxed">{q.b}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Digital bus */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="card-elevated p-6 border border-accent/30">
            <div className="text-xs uppercase tracking-widest text-accent font-mono mb-2">
              Digital Bus
            </div>
            <div className="font-display text-lg font-bold text-foreground mb-3">
              Цифрова шина між гуманітарними та державними системами
            </div>
            <ul className="space-y-2">
              {bus.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="text-sm text-secondary-foreground">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-xs text-muted-foreground italic">
              Шина належить Feel Again — це валідатор сесій та транскриптор даних від
              гуманітарних систем до ЕСОЗ.
            </div>
          </div>

          <div className="card-elevated p-6 border border-primary/30">
            <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">
              Sandbox · НБУ
            </div>
            <div className="font-display text-lg font-bold text-foreground mb-3">
              Чотири інструменти для regulatory sandbox
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sandbox.map((s, i) => (
                <div key={i} className="p-2.5 rounded border border-border bg-background/40">
                  <div className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                    {s.k}
                  </div>
                  <div className="text-xs text-secondary-foreground mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
