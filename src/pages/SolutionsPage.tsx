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
    { id: "toc", label: "Theory of Change" },
    { id: "architecture", label: "Архітектура" },
    { id: "directions", label: "Напрями" },
    { id: "prioritization", label: "Пріоритизація" },
    { id: "axes", label: "Осі зв'язку" },
  ]);

  return (
    <div className="min-h-screen">
      <section id="overview" className="pt-16 pb-14">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="tag-fintech mb-3">Executive summary · Рішення</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-5 tracking-tight cyan-gradient-text">
              Інфраструктура MHPSS-сектору
            </h1>

            <div className="space-y-4 max-w-2xl text-secondary-foreground leading-relaxed">
              <p className="text-lg">
                <span className="font-semibold text-foreground">Постановка проблеми.</span>{" "}
                3.9 млн українців потребують спеціалізованої MHPSS-допомоги; сектор фрагментований на
                державний, гуманітарний та приватний контури без спільного цифрового шару, а
                &lt;1.5% глобальних гуманітарних бюджетів локалізується на рівень надавача.
              </p>
              <p>
                <span className="font-semibold text-foreground">Головний висновок.</span>{" "}
                Розрив закриває не ще одна платформа, а нейтральна утиліта — цифрова шина плюс
                платіжні рейки з ескроу за результатом. Це переводить сектор з режиму
                <em> процесних грантів </em> у режим <em> outcome-linked capital </em>, знижуючи
                вартість капіталу для донора і час виходу для надавача.
              </p>
              <p>
                <span className="font-semibold text-foreground">Що ми пропонуємо.</span>{" "}
                Три напрями, які працюють як один продукт: <em>Digital tracking</em> (спільний
                датасет, деперсоніфікований реєстр), <em>Payment infrastructure</em> (escrow, Triple
                Verification Oracle, дегресивна ставка 7→3%) і <em>Sustainable sector</em>
                {" "}(пайплайн 50–60К фахівців, ринок 2.5–4.5 млрд $).
              </p>
              <p>
                <span className="font-semibold text-foreground">Очікуваний ефект.</span>{" "}
                Локалізація &gt;25% з першого дня, ROI програми 1→4.5× за 5 років, замикання цифрового
                кола підзвітності від донора до ВВП.
              </p>
            </div>
          </motion.div>
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
