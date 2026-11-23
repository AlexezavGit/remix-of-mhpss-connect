import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { dashboardFeed, type FeedItem } from "@/data/dashboard-feed";
import { MiniBars } from "./MiniBars";

function contextNumbers(pathname: string): FeedItem[] {
  const pick = (labels: string[]) =>
    labels
      .map((l) => dashboardFeed.find((d) => d.label.includes(l)))
      .filter(Boolean) as FeedItem[];

  if (pathname.startsWith("/solutions") || pathname.startsWith("/digital")) {
    return pick(["Українців з потребою", "Спроможність", "Прогноз. вплив на ВВП", "ROI програми", "Gap"]);
  }
  if (pathname.startsWith("/finance")) {
    return pick(["Необх. фінансування", "локалізація", "ROI програми", "MHEI", "Gap"]);
  }
  if (pathname.startsWith("/sustainability")) {
    return pick(["Приватна практика (агрегована)", "Приватна практика (статист", "% завершення", "Повернення до ефективної", "Спроможність"]);
  }
  if (pathname.startsWith("/demo") || pathname.startsWith("/login") || pathname.startsWith("/users") || pathname.startsWith("/consortium")) {
    return pick(["Українців з потребою", "Спроможність", "Прогноз. вплив на ВВП", "ROI програми", "Gap"]);
  }
  return pick(["Українців з потребою", "Спроможність", "Прогноз. вплив на ВВП", "ROI програми", "Gap"]);
}

function valueTone(v: string) {
  const s = v.toLowerCase();
  if (s.includes("tbd")) return "text-[hsl(var(--gold-bright))]";
  if (/(m|м)$/.test(s.trim())) return "text-foreground";
  if (s.includes("%")) return "text-[hsl(var(--sky,200_90%_60%))]";
  if (s.includes("$")) return "text-[hsl(var(--gold-bright))]";
  if (s.includes("×") || s.includes("→")) return "text-[hsl(var(--gold-bright))]";
  return "text-foreground";
}

function Arrow({ delta, polarity }: { delta?: FeedItem["delta"]; polarity?: FeedItem["polarity"] }) {
  if (!delta || delta === "flat") {
    return <span className="text-foreground/40 text-[10px]">–</span>;
  }
  const isUp = delta === "up";
  // For "bad" polarity, an up arrow means the problem is growing → red.
  // For "good" polarity, up = blue/green.
  const good = polarity === "good";
  const bad = polarity === "bad";
  const color = bad
    ? isUp
      ? "hsl(var(--coral))"
      : "hsl(var(--coral))"
    : good
      ? "hsl(var(--sky, 200 90% 60%))"
      : "hsl(var(--gold-bright))";
  return (
    <span style={{ color }} className="text-[11px] leading-none">
      {isUp ? "▲" : "▼"}
    </span>
  );
}

const RingTicker = () => {
  const { pathname } = useLocation();
  const items = useMemo(() => contextNumbers(pathname), [pathname]);

  return (
    <div className="flex md:grid md:grid-cols-5 gap-x-4 items-center overflow-x-auto md:overflow-visible no-scrollbar -mx-2 px-2 md:mx-0 md:px-0 w-full">
      {items.map((n, i) => {
        const tone = valueTone(n.value);
        const match = n.value.match(/^(.*?)([A-Za-zА-Яа-я%×→]+)?$/);
        const main = match?.[1]?.trim() || n.value;
        const suffix = match?.[2] || "";
        return (
          <div
            key={n.label + i}
            className={`relative flex items-center gap-2 shrink-0 min-w-max md:min-w-0 ${i > 0 ? "md:border-l md:border-foreground/10 md:pl-4" : ""}`}
          >
            <MiniBars
              seed={n.label}
              trend={n.delta}
              color={
                n.polarity === "bad"
                  ? "hsl(var(--coral))"
                  : n.polarity === "good"
                    ? "hsl(var(--sky, 200 90% 60%))"
                    : "hsl(var(--gold-bright))"
              }
              height={12}
            />
            <span className={`font-mono font-bold text-[14px] leading-none ${tone}`}>
              {main}
              {suffix && <span className="text-[11px] font-semibold ml-0.5">{suffix}</span>}
            </span>
            <Arrow delta={n.delta} polarity={n.polarity} />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 whitespace-nowrap md:truncate">
              {n.label.split("·")[0].split("(")[0].trim()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RingTicker;
