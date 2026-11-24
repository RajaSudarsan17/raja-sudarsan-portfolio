import { useRef, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; onClick?: () => void; swarm?: boolean };

/** Product-style card: dark glass, accent spotlight that follows the pointer, subtle 3D tilt. */
export function Card({ children, className = "", onClick, swarm = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  const key = (e: KeyboardEvent) => { if (onClick && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onClick(); } };

  return (
    <div
      ref={ref}
      {...(swarm ? { "data-swarm": "" } : {})}
      role={onClick ? "link" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={key}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ transform: "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transition: "transform .25s ease-out, border-color .3s" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010]/85 backdrop-blur-sm p-6 md:p-8 hover:border-[#c8ff3d]/40 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(200,255,61,.10), transparent 60%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
