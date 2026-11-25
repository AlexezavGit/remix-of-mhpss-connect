import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Order matches the global menu so pages turn the same way as the drum.
const ORDER = ["/insights", "/solutions", "/users", "/consortium", "/demo"];
const sectionIndex = (p: string) => {
  const i = ORDER.findIndex((r) => p.startsWith(r));
  return i < 0 ? -1 : i;
};

/** Turns pages like faces of a cylinder when switching global sections. */
const PageCylinder = ({ children }: { children: (location: ReturnType<typeof useLocation>) => ReactNode }) => {
  const location = useLocation();
  const idx = sectionIndex(location.pathname);
  const reducedMotion = useReducedMotion();
  const [turn, setTurn] = useState({ idx, dir: 0 });
  if (turn.idx !== idx) {
    setTurn({ idx, dir: idx > turn.idx ? 1 : -1 });
  }
  const dir = turn.dir;
  const key = idx < 0 ? location.pathname : ORDER[idx];

  return (
    <div style={{ perspective: 1600, overflowX: "clip" }}>
      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.div
          key={key}
          custom={dir}
          variants={{
            enter: (d: number) => ({ rotateY: d * 28, x: `${d * 18}%`, opacity: 0 }),
            center: { rotateY: 0, x: "0%", opacity: 1 },
            exit: (d: number) => ({ rotateY: d * -28, x: `${d * -18}%`, opacity: 0 }),
          }}
          initial={reducedMotion ? false : "enter"}
          animate="center"
          exit={reducedMotion ? "center" : "exit"}
          transition={{ duration: reducedMotion ? 0 : 0.38, ease: [0.2, 0.9, 0.2, 1] }}
          style={{ transformOrigin: "50% 50% -600px" }}
          onAnimationComplete={(definition) => { if (definition === "center") window.scrollTo({ top: 0 }); }}
        >
          {children(location)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageCylinder;
