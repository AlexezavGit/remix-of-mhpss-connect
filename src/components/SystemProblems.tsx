import { motion } from "framer-motion";

const problems = [
  {
    n: "01",
    stat: "2.5%",
    statLabel: "бюджету МОЗ на диспансери",
    title: "Стик компетенцій МОЗ × МінЕконом",
    body: "Відсутні показники впливу ментального здоров'я на економіку. Жодна інституція не створює умови для «стада газелей».",
    tone: "coral",
  },
  {
    n: "02",
    stat: "~8K",
    statLabel: "ФОП без координації",
    title: "Тіньовий приватний сектор",
    body: "~8 000 ФОП-психологів поза координацією. 30–40% часу на адміністрування після «цифровізації». Жодна система не є CRM для практики.",
    tone: "gold",
  },
  {
    n: "03",
    stat: "6%",
    statLabel: "конверсія навчання → практика",
    title: "Провал конверсії навчання",
    body: "700 навчено з клінічною супервізією → 42 практикують (6%). 117 000 «сертифіковано» mhGAP — лише 1 000 точок підписали пакет НСЗУ.",
    tone: "coral",
  },
  {
    n: "04",
    stat: "89%",
    statLabel: "ресурсів у диспансери",
    title: "89% ресурсів — у стіни",
    body: "Гуманітарне реагування надало 3.9M бенефіціарів, але ресурси течуть у застарілу інфраструктуру. Депресія (2.5% довоєнна) не лікувалась і до війни.",
    tone: "coral",
  },
];

const toneClass = (t: string) =>
  t === "coral"
    ? "text-[hsl(var(--coral))]"
    : t === "gold"
      ? "text-[hsl(var(--gold-bright))]"
      : "text-foreground";

const SystemProblems = () => (
  <section id="problems" className="py-20 bg-transparent scroll-mt-32">
    <div className="section-container">
      <div className="max-w-3xl mb-10">
        <span className="tag-fintech mb-3">Діагностика</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
          Системні проблеми
        </h2>
        <p className="text-secondary-foreground text-lg">
          Четвертий вимір кризи: стик компетенцій між регулюванням, гуманітарним реагуванням та ринковим розвитком.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {problems.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="card-elevated p-6 relative overflow-hidden"
          >
            <div className="font-mono text-[10px] text-foreground/45 mb-2">{p.n}</div>
            <div className="flex items-baseline gap-4 mb-4">
              <div className={`font-display font-bold text-5xl leading-none ${toneClass(p.tone)}`}>
                {p.stat}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55 max-w-[10rem]">
                {p.statLabel}
              </div>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-secondary-foreground leading-relaxed">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SystemProblems;
