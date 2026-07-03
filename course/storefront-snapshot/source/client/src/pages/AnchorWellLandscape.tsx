import { useState, useEffect, useRef, useMemo } from 'react';

export default function AnchorWellLandscape() {
  const m = 2;
  const [beta, setBeta] = useState(1.0);
  const [delta, setDelta] = useState(1e-4);
  const [rmax, setRmax] = useState(3.0);
  const ymax = 10.0;
  const [isDragging, setIsDragging] = useState(false);
  const [, setRotationTick] = useState(0);

  const qRef = useRef<[number, number, number, number]>([1, 0, 0, 0]);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const W2D = isMobile ? 350 : 600;
  const H2D = isMobile ? 200 : 300;
  const W3D = isMobile ? 360 : 1000;
  const H3D = isMobile ? 280 : 600;
  const FOV = 600;

  useEffect(() => {
    document.title = "Quaternionic Anchor-Well Landscape | RQM Technologies";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Interactive visualization of quaternionic anchor-well potential landscape U(r) = -β·log(sin^m(πr²/2) + δ) showing radial profile and 3D concentric isosurfaces.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  useEffect(() => {
    let animationId: number;
    let lastTime = 0;
    const frameInterval = 1000 / 30; // Cap at 30fps for performance

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);

      if (!isDragging) {
        const axis: [number, number, number] = [0.3, 1, 0];
        const len = Math.sqrt(axis[0] ** 2 + axis[1] ** 2 + axis[2] ** 2);
        const normAxis: [number, number, number] = [axis[0] / len, axis[1] / len, axis[2] / len];
        const angle = 0.008; // Slightly faster to compensate for lower fps
        const s = Math.sin(angle / 2);
        const dq = [Math.cos(angle / 2), normAxis[0] * s, normAxis[1] * s, normAxis[2] * s];
        qRef.current = quatMul(dq, qRef.current) as [number, number, number, number];
        setRotationTick(tick => (tick + 1) % 1000000); // Prevent overflow
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDragging]);

  const U = (r: number): number => {
    const term = Math.pow(Math.sin((Math.PI * r * r) / 2), m) + delta;
    return -beta * Math.log(term);
  };

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

  const project3D = (p: [number, number, number]): { x: number; y: number; z: number } => {
    const v3 = rotateVecByQuat(p, qRef.current);
    const scale = isMobile ? 70 : 120;
    const v = [v3[0] * scale, v3[1] * scale, v3[2] * scale + 300];
    const persp = FOV / (FOV + v[2]);
    return {
      x: v[0] * persp + W3D / 2,
      y: v[1] * persp + H3D / 2,
      z: v[2]
    };
  };

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
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastMouseRef.current = null;
  };

  const render2DPlot = () => {
    const margin = { top: 40, right: 40, bottom: 60, left: 70 };
    const plotW = W2D - margin.left - margin.right;
    const plotH = H2D - margin.top - margin.bottom;

    const xScale = (r: number) => (r / rmax) * plotW;
    const yScale = (u: number) => plotH - ((u + 0.5) / ymax) * plotH;

    const samples = 800;
    const points: Array<{ x: number; y: number }> = [];
    for (let i = 0; i <= samples; i++) {
      const r = (i / samples) * rmax;
      const u = U(r);
      if (u < ymax && u > -0.5) {
        points.push({ x: xScale(r), y: yScale(u) });
      }
    }

    const pathD = points
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${margin.left + pt.x},${margin.top + pt.y}`)
      .join(' ');

    const gridLines: JSX.Element[] = [];
    const maxK = Math.floor((rmax * rmax) / 2);
    for (let k = 0; k <= maxK; k++) {
      const r = Math.sqrt(2 * k);
      if (r <= rmax) {
        const x = margin.left + xScale(r);
        gridLines.push(
          <line
            key={`grid-${k}`}
            x1={x}
            y1={margin.top}
            x2={x}
            y2={margin.top + plotH}
            stroke="#e0e0e0"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        );
      }
    }

    const yTicks = [0, 2, 4, 6, 8, 10];
    const xTicks = [0, 0.5, 1, 1.5, 2, 2.5, 3];

    return (
      <svg width={W2D} height={H2D} className="bg-white">
        <rect width={W2D} height={H2D} fill="#fafafa" />

        {gridLines}

        {yTicks.map(tick => {
          if (tick >= -0.5 && tick <= ymax) {
            const y = margin.top + yScale(tick);
            return (
              <g key={`ytick-${tick}`}>
                <line x1={margin.left - 5} y1={y} x2={margin.left} y2={y} stroke="#333" strokeWidth="1" />
                <text x={margin.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#333">{tick.toFixed(1)}</text>
              </g>
            );
          }
          return null;
        })}

        {xTicks.map(tick => {
          if (tick <= rmax) {
            const x = margin.left + xScale(tick);
            return (
              <g key={`xtick-${tick}`}>
                <line x1={x} y1={margin.top + plotH} x2={x} y2={margin.top + plotH + 5} stroke="#333" strokeWidth="1" />
                <text x={x} y={margin.top + plotH + 20} textAnchor="middle" fontSize="11" fill="#333">{tick.toFixed(1)}</text>
              </g>
            );
          }
          return null;
        })}

        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + plotH} stroke="#333" strokeWidth="2" />
        <line x1={margin.left} y1={margin.top + plotH} x2={margin.left + plotW} y2={margin.top + plotH} stroke="#333" strokeWidth="2" />

        <path d={pathD} stroke="#1976d2" strokeWidth="2.5" fill="none" />

        <text x={W2D / 2} y={H2D - 10} textAnchor="middle" fontSize="14" fill="#333" fontWeight="600">r</text>
        <text x={20} y={H2D / 2} textAnchor="middle" fontSize="14" fill="#333" fontWeight="600" transform={`rotate(-90, 20, ${H2D / 2})`}>U(r)</text>
      </svg>
    );
  };

  const render3DIsosurfaces = () => {
    const levels = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0];

    const spheres: JSX.Element[] = [];

    levels.forEach((level, levelIdx) => {
      const rValues: number[] = [];
      for (let r = 0; r < rmax; r += 0.01) {
        const u = U(r);
        if (Math.abs(u - level) < 0.05) {
          rValues.push(r);
        }
      }

      rValues.forEach((radius, idx) => {
        if (idx % 3 === 0) {
          const latitudes = 18;
          const longitudes = 48;
          const paths: JSX.Element[] = [];

          for (let i = 0; i <= latitudes; i++) {
            const theta = (i / latitudes) * Math.PI;
            const r = radius * Math.sin(theta);
            const y = radius * Math.cos(theta);

            const pts: Array<{ x: number; y: number; z: number }> = [];
            for (let j = 0; j <= longitudes; j++) {
              const phi = (j / longitudes) * Math.PI * 2;
              const x = r * Math.cos(phi);
              const z = r * Math.sin(phi);
              pts.push(project3D([x, y, z]));
            }

            const d = pts.map((pt, pidx) => `${pidx === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`).join(' ');
            paths.push(<path key={`lat-${levelIdx}-${idx}-${i}`} d={d} stroke="url(#purpleGreenGradient)" strokeWidth="2" fill="none" opacity="0.5" />);
          }

          spheres.push(<g key={`sphere-${levelIdx}-${idx}`}>{paths}</g>);
        }
      });
    });

    return (
      <svg
        width={W3D}
        height={H3D}
        className="cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <linearGradient id="purpleGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#166534', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width={W3D} height={H3D} fill="white" />
        {spheres}
        <text x={W3D / 2} y={25} textAnchor="middle" fontSize="13" fill="#333">
          4D ANCHOR POTENTIAL (m={m}, β={beta})
        </text>
        <text x={W3D / 2} y={H3D - 10} textAnchor="middle" fontSize="11" fill="#666">
          Drag to rotate
        </text>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Quaternionic Anchor-Well Landscape</h1>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6 border border-gray-300">
          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 uppercase tracking-wide font-bold">4D Anchor Potential</p>
            <div className="font-serif text-black flex items-center justify-center flex-wrap md:flex-nowrap" style={{ gap: isMobile ? '0.15rem' : '0.75rem' }}>
              <span className="italic text-lg md:text-3xl">U</span>
              <span className="text-lg md:text-3xl">(</span>
              <span className="italic text-lg md:text-3xl">r</span>
              <span className="text-lg md:text-3xl">)</span>
              <span className="text-lg md:text-3xl">=</span>
              <span className="text-lg md:text-3xl">−</span>
              <span className="italic text-lg md:text-3xl">β</span>
              <span className="text-lg md:text-3xl" style={{ marginLeft: isMobile ? '0.1rem' : '0.25rem', marginRight: isMobile ? '0.1rem' : '0.25rem' }}>·</span>
              <span className="text-lg md:text-3xl">log</span>
              <span className="text-lg md:text-3xl">[</span>
              <span className="text-lg md:text-3xl">sin</span>
              <span className="text-sm md:text-2xl align-super italic">m</span>
              <span className="text-lg md:text-3xl">(</span>
              <span className="inline-flex flex-col items-center" style={{ marginLeft: isMobile ? '0.1rem' : '0.25rem', marginRight: isMobile ? '0.1rem' : '0.25rem' }}>
                <span className={`border-b-2 border-black ${isMobile ? 'text-lg pb-0.5' : 'text-3xl pb-1'}`}>
                  <span className={`italic ${isMobile ? 'text-xl' : 'text-4xl'}`}>π</span>
                  <span className="italic">r</span>
                  <span className={`align-super ${isMobile ? 'text-xs' : 'text-xl'}`}>2</span>
                </span>
                <span className={`${isMobile ? 'text-lg pt-0.5' : 'text-3xl pt-1'}`}>2</span>
              </span>
              <span className="text-lg md:text-3xl">)</span>
              <span className="text-lg md:text-3xl" style={{ marginLeft: isMobile ? '0.1rem' : '0.25rem', marginRight: isMobile ? '0.1rem' : '0.25rem' }}>+</span>
              <span className="italic text-lg md:text-3xl">δ</span>
              <span className="text-lg md:text-3xl">]</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-3 md:p-4 lg:p-6 mb-4 md:mb-6">
          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-3 md:mb-4">4D ANCHOR POTENTIAL</h3>
          <div className="flex justify-center overflow-x-auto">
            {render3DIsosurfaces()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-xl shadow-lg p-3 md:p-4 lg:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">Radial Cross-Section</h3>
            <div className="overflow-x-auto flex justify-center">
              {render2DPlot()}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 md:p-4 lg:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">Parameters</h3>

            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs md:text-sm font-medium text-gray-700">r<sub>max</sub> (radius)</label>
                  <span className="text-xs md:text-sm font-mono text-gray-900">{rmax.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={rmax}
                  onChange={(e) => setRmax(parseFloat(e.target.value))}
                  className="w-full h-2 md:h-auto"
                  data-testid="slider-rmax"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1.0</span>
                  <span>5.0</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs md:text-sm font-medium text-gray-700">β (well depth)</label>
                  <span className="text-xs md:text-sm font-mono text-gray-900">{beta.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={beta}
                  onChange={(e) => setBeta(parseFloat(e.target.value))}
                  className="w-full h-2 md:h-auto"
                  data-testid="slider-beta"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.2</span>
                  <span>3.0</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs md:text-sm font-medium text-gray-700">δ (floor offset)</label>
                  <span className="text-xs md:text-sm font-mono text-gray-900">{delta.toExponential(1)}</span>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="-2"
                  step="0.5"
                  value={Math.log10(delta)}
                  onChange={(e) => setDelta(Math.pow(10, parseFloat(e.target.value)))}
                  className="w-full h-2 md:h-auto"
                  data-testid="slider-delta"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10<sup>-8</sup></span>
                  <span>10<sup>-2</sup></span>
                </div>
              </div>

            </div>

            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                The anchor potential creates concentric wells at r² = 2k (k = 0,1,2,...).
                Vertical grid lines mark these critical radii. The 3D view shows spherically
                symmetric isosurfaces due to radial dependence.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-center pb-6 md:pb-8">
          <a
            href="https://www.wolframcloud.com/obj/resonantaxis/Published/4D%20Resonance%20Wells.nb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl border border-gray-300 text-sm md:text-base"
            data-testid="link-wolfram-notebook"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="hidden md:inline">View Full Wolfram Notebook: 4D Resonance Wells</span>
            <span className="md:hidden">View Wolfram Notebook</span>
          </a>
        </div>
      </div>
    </div>
  );
}
