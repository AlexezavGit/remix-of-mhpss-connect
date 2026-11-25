import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

/**
 * CylinderDial — mobile global menu as a physical rotating cylinder
 * (kinematics from "Constellation · 1b ЦИЛІНДР · ФІЗИЧНИЙ ДИСК").
 * Items sit on a rotateY drum; drag horizontally to spin, release snaps
 * to the nearest item and opens it. Tapping a visible item rotates to it.
 */
export interface DialItem { id: string; label: string; }

const DRAG_GAIN = 0.42; // deg per px, same as the reference

const CylinderDial = ({
  items,
  activeIndex,
  onSelect,
}: {
  items: DialItem[];
  activeIndex: number;
  onSelect: (i: number, tapped?: boolean) => void;
}) => {
  const n = items.length;
  const reducedMotion = useReducedMotion();
  // Wider drum on large screens; items spaced along an arc so neighbours stay readable.
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);
  useEffect(() => {
    const on = () => setWide(window.innerWidth >= 768);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  const per = wide ? 24 : 38;
  const RADIUS = wide ? 560 : 210;
  const [rot, setRot] = useState(-Math.max(0, activeIndex) * per);
  const [dragging, setDragging] = useState(false);
  const moved = useRef(false);

  useEffect(() => {
    if (activeIndex < 0 || dragging) return;
    // rotate the shortest way to the active item
    setRot((r) => {
      const target = -activeIndex * per;
      const loop = n * per;
      const k = Math.round((r - target) / loop);
      return target + k * loop;
    });
  }, [activeIndex, per, dragging]);

  const indexOf = (r: number) => {
    let i = Math.round(-r / per) % n;
    if (i < 0) i += n;
    return i;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const startX = e.clientX;
    const start = rot;
    moved.current = false;
    let last = start;
    const move = (ev: PointerEvent) => {
      const d = ev.clientX - startX;
      if (Math.abs(d) > 4) { moved.current = true; setDragging(true); }
      last = start + d * DRAG_GAIN;
      setRot(last);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      setDragging(false);
      if (!moved.current) return;
      const snapped = Math.round(last / per) * per;
      setRot(snapped);
      onSelect(indexOf(snapped));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const current = indexOf(rot);

  return (
    <div
      className="relative h-[44px] md:h-[40px] w-full overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ perspective: wide ? 1400 : 700, touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      role="tablist"
      aria-label="Глобальне меню"
    >
      {items.map((it, i) => {
        // position on the drum, wrapped so the nearest copy is shown
        let d = (i + rot / per) % n;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        const a = d * per;
        const c = Math.cos((a * Math.PI) / 180);
        const active = i === current;
        return (
          <Button
            variant="ghost"
            key={it.id}
            role="tab"
            aria-selected={active}
            onClick={() => { if (!moved.current) onSelect(i, true); }}
            className={`absolute left-1/2 top-1/2 h-8 px-1 whitespace-nowrap font-mono uppercase tracking-normal text-[13px] md:text-[14px] font-semibold
              ${active ? "text-[hsl(var(--gold-bright))]" : "text-foreground/70"}`}
            style={{
              transform: `translate(-50%,-50%) translateZ(-${RADIUS}px) rotateY(${a}deg) translateZ(${RADIUS}px)`,
              transition: dragging || reducedMotion ? "none" : "transform .34s cubic-bezier(.2,.9,.2,1), opacity .3s",
              opacity: c > 0.3 ? Math.min(1, 0.35 + c * c * 0.65) : 0,
              pointerEvents: c > 0.6 ? "auto" : "none",
              backfaceVisibility: "hidden",
            }}
          >
            {it.label}
          </Button>
        );
      })}
      {/* edge fades + centre pointer */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-background to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-background to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-6 rounded-full bg-[hsl(var(--gold-bright))]" />
    </div>
  );
};

export default CylinderDial;
