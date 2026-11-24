import { Card, Depth, Scramble, experiences } from "@raja/shared";
import { PageShell } from "./PageShell";

export function Experience() {
  const [current, ...rest] = experiences;
  return (
    <PageShell
      word="Experience"
      label="Experience"
      heading="One year of MERN delivery, with full ownership."
      lead="Client delivery as an Associate MERN Stack Developer, 3D product websites and internal business apps, and analytics work before that."
    >
      <Depth>
        <Card className="max-w-6xl border-accent/30">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-start">
            <div>
              <p className="label text-[10px] text-accent mb-5">Current role</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight"><Scramble text={current.company} /></h2>
              <p className="mt-4 text-xl text-gray-200">{current.role}</p>
              <p className="label text-[10px] text-gray-500 mt-3">{current.period} / {current.place}</p>
              <div className="mt-8 flex gap-8">
                <div><p className="text-3xl font-medium text-accent">1 yr</p><p className="label text-[9px] text-gray-500 mt-1">Experience</p></div>
                <div><p className="text-3xl font-medium text-accent">2</p><p className="label text-[9px] text-gray-500 mt-1">Client projects</p></div>
              </div>
            </div>
            <ul className="space-y-4">
              {current.points.map((p) => (
                <li key={p} className="flex gap-4 text-base leading-relaxed text-gray-300"><span className="text-accent">+</span>{p}</li>
              ))}
            </ul>
          </div>
        </Card>
      </Depth>

      <Depth className="mt-20 max-w-6xl">
        <p className="label text-[10px] text-gray-500 mb-6" data-swarm>Earlier and independent work</p>
        <ol className="border-t border-white/10">
          {rest.map((e) => (
            <li key={e.company + e.role} className="grid gap-6 lg:grid-cols-[260px_1fr] border-b border-white/10 py-10" data-swarm>
              <div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight"><Scramble text={e.company} /></h3>
                <p className="mt-2 text-gray-200">{e.role}</p>
                <p className="label text-[10px] text-gray-500 mt-2">{e.period}</p>
              </div>
              <ul className="space-y-3">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-gray-400"><span className="text-accent">+</span>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Depth>
    </PageShell>
  );
}
