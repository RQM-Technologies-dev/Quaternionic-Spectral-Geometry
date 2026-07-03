import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_10() {
  useEffect(() => {
    document.title = "Section 1.10: Why S³ Is the Natural Home for Orientation | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Understand why the 3-sphere is the perfect mathematical setting for orientation, rotation, and angular momentum in physics and engineering.";
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
            <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 1
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.10</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Why <InlineMath math="S^3" /> Is the Natural Home for Orientation
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              The geometry that makes quaternions perfect
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              We've developed the algebra of quaternions, seen their connection to rotations, and explored the topology of the 3-sphere. Now we step back to ask: why is <InlineMath math="S^3" /> the right space for orientation? Why not use rotation matrices, Euler angles, or some other representation? The answer lies in the remarkable convergence of algebraic, geometric, and computational properties that make the 3-sphere uniquely suited to the task.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="Why not just use ordinary 3D coordinates?"
              plainLanguageSetup="Section 1.9 made S3 measurable as a curved state space. This section explains why that curvature is useful: orientation needs coordinates that compose smoothly and avoid singular cases."
              formulaRecap={
                <>
                  <PrettyBlockMath math="v' = qvq^{-1},\qquad q=\cos(\theta/2)+u\sin(\theta/2)" />
                  <p>
                    The quaternion <InlineMath math="q" /> stores axis and half-angle, while conjugation applies the rotation to a vector <InlineMath math="v" />.
                  </p>
                </>
              }
              checkpoint="What problem does S3 avoid that Euler-angle coordinates can have?"
              revealAnswer="Euler angles can hit coordinate singularities such as gimbal lock. Unit quaternions give a smooth representation across the whole rotation space, with only the q and -q double-cover ambiguity to track."
              finalTakeaway="S3 is useful because it gives stable, smooth coordinates for orientation and a natural rule for composing rotations."
              nextStep="Section 1.11 condenses the chapter into the ideas needed before the rotation form q = cos phi + u sin phi."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Completeness</h2>

            <p>
              Every 3D rotation can be expressed as <InlineMath math="v \mapsto qvq^{-1}" /> for some unit quaternion <InlineMath math="q" />. There are no gaps—the quaternion representation covers all of <InlineMath math="SO(3)" />. Moreover, the representation is uniform: no rotation is "special" or requires exceptional treatment. Every orientation is a point on <InlineMath math="S^3" />, and every point on <InlineMath math="S^3" /> is an orientation (or rather, two antipodal points share each orientation).
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Smoothness</h2>

            <p>
              The 3-sphere is a smooth manifold without singularities. There are no "poles" where behavior becomes degenerate, no coordinate singularities where the representation breaks down. Contrast this with Euler angles, which suffer from gimbal lock at the poles—certain configurations where one degree of freedom is lost.
            </p>

            <p>
              On <InlineMath math="S^3" />, geodesics are constant-axis rotations:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\gamma(t) = e^{ut\phi}" />
            </div>

            <p>
              traces the shortest path from identity to rotation by angle <InlineMath math="\phi" /> around axis <InlineMath math="u" />. These geodesics are great circles, and the sphere's curvature is constant and positive everywhere.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Stability</h2>

            <p>
              The half-angle parameterization <InlineMath math="q = \cos(\theta/2) + u\sin(\theta/2)" /> has a crucial property: small changes in <InlineMath math="q" /> produce small changes in the corresponding rotation. There is no threshold where a tiny perturbation causes a dramatic change in behavior. This stability is essential for numerical computation—quaternions don't suffer from the catastrophic errors that can plague other representations.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Gimbal Lock Avoidance</p>
              <p className="text-gray-700">
                Euler angles (yaw-pitch-roll) lose a degree of freedom at ±90° pitch: two of the three angles become redundant. This "gimbal lock" plagued early spacecraft navigation systems. Quaternions completely avoid this problem—every point on <InlineMath math="S^3" /> is equally well-behaved.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Analytic Comfort</h2>

            <p>
              The slice structure means that for any specific computation, you can often work in a 2D complex plane. Pick the axis <InlineMath math="u" /> relevant to your problem, and analyze the corresponding slice <InlineMath math="\mathbb{C}_u" /> using familiar complex techniques. The full power of complex analysis—residues, contour integration, conformal mappings—becomes available on a slice-by-slice basis.
            </p>

            <p>
              This is especially valuable for control systems and robotics, where you often care about rotation around a particular axis. The algebra restricts naturally to the relevant 2D subspace without losing information about the global structure.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Physics-Ready Algebra</h2>

            <p>
              The quaternion product encodes both metric and oriented geometric information simultaneously:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="ab = -a \cdot b + a \times b" />
            </div>

            <p>
              This fusion of dot product and cross product is exactly what physics needs. Consider the applications:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>Angular momentum:</strong> <InlineMath math="L = r \times p" /> combines position and momentum in a cross product.
              </li>
              <li>
                <strong>Torque:</strong> <InlineMath math="\tau = r \times F" /> gives the axis and magnitude of rotational force.
              </li>
              <li>
                <strong>Rigid body kinematics:</strong> The relationship between angular velocity <InlineMath math="\omega" /> and quaternion rate <InlineMath math="\dot{q}" /> is linear and simple.
              </li>
              <li>
                <strong>Spinors:</strong> Quantum spin states are naturally elements of the quaternion algebra, with measurement operators acting by conjugation.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Computational Efficiency</h2>

            <p>
              Quaternion operations are computationally efficient:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>Composition:</strong> Multiplying two quaternions takes 16 multiplications and 12 additions—cheaper than multiplying 3×3 rotation matrices.
              </li>
              <li>
                <strong>Rotation:</strong> The conjugation <InlineMath math="qvq^{-1}" /> is fast and avoids the transcendental function evaluations needed by angle-based methods.
              </li>
              <li>
                <strong>Interpolation:</strong> Spherical linear interpolation (SLERP) between quaternions gives smooth, constant-speed rotation paths.
              </li>
              <li>
                <strong>Normalization:</strong> Re-normalizing a quaternion (to correct for floating-point drift) is cheap—just divide by the magnitude.
              </li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Reader's Compass</p>
              <p className="text-gray-700">
                Keep "axis <InlineMath math="u" /> + half-angle <InlineMath math="\phi" />" in mind, and every formula has a picture: a point on <InlineMath math="S^3" /> is an axis-and-phase, composition is path-concatenation on the sphere, and the double cover explains why spinors differ from vectors. This geometric intuition makes quaternionic calculations transparent.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Summary</h2>

            <p>
              The 3-sphere <InlineMath math="S^3" /> is the natural home for 3D orientation because it satisfies all requirements simultaneously:
            </p>

            <ul className="list-none space-y-3 my-6">
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>✓</span>
                <span>Complete: covers all rotations uniformly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>✓</span>
                <span>Smooth: no singularities or degenerate configurations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>✓</span>
                <span>Stable: numerically robust and gimbal-lock-free</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>✓</span>
                <span>Analytic: complex-slice structure enables sophisticated analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>✓</span>
                <span>Physical: dot-cross product unification fits naturally with mechanics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>✓</span>
                <span>Efficient: fast computation for real-time applications</span>
              </li>
            </ul>

            <p>
              No other representation achieves all these properties. This is why quaternions have become the standard for orientation in fields from aerospace to gaming to quantum computing.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-9" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.9
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-10" title="Section 1.10" />

          <Link href="/chapter-1/section-1-11" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.11
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
