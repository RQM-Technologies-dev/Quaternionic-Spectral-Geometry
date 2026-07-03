import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter2Section2_2() {
  useEffect(() => {
    document.title = "Section 2.2: Exponential and Logarithm on S³ | QSG Textbook";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="relative overflow-hidden mt-16" style={{
        background: 'linear-gradient(135deg, #1a3b47 0%, #2d5a69 50%, #3d7a8c 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(77, 154, 175, 0.4) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6">
            <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 2
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Section 2.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Exponential and Logarithm on <InlineMath math="S^3" />
            </h1>
            <p className="text-xl text-white/90 italic">
              The Bridge Between Flat and Curved Geometry
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          <p className="text-lg leading-relaxed mb-6">
            The exponential and logarithm are the fundamental tools for moving between the curved world of rotations on <InlineMath math="S^3" /> and the flat world of infinitesimal changes in its tangent space. They allow us to linearize rotation problems, compute smooth interpolations, and understand the periodic structure of spin.
          </p>

          <QSGSectionTeachingBlock
            learnerQuestion="Why does the rotation form look like a quaternionic version of Euler's formula?"
            plainLanguageSetup="Section 2.1 introduced q = cos phi + u sin phi as the basic rotation handle. This section explains why that form comes from exponentiating an imaginary quaternion: angle plus direction becomes a point on S3."
            formulaRecap={
              <>
                <PrettyBlockMath math="e^{u\varphi}=\cos\varphi+u\sin\varphi" />
                <p>
                  The unit imaginary <InlineMath math="u" /> supplies the axis and <InlineMath math="\varphi" /> supplies the half-angle along the great circle.
                </p>
              </>
            }
            checkpoint="Why does the exponential of a pure imaginary quaternion stay on S3?"
            revealAnswer="Its real and imaginary parts are cos phi and u sin phi, whose squared lengths add to one when |u| = 1."
            finalTakeaway="The exponential map turns a linear tangent-space generator into a unit quaternion on the rotation sphere."
            nextStep="Section 2.3 compares the unit-quaternion picture with the SO(3) rotation group it covers."
          />

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Tangent Space at the Identity</h2>

          <p className="mb-4">
            At the identity quaternion <InlineMath math="q = 1" />, the tangent space to <InlineMath math="S^3" /> consists of all directions in which we can move while staying on the sphere to first order. These directions are precisely the pure imaginary quaternions:
          </p>

          <PrettyBlockMath math="T_1 S^3 = \operatorname{Im}\mathbb{H} = \{x\mathbf{i} + y\mathbf{j} + z\mathbf{k} : x, y, z \in \mathbb{R}\}." />

          <p className="mb-4">
            This three-dimensional space is the Lie algebra of <InlineMath math="S^3" />, often denoted <InlineMath math="\mathfrak{su}(2)" /> or <InlineMath math="\mathfrak{sp}(1)" />. It represents infinitesimal rotations—rotations so small that their curvature is negligible. The exponential map takes these infinitesimal rotations and turns them into finite rotations on the sphere.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Quaternionic Exponential</h2>

          <p className="mb-4">
            For a general quaternion <InlineMath math="q = a + \mathbf{v}" /> with scalar part <InlineMath math="a" /> and vector part <InlineMath math="\mathbf{v}" />, the exponential is defined by the power series:
          </p>

          <PrettyBlockMath math="e^q = \sum_{n=0}^{\infty} \frac{q^n}{n!}." />

          <p className="mb-4">
            When computed, this series separates into scalar and vector components:
          </p>

          <PrettyBlockMath math="e^q = e^a\left(\cos|\mathbf{v}| + \frac{\mathbf{v}}{|\mathbf{v}|}\sin|\mathbf{v}|\right)." />

          <p className="mb-4">
            The scalar factor <InlineMath math="e^a" /> produces a scaling (like in complex numbers), while the term in parentheses is a unit quaternion. For pure imaginary quaternions (<InlineMath math="a = 0" />), the exponential always produces a point on <InlineMath math="S^3" />:
          </p>

          <PrettyBlockMath math="e^{\mathbf{v}} = \cos|\mathbf{v}| + \frac{\mathbf{v}}{|\mathbf{v}|}\sin|\mathbf{v}|." />

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>The Exponential as a Wrapping Map</p>
            <p>
              Think of <InlineMath math="\operatorname{Im}\mathbb{H}" /> as an infinite three-dimensional space. The exponential map wraps this flat space around the 3-sphere, like wrapping a sheet of paper around a ball. Lines through the origin in <InlineMath math="\operatorname{Im}\mathbb{H}" /> become great circles on <InlineMath math="S^3" />. The origin maps to the identity, and points farther from the origin wrap multiple times around the sphere.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Quaternionic Logarithm</h2>

          <p className="mb-4">
            The logarithm is the inverse of the exponential—it takes a point on <InlineMath math="S^3" /> and returns the corresponding point in the tangent space. For a unit quaternion <InlineMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" />, the principal logarithm is:
          </p>

          <PrettyBlockMath math="\log q = \mathbf{u}\varphi, \quad \varphi \in [0, \pi]." />

          <p className="mb-4">
            The result is a pure imaginary quaternion whose direction is the rotation axis <InlineMath math="\mathbf{u}" /> and whose magnitude is the half-angle <InlineMath math="\varphi" />. This makes physical sense: the logarithm extracts the infinitesimal generator of the rotation.
          </p>

          <p className="mb-4">
            However, because the exponential map wraps <InlineMath math="\operatorname{Im}\mathbb{H}" /> around <InlineMath math="S^3" /> multiple times, the logarithm is inherently multi-valued:
          </p>

          <PrettyBlockMath math="\log q = \mathbf{u}(\varphi + 2\pi k), \quad k \in \mathbb{Z}." />

          <p className="mb-4">
            Each branch corresponds to adding more complete rotations before arriving at the same orientation. The principal branch (<InlineMath math="k = 0" />, <InlineMath math="\varphi \in [0, \pi]" />) gives the shortest path to the rotation.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The <InlineMath math="4\pi" /> Periodicity</h2>

          <p className="mb-4">
            The exponential map reveals a remarkable periodicity. Starting from the identity and moving along the tangent vector <InlineMath math="\mathbf{u}" />:
          </p>

          <PrettyBlockMath math="\begin{aligned}
e^{\mathbf{u}\cdot 0} &= 1, &
e^{\mathbf{u}\cdot \pi} &= \mathbf{u}, &
e^{\mathbf{u}\cdot 2\pi} &= -1, \\
e^{\mathbf{u}\cdot 3\pi} &= -\mathbf{u}, &
e^{\mathbf{u}\cdot 4\pi} &= 1.
\end{aligned}" />

          <p className="mb-4">
            The quaternion <InlineMath math="-1" /> appears at <InlineMath math="\varphi = \pi" />, corresponding to a 360° physical rotation. But <InlineMath math="-1 \neq 1" /> as quaternions! Only after another <InlineMath math="2\pi" /> (for a total of <InlineMath math="4\pi" />) do we return to the identity <InlineMath math="1" />.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>The Spinor Identity</p>
            <PrettyBlockMath math="e^{\mathbf{u}(\varphi + 2\pi)} = -e^{\mathbf{u}\varphi}, \quad e^{\mathbf{u}(\varphi + 4\pi)} = e^{\mathbf{u}\varphi}." />
            <p className="mt-2">
              This is the defining property of a spinor: it picks up a sign under 360° rotation and returns to itself only after 720°. The quaternion "remembers" how many times it has rotated, even though the resulting physical orientation is the same.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Geometric Interpretation</h2>

          <p className="mb-4">
            The exponential and logarithm provide different perspectives on the same geometry:
          </p>

          <p className="mb-4">
            <strong>The Exponential View:</strong> Start at the identity on <InlineMath math="S^3" />. Pick a direction <InlineMath math="\mathbf{u}" /> in the tangent space (a rotation axis). Walk distance <InlineMath math="\varphi" /> along the geodesic in that direction. The exponential <InlineMath math="e^{\mathbf{u}\varphi}" /> tells you where you arrive on the sphere.
          </p>

          <p className="mb-4">
            <strong>The Logarithm View:</strong> Start at a point <InlineMath math="q" /> on <InlineMath math="S^3" />. Ask: "What geodesic through the identity passes through <InlineMath math="q" />?" The logarithm <InlineMath math="\log q" /> gives the initial velocity vector of this geodesic, pointing from the identity toward <InlineMath math="q" />.
          </p>

          <p className="mb-4">
            Together, they establish a local coordinate system on <InlineMath math="S^3" /> centered at the identity. Points near the identity are parameterized by their logarithms (small imaginary quaternions), and these parameters can be exponentiated to recover the actual rotation.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Applications to Interpolation</h2>

          <p className="mb-4">
            The logarithm makes interpolation between rotations straightforward. To interpolate from <InlineMath math="q_0" /> to <InlineMath math="q_1" />:
          </p>

          <ol className="list-decimal ml-6 mb-6 space-y-2">
            <li>Compute the relative rotation: <InlineMath math="r = q_0^{-1} q_1" /></li>
            <li>Take its logarithm: <InlineMath math="\mathbf{w} = \log r" /></li>
            <li>Scale by the interpolation parameter: <InlineMath math="t \mathbf{w}" /> for <InlineMath math="t \in [0,1]" /></li>
            <li>Exponentiate and apply: <InlineMath math="q(t) = q_0 e^{t\mathbf{w}}" /></li>
          </ol>

          <p className="mb-4">
            This produces motion at constant angular velocity along the shortest great circle arc—exactly what's needed for smooth animation and robotics applications.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
            <p>
              The exponential map converts addition in the tangent space to multiplication on <InlineMath math="S^3" />: <InlineMath math="e^{\mathbf{v}_1 + \mathbf{v}_2} \approx e^{\mathbf{v}_1} e^{\mathbf{v}_2}" /> for small <InlineMath math="\mathbf{v}_1, \mathbf{v}_2" />. This is why we can compose infinitesimal rotations by adding their generators—the foundation of Lie group theory and its applications to physics.
            </p>
          </div>

        </div>
      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-2/section-2-1" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 2.1
          </Link>

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-2-2" title="Section 2.2" />

          <Link href="/chapter-2/section-2-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 2.3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
