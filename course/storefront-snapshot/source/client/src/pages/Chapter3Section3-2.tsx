import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter3Section3_2() {
  useEffect(() => {
    document.title = "Section 3.2: Tangent Spaces and Lie Group Structure | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore tangent spaces on the 3-sphere and how the Lie group structure connects infinitesimal rotations to the quaternionic framework.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 3 · Section 3.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Tangent Spaces and Lie Group Structure
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Infinitesimal rotations and the algebra of <InlineMath math="\mathfrak{su}(2)" />
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              At every point on a curved surface, there's a flat plane that just touches the surface—the tangent plane. On the 3-sphere, these tangent spaces are three-dimensional, and they carry the infinitesimal structure of rotation. When we combine this local geometry with the global group structure of quaternion multiplication, we get a powerful framework: the Lie group <InlineMath math="S^3 \cong SU(2)" />.
            </p>

            <p>
              This section develops the tangent space at each point of <InlineMath math="S^3" />, shows how quaternion multiplication makes <InlineMath math="S^3" /> into a Lie group, and introduces the Lie algebra that governs infinitesimal rotations. These ideas are central to understanding how differential operators act on <InlineMath math="S^3" />.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="If states live on S3, how do we describe their possible directions of motion?"
              plainLanguageSetup="Chapter 2 gave us unit quaternions as rotation states. Ordinary flat-space directions are not enough on a curved sphere, so we need tangent spaces: the local flat directions available at each state."
              formulaRecap={
                <>
                  <PrettyBlockMath math="T_qS^3=\{v\in\mathbb{R}^4:\langle q,v\rangle=0\},\qquad T_1S^3=\operatorname{Im}\mathbb{H}" />
                  <p>
                    The first formula says tangent vectors are perpendicular to the radial direction <InlineMath math="q" />. At the identity, those directions are exactly the pure imaginary quaternions.
                  </p>
                </>
              }
              checkpoint="Why is the tangent space at the identity especially useful?"
              revealAnswer="It gives a shared algebraic model for infinitesimal rotations: the pure imaginary quaternions. Multiplication then transports that model to other points on S3."
              finalTakeaway="Tangent spaces turn motion on S3 into local directions, and the Lie group structure lets those directions be compared through quaternion multiplication."
              nextStep="Section 3.3 adds a metric and connection so those tangent directions can have lengths, angles, and derivatives."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Tangent Vectors as Velocities</h2>

            <p>
              Imagine a particle moving along a curve on <InlineMath math="S^3" />. At each instant, the particle has a velocity—a direction and speed of motion. This velocity vector "lives" in the tangent space at the particle's current position. The tangent space <InlineMath math="T_qS^3" /> at a point <InlineMath math="q" /> is the set of all possible velocities of curves passing through <InlineMath math="q" />.
            </p>

            <p>
              Since <InlineMath math="S^3" /> sits inside <InlineMath math="\mathbb{R}^4" />, we can describe tangent vectors concretely. A vector <InlineMath math="v \in \mathbb{R}^4" /> is tangent to <InlineMath math="S^3" /> at <InlineMath math="q" /> if it's perpendicular to <InlineMath math="q" /> itself:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="T_qS^3 = \{v \in \mathbb{R}^4 : \langle q, v \rangle = 0\}" />
            </div>

            <p>
              This makes geometric sense: since <InlineMath math="q" /> points radially outward from the origin, tangent directions must be perpendicular to that radial direction to stay on the sphere. At each point, <InlineMath math="T_qS^3" /> is a three-dimensional subspace of <InlineMath math="\mathbb{R}^4" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition</p>
              <p className="text-gray-700">
                Picture standing on a perfectly round ball. The ground beneath your feet is locally flat—that's the tangent plane. You can walk in any direction, but you can't walk directly upward (away from the center) or downward (into the ball). The tangent space consists of all "horizontal" directions.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Quaternionic Description</h2>

            <p>
              Using quaternion language, tangent vectors have a beautiful characterization. At the identity element <InlineMath math="1 \in S^3" />, the tangent space consists of all pure imaginary quaternions:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="T_1S^3 = \mathrm{Im}\mathbb{H} = \{bi + cj + dk : b, c, d \in \mathbb{R}\}" />
            </div>

            <p>
              At any other point <InlineMath math="q \in S^3" />, we can use left multiplication to translate the tangent space:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="T_qS^3 = q \cdot \mathrm{Im}\mathbb{H} = \{q \cdot v : v \in \mathrm{Im}\mathbb{H}\}" />
            </div>

            <p>
              This formula says: take any pure imaginary quaternion <InlineMath math="v" /> and multiply it on the left by <InlineMath math="q" />. The result is tangent to <InlineMath math="S^3" /> at <InlineMath math="q" />. The mapping <InlineMath math="v \mapsto qv" /> is an isometry—it preserves lengths and angles—so all tangent spaces look the same.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Lie Group Structure</h2>

            <p>
              What makes <InlineMath math="S^3" /> special among manifolds is that it's also a <em>group</em>. Quaternion multiplication gives us a way to combine any two points of <InlineMath math="S^3" />:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="q_1 \cdot q_2 \in S^3 \quad \text{whenever} \quad q_1, q_2 \in S^3" />
            </div>

            <p>
              The unit quaternions are closed under multiplication (the product of two unit quaternions is again a unit quaternion), and every unit quaternion has an inverse (its conjugate). This makes <InlineMath math="S^3" /> a group. The fact that multiplication is smooth makes it a <em>Lie group</em>.
            </p>

            <p>
              The Lie group <InlineMath math="S^3" /> is isomorphic to <InlineMath math="SU(2)" />, the group of <InlineMath math="2 \times 2" /> unitary matrices with determinant 1. This connection underlies the use of quaternions in quantum mechanics, where <InlineMath math="SU(2)" /> describes spin-1/2 particles.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                The group structure means that <InlineMath math="S^3" /> is homogeneous—every point looks like every other point. There's no "special" location on <InlineMath math="S^3" />. This symmetry dramatically simplifies analysis: we can often reduce problems to the identity element and then translate results everywhere using group multiplication.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Lie Algebra</h2>

            <p>
              The tangent space at the identity is special: it carries the structure of a <em>Lie algebra</em>, denoted <InlineMath math="\mathfrak{su}(2)" />. This is the space of pure imaginary quaternions, equipped with the commutator bracket:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="[u, v] = uv - vu" />
            </div>

            <p>
              For the basis elements <InlineMath math="i, j, k" />, the commutators are:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="[i, j] = 2k, \quad [j, k] = 2i, \quad [k, i] = 2j" />
            </div>

            <p>
              These relations encode how infinitesimal rotations combine. If you rotate infinitesimally around the <InlineMath math="x" />-axis and then around the <InlineMath math="y" />-axis, the difference from doing them in the opposite order is a rotation around the <InlineMath math="z" />-axis. The Lie bracket captures this non-commutativity precisely.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Infinitesimal Rotations</h2>

            <p>
              A pure imaginary quaternion <InlineMath math="v = b\,i + c\,j + d\,k" /> represents an infinitesimal rotation. The direction <InlineMath math="(b, c, d)" /> gives the rotation axis, and the magnitude <InlineMath math="\sqrt{b^2 + c^2 + d^2}" /> gives the infinitesimal rotation rate.
            </p>

            <p>
              To turn an infinitesimal rotation into a finite one, we use the exponential map:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\exp(v) = \cos|v| + \frac{v}{|v|}\sin|v|" />
            </div>

            <p>
              This takes an element of the Lie algebra (a tangent vector at the identity) and produces an element of the Lie group (a point on <InlineMath math="S^3" />). The exponential map is surjective—every unit quaternion can be reached—but not injective, since adding <InlineMath math="2\pi" /> to the magnitude gives the same group element with opposite sign.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Left and Right Actions</h2>

            <p>
              The group <InlineMath math="S^3" /> acts on itself in two ways. Left multiplication <InlineMath math="L_p(q) = pq" /> and right multiplication <InlineMath math="R_p(q) = qp" /> are both smooth maps from <InlineMath math="S^3" /> to itself. These actions commute with each other:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="L_p \circ R_r = R_r \circ L_p" />
            </div>

            <p>
              This double action is what gives <InlineMath math="S^3" /> its special relationship to <InlineMath math="SO(4)" />, the rotation group of four-dimensional space. In fact, the map <InlineMath math="(p, r) \mapsto (q \mapsto pqr^{-1})" /> gives a 2-to-1 covering <InlineMath math="S^3 \times S^3 \to SO(4)" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Looking Ahead</p>
              <p className="text-gray-700">
                The Lie group structure enables us to define invariant structures on <InlineMath math="S^3" />. In the next section, we'll construct the bi-invariant metric—a way of measuring distances and angles that respects both left and right multiplication. This metric is unique (up to scale) and makes <InlineMath math="S^3" /> into a space of constant positive curvature.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-3/section-3-1" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Section 3.1</span>
          </Link>
          <MarkCompleteButton type="section" id="section-3-2" title="Section 3.2" />
          <Link href="/chapter-3/section-3-3" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Section 3.3</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
