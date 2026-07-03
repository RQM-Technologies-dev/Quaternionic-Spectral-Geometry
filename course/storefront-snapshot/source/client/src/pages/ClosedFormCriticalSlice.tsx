import { useEffect, useState, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Math as MathComponent } from "@/components/Math";

/**
 * Interactive 3D visualization for the closed form of the Quaternionic Factorial Operator on the critical slice
 * using stereographic projection from S³ to ℝ³
 */

// ------------------------------ Types ------------------------------
interface Complex {
  re: number;
  im: number;
}

// ------------------------------ Complex Math Utilities ------------------------------
const C = (re = 0, im = 0): Complex => ({ re, im });

const cAdd = (a: Complex, b: Complex): Complex => C(a.re + b.re, a.im + b.im);
const cSub = (a: Complex, b: Complex): Complex => C(a.re - b.re, a.im - b.im);
const cMul = (a: Complex, b: Complex): Complex => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cDiv = (a: Complex, b: Complex): Complex => {
  const d = b.re * b.re + b.im * b.im;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const cNeg = (a: Complex): Complex => C(-a.re, -a.im);
const cAbs = (a: Complex): number => Math.hypot(a.re, a.im);
const cArg = (a: Complex): number => Math.atan2(a.im, a.re);
const cLog = (a: Complex): Complex => C(Math.log(cAbs(a)), cArg(a));
const cExp = (a: Complex): Complex => {
  const er = Math.exp(a.re);
  return C(er * Math.cos(a.im), er * Math.sin(a.im));
};
const cPow = (a: Complex, b: Complex): Complex => cExp(cMul(b, cLog(a)));
const cScalar = (s: number): Complex => C(s, 0);
const cScalarMul = (a: Complex, s: number): Complex => C(a.re * s, a.im * s);
const cSin = (z: Complex): Complex => C(Math.sin(z.re) * Math.cosh(z.im), Math.cos(z.re) * Math.sinh(z.im));

// ------------------------------ Lanczos Gamma for complex ------------------------------
const LANCZOS_P = [
  0.99999999999980993,
  676.5203681218851,
  -1259.1392167224028,
  771.32342877765313,
  -176.61502916214059,
  12.507343278686905,
  -0.13857109526572012,
  9.9843695780195716e-6,
  1.5056327351493116e-7,
];
const LANCZOS_G = 7;
const SQRT_2PI = Math.sqrt(2 * Math.PI);

function gammaComplex(z: Complex): Complex {
  // For large negative imaginary parts, avoid numerical underflow
  if (Math.abs(z.im) > 15) {
    // Use asymptotic expansion for large |Im z|
    const logGamma = cSub(
      cMul(cSub(z, C(0.5, 0)), cLog(z)),
      cAdd(z, C(-0.5 * Math.log(2 * Math.PI), 0))
    );
    return cExp(logGamma);
  }

  if (z.re < 0.5) {
    const piZ = cScalarMul(z, Math.PI);
    const sinPiZ = cSin(piZ);
    const oneMinusZ = cSub(cScalar(1), z);
    const g1mz = gammaComplex(oneMinusZ);
    return cDiv(cScalar(Math.PI), cMul(sinPiZ, g1mz));
  }

  const z1 = cSub(z, cScalar(1));
  let x = C(LANCZOS_P[0], 0);
  for (let i = 1; i < LANCZOS_P.length; i++) {
    x = cAdd(x, cDiv(C(LANCZOS_P[i], 0), cAdd(z1, cScalar(i))));
  }

  const t = cAdd(z1, cScalar(LANCZOS_G + 0.5));
  const powTerm = cPow(t, cAdd(z1, cScalar(0.5)));
  const expTerm = cExp(cNeg(t));
  const core = cMul(powTerm, expTerm);
  const res = cScalarMul(cMul(x, core), SQRT_2PI);
  return res;
}

// ◎ closed form on the critical slice
function closedForm(u: number): { A: number; B: number; M: number; Phi: number } {
  const z = C(1.5, u);
  const g = gammaComplex(z);
  return { A: g.re, B: g.im, M: cAbs(g), Phi: cArg(g) };
}

// Quaternionic stereographic projection
function projectPoint(u: number, ix: number, iy: number, iz: number) {
  const a0 = 0.5, b0 = u * ix, c0 = u * iy, d0 = u * iz;
  const r = Math.hypot(a0, b0, c0, d0);
  const a = a0 / r, b = b0 / r, c = c0 / r, d = d0 / r;
  const denom = 1 + a;
  return { x: b / denom, y: c / denom, z: d / denom, a, b, c, d };
}

// HSL to RGB conversion
function hsl2rgb(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    const col = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return col;
  };
  return [f(0), f(8), f(4)];
}

// ------------------------------ Main Component ------------------------------
export default function ClosedFormCriticalSlice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [u, setU] = useState(0);
  const [thetaSteps, setThetaSteps] = useState(28);
  const [phiSteps, setPhiSteps] = useState(56);
  const [colorMode, setColorMode] = useState('imagvec');
  const [webglError, setWebglError] = useState<string | null>(null);

  // Fixed values as requested
  const pointSize = 2.0;
  const arrowScale = 2.5;
  const arrowMode = 'imag'; // Always show imaginary direction arrows

  const cf = useMemo(() => closedForm(u), [u]);

  useEffect(() => {
    document.title = "Closed Form Critical Slice 3D - QSG Textbook";
  }, []);

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const arrowsGroupRef = useRef<THREE.Group | null>(null);

  // Initialize Three.js scene once
  useEffect(() => {
    if (!canvasRef.current) return;

    // Basic Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(1.625, 1.19, 1.625);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: false
      });
      setWebglError(null);
    } catch (error) {
      setWebglError(error instanceof Error ? error.message : "WebGL context unavailable");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Lighting
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 0.8));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(2, 3, 4);
    scene.add(directionalLight);

    // Axes helper
    const axes = new THREE.AxesHelper(1.2);
    scene.add(axes);

    // Ground grid
    const grid = new THREE.GridHelper(4, 16, 0x94a3b8, 0xe2e8f0);
    grid.position.y = -1.2;
    scene.add(grid);

    // Unit sphere wireframe
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const sphereWire = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereWire);

    // Initialize arrows group
    const arrowsGroup = new THREE.Group();
    scene.add(arrowsGroup);
    arrowsGroupRef.current = arrowsGroup;

    // Resize handler
    const handleResize = () => {
      if (!canvasRef.current || !camera || !renderer) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Animation loop
    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    // Initial setup
    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (pointsRef.current) {
        pointsRef.current.geometry.dispose();
        (pointsRef.current.material as THREE.Material).dispose();
      }
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Update visualization when any control changes
  useEffect(() => {
    if (!sceneRef.current || !arrowsGroupRef.current) return;

    const scene = sceneRef.current;
    const arrowsGroup = arrowsGroupRef.current;

    // Remove existing points and arrows
    if (pointsRef.current) {
      scene.remove(pointsRef.current);
      pointsRef.current.geometry.dispose();
      (pointsRef.current.material as THREE.Material).dispose();
    }
    arrowsGroup.clear();

    const total = thetaSteps * phiSteps;
    const pointGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);

    const cf = closedForm(u);

    let idx = 0;
    for (let i = 0; i < thetaSteps; i++) {
      const theta = (i + 0.5) / thetaSteps * Math.PI;
      const st = Math.sin(theta), ct = Math.cos(theta);

      for (let j = 0; j < phiSteps; j++) {
        const phi = j / phiSteps * 2 * Math.PI;
        const cp = Math.cos(phi), sp = Math.sin(phi);
        const ix = st * cp, iy = st * sp, iz = ct;

        const P = projectPoint(u, ix, iy, iz);
        positions[3 * idx + 0] = P.x;
        positions[3 * idx + 1] = P.y;
        positions[3 * idx + 2] = P.z;

        // Color strategies
        let r = 0.2, g = 0.2, b = 0.2;
        if (colorMode === 'imagvec') {
          const k = 0.9;
          const vx = Math.tanh(k * cf.B * ix);
          const vy = Math.tanh(k * cf.B * iy);
          const vz = Math.tanh(k * cf.B * iz);
          r = 0.5 + 0.5 * vx;
          g = 0.5 + 0.5 * vy;
          b = 0.5 + 0.5 * vz;
        } else if (colorMode === 'magnitude') {
          const m = Math.tanh(0.8 * cf.M);
          r = g = b = 0.15 + 0.85 * m;
        } else if (colorMode === 'phase') {
          const h = (cf.Phi / (2 * Math.PI) + 1) % 1;
          const s = 0.85, l = 0.55;
          [r, g, b] = hsl2rgb(h, s, l);
        }

        colors[3 * idx + 0] = r;
        colors[3 * idx + 1] = g;
        colors[3 * idx + 2] = b;

        // Optional arrows showing imaginary direction scaled by B
        if (arrowMode === 'imag') {
          // Sample arrows less densely for performance
          if (i % 4 === 0 && j % 4 === 0) {
            const dirVec = new THREE.Vector3(ix, iy, iz).normalize();
            const start = new THREE.Vector3(P.x, P.y, P.z);
            const length = Math.max(0.05, Math.abs(cf.B) * arrowScale);
            const arrowColor = new THREE.Color().setHSL((cf.Phi / (2 * Math.PI) + 1) % 1, 0.8, 0.6);

            const arrow = new THREE.ArrowHelper(
              dirVec,
              start,
              length * 1.5,
              arrowColor.getHex(),
              length * 0.1875,
              length * 0.1125
            );
            arrowsGroup.add(arrow);
          }
        }

        idx++;
      }
    }

    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointMaterial = new THREE.PointsMaterial({
      size: pointSize / 100,
      vertexColors: true,
      transparent: true,
      opacity: 0.95
    });

    const points = new THREE.Points(pointGeometry, pointMaterial);
    scene.add(points);
    pointsRef.current = points;
  }, [u, thetaSteps, phiSteps, colorMode]);

  const clamp = (x: number, a: number, b: number): number => Math.max(a, Math.min(b, x));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Quaternionic Stereographic Projection — <span className="font-mono">◎(1/2 + u·I)</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Stereographic projection of unit quaternions (points on <span className="font-mono">S³</span>) to{" "}
            <span className="font-mono">ℝ³</span> from the South pole. For the critical slice{" "}
            <span className="font-mono">q = 1/2 + u·I</span> with <span className="font-mono">||I|| = 1</span>, we
            normalize to the unit sphere and color/size points using the closed form{" "}
            <span className="font-mono" style={{letterSpacing: '0.08em'}}>◎(½+Iu) = ℜ[Γ(3/2+iu)] + Iℑ[Γ(3/2+iu)]</span>.
          </p>
        </div>

        {/* Main grid layout */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="font-semibold mb-4">Controls</h2>
            <div className="space-y-4">
              {/* Parameter u */}
              <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                <label className="text-sm font-medium">u</label>
                <input
                  type="range"
                  min={-20}
                  max={20}
                  step={0.01}
                  value={u}
                  onChange={(e) => setU(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                <label className="text-sm font-medium">u (exact)</label>
                <input
                  type="number"
                  step={0.01}
                  value={u}
                  onChange={(e) => setU(clamp(parseFloat(e.target.value), -20, 20) || 0)}
                  className="px-3 py-1 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Sampling controls */}
              <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                <label className="text-sm font-medium">θ steps</label>
                <input
                  type="number"
                  min={8}
                  max={90}
                  step={1}
                  value={thetaSteps}
                  onChange={(e) => setThetaSteps(clamp(parseInt(e.target.value, 10) || 28, 8, 90))}
                  className="px-3 py-1 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                <label className="text-sm font-medium">φ steps</label>
                <input
                  type="number"
                  min={12}
                  max={180}
                  step={1}
                  value={phiSteps}
                  onChange={(e) => setPhiSteps(clamp(parseInt(e.target.value, 10) || 56, 12, 180))}
                  className="px-3 py-1 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Visual controls */}
              <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                <label className="text-sm font-medium">Color</label>
                <select
                  value={colorMode}
                  onChange={(e) => setColorMode(e.target.value)}
                  className="px-3 py-1 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="imagvec">Imag-vector (B·I → RGB)</option>
                  <option value="magnitude">Magnitude |Γ(3/2+i·u)|</option>
                  <option value="phase">Phase arg Γ(3/2+i·u)</option>
                </select>
              </div>




              {/* Legend */}
              <div className="text-xs text-gray-500 space-y-1 mt-4">
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full font-mono mr-2">
                  Projection: (b,c,d)/(1 + a)
                </div>
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full font-mono">
                  Unit quaternion: a²+b²+c²+d²=1
                </div>
              </div>

              {/* Live readout */}
              <div className="font-mono text-xs bg-gray-100 p-3 rounded space-y-1">
                <div>u = {u.toFixed(3)}</div>
                <div>Re Γ = {cf.A.toPrecision(8)}</div>
                <div>Im Γ = {cf.B.toPrecision(8)}</div>
                <div>|Γ| = {cf.M.toPrecision(6)}</div>
                <div>arg Γ = {cf.Phi.toFixed(3)} rad</div>
              </div>
            </div>
          </div>

          {/* 3D Scene */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
            {webglError ? (
              <div className="min-h-[640px] flex items-center justify-center bg-slate-50 p-8">
                <div className="max-w-2xl text-center">
                  <div className="inline-flex rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 mb-4">
                    Quaternionic factorial route loaded
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">3D renderer unavailable</h2>
                  <p className="text-gray-600 mb-6">
                    This browser could not create a WebGL context for the interactive projection. Use a browser
                    with WebGL enabled to rotate the stereographic view; the closed-form controls and reference
                    values remain available on this page.
                  </p>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <MathComponent>
                      {String.raw`\odot\left(\frac{1}{2}+Iu\right) = \Re[\Gamma(\frac{3}{2}+iu)] + I\Im[\Gamma(\frac{3}{2}+iu)]`}
                    </MathComponent>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-left text-sm font-mono text-gray-700">
                      <div>u = {u.toFixed(3)}</div>
                      <div>|Γ| = {cf.M.toPrecision(6)}</div>
                      <div>Re Γ = {cf.A.toPrecision(8)}</div>
                      <div>Im Γ = {cf.B.toPrecision(8)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* LaTeX Formula Overlay */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-lg shadow-md border whitespace-nowrap">
                  <MathComponent>
                    {String.raw`\odot\left(\frac{1}{2}+Iu\right) = \Re[\Gamma(\frac{3}{2}+iu)] + I\Im[\Gamma(\frac{3}{2}+iu)]`}
                  </MathComponent>
                </div>
                <canvas
                  ref={canvasRef}
                  style={{ width: '100%', height: '640px', display: 'block' }}
                />
              </>
            )}
          </div>
        </div>

        {/* Math Reference */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-semibold mb-3">Math Reference</h3>
          <div className="text-gray-600 space-y-1 font-mono text-sm">
            <div>◎(q) = ∫₀^∞ e^{"{-x}"} · e^{"{q·log x}"} dx</div>
            <div style={{letterSpacing: '0.05em'}}>q = 1/2 + u·I, I∈S², ◎(½+Iu) = ℜ[Γ(3/2+iu)] + Iℑ[Γ(3/2+iu)]</div>
            <div>Normalize to S³: q̂ = (a,b,c,d) / √(a²+b²+c²+d²), with a=1/2, (b,c,d)=u·I</div>
            <div>Stereographic (South pole): Π(q̂) = (b,c,d) / (1 + a)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
