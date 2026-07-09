import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import QuestMap from "@/components/users/QuestMap";
import GoldenScenario from "@/components/GoldenScenario";
import ScoringMatrix from "@/components/ScoringMatrix";
import SiteFooter from "@/components/SiteFooter";
import { usePageSections } from "@/context/PageNavContext";

const audiences = [
  { tag: "tag-fintech", audience: "Банкіри та держава", title: "Payment Infrastructure", desc: "Платіжна інфраструктура для MHPSS: масштаб, регуляторна пісочниця, ROI." },
  { tag: "tag-digital", audience: "Гуманітарники та донори", title: "Digital Accountability", desc: "Digital tracking транзакцій + narrative autoreporting донору в реальному часі." },
  { tag: "tag-clinical", audience: "Клініцисти та практики", title: "Digital Practice", desc: "CRM, звітність, потік клієнтів і вихід з тіні через дегресивну ставку 7→3%." },
];

const UsersPage = () => {
  usePageSections([
    { id: "intro", label: "Огляд" },
    { id: "audiences", label: "Три аудиторії" },
    { id: "quest", label: "Квест-мапа" },
    { id: "scenario", label: "Beneficiary Journey" },
    { id: "scoring", label: "Scoring · Waterfall" },
    { id: "cabinets", label: "Кабінети" },
  ]);

  return (
    <div className="min-h-screen">
      <section id="intro" className="pt-16 pb-10 scroll-mt-32">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="tag-gold mb-3">Користувачам</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-5 tracking-tight text-foreground">
              Швидкий вхід до кабінетів
            </h1>
            <p className="text-lg text-secondary-foreground leading-relaxed">
              Три аудиторії — бенефіціар, фахівець, донор — рухаються паралельними треками по спільній
              цифровій шині. Оберіть ваш трек, побачте маршрут покроково і зайдіть у відповідний кабінет.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three audiences */}
      <section id="audiences" className="py-10 bg-transparent scroll-mt-32">
        <div className="section-container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Три аудиторії — одна інфраструктура
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {audiences.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-elevated p-6"
              >
                <span className={d.tag}>{d.audience}</span>
                <h3 className="font-display text-base font-semibold text-foreground mt-3 mb-2">
                  {d.title}
                </h3>
                <p className="text-sm text-secondary-foreground">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuestMap />

      <section id="scenario" className="scroll-mt-32">
        <GoldenScenario />
      </section>

      <section id="scoring" className="scroll-mt-32">
        <ScoringMatrix />
      </section>

      {/* Cabinets shortcut */}
      <section id="cabinets" className="py-16 scroll-mt-32">
        <div className="section-container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Прямий вхід у кабінети
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/users/beneficiary" className="card-elevated p-6 border border-accent/30 hover:border-accent transition-colors">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-2">01</div>
              <div className="font-display text-lg font-bold text-foreground mb-1">Бенефіціар</div>
              <p className="text-xs text-secondary-foreground">Діагностика, бот-триаж, доступ до сеансів і плану реабілітації.</p>
            </Link>
            <Link to="/users/provider" className="card-elevated p-6 border border-primary/30 hover:border-primary transition-colors">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-2">02</div>
              <div className="font-display text-lg font-bold text-foreground mb-1">Фахівець</div>
              <p className="text-xs text-secondary-foreground">Онбординг, підтвердження ліцензії, потік клієнтів, звіти.</p>
            </Link>
            <Link to="/users/donor" className="card-elevated p-6 border border-[hsl(var(--gold)/0.35)] hover:border-[hsl(var(--gold-bright))] transition-colors">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--gold-bright))] mb-2">03</div>
              <div className="font-display text-lg font-bold text-foreground mb-1">Донор / інвестор</div>
              <p className="text-xs text-secondary-foreground">Створення програми фінансування, ескроу, ESG-звіт.</p>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default UsersPage;
