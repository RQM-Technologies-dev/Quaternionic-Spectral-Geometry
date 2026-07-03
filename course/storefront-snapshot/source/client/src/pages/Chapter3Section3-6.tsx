import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter3Section3_6() {
  useEffect(() => {
    document.title = "Section 3.6: Geodesics and Parallel Transport | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore geodesics on the 3-sphere, understand great circles as shortest paths, and learn how parallel transport works in quaternionic geometry.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #1a3b47 0%, #2d5a69 50%, #3d7a8c 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(77, 154, 175, 0.4) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6">
            <Link href="/chapter-3-differential-geometry" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 3
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 3 · Section 3.6</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Geodesics and Parallel Transport
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Great circles and the geometry of shortest paths
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Geodesics are the straightest possible paths on a curved surface—the paths that particles follow when no forces act on them. On <InlineMath math="S^3" />, geodesics are the great circles, curves that wrap around the sphere and return to their starting point. Understanding these paths reveals the global structure of <InlineMath math="S^3" /> and connects geometry to dynamics.
            </p>

            <p>
              This section develops the theory of geodesics on <InlineMath math="S^3" />, shows how to compute them using quaternions, and introduces parallel transport—the rule for moving vectors along curves while keeping them "as straight as possible."
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What counts as a straight path when the state space is curved?"
              plainLanguageSetup="Section 3.5 gave us integration and size. Now we study motion itself: on S3, the straightest paths are geodesics, and parallel transport tells how tangent directions move along them."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\nabla_{\dot\gamma}\dot\gamma=0,\qquad \gamma(t)=q\cos t+v\sin t" />
                  <p>
                    The first equation says intrinsic acceleration is zero. The second gives a great-circle path starting at <InlineMath math="q" /> with tangent direction <InlineMath math="v" />.
                  </p>
                </>
              }
              checkpoint="Why does a geodesic on S3 bend in R4 but still count as straight?"
              revealAnswer="Straightness is measured intrinsically on S3. The path follows the sphere's geometry with no sideways acceleration, even though it curves in the surrounding R4."
              finalTakeaway="Geodesics and parallel transport give QSG a way to describe motion and direction without leaving the curved unit-quaternion space."
              nextStep="Section 3.7 summarizes the full differential-geometric toolkit before the course moves into spectral calculus."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>What is a Geodesic?</h2>

            <p>
              A geodesic is a curve that locally minimizes length—it's the path you'd follow if you walked straight ahead without turning. Mathematically, a curve <InlineMath math="\gamma(t)" /> is a geodesic if its velocity vector is parallel-transported along itself:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\nabla_{\dot{\gamma}} \dot{\gamma} = 0" />
            </div>

            <p>
              This equation says that the acceleration (the rate of change of velocity) vanishes when measured intrinsically on the manifold. On flat space, geodesics are straight lines. On curved spaces, they bend with the curvature—but they're still the "straightest" paths available.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition</p>
              <p className="text-gray-700">
                Think of walking on the Earth's surface. If you always walk straight ahead (not veering left or right), you'll trace a great circle—the equator, a meridian, or a tilted version. These are the geodesics of <InlineMath math="S^2" />. The geodesics of <InlineMath math="S^3" /> work the same way, just in one higher dimension.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Great Circles on <InlineMath math="S^3" /></h2>

            <p>
              Every geodesic on <InlineMath math="S^3" /> is a great circle—the intersection of <InlineMath math="S^3" /> with a 2-dimensional plane through the origin in <InlineMath math="\mathbb{R}^4" />. Given a starting point <InlineMath math="q \in S^3" /> and an initial velocity <InlineMath math="v \in T_qS^3" /> with <InlineMath math="|v| = 1" />, the geodesic is:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\gamma(t) = q\cos(t) + v\sin(t)" />
            </div>

            <p>
              This is exactly the formula for a great circle: it starts at <InlineMath math="q" /> when <InlineMath math="t = 0" />, heads off in direction <InlineMath math="v" />, and returns to <InlineMath math="q" /> when <InlineMath math="t = 2\pi" />. The circle passes through the antipodal point <InlineMath math="-q" /> at <InlineMath math="t = \pi" />.
            </p>

            <p>
              In quaternionic language, if we write <InlineMath math="v = qu" /> for some unit imaginary quaternion <InlineMath math="u" />, the geodesic becomes:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\gamma(t) = q(\cos(t) + u\sin(t)) = q \cdot e^{ut}" />
            </div>

            <p>
              This is a one-parameter subgroup! Geodesics through the identity are exactly the one-parameter subgroups of the Lie group <InlineMath math="S^3" />—the curves of the form <InlineMath math="e^{ut}" /> for fixed <InlineMath math="u" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Distance Along Geodesics</h2>

            <p>
              The distance from <InlineMath math="q" /> to <InlineMath math="q'" /> along the shortest geodesic is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="d(q, q') = \arccos(\mathrm{Re}(\bar{q}q'))" />
            </div>

            <p>
              Since <InlineMath math="\bar{q}q'" /> is a unit quaternion, its real part lies between -1 and 1, and the distance ranges from 0 to <InlineMath math="\pi" />. Two points are antipodal (maximally distant) if and only if <InlineMath math="q' = -q" />.
            </p>

            <p>
              Between any two non-antipodal points, there's a unique shortest geodesic. Between antipodal points, there are infinitely many geodesics of the same length <InlineMath math="\pi" />—they form a 2-sphere's worth of paths.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                The existence of cut points (antipodal pairs with multiple shortest paths) is a global feature that affects the behavior of waves on <InlineMath math="S^3" />. Waves that leave a point will refocus at the antipodal point, creating interference patterns. This is related to the eigenvalue structure of the Laplacian.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Parallel Transport</h2>

            <p>
              Parallel transport is a way of moving vectors along a curve while keeping them "as constant as possible." If <InlineMath math="\gamma(t)" /> is a curve and <InlineMath math="V(t)" /> is a vector field along the curve, we say <InlineMath math="V" /> is parallel if:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\nabla_{\dot{\gamma}} V = 0" />
            </div>

            <p>
              On flat space, this just means <InlineMath math="V" /> is constant. On curved space, parallel vectors rotate as they move, and the total rotation around a closed loop measures the curvature enclosed.
            </p>

            <p>
              On <InlineMath math="S^3" />, parallel transport along a geodesic <InlineMath math="\gamma(t) = qe^{ut}" /> takes a particularly nice form. A vector <InlineMath math="V_0 \in T_qS^3" /> parallel transports to:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="V(t) = e^{ut/2} V_0 e^{-ut/2}" />
            </div>

            <p>
              This is conjugation by a half-angle rotation—the same transformation that converts quaternionic multiplication to 3D rotation. The symmetry is no accident: parallel transport on <InlineMath math="S^3" /> is intimately connected to the rotation action.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Holonomy</h2>

            <p>
              When you parallel transport a vector around a closed loop, it may return rotated. This rotation is called the holonomy of the loop. On <InlineMath math="S^3" />, the holonomy depends on the area enclosed by the loop (in a suitable sense).
            </p>

            <p>
              For a small loop enclosing area <InlineMath math="A" />, the holonomy is approximately a rotation by angle <InlineMath math="A" />. This is because the sectional curvature of <InlineMath math="S^3" /> is 1, and the Gauss-Bonnet theorem relates holonomy to curvature times area.
            </p>

            <p>
              The full holonomy group of <InlineMath math="S^3" />—the set of all possible rotations achievable by parallel transport around loops—is <InlineMath math="SO(3)" />. This reflects the fact that <InlineMath math="S^3" /> has "generic" curvature; no directions are distinguished.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Geodesics and the Exponential Map</h2>

            <p>
              The exponential map <InlineMath math="\exp_q: T_qS^3 \to S^3" /> sends a tangent vector <InlineMath math="v" /> to the point reached by following the geodesic from <InlineMath math="q" /> in direction <InlineMath math="v" /> for unit time:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\exp_q(v) = q\cos|v| + \frac{v}{|v|}\sin|v|" />
            </div>

            <p>
              At the identity, this is just the quaternionic exponential <InlineMath math="\exp(v) = e^v" />. The exponential map is surjective (every point can be reached) but not injective (vectors of length <InlineMath math="\pi" /> map to the antipodal point regardless of direction).
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Looking Ahead</p>
              <p className="text-gray-700">
                The geodesic structure of <InlineMath math="S^3" /> underlies much of spectral theory. Eigenfunction behavior, heat kernel asymptotics, and wave propagation all depend on how geodesics spread and refocus. In the final section, we'll summarize the key structures and preview how they feed into spectral analysis.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-3/section-3-5" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Section 3.5</span>
          </Link>
          <MarkCompleteButton type="section" id="section-3-6" title="Section 3.6" />
          <Link href="/chapter-3/section-3-7" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Section 3.7</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
