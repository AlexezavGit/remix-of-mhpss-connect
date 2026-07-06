import { motion } from "framer-motion";

const gaps = [
  {
    number: "01",
    title: "Імітація спроможності",
    subtitle: "Workforce Gap",
    description: "Масштабне навчання (117K mhGAP сертифікатів) не конвертується у практику. 700 навчено з супервізією — 42 практикують. KPI системи налаштований на процес (сертифікати), а не результат (зниження симптомів).",
    fix: "Платити за фактично надані послуги (capitation rate), а не за наявність сертифіката.",
    metric: "117K → 42",
    metricLabel: "сертифікатів → практикуючих",
  },
  {
    number: "02",
    title: "Бюджетна інверсія",
    subtitle: "Economic Gap",
    description: "82-85% бюджету на стаціонари, тоді як 71% пацієнтів потребують амбулаторної допомоги. Інерція радянської моделі. Навіть після реформи 2017 деінституціоналізація реверсується під тиском війни.",
    fix: "Жорсткий механізм «гроші ходять за пацієнтом» — перенаправлення 40% на мобільні команди.",
    metric: "82-85%",
    metricLabel: "витрат на інфраструктуру, не допомогу",
  },
  {
    number: "03",
    title: "Математична прірва покриття",
    subtitle: "Prevalence / Access Gap",
    description: "9.6 млн потребують допомоги (22% населення), розрив у лікуванні 74%. 1.3 психолога/100 тис. проти 2.7 в ЄС. Приватна практика (5-8 тис. ФОП) надає ~5 млн годин/рік — поза координацією.",
    fix: "Ступенева модель допомоги (Stepped Care) + легалізація немедичного супроводу як першої лінії.",
    metric: "9.6M",
    metricLabel: "потребують допомоги, 74% gap",
  },
  {
    number: "04",
    title: "Тіньовий приватний сектор",
    subtitle: "Shadow Economy Gap",
    description: "~8 000 зареєстрованих ФОП-психологів поза координацією. Не підключені до розподілу ресурсів, не обліковані у системах. Ще тисячі без реєстрації.",
    fix: "Формалізація через API-інтеграцію, податкові преференції на 5 років, вихід з тіні через pull-incentive.",
    metric: "~8K",
    metricLabel: "ФОП поза системою координації",
  },
  {
    number: "05",
    title: "Цифровий хаос",
    subtitle: "Integration Gap",
    description: "8-24 системи дублюються. 30-40% часу на адміністрування. Жодна не обліковує погодинне навантаження, не є CRM, не зчеплює глобальний і локальний рівні.",
    fix: "API-first middleware: HL7 FHIR інтеграція eHealth + гуманітарних систем без заміни існуючих.",
    metric: "30-40%",
    metricLabel: "часу фахівця на адміністрування",
  },
  {
    number: "06",
    title: "Гуманітарний ресет",
    subtitle: "Accountability Gap",
    description: "Grand Bargain не подолав інструментальну розірваність. $2B якірна інвестиція — але витратити підзвітно окрема задача. $177M через Health Cluster — 0% відстеження клінічних результатів.",
    fix: "Per-transaction tracking з narrative autoreporting — донор бачить outcome кожної послуги.",
    metric: "$177M",
    metricLabel: "інвестовано — 0% відстеження результатів",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="tag-regulatory mb-4">Діагностика</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Системні <span className="gold-gradient-text">прогалини</span>
          </h2>
          <p className="text-secondary-foreground max-w-3xl text-lg">
            Шість критичних GAPs на стику гуманітарного реагування, клінічної практики та економічного розвитку. 
            Парадокс → Рішення.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gaps.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-elevated p-6 group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs text-muted-foreground">GAP {g.number}</span>
                <span className="text-[10px] text-primary uppercase tracking-wider">{g.subtitle}</span>
              </div>
              <div className="stat-number text-3xl mb-1">{g.metric}</div>
              <div className="text-xs text-muted-foreground mb-4">{g.metricLabel}</div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{g.title}</h3>
              <p className="text-sm text-secondary-foreground leading-relaxed mb-4">{g.description}</p>
              <div className="pt-3 border-t border-border">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 shrink-0">→</span>
                  <p className="text-xs text-primary font-medium">{g.fix}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Source note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-4 rounded-lg border border-border bg-muted/30"
        >
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground font-medium">Canonical:</span> «До реформи 2017 р. 89% бюджету MH на стаціонар. 
            Реформа скоротила ~50%, але деінституціоналізація незавершена. 82-85% витрат досі на інфраструктуру. 
            71% потребують амбулаторної допомоги.» — Lancet, CSIS, WHO
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
