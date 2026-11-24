import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { Building, type Kind } from "./Buildings";
// Model: "Fox's islands" by nimzu (https://sketchfab.com/nimzuk), CC-BY-4.0.
// Taken via sanidhyy/3d_portfolio (MIT).
import islandUrl from "./island.glb?url";

export type Pin = { id: string; label: string; sub: string; kind: Kind };
export type View = { flat: number; bg: number; page: number };
type Ctl = { target: number; dragging: boolean; moved: number; hover: boolean };

const BASE = 4.7;
const RING = 2.6;
const ANCHOR = 1.9;
const FLAT = 0.12; // barely squash: the island keeps its volume
const STRETCH = 0.75; // how much wider than round it becomes // how much of the island's height is squashed away when scrolled
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function setup(loader: GLTFLoader) {
  const d = new DRACOLoader();
  d.setDecoderPath("/draco/");
  loader.setDRACOLoader(d);
}

function Driver({ view, active }: { view: View; active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    let raf = 0, last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (now - last >= (view.bg > 0.5 ? 33 : 0)) { last = now; invalidate(); }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [view, active, invalidate]);
  return null;
}

function World({ ctl, pins, labels, onSelect, selected, view }: {
  ctl: React.RefObject<Ctl>; pins: Pin[]; labels: React.RefObject<(HTMLElement | null)[]>;
  onSelect: (id: string) => void; selected: string | null; view: View;
}) {
  const bgSm = useRef(1);
  const gltf = useLoader(GLTFLoader, islandUrl, setup);
  const spin = useRef<THREE.Group>(null!);
  const squash = useRef<THREE.Group>(null!);
  const stretch = useRef<THREE.Group>(null!);
  const bGroups = useRef<(THREE.Group | null)[]>([]);
  const anchors = useRef<(THREE.Object3D | null)[]>([]);
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);

  const { scene, scale, offset, ground } = useMemo(() => {
    const s = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const sz = box.getSize(new THREE.Vector3());
    const sc = 7 / Math.max(sz.x, sz.z);
    const off = box.getCenter(new THREE.Vector3()).negate();
    // Platform height: sample the top surface around the ring and take a low percentile,
    // so trees and roofs do not lift the buildings.
    s.updateMatrixWorld(true);
    const rc = new THREE.Raycaster();
    const ys: number[] = [];
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2, r = 1.2 + (i % 4) * 0.55;
      rc.set(new THREE.Vector3((Math.cos(a) * r) / sc - off.x, 1000, (Math.sin(a) * r) / sc - off.z), new THREE.Vector3(0, -1, 0));
      const hit = rc.intersectObject(s, true)[0];
      if (hit) ys.push((hit.point.y + off.y) * sc);
    }
    ys.sort((a, b) => a - b);
    return { scene: s, scale: sc, offset: off, ground: ys.length ? ys[Math.floor(ys.length * 0.3)] : 0 };
  }, [gltf]);

  useEffect(() => {
    const c = ctl.current;
    const i = pins.findIndex((p) => p.id === selected);
    if (i < 0) return;
    const goal = (i / pins.length) * Math.PI * 2 - Math.PI / 2;
    const k = Math.round((c.target - goal) / (Math.PI * 2));
    c.target = goal + k * Math.PI * 2;
  }, [selected, pins, ctl]);

  useFrame(({ clock }, delta) => {
    const c = ctl.current;
    const t = smooth(0.04, 0.42, view.flat);
    bgSm.current += (view.bg - bgSm.current) * Math.min(delta * 4, 1);
    const bg = bgSm.current;
    const k = Math.min(delta * 4, 1);

    if (!c.dragging && !c.hover && !selected) c.target += delta * 0.05;
    // Once flattened, settle with the wide side facing the camera.
    const des = c.target + view.page * 2.6;
    const rest = Math.round(spin.current.rotation.y / (Math.PI * 2)) * Math.PI * 2;
    spin.current.rotation.y += (des + (rest - des) * t - spin.current.rotation.y) * k;
    spin.current.rotation.x += (0.1 * (1 - t) - spin.current.rotation.x) * k;
    const wide = size.width > 900;
    spin.current.position.x += ((wide ? 2.7 * bg : 0) - spin.current.position.x) * Math.min(delta * 3, 1);
    spin.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.06 * (1 - t) + (1 - t) * 0.3;
    const sx = 1 + STRETCH * t;
    const sb = 1 - 0.15 * bg;
    spin.current.scale.setScalar(sb);
    stretch.current.scale.set(sx, 1, 1);

    // The island pancakes down as you scroll; buildings drop with the ground and stay full height.
    const flatY = 1 - FLAT * t;
    squash.current.scale.y = flatY;
    pins.forEach((_, i) => {
      const g = bGroups.current[i];
      if (!g) return;
      const a = (i / pins.length) * Math.PI * 2;
      g.position.set(Math.cos(a) * RING * sx, ground * flatY, Math.sin(a) * RING);
    });

    const dist = THREE.MathUtils.clamp(6.2 / (0.344 * (size.width / size.height)), 10.5, 19);
    const cy = 4.4 + (dist * 0.5 - 4.4) * t, cz = 10.5 + (dist * 0.9 - 10.5) * t;
    camera.position.y += (cy - camera.position.y) * Math.min(delta * 3, 1);
    camera.position.z += (cz - camera.position.z) * Math.min(delta * 3, 1);
    camera.lookAt(0, 0.6, 0);

    pins.forEach((_, i) => {
      const o = anchors.current[i]; const el = labels.current[i];
      if (!o || !el) return;
      o.getWorldPosition(v);
      const facing = THREE.MathUtils.clamp((v.z / (sb * RING) + 1) / 2, 0, 1);
      const depth = facing * (1 - t) + t;
      v.project(camera);
      const x = (v.x * 0.5 + 0.5) * size.width, y = (-v.y * 0.5 + 0.5) * size.height;
      el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-100%) scale(${0.8 + depth * 0.25})`;
      const op = (0.35 + depth * 0.65) * (1 - bg);
      el.style.opacity = String(op);
      el.style.pointerEvents = op < 0.25 ? "none" : "auto";
      el.style.zIndex = String(Math.round(depth * 10));
    });
  });

  return (
    <group ref={spin} rotation={[0.1, BASE, 0]}>
      <group ref={stretch}>
        <group ref={squash}>
          <group scale={scale}><primitive object={scene} position={offset} /></group>
        </group>
      </group>
      {pins.map((p, i) => {
        const a = (i / pins.length) * Math.PI * 2;
        return (
          <group key={p.id} ref={(g) => { bGroups.current[i] = g; }} position={[Math.cos(a) * RING, ground, Math.sin(a) * RING]} rotation={[0, -a + Math.PI / 2, 0]}>
            <Building
              kind={p.kind}
              active={selected === p.id}
              onClick={() => { if (ctl.current.moved < 6) onSelect(p.id); }}
              onHover={(h) => { ctl.current.hover = h; }}
            />
            <object3D ref={(o) => { anchors.current[i] = o; }} position={[0, ANCHOR, 0]} />
          </group>
        );
      })}
    </group>
  );
}

export default function WorldScene({ pins, onSelect, selected = null, active = true, view }: {
  pins: Pin[]; onSelect: (id: string) => void; selected?: string | null; active?: boolean; view: View;
}) {
  const ctl = useRef<Ctl>({ target: BASE, dragging: false, moved: 0, hover: false });
  const labels = useRef<(HTMLElement | null)[]>([]);
  const lastX = useRef(0);

  useEffect(() => () => { document.body.style.cursor = ""; }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
      onPointerDown={(e) => { ctl.current.dragging = true; ctl.current.moved = 0; lastX.current = e.clientX; }}
      onPointerMove={(e) => {
        if (!ctl.current.dragging) return;
        const dx = e.clientX - lastX.current; lastX.current = e.clientX;
        ctl.current.target += dx * 0.008; ctl.current.moved += Math.abs(dx);
      }}
      onPointerUp={() => { ctl.current.dragging = false; }}
      onPointerLeave={() => { ctl.current.dragging = false; }}
    >
      <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 4.4, 10.5], fov: 38 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 8, 4]} intensity={2.4} />
        <hemisphereLight args={["#b1e1ff", "#1a1a1a", 1]} />
        <Driver view={view} active={active} />
        <World ctl={ctl} pins={pins} labels={labels} onSelect={onSelect} selected={selected} view={view} />
      </Canvas>

      {pins.map((p, i) => (
        <button
          key={p.id}
          ref={(el) => { labels.current[i] = el; }}
          data-swarm
          data-swarm-static
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onSelect(p.id)}
          onPointerEnter={() => { ctl.current.hover = true; }}
          onPointerLeave={() => { ctl.current.hover = false; }}
          className={`absolute left-0 top-0 text-left rounded-full border backdrop-blur-md pl-3 pr-5 py-2 transition-colors duration-300 cursor-pointer will-change-transform ${selected === p.id ? "bg-accent text-black border-accent" : "border-white/25 bg-black/55 text-white hover:bg-accent hover:text-black hover:border-accent"}`}
        >
          <span className="flex items-center gap-3">
            <span className="font-mono text-[10px] opacity-70">0{i + 1}</span>
            <span>
              <span className="block text-[13px] font-medium leading-tight">{p.label}</span>
              <span className="block font-mono text-[9px] tracking-widest uppercase opacity-60">{p.sub}</span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
