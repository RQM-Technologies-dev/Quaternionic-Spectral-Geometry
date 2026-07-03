import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_4() {
  useEffect(() => {
    document.title = "Section 1.4: Unit Quaternions and the 3-Sphere S³ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Discover how unit quaternions form the 3-sphere S³, and how the axis-angle form connects quaternions to rotations through exponentials.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Unit Quaternions and the 3-Sphere <InlineMath math="S^3" />
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              The geometry of orientations
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The previous sections built the quaternion algebra. Now we ask which quaternions represent pure orientation rather than scaling. The answer is the unit quaternions: the quaternions whose norm is exactly one.
            </p>

            <p>
              These unit quaternions form <InlineMath math="S^3" />, the three-sphere. Read <InlineMath math="S^3" /> as the shape of all unit quaternion states. This is the first place where QSG's path from number to shape becomes visible: orientation is no longer just algebra; it is a space we can move on.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What space do pure quaternionic orientation states live on?"
              plainLanguageSetup="They live on S³, the unit sphere inside four-dimensional quaternion coordinates. Unit length keeps the quaternion from scaling the object and leaves only orientation behavior."
              formulaRecap={
                <>
                  <PrettyBlockMath math="S^3 = \{q \in \mathbb{H}: |q| = 1\},\qquad q = \cos\phi + u\sin\phi" />
                  <p>
                    The first formula says which quaternions are unit states. The second says how to read such a state as an axis <InlineMath math="u" /> plus an amount <InlineMath math="\phi" />.
                  </p>
                </>
              }
              checkpoint="Why do we restrict to unit quaternions before talking about orientation?"
              revealAnswer="Unit norm removes scaling. What remains is a point on S³ that can represent a pure orientation or rotation state."
              finalTakeaway="S³ is the geometric home for unit quaternions. Once orientation lives on a space, later chapters can study paths, derivatives, spectra, and resonance on that space."
              nextStep="Section 1.5 shows how a unit quaternion acts on vectors to perform an actual 3D rotation."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Definition 1.7: The Unit Quaternions</h2>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="S^3 = \{q \in \mathbb{H} : |q| = 1\}" />
            </div>

            <p>
              This is the set of all quaternions <InlineMath math="q = a + bi + cj + dk" /> satisfying <InlineMath math="a^2 + b^2 + c^2 + d^2 = 1" />. Geometrically, it's the unit sphere in <InlineMath math="\mathbb{R}^4" />—a three-dimensional surface (hence "3-sphere") living in four-dimensional space.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>What to Picture</p>
              <p className="text-gray-700">
                We can't directly visualize <InlineMath math="S^3" />, but we can understand it by analogy. Just as the ordinary sphere <InlineMath math="S^2" /> has no edges or boundaries—you can walk forever without falling off—<InlineMath math="S^3" /> is similarly smooth and boundaryless, but one dimension higher. Every point on <InlineMath math="S^3" /> represents a "pure orientation state."
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Theorem 1.8: The Axis-Angle Form</h2>

            <p>
              Every unit quaternion can be written in the form:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="q = \cos\phi + u\sin\phi" />
            </div>

            <p>
              where <InlineMath math="u" /> is a unit pure imaginary quaternion (<InlineMath math="|u| = 1" />, <InlineMath math="u^2 = -1" />) and <InlineMath math="\phi \in [0, \pi]" />.
            </p>

            <p>
              This is the quaternion version of polar form. The angle <InlineMath math="\phi" /> tells you how far from <InlineMath math="1" /> you've traveled along the sphere, and the unit imaginary <InlineMath math="u" /> tells you which direction you're traveling—which axis of rotation you're moving around.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Geometric Meaning</h2>

            <p>
              Split any unit quaternion into its real and imaginary parts: <InlineMath math="q = a + v" />. The unit norm condition <InlineMath math="a^2 + |v|^2 = 1" /> means we can always write <InlineMath math="a = \cos\phi" /> and <InlineMath math="|v| = \sin\phi" /> for some angle <InlineMath math="\phi" />. If <InlineMath math="|v| \neq 0" />, we can factor out the magnitude: <InlineMath math="v = u\sin\phi" /> where <InlineMath math="u = v/|v|" /> is a unit imaginary.
            </p>

            <p>
              The axis-angle form reveals the geometric content:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>The axis <InlineMath math="u" />:</strong> A unit vector in 3D space, representing the axis of rotation.
              </li>
              <li>
                <strong>The angle <InlineMath math="\phi" />:</strong> The "half-angle" of rotation. The actual physical rotation angle is <InlineMath math="2\phi" /> (we'll see why in Section 1.5).
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Remark 1.9: Great Circles on S³</h2>

            <p>
              For a fixed axis <InlineMath math="u" />, the map <InlineMath math="\phi \mapsto \cos\phi + u\sin\phi" /> traces out a circle on <InlineMath math="S^3" />. This circle passes through both <InlineMath math="+1" /> (at <InlineMath math="\phi = 0" />) and <InlineMath math="-1" /> (at <InlineMath math="\phi = \pi" />).
            </p>

            <p>
              These are great circles—geodesics on <InlineMath math="S^3" />, the "straightest possible" paths on the sphere. Just as great circles on the ordinary sphere <InlineMath math="S^2" /> are the shortest paths between points, these great circles on <InlineMath math="S^3" /> are the shortest paths between orientations.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                Constant-axis rotations are geodesics on <InlineMath math="S^3" />. This means that spinning around a fixed axis at constant speed traces the shortest path through orientation space. Quaternion interpolation (used in animation and robotics) follows these geodesics, giving the smoothest possible motion between orientations.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Exponential Map</h2>

            <p>
              The axis-angle form has an elegant expression using the exponential:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="e^{u\phi} = \cos\phi + u\sin\phi" />
            </div>

            <p>
              This is exactly analogous to Euler's formula <InlineMath math="e^{i\theta} = \cos\theta + i\sin\theta" /> from complex analysis. The formula holds because <InlineMath math="u^2 = -1" />, so the Taylor series for <InlineMath math="e^{u\phi}" /> splits into cosine (even terms) and sine (odd terms) just as it does for <InlineMath math="e^{i\theta}" />.
            </p>

            <p>
              The exponential map has a concrete role: it takes a "tangent vector" at the identity (a pure imaginary quaternion <InlineMath math="u\phi" /> representing an infinitesimal rotation) and produces the corresponding finite rotation on <InlineMath math="S^3" />. "Spin by angle <InlineMath math="\phi" /> around axis <InlineMath math="u" />" becomes simply <InlineMath math="e^{u\phi}" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Group Structure</h2>

            <p>
              The unit quaternions form a group under multiplication:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>Closure:</strong> If <InlineMath math="|p| = |q| = 1" />, then <InlineMath math="|pq| = |p||q| = 1" />.
              </li>
              <li>
                <strong>Identity:</strong> <InlineMath math="1" /> is the identity element.
              </li>
              <li>
                <strong>Inverse:</strong> For unit quaternions, <InlineMath math="q^{-1} = \bar{q}" /> (the conjugate).
              </li>
              <li>
                <strong>Associativity:</strong> Quaternion multiplication is associative.
              </li>
            </ul>

            <p>
              This group is called <InlineMath math="Sp(1)" /> or, when viewed as 2×2 complex matrices, <InlineMath math="SU(2)" />. It is the universal cover of the rotation group <InlineMath math="SO(3)" />, a fact we'll explore in later sections.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Big Picture</p>
              <p className="text-gray-700">
                <InlineMath math="S^3" /> is not just a geometric curiosity—it's the natural home for 3D orientation. Every point is a rotation, the group operation is rotation composition, and geodesics are constant-axis spins. This geometry underlies everything from spacecraft attitude control to character animation to quantum spin.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.3
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-4" title="Section 1.4" />

          <Link href="/chapter-1/section-1-5" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.5
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
