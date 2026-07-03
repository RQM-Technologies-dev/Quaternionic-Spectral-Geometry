import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_5() {
  useEffect(() => {
    document.title = "Section 1.5: Rotations in ℝ³ via Conjugation | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn how quaternions encode 3D rotations through the conjugation action, and understand the famous Euler-Rodrigues formula.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.5</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Rotations in <InlineMath math="\mathbb{R}^3" /> via Conjugation
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              How quaternions turn vectors
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Section 1.4 placed unit quaternions on <InlineMath math="S^3" /> and gave them an axis-angle form. The question now is operational: how does a point on <InlineMath math="S^3" /> actually rotate a vector in ordinary three-dimensional space?
            </p>

            <p>
              The answer is conjugation. Treat the vector as a pure imaginary quaternion, multiply by <InlineMath math="q" /> on the left and <InlineMath math="q^{-1}" /> on the right, and the result is the same vector turned in space without changing its length.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How does a unit quaternion turn an ordinary 3D vector?"
              plainLanguageSetup="A unit quaternion acts from both sides. The left multiplication starts the rotation, and the right multiplication by the inverse keeps the result inside the vector part."
              formulaRecap={
                <>
                  <PrettyBlockMath math="v' = qvq^{-1} = qv\bar q" />
                  <p>
                    Here <InlineMath math="v" /> is a pure imaginary quaternion representing a 3D vector. Because <InlineMath math="q" /> has unit norm, <InlineMath math="q^{-1} = \bar q" />.
                  </p>
                </>
              }
              checkpoint="Why do we multiply on both sides instead of using only qv?"
              revealAnswer="The two-sided action rotates the vector while keeping it pure imaginary and preserving its norm. A one-sided product would generally mix scalar and vector parts."
              finalTakeaway="Quaternion rotation is where the algebra becomes a working coordinate system: one unit quaternion can encode an axis and angle, then act directly on vectors."
              nextStep="The next sections use this rotation action to connect quaternions with matrices, double covers, and the geometry of S³."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Definition 1.10: The Adjoint Action</h2>

            <p>
              For a unit quaternion <InlineMath math="q" /> and a pure imaginary quaternion <InlineMath math="v \in \text{Im}\,\mathbb{H}" />, we define:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\text{Ad}_q(v) = qvq^{-1} = qv\bar{q}" />
            </div>

            <p>
              The last equality holds because for unit quaternions, <InlineMath math="q^{-1} = \bar{q}" />. This operation is called the adjoint action of <InlineMath math="q" /> on <InlineMath math="v" />.
            </p>

            <p>
              Why does this give a rotation? First, note that <InlineMath math="qv\bar{q}" /> is still pure imaginary (the real part vanishes), so we stay in the space of vectors. Second, the norm is preserved: <InlineMath math="|qv\bar{q}| = |q||v||\bar{q}| = |v|" />. This is a linear map that preserves lengths and keeps vectors as vectors—it must be a rotation or reflection. A continuity argument (the identity <InlineMath math="q = 1" /> gives the identity map, which is a rotation) shows it's always a proper rotation.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Theorem 1.11: The Euler-Rodrigues Formula</h2>

            <p>
              If <InlineMath math="q = \cos\phi + u\sin\phi" /> is a unit quaternion with axis <InlineMath math="u" /> and half-angle <InlineMath math="\phi" />, then for any vector <InlineMath math="v" />:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg border-2" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderColor: '#3d7a8c' }}>
              <PrettyBlockMath math="qv\bar{q} = v\cos(2\phi) + (u \times v)\sin(2\phi) + u(u \cdot v)(1 - \cos(2\phi))" />
            </div>

            <p>
              This is the classical Rodrigues rotation formula. Let's understand each term:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong><InlineMath math="v\cos(2\phi)" />:</strong> The component of <InlineMath math="v" /> that gets "rotated towards" its perpendicular.
              </li>
              <li>
                <strong><InlineMath math="(u \times v)\sin(2\phi)" />:</strong> The component perpendicular to both <InlineMath math="u" /> and <InlineMath math="v" />, arising from the rotation.
              </li>
              <li>
                <strong><InlineMath math="u(u \cdot v)(1 - \cos(2\phi))" />:</strong> The component along the axis <InlineMath math="u" />, which stays fixed.
              </li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Half-Angle Mystery Explained</p>
              <p className="text-gray-700">
                Notice that the physical rotation angle is <InlineMath math="2\phi" />, not <InlineMath math="\phi" />. The quaternion <InlineMath math="q = \cos\phi + u\sin\phi" /> rotates vectors by twice its own "angle" parameter. This factor of 2 is fundamental—it's why we need to go all the way around <InlineMath math="S^3" /> (<InlineMath math="2\pi" /> in the half-angle) to return to the identity, even though the physical rotation returns after <InlineMath math="2\pi" />.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Geometric Decomposition</h2>

            <p>
              Decompose any vector <InlineMath math="v" /> into components parallel and perpendicular to the rotation axis <InlineMath math="u" />:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="v = v_\parallel + v_\perp, \quad v_\parallel = u(u \cdot v), \quad v_\perp = v - v_\parallel" />
            </div>

            <p>
              The rotation leaves the parallel part unchanged and rotates the perpendicular part by angle <InlineMath math="2\phi" /> in the plane perpendicular to <InlineMath math="u" />:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="qv\bar{q} = v_\parallel + (\text{rotation of } v_\perp \text{ by } 2\phi)" />
            </div>

            <p>
              This is the essence of axis-angle rotation: the axis stays fixed, everything else circles around it.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Corollary 1.12: The Double Cover</h2>

            <p>
              A crucial observation: the quaternions <InlineMath math="q" /> and <InlineMath math="-q" /> give the same rotation.
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="qv\bar{q} = (-q)v\overline{(-q)} = (-q)v(-\bar{q}) = qv\bar{q}" />
            </div>

            <p>
              The negatives cancel. This means every 3D rotation corresponds to exactly two unit quaternions, antipodal points on <InlineMath math="S^3" />. This is the famous double cover of <InlineMath math="SO(3)" /> by <InlineMath math="S^3" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Spinors vs. Rotations</p>
              <p className="text-gray-700">
                The unit quaternions (spinors) live on <InlineMath math="S^3" />. Physical rotations (orientations) live on <InlineMath math="SO(3) \cong S^3/\{\pm 1\}" />. Every rotation has two spinor representatives. This distinction is physically meaningful: electrons are spinors, not rotations, and they really do require a 720° turn (not 360°) to return to their initial state.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Composition of Rotations</h2>

            <p>
              One of the most powerful features of the quaternion representation: composing rotations is just quaternion multiplication.
            </p>

            <p>
              If <InlineMath math="q_1" /> and <InlineMath math="q_2" /> are unit quaternions, then applying first <InlineMath math="q_1" /> then <InlineMath math="q_2" /> to a vector <InlineMath math="v" /> gives:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="q_2(q_1 v \bar{q}_1)\bar{q}_2 = (q_2 q_1) v \overline{(q_2 q_1)}" />
            </div>

            <p>
              The composite rotation is represented by <InlineMath math="q_2 q_1" />. No trigonometry, no rotation matrices—just multiply quaternions. This efficiency is why quaternions dominate in applications requiring frequent rotation composition.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Why Conjugation?</h2>

            <p>
              Why is the formula <InlineMath math="qvq^{-1}" /> and not simply <InlineMath math="qv" /> or <InlineMath math="vq" />? The product <InlineMath math="qv" /> of a unit quaternion and a pure imaginary quaternion is generally not pure imaginary—it has a real part. Conjugation by <InlineMath math="q" /> ensures that:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>Pure imaginary vectors remain pure imaginary (we stay in <InlineMath math="\mathbb{R}^3" />)</li>
              <li>The operation is norm-preserving (lengths don't change)</li>
              <li>The operation is a group homomorphism (composition works correctly)</li>
            </ul>

            <p>
              The conjugation action is the unique way to turn quaternion multiplication into a rotation action on 3D vectors.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.4
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-5" title="Section 1.5" />

          <Link href="/chapter-1/section-1-6" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.6
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
