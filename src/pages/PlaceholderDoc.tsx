import { Link, useParams } from "react-router-dom";
import SiteFooter from "@/components/SiteFooter";

const TITLES: Record<string, string> = {
  "pitch-deck": "Презентація для інвесторів",
  "donor-proposal": "Пропозиція для донора",
  "policy-brief": "Аналітична записка для КМУ",
  "strategy-map": "Стратегічна карта",
};

/** Placeholder page for documents whose text will be published later. */
const PlaceholderDoc = ({ kind }: { kind: "offer" | "doc" }) => {
  const { slug = "" } = useParams();
  const title = kind === "offer" ? "Відкрита оферта імплементаційного партнера" : TITLES[slug] ?? "Документ";
  const back = kind === "offer" ? { to: "/consortium", label: "← До сторінки «Партнерам»" } : { to: "/solutions", label: "← До сторінки «Рішення»" };
  return (
    <div className="min-h-screen">
      <section className="section-container pt-16 pb-24 max-w-3xl">
        <span className="tag-gold mb-3">Документ готується</span>
        <h1 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-5 text-foreground tracking-tight">{title}</h1>
        <p className="text-lg text-secondary-foreground mb-8">Текст документа буде розміщено на цій сторінці найближчим часом.</p>
        <div className="flex flex-wrap gap-3">
          <Link to={back.to} className="tag-fintech hover:bg-primary/20 transition-colors">{back.label}</Link>
          {kind === "offer" && <Link to="/demo" className="tag-gold">Замовити демо →</Link>}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default PlaceholderDoc;
