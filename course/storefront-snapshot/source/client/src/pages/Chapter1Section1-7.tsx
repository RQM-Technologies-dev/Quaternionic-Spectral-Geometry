import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_7() {
  useEffect(() => {
    document.title = "Section 1.7: S³ as a Lie Group; Relation to SU(2) | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Understand how the 3-sphere S³ is isomorphic to SU(2), and explore the topology that explains spinor behavior.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.7</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              <InlineMath math="S^3" /> as a Lie Group
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              The connection to SU(2) and spinor topology
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The unit quaternions <InlineMath math="S^3" /> aren't just a geometric shape—they're a Lie group, a smooth manifold with a compatible group structure. This section reveals the deep connection between <InlineMath math="S^3" /> and the matrix group <InlineMath math="SU(2)" />, and explores the topology that underlies spinor physics.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="Why does the hypersphere also behave like a group of rotations?"
              plainLanguageSetup="Section 1.6 showed that complex planes live inside H. Now we focus on the unit quaternions: multiplying two unit quaternions stays on S3, so the hypersphere carries both geometry and composition."
              formulaRecap={
                <>
                  <PrettyBlockMath math="S^3 \cong SU(2),\qquad \det\rho(q)=|q|^2" />
                  <p>
                    The matrix model turns quaternion multiplication into matrix multiplication. When <InlineMath math="|q|=1" />, the determinant is 1, matching the special unitary condition.
                  </p>
                </>
              }
              checkpoint="Why does unit norm matter in the matrix model?"
              revealAnswer="Unit norm makes det rho(q) equal to 1 and keeps the matrix unitary, so unit quaternions match SU(2) rather than an arbitrary complex matrix group."
              finalTakeaway="S3 is a curved state space and a group at the same time, which is why it can describe rotation composition cleanly."
              nextStep="Section 1.8 uses the Hopf fibration to separate the direction carried by a unit quaternion from the phase that remains above that direction."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Proposition 1.13: The Matrix Model</h2>

            <p>
              Every quaternion <InlineMath math="q = a + bi + cj + dk" /> corresponds to a 2×2 complex matrix via the map:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\rho(q) = \begin{pmatrix} a + bi & c + di \\ -c + di & a - bi \end{pmatrix}" />
            </div>

            <p>
              This map <InlineMath math="\rho: \mathbb{H} \to M_2(\mathbb{C})" /> is a ring homomorphism: it preserves addition and multiplication. Moreover:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\det\rho(q) = |q|^2" />
            </div>

            <p>
              For unit quaternions (<InlineMath math="|q| = 1" />), the matrix <InlineMath math="\rho(q)" /> has determinant 1 and satisfies <InlineMath math="\rho(q)^\dagger \rho(q) = I" /> (it's unitary). This means unit quaternions correspond exactly to <InlineMath math="SU(2)" />—the group of 2×2 unitary matrices with determinant 1.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Isomorphism</p>
              <p className="text-gray-700">
                <InlineMath math="S^3 \cong SU(2)" /> as Lie groups. The 3-sphere of unit quaternions and the group of 2×2 special unitary matrices are the same mathematical object in different guises. Quaternion multiplication becomes matrix multiplication; geometric rotations become linear transformations on spinor space.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Lie Group Structure</h2>

            <p>
              A Lie group is a smooth manifold that's also a group, with the group operations (multiplication and inversion) being smooth maps. <InlineMath math="S^3" /> qualifies on all counts:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>Smooth manifold:</strong> <InlineMath math="S^3" /> is a smooth 3-dimensional surface in <InlineMath math="\mathbb{R}^4" />.
              </li>
              <li>
                <strong>Group structure:</strong> Quaternion multiplication provides the group operation; <InlineMath math="1" /> is the identity; <InlineMath math="\bar{q}" /> is the inverse of a unit quaternion.
              </li>
              <li>
                <strong>Smooth operations:</strong> Multiplication and conjugation are polynomial functions, hence infinitely differentiable.
              </li>
            </ul>

            <p>
              The Lie algebra of <InlineMath math="S^3" /> (or equivalently <InlineMath math="SU(2)" />) is the tangent space at the identity, which consists of pure imaginary quaternions <InlineMath math="\text{Im}\,\mathbb{H} \cong \mathbb{R}^3" />. The exponential map <InlineMath math="e^{u\phi}" /> maps from the Lie algebra to the group.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Corollary 1.14: Fundamental Topology</h2>

            <p>
              The topology of <InlineMath math="S^3" /> and <InlineMath math="SO(3)" /> differ in a crucial way:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="S^3 \text{ is simply connected}, \quad \pi_1(SO(3)) \cong \mathbb{Z}/2\mathbb{Z}" />
            </div>

            <p>
              "Simply connected" means every closed loop on <InlineMath math="S^3" /> can be continuously shrunk to a point. In contrast, <InlineMath math="SO(3)" /> has loops that cannot be shrunk—specifically, a 360° rotation around any axis is a non-trivial loop.
            </p>

            <p>
              This topological difference explains the double cover <InlineMath math="S^3 \to SO(3)" />. Every rotation in <InlineMath math="SO(3)" /> lifts to two antipodal points in <InlineMath math="S^3" />, and the non-trivial loop in <InlineMath math="SO(3)" /> (going around once) lifts to a path in <InlineMath math="S^3" /> that connects a point to its antipode.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The 720° Phenomenon</p>
              <p className="text-gray-700">
                This topology explains why spinors need a 720° rotation to return to their original state. A 360° rotation in physical space corresponds to a path from <InlineMath math="q" /> to <InlineMath math="-q" /> in <InlineMath math="S^3" />—you've moved to the antipodal point. Only after another 360° (720° total) do you return to the starting quaternion. This isn't a mathematical curiosity; it's measured in real experiments with spin-1/2 particles.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Why SU(2) Matters</h2>

            <p>
              The identification <InlineMath math="S^3 \cong SU(2)" /> bridges geometry and linear algebra. Unit quaternions act geometrically on 3D space via conjugation; <InlineMath math="SU(2)" /> matrices act linearly on 2D complex spinor space. These are two views of the same symmetry.
            </p>

            <p>
              In quantum mechanics, <InlineMath math="SU(2)" /> is the symmetry group of spin-1/2 particles. The 2-dimensional complex vector space on which <InlineMath math="SU(2)" /> acts is spinor space—the state space of an electron's spin. The matrix representation of quaternions is exactly the representation of spin rotations.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Adjoint Representation</h2>

            <p>
              We've seen that unit quaternions act on <InlineMath math="\mathbb{R}^3" /> via <InlineMath math="v \mapsto qv\bar{q}" />. This is called the adjoint representation of <InlineMath math="SU(2)" />. It's a group homomorphism:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\text{Ad}: S^3 \to SO(3), \quad q \mapsto [v \mapsto qv\bar{q}]" />
            </div>

            <p>
              The kernel of this map is <InlineMath math="\{+1, -1\}" />—confirming that <InlineMath math="q" /> and <InlineMath math="-q" /> give the same rotation. The image is all of <InlineMath math="SO(3)" />—every rotation arises from some quaternion.
            </p>

            <p>
              This makes <InlineMath math="S^3" /> the universal cover of <InlineMath math="SO(3)" />: the simplest simply-connected Lie group that maps onto the rotation group. All the topological complications of rotations are "unwound" when we lift to quaternions.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Haar Measure Preview</h2>

            <p>
              As a compact Lie group, <InlineMath math="S^3" /> has a natural "uniform" measure called the Haar measure. This is the unique probability measure invariant under left (or right) multiplication by any group element. When we sample a random orientation uniformly, we're sampling from this measure.
            </p>

            <p>
              The total volume of <InlineMath math="S^3" /> under this measure is <InlineMath math="2\pi^2" />—a fact we'll derive in Section 1.9. This normalization appears throughout harmonic analysis on the rotation group.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-6" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.6
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-7" title="Section 1.7" />

          <Link href="/chapter-1/section-1-8" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.8
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
