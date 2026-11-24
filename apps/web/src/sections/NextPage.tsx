import { ArrowRight } from "lucide-react";
import { Scramble, routes } from "@raja/shared";
import { Link } from "../router";

/** Footer of every inner page: leads through the story in order; the last page returns to the world. */
export function NextPage({ from }: { from: string }) {
  const order = routes.map((r) => r.path);
  const next = routes[(order.indexOf(from) + 1) % routes.length];
  const home = next.path === "/";
  return (
    <Link to={next.path} className="group relative z-10 block bg-[#0a0a0a] text-white px-6 md:px-16 py-16 md:py-24 border-t border-white/10">
      <div data-swarm className="inline-block w-full">
        <p className="label text-[10px] text-gray-500 mb-4">{home ? "Back to" : "Next chapter"}</p>
        <p className="flex items-center justify-between text-[2.2rem] md:text-[5rem] font-medium tracking-tight leading-none">
          <span className="group-hover:text-accent transition-colors duration-300"><Scramble text={home ? "The World" : next.title} /></span>
          <ArrowRight className="transition-transform duration-500 group-hover:translate-x-3" size={48} strokeWidth={1} />
        </p>
      </div>
    </Link>
  );
}
