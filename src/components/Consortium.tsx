import { motion } from "framer-motion";
import { useT } from "@/i18n";
import openSociety from "@/assets/logos/open-society.png";
import enkidu from "@/assets/logos/enkidu.png";
import gehaClalit from "@/assets/logos/geha-clalit.png";
import knu from "@/assets/logos/knu.png";
import quoroom from "@/assets/logos/quoroom.png";
import uscViterbi from "@/assets/logos/usc-viterbi.png";

const Consortium = () => {
  const { t } = useT();

  const stack = [
    { t: t("cons.what.1.t"), b: t("cons.what.1.b") },
    { t: t("cons.what.2.t"), b: t("cons.what.2.b") },
    { t: t("cons.what.3.t"), b: t("cons.what.3.b") },
  ];

  const partners = [
    { src: uscViterbi, alt: "USC Viterbi · ICT (Bravemind VR)" },
    { src: gehaClalit, alt: "Geha Mental Health Center · Clalit Health" },
    { src: knu, alt: "Київський національний університет ім. Тараса Шевченка · Факультет психології" },
    { src: openSociety, alt: "Відкрите суспільство" },
    { src: enkidu, alt: "Enkidu" },
    { src: quoroom, alt: "Quoroom" },
  ];

  return (
    <section id="consortium" className="py-20 bg-transparent">
      <div className="section-container">
        {/* WHAT stands behind — competency stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <span className="tag-gold mb-3">09</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            {t("cons.what.title")}
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">{t("cons.what.lead")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {stack.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated p-5 border border-[hsl(var(--gold)/0.25)]"
            >
              <div className="font-display text-base font-bold text-foreground mb-2">{s.t}</div>
              <p className="text-sm text-secondary-foreground leading-relaxed">{s.b}</p>
            </motion.div>
          ))}
        </div>

        {/* WHO stands behind — partner logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <span className="tag-gold mb-3">10</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            {t("cons.who.title")}
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">{t("cons.who.lead")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {partners.map((p) => (
            <div
              key={p.alt}
              className="card-elevated p-6 flex items-center justify-center min-h-[120px] bg-background/60 border border-border hover:border-[hsl(var(--gold)/0.4)] transition-colors"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="max-h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Consortium;
