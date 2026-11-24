import type { ReactNode } from "react";
import { Backdrop, Scramble } from "@raja/shared";

type Props = { word: string; n?: string; label: string; heading: string; lead?: string; children: ReactNode };

/** Common inner-page frame: layered parallax backdrop, scramble heading, content area. */
export function PageShell({ word, n = "01", label, heading, lead, children }: Props) {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-clip">
      <Backdrop word={word} />
      <div className="relative z-10 px-6 md:px-16 pt-36 pb-24">
        <p className="label mb-8 inline-block" data-swarm>
          [ <span className="text-gray-500">{n}</span> ] <Scramble text={label} className="font-bold" />
        </p>
        <h1 className="text-[2.4rem] md:text-[4.6rem] lg:text-[5.6rem] leading-[1.02] font-medium tracking-tight max-w-5xl" data-swarm>
          <Scramble text={heading} />
        </h1>
        {lead && <p className="mt-8 max-w-2xl text-gray-400 leading-relaxed text-base md:text-lg" data-swarm>{lead}</p>}
        <div className="mt-16">{children}</div>
      </div>
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="label text-[9px] border border-white/15 text-gray-300 rounded-full px-3.5 py-1.5">{children}</span>;
}
