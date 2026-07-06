import { motion } from "framer-motion";
import { useT } from "@/i18n";

const items = [
  { v: "≈$8B/рік", k: "Втрачений потенціал ВВП", h: "довоєнна база, без рахування воєнного впливу" },
  { v: "62%", k: "Бар'єри звернення", h: "«дорого / не на часі / є важливіші»" },
  { v: "20–40%", k: "Адмін-навантаження фахівців", h: "після відміни паперів — ще зросло" },
  { v: "1.2%", k: "Локалізація глоб. бюджетів", h: "Grand Bargain target = 25%" },
];

const CostOfInaction = () => {
  const { t } = useT();
  return (
    <section id="cost" className="py-16 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-8"
        >
          <span className="tag-gold mb-3">06</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-3 text-foreground tracking-tight">
            {t("cost.title")}
          </h2>
          <p className="text-secondary-foreground text-base leading-relaxed">{t("cost.lead")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated p-4"
            >
              <div className="stat-number text-2xl mb-1">{it.v}</div>
              <div className="text-xs text-foreground font-semibold leading-snug">{it.k}</div>
              <div className="text-[10px] text-muted-foreground mt-1 italic">{it.h}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CostOfInaction;
