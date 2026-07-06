import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useT } from "@/i18n";

const ThreeDirections = () => {
  const { t } = useT();
  const cards = [
    {
      to: "/digital",
      tag: t("nav.digital"),
      title: t("dir.digital.title"),
      desc: t("dir.digital.desc"),
      tone: "accent",
    },
    {
      to: "/finance",
      tag: t("nav.finance"),
      title: t("dir.finance.title"),
      desc: t("dir.finance.desc"),
      tone: "primary",
    },
    {
      to: "/sustainability",
      tag: t("nav.sust"),
      title: t("dir.sust.title"),
      desc: t("dir.sust.desc"),
      tone: "gold",
    },
  ];
  return (
    <section id="directions" className="py-20 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <span className="tag-gold mb-3">03</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            {t("dir.title")}
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">{t("dir.lead")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const border =
              c.tone === "accent"
                ? "hover:border-accent border-accent/30"
                : c.tone === "primary"
                ? "hover:border-primary border-primary/30"
                : "border-[hsl(var(--gold)/0.3)] hover:border-[hsl(var(--gold))]";
            const text =
              c.tone === "accent"
                ? "group-hover:text-accent"
                : c.tone === "primary"
                ? "group-hover:text-primary"
                : "group-hover:text-[hsl(var(--gold-bright))]";
            return (
              <motion.div
                key={c.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={c.to}
                  className={`card-elevated p-6 block border transition-colors group h-full ${border}`}
                >
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-3">
                    0{i + 1} · {c.tag}
                  </div>
                  <h3
                    className={`font-display text-2xl font-bold text-foreground mb-3 transition-colors ${text}`}
                  >
                    {c.title}
                  </h3>
                  <p className="text-sm text-secondary-foreground leading-relaxed mb-5">
                    {c.desc}
                  </p>
                  <div className={`text-xs font-mono ${text} text-foreground/60`}>
                    {t("dir.cta")}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreeDirections;
