import { Link } from "react-router-dom";
import { useT } from "@/i18n";

const SiteFooter = () => {
  const { t } = useT();
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="section-container">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-display text-sm text-foreground font-bold">FEEL AGAIN</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-md">
              Цифрове плече для сектору MHPSS · Україна 2025–2027
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <a
              href="https://dashboard.feelagain.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {t("footer.dashboard")} ↗
            </a>
            <Link to="/digital" className="text-foreground/70 hover:text-foreground">
              {t("nav.digital")}
            </Link>
            <Link to="/finance" className="text-foreground/70 hover:text-foreground">
              {t("nav.finance")}
            </Link>
            <Link to="/sustainability" className="text-foreground/70 hover:text-foreground">
              {t("nav.sust")}
            </Link>
            <a
              href="https://dashboard.feelagain.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground"
            >
              {t("footer.brief")}
            </a>
            <span className="text-muted-foreground/60 italic">{t("footer.proposal")}</span>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
