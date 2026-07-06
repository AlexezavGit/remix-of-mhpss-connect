import { motion } from "framer-motion";
import { useT } from "@/i18n";

const ImpactChain = () => {
  const { t } = useT();
  const tracks = [
    {
      tag: t("nav.digital"),
      tone: "accent",
      title: t("impact.digital.title"),
      steps: [
        t("impact.digital.s1"),
        t("impact.digital.s2"),
        t("impact.digital.s3"),
      ],
      out: t("impact.digital.out"),
    },
    {
      tag: t("nav.finance"),
      tone: "primary",
      title: t("impact.finance.title"),
      steps: [
        t("impact.finance.s1"),
        t("impact.finance.s2"),
        t("impact.finance.s3"),
      ],
      out: t("impact.finance.out"),
    },
    {
      tag: t("nav.sust"),
      tone: "gold",
      title: t("impact.sust.title"),
      steps: [
        t("impact.sust.s1"),
        t("impact.sust.s2"),
        t("impact.sust.s3"),
      ],
      out: t("impact.sust.out"),
    },
  ];

  const toneCls = (tone: string) =>
    tone === "accent"
      ? { border: "border-accent/30", text: "text-accent" }
      : tone === "primary"
      ? { border: "border-primary/30", text: "text-primary" }
      : { border: "border-[hsl(var(--gold)/0.3)]", text: "text-[hsl(var(--gold-bright))]" };

  return (
    <section id="impact" className="py-20 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <span className="tag-gold mb-3">04</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            {t("impact.title")}
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">{t("impact.lead")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {tracks.map((tr, i) => {
            const c = toneCls(tr.tone);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`card-elevated p-6 border ${c.border} flex flex-col`}
              >
                <div className={`text-[10px] uppercase tracking-widest font-mono mb-2 ${c.text}`}>
                  {String(i + 1).padStart(2, "0")} · {tr.tag}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4 leading-tight">
                  {tr.title}
                </h3>
                <ol className="space-y-2.5 mb-5 flex-1">
                  {tr.steps.map((s, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-secondary-foreground leading-snug">
                      <span className={`font-mono text-[11px] mt-0.5 shrink-0 ${c.text}`}>
                        {j + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <div className={`pt-4 border-t ${c.border}`}>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                    {t("impact.outcome")}
                  </div>
                  <div className={`font-display font-bold text-sm ${c.text}`}>{tr.out}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactChain;
