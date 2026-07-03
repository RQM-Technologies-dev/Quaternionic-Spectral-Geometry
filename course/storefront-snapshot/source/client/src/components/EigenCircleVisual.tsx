import { useEffect, useRef, useState, useMemo } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import quaternionicEquation from '@assets/Quaternionic Spinor copy_1759872863086.jpg';

interface QuaternionicState {
  name: string;
  alpha: { w: number; x: number; y: number; z: number };
  beta: { w: number; x: number; y: number; z: number };
  semiMajor: number;
  semiMinor: number;
  inclination: number;
  azimuth: number;
  omega: number;
  color: string;
}

export default function EigenCircleVisual() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(1);
  const [frame, setFrame] = useState(0);
  const [fps, setFps] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const qRef = useRef<[number, number, number, number]>([1, 0, 0, 0]);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);

  const W = 1000;
  const H = 700;
  const R = 337.5;
  const FOV = 600;

  // 10 preset quaternionic trajectories
  const quaternionicStates: QuaternionicState[] = useMemo(() => [
    {
      name: "|ψ₁⟩",
      alpha: { w: 0.707, x: 0.5, y: 0, z: 0.5 },
      beta: { w: 0.5, x: -0.5, y: 0.707, z: 0 },
      semiMajor: 1.4,
      semiMinor: 0.8,
      inclination: 30,
      azimuth: 45,
      omega: 1.0,
      color: '#ff6b9d'
    },
    {
      name: "|ψ₂⟩",
      alpha: { w: 0.866, x: 0, y: 0.5, z: 0 },
      beta: { w: 0, x: 0.866, y: 0, z: 0.5 },
      semiMajor: 1.6,
      semiMinor: 0.6,
      inclination: 60,
      azimuth: 120,
      omega: 0.8,
      color: '#4ecdc4'
    },
    {
      name: "|ψ₃⟩",
      alpha: { w: 0.5, x: 0.5, y: 0.5, z: 0.5 },
      beta: { w: 0.5, x: -0.5, y: -0.5, z: 0.5 },
      semiMajor: 1.2,
      semiMinor: 0.9,
      inclination: 45,
      azimuth: 180,
      omega: 1.2,
      color: '#95e1d3'
    },
    {
      name: "|ψ₄⟩",
      alpha: { w: 0.6, x: 0.8, y: 0, z: 0 },
      beta: { w: 0, x: 0, y: 0.6, z: 0.8 },
      semiMajor: 1.5,
      semiMinor: 0.7,
      inclination: 75,
      azimuth: 270,
      omega: 0.9,
      color: '#f38181'
    },
    {
      name: "|ψ₅⟩",
      alpha: { w: 0.577, x: 0.577, y: 0.577, z: 0 },
      beta: { w: 0.577, x: 0, y: -0.577, z: 0.577 },
      semiMajor: 1.3,
      semiMinor: 0.85,
      inclination: 90,
      azimuth: 0,
      omega: 1.1,
      color: '#aa96da'
    },
    {
      name: "|ψ₆⟩",
      alpha: { w: 0.8, x: 0.6, y: 0, z: 0 },
      beta: { w: 0.6, x: -0.8, y: 0, z: 0 },
      semiMajor: 1.7,
      semiMinor: 0.5,
      inclination: 15,
      azimuth: 90,
      omega: 0.7,
      color: '#fcbad3'
    },
    {
      name: "|ψ₇⟩",
      alpha: { w: 0.707, x: 0, y: 0.707, z: 0 },
      beta: { w: 0, x: 0.707, y: 0, z: 0.707 },
      semiMajor: 1.1,
      semiMinor: 1.0,
      inclination: 120,
      azimuth: 225,
      omega: 1.3,
      color: '#ffffd2'
    },
    {
      name: "|ψ₈⟩",
      alpha: { w: 0.447, x: 0.447, y: 0.447, z: 0.632 },
      beta: { w: 0.632, x: -0.447, y: -0.447, z: 0.447 },
      semiMajor: 1.45,
      semiMinor: 0.75,
      inclination: 50,
      azimuth: 315,
      omega: 0.95,
      color: '#a8dadc'
    },
    {
      name: "|ψ₉⟩",
      alpha: { w: 0.9, x: 0.436, y: 0, z: 0 },
      beta: { w: 0, x: 0, y: 0.9, z: 0.436 },
      semiMajor: 1.55,
      semiMinor: 0.65,
      inclination: 105,
      azimuth: 150,
      omega: 0.85,
      color: '#f1faee'
    },
    {
      name: "|ψ₁₀⟩",
      alpha: { w: 0.5, x: 0.5, y: -0.5, z: 0.5 },
      beta: { w: 0.5, x: -0.5, y: 0.5, z: -0.5 },
      semiMajor: 1.25,
      semiMinor: 0.95,
      inclination: 135,
      azimuth: 200,
      omega: 1.15,
      color: '#e63946'
    }
  ], []);

  const currentState = quaternionicStates[currentIndex];

  // Auto-cycle through states
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(0);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % quaternionicStates.length);
        setPhase(0);
        setFade(1);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [quaternionicStates.length]);

  // Fibonacci sphere points
  const spherePts = useMemo(() => {
    const pts: [number, number, number][] = [];
    const n = 1500;
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < n; i++) {
      const y = 1 - (2 * i) / (n - 1);
      const radius = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / phi;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      pts.push([x, y, z]);
    }
    return pts;
  }, []);

  // Generate base star positions (fixed in space)
  const baseStarPositions = useMemo(() => {
    const stars: Array<{ pos: [number, number, number]; r: number; opacity: number }> = [];
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 800 + Math.random() * 400;

      stars.push({
        pos: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ],
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    return stars;
  }, []);

  // Quaternion rotation
  const quatMul = (a: number[], b: number[]): number[] => {
    return [
      a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
      a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
      a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
      a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
    ];
  };

  const rotateVecByQuat = (v: [number, number, number], q: number[]): [number, number, number] => {
    const qConj = [q[0], -q[1], -q[2], -q[3]];
    const vq = [0, v[0], v[1], v[2]];
    const tmp = quatMul(q, vq);
    const res = quatMul(tmp, qConj);
    return [res[1], res[2], res[3]];
  };

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !lastMouseRef.current) return;

    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    const sensitivity = 0.01;
    const axis: [number, number, number] = [dy, dx, 0];
    const len = Math.sqrt(axis[0] ** 2 + axis[1] ** 2 + axis[2] ** 2);

    if (len > 0) {
      const normAxis: [number, number, number] = [axis[0] / len, axis[1] / len, axis[2] / len];
      const angle = len * sensitivity;
      const s = Math.sin(angle / 2);
      const dq = [Math.cos(angle / 2), normAxis[0] * s, normAxis[1] * s, normAxis[2] * s];
      qRef.current = quatMul(dq, qRef.current) as [number, number, number, number];
      setFrame(f => f + 1);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastMouseRef.current = null;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    lastMouseRef.current = null;
  };

  // Animation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let timeAcc = 0;

    const animate = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      frameCount++;
      timeAcc += dt;
      if (timeAcc > 0.5) {
        setFps(Math.round(frameCount / timeAcc));
        frameCount = 0;
        timeAcc = 0;
      }

      if (!isDragging) {
        const axis: [number, number, number] = [0.3, 1, 0.2];
        const len = Math.sqrt(axis[0] ** 2 + axis[1] ** 2 + axis[2] ** 2);
        const normAxis: [number, number, number] = [axis[0] / len, axis[1] / len, axis[2] / len];
        const angle = dt * 0.09;
        const s = Math.sin(angle / 2);
        const dq = [Math.cos(angle / 2), normAxis[0] * s, normAxis[1] * s, normAxis[2] * s];
        qRef.current = quatMul(dq, qRef.current) as [number, number, number, number];
      }

      setPhase(prev => prev + currentState.omega * dt);
      setFrame(f => f + 1);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animId);
  }, [currentState.omega, isDragging]);

  // Wireframe points (sphere stays fixed, camera rotates)
  const wireframePoints = useMemo(() => {
    const q = qRef.current;
    const projected = [];

    for (let i = 0; i < spherePts.length; i++) {
      const p = spherePts[i];
      // Sphere points stay fixed, apply camera rotation
      const v3 = rotateVecByQuat(p, q);
      const v = [v3[0] * R, v3[1] * R, v3[2] * R + 500];
      const persp = FOV / (FOV + v[2]);
      const x2 = v[0] * persp + W / 2;
      const y2 = v[1] * persp + H / 2;
      projected.push({ x: x2, y: y2, z: v[2] });
    }

    projected.sort((a, b) => a.z - b.z);
    return projected;
  }, [frame, spherePts, W, FOV]);

  // Elliptical orbit trajectory (trajectory stays fixed, camera rotates)
  const trajectoryPath = useMemo(() => {
    const q = qRef.current;
    const inclRad = (currentState.inclination * Math.PI) / 180;
    const azimRad = (currentState.azimuth * Math.PI) / 180;

    const points = [];
    const intersections = [];
    const numPoints = 300;

    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2;

      // Elliptical orbit in local coordinates
      const localX = currentState.semiMajor * Math.cos(t);
      const localY = currentState.semiMinor * Math.sin(t);
      const localZ = 0;

      // Rotate to world coordinates
      const cosIncl = Math.cos(inclRad);
      const sinIncl = Math.sin(inclRad);
      const cosAzim = Math.cos(azimRad);
      const sinAzim = Math.sin(azimRad);

      const p: [number, number, number] = [
        localX * cosAzim - localY * sinAzim * cosIncl,
        localX * sinAzim + localY * cosAzim * cosIncl,
        localY * sinIncl
      ];

      // Check intersection with Critical Sphere
      const dist = Math.sqrt(p[0] ** 2 + p[1] ** 2 + p[2] ** 2);
      if (Math.abs(dist - 1.0) < 0.1) {
        intersections.push(i);
      }

      // Trajectory stays fixed, apply camera rotation
      const v3 = rotateVecByQuat(p, q);
      const vProj = [v3[0] * R, v3[1] * R, v3[2] * R + 500];
      const persp = FOV / (FOV + vProj[2]);
      const x2 = vProj[0] * persp + W / 2;
      const y2 = vProj[1] * persp + H / 2;
      points.push({ x: x2, y: y2, dist });
    }

    // Find current position
    const currentT = phase % (Math.PI * 2);
    const currentIdx = Math.floor((currentT / (Math.PI * 2)) * numPoints);

    return { points, intersections, currentIdx };
  }, [frame, currentState, phase, W, FOV, R]);

  // Equatorial circle (EigenCircle stays fixed, camera rotates)
  const eigenCircle = useMemo(() => {
    const q = qRef.current;
    const points = [];
    const n = 200;

    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      const p: [number, number, number] = [Math.cos(angle), Math.sin(angle), 0];
      // EigenCircle stays fixed, apply camera rotation
      const v3 = rotateVecByQuat(p, q);
      const vEigen = [v3[0] * R, v3[1] * R, v3[2] * R + 500];
      const persp = FOV / (FOV + vEigen[2]);
      const x2 = vEigen[0] * persp + W / 2;
      const y2 = vEigen[1] * persp + H / 2;
      points.push({ x: x2, y: y2 });
    }

    return points;
  }, [frame, W, FOV, R]);

  // Starfield background (rotates with camera to show movement)
  const stars = useMemo(() => {
    const q = qRef.current;
    const starArray = [];

    for (const star of baseStarPositions) {
      // Rotate stars with camera (they move in background)
      const rotatedStar = rotateVecByQuat(star.pos, q);
      const v = [rotatedStar[0], rotatedStar[1], rotatedStar[2] + 500];
      const persp = FOV / (FOV + v[2]);
      const x2 = v[0] * persp + W / 2;
      const y2 = v[1] * persp + H / 2;

      // Only include stars within the visual bounds
      if (x2 >= 0 && x2 <= W && y2 >= 0 && y2 <= H) {
        starArray.push({
          x: x2,
          y: y2,
          r: star.r,
          opacity: star.opacity
        });
      }
    }
    return starArray;
  }, [frame, baseStarPositions, W, H, FOV]);

  const formatComplex = (re: number, im: number) => {
    if (re === 0 && im === 0) return '0';
    if (im === 0) return re.toFixed(3);
    if (re === 0) return `${im.toFixed(3)}i`;
    const sign = im >= 0 ? '+' : '';
    return `${re.toFixed(3)}${sign}${im.toFixed(3)}i`;
  };

  return (
    <div className="relative w-full" style={{ height: '700px' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <rect x={0} y={0} width={W} height={H} fill="#000000" />

        {/* Starfield background */}
        <g>
          {stars.map((star, i) => (
            <circle
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="white"
              opacity={star.opacity}
            />
          ))}
        </g>

        {/* Wireframe sphere - latitude/longitude points */}
        <g opacity={0.5} fill="white">
          {wireframePoints.map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r={1.5} />
          ))}
        </g>

        {/* EigenCircle (equator) */}
        <g opacity={0.8} stroke="white" strokeWidth={2.5} fill="none">
          <path d={`M ${eigenCircle.map((p, i) => `${i === 0 ? '' : 'L '}${p.x} ${p.y}`).join(' ')} Z`} />
        </g>

        {/* Elliptical trajectory with fade transition */}
        <g opacity={fade} style={{ transition: 'opacity 0.5s ease-in-out' }}>
          {/* Draw trajectory */}
          {trajectoryPath.points.map((p, i) => {
            const nextP = trajectoryPath.points[(i + 1) % trajectoryPath.points.length];

            return (
              <line
                key={i}
                x1={p.x}
                y1={p.y}
                x2={nextP.x}
                y2={nextP.y}
                stroke={currentState.color}
                strokeWidth={2.5}
                opacity={0.9}
              />
            );
          })}

          {/* Current position marker */}
          <circle
            cx={trajectoryPath.points[trajectoryPath.currentIdx]?.x}
            cy={trajectoryPath.points[trajectoryPath.currentIdx]?.y}
            r={7}
            fill={currentState.color}
            stroke="white"
            strokeWidth={2}
          />
        </g>

        {/* Quaternionic form equation image - clickable link to EigenSpinor */}
        <a href="/eigen-spinor" style={{ cursor: 'pointer' }}>
          <image
            href={quaternionicEquation}
            x="540"
            y="24"
            width="650"
            height="110"
            opacity="0.95"
          />
        </a>
      </svg>

      {/* Quaternionic Spinor Equation */}
      <div className="absolute left-4 top-4 bg-gradient-to-br from-[#0a1929] to-[#0f2438] border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm" style={{ transition: 'opacity 0.5s ease-in-out', opacity: fade }}>
        <h3 className="text-base font-semibold text-cyan-300 mb-4 text-center">Quaternionic Spinor Wavefunction</h3>
        <div className="flex justify-center">
          <BlockMath math={`\\psi_{q}\\left(\\frac{1}{2} + it\\right) = \\begin{pmatrix} ${formatComplex(currentState.alpha.w, currentState.alpha.z)} \\cdot e^{i\\omega t} \\\\ ${formatComplex(currentState.beta.y, currentState.beta.x)} \\cdot e^{-i\\omega t} \\end{pmatrix}`} />
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 text-xs text-center text-[#e7ecff]/70">
          ω = {currentState.omega.toFixed(2)} rad/s
        </div>
      </div>

      {/* State indicator */}
      <div className="absolute right-4 top-4 bg-[#0a0e1e]/90 border border-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="text-xs text-[#e7ecff]/70">State {currentIndex + 1}/10</div>
          <div className="flex gap-1">
            {quaternionicStates.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-cyan-400' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-4 bottom-4 text-xs text-[#9db3ff]/80" data-testid="text-fps">
        {fps} fps
      </div>
    </div>
  );
}
