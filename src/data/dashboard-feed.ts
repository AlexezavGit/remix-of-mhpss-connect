// Dashboard feed placeholder.
// TODO: replace with real fetch from dashboard.feelagain.me API once endpoint is exposed.
// Each item is grouped: needs / resources / providers / macro (GDP+MHEI).

export type FeedItem = {
  group: "needs" | "resources" | "providers" | "macro";
  label: string;
  value: string;
  hint?: string;
};

export const dashboardFeed: FeedItem[] = [
  // Needs
  { group: "needs", label: "Українців з потребою у спец. допомозі", value: "3.9M", hint: "WHO 2024 baseline" },
  { group: "needs", label: "Прогноз. обсяг сесій", value: "48–76M год", hint: "12–20 сеансів × WHO" },
  { group: "needs", label: "% «дорого / не на часі / є важливіші»", value: "~62%", hint: "barriers index" },
  { group: "needs", label: "Необх. фахівців для покриття", value: "50–60K", hint: "консерв. оцінка" },

  // Resources
  { group: "resources", label: "Необх. фінансування програми", value: "$2.5–4.5B", hint: "горизонт 2025–2027" },
  { group: "resources", label: "Поточна локалізація глоб. бюджетів", value: "1.2%", hint: "Grand Bargain" },
  { group: "resources", label: "% звернень за допомогою", value: "TBD", hint: "з дашборду" },

  // Providers
  { group: "providers", label: "Зайнятих у держ./гуманіт. реагуванні", value: "~8–9K", hint: "включно з NGO" },
  { group: "providers", label: "Приватна практика (агрегована)", value: "~1.5–2K", hint: "b17, helppoint, PsyChat" },
  { group: "providers", label: "Приватна практика (статист. тінь)", value: "6.5–15K", hint: "консерв. оцінка ФОП" },
  { group: "providers", label: "% завершення курсів реабілітації", value: "TBD", hint: "PCL-5 floor 30%" },
  { group: "providers", label: "% зниження симптомів (середнє)", value: "TBD", hint: "PHQ-9/GAD-7" },

  // Macro
  { group: "macro", label: "Повернення до ефективної економіки", value: "TBD", hint: "DALY averted" },
  { group: "macro", label: "Прогноз. вплив на ВВП", value: "≈$8B/рік", hint: "довоєнна база, скейлинг" },
  { group: "macro", label: "MHEI (Mental Health Economy Index)", value: "TBD", hint: "буде в дашборді" },
];

export const feedGroupLabel: Record<FeedItem["group"], string> = {
  needs: "Потреби",
  resources: "Ресурси",
  providers: "Надавачі",
  macro: "Макроекономіка / ВВП / MHEI",
};
