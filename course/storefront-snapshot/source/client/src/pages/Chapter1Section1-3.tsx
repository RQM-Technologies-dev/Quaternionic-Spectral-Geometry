import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_3() {
  useEffect(() => {
    document.title = "Section 1.3: Non-Commutativity and Its Necessity | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Understand why quaternions must be non-commutative: because 3D rotations themselves don't commute. The algebra mirrors the geometry.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Non-Commutativity and Its Necessity
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Why order matters in three dimensions
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Section 1.2 gave us the scalar-vector split. The next question is why quaternion multiplication refuses to behave like ordinary number multiplication. Why should <InlineMath math="ij" /> and <InlineMath math="ji" /> be different?
            </p>

            <p>
              The answer is physical, not decorative. In three dimensions, changing the order of rotations changes the final orientation. Quaternion multiplication is non-commutative because it is trying to model that real geometric fact.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="Why does quaternion multiplication need order to matter?"
              plainLanguageSetup="Because 3D rotations happen around axes, and each rotation changes the frame in which the next rotation is applied."
              formulaRecap={
                <>
                  <PrettyBlockMath math="ij = k,\qquad ji = -k" />
                  <p>
                    The same two axes appear in both products, but reversing the order reverses the orientation sign. That sign is the algebraic record of rotation order.
                  </p>
                </>
              }
              checkpoint="What would go wrong if quaternion multiplication were commutative?"
              revealAnswer="It would treat rotations around different axes as if their order did not matter, which is false for real 3D orientation."
              finalTakeaway="Non-commutativity is not a technical annoyance. It is the reason quaternions can represent the order-sensitive geometry that complex numbers cannot."
              nextStep="Section 1.4 restricts attention to unit quaternions, the points that live on S³ and represent orientation states."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Example 1.6: The Fundamental Non-Commutativity</h2>

            <p>
              The simplest example uses the basis elements themselves:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="ij = k \quad \text{but} \quad ji = -k" />
            </div>

            <p>
              Multiplying <InlineMath math="i" /> by <InlineMath math="j" /> gives <InlineMath math="k" />. Multiplying in the opposite order gives <InlineMath math="-k" />—the same axis, but the opposite direction. The sign flip encodes the reversal of orientation that comes from swapping the order of two perpendicular rotations.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Physical Reality</h2>

            <p>
              Why don't 3D rotations commute? Consider two rotations:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>Rotation A:</strong> 90° around the x-axis (tilting forward)
              </li>
              <li>
                <strong>Rotation B:</strong> 90° around the z-axis (turning left)
              </li>
            </ul>

            <p>
              If you perform A then B, the z-axis has moved during rotation A. So rotation B happens around a different physical direction than if you had done B first. The rotations "interfere" with each other because each one changes the frame of reference for the next.
            </p>

            <p>
              In two dimensions, there's only one axis of rotation (perpendicular to the plane), so no such interference occurs. That's why complex numbers can be commutative while still representing all 2D rotations. But in three dimensions, the interference is inescapable.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Key Insight</p>
              <p className="text-gray-700">
                Quaternion non-commutativity is not a defect—it's a feature. Any commutative algebra would fail to represent 3D rotations correctly. The quaternions succeed precisely because their multiplication law mirrors the composition law of rotations in physical space.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Cyclic Structure</h2>

            <p>
              The quaternion multiplication table has a beautiful cyclic symmetry:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="ij = k, \quad jk = i, \quad ki = j" />
            </div>

            <p>
              Going around the cycle <InlineMath math="i \to j \to k \to i" /> gives positive products. Going backwards gives negative products:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="ji = -k, \quad kj = -i, \quad ik = -j" />
            </div>

            <p>
              This cyclic structure mirrors the right-hand rule of vector cross products. Indeed, if you interpret <InlineMath math="i, j, k" /> as unit vectors along the x, y, z axes, the quaternion products match the cross products exactly: <InlineMath math="\hat{x} \times \hat{y} = \hat{z}" />, and so on.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Commutativity in Special Cases</h2>

            <p>
              While quaternion multiplication is non-commutative in general, there are important special cases where it does commute:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>Real quaternions:</strong> If both <InlineMath math="p" /> and <InlineMath math="q" /> are real numbers (no imaginary part), then <InlineMath math="pq = qp" />.
              </li>
              <li>
                <strong>Parallel axes:</strong> If <InlineMath math="p" /> and <InlineMath math="q" /> lie in the same complex slice <InlineMath math="\mathbb{C}_u" /> (rotations around the same axis), they commute.
              </li>
              <li>
                <strong>With its own conjugate:</strong> Every quaternion commutes with its conjugate: <InlineMath math="q\bar{q} = \bar{q}q = |q|^2" />.
              </li>
            </ul>

            <p>
              These exceptions make sense geometrically. Rotations around the same axis do commute—scaling and rotating in a plane is the complex number situation again. Non-commutativity only appears when the rotation axes are different.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Embracing the Structure</h2>

            <p>
              Once you accept non-commutativity as natural, the quaternions become remarkably elegant. The multiplication table is simple—just the cyclic relations <InlineMath math="ij = k" />, <InlineMath math="jk = i" />, <InlineMath math="ki = j" /> plus the rule that reversed orders gain a minus sign. From these, you can compute any quaternion product.
            </p>

            <p>
              The algebra remains associative: <InlineMath math="(pq)r = p(qr)" /> always holds. You can group multiplications however you like; only the order (left to right) matters. This is exactly the situation with rotations—composing three rotations gives the same result whether you group the first two or the last two, but changing the sequence changes the outcome.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Takeaway</p>
              <p className="text-gray-700">
                Non-commutativity is the algebraic expression of a geometric truth. In three dimensions, orientation is more subtle than in two, and the quaternions capture this subtlety exactly. Their multiplication law is not arbitrary—it's the unique structure that makes them isomorphic to the group of 3D rotations.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.2
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-3" title="Section 1.3" />

          <Link href="/chapter-1/section-1-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.4
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
