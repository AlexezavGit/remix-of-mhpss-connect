import { motion } from "framer-motion";
import { useT } from "@/i18n";

const models = [
  {
    src: "WHO",
    v: "$1 → $4–5",
    desc: "Глобальна оцінка ROI для інвестицій у психічне здоров'я (продуктивність + знижені витрати на лікування).",
  },
  {
    src: "World Bank",
    v: "DALY ↓ + GDP ↑",
    desc: "Двопроєктна синергія HEAL × THRIVE — точка входу $50M (Component 4) у систему.",
  },
  {
    src: "LSE",
    v: "IAPT (UK)",
    desc: "£173M бюджет/рік · 12K терапевтів · ~52% recovery rate — прецедент для адаптації.",
  },
];

const RoiModels = () => {
  const { t } = useT();
  return (
    <section id="roi" className="py-16 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-8"
        >
          <span className="tag-gold mb-3">07</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-3 text-foreground tracking-tight">
            {t("roi.title")}
          </h2>
          <p className="text-secondary-foreground text-base leading-relaxed">{t("roi.lead")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {models.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated p-5"
            >
              <div className="text-[10px] uppercase tracking-widest text-accent font-mono mb-2">
                {m.src}
              </div>
              <div className="font-display text-2xl font-bold text-foreground mb-2">{m.v}</div>
              <p className="text-sm text-secondary-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoiModels;
