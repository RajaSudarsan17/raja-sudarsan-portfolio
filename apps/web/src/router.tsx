import { createContext, useCallback, useContext, useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

type Ctx = { path: string; navigate: (to: string) => void; covering: boolean };
const RouterCtx = createContext<Ctx>({ path: "/", navigate: () => {}, covering: false });

const COVER_MS = 520;

/** Tiny History-API router. No dependency; the wipe overlay lives in App. */
export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => location.pathname.replace(/\/$/, "") || "/");
  const [covering, setCovering] = useState(false);

  const navigate = useCallback((to: string) => {
    if (to === path) return;
    setCovering(true);
    setTimeout(() => {
      history.pushState(null, "", to);
      setPath(to);
      window.scrollTo(0, 0);
      setCovering(false);
    }, COVER_MS);
  }, [path]);

  useEffect(() => {
    const onPop = () => setPath(location.pathname.replace(/\/$/, "") || "/");
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);

  return <RouterCtx.Provider value={{ path, navigate, covering }}>{children}</RouterCtx.Provider>;
}

export const useRouter = () => useContext(RouterCtx);

export function Link({ to, onClick, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRouter();
  return (
    <a
      {...rest}
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
    />
  );
}
