import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { profile, routes } from "@raja/shared";
import { Link, useRouter } from "../router";

export function Header() {
  const [open, setOpen] = useState(false);
  const { path } = useRouter();
  const sub = routes.filter((r) => r.key !== "home");
  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
      <div className="flex items-center justify-between px-6 md:px-16 py-5">
        <Link to="/" className="label font-medium flex items-center gap-2">
          {path !== "/" && <ArrowLeft size={14} />} RS<span className="text-accent">/</span>{path === "/" ? "Data" : "World"}
        </Link>
        <nav className="hidden md:flex gap-8 label">
          {sub.map((r) => (
            <Link key={r.path} to={r.path} className={`underline-offset-4 hover:underline ${path === r.path ? "underline" : ""}`}>{r.title.replace("Selected ", "")}</Link>
          ))}
          <a href={profile.resume} download className="underline underline-offset-4">Resume</a>
        </nav>
        <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="md:hidden flex flex-col gap-[6px]">
          <span className={`w-8 h-[1.5px] bg-white transition-transform duration-300 ${open ? "translate-y-[3.75px] rotate-45" : ""}`} />
          <span className={`w-8 h-[1.5px] bg-white transition-transform duration-300 ${open ? "-translate-y-[3.75px] -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="md:hidden px-6 pb-8 pt-2 space-y-6 label">
          {sub.map((r) => (
            <Link key={r.path} to={r.path} onClick={() => setOpen(false)} className="block">{r.title}</Link>
          ))}
          <a href={profile.resume} download className="block underline">Resume</a>
        </nav>
      )}
    </header>
  );
}
