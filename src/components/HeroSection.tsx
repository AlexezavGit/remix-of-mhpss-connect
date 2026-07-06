import { motion } from "framer-motion";
import { useT } from "@/i18n";

const HeroSection = () => {
  const { t } = useT();
  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-block mb-8">
            <span className="tag-gold">
              {t("hero.kicker")}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.02] mb-8 tracking-tight">
            <span className="text-foreground">{t("hero.title.a")}</span>
            <br />
            <span className="copper-gradient-text">{t("hero.title.b")}</span>
          </h1>

          <p className="text-lg md:text-xl text-secondary-foreground mb-5 font-light leading-relaxed max-w-3xl">
            {t("hero.lead")}
          </p>
          <p className="text-base text-foreground/90 max-w-3xl leading-relaxed">
            {t("hero.sub")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
