import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter3Section3_3() {
  useEffect(() => {
    document.title = "Section 3.3: The Bi-Invariant Metric and Levi-Civita Connection | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn about the bi-invariant metric on S³, the Levi-Civita connection, and the constant positive curvature of the 3-sphere in quaternionic geometry.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 3 · Section 3.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Bi-Invariant Metric and Levi-Civita Connection
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Measuring distances, angles, and curvature on <InlineMath math="S^3" />
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              To do geometry, we need to measure. A <em>metric</em> tells us the length of curves, the angle between vectors, and the distance between points. On <InlineMath math="S^3" />, there's a natural choice: the round metric inherited from the embedding in <InlineMath math="\mathbb{R}^4" />. This metric has a remarkable property—it's invariant under both left and right multiplication by unit quaternions. This bi-invariance makes <InlineMath math="S^3" /> a particularly symmetric space.
            </p>

            <p>
              This section introduces the bi-invariant metric, develops the Levi-Civita connection (the unique "derivative" compatible with the metric), and computes the curvature of <InlineMath math="S^3" />. The result—constant positive curvature—is what makes the 3-sphere a model space in Riemannian geometry.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do we measure length, angle, and change on S3 without flattening it?"
              plainLanguageSetup="Section 3.2 gave each point a tangent space. Now we need rules for measuring vectors in those tangent spaces and differentiating fields as they move across the curved sphere."
              formulaRecap={
                <>
                  <PrettyBlockMath math="g_q(v,w)=\mathrm{Re}(\bar v w),\qquad \nabla_XY=\frac12[X,Y]" />
                  <p>
                    The metric <InlineMath math="g_q" /> measures tangent-vector length and angle. The connection <InlineMath math="\nabla" /> tells how vector fields change while respecting that metric.
                  </p>
                </>
              }
              checkpoint="What does bi-invariant mean in this setting?"
              revealAnswer="The metric is preserved by both left and right multiplication by unit quaternions, so measuring does not depend on where the group action moves the state."
              finalTakeaway="The metric and connection make calculus on S3 intrinsic: distances, angles, and derivatives are defined on the curved state space itself."
              nextStep="Section 3.4 uses this geometry to define the Laplace-Beltrami operator and its allowed modes."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Round Metric</h2>

            <p>
              The simplest metric on <InlineMath math="S^3" /> comes from viewing it as a subset of <InlineMath math="\mathbb{R}^4" />. At each point <InlineMath math="q \in S^3" />, we measure the length of tangent vectors using the standard Euclidean inner product:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="g_q(v, w) = \langle v, w \rangle = v_0w_0 + v_1w_1 + v_2w_2 + v_3w_3" />
            </div>

            <p>
              for tangent vectors <InlineMath math="v, w \in T_qS^3" />. This is called the <em>round metric</em> because it makes <InlineMath math="S^3" /> a perfectly round sphere—all points are equivalent, and the curvature is the same everywhere.
            </p>

            <p>
              In quaternionic terms, the metric can be written as:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="g_q(v, w) = \mathrm{Re}(\bar{v}w)" />
            </div>

            <p>
              where <InlineMath math="\bar{v}" /> is the quaternion conjugate. This formula makes it clear that the metric respects the algebraic structure of quaternions.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Bi-Invariance</h2>

            <p>
              The round metric has a special symmetry: it's unchanged by both left and right multiplication. If <InlineMath math="p \in S^3" /> is any unit quaternion, then:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="g_{pq}(pv, pw) = g_q(v, w) \quad \text{and} \quad g_{qp}(vp, wp) = g_q(v, w)" />
            </div>

            <p>
              In other words, left multiplication <InlineMath math="L_p" /> and right multiplication <InlineMath math="R_p" /> are isometries—they preserve all distances and angles. This bi-invariance is rare and special; most Lie groups have left-invariant metrics that aren't right-invariant, or vice versa.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition</p>
              <p className="text-gray-700">
                Bi-invariance means the geometry of <InlineMath math="S^3" /> looks the same from every vantage point and in every orientation. There's no preferred location, no preferred direction. This extreme symmetry is why <InlineMath math="S^3" /> serves as a model space—a benchmark against which other curved spaces can be compared.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Levi-Civita Connection</h2>

            <p>
              To differentiate vector fields on a curved manifold, we need a <em>connection</em>—a rule for comparing vectors at nearby points. The Levi-Civita connection is the unique connection that:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Is compatible with the metric: differentiating a dot product follows the product rule</li>
              <li>Is torsion-free: parallel transport around infinitesimal loops produces no twist</li>
            </ul>

            <p>
              On <InlineMath math="S^3" /> with the round metric, the Levi-Civita connection takes a particularly simple form. For left-invariant vector fields <InlineMath math="X" /> and <InlineMath math="Y" /> (fields that are constant in the group multiplication sense), the covariant derivative is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\nabla_X Y = \frac{1}{2}[X, Y]" />
            </div>

            <p>
              where <InlineMath math="[X, Y]" /> is the Lie bracket. This formula says that differentiation is controlled by the commutator—the algebraic structure determines the geometry.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Curvature</h2>

            <p>
              The curvature of a Riemannian manifold measures how much parallel transport around a loop rotates vectors. On <InlineMath math="S^3" />, the curvature is constant and positive—the space curves uniformly in all directions.
            </p>

            <p>
              The Riemann curvature tensor is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="R(X, Y)Z = \frac{1}{4}[[X, Y], Z]" />
            </div>

            <p>
              For the unit 3-sphere (radius 1), the sectional curvature is <InlineMath math="K = 1" /> in every 2-plane direction. This means every 2-dimensional slice through <InlineMath math="S^3" /> curves like a unit 2-sphere.
            </p>

            <p>
              The Ricci curvature (a trace of the Riemann tensor) and scalar curvature are:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\mathrm{Ric} = 2g, \quad R = 6" />
            </div>

            <p>
              These values characterize <InlineMath math="S^3" /> as a space of maximal symmetry. Among all three-dimensional Riemannian manifolds, only <InlineMath math="S^3" />, Euclidean <InlineMath math="\mathbb{R}^3" />, and hyperbolic <InlineMath math="H^3" /> have constant sectional curvature.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                Constant positive curvature implies that <InlineMath math="S^3" /> is "positively curved everywhere equally." Geodesics (straightest paths) will eventually reconverge, just as great circles on an ordinary sphere always meet again at the antipodal point. This global behavior shapes the spectrum of the Laplacian.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Killing Form</h2>

            <p>
              On any Lie group, there's a natural bilinear form on the Lie algebra called the Killing form. For <InlineMath math="\mathfrak{su}(2)" />, it is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="B(X, Y) = -\frac{1}{2}\mathrm{tr}(\mathrm{ad}_X \circ \mathrm{ad}_Y)" />
            </div>

            <p>
              where <InlineMath math="\mathrm{ad}_X" /> is the adjoint representation. For compact Lie groups like <InlineMath math="S^3" />, the Killing form is negative definite, and its negative gives a natural inner product on the Lie algebra. This inner product extends to the bi-invariant metric on the group.
            </p>

            <p>
              The fact that the Killing form, the round metric, and the quaternionic inner product all give the same geometry (up to scale) is not a coincidence—it reflects the deep unity of the algebraic, geometric, and analytic structures on <InlineMath math="S^3" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Distance and Geodesics Preview</h2>

            <p>
              The metric determines distances. The geodesic distance between two points <InlineMath math="p, q \in S^3" /> is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="d(p, q) = \arccos(\mathrm{Re}(\bar{p}q))" />
            </div>

            <p>
              This is the arc length along the shortest great circle connecting <InlineMath math="p" /> and <InlineMath math="q" />. Since <InlineMath math="\bar{p}q" /> is also a unit quaternion, its real part lies between -1 and 1, and the distance ranges from 0 to <InlineMath math="\pi" />. Antipodal points (like <InlineMath math="1" /> and <InlineMath math="-1" />) are at maximum distance <InlineMath math="\pi" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Looking Ahead</p>
              <p className="text-gray-700">
                With the metric and connection in hand, we're ready to build differential operators. The next section introduces the Laplace-Beltrami operator—the curved-space generalization of the ordinary Laplacian—and connects it to the spectrum of spherical harmonics on <InlineMath math="S^3" />.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-3/section-3-2" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Section 3.2</span>
          </Link>
          <MarkCompleteButton type="section" id="section-3-3" title="Section 3.3" />
          <Link href="/chapter-3/section-3-4" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Section 3.4</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
