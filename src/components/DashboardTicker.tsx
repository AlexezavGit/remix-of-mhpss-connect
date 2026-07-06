import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dashboardFeed, feedGroupLabel, FeedItem } from "@/data/dashboard-feed";
import { useT } from "@/i18n";

const groups = ["needs", "resources", "providers", "macro"] as const;

const DashboardTicker = () => {
  const { t } = useT();
  const [open, setOpen] = useState<FeedItem["group"] | null>(null);

  const grouped = groups.map((g) => ({
    g,
    items: dashboardFeed.filter((i) => i.group === g),
    headline: dashboardFeed.find((i) => i.group === g),
  }));

  return (
    <div className="border-b border-border bg-card/40 backdrop-blur-sm">
      <div className="section-container py-2">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
            {t("ticker.label")}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {grouped.map(({ g, items, headline }) => (
            <button
              key={g}
              onClick={() => setOpen(open === g ? null : g)}
              className={`text-left p-2.5 rounded border transition-colors ${
                open === g
                  ? "border-accent/60 bg-accent/5"
                  : "border-border hover:border-accent/40"
              }`}
            >
              <div className="text-[9px] uppercase tracking-widest text-accent font-semibold mb-1">
                {feedGroupLabel[g]}
              </div>
              <div className="font-mono text-sm text-foreground font-bold leading-tight truncate">
                {headline?.value}
              </div>
              <div className="text-[10px] text-muted-foreground truncate">
                {headline?.label}
              </div>
              <div className="text-[9px] text-muted-foreground/70 mt-1">
                {items.length} показн. · {open === g ? "▲" : "▼"}
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-3 pb-1">
                {dashboardFeed
                  .filter((i) => i.group === open)
                  .map((item, i) => (
                    <div
                      key={i}
                      className="p-2 rounded border border-border bg-background/40"
                    >
                      <div className="font-mono text-sm text-foreground font-bold">
                        {item.value}
                      </div>
                      <div className="text-[11px] text-secondary-foreground leading-snug">
                        {item.label}
                      </div>
                      {item.hint && (
                        <div className="text-[9px] text-muted-foreground/70 mt-0.5 italic">
                          {item.hint}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="text-right">
                <a
                  href="https://dashboard.feelagain.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-accent hover:underline font-mono"
                >
                  Деталі на dashboard.feelagain.me ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardTicker;
