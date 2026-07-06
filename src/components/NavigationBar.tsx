import { useLocation, Link } from "react-router-dom";
import { useT } from "@/i18n";

/**
 * Secondary section-anchor bar.
 * The primary navigation now lives in the global CopperRing at the top.
 * This bar only surfaces in-page section anchors for the home route.
 */
const NavigationBar = () => {
  const { t } = useT();
  const { pathname } = useLocation();

  const sections =
    pathname === "/"
      ? [
          { id: "hub", label: "Hub" },
          { id: "why", label: t("nav.why") },
          { id: "how", label: t("nav.how") },
          { id: "directions", label: t("nav.directions") },
          { id: "impact", label: t("nav.impact") },
          { id: "rollout", label: t("nav.deploy") },
          { id: "consortium", label: t("nav.consortium") },
        ]
      : [];

  if (sections.length === 0) return null;

  return (
    <div className="w-full border-b border-border/40 bg-background/40 backdrop-blur-md">
      <div className="section-container flex items-center gap-1 h-10 overflow-x-auto">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="px-3 py-1 text-[11px] font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors whitespace-nowrap"
          >
            {s.label}
          </a>
        ))}
        <span className="w-px h-4 bg-border mx-2" />
        <Link
          to="/digital"
          className="px-3 py-1 text-[11px] font-medium rounded-full text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
        >
          {t("nav.digital")}
        </Link>
        <Link
          to="/finance"
          className="px-3 py-1 text-[11px] font-medium rounded-full text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
        >
          {t("nav.finance")}
        </Link>
        <Link
          to="/sustainability"
          className="px-3 py-1 text-[11px] font-medium rounded-full text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
        >
          {t("nav.sust")}
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
