import { ArrowUpRight, Download } from "lucide-react";
import { Card, Depth, Scramble, profile } from "@raja/shared";
import { PageShell } from "./PageShell";

const rows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/raja-sudarsan", href: profile.linkedin },
  { label: "Location", value: profile.location, href: "" },
];

export function Contact() {
  return (
    <PageShell word="Contact" label="Contact" heading="Let's build it." lead="Open to full-stack and software developer opportunities. Chennai, India, and remote.">
      <Depth className="max-w-5xl">
        <ul className="border-t border-white/10">
          {rows.map((r) => (
            <li key={r.label} className="border-b border-white/10" data-swarm>
              {r.href ? (
                <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group grid gap-2 md:grid-cols-[200px_1fr_auto] items-center py-8">
                  <span className="label text-[10px] text-gray-500">{r.label}</span>
                  <span className="text-xl md:text-3xl font-medium tracking-tight group-hover:text-accent transition-colors"><Scramble text={r.value} /></span>
                  <ArrowUpRight className="text-gray-500 group-hover:text-accent transition-colors" />
                </a>
              ) : (
                <div className="grid gap-2 md:grid-cols-[200px_1fr] items-center py-8">
                  <span className="label text-[10px] text-gray-500">{r.label}</span>
                  <span className="text-xl md:text-3xl font-medium tracking-tight text-gray-300">{r.value}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Depth>

      <Depth className="mt-20">
        <Card className="max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="label text-[10px] text-accent mb-3">Resume</p>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight"><Scramble text="Prefer a PDF? Take the resume." /></h3>
            </div>
            <a href={profile.resume} download className="inline-flex items-center gap-2 rounded-full bg-accent text-black px-7 py-4 text-sm font-medium hover:bg-white transition-colors duration-300 shrink-0">
              <Download size={16} /> Download resume
            </a>
          </div>
        </Card>
      </Depth>
      <p className="mt-16 label text-[10px] text-gray-600" data-swarm>© 2026 {profile.name} / 3D model: Fox's islands by nimzu, CC-BY-4.0</p>
    </PageShell>
  );
}
