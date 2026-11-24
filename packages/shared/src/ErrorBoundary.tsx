import { Component, type ReactNode } from "react";

/** Keeps a failing 3D scene from taking the whole page down. */
export class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err: unknown) { console.warn("3D module failed:", err); }
  render() { return this.state.failed ? (this.props.fallback ?? null) : this.props.children; }
}
