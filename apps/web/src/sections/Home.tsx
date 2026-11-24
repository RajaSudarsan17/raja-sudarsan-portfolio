import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Download, X } from "lucide-react";
import { Card, Depth, ErrorBoundary, Scramble, profile, projects, routes, stats, useInView } from "@raja/shared";
import { useRouter } from "../router";

// 3D career island: own lazy chunk (three + r3f + island model). Fixed background; interactive at the last section.
const WorldScene = lazy(() => import("@raja/world-3d"));

const chapters = routes.filter((r) => r.key !== "home");
const pins = chapters.map((r) => ({ id: r.path, label: r.pin, sub: r.sub, kind: r.kind! }));

export function Home() {
  const { navigate } = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const view = useRef({ flat: 0, bg: 1, page: 0 });
  const worldRef = useRef<HTMLElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const [stickyRef, inView] = useInView<HTMLDivElement>("0px");
  const [ready, setReady] = useState(false);

  // Start the heavy 3D download only after the first paint and an idle moment.
  useEffect(() => {
    const go = () => setReady(true);
    const ric = (window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const id = ric ? ric(go, { timeout: 2500 }) : window.setTimeout(go, 1200);
    return () => { if (!ric) clearTimeout(id); };
  }, []);
  const chapter = chapters.find((c) => c.path === selected) ?? null;

  useEffect(() => { if (!inView) setSelected(null); }, [inView]);

  // The island is a fixed background until the world section arrives (bg 1 -> 0),
  // then it flattens as you scroll through that section (flat 0 -> 1).
  useEffect(() => {
    const f = () => {
      const el = worldRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const v = view.current;
      v.flat = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      v.bg = Math.min(1, Math.max(0, r.top / (innerHeight * 0.9)));
      v.page = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      if (dimRef.current) dimRef.current.style.opacity = String(0.62 * v.bg);
    };
    f();
    addEventListener("scroll", f, { passive: true });
    addEventListener("resize", f);
    return () => { removeEventListener("scroll", f); removeEventListener("resize", f); };
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  return (
    <div className="relative bg-[#0a0a0a] text-white">
      {/* Fixed island: dimmed background for the whole page, interactive once the world section is reached. */}
      <div className={`fixed inset-0 z-0 ${inView ? "" : "pointer-events-none"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,#22331a_0%,#0a0a0a_70%)]" />
        <div className="absolute inset-0">
          <ErrorBoundary>
            <Suspense fallback={null}>
              {ready && <WorldScene pins={pins} selected={selected} onSelect={setSelected} view={view.current} active />}
            </Suspense>
          </ErrorBoundary>
        </div>
        <div ref={dimRef} className="pointer-events-none absolute inset-0 bg-[#0a0a0a]" style={{ opacity: 0.62 }} />
      </div>

      <div className="relative z-10 pointer-events-none [&>section]:pointer-events-auto">
        {/* Hero */}
        <section className="min-h-screen flex items-end px-6 md:px-16 pt-36 pb-14">
          <div className="w-full">
            <p className="label text-gray-400 mb-6" data-swarm>
              <span className="text-accent">01</span> &nbsp; {profile.title} / KIAQ / Chennai
            </p>
            <h1 className="font-medium uppercase tracking-[-0.04em] leading-[0.85] text-[clamp(3rem,10vw,9rem)]" data-swarm>
              <Scramble text={"RAJA\nSUDARSAN"} duration={1400} />
            </h1>
            <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <p className="max-w-lg text-lg text-gray-300 leading-relaxed" data-swarm>{profile.tagline}</p>
              <div className="flex flex-col items-start md:items-end gap-5">
                <a href={profile.resume} download data-swarm className="group relative overflow-hidden inline-flex items-center gap-2 rounded-md bg-accent text-black px-6 py-3.5 text-[15px] font-medium">
                  <span className="absolute inset-0 bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <Download size={16} className="relative" /> <span className="relative">Resume</span>
                </a>
                <p className="label text-[10px] text-gray-500" data-swarm>Scroll down to the interactive world</p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro + numbers */}
        <section className="px-6 md:px-16 py-28 md:py-40">
          <Depth>
            <p className="label text-gray-500 mb-6" data-swarm>[ <span>02</span> ] <Scramble text="At a glance" className="font-bold text-white" /></p>
            <h2 className="text-[1.9rem] md:text-[3.4rem] leading-[1.12] font-medium tracking-tight max-w-4xl" data-swarm>
              <Scramble text="One year of client delivery, plus products I built end to end." />
            </h2>
            <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 max-w-5xl">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-white/20 pt-4" data-swarm>
                  <dt className="text-3xl md:text-4xl font-medium text-accent"><Scramble text={s.value} /></dt>
                  <dd className="label text-[9px] text-gray-400 mt-3 leading-relaxed">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Depth>
        </section>

        {/* Featured long cards */}
        <section className="px-6 md:px-16 pb-28 md:pb-40">
          <Depth>
            <p className="label text-gray-500 mb-8" data-swarm>[ <span>03</span> ] <Scramble text="Featured products" className="font-bold text-white" /></p>
          </Depth>
          <div className="space-y-6 max-w-6xl">
            {projects.slice(0, 3).map((p, i) => (
              <Depth key={p.name}>
                <Card onClick={() => navigate("/work")}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="lg:max-w-xl">
                      <p className="label text-[10px] text-accent">0{i + 1} / {p.kicker}</p>
                      <h3 className="mt-4 text-2xl md:text-3xl font-medium tracking-tight"><Scramble text={p.name} /></h3>
                      <p className="mt-3 text-gray-400 leading-relaxed">{p.summary}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="hidden md:flex flex-wrap gap-2 max-w-xs">
                        {p.stack.slice(0, 4).map((s) => <span key={s} className="label text-[9px] border border-white/15 rounded-full px-3 py-1.5 text-gray-300">{s}</span>)}
                      </div>
                      <ArrowUpRight className="text-gray-500 group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </Card>
              </Depth>
            ))}
          </div>
        </section>

        {/* Chapter list */}
        <section className="px-6 md:px-16 pb-28 md:pb-40">
          <Depth>
            <p className="label text-gray-500 mb-8" data-swarm>[ <span>04</span> ] <Scramble text="Step inside" className="font-bold text-white" /></p>
            <ul className="max-w-6xl border-t border-white/15">
              {chapters.map((c, i) => (
                <li key={c.path} className="border-b border-white/15" data-swarm>
                  <button onClick={() => navigate(c.path)} className="group w-full flex items-center justify-between py-7 text-left">
                    <span className="flex items-baseline gap-6">
                      <span className="label text-[10px] text-gray-500">0{i + 1}</span>
                      <span className="text-2xl md:text-5xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">{c.title}</span>
                    </span>
                    <ArrowRight className="text-gray-500 group-hover:text-accent group-hover:translate-x-2 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </Depth>
        </section>

        {/* Last section: the interactive island. It sits alone, so nothing overlaps it. */}
        <section ref={worldRef} id="world" className="!pointer-events-none relative h-[240vh]">
          <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
            <div className="pointer-events-none absolute left-6 md:left-16 bottom-14 max-w-[15rem] md:max-w-xs rounded-xl bg-black/50 backdrop-blur-sm p-4">
              <p className="label text-gray-500 mb-3">[ <span>05</span> ] <span className="font-bold text-white">The world</span></p>
              <p className="text-xs text-gray-400 leading-relaxed">Drag to rotate. Click a building for a summary, then open its page. Keep scrolling and the island flattens into a map.</p>
            </div>
            <p className="pointer-events-none absolute right-6 md:right-16 bottom-3 md:bottom-5 label text-[8px] md:text-[9px] text-gray-600 text-right max-w-[11rem] md:max-w-none">3D model: Fox's islands by nimzu, CC-BY-4.0</p>
          </div>
        </section>
      </div>

      {/* Summary card for the selected building */}
      <AnimatePresence>
        {chapter && (
          <motion.aside
            key={chapter.path}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-40 right-4 left-4 bottom-4 md:left-auto md:right-12 md:bottom-12 md:w-[400px] rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-xl p-7 shadow-2xl"
          >
            <button onClick={() => setSelected(null)} aria-label="Close" className="absolute right-4 top-4 text-gray-500 hover:text-white"><X size={18} /></button>
            <p className="label text-[10px] text-accent mb-3">{chapter.pin} / {chapter.sub}</p>
            <h3 className="text-2xl font-medium tracking-tight">{chapter.title}</h3>
            <p className="mt-3 text-gray-300 leading-relaxed text-sm">{chapter.summary}</p>
            <ul className="mt-5 space-y-2 text-sm text-gray-400">
              {chapter.highlights?.map((h) => (
                <li key={h} className="flex gap-3"><span className="text-accent">+</span>{h}</li>
              ))}
            </ul>
            <button onClick={() => navigate(chapter.path)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent text-black px-6 py-3 text-sm font-medium hover:bg-white transition-colors duration-300">
              Open {chapter.title.replace("Selected ", "")} page <ArrowRight size={16} />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
