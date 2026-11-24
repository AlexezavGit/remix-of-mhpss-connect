import { dashboardFeed, type FeedItem } from "@/data/dashboard-feed";

export function contextNumbers(pathname: string): FeedItem[] {
  const pick = (labels: string[]) =>
    labels.map((l) => dashboardFeed.find((d) => d.label.includes(l))).filter(Boolean) as FeedItem[];
  if (pathname.startsWith("/finance") || pathname.startsWith("/solutions/finance")) {
    return pick(["Необх. фінансування", "локалізація", "ROI програми", "MHEI", "Gap"]);
  }
  if (pathname.startsWith("/sustainability") || pathname.startsWith("/solutions/sustainability")) {
    return pick(["Приватна практика (агрегована)", "Приватна практика (статист", "% завершення", "Повернення до ефективної", "Спроможність"]);
  }
  return pick(["Українців з потребою", "Спроможність", "Прогноз. вплив на ВВП", "ROI програми", "Gap"]);
}

const SHORT: [string, string][] = [
  ["Українців з потребою", "Потреба"],
  ["Спроможність", "Спроможність"],
  ["вплив на ВВП", "Втрати ВВП"],
  ["ROI", "ROI"],
  ["Gap", "Розрив"],
  ["Необх. фінансування", "Бюджет"],
  ["локалізація", "Локалізація"],
  ["MHEI", "MHEI"],
  ["Приватна практика (агрегована)", "Платформи"],
  ["Приватна практика (статист", "Тіньова практика"],
  ["% завершення", "Завершення"],
  ["Повернення до ефективної", "Повернення"],
];

export function shortCaption(label: string): string {
  const hit = SHORT.find(([k]) => label.includes(k));
  return hit ? hit[1] : label.split("·")[0].split("(")[0].trim().split(" ").slice(0, 2).join(" ");
}
