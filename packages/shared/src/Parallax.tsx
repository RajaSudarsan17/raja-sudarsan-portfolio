import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/** 3D zoom on scroll: block tilts in from depth, settles, then pushes slightly toward the viewer on exit. */
export function Depth({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const small = typeof matchMedia !== "undefined" && matchMedia("(max-width: 767px)").matches;
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], small ? [0.95, 1, 1, 1] : [0.88, 1, 1, 1.05]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], small ? [4, 0, 0, 0] : [9, 0, 0, -4]);
  const y = useTransform(scrollYProgress, [0, 0.3], small ? [30, 0] : [70, 0]);
  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div style={{ scale, rotateX, y, transformOrigin: "50% 40%" }}>{children}</motion.div>
    </div>
  );
}

const rings = [
  { top: "12%", left: "8%", size: 240, speed: 0.55 },
  { top: "70%", left: "78%", size: 360, speed: 0.4 },
  { top: "130%", left: "20%", size: 180, speed: 0.7 },
  { top: "210%", left: "70%", size: 300, speed: 0.5 },
];

function Layer({ speed, mx, children }: { speed: number; mx: number; children: ReactNode }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => -v * speed);
  const px = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 18 });
  const py = useMotionValue(0);
  const sy = useSpring(py, { stiffness: 40, damping: 18 });
  useEffect(() => {
    const f = (e: PointerEvent) => { px.set((e.clientX / innerWidth - 0.5) * mx); py.set((e.clientY / innerHeight - 0.5) * mx); };
    addEventListener("pointermove", f, { passive: true });
    return () => removeEventListener("pointermove", f);
  }, [px, py, mx]);
  const yy = useTransform([y, sy], ([a, b]: number[]) => a + b);
  return <motion.div style={{ y: yy, x: sx }} className="absolute inset-x-0 top-0 h-[320vh]">{children}</motion.div>;
}

/** Fixed layered backdrop: grid (far), outlined page word (mid), rings and crosses (near). Each moves at its own speed. */
export function Backdrop({ word }: { word: string }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Layer speed={0.06} mx={-8}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      </Layer>
      <Layer speed={0.22} mx={-22}>
        <p className="absolute left-[-2vw] top-[22vh] whitespace-nowrap font-medium uppercase leading-none tracking-[-0.05em]" style={{ fontSize: "22vw", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}>
          {word}
        </p>
        <p className="absolute right-[-4vw] top-[150vh] whitespace-nowrap font-medium uppercase leading-none tracking-[-0.05em]" style={{ fontSize: "16vw", color: "transparent", WebkitTextStroke: "1px rgba(200,255,61,0.10)" }}>
          {word}
        </p>
      </Layer>
      <Layer speed={0.5} mx={-46}>
        {rings.map((r, i) => (
          <div key={i} className="absolute rounded-full border border-[#c8ff3d]/15" style={{ top: r.top, left: r.left, width: r.size, height: r.size }}>
            <div className="absolute inset-[18%] rounded-full border border-white/10" />
          </div>
        ))}
        {[["30%", "62%"], ["95%", "12%"], ["175%", "55%"]].map(([t, l], i) => (
          <span key={i} className="absolute font-mono text-2xl text-[#c8ff3d]/40" style={{ top: t, left: l }}>+</span>
        ))}
      </Layer>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,#0a0a0a_100%)]" />
    </div>
  );
}
