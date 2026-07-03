import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_1() {
  useEffect(() => {
    document.title = "Section 1.1: From ℝ to ℂ to ℍ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore the journey from real numbers through complex numbers to quaternions, understanding how each algebraic extension adds new geometric capabilities.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              From <InlineMath math="\mathbb{R}" /> to <InlineMath math="\mathbb{C}" /> to <InlineMath math="\mathbb{H}" />
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              The geometric journey through number systems
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The question in this section is simple: why do we need more than the real line and the complex plane? Real numbers measure along one axis. Complex numbers add a plane where phase and rotation become algebra. Quaternions add the extra directions needed when rotation is no longer confined to a plane.
            </p>

            <p>
              Read this first section as a map of the course's starting problem. QSG provides a coordinate framework for situations where phase, direction, and rotation need to stay connected. We begin with the real line, move to the complex plane, and arrive at quaternions as the first coordinate system in the course that can carry three-dimensional orientation.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="Why did mathematics move beyond real and complex numbers, and what problem do quaternions solve?"
              plainLanguageSetup="Each number system adds one kind of geometric freedom: the real line measures position, the complex plane carries planar phase, and quaternions carry phase with orientation."
              formulaRecap={
                <>
                  <PrettyBlockMath math="q = a + bi + cj + dk" />
                  <p>
                    Here <InlineMath math="a" /> is the real part and <InlineMath math="bi + cj + dk" /> is the three-direction imaginary part. This is the first formula to read as a coordinate object rather than just a new kind of number.
                  </p>
                </>
              }
              checkpoint="What geometric ability is added when we move from complex numbers to quaternions?"
              revealAnswer="Complex numbers make planar rotation algebraic. Quaternions add enough imaginary directions to represent orientation and rotation in three dimensions."
              finalTakeaway="The point of quaternions in this course is not novelty. They give QSG a coordinate system where rotations, wave phase, and orientation can be discussed together."
              nextStep="Section 1.2 splits a quaternion into scalar and vector parts so that this coordinate object becomes usable."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Real Numbers: Measuring Along a Line</h2>

            <p>
              The real numbers <InlineMath math="\mathbb{R}" /> form a complete ordered field. Every point on an infinite line corresponds to a real number, and every real number to a point. This is the geometry of one dimension—magnitude and direction along a single axis. We can add, subtract, multiply, and divide (except by zero), and everything stays on the line.
            </p>

            <p>
              But the real line has a limitation: it knows nothing of turning. To rotate, we need a second dimension. And that's exactly what the complex numbers provide.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Complex Numbers: Rotation Made Algebraic</h2>

            <p>
              The complex numbers <InlineMath math="\mathbb{C} = \{x + iy : i^2 = -1\}" /> extend the real line into a plane. The key insight is the polar form:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="z = re^{i\theta} = r(\cos\theta + i\sin\theta)" />
            </div>

            <p>
              In this representation, multiplication becomes transparent. When you multiply two complex numbers, their magnitudes multiply and their angles add. Rotation by angle <InlineMath math="\theta" /> is literally multiplication by <InlineMath math="e^{i\theta}" />. The abstract operation of rotation has become concrete algebra.
            </p>

            <p>
              The complex numbers remain commutative—the order of multiplication doesn't matter. This reflects the fact that rotations in two dimensions commute: rotating by <InlineMath math="\alpha" /> then <InlineMath math="\beta" /> is the same as rotating by <InlineMath math="\beta" /> then <InlineMath math="\alpha" />. The plane has only one axis of rotation, so there's no conflict.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Quaternions: Three-Dimensional Turning</h2>

            <p>
              In three dimensions, we have three independent axes of rotation. And rotations around different axes do not commute—rotating around the x-axis then the y-axis gives a different result than rotating around the y-axis then the x-axis. Any algebra that captures 3D rotation must reflect this fundamental asymmetry.
            </p>

            <p>
              The quaternions <InlineMath math="\mathbb{H}" /> are exactly such an algebra. Hamilton discovered them in 1843 with the famous relations:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="i^2 = j^2 = k^2 = ijk = -1" />
            </div>

            <p>
              These equations encode three independent "quarter-turn" directions. Each of <InlineMath math="i" />, <InlineMath math="j" />, and <InlineMath math="k" /> behaves like the complex <InlineMath math="i" />—squaring to <InlineMath math="-1" />—but they interact in a structured way:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="ij = k, \quad jk = i, \quad ki = j" />
            </div>

            <p>
              The reversed products carry a minus sign: <InlineMath math="ji = -k" />, <InlineMath math="kj = -i" />, <InlineMath math="ik = -j" />. This non-commutativity is not a defect—it's the algebraic expression of the fact that 3D rotations don't commute.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>What to Picture</p>
              <p className="text-gray-700">
                Think of <InlineMath math="i" />, <InlineMath math="j" />, and <InlineMath math="k" /> as three perpendicular turning axes. Multiplying by <InlineMath math="i" /> rotates in one plane; multiplying by <InlineMath math="j" /> rotates in another. The order in which you perform these rotations changes the outcome—and the quaternion multiplication table captures this exactly.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Definition 1.1: The Quaternion Algebra</h2>

            <p>
              A quaternion <InlineMath math="q \in \mathbb{H}" /> has the form:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="q = a + bi + cj + dk" />
            </div>

            <p>
              where <InlineMath math="a, b, c, d \in \mathbb{R}" />. The basis <InlineMath math="\{1, i, j, k\}" /> satisfies Hamilton's relations, making <InlineMath math="\mathbb{H}" /> a four-dimensional real algebra—non-commutative, but still a division algebra where every nonzero element has a multiplicative inverse.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Complex Planes Inside Quaternions</h2>

            <p>
              Here's a beautiful fact: the quaternions contain infinitely many copies of the complex plane. For any unit imaginary quaternion <InlineMath math="u" /> (meaning <InlineMath math="|u| = 1" /> and <InlineMath math="u^2 = -1" />), the set:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\mathbb{C}_u = \{x + uy : x, y \in \mathbb{R}\}" />
            </div>

            <p>
              forms a complex plane isomorphic to <InlineMath math="\mathbb{C}" />. You can think of <InlineMath math="\mathbb{H}" /> as the real axis with uncountably many complex pages attached, all sharing the same real line but fanning out in different directions through the imaginary dimensions.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                This structure lets you use familiar complex analysis tools within quaternions. Pick any axis <InlineMath math="u" />, and you can work in that complex slice using all your complex intuition. Then switch to a different axis when needed. The quaternions unify all these complex planes into a single coherent algebra.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Pattern of Extension</h2>

            <p>
              Looking back, we see a pattern. Each extension—from <InlineMath math="\mathbb{R}" /> to <InlineMath math="\mathbb{C}" /> to <InlineMath math="\mathbb{H}" />—adds exactly the algebraic structure needed to capture the next level of geometric complexity:
            </p>

            <ul className="list-none space-y-4 my-6">
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>ℝ</span>
                <span>Magnitude along a line. One-dimensional geometry.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>ℂ</span>
                <span>Magnitude and phase in a plane. Two-dimensional rotation as multiplication.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>ℍ</span>
                <span>Magnitude and 3D orientation. Full rotational freedom, with non-commutativity reflecting the geometry of 3D turning.</span>
              </li>
            </ul>

            <p>
              The quaternions are where this progression naturally ends for our purposes. There are further extensions (the octonions, for instance), but they lose associativity. For the geometry of rotations and orientations in three-dimensional space, the quaternions are exactly right—rich enough to capture everything, constrained enough to remain computationally tractable.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-1" title="Section 1.1" />

          <Link href="/chapter-1/section-1-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
