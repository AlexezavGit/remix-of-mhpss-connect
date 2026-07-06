import { motion } from "framer-motion";
import { useT } from "@/i18n";

const stages = [
  {
    n: "01",
    t: "Запуск у пісочниці регулятора",
    b: "Постанова НБУ №39/2023 створює правовий простір тестувати MHI як collateral, SIB, escrow й параметричне страхування одночасно.",
  },
  {
    n: "02",
    t: "Регіональне охоплення",
    b: "24 області змагаються за індекс MHEI — він стає умовою отримання кредитів на відновлення.",
  },
  {
    n: "03",
    t: "Секторальне покриття",
    b: "Старт із фінансового сектору → корпоративний (EAP) → ІТ та heavy industry → освіта → громадський сектор.",
  },
  {
    n: "04",
    t: "Військові, шпиталі, побратими",
    b: "Тренінги з прескринінгу для персоналу шпиталів і побратимів — нижчий поріг входу.",
  },
];

const ProgramRollout = () => {
  const { t } = useT();
  return (
    <section id="rollout" className="py-20 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <span className="tag-gold mb-3">08</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            {t("deploy.title")}
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">{t("deploy.lead")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated p-5"
            >
              <div className="font-mono text-xs text-accent mb-2">{s.n}</div>
              <div className="font-display text-base font-bold text-foreground mb-2">{s.t}</div>
              <p className="text-xs text-secondary-foreground leading-relaxed">{s.b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramRollout;
