// Single source of truth for the FEEL AGAIN digital ecosystem navigation.
// Used by both the global CopperRing nav and the RingHub presentation section.

export type ResourceId = "site" | "dashboard" | "pager" | "report";

export interface EcosystemPage {
  id: string;
  /** Path inside the resource (or full URL for external resources) */
  href: string;
  /** Short label shown on the ring marker */
  label: { ua: string; en: string };
  /** Optional section grouping shown in the breadcrumb middle slot */
  section?: { ua: string; en: string };
}

export interface EcosystemResource {
  id: ResourceId;
  /** "internal" = react-router; "external" = full href (different origin) */
  kind: "internal" | "external";
  /** Display name */
  name: { ua: string; en: string };
  /** Short purpose for breadcrumb status slot */
  purpose: { ua: string; en: string };
  /** Base URL for external resources (ignored for internal) */
  baseUrl?: string;
  pages: EcosystemPage[];
}

export const ECOSYSTEM: EcosystemResource[] = [
  {
    id: "site",
    kind: "internal",
    name: { ua: "Сайт програми", en: "Program site" },
    purpose: {
      ua: "Опис програми та конвертація партнерів",
      en: "Program narrative · partner conversion",
    },
    pages: [
      { id: "home", href: "/", label: { ua: "Головна", en: "Home" } },
      {
        id: "digital",
        href: "/digital",
        label: { ua: "Цифровізація", en: "Digital" },
        section: { ua: "Напрями", en: "Directions" },
      },
      {
        id: "finance",
        href: "/finance",
        label: { ua: "Фінансування", en: "Finance" },
        section: { ua: "Напрями", en: "Directions" },
      },
      {
        id: "sustainability",
        href: "/sustainability",
        label: { ua: "Сталий розвиток", en: "Sustainability" },
        section: { ua: "Напрями", en: "Directions" },
      },
      {
        id: "report",
        href: "/report",
        label: { ua: "Звіт", en: "Report" },
        section: { ua: "Документи", en: "Documents" },
      },
      {
        id: "pager",
        href: "/pager",
        label: { ua: "Пейджер", en: "Pager" },
        section: { ua: "Документи", en: "Documents" },
      },
    ],
  },
  {
    id: "dashboard",
    kind: "external",
    name: { ua: "Дашборд", en: "Dashboard" },
    purpose: {
      ua: "Координація учасників і дані реального часу",
      en: "Participant coordination · real-time data",
    },
    baseUrl: "https://dashboard.feelagain.me",
    pages: [
      {
        id: "overview",
        href: "https://dashboard.feelagain.me",
        label: { ua: "Огляд", en: "Overview" },
      },
      {
        id: "providers",
        href: "https://dashboard.feelagain.me/providers",
        label: { ua: "Провайдери", en: "Providers" },
      },
      {
        id: "outcomes",
        href: "https://dashboard.feelagain.me/outcomes",
        label: { ua: "Результати", en: "Outcomes" },
      },
      {
        id: "settlement",
        href: "https://dashboard.feelagain.me/settlement",
        label: { ua: "Виплати", en: "Settlement" },
      },
    ],
  },
];

export const findResource = (id: ResourceId) =>
  ECOSYSTEM.find((r) => r.id === id)!;

export const findPageByPath = (
  pathname: string,
): { resource: EcosystemResource; page: EcosystemPage } | null => {
  for (const r of ECOSYSTEM) {
    if (r.kind !== "internal") continue;
    const p = r.pages.find((pg) => pg.href === pathname);
    if (p) return { resource: r, page: p };
  }
  return null;
};
