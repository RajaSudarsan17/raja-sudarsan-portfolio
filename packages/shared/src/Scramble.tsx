import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\{}[]#$%&*+=-_";
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
const garble = (t: string) => t.replace(/\S/g, rand);

/**
 * Decode effect: text starts as noise, then resolves left to right.
 * Starts when its [data-swarm] ancestor is drawn in by the swarm, or when scrolled into view.
 * The real text stays in the layout (invisible), so nothing shifts while it scrambles.
 */
export function Scramble({ text, className = "", delay = 0, duration = 1100 }: { text: string; className?: string; delay?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(() => garble(text));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setOut(text); return; }
    let started = false, raf = 0, timer = 0;

    const run = () => {
      const t0 = performance.now() + delay;
      const step = (now: number) => {
        const p = Math.min(1, Math.max(0, (now - t0) / duration));
        const cut = p * text.length * 1.15;
        let s = "";
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          s += /\s/.test(c) ? c : i < cut - 2 || p >= 1 ? c : rand();
        }
        setOut(s);
        if (p < 1) raf = requestAnimationFrame(step); else setOut(text);
      };
      raf = requestAnimationFrame(step);
    };
    const go = () => { if (!started) { started = true; run(); } };

    const host = el.closest<HTMLElement>("[data-swarm]");
    const cleanups: (() => void)[] = [];
    if (host && document.documentElement.classList.contains("swarm-on")) {
      if (host.classList.contains("swarm-in")) go();
      const mo = new MutationObserver(() => { if (host.classList.contains("swarm-in")) go(); });
      mo.observe(host, { attributes: true, attributeFilter: ["class"] });
      cleanups.push(() => mo.disconnect());
      timer = window.setTimeout(go, 12000);
    } else {
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { go(); io.disconnect(); } }, { threshold: 0.2 });
      io.observe(el);
      cleanups.push(() => io.disconnect());
    }
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); cleanups.forEach((f) => f()); };
  }, [text, delay, duration]);

  return (
    <span ref={ref} className={`relative inline-block max-w-full align-top ${className}`} aria-label={text}>
      <span className="invisible whitespace-pre-line" aria-hidden="true">{text}</span>
      <span className="absolute left-0 top-0 w-full whitespace-pre-line" aria-hidden="true">{out}</span>
    </span>
  );
}
