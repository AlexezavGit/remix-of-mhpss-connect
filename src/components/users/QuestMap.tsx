import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * QuestMap — 3 parallel tracks (Beneficiary · Provider · Donor)
 * flowing top-to-bottom, joined by horizontal triggers, sitting on
 * a shared foundation of 8 platform rails (стержні).
 *
 * Each track ends with a trigger question that opens the matching
 * micro-cabinet: /users/beneficiary, /users/provider, /users/donor.
 *
 * Mobile: tracks stack; desktop: 3 columns with lane guides.
 */

type Step = {
  id: string;
  title: string;
  detail: string;
  /** Right-facing horizontal trigger label, if this step fires one across the row */
  trigger?: string;
};

type Track = {
  key: "b" | "p" | "d";
  actor: string;
  tag: string;
  tone: "accent" | "primary" | "gold";
  steps: Step[];
  cta: { q: string; to: string; label: string };
};

const TRACKS: Track[] = [
  {
    key: "b",
    actor: "Бенефіціар",
    tag: "01 · Отримувач допомоги",
    tone: "accent",
    steps: [
      { id: "b1", title: "Перший контакт", detail: "Партнер (медзаклад, кампейн ВПО, роботодавець, навчання персоналу) або самозвернення." },
      { id: "b2", title: "Бот-триаж", detail: "AI-опитувальник + скринінг PHQ-9 / GAD-7 / PCL-5. Формує запит на допомогу.", trigger: "→ ескроу бенефіціара" },
      { id: "b3", title: "Циркуляційна папка", detail: "Знеособлений кейс потрапляє у пул фахівців («як Uber з психологами»)." },
      { id: "b4", title: "1-й сеанс · підтвердження", detail: "Верифікація діагнозу. Цифрове рукопожаття start/stop + GPS.", trigger: "→ списання за сеанс" },
      { id: "b5", title: "Циркуляційна папка №2", detail: "Друге підтвердження / третє незалежне мнення." },
      { id: "b6", title: "Курс терапії / план реабілітації", detail: "5 сеансів (<180 днів після травми) · 12–20 сеансів · або 28 днів стаціонару НСЗУ." },
      { id: "b7", title: "P2P дозбір · дофінансування", detail: "5–10% зібрано → тригер роботодавця / соц. бондів / ваучера держави.", trigger: "→ P2P + Social Bond" },
      { id: "b8", title: "Реінтеграція / повернення до функціонування", detail: "Або: соматизація / інвалідизація — фіксується як outcome." },
    ],
    cta: {
      q: "Запустити діагностичний тест або AI-розмову?",
      to: "/users/beneficiary",
      label: "Кабінет бенефіціара →",
    },
  },
  {
    key: "p",
    actor: "Виконавець",
    tag: "02 · Надавач допомоги",
    tone: "primary",
    steps: [
      { id: "p1", title: "Онбординг фахівця", detail: "W3C Verifiable Credential від МОЗ / НПА. Область практики: CBT, EMDR, VR." },
      { id: "p2", title: "Створення проекту", detail: "Виконавець заводить проект → стає доступним у кабінеті інвестора/донора." },
      { id: "p3", title: "Прийом кейсу з папки", detail: "Кейс призначається за протоколом та навантаженням." },
      { id: "p4", title: "Сеанс · цифрове рукопожаття", detail: "Кнопка start/stop, GPS, опціональний AI-ассистент у діагностиці." },
      { id: "p5", title: "Тестування · клінічні шкали", detail: "PROM-опитувальники + супервізорська валідація." },
      { id: "p6", title: "Автоматичний звіт", detail: "FHIR Observation → Trembita → ЄСОЗ. Non-billing shadow record." },
      { id: "p7", title: "Зарахування на рахунок", detail: "Ескроу-релейс після Triple Verification. Дегресивна ставка 7→3%." },
      { id: "p8", title: "Історія реабілітації", detail: "Запис у деперсоніфікований реєстр як outcome для донора / держави." },
    ],
    cta: {
      q: "Запустити онбординг фахівця, щоб отримати потік клієнтів?",
      to: "/users/provider",
      label: "Кабінет фахівця →",
    },
  },
  {
    key: "d",
    actor: "Донор / Інвестор",
    tag: "03 · Джерело фінансування",
    tone: "gold",
    steps: [
      { id: "d1", title: "Створення програми фінансування", detail: "Донор задає протокол, регіон, когорту, KPI. Створює цільовий смарт-контракт." },
      { id: "d2", title: "Резервування ескроу", detail: "ISO 20022 pain.001 → escrow, прив'язаний до конкретного протоколу." },
      { id: "d3", title: "Відображення в кабінеті виконавців / бенефіціарів", detail: "Програма стає доступною для матчингу." },
      { id: "d4", title: "Тригер за критерієм", detail: "Напр. «30% оплати для ветеранів». Смарт-контракт активний, поки KPI виконуються." },
      { id: "d5", title: "Підтверджений outcome", detail: "FHIR Observation з PROM-шкали → escrow release → camt.054 сетлмент." },
      { id: "d6", title: "Автоматична звітність", detail: "Кожна сесія тегована «Funded by [Donor]». Real-time impact dashboard." },
      { id: "d7", title: "ESG / CSR звіт", detail: "Workforce Resilience, Reputation, Turnkey Infrastructure — white-label." },
      { id: "d8", title: "Дофінансування наступних когорт", detail: "Reverse Waterfall: попередні внески як валідація потреби." },
    ],
    cta: {
      q: "Запустити протокол створення програми фінансування?",
      to: "/users/donor",
      label: "Кабінет донора →",
    },
  },
];

/** Foundation rails (стержні) that carry ALL three tracks. */
const RAILS = [
  { k: "Деперсоніфікований реєстр", d: "Enkidu · пацієнт FHIR (псевдо)" },
  { k: "Проекти", d: "заводить виконавець · доступні донору" },
  { k: "Програми фінансування", d: "створює донор · доступні всім" },
  { k: "Єдиний датасет", d: "ЄСОЗ · Трембіта · MeasureReport" },
  { k: "Ескроу-рахунки", d: "ISO 20022 · смарт-контракти" },
  { k: "Автоматична звітність", d: "camt.054 · звіти результатів" },
  { k: "Клінічні шкали / зворотний звʼязок", d: "PHQ-9 · GAD-7 · PCL-5 · WHO-DAS 2.0" },
  { k: "Тригер-система за протоколом", d: "оракул потрійної верифікації" },
];

const toneMap: Record<Track["tone"], { border: string; text: string; bg: string; dot: string }> = {
  accent: {
    border: "border-accent/40",
    text: "text-accent",
    bg: "bg-accent/5",
    dot: "bg-accent",
  },
  primary: {
    border: "border-primary/40",
    text: "text-primary",
    bg: "bg-primary/5",
    dot: "bg-primary",
  },
  gold: {
    border: "border-[hsl(var(--gold)/0.45)]",
    text: "text-[hsl(var(--gold-bright))]",
    bg: "bg-[hsl(var(--gold)/0.06)]",
    dot: "bg-[hsl(var(--gold-bright))]",
  },
};

const QuestMap = () => {
  return (
    <section id="quest" className="py-14 bg-transparent scroll-mt-32">
      <div className="section-container">
        <div className="max-w-3xl mb-8">
          <span className="tag-gold mb-3">Квест-мапа</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-foreground tracking-tight">
            Три треки — одна інфраструктура
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">
            Кожен крок бенефіціара, фахівця чи донора запускає горизонтальний тригер по спільній
            цифровій шині. Всі треки стоять на восьми загальних стержнях платформи. У кінці кожного
            треку — питання, що відкриває персональний кабінет.
          </p>
        </div>

        {/* Tracks */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {TRACKS.map((tr) => {
            const t = toneMap[tr.tone];
            return (
              <div key={tr.key} className="flex flex-col">
                <div className={`card-elevated p-4 border ${t.border} ${t.bg} mb-3`}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 mb-1">
                    {tr.tag}
                  </div>
                  <div className={`font-display text-xl font-bold ${t.text}`}>{tr.actor}</div>
                </div>

                <ol className="relative pl-6">
                  {/* vertical spine */}
                  <span
                    aria-hidden
                    className={`absolute left-2 top-2 bottom-2 w-px ${t.dot} opacity-40`}
                  />
                  {tr.steps.map((s, i) => (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.03 }}
                      className="relative mb-3"
                    >
                      <span
                        aria-hidden
                        className={`absolute -left-[18px] top-2.5 w-2.5 h-2.5 rounded-full ${t.dot} ring-2 ring-background`}
                      />
                      <div className="card-elevated p-3">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <div className="font-display text-sm font-bold text-foreground">
                            {String(i + 1).padStart(2, "0")} · {s.title}
                          </div>
                        </div>
                        <p className="text-xs text-secondary-foreground leading-relaxed">
                          {s.detail}
                        </p>
                        {s.trigger && (
                          <div
                            className={`mt-2 font-mono text-[10px] uppercase tracking-widest ${t.text} flex items-center gap-1`}
                          >
                            <span aria-hidden>─</span>
                            <span>{s.trigger}</span>
                          </div>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ol>

                {/* Trigger CTA */}
                <div className={`mt-2 card-elevated p-4 border ${t.border} ${t.bg}`}>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/55 mb-2">
                    Тригерне питання
                  </div>
                  <div className="font-display text-sm font-bold text-foreground mb-3 leading-snug">
                    {tr.cta.q}
                  </div>
                  <Link
                    to={tr.cta.to}
                    className={`inline-block px-4 py-2 rounded-md border ${t.border} ${t.text} font-mono uppercase tracking-[0.18em] text-[11px] hover:bg-foreground/5 transition-colors`}
                  >
                    {tr.cta.label}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Foundation rails */}
        <div className="mt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 mb-3">
            Спільні стержні платформи · foundation rails
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {RAILS.map((r) => (
              <div
                key={r.k}
                className="card-elevated p-3 border border-border/60"
              >
                <div className="font-display text-xs font-bold text-foreground mb-0.5 leading-tight">
                  {r.k}
                </div>
                <div className="font-mono text-[9.5px] text-foreground/50 leading-tight">
                  {r.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestMap;
