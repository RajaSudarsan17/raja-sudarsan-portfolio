import { Award } from "lucide-react";
import { Card, Depth, Scramble, certifications, skills } from "@raja/shared";
import { PageShell, Tag } from "./PageShell";

export function Skills() {
  return (
    <PageShell
      word="Skills"
      label="Skills & Certifications"
      heading="MERN at the core, data skills on top."
      lead="The stack I build with, and the analytics tools I use to understand what I build."
    >
      <Depth>
        <Card className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-center">
            <div>
              <p className="label text-[10px] text-accent mb-4">Core stack / 1 year professional</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight"><Scramble text="M.E.R.N" /></h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["MongoDB", "Express.js", "React", "Node.js"].map((s) => (
                <div key={s} className="border-t border-white/15 pt-3 text-lg font-medium">{s}</div>
              ))}
            </div>
          </div>
        </Card>
      </Depth>

      <Depth className="mt-20 max-w-6xl">
        <p className="label text-[10px] text-gray-500 mb-6" data-swarm>Full toolkit</p>
        <div className="border-t border-white/10">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="grid gap-4 md:grid-cols-[220px_1fr] border-b border-white/10 py-7" data-swarm>
              <h3 className="text-lg font-medium"><Scramble text={group} /></h3>
              <div className="flex flex-wrap gap-2">{items.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            </div>
          ))}
        </div>
      </Depth>

      <Depth className="mt-24 max-w-6xl">
        <p className="label text-[10px] text-gray-500 mb-6" data-swarm>Certifications</p>
        <ul className="grid md:grid-cols-2 border-t border-white/10">
          {certifications.map((c) => (
            <li key={c.name} className="flex items-start gap-4 border-b border-white/10 py-6 pr-6" data-swarm>
              <Award size={20} strokeWidth={1.3} className="text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-medium leading-snug"><Scramble text={c.name} /></h3>
                <p className="label text-[9px] text-gray-500 mt-2">{c.issuer}</p>
              </div>
            </li>
          ))}
        </ul>
      </Depth>
    </PageShell>
  );
}
