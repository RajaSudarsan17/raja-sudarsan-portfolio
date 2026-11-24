import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { pathToKey, swarmThemes } from "@raja/shared";
import { RouterProvider, useRouter } from "./router";
import { Header } from "./sections/Header";
import { Home } from "./sections/Home";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Work } from "./sections/Work";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { NextPage } from "./sections/NextPage";

// Swarm is a shared micro-frontend: one lazy chunk, re-themed per page.
const Swarm = lazy(() => import("@raja/shared/swarm"));

const pages: Record<string, () => React.ReactElement> = {
  "/about": About,
  "/experience": Experience,
  "/work": Work,
  "/skills": Skills,
  "/contact": Contact,
};

function Shell() {
  const { path, covering } = useRouter();
  const Page = pages[path] as (() => React.ReactElement) | undefined;
  const key = pathToKey(Page ? path : "/");

  return (
    <>
      <Header />
      <main key={path}>
        {Page ? (
          <>
            <Page />
            <NextPage from={path} />
          </>
        ) : (
          <Home />
        )}
      </main>
      {/* Page wipe: covers on leave, lifts on arrive. */}
      <motion.div
        aria-hidden
        className="fixed inset-0 z-[55] bg-accent pointer-events-none"
        style={{ transformOrigin: covering ? "bottom" : "top" }}
        initial={false}
        animate={{ scaleY: covering ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />
      <Suspense fallback={null}>
        <Swarm key={key} agents={swarmThemes[key]} />
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  );
}
