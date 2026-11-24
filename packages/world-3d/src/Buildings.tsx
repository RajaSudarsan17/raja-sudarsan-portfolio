import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export type Kind = "school" | "office" | "factory" | "lab" | "tower";

const WALL = "#ece9e1";
const DARK = "#2b2f27";
const ACC = "#c8ff3d";
const WIN = "#ffe6a3";

const std = (color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) => (
  <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} {...extra} />
);

function School() {
  const flag = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => { flag.current.rotation.y = Math.sin(clock.elapsedTime * 3) * 0.35; });
  return (
    <group>
      <mesh position={[0, 0.3, 0]}><boxGeometry args={[1.1, 0.6, 0.8]} />{std(WALL)}</mesh>
      <mesh position={[0, 0.78, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.95, 0.5, 4]} />{std(ACC)}</mesh>
      <mesh position={[0, 0.2, 0.41]}><boxGeometry args={[0.24, 0.4, 0.02]} />{std(DARK)}</mesh>
      {[-0.38, 0.38].map((x) => (
        <mesh key={x} position={[x, 0.34, 0.41]}><boxGeometry args={[0.2, 0.2, 0.02]} />{std(WIN, { emissive: WIN, emissiveIntensity: 0.9 })}</mesh>
      ))}
      <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.015, 0.015, 0.7, 6]} />{std(DARK)}</mesh>
      <mesh ref={flag} position={[0.14, 1.42, 0]}><boxGeometry args={[0.28, 0.16, 0.01]} />{std(ACC, { emissive: ACC, emissiveIntensity: 0.4 })}</mesh>
    </group>
  );
}

function Office() {
  const beacon = useRef<THREE.Mesh>(null!);
  const wins = useRef<THREE.MeshStandardMaterial[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    (beacon.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + Math.sin(t * 4) * 0.9;
    wins.current.forEach((m, i) => { if (m) m.emissiveIntensity = 0.5 + 0.5 * Math.sin(t * 0.9 + i * 1.7) ** 2; });
  });
  let k = 0;
  return (
    <group>
      <mesh position={[0, 0.7, 0]}><boxGeometry args={[0.75, 1.4, 0.75]} />{std(WALL)}</mesh>
      {[0, 1, 2, 3].flatMap((r) => [-0.2, 0.2].map((x) => {
        const idx = k++;
        return (
          <mesh key={idx} position={[x, 0.3 + r * 0.3, 0.38]}>
            <boxGeometry args={[0.2, 0.15, 0.02]} />
            <meshStandardMaterial ref={(m) => { if (m) wins.current[idx] = m; }} color={WIN} emissive={WIN} emissiveIntensity={0.8} />
          </mesh>
        );
      }))}
      <mesh position={[0, 1.65, 0]}><cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />{std(DARK)}</mesh>
      <mesh ref={beacon} position={[0, 1.92, 0]}><sphereGeometry args={[0.06, 12, 12]} />{std("#ff4d4d", { emissive: "#ff4d4d", emissiveIntensity: 1.5 })}</mesh>
    </group>
  );
}

function Factory() {
  const gear = useRef<THREE.Group>(null!);
  const smoke = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    gear.current.rotation.y = t * 1.2;
    smoke.current.forEach((m, i) => {
      if (!m) return;
      const p = (t * 0.25 + i / 4) % 1;
      m.position.set(0.42 + p * 0.25, 1.0 + p * 0.9, 0);
      m.scale.setScalar(0.5 + p * 1.4);
      (m.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - p);
    });
  });
  return (
    <group>
      <mesh position={[0, 0.3, 0]}><boxGeometry args={[1.2, 0.6, 0.85]} />{std("#d8d4c9")}</mesh>
      {[-0.38, 0, 0.38].map((x) => (
        <mesh key={x} position={[x, 0.73, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.85, 3]} />{std(DARK)}</mesh>
      ))}
      <mesh position={[0.42, 0.85, 0]}><cylinderGeometry args={[0.09, 0.12, 0.6, 10]} />{std("#a9442f")}</mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(m) => { if (m) smoke.current[i] = m; }}>
          <sphereGeometry args={[0.09, 8, 8]} /><meshBasicMaterial color="#cfcfcf" transparent opacity={0.4} />
        </mesh>
      ))}
      <group ref={gear} position={[-0.3, 1.1, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.16, 0.04, 8, 18]} />{std(ACC, { emissive: ACC, emissiveIntensity: 0.5 })}</mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} position={[Math.cos((i / 6) * Math.PI * 2) * 0.22, 0, Math.sin((i / 6) * Math.PI * 2) * 0.22]} rotation={[0, -(i / 6) * Math.PI * 2, 0]}>
            <boxGeometry args={[0.07, 0.06, 0.07]} />{std(ACC)}
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0.18, 0.43]}><boxGeometry args={[0.4, 0.36, 0.02]} />{std(DARK)}</mesh>
    </group>
  );
}

function Lab() {
  const a = useRef<THREE.Group>(null!);
  const e = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    a.current.rotation.y = t * 0.9;
    a.current.rotation.x = Math.sin(t * 0.5) * 0.4;
    e.current.position.set(Math.cos(t * 2.6) * 0.42, 0, Math.sin(t * 2.6) * 0.42);
  });
  return (
    <group>
      <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.55, 0.6, 0.6, 16]} />{std(WALL)}</mesh>
      <mesh position={[0, 0.6, 0]}><sphereGeometry args={[0.55, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />{std("#9be7ff", { transparent: true, opacity: 0.55, roughness: 0.1 })}</mesh>
      <group ref={a} position={[0, 0.78, 0]}>
        <mesh><sphereGeometry args={[0.09, 12, 12]} />{std(ACC, { emissive: ACC, emissiveIntensity: 1 })}</mesh>
        <mesh><torusGeometry args={[0.42, 0.012, 6, 36]} />{std(ACC)}</mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.42, 0.012, 6, 36]} />{std(ACC)}</mesh>
        <mesh ref={e}><sphereGeometry args={[0.05, 8, 8]} />{std("#fff", { emissive: "#fff", emissiveIntensity: 1 })}</mesh>
      </group>
    </group>
  );
}

function Tower() {
  const dish = useRef<THREE.Group>(null!);
  const rings = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    dish.current.rotation.y = t * 1.4;
    rings.current.forEach((m, i) => {
      if (!m) return;
      const p = (t * 0.45 + i / 3) % 1;
      m.scale.setScalar(0.4 + p * 1.8);
      (m.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - p);
    });
  });
  return (
    <group>
      <mesh position={[0, 0.75, 0]}><cylinderGeometry args={[0.1, 0.22, 1.5, 10]} />{std(WALL)}</mesh>
      <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.32, 0.36, 0.4, 10]} />{std(DARK)}</mesh>
      <group ref={dish} position={[0, 1.58, 0]}>
        <mesh position={[0.14, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.2, 0.18, 14, 1, true]} />{std(ACC, { side: THREE.DoubleSide, emissive: ACC, emissiveIntensity: 0.3 })}</mesh>
      </group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(m) => { if (m) rings.current[i] = m; }} position={[0, 1.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.012, 6, 32]} /><meshBasicMaterial color={ACC} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

const MAP = { school: School, office: Office, factory: Factory, lab: Lab, tower: Tower };

export function Building({ kind, active, onClick, onHover }: { kind: Kind; active: boolean; onClick: () => void; onHover: (h: boolean) => void }) {
  const g = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const hover = useRef(false);
  const Body = MAP[kind];  useFrame((_, d) => {
    const on = hover.current || active;
    const s = on ? 1.14 : 1;
    g.current.scale.x += (s - g.current.scale.x) * Math.min(d * 8, 1);
    g.current.scale.setScalar(g.current.scale.x);
    const m = ring.current.material as THREE.MeshBasicMaterial;
    m.opacity += ((on ? 0.9 : 0.25) - m.opacity) * Math.min(d * 8, 1);
  });
  return (
    <group
      ref={g}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); hover.current = true; onHover(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { hover.current = false; onHover(false); document.body.style.cursor = ""; }}
    >
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.78, 0.86, 40]} /><meshBasicMaterial color={ACC} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} visible={false}>
        <circleGeometry args={[0.9, 16]} /><meshBasicMaterial />
      </mesh>
      <Body />
    </group>
  );
}
