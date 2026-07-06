import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GoldenScenario from "@/components/GoldenScenario";
import ScoringMatrix from "@/components/ScoringMatrix";

const stats = [
  { value: "9.6M", label: "потребують допомоги" },
  { value: "117K", label: "сертифікатів → 42 практикуючих" },
  { value: "82-85%", label: "бюджету на стіни, не людей" },
  { value: "$4:$1", label: "WHO ROI на MH інвестиції" },
  { value: "7→3%", label: "fee замість 30%+ overhead" },
  { value: "50-60K", label: "«газелей» — ціль Рік 3" },
];

const PagerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="section-container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-display font-bold text-sm text-foreground">FEEL AGAIN</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Стратегія</Link>
            <span className="text-xs text-primary font-medium px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">Pager</span>
            <Link to="/report" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Report</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "var(--gradient-hero)" }}>
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="tag-fintech mb-4">Investor One-Pager</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 tracking-tight">
              <span className="cyan-gradient-text">FEEL AGAIN</span>
            </h1>
            <p className="text-xl text-foreground font-medium mb-2">Payment Infrastructure for the MHPSS Sector</p>
            <p className="text-base text-secondary-foreground max-w-2xl mx-auto">
              Програма, що трансформує гуманітарне реагування на сталий розвиток. 
              Visa для гуманітарного сектору. Вартість для держави — нуль.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key stats grid */}
      <section className="py-12 bg-transparent">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card-elevated p-5 text-center"
              >
                <div className="stat-number text-2xl mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Descriptors */}
      <section className="py-12 bg-transparent">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Три аудиторії — одна інфраструктура</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { tag: "tag-fintech", audience: "Банкіри та держава", title: "Payment Infrastructure", desc: "Платіжна інфраструктура для MHPSS. Масштаб і модель." },
              { tag: "tag-digital", audience: "Гуманітарники та донори", title: "Digital Accountability Infrastructure", desc: "Digital tracking транзакцій + narrative autoreporting." },
              { tag: "tag-clinical", audience: "Клініцисти та практики", title: "Digital Practice Infrastructure", desc: "CRM, звітність, потік клієнтів, вихід з тіні." },
            ].map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated p-6"
              >
                <span className={d.tag}>{d.audience}</span>
                <h3 className="font-display text-base font-semibold text-foreground mt-3 mb-2">{d.title}</h3>
                <p className="text-sm text-secondary-foreground">{d.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
            <p className="text-sm text-primary font-medium">
              Одна назва — <span className="font-bold">Payment Infrastructure</span>. 
              Ніхто інший не будує платіжні рейки для сектору.
            </p>
          </div>
        </div>
      </section>

      {/* Golden Scenario */}
      <GoldenScenario />

      {/* Scoring Matrix */}
      <ScoringMatrix />

      {/* The Ask */}
      <section className="py-16 bg-transparent">
        <div className="section-container text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary/20 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">THE ASK: Influence, Not Funding</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { org: "USAID", role: "Alignment signal" },
              { org: "MoH & MinEcon", role: "Regulatory sandbox" },
              { org: "EBRD Banking", role: "Charter compliance" },
              { org: "Pull, Not Push", role: "De-shadowing incentive" },
            ].map((ask) => (
              <div key={ask.org} className="p-3 rounded-lg bg-card border border-border text-center">
                <div className="font-mono text-xs text-primary font-bold mb-1">{ask.org}</div>
                <div className="text-[11px] text-muted-foreground">{ask.role}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Стратегія</Link>
            <Link to="/report" className="text-sm text-primary hover:underline">Повний звіт →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PagerPage;
