import { Link } from "react-router-dom";
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
      <section id="overview" className="pt-40 pb-16" style={{ background: "var(--gradient-hero)" }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="tag-fintech mb-3">Рішення</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-4 tracking-tight cyan-gradient-text">
              Інфраструктура MHPSS-сектору
            </h1>
            <p className="text-lg text-secondary-foreground max-w-2xl">
              Три напрями — одна цифрова шина. Digital tracking, Payment Infrastructure та
              Sustainable Sector, що складаються в один шлях бенефіціара → клієнта → пацієнта.
            </p>
            <div className="flex gap-3 mt-6">
              <Link to="/demo" className="tag-fintech hover:bg-primary/20 transition-colors">Замовити демо →</Link>
              <Link to="/consortium" className="tag-gold hover:bg-[hsl(var(--gold)/0.2)] transition-colors">Долучитися до консорціуму</Link>
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
