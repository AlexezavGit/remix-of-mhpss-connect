import { useLocation } from "react-router-dom";
import { MiniBars } from "./MiniBars";
import { contextNumbers, shortCaption } from "./metrics";

/** Page-level metrics strip: values with short captions underneath. */
const PageMetrics = () => {
  const { pathname } = useLocation();
  const items = contextNumbers(pathname);
  if (!items.length) return null;
  return (
    <section aria-label="Ключові показники" className="section-container pt-4 md:pt-6 pb-2">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-x-3 gap-y-4 border-y border-foreground/10 py-3">
        {items.map((n, i) => {
          const color =
            n.polarity === "bad" ? "hsl(var(--coral))"
            : n.polarity === "good" ? "hsl(var(--sky, 200 90% 60%))"
            : "hsl(var(--gold-bright))";
          return (
            <div key={n.label + i} className={`min-w-0 ${i > 0 ? "md:border-l md:border-foreground/10 md:pl-4" : ""}`}>
              <div className="flex items-center gap-1.5">
                <MiniBars seed={n.label} trend={n.delta} color={color} height={10} />
                <span className="font-mono font-bold text-[15px] md:text-[18px] leading-none text-foreground whitespace-nowrap">{n.value.replace("/рік", "")}</span>
                {n.delta && n.delta !== "flat" && (
                  <span style={{ color }} className="text-[10px] leading-none">{n.delta === "up" ? "▲" : "▼"}</span>
                )}
              </div>
              <div className="mt-1 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-foreground/55 truncate" title={n.label}>
                {shortCaption(n.label)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PageMetrics;
