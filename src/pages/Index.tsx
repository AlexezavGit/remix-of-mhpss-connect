import HeroSection from "@/components/HeroSection";
import WhyExists from "@/components/WhyExists";
import SystemProblems from "@/components/SystemProblems";
import HdpNexus from "@/components/HdpNexus";
import NarrativePillars from "@/components/NarrativePillars";
import ThreeDirections from "@/components/ThreeDirections";
import ImpactChain from "@/components/ImpactChain";
import SiteFooter from "@/components/SiteFooter";
import { usePageSections } from "@/context/PageNavContext";

const Index = () => {
  usePageSections([
    { id: "hero", label: "Огляд" },
    { id: "why", label: "Чому" },
    { id: "problems", label: "Діагностика" },
    { id: "nexus", label: "HDP Nexus" },
    { id: "pillars", label: "Стовпи" },
    { id: "directions", label: "Напрями" },
    { id: "impact", label: "Вплив" },
  ]);

  return (
    <div className="min-h-screen">
      <section id="hero" className="scroll-mt-32"><HeroSection /></section>
      <section id="why" className="scroll-mt-32"><WhyExists /></section>
      <SystemProblems />
      <HdpNexus />
      <section id="pillars" className="scroll-mt-32"><NarrativePillars /></section>
      <section id="directions" className="scroll-mt-32"><ThreeDirections /></section>
      <section id="impact" className="scroll-mt-32"><ImpactChain /></section>
      <SiteFooter />
    </div>
  );
};

export default Index;
