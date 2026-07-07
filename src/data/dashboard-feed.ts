// Dashboard feed placeholder.
// TODO: replace with real fetch from dashboard.feelagain.me API once endpoint is exposed.
// Each item is grouped: needs / resources / providers / macro (GDP+MHEI).

export type FeedItem = {
  group: "needs" | "resources" | "providers" | "macro";
  label: string;
  value: string;
  hint?: string;
  /** Direction of change vs. previous period. */
  delta?: "up" | "down" | "flat";
  /** Whether an "up" is good or bad — drives arrow color. */
  polarity?: "good" | "bad" | "neutral";
  /** Short source attribution (e.g. "Lancet", "WHO"). */
  source?: string;
};

export const dashboardFeed: FeedItem[] = [
  // Needs
  { group: "needs", label: "Українців з потребою у спец. допомозі", value: "3.9M", hint: "WHO 2024 baseline", delta: "up", polarity: "bad", source: "Lancet" },
  { group: "needs", label: "Прогноз. обсяг сесій", value: "48–76M год", hint: "12–20 сеансів × WHO", delta: "up", polarity: "bad", source: "WHO" },
  { group: "needs", label: "% «дорого / не на часі / є важливіші»", value: "~62%", hint: "barriers index", delta: "down", polarity: "bad", source: "Gradus" },
  { group: "needs", label: "Необх. фахівців для покриття", value: "50–60K", hint: "консерв. оцінка", delta: "up", polarity: "neutral", source: "Feel Again" },

  // Resources
  { group: "resources", label: "Необх. фінансування програми", value: "$2.5–4.5B", hint: "горизонт 2025–2027", delta: "up", polarity: "neutral", source: "WB HEAL" },
  { group: "resources", label: "Поточна локалізація глоб. бюджетів", value: "1.2%", hint: "Grand Bargain", delta: "flat", polarity: "bad", source: "IASC" },
  { group: "resources", label: "% звернень за допомогою", value: "TBD", hint: "з дашборду", delta: "flat", polarity: "neutral", source: "Dashboard" },

  // Providers
  { group: "providers", label: "Зайнятих у держ./гуманіт. реагуванні", value: "~8–9K", hint: "включно з NGO", delta: "flat", polarity: "neutral", source: "NGO Reg" },
  { group: "providers", label: "Приватна практика (агрегована)", value: "~1.5–2K", hint: "b17, helppoint, PsyChat", delta: "up", polarity: "good", source: "Marketplaces" },
  { group: "providers", label: "Приватна практика (статист. тінь)", value: "6.5–15K", hint: "консерв. оцінка ФОП", delta: "up", polarity: "bad", source: "Статистика ФОП" },
  { group: "providers", label: "% завершення курсів реабілітації", value: "TBD", hint: "PCL-5 floor 30%", delta: "up", polarity: "good", source: "PCL-5" },
  { group: "providers", label: "% зниження симптомів (середнє)", value: "TBD", hint: "PHQ-9/GAD-7", delta: "up", polarity: "good", source: "PHQ-9" },

  // Macro
  { group: "macro", label: "Повернення до ефективної економіки", value: "TBD", hint: "DALY averted", delta: "up", polarity: "good", source: "WHO DALY" },
  { group: "macro", label: "Прогноз. вплив на ВВП", value: "≈$8B/рік", hint: "довоєнна база, скейлинг", delta: "down", polarity: "bad", source: "WHO методологія" },
  { group: "macro", label: "MHEI (Mental Health Economy Index)", value: "TBD", hint: "буде в дашборді", delta: "flat", polarity: "neutral", source: "Feel Again" },
  // Extra composite metrics for the ticker
  { group: "macro", label: "Спроможність системи покриття", value: "38%", hint: "від потреби закрито", delta: "up", polarity: "good", source: "Feel Again" },
  { group: "macro", label: "ROI програми", value: "1→4.5×", hint: "за 5 років", delta: "up", polarity: "good", source: "WHO" },
  { group: "macro", label: "Gap (collision zone)", value: "62%", hint: "незакрита потреба", delta: "down", polarity: "bad", source: "Feel Again" },
];

export const feedGroupLabel: Record<FeedItem["group"], string> = {
  needs: "Потреби",
  resources: "Ресурси",
  providers: "Надавачі",
  macro: "Макроекономіка / ВВП / MHEI",
};
