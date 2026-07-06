import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, animate } from "framer-motion";
import { useT } from "@/i18n";
import { dashboardFeed } from "@/data/dashboard-feed";
import { LanguageToggle, ThemeToggle } from "@/components/Toggles";
import { useTheme } from "@/theme/ThemeProvider";
import logoLight from "@/assets/logos/feel-again-light.svg";
import logoDark from "@/assets/logos/feel-again-dark.svg";

/**
 * HorizonRail — thin typographic navigation "horizon".
 *
 *   MENU:   ДАНІ · РІШЕННЯ · ВХІД · ДЕМО · КОНСОРЦІУМ         ← labels
 *      │        │        │       │      │                     ← 5 upper ticks (up)
 *   ───┴────────┴────────┴───────┴──────┴───────────────────  ← horizon line
 *   ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷ ╷  ← fine lower ticks (down)
 *   3.9M   $2.5–4.5B   62%   50–60K   ≈$8B/рік                ← contextual numbers
 *
 * The rail is transparent — it sits on the page gradient without breaking it.
 * Auto-hides on scroll down, returns on scroll up.
 */

type MenuId = "insights" | "solutions" | "login" | "demo" | "consortium";
interface MenuItem {
  id: MenuId;
  label: { ua: string; en: string };
  to?: string;
  href?: string;
  onClickAnchor?: string;
}

const MENU: MenuItem[] = [
  { id: "insights",   label: { ua: "Дані та Інсайти", en: "Data & Insights" }, href: "https://dashboard.feelagain.me" },
  { id: "solutions",  label: { ua: "Рішення",          en: "Solutions" },        to: "/digital" },
  { id: "login",      label: { ua: "Вхід",             en: "Sign in" },          href: "https://dashboard.feelagain.me/login" },
  { id: "demo",       label: { ua: "Демо",             en: "Demo" },             to: "/pager" },
  { id: "consortium", label: { ua: "Консорціум",       en: "Consortium" },       to: "/", onClickAnchor: "consortium" },
];

// Route → up to 5 contextual numbers pulled from dashboardFeed groups.
function contextNumbers(pathname: string) {
  const pick = (labels: string[]) =>
    labels
      .map((l) => dashboardFeed.find((d) => d.label.includes(l)))
      .filter(Boolean) as typeof dashboardFeed;

  if (pathname.startsWith("/digital")) {
    return pick(["Українців з потребою", "Прогноз. обсяг", "% «дорого", "Необх. фахівців"]);
  }
  if (pathname.startsWith("/finance")) {
    return pick(["Необх. фінансування", "локалізація", "звернень", "MHEI"]);
  }
  if (pathname.startsWith("/sustainability")) {
    return pick(["Приватна практика (агрегована)", "Приватна практика (статист", "% завершення", "Повернення до ефективної"]);
  }
  if (pathname.startsWith("/report") || pathname.startsWith("/pager")) {
    return pick(["Прогноз. вплив на ВВП", "MHEI", "Українців з потребою", "Необх. фінансування"]);
  }
  // Default (home)
  return pick(["Українців з потребою", "Необх. фінансування", "% «дорого", "Необх. фахівців", "Прогноз. вплив на ВВП"]);
}

function toneOf(v: string): string {
  const s = v.toLowerCase();
  if (s.includes("tbd")) return "text-[hsl(var(--gold-bright))]";
  if (s.includes("%") && /6\d|7\d|8\d|9\d/.test(s)) return "text-[hsl(var(--coral))]";
  return "text-[hsl(var(--emerald))]";
}

const FINE_TICKS = 96; // dense lower scale

const HorizonRail = () => {
  const { t, lang } = useT();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Auto-hide on scroll down
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (y < 40) setHidden(false);
      else if (dy > 6) setHidden(true);
      else if (dy < -6) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const numbers = useMemo(() => contextNumbers(pathname), [pathname]);

  // Slow rotating highlight of one number (~5s each), pausing 2s on "key" values.
  const [focusIdx, setFocusIdx] = useState(0);
  useEffect(() => {
    if (!numbers.length) return;
    let i = 0;
    const tick = () => {
      i = (i + 1) % numbers.length;
      setFocusIdx(i);
    };
    const id = window.setInterval(tick, 5200);
    return () => window.clearInterval(id);
  }, [numbers.length]);

  const openMenu = (m: MenuItem) => {
    if (m.href) {
      window.open(m.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (m.to) navigate(m.to);
    if (m.onClickAnchor) {
      window.setTimeout(() => {
        const el = document.getElementById(m.onClickAnchor!);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  };

  return (
    <motion.nav
      aria-label={t("ring.aria")}
      className="fixed top-0 left-0 right-0 z-50 select-none pointer-events-none"
      initial={false}
      animate={{ y: hidden ? -140 : 0 }}
      transition={{ type: "tween", duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {/* Very subtle wash so text stays legible over hero, but gradient continues. */}
      <div className="absolute inset-0 pointer-events-none horizon-wash" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 py-2 pointer-events-auto">
        {/* Logo + toggles row, minimal */}
        <div className="flex items-center justify-between mb-1">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={theme === "light" ? logoDark : logoLight}
              alt="Feel Again"
              className="h-7 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
            />
            <span className="hidden md:inline font-mono text-[9px] tracking-[0.32em] uppercase text-foreground/55">
              MHPSS Infrastructure
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* ── Scale 1: menu labels + upward ticks ── */}
        <div className="relative">
          <div className="grid grid-cols-5 gap-2">
            {MENU.map((m, i) => {
              const active =
                (m.to && m.to !== "/" && pathname.startsWith(m.to)) ||
                (m.id === "consortium" && pathname === "/");
              return (
                <button
                  key={m.id}
                  onClick={() => openMenu(m)}
                  className={`group relative flex flex-col items-center gap-1 text-center outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--gold-bright))] rounded-sm px-1
                    font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em]
                    ${active ? "text-[hsl(var(--gold-bright))]" : "text-foreground/70 hover:text-[hsl(var(--gold-bright))]"} transition-colors`}
                >
                  <span className="whitespace-nowrap truncate max-w-full">{m.label[lang]}</span>
                  {/* tall upward tick */}
                  <span
                    aria-hidden
                    className={`block w-px ${active ? "h-5 bg-[hsl(var(--gold-bright))]" : "h-4 bg-foreground/40 group-hover:bg-[hsl(var(--gold-bright))]"} transition-all`}
                  />
                </button>
              );
            })}
          </div>

          {/* ── Horizon line ── */}
          <div className="relative mt-0">
            <div
              aria-hidden
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, hsl(var(--gold-bright) / 0.55) 12%, hsl(var(--copper-bright) / 0.75) 50%, hsl(var(--gold-bright) / 0.55) 88%, transparent 100%)",
                boxShadow: "0 0 12px hsl(var(--gold-bright) / 0.25)",
              }}
            />
          </div>

          {/* ── Scale 2: fine downward ticks ── */}
          <div
            aria-hidden
            className="relative flex justify-between mt-0 h-2 overflow-hidden"
          >
            {Array.from({ length: FINE_TICKS }).map((_, i) => {
              const isMajor = i % 8 === 0;
              const isMid = !isMajor && i % 4 === 0;
              const h = isMajor ? 8 : isMid ? 5 : 3;
              return (
                <span
                  key={i}
                  className="block w-px"
                  style={{
                    height: `${h}px`,
                    background: isMajor
                      ? "hsl(var(--gold-bright) / 0.9)"
                      : isMid
                      ? "hsl(var(--copper-bright) / 0.7)"
                      : "hsl(var(--foreground) / 0.28)",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ── Scale 3: contextual numbers ── */}
        <div className="mt-1.5 flex items-baseline justify-between gap-3 overflow-x-auto no-scrollbar">
          {numbers.map((n, i) => {
            const focused = i === focusIdx;
            return (
              <div
                key={n.label + i}
                className={`flex items-baseline gap-1.5 whitespace-nowrap transition-all duration-700
                  ${focused ? "opacity-100 scale-[1.02]" : "opacity-55"}`}
              >
                <span className={`font-display font-bold text-[13px] sm:text-[15px] ${toneOf(n.value)}`}>
                  {n.value}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-foreground/60 max-w-[22ch] truncate">
                  {n.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default HorizonRail;
