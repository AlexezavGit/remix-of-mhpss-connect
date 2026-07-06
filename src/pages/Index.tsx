import HeroSection from "@/components/HeroSection";
import WhyExists from "@/components/WhyExists";
import HowItWorks from "@/components/HowItWorks";
import NarrativePillars from "@/components/NarrativePillars";
import ThreeDirections from "@/components/ThreeDirections";
import ImpactChain from "@/components/ImpactChain";
import ConnectionAxes from "@/components/ConnectionAxes";
import CostOfInaction from "@/components/CostOfInaction";
import RoiModels from "@/components/RoiModels";
import ProgramRollout from "@/components/ProgramRollout";
import Consortium from "@/components/Consortium";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <div className="min-h-screen">
    <HeroSection />
    <WhyExists />
    <HowItWorks />
    <NarrativePillars />
    <ThreeDirections />
    <ImpactChain />
    <ConnectionAxes />
    <CostOfInaction />
    <RoiModels />
    <ProgramRollout />
    <Consortium />
    <SiteFooter />
  </div>
);

export default Index;
