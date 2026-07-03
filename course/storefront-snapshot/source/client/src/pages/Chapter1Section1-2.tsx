import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_2() {
  useEffect(() => {
    document.title = "Section 1.2: Algebraic Structure and Geometric Decomposition | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn how quaternions decompose into real and imaginary parts, and how conjugation, norm, and the dot-cross identity connect algebra to geometry.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Algebraic Structure and Geometric Decomposition
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              How quaternions split into scalars and vectors
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Section 1.1 introduced quaternions as the next coordinate system after the complex plane. The question now is practical: once we have <InlineMath math="q = a + bi + cj + dk" />, how do we read the pieces?
            </p>

            <p>
              The key move is to split each quaternion into a scalar part and a vector part. The scalar part behaves like the real coordinate. The vector part behaves like a 3D direction. Conjugation, norm, inverse, and multiplication then become tools for measuring and moving that combined object.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do we read a quaternion as geometry instead of just four symbols?"
              plainLanguageSetup="Split it into a scalar plus a vector. The scalar says how much lies on the real axis; the vector says which direction the imaginary part points in three-dimensional space."
              formulaRecap={
                <>
                  <PrettyBlockMath math="q = a + v,\qquad \bar q = a - v,\qquad |q|^2 = q\bar q = a^2 + |v|^2" />
                  <p>
                    Read these as the basic measurement tools: split the object, reverse its vector direction, and measure its total length in four coordinates.
                  </p>
                </>
              }
              checkpoint="Why is the scalar-vector split useful before learning quaternion multiplication?"
              revealAnswer="It lets you see which part behaves like a real magnitude and which part behaves like a 3D direction. That makes the dot-cross multiplication formula meaningful instead of mysterious."
              finalTakeaway="The scalar-vector split turns quaternions into readable geometry. It is the bridge from a new number system to a coordinate framework for direction and orientation."
              nextStep="Section 1.3 focuses on non-commutativity, the feature that lets quaternion multiplication match real 3D rotation order."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Scalar-Vector Decomposition</h2>

            <p>
              Every quaternion <InlineMath math="q" /> can be written as:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="q = a + v" />
            </div>

            <p>
              where <InlineMath math="a \in \mathbb{R}" /> is the scalar (or real) part, and <InlineMath math="v \in \text{Im}\,\mathbb{H} \cong \mathbb{R}^3" /> is the vector (or imaginary) part. We write <InlineMath math="v = bi + cj + dk" /> and think of it as a vector in three-dimensional space.
            </p>

            <p>
              This decomposition is natural and canonical. Given any quaternion, there's exactly one way to split it into its real and imaginary parts. The imaginary quaternions form a three-dimensional subspace—precisely the space of vectors we use in physics and geometry.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Definition 1.3: Conjugation and Norm</h2>

            <p>
              The conjugate of <InlineMath math="q = a + v" /> is defined by flipping the sign of the imaginary part:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\bar{q} = a - v" />
            </div>

            <p>
              The norm (or modulus) of <InlineMath math="q" /> is:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="|q|^2 = q\bar{q} = \bar{q}q = a^2 + |v|^2" />
            </div>

            <p>
              This is the Euclidean length of <InlineMath math="q" /> viewed as a vector in <InlineMath math="\mathbb{R}^4" />. Notice that conjugation and norm interact beautifully: the product <InlineMath math="q\bar{q}" /> always yields a non-negative real number, the square of the length.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Geometric Intuition</p>
              <p className="text-gray-700">
                Conjugation keeps the scalar part fixed and flips the vector part. If you think of the vector part as an "arrow" in 3D space, conjugation reverses that arrow while leaving the "amount of realness" unchanged. The norm measures total magnitude—how far from the origin in the four-dimensional quaternion space.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Inverse of a Quaternion</h2>

            <p>
              For any nonzero quaternion, we can compute its multiplicative inverse:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="q^{-1} = \frac{\bar{q}}{|q|^2}" />
            </div>

            <p>
              This formula mirrors the complex case: to invert <InlineMath math="q" />, conjugate it and divide by its squared magnitude. The existence of inverses for all nonzero quaternions makes <InlineMath math="\mathbb{H}" /> a division algebra—you can divide by anything except zero.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Proposition 1.4: The Multiplicative Norm</h2>

            <p>
              The quaternion norm has a remarkable property:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="|pq| = |p| \cdot |q|" />
            </div>

            <p>
              This says that the norm is multiplicative—the length of a product equals the product of the lengths. In geometric terms, multiplying quaternions composes their rotational actions without introducing any stretching or shrinking beyond what the individual factors contribute.
            </p>

            <p>
              This property is crucial for applications. It means that unit quaternions (those with <InlineMath math="|q| = 1" />) form a closed group under multiplication. Composing two unit quaternions always gives another unit quaternion. This is exactly what we need for rotations, which should preserve distances.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Lemma 1.5: The Dot-Cross Identity</h2>

            <p>
              Here is one of the most beautiful facts about quaternions. When you multiply two pure imaginary quaternions <InlineMath math="a, b \in \text{Im}\,\mathbb{H}" /> (that is, quaternions with zero real part), you get:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="ab = -a \cdot b + a \times b" />
            </div>

            <p>
              The product has two parts: a scalar equal to the negative of the dot product, and a vector equal to the cross product. In one multiplication, quaternions compute both the alignment (dot product) and the perpendicular direction (cross product) of two vectors.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>What This Means Geometrically</p>
              <p className="text-gray-700">
                When you multiply two 3D vectors as quaternions, the scalar part tells you "how aligned they are" (with a sign flip), and the vector part tells you "the oriented area they span." This fusion of metric and oriented geometry in a single operation is why quaternions appear naturally in physics—torque, angular momentum, and rotational kinematics all involve both dot and cross products.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Significance of the Decomposition</h2>

            <p>
              The scalar-vector decomposition is more than notation. It connects quaternion algebra to the familiar vector operations of physics:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>The scalar part</strong> after multiplying pure vectors gives metric information—lengths, angles, alignment.
              </li>
              <li>
                <strong>The vector part</strong> gives oriented geometric information—perpendicular directions, areas, the "handedness" of configurations.
              </li>
              <li>
                <strong>Full quaternion multiplication</strong> composes both simultaneously, enabling compact expressions for operations that would otherwise require separate dot and cross product calculations.
              </li>
            </ul>

            <p>
              This unification is not just elegant—it's computationally powerful. Formulas that would require multiple lines of vector algebra often collapse to single quaternion expressions. And because quaternion multiplication is associative (even though non-commutative), long chains of operations remain tractable.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Looking Ahead</h2>

            <p>
              With conjugation, norm, and the dot-cross identity in hand, we're ready to explore the deeper structure of quaternions. The next section examines non-commutativity—not as a limitation, but as the essential feature that makes quaternions capable of representing 3D rotations faithfully.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-1" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.1
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-2" title="Section 1.2" />

          <Link href="/chapter-1/section-1-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
