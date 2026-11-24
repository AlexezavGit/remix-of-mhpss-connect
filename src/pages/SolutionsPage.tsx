import { motion } from "framer-motion";
import HowItWorks from "@/components/HowItWorks";
import ThreeDirections from "@/components/ThreeDirections";
import ConnectionAxes from "@/components/ConnectionAxes";
import LayerArchitecture from "@/components/LayerArchitecture";
import TheoryOfChange from "@/components/TheoryOfChange";
import ImpactFeasibilityMatrix from "@/components/ImpactFeasibilityMatrix";
import SiteFooter from "@/components/SiteFooter";
import { usePageSections } from "@/context/PageNavContext";

const SolutionsPage = () => {
  usePageSections([
    { id: "overview", label: "Огляд" },
    { id: "how", label: "Як працює" },
    { id: "toc", label: "Теорія змін" },
    { id: "architecture", label: "Архітектура" },
    { id: "directions", label: "Напрями" },
    { id: "prioritization", label: "Пріоритизація" },
    { id: "axes", label: "Осі зв'язку" },
  ]);

  return (
    <div className="min-h-screen">
      <section id="overview" className="pt-10 md:pt-14 pb-10 md:pb-14">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="tag-fintech mb-3">Резюме · Рішення</span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mt-4 mb-4 tracking-tight cyan-gradient-text">
              Інфраструктура MHPSS-сектору
            </h1>
            <p className="text-base md:text-lg text-secondary-foreground max-w-2xl leading-relaxed">
              Нейтральна утиліта для держави, гуманітарних донорів і приватної практики: спільна
              цифрова шина та платіжні рейки з виплатою за результатом.
            </p>
          </motion.div>

          {/* McKinsey-style cards: Проблема → Інсайт → Рішення → Ефект */}
          <div className="mt-8 md:mt-12 grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                k: "Проблема",
                t: "Сектор фрагментований",
                d: "3,9 млн українців потребують MHPSS. Державний, гуманітарний і приватний контури працюють без спільного цифрового шару. Менше 1,5% глобальних гуманітарних бюджетів доходить до надавача.",
                tone: "coral",
              },
              {
                n: "02",
                k: "Інсайт",
                t: "Розрив закриває не платформа",
                d: "Потрібна нейтральна утиліта — цифрова шина плюс платіжні рейки з ескроу за результатом. Це переводить сектор із процесних грантів у капітал, привʼязаний до результату.",
                tone: "gold",
              },
              {
                n: "03",
                k: "Рішення",
                t: "Три напрями — один продукт",
                d: "Цифрова підзвітність (деперсоніфікований реєстр), платіжна інфраструктура (ескроу, потрійна верифікація, дегресивна ставка 7→3%) і стала приватна практика (пайплайн 50–60 тис. фахівців, ринок 2,5–4,5 млрд $).",
                tone: "primary",
              },
              {
                n: "04",
                k: "Ефект",
                t: "Замкнене коло підзвітності",
                d: "Локалізація понад 25% з першого дня, ROI програми 1→4,5× за 5 років, прозорий шлях від донора до впливу на ВВП.",
                tone: "emerald",
              },
            ].map((s, i) => {
              const toneMap: Record<string, string> = {
                coral: "text-[hsl(var(--coral))] border-[hsl(var(--coral))]/30",
                gold: "text-[hsl(var(--gold-bright))] border-[hsl(var(--gold-bright))]/30",
                primary: "text-primary border-primary/30",
                emerald: "text-emerald border-emerald/30",
              };
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`card-elevated p-5 md:p-6 border-l-2 ${toneMap[s.tone]}`}
                >
                  <div className="mb-3">
                    <span className={`font-mono text-[10px] tracking-[0.22em] uppercase ${toneMap[s.tone].split(" ")[0]}`}>
                      {s.n} · {s.k}
                    </span>
                  </div>
                  <div className="font-display text-base md:text-lg font-bold text-foreground mb-2 leading-snug">
                    {s.t}
                  </div>
                  <p className="text-sm text-secondary-foreground leading-relaxed">{s.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-32">
        <HowItWorks />
      </section>

      <section id="toc" className="scroll-mt-32">
        <TheoryOfChange />
      </section>

      <section id="architecture" className="scroll-mt-32">
        <LayerArchitecture />
      </section>

      <section id="directions" className="scroll-mt-32">
        <ThreeDirections />
      </section>

      <ImpactFeasibilityMatrix />

      <section id="axes" className="scroll-mt-32">
        <ConnectionAxes />
      </section>

      <SiteFooter />
    </div>
  );
};

export default SolutionsPage;
