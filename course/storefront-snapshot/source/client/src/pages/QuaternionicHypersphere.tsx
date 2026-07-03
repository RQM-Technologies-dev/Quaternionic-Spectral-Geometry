import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { BlockMath } from 'react-katex';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const T_MAX = 300;
const T_HALF = T_MAX / 2;
const PHI_START = Math.PI - 0.01;
const PHI_END = 0.7;

function UnitCircle2D({ theta }: { theta: number }) {
  const size = 100;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;
  const axisLength = size * 0.42;

  const pointX = cx + radius * Math.cos(theta);
  const pointY = cy - radius * Math.sin(theta);

  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  const verticalLineX = cx + radius * cosTheta;
  const horizontalLineY = cy - radius * sinTheta;

  const isSecondHalf = theta > Math.PI;
  const radiusColor = isSecondHalf ? "#ffd699" : "#aad8ff";
  const sinColor = isSecondHalf ? "#aad8ff" : "#ffd699";

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full bg-[#1a1a2e]" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width={size} height={size} fill="#1a1a2e" />

      <g stroke="#444" strokeWidth="0.15">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={size * (i / 6)} x2={size} y2={size * (i / 6)} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={size * (i / 6)} y1="0" x2={size * (i / 6)} y2={size} />
        ))}
      </g>

      <line x1={cx - axisLength} y1={cy} x2={cx + axisLength} y2={cy} stroke="#999" strokeWidth="0.5" />
      <line x1={cx} y1={cy + axisLength} x2={cx} y2={cy - axisLength} stroke="#999" strokeWidth="0.5" />

      <polygon points={`${cx + axisLength},${cy} ${cx + axisLength - 2},${cy - 1} ${cx + axisLength - 2},${cy + 1}`} fill="#999" />
      <polygon points={`${cx},${cy - axisLength} ${cx - 1},${cy - axisLength + 2} ${cx + 1},${cy - axisLength + 2}`} fill="#999" />

      <text x={cx + axisLength + 2} y={cy + 1.5} fill="#aaa" fontSize="4" fontFamily="serif">re</text>
      <text x={cx + 2} y={cy - axisLength - 1} fill="#aaa" fontSize="4" fontFamily="serif">im</text>

      {[-1, -0.5, 0.5, 1].map((tick) => (
        <g key={tick}>
          <line x1={cx + tick * radius} y1={cy - 1} x2={cx + tick * radius} y2={cy + 1} stroke="#aaa" strokeWidth="0.25" />
          <text x={cx + tick * radius} y={cy + 4.5} fill="#aaa" fontSize="2.8" textAnchor="middle" fontFamily="serif">
            {tick}
          </text>
        </g>
      ))}
      {[-1, -0.5, 0.5, 1].filter(t => t !== 0).map((tick) => (
        <g key={`y${tick}`}>
          <line x1={cx - 1} y1={cy - tick * radius} x2={cx + 1} y2={cy - tick * radius} stroke="#aaa" strokeWidth="0.25" />
          <text x={cx - 4.5} y={cy - tick * radius + 1} fill="#aaa" fontSize="2.8" textAnchor="middle" fontFamily="serif">
            {tick}
          </text>
        </g>
      ))}

      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#aaa" strokeWidth="0.5" />

      <line x1={cx} y1={cy} x2={pointX} y2={pointY} stroke={radiusColor} strokeWidth="0.5" />

      <line x1={pointX} y1={cy} x2={pointX} y2={pointY} stroke={sinColor} strokeWidth="0.4" strokeDasharray="1,0.7" />
      <line x1={cx} y1={pointY} x2={pointX} y2={pointY} stroke="#f472b6" strokeWidth="0.4" strokeDasharray="1,0.7" />

      <circle cx={pointX} cy={pointY} r="1.5" fill={radiusColor} />

      {(() => {
        const piStr = (theta / Math.PI).toFixed(2);
        return (
          <text
            x={size - 2}
            y={5}
            fontSize="3.4"
            fontStyle="italic"
            fontFamily="serif"
            fill="#fff"
            textAnchor="end"
          >
            cos({piStr}π) + i sin({piStr}π)
          </text>
        );
      })()}

      <text x={verticalLineX + 2} y={cy + (pointY < cy ? 4 : -2)} fill={sinColor} fontSize="3.2" fontFamily="serif">
        sin θ
      </text>
      <text x={(cx + pointX) / 2} y={pointY + (pointY < cy ? -2 : 4.5)} fill="#f472b6" fontSize="3.2" textAnchor="middle" fontFamily="serif">
        cos θ
      </text>
    </svg>
  );
}

function phiOf(tau: number, doubleCover: boolean): number {
  if (doubleCover) {
    const T_QUARTER = T_MAX / 4;
    const phase = tau % T_HALF;
    if (phase <= T_QUARTER) {
      return PHI_START - (PHI_START - PHI_END) * (phase / T_QUARTER);
    } else {
      return PHI_END + (PHI_START - PHI_END) * ((phase - T_QUARTER) / T_QUARTER);
    }
  } else {
    if (tau <= T_HALF) {
      return PHI_START - (PHI_START - PHI_END) * (tau / T_HALF);
    } else {
      return PHI_END + (PHI_START - PHI_END) * ((tau - T_HALF) / T_HALF);
    }
  }
}

function rotationMatrix(angle: number, axis: THREE.Vector3): THREE.Matrix4 {
  const mat = new THREE.Matrix4();
  mat.makeRotationAxis(axis.clone().normalize(), angle);
  return mat;
}

export default function QuaternionicHypersphere() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    outwardCurves: THREE.Mesh[];
    inwardCurves: THREE.Mesh[];
    animationId: number | null;
  } | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(0.25);
  const [time, setTime] = useState(0);
  const [doubleCover, setDoubleCover] = useState(true);
  const [showSphere, setShowSphere] = useState(true);
  const [complexOnly, setComplexOnly] = useState(false);

  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(speed);
  const timeRef = useRef(time);
  const doubleCoverRef = useRef(doubleCover);
  const showSphereRef = useRef(showSphere);
  const complexOnlyRef = useRef(complexOnly);

  useEffect(() => {
    document.title = "Euler's Quaternionic Formula - Unit Hypersphere S³ | RQM Technologies";
  }, []);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  useEffect(() => {
    doubleCoverRef.current = doubleCover;
  }, [doubleCover]);

  useEffect(() => {
    showSphereRef.current = showSphere;
    if (sceneRef.current && (sceneRef.current as any).transparentSphere) {
      (sceneRef.current as any).transparentSphere.visible = showSphere;
    }
  }, [showSphere]);

  useEffect(() => {
    complexOnlyRef.current = complexOnly;
  }, [complexOnly]);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1a1a2e);

      const camera = new THREE.PerspectiveCamera(
        60,
        canvasRef.current.clientWidth / canvasRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(5.166, 3.150, 3.2886);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      canvasRef.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 3;
      controls.maxDistance = 20;
      controls.target.set(0, 0, 0);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0xffffff, 1.2);
      pointLight1.position.set(10, 10, 10);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
      pointLight2.position.set(-10, -10, -10);
      scene.add(pointLight2);

      const gridHelper = new THREE.GridHelper(20, 20, 0x666666, 0x444444);
      scene.add(gridHelper);

      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      // Create transparent sphere to show the traced surface (dynamic radius)
      const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const transparentSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      transparentSphere.visible = showSphereRef.current;
      transparentSphere.scale.set(0.01, 0.01, 0.01);
      scene.add(transparentSphere);

      // Create curve lines - one distinct color per plane (xy, yz, zx),
      // shared by both the outward and inward halves of that curve.
      const outwardCurves: THREE.Mesh[] = [];
      const inwardCurves: THREE.Mesh[] = [];

      // Per-plane palette: cyan = xy (curve 0), pink = yz (curve 1), green = zx (curve 2)
      const curveColors = [0x22d3ee, 0xf472b6, 0x4ade80];

      for (let i = 0; i < 3; i++) {
        const outwardMaterial = new THREE.MeshBasicMaterial({
          color: curveColors[i],
          transparent: true,
          opacity: 0.9
        });
        const outwardGeometry = new THREE.BufferGeometry();
        const outwardMesh = new THREE.Mesh(outwardGeometry, outwardMaterial);
        scene.add(outwardMesh);
        outwardCurves.push(outwardMesh);

        const inwardMaterial = new THREE.MeshBasicMaterial({
          color: curveColors[i],
          transparent: true,
          opacity: 0.9
        });
        const inwardGeometry = new THREE.BufferGeometry();
        const inwardMesh = new THREE.Mesh(inwardGeometry, inwardMaterial);
        scene.add(inwardMesh);
        inwardCurves.push(inwardMesh);
      }

      // Dotted radius spokes: one neutral dashed line per curve, drawn from
      // the origin (0,0,0) out to the leading tip of each trail. Mirrors the
      // unit-circle radius on the left panel.
      const radiusSpokes: THREE.Line[] = [];
      for (let i = 0; i < 3; i++) {
        const spokeMaterial = new THREE.LineDashedMaterial({
          color: 0xe5e7eb,
          dashSize: 0.08,
          gapSize: 0.06,
          transparent: true,
          opacity: 0.6,
          linewidth: 1,
        });
        const spokeGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, 0),
        ]);
        const spokeLine = new THREE.Line(spokeGeometry, spokeMaterial);
        spokeLine.computeLineDistances();
        spokeLine.visible = false;
        scene.add(spokeLine);
        radiusSpokes.push(spokeLine);
      }

      sceneRef.current = {
        scene,
        camera,
        renderer,
        controls,
        outwardCurves,
        inwardCurves,
        animationId: null
      };
      (sceneRef.current as any).transparentSphere = transparentSphere;

      const cameraRotationSpeed = 0.001; // Slow steady rotation

      const animate = () => {
        if (isPlayingRef.current) {
          const newTime = timeRef.current + speedRef.current;
          setTime(newTime > T_MAX ? 0 : newTime);
        }

        // Apply continuous automatic rotation around Y-axis (on top of user controls)
        const rotationAxis = new THREE.Vector3(0, 1, 0);
        const rotationMatrix = new THREE.Matrix4().makeRotationAxis(rotationAxis, cameraRotationSpeed);

        // Rotate camera position around origin
        camera.position.applyMatrix4(rotationMatrix);

        // Keep camera looking at origin (works with OrbitControls)
        camera.lookAt(0, 0, 0);

        updateCurves();
        controls.update();
        renderer.render(scene, camera);
        sceneRef.current!.animationId = requestAnimationFrame(animate);
      };

      // Store full curves for snake effect across cycles
      const storedInwardCurves: THREE.Vector3[][] = [[], [], []];
      let lastTime = 0;

      const updateCurves = () => {
        const currentTime = timeRef.current;

        // Update transparent sphere radius to match current curve distance from origin
        if (showSphereRef.current && transparentSphere) {
          const phi = phiOf(currentTime, doubleCoverRef.current);
          const w = Math.cos(phi);
          const sinPhi = Math.sin(phi);
          // Stereographic projection radius: |sin(φ)| / |1 - cos(φ)|
          // This gives the distance from origin in stereographic projection
          if (Math.abs(1 - w) > 0.001) {
            const stereoRadius = Math.abs(sinPhi / (1 - w));
            const clampedRadius = Math.min(stereoRadius, 10);
            transparentSphere.scale.set(clampedRadius, clampedRadius, clampedRadius);
          }
        }

        // Clear stored inward curves when cycle wraps (time resets to 0)
        if (currentTime < lastTime - 10) {
          for (let i = 0; i < 3; i++) {
            storedInwardCurves[i] = [];
            inwardCurves[i].geometry.dispose();
            inwardCurves[i].geometry = new THREE.BufferGeometry();
          }
        }
        lastTime = currentTime;

        const initialAxes = [
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 1)
        ];

        const precessionAxes = [
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 1, 0)
        ];

        const omegas = [0.4, 0.6, 0.8];

        // Inward-half rotation: X=0.80, Y=0.00, Z=0.57
        // Outward half remains in the standard XYZ coordinate system
        const uniformShiftMatrix = new THREE.Matrix4()
          .makeRotationZ(0.57)
          .multiply(new THREE.Matrix4().makeRotationY(0.00))
          .multiply(new THREE.Matrix4().makeRotationX(0.80));

        for (let curveIndex = 0; curveIndex < 3; curveIndex++) {
          const outwardPoints: THREE.Vector3[] = [];
          const inwardPoints: THREE.Vector3[] = [];
          const numPoints = 500;

          // Generate outward phase (0 to T_HALF)
          const outwardLimit = Math.min(currentTime, T_HALF);
          for (let i = 0; i <= numPoints; i++) {
            const tau = (i / numPoints) * outwardLimit;

            const phi = phiOf(tau, doubleCoverRef.current);
            const omega = omegas[curveIndex];
            const axis = precessionAxes[curveIndex];
            const u0 = initialAxes[curveIndex];

            const rotMat = rotationMatrix(omega * tau, axis);
            const u = u0.clone().applyMatrix4(rotMat);

            const w = Math.cos(phi);
            const sinPhi = Math.sin(phi);
            const x = sinPhi * u.x;
            const y = sinPhi * u.y;
            const z = sinPhi * u.z;

            if (Math.abs(1 - w) > 0.001) {
              const stereoX = x / (1 - w);
              const stereoY = y / (1 - w);
              const stereoZ = z / (1 - w);

              const magnitude = Math.sqrt(stereoX * stereoX + stereoY * stereoY + stereoZ * stereoZ);
              if (magnitude < 10) {
                outwardPoints.push(new THREE.Vector3(stereoX, stereoY, stereoZ));
              }
            }
          }

          // Generate inward phase (T_HALF to currentTime)
          if (currentTime > T_HALF) {
            const inwardStart = T_HALF;
            const inwardDuration = currentTime - T_HALF;

            for (let i = 0; i <= numPoints; i++) {
              const tau = inwardStart + (i / numPoints) * inwardDuration;

              const phi = phiOf(tau, doubleCoverRef.current);
              const omega = omegas[curveIndex];
              const axis = precessionAxes[curveIndex];
              const u0 = initialAxes[curveIndex];

              const rotMat = rotationMatrix(omega * tau, axis);
              let u = u0.clone().applyMatrix4(rotMat);

              // Apply uniform shift for inward phase (preserves perpendicularity)
              u = u.clone().applyMatrix4(uniformShiftMatrix);

              const w = Math.cos(phi);
              const sinPhi = Math.sin(phi);
              const x = sinPhi * u.x;
              const y = sinPhi * u.y;
              const z = sinPhi * u.z;

              if (Math.abs(1 - w) > 0.001) {
                const stereoX = x / (1 - w);
                const stereoY = y / (1 - w);
                const stereoZ = z / (1 - w);

                const magnitude = Math.sqrt(stereoX * stereoX + stereoY * stereoY + stereoZ * stereoZ);
                if (magnitude < 10) {
                  inwardPoints.push(new THREE.Vector3(stereoX, stereoY, stereoZ));
                }
              }
            }
          }

          // Store full inward curve when it's complete
          if (inwardPoints.length > 0 && currentTime > T_HALF) {
            storedInwardCurves[curveIndex] = [...inwardPoints];
          }

          // Snake/erase: keep only a short trailing window so the visible
          // segment of each curve is always small. Identical behavior in
          // Double Cover ON and OFF — the outward curve shows during the
          // outward half, the inward curve shows during the inward half,
          // and each is reduced to a short leading segment.
          const TRAIL_WINDOW = Math.max(12, Math.floor(numPoints * 0.20));

          const visibleOutwardPoints =
            currentTime <= T_HALF ? outwardPoints.slice(-TRAIL_WINDOW) : [];

          if (visibleOutwardPoints.length > 1) {
            const curve = new THREE.CatmullRomCurve3(visibleOutwardPoints);
            const tubeGeometry = new THREE.TubeGeometry(curve, visibleOutwardPoints.length * 2, 0.0075, 8, false);
            outwardCurves[curveIndex].geometry.dispose();
            outwardCurves[curveIndex].geometry = tubeGeometry;
            (outwardCurves[curveIndex].material as THREE.MeshBasicMaterial).opacity = 1.0;
          } else {
            outwardCurves[curveIndex].geometry.dispose();
            outwardCurves[curveIndex].geometry = new THREE.BufferGeometry();
          }

          const visibleInwardPoints =
            currentTime > T_HALF ? inwardPoints.slice(-TRAIL_WINDOW) : [];

          if (visibleInwardPoints.length > 1) {
            const curve = new THREE.CatmullRomCurve3(visibleInwardPoints);
            const tubeGeometry = new THREE.TubeGeometry(curve, visibleInwardPoints.length * 2, 0.0075, 8, false);
            inwardCurves[curveIndex].geometry.dispose();
            inwardCurves[curveIndex].geometry = tubeGeometry;
            (inwardCurves[curveIndex].material as THREE.MeshBasicMaterial).opacity = 1.0;
          } else {
            inwardCurves[curveIndex].geometry.dispose();
            inwardCurves[curveIndex].geometry = new THREE.BufferGeometry();
          }

          // Dotted radius spoke: from origin to the leading tip of whichever
          // trail (outward or inward) currently has visible points. Hide if
          // neither trail has a tip this frame.
          const tip =
            visibleOutwardPoints.length > 0
              ? visibleOutwardPoints[visibleOutwardPoints.length - 1]
              : visibleInwardPoints.length > 0
                ? visibleInwardPoints[visibleInwardPoints.length - 1]
                : null;

          if (tip && !complexOnlyRef.current) {
            const positions = new Float32Array([0, 0, 0, tip.x, tip.y, tip.z]);
            radiusSpokes[curveIndex].geometry.dispose();
            const spokeGeo = new THREE.BufferGeometry();
            spokeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            radiusSpokes[curveIndex].geometry = spokeGeo;
            radiusSpokes[curveIndex].computeLineDistances();
            radiusSpokes[curveIndex].visible = true;
          } else {
            radiusSpokes[curveIndex].visible = false;
          }
        }
      };

      animate();

      const handleResize = () => {
        if (!canvasRef.current) return;
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (sceneRef.current?.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }
        renderer.dispose();
        controls.dispose();
        if (canvasRef.current) {
          canvasRef.current.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error('Error initializing Three.js scene:', error);
    }
  }, []);

  const handleReset = () => {
    setTime(0);
    setIsPlaying(false);
  };

  const progress = (time / T_MAX) * 100;

  const currentTheta = (time / T_MAX) * 2 * Math.PI;
  const currentPhi = doubleCover ? currentTheta : currentTheta / 2;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#1a2f42] to-[#0a1929] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Better Coordinates Make Better Measurement
          </h1>
          <p className="text-white/60 text-sm md:text-base italic mt-2">
            Euler's Formulas: From Circle to Hypersphere
          </p>
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-4">
            RQM Technologies builds software around the principle that better coordinates create better measurement. Quaternionic coordinates preserve phase, rotation, orientation, polarization, and coherence together, giving engineers and scientists more control over the systems they measure.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-6 border border-white/10 mb-8">
          <div className={`grid gap-6 mb-6 ${complexOnly ? 'grid-cols-1 max-w-xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
            <div className="flex flex-col">
              <div className="text-center mb-1">
                <div className="text-white text-xl md:text-2xl lg:text-3xl font-serif italic [&_.katex-display]:my-0 [&_.katex-display]:mb-1">
                  <BlockMath math="e^{i\theta} = \cos \theta + i \sin \theta" />
                </div>
                <p className="text-white/70 text-lg md:text-xl">Unit Circle S¹ in ℂ</p>
                <p className="text-white/50 text-sm italic">Leonhard Euler</p>
              </div>
              <div className="bg-black/30 rounded-xl overflow-hidden aspect-square">
                <UnitCircle2D theta={currentTheta} />
              </div>
            </div>

            <div className={`flex flex-col ${complexOnly ? 'hidden' : ''}`}>
              <div className="text-center mb-1">
                <div className="text-white text-xl md:text-2xl lg:text-3xl font-serif italic [&_.katex-display]:my-0 [&_.katex-display]:mb-1">
                  <BlockMath math="e^{\mathbf{u}\phi} = \cos \phi + \mathbf{u} \sin \phi" />
                </div>
                <p className="text-white/70 text-lg md:text-xl">Unit Hypersphere S³ in ℍ</p>
                <p className="text-white/50 text-sm italic">William Rowan Hamilton</p>
              </div>
              <div className="relative">
                <div
                  ref={canvasRef}
                  className="bg-black/30 rounded-xl overflow-hidden aspect-square"
                />
                <div className="absolute top-3 right-3 text-white font-serif text-right leading-tight px-2.5 py-1.5 italic text-base sm:text-lg md:text-xl tabular-nums whitespace-nowrap">
                  {(() => {
                    const piStr = (currentPhi / Math.PI).toFixed(2);
                    return (
                      <>
                        cos(<span className="inline-block text-right" style={{ width: "2.1em" }}>{piStr}</span>π) + <span className="font-bold not-italic">u</span> sin(<span className="inline-block text-right" style={{ width: "2.1em" }}>{piStr}</span>π)
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 mb-6">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Switch
                checked={doubleCover}
                onCheckedChange={setDoubleCover}
                className="data-[state=checked]:bg-cyan-500"
                data-testid="switch-double-cover"
              />
              <span className="text-white/80 text-xs md:text-sm">Double Cover</span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Switch
                checked={showSphere}
                onCheckedChange={setShowSphere}
                className="data-[state=checked]:bg-teal-500"
                data-testid="switch-show-sphere"
                disabled={complexOnly}
              />
              <span className={`text-xs md:text-sm ${complexOnly ? 'text-white/40' : 'text-white/80'}`}>Show Sphere</span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Switch
                checked={complexOnly}
                onCheckedChange={setComplexOnly}
                className="data-[state=checked]:bg-purple-500"
                data-testid="switch-complex-only"
              />
              <span className="text-white/80 text-xs md:text-sm">Complex Only</span>
            </div>

            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 hover:bg-white/20 text-white flex-shrink-0"
              data-testid="button-play-pause"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 hover:bg-white/20 text-white flex-shrink-0"
              data-testid="button-reset"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <span className="text-white/80 text-xs md:text-sm flex-shrink-0">Speed:</span>
            <Slider
              value={[speed]}
              onValueChange={(v) => setSpeed(v[0])}
              min={0}
              max={0.5}
              step={0.01}
              className="flex-1"
            />
            <span className="text-white/80 text-xs md:text-sm font-mono flex-shrink-0">
              {speed.toFixed(2)}x
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-cyan-400/30 rounded-xl p-4">
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                The unit circle is the coordinate system most software still relies on. Every point on it is described by a single phase angle θ in the complex plane: a real part (cos θ) and an imaginary part (sin θ). It captures one rotation cleanly, but it has no room for orientation in space, polarization, or how multiple rotations compose. Anything richer than a single phase has to be flattened into it.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-400/30 rounded-xl p-4">
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                The unit hypersphere S³ is the quaternionic coordinate system. Every point on it is a unit quaternion that carries phase, a 3D rotation axis, orientation, and polarization at once, so structure that the complex plane has to discard stays intact. The three colored curves (xy in cyan, yz in pink, zx in green) trace how that structure evolves as φ varies, which is exactly what makes measurement and downstream control sharper.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/10">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-cyan-300">The Quaternionic Formula</h2>

            <div className="bg-gradient-to-r from-gray-900/50 to-blue-900/50 border border-cyan-500/30 rounded-xl p-4 md:p-6 mb-6 overflow-x-auto">
              <div className="text-center text-xl md:text-2xl lg:text-3xl text-white font-serif italic">
                q = cos φ + <span className="font-bold">u</span> sin φ
              </div>
            </div>

            <div className="space-y-4 text-white/90 text-sm md:text-base leading-relaxed">
              <p>
                This is Euler's formula extended to quaternions. Just as <em>e<sup>iθ</sup> = cos θ + i sin θ</em> traces the unit circle in ℂ, the quaternionic formula traces the unit 3-sphere S³ in ℍ. The crucial difference is what each point carries: a unit quaternion encodes a phase and a full 3D rotation axis at once, so phase, orientation, polarization, and coherence stay coupled instead of being projected away.
              </p>

              <div className="bg-cyan-500/10 border-l-4 border-cyan-400 pl-3 md:pl-4 py-3">
                <p className="font-semibold text-cyan-200 mb-2 text-sm md:text-base">Key Components:</p>
                <ul className="space-y-2 text-xs md:text-sm">
                  <li><strong>φ</strong> (phi): Angle parameter sweeping the hypersphere</li>
                  <li><strong>u</strong>: Unit 3-vector (pure imaginary quaternion) = <em>u₁</em><strong>i</strong> + <em>u₂</em><strong>j</strong> + <em>u₃</em><strong>k</strong></li>
                  <li><strong>q</strong>: Unit quaternion on S³ ⊂ ℍ ≅ ℝ⁴</li>
                </ul>
              </div>

              <p>
                The visualization shows three trajectories, each with a precessing axis <strong>u</strong>(t) that rotates over time. Because the structure is preserved as the curves evolve, what you see on screen is the same structure RQM Technologies' tools rely on for measurement, and that measurement is what enables sharper control of quantum states, waves, imaging, sensing, communications, and other scientific systems.
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/10">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-cyan-300">Stereographic Projection</h2>

            <div className="aspect-video w-full rounded-xl overflow-hidden mb-6">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/d4EgbgTm0Bg"
                title="Stereographic Projection Explained"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>

            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Quaternionic stereographic projection maps the 3-sphere S³ onto ordinary 3D space ℝ³ by projecting from a "north pole" at w = 1 onto the equatorial hyperplane. That is how the spiraling curves above become visible: each trajectory on S³ appears as an expanding spiral, with points near the pole stretching toward infinity and those near the antipole clustering close to the origin. It is also how we let people see the richer coordinate system that RQM Studio and the RQM WaveEngine actually compute on, instead of asking them to take it on faith.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
