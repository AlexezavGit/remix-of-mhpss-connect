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
  { id: "login",      label: { ua: "Вхід",             en: "Sign in" },          to: "/login" },
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

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 pt-1.5 pb-2 pointer-events-auto">
        {/* Row 1 — Global nav */}
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={theme === "light" ? logoDark : logoLight}
              alt="Feel Again"
              className="h-6 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
            />
            <span className="hidden md:inline font-mono text-[9px] tracking-[0.32em] uppercase text-foreground/55">
              MHPSS Infrastructure
            </span>
          </Link>

          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-3 min-w-0">
            {MENU.map((m) => {
              const active =
                (m.to && m.to !== "/" && pathname.startsWith(m.to)) ||
                (m.to === "/" && pathname === "/");
              return (
                <button
                  key={m.id}
                  onClick={() => openMenu(m)}
                  className={`relative font-mono uppercase tracking-[0.22em] text-[10px] sm:text-[11px] px-2 py-1
                    outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--gold-bright))] rounded-sm whitespace-nowrap
                    ${active ? "text-[hsl(var(--gold-bright))]" : "text-foreground/70 hover:text-[hsl(var(--gold-bright))]"} transition-colors`}
                >
                  {m.label[lang]}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 w-6 bg-[hsl(var(--gold-bright))] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Horizon line */}
        <div
          aria-hidden
          className="h-px w-full mt-1"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(var(--gold-bright) / 0.55) 12%, hsl(var(--copper-bright) / 0.75) 50%, hsl(var(--gold-bright) / 0.55) 88%, transparent 100%)",
            boxShadow: "0 0 12px hsl(var(--gold-bright) / 0.25)",
          }}
        />

        {/* Row 2 — Local page nav */}
        <PageNav />

        {/* Row 3 — Ticker */}
        <RingTicker />
      </div>
    </motion.nav>
  );
};

export default CopperRing;
