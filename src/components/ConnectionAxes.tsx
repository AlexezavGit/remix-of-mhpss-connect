import { motion } from "framer-motion";
import { useT } from "@/i18n";

const ConnectionAxes = () => {
  const { t } = useT();
  const axes = [
    {
      t: t("axes.1.t"),
      b: t("axes.1.b"),
      r: t("axes.1.r"),
    },
    {
      t: t("axes.2.t"),
      b: t("axes.2.b"),
      r: t("axes.2.r"),
    },
    {
      t: t("axes.3.t"),
      b: t("axes.3.b"),
      r: t("axes.3.r"),
    },
    {
      t: t("axes.4.t"),
      b: t("axes.4.b"),
      r: t("axes.4.r"),
    },
    {
      t: t("axes.5.t"),
      b: t("axes.5.b"),
      r: t("axes.5.r"),
    },
  ];

  return (
    <section id="axes" className="py-20 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <span className="tag-gold mb-3">05</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            {t("axes.title")}
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">{t("axes.lead")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {axes.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="card-elevated p-4 flex flex-col"
            >
              <div className="font-mono text-[10px] text-accent mb-1">0{i + 1}</div>
              <div className="font-display text-sm font-bold text-foreground mb-2 leading-tight">
                {a.t}
              </div>
              <p className="text-xs text-secondary-foreground leading-relaxed mb-3 flex-1">{a.b}</p>
              <div className="pt-3 border-t border-border">
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                  {t("axes.result")}
                </div>
                <div className="text-[11px] font-display font-bold text-[hsl(var(--gold-bright))] leading-snug">
                  {a.r}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConnectionAxes;
