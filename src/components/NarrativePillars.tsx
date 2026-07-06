import { motion } from "framer-motion";
import { useT } from "@/i18n";

const NarrativePillars = () => {
  const { t } = useT();
  const pillars = [
    { n: "01", t: t("pillars.1.t"), b: t("pillars.1.b") },
    { n: "02", t: t("pillars.2.t"), b: t("pillars.2.b") },
    { n: "03", t: t("pillars.3.t"), b: t("pillars.3.b") },
  ];
  return (
    <section id="pillars" className="py-20 bg-transparent blueprint-bg">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-12 text-foreground tracking-tight max-w-3xl"
        >
          {t("pillars.title")}
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-elevated p-6 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 font-mono text-7xl text-accent/10 select-none">
                {p.n}
              </div>
              <div className="relative">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {p.t}
                </h3>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  {p.b}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NarrativePillars;
