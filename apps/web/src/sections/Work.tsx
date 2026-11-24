import { ArrowUpRight } from "lucide-react";
import { Card, Depth, Scramble, projects } from "@raja/shared";
import { PageShell, Tag } from "./PageShell";

export function Work() {
  const featured = projects.slice(0, 3);
  const more = projects.slice(3);
  return (
    <PageShell
      word="Work"
      label="Products & Apps"
      heading="Websites, 3D experiences and management apps."
      lead="The Maxmoc and Green Boy products come first, then research and side projects."
    >
      <div className="space-y-8 max-w-6xl">
        {featured.map((p, i) => (
          <Depth key={p.name}>
            <Card>
              <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <p className="label text-[10px] text-accent">0{i + 1} / {p.kicker}</p>
                  <h2 className="mt-5 text-2xl md:text-4xl font-medium tracking-tight leading-tight"><Scramble text={p.name} /></h2>
                  <p className="mt-4 text-gray-300 leading-relaxed">{p.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 label text-[10px] text-accent hover:underline underline-offset-4">
                      {p.cta} <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
                <ul className="space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm text-gray-400 leading-relaxed"><span className="text-accent">+</span>{pt}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </Depth>
        ))}
      </div>

      <Depth className="mt-24 max-w-6xl">
        <p className="label text-[10px] text-gray-500 mb-6" data-swarm>Research and side projects</p>
        <ul className="border-t border-white/10">
          {more.map((p) => (
            <li key={p.name} className="grid gap-4 lg:grid-cols-[1fr_1.3fr] border-b border-white/10 py-9" data-swarm>
              <div>
                <p className="label text-[10px] text-gray-500">{p.kicker} / {p.year}</p>
                <h3 className="mt-3 text-xl md:text-2xl font-medium tracking-tight"><Scramble text={p.name} /></h3>
              </div>
              <div>
                <p className="text-gray-400 leading-relaxed">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">{p.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
                {p.href && (
                  <a href={p.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 label text-[10px] text-accent hover:underline underline-offset-4">
                    {p.cta} <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Depth>
    </PageShell>
  );
}
