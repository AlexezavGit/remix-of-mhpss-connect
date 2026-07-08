import { usePageNavContext } from "@/context/PageNavContext";

const PageNav = () => {
  const { sections, activeId } = usePageNavContext();
  if (sections.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1.5 mt-1">
      {sections.map((s) => {
        const active = activeId === s.id;
        return (
          <button
            key={s.id}
            onClick={() => {
              const el = document.getElementById(s.id);
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-mono uppercase tracking-[0.18em] text-[11px] transition-colors
              ${active
                ? "text-[hsl(var(--gold-bright))] bg-[hsl(var(--gold-bright)/0.10)] border border-[hsl(var(--gold-bright)/0.35)]"
                : "text-foreground/60 hover:text-foreground border border-transparent"}`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
};

export default PageNav;
