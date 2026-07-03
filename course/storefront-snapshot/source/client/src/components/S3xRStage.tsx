import { useEffect, useMemo, useRef, useState } from "react";

/**
 * S3xR Stage — Pure SVG projection of S^3 via stereographic projection + quaternion action
 *
 * Features:
 * 1) Hopf fibration fibers - linked circles from S³
 * 2) Quaternionic coordinate plane grids - shows i, j, k planes transforming
 * 3) Sphere particle shell
 * 4) Modes to toggle visibility
 * 5) Live quaternion HUD
 *
 * No external deps beyond React. GPU-free.
 */

export default function S3xRStage() {
  const W = 1400;
  const H = 700;
  const FOV = 700;

  const [mode, setMode] = useState("Sphere");
  const [showGrids, setShowGrids] = useState(true);
  const [count, setCount] = useState(500);
  const [gridDensity, setGridDensity] = useState(20);
  const [spin, setSpin] = useState(0.7);
  const [paused, setPaused] = useState(false);

  const spherePts = useMemo(() => fibonacciSphere(count), [count]);

  const tRef = useRef(0);
  const lastRef = useRef(performance.now());
  const qRef = useRef([1, 0, 0, 0]);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const now = performance.now();
      const dt = Math.max(0, (now - lastRef.current) / 1000);
      lastRef.current = now;
      if (!paused) {
        tRef.current += dt;
        const ax = 0.4 + 0.2 * Math.sin(0.7 * tRef.current);
        const ay = 0.6 + 0.2 * Math.cos(0.5 * tRef.current);
        const az = 0.8 + 0.2 * Math.sin(0.9 * tRef.current + 1.6);
        const qd = axisAngleToQuat([ax, ay, az], spin * dt);
        qRef.current = normalizeQuat(mulQuat(qd, qRef.current));
      }
      setFrame(f => f + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [spin, paused]);

  const gridPlanes = useMemo(() => {
    const q = qRef.current;
    const planes = [
      { name: "i-j", color: "#ff6b6b", idx1: 1, idx2: 2 },
      { name: "i-k", color: "#51cf66", idx1: 1, idx2: 3 },
      { name: "j-k", color: "#4dabf7", idx1: 2, idx2: 3 },
    ];

    const allDots = [];
    const range = 2.4;
    const step = (2 * range) / gridDensity;

    for (const plane of planes) {
      for (let i = 0; i <= gridDensity; i++) {
        for (let j = 0; j <= gridDensity; j++) {
          const u1 = -range + i * step;
          const u2 = -range + j * step;

          const qPt = [0, 0, 0, 0];
          qPt[plane.idx1] = u1;
          qPt[plane.idx2] = u2;

          const qRot = mulQuat(q, qPt);
          const v3 = [qRot[1], qRot[2], qRot[3]];

          const scaleGrid = 180;
          const zOffset = 400;
          const xyz = [v3[0] * scaleGrid, v3[1] * scaleGrid, v3[2] * scaleGrid + zOffset];
          const persp = FOV / (FOV + xyz[2]);
          const x2 = xyz[0] * persp + W / 2;
          const y2 = xyz[1] * persp + H / 2;

          allDots.push({ x: x2, y: y2, color: plane.color, r: 2.2 * persp });
        }
      }
    }

    return allDots;
  }, [frame, gridDensity, W, FOV]);

  const wireframeLines = useMemo(() => {
    const q = qRef.current;
    const R = 180 * 0.95;
    const projected = [];

    for (let i = 0; i < spherePts.length; i++) {
      const p = spherePts[i];
      const v3 = rotateVecByQuat(p, q);
      const v = [v3[0] * R, v3[1] * R, v3[2] * R + 400];
      const persp = FOV / (FOV + v[2]);
      const x2 = v[0] * persp + W / 2;
      const y2 = v[1] * persp + H / 2;
      projected.push({ x: x2, y: y2, z: v[2], idx: i });
    }

    const lines = [];
    const threshold = 35;

    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < threshold) {
          lines.push({
            x1: projected[i].x,
            y1: projected[i].y,
            x2: projected[j].x,
            y2: projected[j].y,
            z: (projected[i].z + projected[j].z) / 2
          });
        }
      }
    }

    lines.sort((a, b) => a.z - b.z);
    return lines;
  }, [frame, spherePts, W, FOV]);

  const [qw, qx, qy, qz] = qRef.current;

  return (
    <div style={styles.wrap}>
      <svg width={W} height={H} style={styles.svg}>
        <rect x={0} y={0} width={W} height={H} fill="#000000" />

        {showGrids && (
          <g opacity={1.0}>
            {gridPlanes.map((dot, i) => (
              <circle key={`grid-${i}`} cx={dot.x} cy={dot.y} r={dot.r * 1.125} fill={dot.color} />
            ))}
          </g>
        )}

        {mode === "Sphere" && (
          <g opacity={0.8} stroke="white" strokeWidth={0.8} fill="none">
            {wireframeLines.map((line, i) => (
              <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
            ))}
          </g>
        )}

        <text x={16} y={28} fill="#a9bcd4" fontFamily="ui-monospace, SFMono-Regular" fontSize={14}>
          Critical Sphere | mode {mode} | grids {showGrids ? 'ON' : 'OFF'}
        </text>
      </svg>

      <div style={styles.panel}>
        <h2 style={styles.title}>The Critical Sphere</h2>
        <div style={styles.controls}>
          <label style={styles.label}>mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={styles.select} data-testid="select-mode">
            <option>Sphere</option>
            <option>Grids Only</option>
          </select>

          <label style={styles.label}>
            <input
              type="checkbox"
              checked={showGrids}
              onChange={(e) => setShowGrids(e.target.checked)}
              data-testid="checkbox-grids"
            /> show coordinate grids
          </label>

          {showGrids && (
            <>
              <label style={styles.label}>grid density: {gridDensity}</label>
              <input
                type="range"
                min={8}
                max={36}
                step={2}
                value={gridDensity}
                onChange={(e)=>setGridDensity(parseInt(e.target.value))}
                style={styles.slider}
                data-testid="input-grid-density"
              />
            </>
          )}

          <label style={styles.label}>sphere pts: {count}</label>
          <input type="range" min={200} max={2500} step={50} value={count} onChange={(e)=>setCount(parseInt(e.target.value))} style={styles.slider} data-testid="input-sphere-pts"/>

          <label style={styles.label}>spin: {spin.toFixed(2)} rad/s</label>
          <input type="range" min={0} max={2} step={0.02} value={spin} onChange={(e)=>setSpin(parseFloat(e.target.value))} style={styles.slider} data-testid="input-spin"/>

          <button onClick={()=>setPaused(p=>!p)} style={styles.button} data-testid="button-pause">{paused?"Resume":"Pause"}</button>
        </div>
        <div style={styles.readout}>
          <code data-testid="text-quaternion">q = [{qw.toFixed(3)}, {qx.toFixed(3)}, {qy.toFixed(3)}, {qz.toFixed(3)}]</code>
        </div>
      </div>
    </div>
  );
}

function cartToSph([x, y, z]: number[]) {
  const r = Math.hypot(x, y, z) || 1;
  const theta = Math.acos(Math.min(1, Math.max(-1, z / r)));
  const phi = Math.atan2(y, x);
  return [theta, phi < 0 ? phi + 2*Math.PI : phi];
}

function hopfToQuat(theta: number, phi: number, psi: number) {
  const cT = Math.cos(theta/2), sT = Math.sin(theta/2);
  const a = (phi + psi) / 2;
  const b = (phi - psi) / 2;
  const w = cT * Math.cos(a);
  const x = sT * Math.cos(b);
  const y = sT * Math.sin(b);
  const z = cT * Math.sin(a);
  return [w, x, y, z];
}

function stereographicProject(q: number[]) {
  const [w, x, y, z] = q;
  const denom = Math.max(1e-4, 1 - w);
  const clampMax = 3.5;
  const rawX = x / denom;
  const rawY = y / denom;
  const rawZ = z / denom;
  return [
    Math.max(-clampMax, Math.min(clampMax, rawX)),
    Math.max(-clampMax, Math.min(clampMax, rawY)),
    Math.max(-clampMax, Math.min(clampMax, rawZ))
  ];
}

function mulQuat(a: number[], b: number[]) {
  const [aw, ax, ay, az] = a;
  const [bw, bx, by, bz] = b;
  return [
    aw * bw - ax * bx - ay * by - az * bz,
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
  ];
}

function normalizeQuat(q: number[]) {
  const [w, x, y, z] = q;
  const s = Math.hypot(w, x, y, z) || 1;
  return [w/s, x/s, y/s, z/s];
}

function axisAngleToQuat(axis: number[], angle: number) {
  let [x, y, z] = axis;
  const n = Math.hypot(x, y, z) || 1;
  x /= n; y /= n; z /= n;
  const s = Math.sin(angle/2);
  return [Math.cos(angle/2), x*s, y*s, z*s];
}

function rotateVecByQuat(v: number[], q: number[]) {
  const [w, x, y, z] = q;
  const vw = 0, vx = v[0], vy = v[1], vz = v[2];
  const qi = [w, -x, -y, -z];
  const t = mulQuat(q, [vw, vx, vy, vz]);
  const r = mulQuat(t, qi);
  return [r[1], r[2], r[3]];
}

function fibonacciSphere(n: number) {
  const pts = new Array(n);
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y*y));
    const theta = phi * i;
    pts[i] = [Math.cos(theta)*r, y, Math.sin(theta)*r];
  }
  return pts;
}

function pathFromPoints(pts: number[][]) {
  if (!pts.length) return "";
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
  }
  return d;
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 16,
    padding: 12,
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system",
    background: "#0b0f1a",
    color: "#e6edf6",
  },
  panel: {
    background: "#0f1525",
    border: "1px solid #1b2540",
    borderRadius: 14,
    padding: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  title: { margin: 0, fontSize: 18, letterSpacing: 0.3 },
  controls: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginTop: 12 },
  label: { fontSize: 13, color: "#a9bcd4" },
  select: { padding: 6, borderRadius: 8, background: "#132043", color: "#cde0ff", border: "1px solid #2a3b6a"},
  slider: { width: "100%" },
  button: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #2a3b6a",
    background: "#132043",
    color: "#cde0ff",
    cursor: "pointer",
  },
  readout: { marginTop: 10, fontFamily: "ui-monospace, SFMono-Regular", fontSize: 12, color: "#9ab" },
  svg: {
    width: "100%",
    height: "auto",
    borderRadius: 14,
    border: "1px solid #1b2540",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
};
