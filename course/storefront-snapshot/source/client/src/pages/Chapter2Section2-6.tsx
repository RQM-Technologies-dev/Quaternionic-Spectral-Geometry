import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter2Section2_6() {
  useEffect(() => {
    document.title = "Section 2.6: The Hopf Fibration | QSG Textbook";
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
            <div className="text-white/70 text-sm mb-2">Section 2.6</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Hopf Fibration
            </h1>
            <p className="text-xl text-white/90 italic">
              <InlineMath math="S^1 \hookrightarrow S^3 \to S^2" />: Linking Spin and Direction
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          <p className="text-lg leading-relaxed mb-6">
            The Hopf fibration is one of the most elegant structures in mathematics—a way of decomposing the 3-sphere into circles that are intertwined in a beautiful, symmetric pattern. It reveals how rotation naturally separates into direction (which axis we're rotating around) and phase (how far we've rotated), and it provides the geometric foundation for understanding spin in quantum mechanics.
          </p>

          <QSGSectionTeachingBlock
            learnerQuestion="How does the rotation form project to a visible direction?"
            plainLanguageSetup="Section 2.5 described local angular motion on S3. The Hopf map now gives a complementary view: from a full unit quaternion, extract the direction it assigns to a reference axis while leaving a phase circle above that direction."
            formulaRecap={
              <>
                <PrettyBlockMath math="h(q)=q\mathbf{i}q^{-1},\qquad h^{-1}(p)=\{q_0e^{\mathbf{i}\theta}:\theta\in[0,2\pi)\}" />
                <p>
                  The first formula projects to a point on <InlineMath math="S^2" />. The second shows the circle of states that share that projected direction.
                </p>
              </>
            }
            checkpoint="What information is lost when we look only at h(q)?"
            revealAnswer="The direction remains visible, but the fiber phase is collapsed. Different quaternions can project to the same point on S2."
            finalTakeaway="Hopf projection turns a full S3 state into direction plus hidden phase structure."
            nextStep="Section 2.7 turns the same geometry into visualization and interpolation techniques."
          />

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Fibration Structure</h2>

          <p className="mb-4">
            A fibration is a way of organizing a space into a base and fibers. The Hopf fibration decomposes <InlineMath math="S^3" /> as follows:
          </p>

          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li><strong>Total space:</strong> <InlineMath math="S^3" />, the unit quaternions</li>
            <li><strong>Base space:</strong> <InlineMath math="S^2" />, the unit 2-sphere (directions in 3D space)</li>
            <li><strong>Fiber:</strong> <InlineMath math="S^1" />, circles (phases)</li>
          </ul>

          <p className="mb-4">
            The projection map <InlineMath math="h: S^3 \to S^2" /> is defined by:
          </p>

          <PrettyBlockMath math="h(q) = q\mathbf{i}q^{-1}." />

          <p className="mb-4">
            This takes a unit quaternion <InlineMath math="q" /> and produces the unit vector that results from rotating <InlineMath math="\mathbf{i}" /> by <InlineMath math="q" />. The result is a point on the 2-sphere <InlineMath math="S^2 \subset \mathbb{R}^3" />.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Understanding the Fibers</h2>

          <p className="mb-4">
            What quaternions map to the same point on <InlineMath math="S^2" />? If <InlineMath math="h(q_1) = h(q_2)" />, then both quaternions rotate <InlineMath math="\mathbf{i}" /> to the same vector. This happens exactly when <InlineMath math="q_2 = q_1 e^{\mathbf{i}\theta}" /> for some angle <InlineMath math="\theta" />.
          </p>

          <p className="mb-4">
            The fiber over any point is therefore a circle:
          </p>

          <PrettyBlockMath math="h^{-1}(p) = \{q_0 e^{\mathbf{i}\theta} : \theta \in [0, 2\pi)\}," />

          <p className="mb-4">
            where <InlineMath math="q_0" /> is any quaternion that maps to <InlineMath math="p" />. Varying <InlineMath math="\theta" /> traces out a great circle on <InlineMath math="S^3" />—all quaternions that share the same rotation axis but differ by their phase.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Physical Interpretation</p>
            <p className="mb-2">
              Think of a spinning top. Its axis of rotation is a point on <InlineMath math="S^2" />—a direction in space. But the top can be in different phases of its spin cycle while having the same axis. The Hopf fiber captures all these phases.
            </p>
            <p>
              In quantum mechanics, this separation into direction and phase is exactly what happens with spin: the spin axis (measured by experiment) corresponds to a point on <InlineMath math="S^2" />, while the quantum phase (affecting interference) corresponds to position on the fiber circle.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Linking of Fibers</h2>

          <p className="mb-4">
            The most remarkable property of the Hopf fibration is how the fibers are linked. Take any two distinct points on <InlineMath math="S^2" />. Their preimages are two circles in <InlineMath math="S^3" />, and these circles are linked exactly once—like two interlocked rings of a chain.
          </p>

          <p className="mb-4">
            To visualize this, we can use stereographic projection to map <InlineMath math="S^3" /> to <InlineMath math="\mathbb{R}^3" /> (with one point sent to infinity). Under this projection, the Hopf fibers become circles and one line (the fiber through the projection point). Every pair of circles in this family is linked, creating an intricate pattern that fills all of 3-dimensional space.
          </p>

          <p className="mb-4">
            The linking number between any two distinct Hopf fibers is 1. This topological invariant cannot be changed by continuous deformation—it's a signature of the Hopf fibration's structure.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Coordinates on the Hopf Fibration</h2>

          <p className="mb-4">
            We can parameterize the Hopf fibration directly. Using spherical coordinates <InlineMath math="(\theta, \phi)" /> on <InlineMath math="S^2" /> (with <InlineMath math="\theta \in [0, \pi]" /> and <InlineMath math="\phi \in [0, 2\pi)" />), a point on the base is:
          </p>

          <PrettyBlockMath math="p = (\sin\theta\cos\phi, \sin\theta\sin\phi, \cos\theta)." />

          <p className="mb-4">
            A quaternion in the fiber over <InlineMath math="p" /> can be written as:
          </p>

          <PrettyBlockMath math="q = \left(\cos\frac{\theta}{2}e^{i(\phi+\psi)/2}, \sin\frac{\theta}{2}e^{i(\phi-\psi)/2}\right)," />

          <p className="mb-4">
            where <InlineMath math="\psi \in [0, 4\pi)" /> parameterizes the fiber. The half-angles appear because of the double-cover relationship. As <InlineMath math="\psi" /> increases by <InlineMath math="2\pi" />, we go halfway around the fiber (and <InlineMath math="q \to -q" />); only after <InlineMath math="4\pi" /> do we return to the starting quaternion.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Principal Bundle Structure</h2>

          <p className="mb-4">
            The Hopf fibration is an example of a principal fiber bundle with structure group <InlineMath math="U(1) \cong S^1" />. The group acts on <InlineMath math="S^3" /> by right multiplication:
          </p>

          <PrettyBlockMath math="q \cdot e^{i\theta} = q e^{\mathbf{i}\theta}." />

          <p className="mb-4">
            This action is free (no fixed points) and transitive on each fiber. The quotient <InlineMath math="S^3/U(1)" /> is precisely <InlineMath math="S^2" />.
          </p>

          <p className="mb-4">
            In the language of gauge theory, <InlineMath math="S^3" /> is a nontrivial <InlineMath math="U(1)" /> bundle over <InlineMath math="S^2" />. It cannot be "untwisted" into a product <InlineMath math="S^2 \times S^1" />. This nontriviality is measured by the first Chern number, which equals 1 for the Hopf bundle.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Connection to Magnetic Monopoles</p>
            <p>
              The Hopf fibration provides the mathematical model for a magnetic monopole. The base <InlineMath math="S^2" /> represents directions away from the monopole, and the fiber represents the phase of charged particles in its field. The nontriviality of the bundle is why monopole solutions require patching together local descriptions—and why magnetic charge must be quantized if monopoles exist.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Hopf Fibration in Quantum Mechanics</h2>

          <p className="mb-4">
            In quantum mechanics, the state of a spin-1/2 particle is described by a unit vector in <InlineMath math="\mathbb{C}^2" />, which can be identified with <InlineMath math="S^3" />. However, quantum states related by a global phase <InlineMath math="e^{i\theta}" /> are physically equivalent, so the true state space is <InlineMath math="S^3/U(1) = S^2" />—the Bloch sphere.
          </p>

          <p className="mb-4">
            The Hopf fibration precisely describes this quotient. Each point on the Bloch sphere represents a physically distinct spin state, while moving around the fiber corresponds to changing the unmeasurable global phase. The nontriviality of the fibration means that there's no globally consistent way to choose a phase for every spin state—a fact with implications for geometric phase (Berry phase) in quantum systems.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
            <p>
              The Hopf fibration reveals that the 3-sphere is not just a container for rotations—it has intricate internal structure. The fibers represent phase, the base represents direction, and the linking captures how these degrees of freedom are intertwined. This structure underlies the geometry of spin, the mathematics of fiber bundles, and the topology of monopoles.
            </p>
          </div>

        </div>
      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-2/section-2-5" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 2.5
          </Link>

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-2-6" title="Section 2.6" />

          <Link href="/chapter-2/section-2-7" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 2.7
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
