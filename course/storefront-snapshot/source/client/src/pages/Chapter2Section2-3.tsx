import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter2Section2_3() {
  useEffect(() => {
    document.title = "Section 2.3: SU(2) and SO(3) - The Double Cover | QSG Textbook";
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
            <div className="text-white/70 text-sm mb-2">Section 2.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              <InlineMath math="\mathrm{SU}(2)" /> and <InlineMath math="\mathrm{SO}(3)" />: The Double Cover
            </h1>
            <p className="text-xl text-white/90 italic">
              Why Rotations Come in Pairs
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          <p className="text-lg leading-relaxed mb-6">
            The relationship between unit quaternions and 3D rotations hides an important topological fact: every rotation corresponds to two quaternions, <InlineMath math="q" /> and <InlineMath math="-q" />. This section explores this "double cover" relationship and explains why it matters for understanding spin, quantum mechanics, and the geometry of orientation.
          </p>

          <QSGSectionTeachingBlock
            learnerQuestion="How does the quaternionic rotation form connect to ordinary 3D rotations?"
            plainLanguageSetup="Section 2.2 showed how angle plus direction becomes a unit quaternion. Now we compare that S3 object with the rotation it produces in SO(3), where q and -q act the same way on vectors."
            formulaRecap={
              <>
                <PrettyBlockMath math="\Pi(q)(\mathbf{v})=q\mathbf{v}q^{-1},\qquad S^3/\{\pm1\}\cong SO(3)" />
                <p>
                  The map <InlineMath math="\Pi" /> sends a unit quaternion to its vector rotation. Antipodal quaternions represent the same physical orientation.
                </p>
              </>
            }
            checkpoint="Why do q and -q represent the same rotation?"
            revealAnswer="Both signs appear on the left and right in q v q^{-1}, so the minus signs cancel and the vector result is unchanged."
            finalTakeaway="Unit quaternions give a two-to-one coordinate system for 3D rotations: richer topology on S3, same observable rotation in SO(3)."
            nextStep="Section 2.4 uses this sphere picture to describe shortest rotation paths as geodesics."
          />

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Two Groups</h2>

          <p className="mb-4">
            Let's establish our characters. The group <InlineMath math="\mathrm{SO}(3)" /> consists of all rotations in three-dimensional space—every way of rigidly reorienting an object around a fixed point. This group has a natural topology: rotations that are "close" to each other (differ by small angles) are nearby in the group. Topologically, <InlineMath math="\mathrm{SO}(3)" /> is equivalent to a 3-dimensional ball with opposite points on its boundary identified.
          </p>

          <p className="mb-4">
            The group <InlineMath math="S^3" /> (equivalently <InlineMath math="\mathrm{SU}(2)" /> or <InlineMath math="\mathrm{Sp}(1)" />) consists of all unit quaternions. This is a smooth, connected 3-manifold with a simpler topology—it's the boundary of a 4-ball, with no identifications needed. It's "simply connected," meaning any loop can be continuously shrunk to a point.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Covering Map</h2>

          <p className="mb-4">
            The connection between these groups is given by the covering map <InlineMath math="\Pi: S^3 \to \mathrm{SO}(3)" />, defined by:
          </p>

          <PrettyBlockMath math="\Pi(q)(\mathbf{v}) = q\mathbf{v}q^{-1}" />

          <p className="mb-4">
            for any vector <InlineMath math="\mathbf{v} \in \mathbb{R}^3" /> (viewed as a pure imaginary quaternion). This formula takes a quaternion <InlineMath math="q" /> and produces a rotation that acts on vectors by conjugation.
          </p>

          <p className="mb-4">
            The key observation is that <InlineMath math="\Pi(q) = \Pi(-q)" />. If we replace <InlineMath math="q" /> with <InlineMath math="-q" /> in the conjugation formula:
          </p>

          <PrettyBlockMath math="(-q)\mathbf{v}(-q)^{-1} = (-1)q\mathbf{v}q^{-1}(-1) = q\mathbf{v}q^{-1}." />

          <p className="mb-4">
            The minus signs cancel! This means every rotation in <InlineMath math="\mathrm{SO}(3)" /> has exactly two preimages in <InlineMath math="S^3" />: the quaternions <InlineMath math="q" /> and <InlineMath math="-q" />. Mathematically, we write:
          </p>

          <PrettyBlockMath math="S^3 / \{\pm 1\} \cong \mathrm{SO}(3)." />

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>The Antipodal Identification</p>
            <p>
              Imagine the 3-sphere as the surface of a 4-dimensional ball. Every point <InlineMath math="q" /> on this surface has an antipodal point <InlineMath math="-q" /> on the opposite side. The rotation group <InlineMath math="\mathrm{SO}(3)" /> is what you get by "gluing" each point to its antipode—collapsing each pair to a single rotation. The 3-sphere is a "double cover" because it wraps twice around <InlineMath math="\mathrm{SO}(3)" />.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Topology of Rotation</h2>

          <p className="mb-4">
            The double cover reveals a topological distinction between <InlineMath math="S^3" /> and <InlineMath math="\mathrm{SO}(3)" /> that has deep physical consequences. Consider a continuous path in <InlineMath math="\mathrm{SO}(3)" /> that starts at the identity and ends at the identity after a 360° rotation about some axis.
          </p>

          <p className="mb-4">
            When we lift this path to <InlineMath math="S^3" />, starting at <InlineMath math="q = 1" />, we follow a great circle through the quaternion space. But after the 360° rotation, we arrive not at <InlineMath math="1" /> but at <InlineMath math="-1" />! The path in <InlineMath math="\mathrm{SO}(3)" /> was a closed loop (it returned to the identity rotation), but its lift to <InlineMath math="S^3" /> is open—it ends at a different point.
          </p>

          <p className="mb-4">
            Only after another 360° rotation (for a total of 720°) does the lifted path close and return to <InlineMath math="q = 1" />. This is because:
          </p>

          <PrettyBlockMath math="e^{\mathbf{u} \cdot 2\pi} = -1, \quad e^{\mathbf{u} \cdot 4\pi} = 1." />

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Physical Meaning: The Spinor Property</h2>

          <p className="mb-4">
            This topological fact has physical implications. Objects that transform according to representations of <InlineMath math="\mathrm{SO}(3)" /> (like vectors and tensors) are unchanged by 360° rotations. But objects that transform according to representations of <InlineMath math="S^3" /> (like spinors) pick up a sign change under 360° rotation.
          </p>

          <p className="mb-4">
            Electrons and other fermions are spinors. When you rotate an electron by 360°, its quantum wavefunction is multiplied by <InlineMath math="-1" />. This sign change is unobservable for a single electron (quantum phases don't affect probabilities), but it can be detected through interference experiments with beam splitters.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Feynman's Belt Trick</p>
            <p className="mb-2">
              Richard Feynman popularized a physical demonstration of the <InlineMath math="4\pi" /> identity. Attach a belt to a fixed object and twist it 360°. The belt is now twisted, and no amount of manipulation (without untwisting) can remove the twist. But twist it another 360° (for 720° total), and you can manipulate the belt back to its original, untwisted state—without undoing the rotations!
            </p>
            <p>
              This demonstrates that the space of orientations has a non-trivial fundamental group, detected by the belt's entanglement with its surroundings.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Matrix Representation</h2>

          <p className="mb-4">
            The isomorphism between unit quaternions and <InlineMath math="\mathrm{SU}(2)" /> can be written concretely. A quaternion <InlineMath math="q = a + bi + cj + dk" /> corresponds to the unitary matrix:
          </p>

          <PrettyBlockMath math="U = \begin{pmatrix} a + bi & c + di \\ -c + di & a - bi \end{pmatrix}." />

          <p className="mb-4">
            This matrix has determinant 1 and satisfies <InlineMath math="U^\dagger U = I" />, confirming it belongs to <InlineMath math="\mathrm{SU}(2)" />. The quaternion product corresponds to matrix multiplication, preserving the group structure.
          </p>

          <p className="mb-4">
            The rotation matrix in <InlineMath math="\mathrm{SO}(3)" /> corresponding to <InlineMath math="q" /> can be written as:
          </p>

          <PrettyBlockMath math="R = \begin{pmatrix} 1-2c^2-2d^2 & 2bc-2ad & 2bd+2ac \\ 2bc+2ad & 1-2b^2-2d^2 & 2cd-2ab \\ 2bd-2ac & 2cd+2ab & 1-2b^2-2c^2 \end{pmatrix}." />

          <p className="mb-4">
            Notice that this formula is quadratic in the quaternion components—replacing <InlineMath math="q" /> with <InlineMath math="-q" /> leaves <InlineMath math="R" /> unchanged, confirming the double cover.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Why Two Covers Matter</h2>

          <p className="mb-4">
            The existence of the double cover is not merely a mathematical curiosity—it explains fundamental features of our universe:
          </p>

          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li><strong>Spin-statistics theorem:</strong> Particles with half-integer spin (spinors) obey Fermi-Dirac statistics and cannot occupy the same quantum state. This is directly connected to the <InlineMath math="4\pi" /> periodicity.</li>
            <li><strong>Stable rotational representations:</strong> Using <InlineMath math="S^3" /> instead of <InlineMath math="\mathrm{SO}(3)" /> avoids gimbal lock and provides smooth, singularity-free parameterizations of rotation.</li>
            <li><strong>Quantum phase tracking:</strong> The quaternion "remembers" whether a system has undergone an even or odd number of 360° rotations, which matters for quantum interference.</li>
          </ul>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
            <p>
              The double cover <InlineMath math="S^3 \to \mathrm{SO}(3)" /> reveals that rotation has hidden structure. Classical mechanics, which deals only with orientations, sees <InlineMath math="\mathrm{SO}(3)" />. But quantum mechanics, which must track phases, sees the richer space <InlineMath math="S^3" />. The quaternion is the natural language for this richer perspective.
            </p>
          </div>

        </div>
      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-2/section-2-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 2.2
          </Link>

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-2-3" title="Section 2.3" />

          <Link href="/chapter-2/section-2-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 2.4
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
