import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type PageSection = { id: string; label: string };

type Ctx = {
  sections: PageSection[];
  setSections: (s: PageSection[]) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const PageNavContext = createContext<Ctx | null>(null);

export const PageNavProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <PageNavContext.Provider value={{ sections, setSections, activeId, setActiveId }}>
      {children}
    </PageNavContext.Provider>
  );
};

export const usePageNavContext = () => {
  const ctx = useContext(PageNavContext);
  if (!ctx) throw new Error("usePageNavContext must be inside PageNavProvider");
  return ctx;
};

/** Register local page sections for the CopperRing local nav row. */
export const usePageSections = (sections: PageSection[]) => {
  const { setSections, setActiveId } = usePageNavContext();
  // Stable string key so we don't re-run on every render.
  const key = sections.map((s) => `${s.id}:${s.label}`).join("|");
  useEffect(() => {
    setSections(sections);
    return () => setSections([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Scroll-spy: mark the section currently in view.
  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [],
  );
};
