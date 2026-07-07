import { usePageNavContext } from "@/context/PageNavContext";

const PageNav = () => {
  const { sections, activeId } = usePageNavContext();
  if (sections.length === 0) return null;

  return (
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
      {sections.map((s) => {
        const active = activeId === s.id;
        return (
          <button
            key={s.id}
            onClick={() => {
              const el = document.getElementById(s.id);
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`px-2.5 py-0.5 rounded-full whitespace-nowrap font-mono uppercase tracking-[0.18em] text-[9.5px] transition-colors
              ${active
                ? "text-[hsl(var(--gold-bright))] bg-[hsl(var(--gold-bright)/0.08)]"
                : "text-foreground/55 hover:text-foreground"}`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
};

export default PageNav;
