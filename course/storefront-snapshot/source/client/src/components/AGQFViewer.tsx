import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

interface SpectralTransition {
  nUpper: number;
  nLower: number;
  wavelength: number;
  series: string;
  color: string;
}

interface AGQFViewerProps {
  className?: string;
  autoRotate?: boolean;
  selectedZ?: number;
  selectedSeries?: string[];
  activeTransition?: SpectralTransition | null;
  spectralLines?: SpectralTransition[];
  onTransitionComplete?: () => void;
  ringRadii?: number[];
}

const RING_COLORS: { primary: number; glow: number; muted: number }[] = [
  { primary: 0xec4899, glow: 0xf472b6, muted: 0xb05080 },
  { primary: 0x8b5cf6, glow: 0xa78bfa, muted: 0x7a5ab0 },
  { primary: 0x3b82f6, glow: 0x60a5fa, muted: 0x5080b0 },
  { primary: 0x22c55e, glow: 0x4ade80, muted: 0x50a070 },
  { primary: 0xfbbf24, glow: 0xfde047, muted: 0xb0a050 },
  { primary: 0xfb923c, glow: 0xfdba74, muted: 0xb07850 },
  { primary: 0xef4444, glow: 0xf87171, muted: 0xb05050 },
];

const NEUTRAL_WELL_COLOR = new THREE.Color(0x3a6070);

const getElementPeriod = (z: number): number => {
  if (z <= 2) return 1;
  if (z <= 10) return 2;
  if (z <= 18) return 3;
  if (z <= 36) return 4;
  if (z <= 54) return 5;
  if (z <= 86) return 6;
  return 7;
};


const DEFAULT_WELL_RADII = [0.3, 0.55, 0.85, 1.15, 1.5, 1.9];
const DEFAULT_WELL_DEPTHS = [-0.2, -0.3, -0.4, -0.5, -0.6, -0.7];
const USER_RING_RADII = [0.80, 1.33, 1.72, 2.02, 2.27, 2.47, 2.70];

interface WellData {
  radii: number[];
  depths: number[];
}

const detectWellRadiiAndDepths = (geometry: THREE.BufferGeometry): WellData => {
  const positions = geometry.attributes.position;

  const radialBins: Map<number, number[]> = new Map();
  const binWidth = 0.02;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);

    const worldX = x;
    const worldY = z;
    const worldZ = -y;

    const r = Math.sqrt(worldX * worldX + worldZ * worldZ);
    const height = worldY;

    if (r > 0.1) {
      const binIndex = Math.round(r / binWidth);
      if (!radialBins.has(binIndex)) {
        radialBins.set(binIndex, []);
      }
      radialBins.get(binIndex)!.push(height);
    }
  }

  const radialProfile: { r: number; height: number }[] = [];
  radialBins.forEach((heights, binIndex) => {
    if (heights.length > 10) {
      heights.sort((a, b) => a - b);
      const p10Index = Math.floor(heights.length * 0.1);
      const lowPercentileHeight = heights[p10Index];
      radialProfile.push({ r: binIndex * binWidth, height: lowPercentileHeight });
    }
  });

  radialProfile.sort((a, b) => a.r - b.r);

  const localMinima: { r: number; height: number }[] = [];
  for (let i = 1; i < radialProfile.length - 1; i++) {
    const prev = radialProfile[i - 1];
    const curr = radialProfile[i];
    const next = radialProfile[i + 1];

    if (curr.height < prev.height - 0.02 && curr.height < next.height - 0.02) {
      if (localMinima.length === 0 || curr.r - localMinima[localMinima.length - 1].r > 0.12) {
        localMinima.push(curr);
      }
    }
  }

  if (localMinima.length < 3) {
    console.warn('Could not detect enough wells, using radial sampling');
    const sampleRadii = [0.3, 0.5, 0.7, 0.9, 1.2, 1.5];
    const sampledWells: { r: number; height: number }[] = [];

    for (const targetR of sampleRadii) {
      let closest = radialProfile[0];
      let minDist = Math.abs(radialProfile[0].r - targetR);
      for (const p of radialProfile) {
        const dist = Math.abs(p.r - targetR);
        if (dist < minDist) {
          minDist = dist;
          closest = p;
        }
      }
      if (closest) sampledWells.push(closest);
    }

    console.log('Sampled wells:', sampledWells);
    return {
      radii: sampledWells.map(w => w.r),
      depths: sampledWells.map(w => w.height)
    };
  }

  console.log('Detected local minima (wells):', localMinima);
  return {
    radii: localMinima.slice(0, 6).map(w => w.r),
    depths: localMinima.slice(0, 6).map(w => w.height)
  };
};

const getShellOccupancies = (z: number): number[] => {
  const period = getElementPeriod(z);
  const shells: number[] = [];
  for (let n = 1; n <= period; n++) {
    shells.push(n);
  }
  return shells;
};

const assignVertexColorsToGeometry = (geometry: THREE.BufferGeometry, ringRadii: number[]): void => {
  const positions = geometry.attributes.position;
  const colors = new Float32Array(positions.count * 3);

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const worldX = x;
    const worldZ = -y;
    const r = Math.sqrt(worldX * worldX + worldZ * worldZ);

    let closestRingIndex = 0;
    let minDist = Math.abs(r - ringRadii[0]);
    for (let j = 1; j < ringRadii.length; j++) {
      const dist = Math.abs(r - ringRadii[j]);
      if (dist < minDist) {
        minDist = dist;
        closestRingIndex = j;
      }
    }

    colors[i * 3] = NEUTRAL_WELL_COLOR.r;
    colors[i * 3 + 1] = NEUTRAL_WELL_COLOR.g;
    colors[i * 3 + 2] = NEUTRAL_WELL_COLOR.b;

    (geometry as any).userData = (geometry as any).userData || {};
    (geometry as any).userData.vertexRingMap = (geometry as any).userData.vertexRingMap || new Uint8Array(positions.count);
    (geometry as any).userData.vertexRingMap[i] = closestRingIndex;
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
};

const updateWellVertexColors = (geometry: THREE.BufferGeometry, activeShells: number[]): void => {
  const colors = geometry.attributes.color as THREE.BufferAttribute;
  if (!colors) return;

  const ringMap = (geometry as any).userData?.vertexRingMap as Uint8Array | undefined;
  if (!ringMap) return;

  const activeSet = new Set(activeShells.map(n => n - 1));

  for (let i = 0; i < colors.count; i++) {
    const ringIndex = ringMap[i];

    if (activeSet.has(ringIndex)) {
      const ringColor = RING_COLORS[ringIndex] || RING_COLORS[0];
      const mutedColor = new THREE.Color(ringColor.muted);
      colors.setXYZ(i, mutedColor.r, mutedColor.g, mutedColor.b);
    } else {
      colors.setXYZ(i, NEUTRAL_WELL_COLOR.r, NEUTRAL_WELL_COLOR.g, NEUTRAL_WELL_COLOR.b);
    }
  }

  colors.needsUpdate = true;
};

export default function AGQFViewer({
  className = '',
  autoRotate = true,
  selectedZ = 1,
  selectedSeries = [],
  activeTransition = null,
  spectralLines = [],
  onTransitionComplete,
  ringRadii = USER_RING_RADII
}: AGQFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    mesh: THREE.Mesh | null;
    wellRings: THREE.Mesh[];
    wellRadii: number[];
    transitionBeam: THREE.Mesh | null;
    animationId: number;
    stars?: THREE.Points;
  } | null>(null);
  const initializedRef = useRef(false);
  const autoRotateRef = useRef(autoRotate);
  const selectedZRef = useRef(selectedZ);
  const selectedSeriesRef = useRef(selectedSeries);
  const ringRadiiRef = useRef(ringRadii);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    selectedZRef.current = selectedZ;
    selectedSeriesRef.current = selectedSeries;
    ringRadiiRef.current = ringRadii;
  }, [selectedZ, selectedSeries, ringRadii]);

  const transitionAnimRef = useRef<{
    active: boolean;
    progress: number;
    startN: number;
    endN: number;
    color: THREE.Color;
  } | null>(null);

  const createWellRings = useCallback((scene: THREE.Scene, wellDepths: number[], radii: number[]) => {
    const rings: THREE.Mesh[] = [];

    radii.forEach((absoluteRadius, index) => {
      const n = index + 1;
      const depth = wellDepths[index] ?? -0.3;
      if (!isFinite(absoluteRadius) || absoluteRadius <= 0) return;
      const adjustedHeight = depth + 0.2;

      const ringGeometry = new THREE.TorusGeometry(absoluteRadius, 0.03, 24, 64);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x4d9aaf,
        emissive: 0x4d9aaf,
        emissiveIntensity: 0.6,
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0,
        depthTest: true,
        depthWrite: true,
      });

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = adjustedHeight;
      ring.userData = { n, isOccupied: false, radius: absoluteRadius, depth: adjustedHeight };
      scene.add(ring);
      rings.push(ring);
    });

    console.log('Created rings - radii:', radii, 'heights:', wellDepths.map(d => d + 0.2));
    return rings;
  }, []);

  const getSeriesLevels = (series: string[]): number[] => {
    const levels = new Set<number>();
    if (series.includes('Lyman')) levels.add(1);
    if (series.includes('Balmer')) levels.add(2);
    if (series.includes('Paschen')) levels.add(3);
    if (series.includes('Brackett')) levels.add(4);
    if (series.includes('Pfund')) levels.add(5);
    if (series.includes('Humphreys')) levels.add(6);
    return Array.from(levels);
  };

  const updateWellHighlights = useCallback((z: number, activeSeries: string[]) => {
    if (!sceneRef.current) return;

    const shellOccupancies = getShellOccupancies(z);
    const seriesHighlights = getSeriesLevels(activeSeries);

    sceneRef.current.wellRings.forEach((ring, index) => {
      const n = index + 1;
      const isOccupied = shellOccupancies.includes(n);
      const isHighlighted = seriesHighlights.includes(n);
      const material = ring.material as THREE.MeshStandardMaterial;
      const ringColor = RING_COLORS[index] || RING_COLORS[0];

      ring.visible = isOccupied;
      material.color.setHex(ringColor.primary);

      if (isHighlighted && isOccupied) {
        material.emissive.setHex(ringColor.glow);
        material.emissiveIntensity = 0.8;
      } else {
        material.emissive.setHex(isOccupied ? ringColor.glow : 0x000000);
        material.emissiveIntensity = isOccupied ? 0.4 : 0;
      }

      material.opacity = isOccupied ? 1.0 : 0;
      ring.userData.isOccupied = isOccupied;
      ring.userData.isHighlighted = isHighlighted;
    });

    if (sceneRef.current.mesh) {
      updateWellVertexColors(sceneRef.current.mesh.geometry, shellOccupancies);
    }
  }, []);

  const animateTransition = useCallback((transition: SpectralTransition) => {
    if (!sceneRef.current) return;

    const wellRadii = sceneRef.current.wellRadii;
    const startRadius = wellRadii[transition.nUpper - 1] || wellRadii[wellRadii.length - 1];
    const endRadius = wellRadii[transition.nLower - 1] || wellRadii[0];

    const beamGeometry = new THREE.CylinderGeometry(0.03, 0.03, startRadius - endRadius, 8);
    const beamMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(transition.color),
      emissive: new THREE.Color(transition.color),
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.8,
    });

    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.set((startRadius + endRadius) / 2, 0.15, 0);
    beam.rotation.z = Math.PI / 2;
    sceneRef.current.scene.add(beam);
    sceneRef.current.transitionBeam = beam;

    transitionAnimRef.current = {
      active: true,
      progress: 0,
      startN: transition.nUpper,
      endN: transition.nLower,
      color: new THREE.Color(transition.color),
    };

    sceneRef.current.wellRings.forEach((ring, index) => {
      const n = index + 1;
      if (n === transition.nUpper || n === transition.nLower) {
        const material = ring.material as THREE.MeshStandardMaterial;
        material.emissive.set(transition.color);
        material.emissiveIntensity = 1.0;
      }
    });
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.wellRings.forEach((ring, index) => {
      const newRadius = ringRadii[index];
      if (newRadius && isFinite(newRadius) && newRadius > 0) {
        ring.geometry.dispose();
        ring.geometry = new THREE.TorusGeometry(newRadius, 0.03, 24, 64);
        ring.userData.radius = newRadius;
      }
    });
  }, [ringRadii]);

  useEffect(() => {
    if (activeTransition && sceneRef.current) {
      animateTransition(activeTransition);
    }
  }, [activeTransition, animateTransition]);

  useEffect(() => {
    if (!isLoading && sceneRef.current && sceneRef.current.wellRings.length > 0) {
      updateWellHighlights(selectedZ, selectedSeries);
    }
  }, [selectedZ, selectedSeries, updateWellHighlights, isLoading]);

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;
    initializedRef.current = true;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch (e) {
      setError('WebGL not available');
      setIsLoading(false);
      return;
    }

    if (!renderer.getContext()) {
      setError('WebGL context not available');
      setIsLoading(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.5;
    controls.maxDistance = 15;
    controls.autoRotate = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.3);
    directionalLight1.position.set(10, 10, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x4d9aaf, 0.5);
    directionalLight2.position.set(-10, -10, -5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x22d3ee, 0.8);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 500;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 30 + Math.random() * 20;
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 1.0,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      mesh: null,
      wellRings: [],
      wellRadii: DEFAULT_WELL_RADII,
      transitionBeam: null,
      animationId: 0,
      stars
    };

    const loader = new STLLoader();
    loader.load(
      '/assets/AnchorWells_Radial_AGQF_5x5x1in_(1)_1767387686094.stl',
      (geometry) => {
        geometry.computeVertexNormals();
        geometry.center();

        const box = new THREE.Box3().setFromBufferAttribute(
          geometry.attributes.position as THREE.BufferAttribute
        );
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        geometry.scale(scale, scale, scale);

        const wellData = detectWellRadiiAndDepths(geometry);

        assignVertexColorsToGeometry(geometry, ringRadiiRef.current);

        const material = new THREE.MeshStandardMaterial({
          vertexColors: true,
          metalness: 0.2,
          roughness: 0.6,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        scene.add(mesh);

        const initialShells = getShellOccupancies(selectedZRef.current);
        updateWellVertexColors(geometry, initialShells);

        const wellRings = createWellRings(scene, wellData.depths, ringRadiiRef.current);

        if (sceneRef.current) {
          sceneRef.current.mesh = mesh;
          sceneRef.current.wellRings = wellRings;
          sceneRef.current.wellRadii = wellData.radii;
        }

        const z = selectedZRef.current;
        const shellOccupancies = getShellOccupancies(z);

        console.log('Initial ring setup for Z=', z, 'shellOccupancies=', shellOccupancies, 'rings created=', wellRings.length);

        wellRings.forEach((ring, index) => {
          const n = index + 1;
          const isOccupied = shellOccupancies.includes(n);
          const material = ring.material as THREE.MeshStandardMaterial;
          const ringColor = RING_COLORS[index] || RING_COLORS[0];

          ring.visible = isOccupied;
          material.color.setHex(ringColor.primary);
          material.emissive.setHex(isOccupied ? ringColor.glow : 0x000000);
          material.emissiveIntensity = isOccupied ? 0.4 : 0;
          material.opacity = isOccupied ? 1.0 : 0;

          if (isOccupied) {
            console.log('Ring n=', n, 'visible=', ring.visible, 'opacity=', material.opacity, 'position.y=', ring.position.y);
          }
        });

        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading STL:', err);
        setError('Failed to load 3D model');
        setIsLoading(false);
      }
    );

    const animate = () => {
      if (!sceneRef.current) return;

      sceneRef.current.animationId = requestAnimationFrame(animate);

      if (sceneRef.current.stars) {
        sceneRef.current.stars.rotation.y += 0.0003;
        sceneRef.current.stars.rotation.x += 0.0001;
      }

      if (sceneRef.current.mesh && autoRotateRef.current) {
        sceneRef.current.mesh.rotation.z += 0.003;
        sceneRef.current.wellRings.forEach(ring => {
          ring.rotation.z += 0.003;
        });
        if (sceneRef.current.transitionBeam) {
          sceneRef.current.transitionBeam.rotation.y += 0.003;
        }
      }

      if (transitionAnimRef.current?.active) {
        transitionAnimRef.current.progress += 0.02;

        if (transitionAnimRef.current.progress >= 1) {
          transitionAnimRef.current.active = false;

          if (sceneRef.current.transitionBeam) {
            sceneRef.current.scene.remove(sceneRef.current.transitionBeam);
            (sceneRef.current.transitionBeam.material as THREE.Material).dispose();
            sceneRef.current.transitionBeam.geometry.dispose();
            sceneRef.current.transitionBeam = null;
          }

          updateWellHighlights(selectedZRef.current, selectedSeriesRef.current);
          onTransitionComplete?.();
        } else {
          const beam = sceneRef.current.transitionBeam;
          if (beam) {
            const material = beam.material as THREE.MeshStandardMaterial;
            const pulse = Math.sin(transitionAnimRef.current.progress * Math.PI * 4) * 0.3 + 0.7;
            material.opacity = pulse;
            material.emissiveIntensity = pulse * 1.5;
          }
        }
      }

      sceneRef.current.controls.update();
      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
    };
    animate();

    const handleResize = () => {
      if (!sceneRef.current || !containerRef.current) return;

      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.controls.dispose();
        sceneRef.current.renderer.dispose();

        if (sceneRef.current.mesh) {
          sceneRef.current.mesh.geometry.dispose();
          (sceneRef.current.mesh.material as THREE.Material).dispose();
        }

        sceneRef.current.wellRings.forEach(ring => {
          ring.geometry.dispose();
          (ring.material as THREE.Material).dispose();
        });

        if (sceneRef.current.transitionBeam) {
          sceneRef.current.transitionBeam.geometry.dispose();
          (sceneRef.current.transitionBeam.material as THREE.Material).dispose();
        }
      }

      if (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      initializedRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`relative ${className}`} data-testid="agqf-viewer">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#4d9aaf] border-t-transparent rounded-full animate-spin" />
            <span className="text-[#4d9aaf] text-sm">Loading 3D Model...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
      <a
        href="/anchor-well-landscape"
        className="absolute bottom-3 left-3 text-sm text-[#6bc4d9] hover:text-white hover:underline transition-colors"
        data-testid="link-anchor-well-landscape"
      >
        View Full 4D Quaternionic Anchor Wells
      </a>
    </div>
  );
}
