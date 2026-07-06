import { motion } from "framer-motion";
import { useT } from "@/i18n";

const items = [
  {
    k: "Секторальний виклик війни",
    v: "Звіт «Ідеальний шторм»: одночасний пік потреб, виснаження кадрів, фрагментація фінансування.",
  },
  {
    k: "Поступова цифровізація сектору у світі",
    v: "Технологізація доказових клінічних методологій (VR, AR), цифрова агрегація приватної практики, цифровізація шляху бенефіціар → клієнт → пацієнт і потоків даних.",
  },
  {
    k: "Цифрова готовність учасників",
    v: "Населення, банківська система та державні реєстри готові до інтеграції — вікно для впровадження відкрите.",
  },
  {
    k: "Законодавча врегульованість",
    v: "Свіже законодавство виділяє та регулює сектор; формальних умов для виходу приватної практики з тіні поки немає.",
  },
  {
    k: "Тимчасове плече гуманітарного підсилення",
    v: "Гуманітарні ресурси та стандарти добрих практик можуть бути плечем для запуску — але без digital-плеча вони не масштабуються.",
  },
];

const WhyExists = () => {
  const { t } = useT();
  return (
    <section id="why" className="py-20 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <span className="tag-gold mb-3">01</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            {t("why.title")}
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">{t("why.lead")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated p-5"
            >
              <div className="text-accent text-xs font-mono mb-2">0{i + 1}</div>
              <div className="font-display text-base font-semibold text-foreground mb-2">
                {it.k}
              </div>
              <p className="text-sm text-secondary-foreground leading-relaxed">{it.v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyExists;
