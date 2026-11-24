import { useEffect, useRef } from "react";

type Agent = { label: string; color: string };

const AGENTS: Agent[] = [
  { label: "Python", color: "#c8ff3d" },
  { label: "SQL", color: "#38bdf8" },
  { label: "Power BI", color: "#fbbf24" },
  { label: "Tableau", color: "#fb7185" },
  { label: "ML", color: "#34d399" },
  { label: "EDA", color: "#f472b6" },
];

type Pt = { x: number; y: number };
type Job = { el: HTMLElement; phase: "fly" | "drag"; started: number; t0: number; dur: number };
type State = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; hold: number; target: HTMLElement | null; job: Job | null };

const PENDING = "[data-swarm]:not(.swarm-in):not([data-swarm-static])";

/**
 * Swarm rebuild. Page content starts hidden (html.swarm-on). Labelled cursors fly to each
 * [data-swarm] element, drag a selection box around it, and the element is drawn in.
 * Once everything on screen is built they follow the pointer, or wander and outline things.
 * Visual only; off on touch and reduced motion. Inspired by ruvnet/mouse-swarm and swarm-cursors.
 */
export default function Swarm({ agents = AGENTS }: { agents?: Agent[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      html.classList.remove("swarm-on");
      return;
    }
    const host = root.current;
    if (!host) return;
    const kids = Array.from(host.children) as HTMLElement[];
    const n = agents.length;
    const cur = kids.slice(0, n);
    const boxes = kids.slice(n);
    (window as unknown as { __swarmReady?: boolean }).__swarmReady = true;
    html.classList.add("swarm-on");
    host.style.opacity = "1";

    const st: State[] = agents.map((_, i) => ({ x: -80 - i * 24, y: -80, vx: 0, vy: 0, tx: 0, ty: 0, hold: 0, target: null, job: null }));
    const claimed = new Set<HTMLElement>();
    let pending: HTMLElement[] = [];
    let raf = 0, prev = performance.now();
    const timers: number[] = [];

    const onDown = () => {
      for (let i = 0; i < n; i++) {
        if (st[i].job) continue;
        const a = (i / n) * Math.PI * 2 + Math.random();
        st[i].vx += Math.cos(a) * 22; st[i].vy += Math.sin(a) * 22;
      }
    };
    addEventListener("pointerdown", onDown, { passive: true });

    const refreshPending = () => {
      pending = Array.from(document.querySelectorAll<HTMLElement>(PENDING))
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ el, r }) => r.width > 8 && r.height > 8 && r.top < innerHeight * 1.7 && r.bottom > -80 && !claimed.has(el))
        .sort((a, b) => a.r.top - b.r.top || a.r.left - b.r.left)
        .map((x) => x.el);
    };
    const pendingTimer = window.setInterval(refreshPending, 120);
    refreshPending();

    const visible = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-swarm].swarm-in, [data-swarm-static]")).filter((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom > 40 && r.top < innerHeight - 40 && r.width > 0;
      });

    const outline = (el: HTMLElement, color: string) => {
      el.style.setProperty("--swarm-c", color);
      el.classList.add("swarm-hit");
      timers.push(window.setTimeout(() => el.classList.remove("swarm-hit"), 1100));
    };

    const reveal = (i: number, job: Job) => {
      job.el.style.setProperty("--swarm-c", agents[i].color);
      job.el.classList.add("swarm-in");
      claimed.delete(job.el);
      boxes[i].style.opacity = "0";
      outline(job.el, agents[i].color);
      st[i].job = null;
    };

    const wander = (s: State) => {
      const list = visible();
      if (!list.length) { s.tx = Math.random() * innerWidth; s.ty = Math.random() * innerHeight; s.target = null; return; }
      const el = list[Math.floor(Math.random() * list.length)];
      const r = el.getBoundingClientRect();
      s.target = el;
      s.tx = r.left + Math.min(r.width, 320) * (0.2 + Math.random() * 0.7);
      s.ty = r.top + r.height * (0.3 + Math.random() * 0.4);
      s.hold = 0;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 16.67, 3); prev = now;
      for (let i = 0; i < n; i++) {
        const s = st[i];

        if (!s.job && pending.length) {
          const el = pending.shift()!;
          claimed.add(el);
          s.job = { el, phase: "fly", started: now, t0: 0, dur: 0 };
          s.target = null;
        }

        const job = s.job;
        if (job) {
          const r = job.el.getBoundingClientRect();
          if (r.width < 4 || now - job.started > 6000) { reveal(i, job); }
          else {
            const tl: Pt = { x: r.left - 6, y: r.top - 6 };
            const br: Pt = { x: r.right + 6, y: r.bottom + 6 };
            if (job.phase === "fly") {
              s.tx = tl.x; s.ty = tl.y;
              if (Math.hypot(tl.x - s.x, tl.y - s.y) < 22 || now - job.started > 1800) {
                job.phase = "drag"; job.t0 = now;
                job.dur = Math.min(1500, Math.max(750, 600 + (r.width + r.height) * 0.7));
              }
            } else {
              const p = Math.min(1, (now - job.t0) / job.dur);
              const e = 1 - Math.pow(1 - p, 3);
              s.x = tl.x + (br.x - tl.x) * e; s.y = tl.y + (br.y - tl.y) * e; s.vx = 0; s.vy = 0;
              const b = boxes[i].style;
              b.opacity = "1"; b.left = tl.x + "px"; b.top = tl.y + "px";
              b.width = Math.max(0, s.x - tl.x) + "px"; b.height = Math.max(0, s.y - tl.y) + "px";
              if (p >= 1) reveal(i, job);
            }
          }
        } else {
          const d = Math.hypot(s.tx - s.x, s.ty - s.y);
          if (!s.target || d < 14) {
            if (s.target && s.hold === 0) { outline(s.target, agents[i].color); s.hold = now + 900 + Math.random() * 1100; }
            if (!s.target || now > s.hold) wander(s);
          }
        }

        if (!s.job || s.job.phase === "fly") {
          const k = s.job ? 0.07 : 0.045;
          s.vx = (s.vx + (s.tx - s.x) * k * dt) * Math.pow(0.8, dt);
          s.vy = (s.vy + (s.ty - s.y) * k * dt) * Math.pow(0.8, dt);
          s.x += s.vx * dt; s.y += s.vy * dt;
        }
        cur[i].style.transform = `translate3d(${s.x}px,${s.y}px,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const vis = () => { if (document.hidden) cancelAnimationFrame(raf); else { prev = performance.now(); raf = requestAnimationFrame(tick); } };
    document.addEventListener("visibilitychange", vis);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(pendingTimer);
      timers.forEach(clearTimeout);
      removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", vis);
      document.querySelectorAll(".swarm-in").forEach((el) => el.classList.remove("swarm-in"));
    };
  }, [agents]);

  return (
    <div ref={root} aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 60, opacity: 0, transition: "opacity .6s" }}>
      {agents.map((a) => (
        <div key={a.label} style={{ position: "fixed", left: 0, top: 0, willChange: "transform", transform: "translate3d(-100px,-100px,0)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ display: "block", filter: "drop-shadow(0 2px 6px rgba(0,0,0,.35))" }}>
            <path d="M3 2l17 8-7 2.2L10.2 20z" fill={a.color} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span style={{ position: "absolute", left: 16, top: 14, whiteSpace: "nowrap", background: a.color, color: "#0a0a0a", font: "500 10px/1 'JetBrains Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", padding: "4px 7px", borderRadius: 999 }}>
            {a.label}
          </span>
        </div>
      ))}
      {agents.map((a) => (
        <div key={a.label + "-box"} style={{ position: "fixed", left: 0, top: 0, width: 0, height: 0, opacity: 0, transition: "opacity .7s", border: `1.5px dashed ${a.color}`, background: a.color + "14", borderRadius: 6 }} />
      ))}
    </div>
  );
}
