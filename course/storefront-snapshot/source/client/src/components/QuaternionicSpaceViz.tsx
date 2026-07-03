import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function QuaternionicSpaceViz() {
  const complexRef = useRef<HTMLCanvasElement>(null);
  const quatRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!complexRef.current || !quatRef.current) return;

    // ---------- Scene A: Complex plane ----------
    const rendA = new THREE.WebGLRenderer({ canvas: complexRef.current, antialias: true, alpha: true });
    rendA.setPixelRatio(Math.min(2, window.devicePixelRatio));
    const sceneA = new THREE.Scene();
    const camA = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camA.position.set(0, 0, 6);
    const ctrlA = new OrbitControls(camA, rendA.domElement);
    ctrlA.enablePan = false; ctrlA.enableZoom = false;

    const grid = new THREE.GridHelper(8, 16, 0x9fc4d6, 0x2f5a70);
    grid.rotation.x = Math.PI / 2;
    grid.material.transparent = true; grid.material.opacity = 0.35;
    sceneA.add(grid);

    const N = 1200;
    const ptsGeoA = new THREE.BufferGeometry();
    const posA = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      posA[3*i+0] = THREE.MathUtils.randFloatSpread(5);
      posA[3*i+1] = THREE.MathUtils.randFloatSpread(5);
      posA[3*i+2] = 0;
    }
    ptsGeoA.setAttribute("position", new THREE.BufferAttribute(posA, 3));
    const ptsA = new THREE.Points(ptsGeoA, new THREE.PointsMaterial({ size: 0.05, color: 0x9FDBFF, sizeAttenuation: true, transparent: true, opacity: 1.0 }));
    sceneA.add(ptsA);

    // ---------- Scene B: Quaternionic slices in 3D ----------
    const rendB = new THREE.WebGLRenderer({ canvas: quatRef.current, antialias: true, alpha: true });
    rendB.setPixelRatio(Math.min(2, window.devicePixelRatio));
    const sceneB = new THREE.Scene();
    const camB = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camB.position.set(0.8, 1.0, 4.2);
    const ctrlB = new OrbitControls(camB, rendB.domElement);
    ctrlB.enableDamping = true; ctrlB.dampingFactor = 0.05;

    sceneB.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(2, 3, 4); sceneB.add(dir);

    const axes = new THREE.AxesHelper(3.2);
    axes.material.transparent = true; axes.material.opacity = 0.35;
    sceneB.add(axes);

    const makeSlice = (color: number, count: number) => {
      const geo = new THREE.BufferGeometry();
      const arr = new Float32Array(count * 3);
      geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      const mat = new THREE.PointsMaterial({ color, size: 0.05, sizeAttenuation: true, transparent: true, opacity: 0.95 });
      return new THREE.Points(geo, mat);
    };

    const count = 3000;
    const sliceI = makeSlice(0xff6b6b, count); // red
    const sliceJ = makeSlice(0x7dd87d, count); // green
    sceneB.add(sliceI, sliceJ);

    const fillSlices = () => {
      const pi = sliceI.geometry.attributes.position.array as Float32Array;
      const pj = sliceJ.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        // Slice i → embed (a0, a1, 0)
        const a0 = THREE.MathUtils.randFloatSpread(1);
        const a1 = Math.sqrt(Math.max(0, 1 - a0*a0)) * Math.sin(THREE.MathUtils.randFloat(0, 2*Math.PI));
        pi[3*i+0] = a0 * 1.6; pi[3*i+1] = a1 * 1.6; pi[3*i+2] = 0;

        // Slice j → embed (a0, 0, a2), with a small tilt for depth
        const b0 = THREE.MathUtils.randFloatSpread(1);
        const a2 = Math.sqrt(Math.max(0, 1 - b0*b0)) * Math.cos(THREE.MathUtils.randFloat(0, 2*Math.PI));
        const y = 0, z = a2 * 1.6;
        const ang = 0.25; // radians
        const ry =  y*Math.cos(ang) - z*Math.sin(ang);
        const rz =  y*Math.sin(ang) + z*Math.cos(ang);
        pj[3*i+0] = b0 * 1.6; pj[3*i+1] = ry; pj[3*i+2] = rz;
      }
      sliceI.geometry.attributes.position.needsUpdate = true;
      sliceJ.geometry.attributes.position.needsUpdate = true;
    };
    fillSlices();

    // ---------- Resize handling ----------
    function resize() {
      const set = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) => {
        const w = canvas.clientWidth, h = canvas.clientHeight || 300;
        renderer.setSize(w, h, false);
        camera.aspect = (w / h) || 1;
        camera.updateProjectionMatrix();
      };
      if (complexRef.current && quatRef.current) {
        set(rendA, camA, complexRef.current);
        set(rendB, camB, quatRef.current);
      }
    }
    resize();
    window.addEventListener("resize", resize);

    // ---------- Animate ----------
    let alive = true;
    const clock = new THREE.Clock();
    function tick() {
      if (!alive) return;
      const dt = Math.min(0.05, clock.getDelta());
      sliceI.rotation.y += 0.4 * dt;
      sliceJ.rotation.y += 0.4 * dt;
      sliceJ.rotation.x += 0.1 * dt;

      ctrlA.update(); ctrlB.update();
      rendA.render(sceneA, camA);
      rendB.render(sceneB, camB);
      requestAnimationFrame(tick);
    }
    tick();

    return () => {
      alive = false;
      window.removeEventListener("resize", resize);
      // Clean up renderers/controls
      ctrlA.dispose(); ctrlB.dispose();
      rendA.dispose(); rendB.dispose();
      ptsGeoA.dispose();
      sliceI.geometry.dispose(); sliceJ.geometry.dispose();
    };
  }, []);

  // Panels must have height or canvas won't render visibly
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-slate-50 to-blue-50 p-6"
           style={{minHeight: 360}}>
        <div className="text-lg font-semibold text-quantum-dark mb-4">Complex Plane (2-D)</div>
        <canvas ref={complexRef} className="w-full h-[300px] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900" />
        <div className="mt-4 flex gap-2">
          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">2D basis</span>
          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Standard I/Q</span>
          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Single slice</span>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-slate-50 to-green-50 p-6"
           style={{minHeight: 360}}>
        <div className="text-lg font-semibold text-quantum-dark mb-4">Quaternionic Space (Two Orthogonal Slices)</div>
        <canvas ref={quatRef} className="w-full h-[300px] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900" />
        <div className="mt-4 flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-quantum-gray">Slice i</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-quantum-gray">Slice j</span>
          </div>
        </div>
      </div>
    </div>
  );
}