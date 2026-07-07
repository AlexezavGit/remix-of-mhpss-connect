import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useT } from "@/i18n";
import SiteFooter from "@/components/SiteFooter";
import OutputFormats from "@/components/OutputFormats";
import { usePageSections } from "@/context/PageNavContext";
import openSociety from "@/assets/logos/open-society.png";
import enkidu from "@/assets/logos/enkidu.png";
import gehaClalit from "@/assets/logos/geha-clalit.png";
import knu from "@/assets/logos/knu.png";
import quoroom from "@/assets/logos/quoroom.png";
import uscViterbi from "@/assets/logos/usc-viterbi.png";

type PartnerRow = {
  logo: string;
  name: string;
  domain: string;
  responsibility: string;
  interest: string;
};

const partners: PartnerRow[] = [
  {
    logo: uscViterbi,
    name: "USC Viterbi · ICT",
    domain: "Immersive rehabilitation",
    responsibility: "Bravemind VR-експозиція, клінічний R&D",
    interest: "Валідація протоколів у бойовому контексті",
  },
  {
    logo: gehaClalit,
    name: "Geha MHC · Clalit Health",
    domain: "Clinical anchor",
    responsibility: "Клінічна супервізія, стандарти безпеки",
    interest: "Дослідницька база + експорт ізраїльської моделі",
  },
  {
    logo: knu,
    name: "KNU · Факультет психології",
    domain: "Talent pipeline",
    responsibility: "Кваліфікації, супервізія, продовжене навчання",
    interest: "50-60К пайплайн, академічний вплив",
  },
  {
    logo: openSociety,
    name: "Open Society",
    domain: "Civil society",
    responsibility: "Права та етика, community outreach",
    interest: "Прозорість гуманітарних потоків",
  },
  {
    logo: enkidu,
    name: "Enkidu",
    domain: "Digital identity",
    responsibility: "Анонімізовані ID, deperson. реєстр",
    interest: "Приватність за замовчуванням у чутливих даних",
  },
  {
    logo: quoroom,
    name: "Quoroom",
    domain: "Capital rails",
    responsibility: "Інвесторський стек, SPV/escrow оркестрація",
    interest: "Пілот KPI-based funding у секторі",
  },
];

const benefits = [
  { n: "01", t: "Доступ до даних сектору", b: "Реальний час, деперсоніфіковано, з правом write-back для валідованих контрибʼюторів." },
  { n: "02", t: "Платіжні рейки як утиліта", b: "Дегресивна ставка 7→3%. Escrow + Triple Verification Oracle без окремої розробки." },
  { n: "03", t: "Участь у Scoring Matrix", b: "Вплив на ваги KPI під ваш use-case. Голос у розподілі $2.5-4.5B горизонту 2025-2027." },
  { n: "04", t: "Co-branding без captur", b: "Партнер лишається власником своєї частки IP і клієнтської бази. Консорціум не пилососить." },
];

const ConsortiumPage = () => {
  const { t } = useT();
  usePageSections([
    { id: "manifest", label: "Маніфест" },
    { id: "partners", label: "Партнери" },
    { id: "benefits", label: "Аргумент приєднання" },
    { id: "outputs", label: "Деліверейбли" },
    { id: "join", label: "Долучитися" },
  ]);

  return (
    <div className="min-h-screen">
      {/* Manifest */}
      <section id="manifest" className="pt-40 pb-16 scroll-mt-32" style={{ background: "var(--gradient-hero)" }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="tag-gold mb-3">Консорціум · Open coalition</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-5 tracking-tight text-foreground">
              {t("cons.what.title") || "Що стоїть за Feel Again"}
            </h1>
            <p className="text-lg text-secondary-foreground leading-relaxed mb-3">
              {t("cons.what.lead") ||
                "Feel Again — це компетенційна коаліція клінічних, академічних, гуманітарних і фінансових організацій. Ми не наймаємо провайдерів і не володіємо клінічним потоком. Ми будуємо утиліту, яку розділяємо на рівних правах."}
            </p>
            <p className="text-sm text-secondary-foreground/80 max-w-2xl">
              Консорціум — відкритий. Приєднання можливе для організацій, що приносять компетенцію,
              дані або регуляторний доступ, і поділяють принцип «відкритої утиліти, а не платформи-монополіста».
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners matrix */}
      <section id="partners" className="py-16 bg-transparent scroll-mt-32">
        <div className="section-container">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Хто в консорціумі</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
              {partners.length} партнерів · оновлено 07.2026
            </span>
          </div>

          <div className="card-elevated overflow-hidden">
            <div className="hidden md:grid grid-cols-[minmax(180px,1.2fr)_minmax(140px,1fr)_minmax(220px,1.6fr)_minmax(200px,1.4fr)] gap-4 px-5 py-3 border-b border-border/60 font-mono text-[9.5px] uppercase tracking-[0.22em] text-foreground/50">
              <div>Партнер</div>
              <div>Домен</div>
              <div>Зона відповідальності</div>
              <div>Інтерес</div>
            </div>
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-1 md:grid-cols-[minmax(180px,1.2fr)_minmax(140px,1fr)_minmax(220px,1.6fr)_minmax(200px,1.4fr)] gap-4 px-5 py-5 border-b border-border/30 last:border-0 hover:bg-[hsl(var(--gold-bright)/0.03)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img src={p.logo} alt={p.name} loading="lazy" className="h-8 w-auto object-contain opacity-90" />
                  <div className="font-display text-sm font-bold text-foreground">{p.name}</div>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-[hsl(var(--gold-bright))]">
                  {p.domain}
                </div>
                <div className="text-sm text-secondary-foreground">{p.responsibility}</div>
                <div className="text-sm text-foreground/80">{p.interest}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / why join */}
      <section id="benefits" className="py-16 bg-transparent scroll-mt-32">
        <div className="section-container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Чому долучатися
          </h2>
          <p className="text-sm text-secondary-foreground mb-8 max-w-2xl">
            Консорціум відкритий і не володіє IP учасників. Ви приносите компетенцію — ви отримуєте
            інфраструктуру, дані сектору і місце в архітектурі рішень.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b.n} className="card-elevated p-6 border border-[hsl(var(--gold)/0.25)]">
                <div className="font-mono text-xs text-[hsl(var(--gold-bright))] mb-2">{b.n}</div>
                <div className="font-display text-lg font-bold text-foreground mb-2">{b.t}</div>
                <p className="text-sm text-secondary-foreground leading-relaxed">{b.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="py-20 bg-transparent scroll-mt-32">
        <div className="section-container text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[hsl(var(--gold)/0.35)] bg-[hsl(var(--gold)/0.08)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--gold-bright))] animate-pulse" />
            <span className="text-sm text-[hsl(var(--gold-bright))] font-medium">Open coalition · rolling applications</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Долучитися до консорціуму
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/demo" className="tag-fintech hover:bg-primary/20 transition-colors">
              Запит на розмову →
            </Link>
            <Link to="/solutions" className="tag-gold hover:bg-[hsl(var(--gold)/0.2)] transition-colors">
              Подивитися рішення
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ConsortiumPage;
