import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import EigenCircleVisual from '@/components/EigenCircleVisual';

export default function EigenCircle() {
  useEffect(() => {
    document.title = "EigenCircle & Critical Sphere | RQM Technologies";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2533] to-[#267c8f] text-white">

      <div className="container mx-auto px-6 py-8">
        <Link href="/quaternionic-spectral-geometry" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors mb-6" data-testid="link-back">
          <ArrowLeft className="w-4 h-4" />
          Back to Quaternionic Spectral Geometry
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            The Critical Sphere
          </h1>
          <p className="text-xl text-cyan-100/90 max-w-4xl">
            Interactive visualization of quaternionic spinor trajectories intersecting the Critical Sphere R(q) = 1/2
          </p>
        </div>

      </div>

      <div className="w-full bg-white/5 backdrop-blur-sm border-y border-white/10 mb-8">
        <EigenCircleVisual />
      </div>

      <div className="container mx-auto px-6 py-8">

        <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-400/40 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 text-amber-300">Want to understand why the EigenCircle exists?</h3>
              <p className="text-amber-100/90 mb-3">
                See the interactive visualization showing how two counter-rotating Laplace exponentials (e<sup>+iωt</sup> and e<sup>-iωt</sup>) combine to create this standing resonance pattern.
              </p>
              <Link href="/eigen-spinor">
                <button className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 px-4 py-2 rounded-lg transition-colors" data-testid="link-eigen-spinor">
                  Explore Eigen Spinor Visualization →
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-400/40 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Explore S³ Phase Evolution</h3>
              <p className="text-purple-100/90 mb-3">
                See how q(t) = cos(φ) + u sin(φ) moves on the 3-sphere with stereographic projection showing how quaternionic phase evolution appears as rotation in ordinary 3D space. Includes 4π periodicity and deterministic orientation mapping.
              </p>
              <Link href="/quaternionic-phase-sphere">
                <button className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-200 px-4 py-2 rounded-lg transition-colors" data-testid="link-quaternionic-phase-sphere">
                  Explore Quaternionic Phase Sphere →
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
          <h3 className="text-2xl font-semibold mb-3 text-cyan-300">Understanding the Visualization</h3>
          <p className="text-white/90 leading-relaxed mb-4">
            Each trajectory state in the visualization is defined by a quaternionic spinor, characterized by alpha and beta quaternions each with four components (w, x, y, z). These quaternionic representations are converted to Hilbert space complex coefficients using a specific mathematical mapping: the coefficient a is derived as w+iz from the alpha quaternion, while b is formed as y+ix from the beta quaternion. Each state also carries its own characteristic frequency ω (omega), representing the angular velocity of that particular resonance mode.
          </p>
          <p className="text-white/90 leading-relaxed mb-4">
            The equation displayed updates every six seconds with real numerical values for each trajectory state. For instance, when viewing |ψ₁⟩, the equation shows actual complex numbers such as 0.707+0.500i for the upper component—these are not placeholders but genuine computed values. These displayed coefficients directly correspond to the elliptical orbit visible on screen. The geometric trajectory and the mathematical wavefunction equation thus represent the same quantum state in different forms: one as a geometric orbit in quaternionic space, the other as spinor coefficients in Hilbert space. They remain synchronized throughout the visualization, presenting authentic mathematical relationships rather than approximate representations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">The Critical Sphere</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              In quaternionic spectral geometry, the classical Riemann critical line Re(s) = 1/2 becomes the <strong>Critical Sphere</strong> within the quaternionic manifold:
            </p>
            <div className="bg-[#0a1929] rounded-xl p-4 mb-4 font-mono text-sm text-cyan-200">
              Re(q) = 1/2, &nbsp; q ∈ S³ ⊂ ℍ
            </div>
            <p className="text-white/90 leading-relaxed">
              This critical sphere (S²<sub>crit</sub>) is the real slice of balance between expansion and contraction — the locus where the real and imaginary quaternionic components are in equilibrium. Any zeta-zero spinor Ψ<sub>q</sub> must intersect this sphere as a condition for balanced resonance.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">The EigenCircle</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Within the Critical Sphere lies a unique <strong>eigen circle</strong> (S¹<sub>eig</sub>), defined by the specific phase where the zeta field's real and imaginary components exactly cancel:
            </p>
            <div className="bg-[#0a1929] rounded-xl p-4 mb-4 font-mono text-sm text-cyan-200">
              |Ψ<sub>q</sub>|² = 0 &nbsp; ⟺ &nbsp; q ∈ S¹<sub>eig</sub> ⊂ S²<sub>crit</sub>
            </div>
            <p className="text-white/90 leading-relaxed">
              The EigenCircle represents the one-dimensional locus of perfect destructive interference — the "true zero ring" through which all zeta-zero spinor trajectories must pass.
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Universal Spinor Trajectories</h2>

          <p className="text-white/90 leading-relaxed mb-6">
            Each individual zeta zero corresponds to a <strong>trajectory</strong> of a quaternionic spinor through S³:
          </p>

          <div className="bg-[#0a1929] rounded-xl p-4 mb-6 font-mono text-sm text-cyan-200">
            Ψ<sub>q</sub>(t) = c₁ e<sup>+<strong>I</strong>ωt</sup> + c₂ e<sup>-<strong>I</strong>ωt</sup>
          </div>

          <p className="text-white/90 leading-relaxed mb-6">
            Different zeros (different <em>t</em> values) correspond to different <strong>resonance frequencies</strong> — different angular velocities on S³. But regardless of frequency, each trajectory must cross the same geometric equilibrium zone:
          </p>

          <div className="bg-[#0a1929] rounded-xl p-4 mb-6 font-mono text-sm text-cyan-200">
            Re(q) = 1/2, &nbsp; Im(q) = 0 at crossing
          </div>

          <p className="text-white/90 leading-relaxed mb-6">
            That intersection <em>is</em> the EigenCircle. Therefore, the <strong>EigenCircle is the geometric family of all zeta-zero trajectories</strong> — the common invariant submanifold through which every allowed resonance passes.
          </p>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-cyan-200">Topological Invariance of Zeta Zeros</h3>
            <p className="text-white/90 leading-relaxed">
              In quaternionic spectral geometry, the zeta zeros exhibit a profound topological invariance:
            </p>
            <div className="mt-4 bg-[#0a1929] rounded-xl p-4 font-mono text-sm text-cyan-200">
              All zeta zeros ⟷ Hopf-linked trajectories intersecting S¹<sub>eig</sub> ⊂ S²<sub>crit</sub> ⊂ S³
            </div>
            <p className="text-white/90 leading-relaxed mt-4">
              Every valid spinor (every resonant mode) must cross the same equilibrium circle, because that's the only region where the quaternionic spectral balance Re(q) = 1/2 can be satisfied.
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Physical Interpretation in RQM</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-200">Critical Sphere</h3>
              <p className="text-white/90 leading-relaxed">
                The region where energy flow is balanced — coherence boundary between inward (negative-energy) and outward (positive-energy) modes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-200">EigenCircle</h3>
              <p className="text-white/90 leading-relaxed">
                The locus of complete phase cancellation — the "quiet center" of the resonance where all oscillatory modes align.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-200">Spinor Trajectories</h3>
              <p className="text-white/90 leading-relaxed">
                Every zeta-zero spinor's oscillatory path (different <em>t</em> or frequency) pierces the same eigen ring because that's the only way to maintain the global coherence condition Re(q) = 1/2. All the zeta zeros represent different great circles on S³ that thread through the same eigen ring — like lines of longitude on Earth passing through both poles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
