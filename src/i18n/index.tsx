import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "ua" | "en";

type Dict = Record<string, string>;

const ua: Dict = {
  "nav.why": "Чому існує",
  "nav.how": "Як влаштована",
  "nav.directions": "Напрями",
  "nav.impact": "На що впливає",
  "nav.deploy": "Розгортання",
  "nav.consortium": "Консорціум",
  "nav.dashboard": "Дашборд ↗",
  "nav.digital": "Цифровізація",
  "nav.finance": "Фінансування",
  "nav.sust": "Сталий розвиток",

  "hero.kicker": "Цифрове плече для сектору MHPSS",
  "hero.title.a": "Від гуманітарного виклику —",
  "hero.title.b": "до сталого розвитку",
  "hero.lead":
    "Feel Again — це інфраструктура, що масштабує ініціативи MHPSS-сектору через конвергенцію технологій. Один шлях бенефіціара — клієнта — пацієнта, від першого звернення до повернення в ефективну економіку.",
  "hero.sub":
    "Програма не наймає фахівців і не надає послуги. Вона робить діяльність сектору помітною, координованою та такою, що впливає на ВВП.",

  "why.title": "Чому програма існує",
  "why.lead":
    "Сектор стоїть на стику гуманітарного реагування, клінічної практики й сталого розвитку. Конвергенція технологій робить можливою те, що раніше виконувалось вручну й уривками.",

  "how.title": "Як влаштована програма",
  "how.lead":
    "Стратегічні стовпи, операційна рамка та цифрова шина між гуманітарними і державними системами.",

  "dir.title": "Три напрями програми",
  "dir.lead":
    "Сайт = рішення. Дашборд = діагностика. Кожен напрям — окрема сторінка з проєктами запуску.",
  "dir.digital.title": "Цифровізація",
  "dir.digital.desc":
    "Цифрове технологічне плече для сектору надання психологічних послуг. Шари: охоплення → операції → дистрибуція ресурсів → координація.",
  "dir.finance.title": "Фінансування",
  "dir.finance.desc":
    "Цифрові рейки для змішаного фінансування: зворотній водоспад від найближчого оточення до глобальних донорів. Scoring Matrix і смарт-контракти.",
  "dir.sust.title": "Сталий розвиток",
  "dir.sust.desc":
    "Трансформація гуманітарних бюджетів у ресурси сталого розвитку. Місткість сектору, клінічна досконалість, центр експертизи.",
  "dir.cta": "Перейти в напрям →",

  // Theory of change — per direction
  "impact.title": "На що впливає програма",
  "impact.lead":
    "Теорія змін за трьома напрямами програми: що саме змінюється на ринку MHPSS, коли працюють цифровізація, фінансування та сталий розвиток разом.",
  "impact.outcome": "Зміна на ринку",
  "impact.digital.title": "Від фрагментованих сервісів — до єдиної шини",
  "impact.digital.s1": "Розрізнені провайдери, реєстри й канали виходять у спільне цифрове середовище без втрати власності даних.",
  "impact.digital.s2": "Кожне звернення → верифікована сесія → стандартизоване оцінювання (PCL-5/PHQ-9/GAD-7) у єдиному ID-просторі.",
  "impact.digital.s3": "Гуманітарні та державні системи (ESOZ, реєстри МСП) обмінюються даними через шину без дублювання обліку.",
  "impact.digital.out":
    "Ринок отримує єдиний шлях бенефіціара та реальне покриття замість декларативного.",
  "impact.finance.title": "Від грантів навздогін — до водоспаду на результат",
  "impact.finance.s1": "Кошти заходять знизу-вгору: громада → бізнес → держава → донор; кожен рівень бачить, що профінансував.",
  "impact.finance.s2": "Scoring Matrix і смарт-контракти перетворюють KPI в автоматизовані виплати з дегресивною ставкою 7→3%.",
  "impact.finance.s3": "NBU Regulatory Sandbox робить SIB, escrow і MHI-collateral операційними інструментами, а не презентаціями.",
  "impact.finance.out":
    "Ринок переходить з логіки витрат на логіку інвестицій з вимірюваним поверненням.",
  "impact.sust.title": "Від гуманітарного бюджету — до галузі сталого розвитку",
  "impact.sust.s1": "Виведення приватної практики з тіні через економічні умови та відсутність штрафу формалізації.",
  "impact.sust.s2": "Пайплайн 50–60 тис. фахівців: університети, діаспора-супервізія, повернення спеціалістів.",
  "impact.sust.s3": "Центр експертизи Ukraine MHPSS — клінічна досконалість як експортний продукт.",
  "impact.sust.out":
    "Сектор стає частиною ВВП і ринку праці, а не статтею гуманітарних видатків.",

  // Axes — result-oriented
  "axes.title": "Осі з'єднання",
  "axes.lead":
    "П'ять осей, по яких програма зшиває ринок MHPSS. У кожної — конкретний вимірюваний результат, а не лише назва.",
  "axes.result": "Результат",
  "axes.1.t": "Ресурси",
  "axes.1.b": "Змішане співфінансування з повною прозорістю від найближчого оточення до глобального донора.",
  "axes.1.r": "Один долар витрат бачать усі рівні фінансування одночасно.",
  "axes.2.t": "Координація",
  "axes.2.b": "Глобальні й локальні ланки гуманітарного реагування + приватна практика + клінічна допомога під єдиними стандартами.",
  "axes.2.r": "Бенефіціар не потрапляє двічі в один і той самий маршрут допомоги.",
  "axes.3.t": "Вихід практики з тіні",
  "axes.3.b": "Економічні умови, цифрові інструменти, договірний шар — без штрафу формалізації для фахівця.",
  "axes.3.r": "+30–40% офіційно зайнятих психотерапевтів за два роки пілоту.",
  "axes.4.t": "Потоки даних",
  "axes.4.b": "Між гуманітарними та державними реєстрами — через цифрову шину Feel Again без дублювання обліку.",
  "axes.4.r": "Час від звернення до запису у державний реєстр < 24 год.",
  "axes.5.t": "Дані в єдиному наборі",
  "axes.5.b": "Деперсоніфікований реєстр з відстеженням впливу ментального добробуту на ВВП.",
  "axes.5.r": "MHEI індекс на рівні області — щоквартально, відкрито.",

  "deploy.title": "Розгортання програми",
  "deploy.lead":
    "Запуск у пісочниці регулятора, регіональне змагання за індексом MHEI, секторальне покриття від фінансового сектору.",

  "cost.title": "Ціна бездіяльності",
  "cost.lead":
    "Втрачені роки життя й продуктивності, не повернені до економіки бенефіціари, відсутність обліку — все це переноситься на ВВП.",

  "roi.title": "Моделі ROI: WHO, World Bank, LSE",
  "roi.lead":
    "Дані з дашборду. На кожний $1 інвестицій у психічне здоров'я WHO декларує повернення до $4-5 у продуктивності.",

  // Consortium — WHAT vs WHO
  "cons.what.title": "Що стоїть за програмою",
  "cons.what.lead":
    "Унікальний перетин компетенцій, сформований війною. Стек, що поєднує регульований fintech, клінічну досконалість і гуманітарний ресет з епіцентру кризи.",
  "cons.what.1.t": "FinTech під регуляторним наглядом",
  "cons.what.1.b": "Цифрові фінансові технології, створені та працюючі під наглядом британських і швейцарських регуляторів.",
  "cons.what.2.t": "Клінічна досконалість",
  "cons.what.2.b": "Джерела добрих практик: EMDR (золотий стандарт WHO), VR Bravemind (USC ICT), IAPT-адаптація.",
  "cons.what.3.t": "Гуманітарний ресет з епіцентру кризи",
  "cons.what.3.b": "Локалізація знизу-вгору — не через посередників. Принципи Grand Bargain від першого дня.",

  "cons.who.title": "Хто стоїть за програмою",
  "cons.who.lead":
    "Консорціум партнерів: університетські центри клінічної досконалості, медичні системи, технологічні платформи та інституції громадянського суспільства.",

  "footer.dashboard": "Дашборд",
  "footer.brief": "Аналітика «Ідеальний шторм»",
  "footer.share": "Поширити",
  "footer.proposal": "Підготувати пропозицію (AI, скоро)",

  "pillars.title": "Стратегічні стовпи Feel Again",
  "pillars.1.t": "Рейки, не потяги",
  "pillars.1.b":
    "Feel Again не наймає фахівців і не надає послуги. Програма робить діяльність сектору помітною, координованою і такою, що впливає на ВВП.",
  "pillars.2.t": "Перевірені дані, не обіцянки",
  "pillars.2.b":
    "Triple Verification Oracle підтверджує сесії, оцінювання за PCL-5/PHQ-9/GAD-7 — на кожному етапі. Tamper-evident audit-ledger замість декларативних звітів.",
  "pillars.3.t": "Доповнення, не конкуренція",
  "pillars.3.b":
    "Whole-of-government підхід. Безконкурентне цифрове середовище без лімітів за кількістю учасників — обслуговує весь сектор та його стейкхолдерів.",

  // Ring Hub
  "hub.kicker": "Єдина навігація екосистеми",
  "hub.title": "Кільце результатів — як виплати залежать від клінічного підтвердження",
  "hub.lead":
    "Три шляхи (донор, провайдер, бенефіціар) сходяться на ядрі перевірки результату. Кожна виплата прив'язана до підтвердженої клінічної динаміки за стандартами FHIR R4, W3C VC та ISO 20022.",
  "hub.viewToggle": "Режим перегляду",
  "hub.view.donor": "Donor View",
  "hub.view.architect": "Architect View",
  "hub.core.kicker": "Ядро",
  "hub.core.title": "Outcome Verification",
  "hub.core.note": "ЄСОЗ-сумісні шкали · TBD",
  "hub.pathway.donor": "Шлях донора",
  "hub.pathway.provider": "Шлях провайдера",
  "hub.pathway.beneficiary": "Шлях бенефіціара",
  "hub.confidence": "Гарантія прозорості",
  "hub.confidence.note":
    "98% виплат прив'язані до клінічно підтвердженого результату. Повний audit trail у дашборді.",

  // Copper Ring (global nav)
  "ring.aria": "Навігація екосистеми Feel Again",
  "ring.leaving": "Ви залишаєте поточний ресурс",
  "ring.transition": "Перехід → {name}",
  "ring.stay": "Залишитись",
  "ring.continue": "Продовжити",

  "lang.toggle": "EN",
  "theme.toggle": "Тема",
};


const en: Dict = {
  "nav.why": "Why",
  "nav.how": "How it works",
  "nav.directions": "Directions",
  "nav.impact": "Impact",
  "nav.deploy": "Rollout",
  "nav.consortium": "Consortium",
  "nav.dashboard": "Dashboard ↗",
  "nav.digital": "Digital",
  "nav.finance": "Finance",
  "nav.sust": "Sustainability",

  "hero.kicker": "Digital shoulder for the MHPSS sector",
  "hero.title.a": "From humanitarian challenge —",
  "hero.title.b": "to sustainable development",
  "hero.lead":
    "Feel Again is the infrastructure that scales MHPSS-sector initiatives through tech convergence. A single beneficiary–client–patient path, from first contact to return to a productive economy.",
  "hero.sub":
    "The program does not hire specialists or deliver services. It makes sector activity visible, coordinated and capable of affecting GDP.",

  "why.title": "Why this program exists",
  "why.lead":
    "The sector sits at the intersection of humanitarian response, clinical practice and sustainable development. Tech convergence makes possible what used to be manual and fragmented.",

  "how.title": "How the program works",
  "how.lead":
    "Strategic pillars, operational frame, and a digital bus between humanitarian and state systems.",

  "dir.title": "Three program directions",
  "dir.lead":
    "Site = solutions. Dashboard = diagnosis. Each direction has its own page with launch projects.",
  "dir.digital.title": "Digital",
  "dir.digital.desc":
    "Digital tech shoulder for the psychological-services sector. Layers: outreach → operations → resource distribution → coordination.",
  "dir.finance.title": "Finance",
  "dir.finance.desc":
    "Digital rails for blended finance: reverse waterfall from inner circle to global donors. Scoring Matrix and smart contracts.",
  "dir.sust.title": "Sustainability",
  "dir.sust.desc":
    "Turning humanitarian budgets into sustainable-development resources. Sector capacity, clinical excellence, centre of expertise.",
  "dir.cta": "Open direction →",

  "impact.title": "What the program changes",
  "impact.lead":
    "A theory of change organised by the three program directions: what actually shifts in the MHPSS market once Digital, Finance and Sustainability work together.",
  "impact.outcome": "Market shift",
  "impact.digital.title": "From fragmented services to a single bus",
  "impact.digital.s1": "Scattered providers, registries and channels enter a shared digital environment without losing data ownership.",
  "impact.digital.s2": "Every request → verified session → standardised PCL-5/PHQ-9/GAD-7 scoring inside one ID-space.",
  "impact.digital.s3": "Humanitarian and state systems (ESOZ, SME registries) exchange data through the bus without duplicate accounting.",
  "impact.digital.out": "The market gets one beneficiary path and real coverage instead of a declarative one.",
  "impact.finance.title": "From catch-up grants to a results-based waterfall",
  "impact.finance.s1": "Funds flow bottom-up: community → business → state → donor; every layer sees what it actually financed.",
  "impact.finance.s2": "Scoring Matrix and smart contracts turn KPIs into automated payouts with a 7→3% degressive rate.",
  "impact.finance.s3": "NBU Regulatory Sandbox turns SIB, escrow and MHI-collateral into operational tools rather than slideware.",
  "impact.finance.out": "The market moves from a cost logic to an investment logic with measurable returns.",
  "impact.sust.title": "From humanitarian budget to a sustainable-development industry",
  "impact.sust.s1": "Private practice exits the grey zone via economic conditions and zero formalisation penalty.",
  "impact.sust.s2": "Pipeline of 50–60k specialists: universities, diaspora supervision, returning experts.",
  "impact.sust.s3": "Ukraine MHPSS Centre of Expertise — clinical excellence as an export product.",
  "impact.sust.out": "The sector becomes part of GDP and the labour market, not a humanitarian expense line.",

  "axes.title": "Axes of connection",
  "axes.lead":
    "Five axes along which the program stitches the MHPSS market. Each one delivers a concrete, measurable result — not just a label.",
  "axes.result": "Result",
  "axes.1.t": "Resources",
  "axes.1.b": "Blended co-financing with full transparency from inner circle to global donor.",
  "axes.1.r": "One dollar of spend is visible to every funding tier at once.",
  "axes.2.t": "Coordination",
  "axes.2.b": "Global and local humanitarian links + private practice + clinical care under shared standards.",
  "axes.2.r": "A beneficiary never enters the same care route twice.",
  "axes.3.t": "Practice out of the shadows",
  "axes.3.b": "Economic conditions, digital tools, contractual layer — without a formalisation penalty for specialists.",
  "axes.3.r": "+30–40% officially employed psychotherapists within a two-year pilot.",
  "axes.4.t": "Data flows",
  "axes.4.b": "Between humanitarian and state registries — via the Feel Again digital bus with no duplicate accounting.",
  "axes.4.r": "Time from intake to state-registry entry < 24 hours.",
  "axes.5.t": "Unified data set",
  "axes.5.b": "Depersonalised registry tracking the impact of mental wellbeing on GDP.",
  "axes.5.r": "MHEI index at oblast level — quarterly, open.",

  "deploy.title": "Program rollout",
  "deploy.lead":
    "Launch inside the regulator's sandbox, regional competition by MHEI index, sector coverage starting from the financial sector.",

  "cost.title": "The cost of inaction",
  "cost.lead":
    "Lost years of life and productivity, beneficiaries who never return to the economy, lack of accounting — all of it shows up in GDP.",

  "roi.title": "ROI models: WHO, World Bank, LSE",
  "roi.lead":
    "Data from the dashboard. For every $1 invested in mental health, WHO reports up to $4-5 returned in productivity.",

  "cons.what.title": "What stands behind the program",
  "cons.what.lead":
    "A unique competency intersection forged by the war. A stack that combines regulated fintech, clinical excellence and a humanitarian reset from the crisis epicentre.",
  "cons.what.1.t": "FinTech under regulatory oversight",
  "cons.what.1.b": "Digital financial technologies built and operating under UK and Swiss regulators.",
  "cons.what.2.t": "Clinical excellence",
  "cons.what.2.b": "Sources of good practice: EMDR (WHO gold standard), VR Bravemind (USC ICT), IAPT adaptation.",
  "cons.what.3.t": "Humanitarian reset from the crisis epicentre",
  "cons.what.3.b": "Bottom-up localisation — not through intermediaries. Grand Bargain principles from day one.",

  "cons.who.title": "Who stands behind the program",
  "cons.who.lead":
    "A consortium of partners: university centres of clinical excellence, medical systems, technology platforms and civil-society institutions.",

  "footer.dashboard": "Dashboard",
  "footer.brief": "Perfect Storm brief",
  "footer.share": "Share",
  "footer.proposal": "Generate proposal (AI, coming soon)",

  "pillars.title": "Feel Again strategic pillars",
  "pillars.1.t": "Rails, not trains",
  "pillars.1.b":
    "Feel Again does not hire specialists or deliver services. It makes sector activity visible, coordinated and able to affect GDP.",
  "pillars.2.t": "Verified data, not promises",
  "pillars.2.b":
    "A Triple Verification Oracle confirms sessions; PCL-5/PHQ-9/GAD-7 scoring runs at every step. A tamper-evident audit ledger replaces declarative reports.",
  "pillars.3.t": "Complementarity, not competition",
  "pillars.3.b":
    "Whole-of-government approach. A non-competitive digital environment with no participant cap — serving the whole sector and its stakeholders.",


  // Ring Hub
  "hub.kicker": "One navigation across the ecosystem",
  "hub.title": "An outcome ring — how payments depend on clinical verification",
  "hub.lead":
    "Three pathways (donor, provider, beneficiary) converge on a single outcome-verification core. Every payment is bound to verified clinical change via FHIR R4, W3C VC and ISO 20022.",
  "hub.viewToggle": "View mode",
  "hub.view.donor": "Donor View",
  "hub.view.architect": "Architect View",
  "hub.core.kicker": "Core",
  "hub.core.title": "Outcome Verification",
  "hub.core.note": "ЄСОЗ-compatible scales · TBD",
  "hub.pathway.donor": "Donor pathway",
  "hub.pathway.provider": "Provider pathway",
  "hub.pathway.beneficiary": "Beneficiary pathway",
  "hub.confidence": "Transparency guarantee",
  "hub.confidence.note":
    "98% of payments are bound to a clinically verified outcome. Full audit trail in the dashboard.",

  // Copper Ring (global nav)
  "ring.aria": "Feel Again ecosystem navigation",
  "ring.leaving": "You are leaving this resource",
  "ring.transition": "Switch → {name}",
  "ring.stay": "Stay",
  "ring.continue": "Continue",

  "lang.toggle": "UA",
  "theme.toggle": "Theme",

};

const dicts: Record<Lang, Dict> = { ua, en };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx>({ lang: "ua", setLang: () => {}, t: (k) => k });

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ua";
    return (localStorage.getItem("fa.lang") as Lang) || "ua";
  });
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("fa.lang", lang);
  }, [lang]);
  const t = (key: string) => dicts[lang][key] ?? dicts.ua[key] ?? key;
  return (
    <I18nContext.Provider value={{ lang, setLang: setLangState, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useT = () => useContext(I18nContext);
