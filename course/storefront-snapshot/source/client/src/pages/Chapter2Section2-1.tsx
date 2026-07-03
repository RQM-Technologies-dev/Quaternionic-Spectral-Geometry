import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter2Section2_1() {
  useEffect(() => {
    document.title = "Section 2.1: Deriving the Axis-Angle Form | QSG Textbook";
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
            <div className="text-white/70 text-sm mb-2">Section 2.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Deriving the Axis–Angle Form
            </h1>
            <p className="text-xl text-white/90 italic">
              <InlineMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" />
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          <p className="text-lg leading-relaxed mb-6">
            Chapter 1 showed that unit quaternions live on <InlineMath math="S^3" /> and can act on vectors by conjugation. The question now is how to read one unit quaternion before it acts: which axis does it use, and how much rotation does it represent?
          </p>

          <p className="text-lg leading-relaxed mb-6">
            The axis-angle form answers that question. It separates one quaternion into a direction <InlineMath math="\mathbf{u}" /> and an amount <InlineMath math="\varphi" />. Read the formula first as a coordinate label for rotation, then as a bridge into the formal derivation.
          </p>

          <QSGSectionTeachingBlock
            learnerQuestion="How can one quaternion display both the rotation axis and the rotation amount?"
            plainLanguageSetup="A unit quaternion has one scalar coordinate and one vector direction. The unit constraint lets those two parts be written as cosine and sine of the same parameter."
            formulaRecap={
              <>
                <PrettyBlockMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" />
                <p>
                  Here <InlineMath math="\mathbf{u}" /> is the unit axis in the imaginary directions and <InlineMath math="\varphi" /> is the quaternionic half-angle used by the rotation action.
                </p>
              </>
            }
            checkpoint="Which part of the axis-angle form tells you the axis, and which part tells you the amount?"
            revealAnswer="The unit imaginary quaternion u gives the axis. The cosine/sine parameter φ gives the position along the S³ great circle, corresponding to half the physical rotation angle."
            finalTakeaway="Axis-angle form turns a unit quaternion from four coordinates into a readable rotation instruction."
            nextStep="The following sections connect this form to exponential notation, matrices, and the SU(2) / SO(3) relationship."
          />

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Unit Constraint as a Sphere</h2>

          <p className="mb-4">
            Consider a quaternion written in its most general form as <InlineMath math="q = a + \mathbf{v}" />, where <InlineMath math="a" /> is a real number (the scalar part) and <InlineMath math="\mathbf{v} = b\mathbf{i} + c\mathbf{j} + d\mathbf{k}" /> is a three-dimensional vector (the imaginary or vector part). The quaternion represents a rotation when it has unit norm:
          </p>

          <PrettyBlockMath math="|q|^2 = a^2 + |\mathbf{v}|^2 = a^2 + b^2 + c^2 + d^2 = 1." />

          <p className="mb-4">
            This equation describes a 3-sphere embedded in four-dimensional space—the set of all points at unit distance from the origin in <InlineMath math="\mathbb{R}^4" />. Just as the ordinary 2-sphere <InlineMath math="S^2" /> consists of all points <InlineMath math="(x, y, z)" /> satisfying <InlineMath math="x^2 + y^2 + z^2 = 1" />, the 3-sphere <InlineMath math="S^3" /> consists of all quaternions <InlineMath math="(a, b, c, d)" /> satisfying the unit constraint.
          </p>

          <p className="mb-4">
            The key insight is that this curved space of unit quaternions can represent orientation states. Every point on <InlineMath math="S^3" /> corresponds to a way of orienting an object in three-dimensional space, and conversely, every orientation corresponds to a point (actually two points, but we'll address that subtlety later) on <InlineMath math="S^3" />.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Parameterizing the Constraint</h2>

          <p className="mb-4">
            The unit constraint <InlineMath math="a^2 + |\mathbf{v}|^2 = 1" /> has the same form as the Pythagorean identity <InlineMath math="\cos^2\varphi + \sin^2\varphi = 1" />. This suggests a natural parameterization:
          </p>

          <PrettyBlockMath math="a = \cos\varphi, \quad |\mathbf{v}| = \sin\varphi." />

          <p className="mb-4">
            Here <InlineMath math="\varphi" /> is a real parameter that we can think of as a "half-angle"—the geometric meaning will become clear shortly. This parameterization elegantly separates the scalar and vector parts: <InlineMath math="a = \cos\varphi" /> tells us how much of the quaternion lies along the real axis, while <InlineMath math="|\mathbf{v}| = \sin\varphi" /> tells us how far the quaternion extends into the imaginary hyperplane.
          </p>

          <p className="mb-4">
            Now we need to specify the direction of <InlineMath math="\mathbf{v}" />. Since we know its magnitude is <InlineMath math="\sin\varphi" />, we can write:
          </p>

          <PrettyBlockMath math="\mathbf{v} = \mathbf{u}\sin\varphi," />

          <p className="mb-4">
            where <InlineMath math="\mathbf{u}" /> is a unit vector in three-dimensional space (the imaginary part of <InlineMath math="\mathbb{H}" />). This unit vector <InlineMath math="\mathbf{u}" /> is the axis of rotation—the direction that remains unchanged when the rotation is applied.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Axis-Angle Form</h2>

          <p className="mb-4">
            Combining these observations, we arrive at the fundamental representation:
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>The Axis-Angle Form</p>
            <PrettyBlockMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" />
            <p className="mt-2 text-sm">
              where <InlineMath math="|\mathbf{u}| = 1" /> is the rotation axis and <InlineMath math="2\varphi" /> is the rotation angle.
            </p>
          </div>

          <p className="mb-4">
            The factor of 2 in the rotation angle is crucial: the quaternionic parameter <InlineMath math="\varphi" /> is half the physical rotation angle. This reflects the fact that <InlineMath math="S^3" /> double-covers the rotation group <InlineMath math="\mathrm{SO}(3)" />—a deep topological property that we'll explore in Section 2.3.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Geometric Interpretation</h2>

          <p className="mb-4">
            The axis-angle form has a beautiful geometric interpretation. Think of the unit quaternion as a point on the 3-sphere. The real part <InlineMath math="\cos\varphi" /> measures the "alignment" with the identity rotation (the quaternion <InlineMath math="1" />), while the imaginary part <InlineMath math="\mathbf{u}\sin\varphi" /> measures the "deviation" along the rotation axis.
          </p>

          <p className="mb-4">
            When <InlineMath math="\varphi = 0" />, we have <InlineMath math="q = 1" />—the identity rotation that leaves everything unchanged. As <InlineMath math="\varphi" /> increases from 0 to <InlineMath math="\pi/2" />, the quaternion traces a great circle on <InlineMath math="S^3" />, moving from the identity toward <InlineMath math="q = \mathbf{u}" /> (a 180° rotation about axis <InlineMath math="\mathbf{u}" />). Continuing to <InlineMath math="\varphi = \pi" /> brings us to <InlineMath math="q = -1" />, which represents a 360° rotation—the same physical orientation as the identity, but with opposite quaternion sign.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>The Role of the Axis</p>
            <p className="mb-2">
              The unit imaginary quaternion <InlineMath math="\mathbf{u}" /> serves a dual role:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>It specifies the axis of rotation in physical 3D space</li>
              <li>It satisfies <InlineMath math="\mathbf{u}^2 = -1" />, making it behave like the imaginary unit <InlineMath math="i" /> in complex numbers</li>
            </ul>
            <p className="mt-2">
              This second property is what allows the exponential form <InlineMath math="e^{\mathbf{u}\varphi}" /> to equal <InlineMath math="\cos\varphi + \mathbf{u}\sin\varphi" />.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Exponential Form</h2>

          <p className="mb-4">
            The axis-angle form can be written more compactly using the quaternionic exponential:
          </p>

          <PrettyBlockMath math="e^{\mathbf{u}\varphi} = \cos\varphi + \mathbf{u}\sin\varphi." />

          <p className="mb-4">
            This formula is the quaternionic analog of Euler's famous identity <InlineMath math="e^{i\theta} = \cos\theta + i\sin\theta" />. It works because <InlineMath math="\mathbf{u}^2 = -1" />, so the Taylor series for <InlineMath math="e^{\mathbf{u}\varphi}" /> splits into even terms (giving cosine) and odd terms (giving sine times <InlineMath math="\mathbf{u}" />).
          </p>

          <p className="mb-4">
            The exponential form reveals that every unit quaternion is the exponential of a pure imaginary quaternion. Since pure imaginary quaternions form a three-dimensional vector space (isomorphic to <InlineMath math="\mathbb{R}^3" />), the exponential map wraps this flat tangent space onto the curved 3-sphere. This is the quaternionic version of how the exponential map wraps the real line onto the unit circle in complex numbers.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Why the Half-Angle?</h2>

          <p className="mb-4">
            A natural question arises: why does the quaternionic parameter <InlineMath math="\varphi" /> represent half the physical rotation angle? The answer lies in how quaternions act on vectors.
          </p>

          <p className="mb-4">
            To rotate a vector <InlineMath math="\mathbf{v}" /> by a quaternion <InlineMath math="q" />, we use the conjugation action:
          </p>

          <PrettyBlockMath math="\mathbf{v}' = q\mathbf{v}q^{-1}." />

          <p className="mb-4">
            The vector gets multiplied by <InlineMath math="q" /> on the left and by <InlineMath math="q^{-1}" /> on the right. Each multiplication contributes half the rotation, so the total rotation is <InlineMath math="2\varphi" />. This "double-sided" action is essential for maintaining the purely imaginary nature of rotated vectors.
          </p>

          <p className="mb-4">
            The half-angle property also explains why <InlineMath math="q" /> and <InlineMath math="-q" /> represent the same rotation: if we replace <InlineMath math="q" /> with <InlineMath math="-q" /> in the conjugation formula, the signs cancel:
          </p>

          <PrettyBlockMath math="(-q)\mathbf{v}(-q)^{-1} = (-1)q\mathbf{v}q^{-1}(-1)^{-1} = q\mathbf{v}q^{-1}." />

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
            <p>
              The axis-angle form <InlineMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" /> is not merely a convenient parameterization—it reveals the intrinsic geometry of rotations. The angle <InlineMath math="\varphi" /> measures arc length on <InlineMath math="S^3" />, the axis <InlineMath math="\mathbf{u}" /> determines the geodesic direction, and the exponential form <InlineMath math="e^{\mathbf{u}\varphi}" /> shows that rotation is fundamentally an exponential process.
            </p>
          </div>

        </div>
      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-2-1" title="Section 2.1" />

          <Link href="/chapter-2/section-2-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 2.2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
