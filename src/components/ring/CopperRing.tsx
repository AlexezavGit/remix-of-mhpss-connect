import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useT } from "@/i18n";
import { LanguageToggle, ThemeToggle } from "@/components/Toggles";
import { useTheme } from "@/theme/ThemeProvider";
import logoLight from "@/assets/logos/feel-again-light.svg";
import logoDark from "@/assets/logos/feel-again-dark.svg";
import PageNav from "./PageNav";
import RingTicker from "./RingTicker";
import TickScale from "./TickScale";

/**
 * CopperRing — three-row navigation rail.
 *
 *   Row 1 · Global resource navigation (5 links + logo + toggles)
 *   Row 2 · Local in-page navigation (registered via usePageSections)
 *   Row 3 · Contextual number ticker (mini-bars · value · arrow · caption)
 */

type MenuId = "insights" | "solutions" | "login" | "demo" | "consortium";
interface MenuItem {
  id: MenuId;
  label: { ua: string; en: string };
  to?: string;
  href?: string;
}

const MENU: MenuItem[] = [
  { id: "insights",   label: { ua: "Дані та Інсайти", en: "Data & Insights" }, href: "https://dashboard.feelagain.me" },
  { id: "solutions",  label: { ua: "Рішення",          en: "Solutions" },        to: "/solutions" },
  { id: "login",      label: { ua: "Користувачам",     en: "For users" },        to: "/users" },
  { id: "demo",       label: { ua: "Демо",             en: "Demo" },             to: "/demo" },
  { id: "consortium", label: { ua: "Консорціум",       en: "Consortium" },       to: "/consortium" },
];

const CopperRing = () => {
  const { t, lang } = useT();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (y < 40) setHidden(false);
      else if (dy > 8) setHidden(true);
      else if (dy < -8) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (m: MenuItem) => {
    if (m.href) {
      window.open(m.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (m.to) navigate(m.to);
  };

  return (
    <motion.nav
      aria-label={t("ring.aria")}
      className="fixed top-0 left-0 right-0 z-50 select-none pointer-events-none"
      initial={false}
      animate={{ y: hidden ? -200 : 0 }}
      transition={{ type: "tween", duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none horizon-wash bg-background/70 backdrop-blur-md border-b border-foreground/5" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 pt-1.5 pb-1.5 pointer-events-auto">
        {/* Row 1 — Global nav (unified height ~34px, unified font-mono 11px) */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-x-4 md:h-[34px]">
          <Link to="/" className="order-1 flex items-center gap-2 group shrink-0 h-[34px]">
            <img
              src={theme === "light" ? logoDark : logoLight}
              alt="Feel Again"
              className="h-6 md:h-7 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
            />
            <span className="hidden lg:inline font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55">
              MHPSS · Інфраструктура
            </span>
          </Link>

          <div className="order-3 md:order-2 basis-full md:basis-auto flex-1 flex items-center justify-start md:justify-center gap-1 sm:gap-4 min-w-0 h-[34px] overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 border-t border-foreground/5 md:border-0">
            {MENU.map((m) => {
              const active =
                (m.to && m.to !== "/" && pathname.startsWith(m.to)) ||
                (m.to === "/" && pathname === "/");
              return (
                <button
                  key={m.id}
                  onClick={() => openMenu(m)}
                  className={`relative font-mono uppercase tracking-[0.22em] text-[11px] font-semibold shrink-0 px-2 py-1
                    outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--gold-bright))] rounded-sm whitespace-nowrap
                    ${active ? "text-[hsl(var(--gold-bright))]" : "text-foreground/80 hover:text-[hsl(var(--gold-bright))]"} transition-colors`}
                >
                  {m.label[lang]}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 w-7 bg-[hsl(var(--gold-bright))] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="order-2 md:order-3 flex items-center gap-1 shrink-0 h-[34px]">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Notched ruler — unified separator */}
        <TickScale className="mt-0.5" />

        {/* Row 2 — Local page nav (unified height ~30px, same font) */}
        <div className="h-[30px] flex items-center min-w-0 overflow-hidden">
          <PageNav />
        </div>

        <TickScale className="opacity-70" />

        {/* Row 3 — Ticker (unified font-mono, scaled values) */}
        <div className="h-[34px] flex items-center min-w-0 overflow-hidden">
          <RingTicker />
        </div>

        <TickScale className="opacity-60" />
      </div>
    </motion.nav>
  );
};

export default CopperRing;
