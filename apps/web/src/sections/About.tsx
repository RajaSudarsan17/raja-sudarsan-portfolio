import { ArrowUpRight } from "lucide-react";
import { Card, Depth, Scramble, education, profile, projects, stats } from "@raja/shared";
import { PageShell, Tag } from "./PageShell";

export function About() {
  const paper = projects.find((p) => p.name === "Smart Retail AI")!;
  return (
    <PageShell word="About" label="About" heading="Full-stack by trade, data-minded by habit.">
      <Depth>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] max-w-6xl">
          <p className="text-lg md:text-xl leading-[1.75] text-gray-300" data-swarm>{profile.summary}</p>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 content-start">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-white/15 pt-4" data-swarm>
                <dt className="text-3xl md:text-4xl font-medium text-accent"><Scramble text={s.value} /></dt>
                <dd className="label text-[9px] text-gray-400 mt-3 leading-relaxed">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Depth>

      <Depth className="mt-24 max-w-6xl">
        <p className="label text-[10px] text-gray-500 mb-6" data-swarm>Education</p>
        <ol className="border-t border-white/10">
          {education.map((e) => (
            <li key={e.name} className="grid gap-2 md:grid-cols-[180px_1fr] border-b border-white/10 py-7" data-swarm>
              <span className="label text-[10px] text-gray-500 pt-1">{e.when}</span>
              <div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight"><Scramble text={e.name} /></h3>
                <p className="text-gray-400 mt-1">{e.place}</p>
              </div>
            </li>
          ))}
        </ol>
      </Depth>

      <Depth className="mt-24">
        <Card className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
            <div>
              <p className="label text-[10px] text-accent mb-4">Research / {paper.kicker}</p>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight"><Scramble text="IEEE-published co-author" /></h3>
              <p className="mt-4 text-gray-400 leading-relaxed">{paper.summary}</p>
              <a href={paper.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 label text-[10px] text-accent hover:underline underline-offset-4">
                {paper.cta} <ArrowUpRight size={14} />
              </a>
            </div>
            <div>
              <ul className="space-y-3 text-sm text-gray-300 leading-relaxed">
                {paper.points.map((pt) => <li key={pt} className="flex gap-3"><span className="text-accent">+</span>{pt}</li>)}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">{paper.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            </div>
          </div>
        </Card>
      </Depth>
    </PageShell>
  );
}
