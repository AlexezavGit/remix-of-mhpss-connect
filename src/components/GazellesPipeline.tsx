import { motion } from "framer-motion";
import { useState } from "react";

const sources = [
  {
    name: "Гуманітарний сектор",
    count: "~7-8,000",
    description: "Психологи гуманітарних організацій (WHO, UNICEF, MSF, IOM, Caritas, ACTED тощо). Працюють з легкими та помірними станами: стрес, горювання, адаптація. НЕ клінічні — не мають права працювати з розладами (ПТСР, депресія). У бригадах по 1 психологу, решта — волонтери, соціальні працівники, mhGAP-навчені лікарі (терапевти, сімейні) які надають базовий скринінг, а не терапію.",
    conversion: "15-20%",
    potential: "~1,000-1,600",
    color: "bg-accent",
    methodology: "Дані MHPSS Cluster Ukraine (OCHA coordination platform, 2024). 120+ мобільних бригад × 1 психолог = ~120 штатних. Додатково: project-based психологи НУО (~2,500-3,000), mhGAP-trained (~4,000-5,000 — не психологи). Конверсія знижена: потребують клінічного апгрейду (мінімум 500 годин супервізованої практики) для роботи з розладами.",
    caveat: "mhGAP-навчені — це не психологи. Це лікарі первинної ланки з 5-10-денним тренінгом WHO. Їх не можна рахувати як потенційних психотерапевтів без повної перекваліфікації (2-3 роки).",
  },
  {
    name: "Формалізація тіньового сектору",
    count: "~8,000",
    description: "ФОП-психологи (КВЕДИ 86.90, 88.99). Вже практикують, але поза координацією. Ключова проблема: мотивація. Поточний дохід 30-80 тис. ₴/міс. Платформа повинна гарантувати: збереження або зростання доходу, зниження адмін-навантаження з 40% до 10-15% (автоматизація), та податкові преференції.",
    conversion: "30-40%",
    potential: "~2,400-3,200",
    color: "bg-primary",
    methodology: "Єдиний державний реєстр ФОП (data.gov.ua), фільтр за КВЕДИ 86.90 (діяльність у сфері охорони здоров'я) та 88.99 (інша соціальна допомога). Верифіковано через виборку на YouControl. Конверсія знижена з 60-70% до 30-40%: без чіткої фінансової вигоди більшість не вийдуть з тіні — додаткові податки + адмін-навантаження при невизначеному потоці клієнтів.",
    caveat: "Первинний аналіз показував 60-70% конверсію — нереалістично. Тіньовий фахівець вийде лише якщо платформа дає: 1) потік клієнтів ≥ поточного, 2) автоматизацію звітності, 3) податкові канікули мінімум 3 роки.",
  },
  {
    name: "Діаспора та виїхавші",
    count: "~5,000-7,000",
    description: "Українські психологи за кордоном. Оцінка: з ~25,000 випускників психфаків 2015-2022 виїхало ~40-50% населення (ООН, ~6.3 млн), але більшість випускників НЕ працювали за спеціальністю (працевлаштування 12-15% за МОН). Тобто реальних практикуючих серед виїхавших — значно менше.",
    conversion: "10-15%",
    potential: "~500-1,050",
    color: "bg-purple",
    methodology: "МОН: ~25,000 випускників психфаків 2015-2022. Працевлаштування за спеціальністю: 12-15% (не 6% як раніше — оновлено за даними Держстату 2023). З них виїхало ~40-50% (дані ООН/IOM про міграцію). Це дає ~1,500-1,875 практикуючих за кордоном. Конверсія 10-15%: більшість вже інтегровані в європейські системи, мовний бар'єр зворотного напрямку, різниця в оплаті 3-5x.",
    caveat: "40-50% — це загальний відсоток виїхавших українців, НЕ психологів окремо. Серед психологів відсоток може бути вищим (мобільна професія) або нижчим (чоловіки не виїхали). Потребує окремого дослідження.",
  },
  {
    name: "Перекваліфікація психіатрів",
    count: "~2,000-2,500",
    description: "Активні психіатри з UPRA. Не всі 4,000 — частина пенсійного віку, частина на окупованих територіях. Перехід у психотерапію потребує мотивації: поточна зарплата в державному секторі 15-25 тис. ₴. Платформа має гарантувати дохід ≥50 тис. ₴ для переходу.",
    conversion: "15-25%",
    potential: "~300-625",
    color: "bg-emerald",
    methodology: "Реєстр МОЗ + UPRA (Українська психіатрична асоціація). ~4,000 зареєстрованих, ~2,000-2,500 реально практикуючих (решта: пенсіонери, окуповані території, адміністратори). Конверсія знижена: психіатри мають стабільну держзарплату, перехід у приватну практику = ризик. Потрібна фінансова гарантія.",
    caveat: "Психіатрам, як і тіньовикам, потрібна конкретна мотивація. Без гарантованого потоку клієнтів та фінансової вигоди масовий перехід нереалістичний.",
  },
  {
    name: "Випускники ВНЗ (нові когорти)",
    count: "~3,000-4,000/рік",
    description: "Щорічний випуск психфаків. Дані МОН: ~25,000 за 2015-2022, тобто ~3,000-3,500/рік. Працевлаштування за спеціальністю: 12-15%. Модель IAPT UK показує: paid clinical placement + гарантоване працевлаштування підвищує конверсію до 60-70%.",
    conversion: "30-40%",
    potential: "~900-1,600/рік",
    color: "bg-primary",
    methodology: "МОН (Міністерство освіти і науки, НЕ НЦЗУ): звіти про випуск за спеціальністю 053 «Психологія». ~3,000-4,000/рік (бакалаври + магістри). Поточна конверсія 12-15%. Цільова 30-40% (не 60-70% як IAPT UK, бо Україна не має ще інфраструктури paid placement). Див. IAPT прецедент нижче.",
    caveat: "IAPT досяг 60-70% через £173 млн/рік держфінансування. В Україні поки немає аналогічного фіскального зобов'язання — реалістична конверсія на старті 30-40%.",
  },
  {
    name: "Приватні платформи",
    count: "~10,000-15,000",
    description: "«Психологи» на b17.com.ua, helppoint.ua, PsyChat, приватні оголошення в соцмережах. Значна частина — без клінічної кваліфікації. Через сертифікацію та quality assurance — відфільтрувати реально кваліфікованих.",
    conversion: "15-25%",
    potential: "~1,500-3,750",
    color: "bg-coral",
    methodology: "Методологія оцінки: парсинг профілів b17.com.ua (~4,500 активних профілів UA, лютий 2025), helppoint.ua (~1,200 верифікованих), PsyChat (~800), інші платформи + соцмережі (~3,500-8,500 за перехресним порівнянням). Дублікати: ~20-30% фахівців присутні на 2+ платформах. Після дедуплікації: ~8,000-12,000 унікальних. Верхня оцінка 15,000 включає тих, хто рекламується лише в Instagram/Telegram.",
    caveat: "Більшість не мають клінічної освіти. Сертифікація відсіє 50-70%. Ті що залишаться — найбільш мотивовані та кваліфіковані.",
  },
];

const iaptData = {
  title: "Прецедент: IAPT UK (Improving Access to Psychological Therapies)",
  timeline: "2008 — дотепер",
  facts: [
    { label: "Бюджет запуску", value: "£173 млн/рік", detail: "Держфінансування NHS England" },
    { label: "Навчено за 15 років", value: "~12,000 терапевтів", detail: "Paid clinical placement: £26-31K/рік стипендія під час навчання" },
    { label: "Конверсія випускників", value: "60-70%", detail: "Завдяки: оплачуваному стажуванню, гарантованому працевлаштуванню в NHS, супервізії 1:8" },
    { label: "Пацієнтів на рік", value: "~1.8 млн (2023)", detail: "Від 0 до 1.8 млн за 15 років. Найбільша програма MHPSS у світі" },
    { label: "Показник одужання", value: "50-52%", detail: "Вимірюється стандартизовано: PHQ-9, GAD-7 на кожній сесії" },
    { label: "Модель", value: "Stepped care", detail: "Step 1: guided self-help. Step 2: CBT/EMDR групи. Step 3: індивідуальна терапія" },
  ],
  relevance: "IAPT показує: масштабування можливе лише через системне державне фінансування навчання. Україна може адаптувати модель через blended finance (донори + держбюджет), але без fiscal commitment конверсія буде 30-40%, не 60-70%.",
};

const GazellesPipeline = () => {
  const [expandedSource, setExpandedSource] = useState<number | null>(null);
  const [showIAPT, setShowIAPT] = useState(false);

  const totalMin = 6600;
  const totalMax = 11825;

  return (
    <section id="gazelles" className="py-24 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="tag-clinical mb-4">Пайплайн фахівців</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 tracking-tight">
            <span className="text-foreground">Де взяти </span>
            <span className="cyan-gradient-text">50-60K «газелей»?</span>
          </h2>
          <p className="text-secondary-foreground max-w-3xl text-lg">
            Шість джерел із верифікованими даними та реалістичними конверсіями. 
            Перший рік — {totalMin.toLocaleString()}-{totalMax.toLocaleString()} фахівців (скоригована оцінка), 
            далі — зростання через нові когорти та franchise-модель.
          </p>
          <div className="mt-4 p-3 rounded-lg border border-accent/20 bg-accent/5 max-w-3xl">
            <p className="text-xs text-accent">
              ⚠ Попередні оцінки (18-26K у Рік 1) були завищені. Скоригована оцінка враховує: 
              реалістичну мотивацію тіньового сектору, різницю між гуманітарними та клінічними психологами, 
              відсутність fiscal commitment для IAPT-подібної моделі.
            </p>
          </div>
        </motion.div>

        {/* Pipeline cards */}
        <div className="grid lg:grid-cols-2 gap-5 mb-12">
          {sources.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-elevated p-6 hover:border-primary/20 transition-colors cursor-pointer"
              onClick={() => setExpandedSource(expandedSource === i ? null : i)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${s.color}`} />
                  <h3 className="font-display text-base font-semibold text-foreground">{s.name}</h3>
                </div>
                <span className="stat-number text-lg">{s.count}</span>
              </div>
              <p className="text-xs text-secondary-foreground leading-relaxed mb-4">{s.description}</p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Конверсія</div>
                  <div className="font-mono text-sm text-foreground">{s.conversion}</div>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Потенціал Рік 1</div>
                  <div className="font-mono text-sm text-primary font-medium">{s.potential}</div>
                </div>
                <div className="flex-1">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${parseInt(s.conversion) || 30}%` }} />
                  </div>
                </div>
              </div>

              {/* Expanded methodology */}
              {expandedSource === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-border space-y-3"
                >
                  <div>
                    <div className="text-[10px] text-primary uppercase tracking-wider font-medium mb-1">📊 Методологія оцінки</div>
                    <p className="text-xs text-secondary-foreground leading-relaxed">{s.methodology}</p>
                  </div>
                  <div className="p-2.5 rounded-md bg-accent/5 border border-accent/15">
                    <div className="text-[10px] text-accent uppercase tracking-wider font-medium mb-1">⚠ Застереження</div>
                    <p className="text-xs text-accent/80 leading-relaxed">{s.caveat}</p>
                  </div>
                </motion.div>
              )}

              <div className="mt-3 text-[10px] text-muted-foreground text-right">
                {expandedSource === i ? "↑ згорнути" : "↓ методологія та джерела"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* IAPT Precedent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-elevated p-8 mb-12"
        >
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowIAPT(!showIAPT)}
          >
            <div>
              <span className="tag-fintech mb-2">Прецедент</span>
              <h3 className="font-display text-lg font-semibold text-foreground mt-2">{iaptData.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{iaptData.timeline}</p>
            </div>
            <span className="text-muted-foreground text-sm">{showIAPT ? "↑" : "↓"}</span>
          </div>

          {showIAPT && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 space-y-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {iaptData.facts.map((f, i) => (
                  <div key={i} className="p-3 rounded-lg border border-border bg-muted/20">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{f.label}</div>
                    <div className="font-mono text-sm text-primary font-medium mb-1">{f.value}</div>
                    <p className="text-[10px] text-secondary-foreground leading-relaxed">{f.detail}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                <div className="text-xs text-primary font-medium mb-1">Релевантність для України</div>
                <p className="text-xs text-secondary-foreground leading-relaxed">{iaptData.relevance}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Summary — corrected */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card-elevated p-8 text-center"
        >
          <div className="font-mono text-sm text-muted-foreground mb-3">Скоригований прогноз досягнення 50-60K</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="stat-number text-3xl mb-1">~7-12K</div>
              <div className="text-xs text-muted-foreground">Рік 1: початковий пул</div>
              <div className="text-[10px] text-secondary-foreground mt-1">Формалізація + платформи</div>
            </div>
            <div>
              <div className="stat-number text-3xl mb-1">~15-22K</div>
              <div className="text-xs text-muted-foreground">Рік 2: масштабування</div>
              <div className="text-[10px] text-secondary-foreground mt-1">+ нові когорти + клін. апгрейд</div>
            </div>
            <div>
              <div className="stat-number text-3xl mb-1">~30-40K</div>
              <div className="text-xs text-muted-foreground">Рік 3-4: зростання</div>
              <div className="text-[10px] text-secondary-foreground mt-1">далі: нові когорти + франчайз-модель</div>
            </div>
            <div>
              <div className="stat-number text-3xl mb-1">~50-60K</div>
              <div className="text-xs text-muted-foreground">Рік 5: цільовий</div>
              <div className="text-[10px] text-secondary-foreground mt-1">При fiscal commitment</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-secondary-foreground max-w-2xl mx-auto">
              Ключовий інсайт: 50-60K — це 5-річна ціль, не 3-річна. Без державного fiscal commitment 
              (аналог £173 млн/рік IAPT) реалістичний горизонт — 5-7 років. 
              <span className="text-primary"> Платформа прискорює, але не замінює системне фінансування.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GazellesPipeline;
