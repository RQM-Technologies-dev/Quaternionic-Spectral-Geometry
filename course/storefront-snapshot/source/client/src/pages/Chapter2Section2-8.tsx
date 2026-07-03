import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter2Section2_8() {
  useEffect(() => {
    document.title = "Section 2.8: Worked Examples | QSG Textbook";
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
            <div className="text-white/70 text-sm mb-2">Section 2.8</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Worked Examples
            </h1>
            <p className="text-xl text-white/90 italic">
              Putting the Theory into Practice
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          <p className="text-lg leading-relaxed mb-6">
            The best way to develop intuition for quaternion geometry is to work through concrete calculations. This section presents detailed examples that illustrate the key concepts from the chapter, with step-by-step derivations you can follow and extend.
          </p>

          <QSGSectionTeachingBlock
            learnerQuestion="How do the formulas behave in concrete rotations?"
            plainLanguageSetup="Section 2.7 showed how to visualize and interpolate rotation paths. These examples slow the process down: choose an axis, choose an angle, form the unit quaternion, then apply or compose it."
            formulaRecap={
              <>
                <PrettyBlockMath math="q=\cos\varphi+\mathbf{u}\sin\varphi,\qquad \mathbf{v}'=q\mathbf{v}q^{-1}" />
                <p>
                  The first formula builds the rotation handle. The second applies it to a vector by conjugation.
                </p>
              </>
            }
            checkpoint="What is the most common source of mistakes in these examples?"
            revealAnswer="Confusing the physical rotation angle with the quaternionic half-angle, or multiplying rotations in the wrong order."
            finalTakeaway="Worked examples make the chapter's pattern concrete: angle plus direction builds q, and q acts by conjugation or composition."
            nextStep="Section 2.9 collects the chapter into the reusable ideas needed for QSG."
          />

          <div className="p-6 rounded-lg my-8 border-2" style={{ borderColor: '#3d7a8c', backgroundColor: 'white' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1a3b47' }}>Example 2.1: Axis-Angle Conversion</h2>

            <p className="mb-4">
              <strong>Problem:</strong> Find the quaternion representing a 90° rotation about the z-axis.
            </p>

            <p className="mb-4">
              <strong>Solution:</strong> The axis is <InlineMath math="\mathbf{u} = \mathbf{k} = (0, 0, 1)" /> and the physical rotation angle is <InlineMath math="\theta = 90° = \pi/2" />. The quaternionic half-angle is:
            </p>

            <PrettyBlockMath math="\varphi = \frac{\theta}{2} = \frac{\pi}{4} = 45°." />

            <p className="mb-4">
              Using the axis-angle form:
            </p>

            <PrettyBlockMath math="q = \cos\varphi + \mathbf{u}\sin\varphi = \cos\frac{\pi}{4} + \mathbf{k}\sin\frac{\pi}{4} = \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}\mathbf{k}." />

            <p className="mb-4">
              In component form: <InlineMath math="q = \left(\frac{\sqrt{2}}{2}, 0, 0, \frac{\sqrt{2}}{2}\right)" />.
            </p>

            <p className="mb-4">
              <strong>Verification:</strong> Let's check that this rotates the x-axis to the y-axis. Taking <InlineMath math="\mathbf{v} = \mathbf{i}" />:
            </p>

            <PrettyBlockMath math="q\mathbf{i}q^{-1} = \left(\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}\mathbf{k}\right)\mathbf{i}\left(\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}\mathbf{k}\right)." />

            <p className="mb-4">
              Computing step by step:
            </p>

            <PrettyBlockMath math="q\mathbf{i} = \frac{\sqrt{2}}{2}\mathbf{i} + \frac{\sqrt{2}}{2}\mathbf{k}\mathbf{i} = \frac{\sqrt{2}}{2}\mathbf{i} + \frac{\sqrt{2}}{2}\mathbf{j}," />

            <PrettyBlockMath math="\begin{aligned}
(q\mathbf{i})q^{-1}
&= \left(\frac{\sqrt{2}}{2}\mathbf{i} + \frac{\sqrt{2}}{2}\mathbf{j}\right)
\left(\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}\mathbf{k}\right) \\
&= \mathbf{j}. \checkmark
\end{aligned}" />
          </div>

          <div className="p-6 rounded-lg my-8 border-2" style={{ borderColor: '#3d7a8c', backgroundColor: 'white' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1a3b47' }}>Example 2.2: Composing Rotations</h2>

            <p className="mb-4">
              <strong>Problem:</strong> Find the result of first rotating 90° about the z-axis, then 90° about the (new) x-axis.
            </p>

            <p className="mb-4">
              <strong>Solution:</strong> Let <InlineMath math="q_1" /> be the z-rotation from Example 2.1. For the x-rotation:
            </p>

            <PrettyBlockMath math="q_2 = \cos\frac{\pi}{4} + \mathbf{i}\sin\frac{\pi}{4} = \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}\mathbf{i}." />

            <p className="mb-4">
              The composition is <InlineMath math="q_{net} = q_2 q_1" /> (right-to-left order, like function composition):
            </p>

            <PrettyBlockMath math="q_{net} = \left(\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}\mathbf{i}\right)\left(\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}\mathbf{k}\right)." />

            <p className="mb-4">
              Expanding:
            </p>

            <PrettyBlockMath math="\begin{aligned}
q_{net}
&= \frac{1}{2} + \frac{1}{2}\mathbf{k} + \frac{1}{2}\mathbf{i} + \frac{1}{2}\mathbf{i}\mathbf{k} \\
&= \frac{1}{2} + \frac{1}{2}\mathbf{i} - \frac{1}{2}\mathbf{j} + \frac{1}{2}\mathbf{k}.
\end{aligned}" />

            <p className="mb-4">
              <strong>Interpretation:</strong> We can extract the axis and angle. The half-angle satisfies <InlineMath math="\cos\varphi = 1/2" />, so <InlineMath math="\varphi = 60°" /> and the full rotation angle is <InlineMath math="\theta = 120°" />. The axis is:
            </p>

            <PrettyBlockMath math="\mathbf{u} = \frac{1}{\sin 60°}\left(\frac{1}{2}\mathbf{i} - \frac{1}{2}\mathbf{j} + \frac{1}{2}\mathbf{k}\right) = \frac{1}{\sqrt{3}}(\mathbf{i} - \mathbf{j} + \mathbf{k})." />

            <p className="mb-4">
              The composition of two 90° rotations about orthogonal axes produces a 120° rotation about the diagonal axis <InlineMath math="(1, -1, 1)/\sqrt{3}" />.
            </p>
          </div>

          <div className="p-6 rounded-lg my-8 border-2" style={{ borderColor: '#3d7a8c', backgroundColor: 'white' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1a3b47' }}>Example 2.3: The <InlineMath math="4\pi" /> Experiment</h2>

            <p className="mb-4">
              <strong>Problem:</strong> Trace a quaternion through a complete <InlineMath math="4\pi" /> rotation and verify the spinor identity.
            </p>

            <p className="mb-4">
              <strong>Solution:</strong> Let's rotate continuously about the z-axis, parameterizing by quaternionic angle <InlineMath math="\varphi" />:
            </p>

            <PrettyBlockMath math="q(\varphi) = \cos\varphi + \mathbf{k}\sin\varphi." />

            <p className="mb-4">
              At key points:
            </p>

            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li><InlineMath math="\varphi = 0" />: <InlineMath math="q = 1" /> (identity rotation)</li>
              <li><InlineMath math="\varphi = \pi/2" />: <InlineMath math="q = \mathbf{k}" /> (180° physical rotation)</li>
              <li><InlineMath math="\varphi = \pi" />: <InlineMath math="q = -1" /> (360° physical rotation)</li>
              <li><InlineMath math="\varphi = 3\pi/2" />: <InlineMath math="q = -\mathbf{k}" /> (540° physical rotation)</li>
              <li><InlineMath math="\varphi = 2\pi" />: <InlineMath math="q = 1" /> (720° physical rotation)</li>
            </ul>

            <p className="mb-4">
              After a 360° physical rotation (<InlineMath math="\varphi = \pi" />), the quaternion is <InlineMath math="-1" />, not <InlineMath math="+1" />. The identity and "negative identity" represent the same physical orientation but different quantum phases. Only after 720° does the quaternion return to <InlineMath math="+1" />.
            </p>

            <p className="mb-4">
              <strong>Physical demonstration:</strong> This can be demonstrated with Feynman's belt trick or the Dirac string trick—physical models that show how a 360° rotation leaves a system "twisted" in a way that only another 360° rotation can undo.
            </p>
          </div>

          <div className="p-6 rounded-lg my-8 border-2" style={{ borderColor: '#3d7a8c', backgroundColor: 'white' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1a3b47' }}>Example 2.4: SLERP Interpolation</h2>

            <p className="mb-4">
              <strong>Problem:</strong> Interpolate between the identity and a 90° rotation about the z-axis at <InlineMath math="t = 0.5" />.
            </p>

            <p className="mb-4">
              <strong>Solution:</strong> We have:
            </p>

            <PrettyBlockMath math="q_0 = 1, \quad q_1 = \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}\mathbf{k}." />

            <p className="mb-4">
              The angle between them:
            </p>

            <PrettyBlockMath math="\Omega = \arccos(\langle q_0, q_1 \rangle) = \arccos\left(\frac{\sqrt{2}}{2}\right) = \frac{\pi}{4}." />

            <p className="mb-4">
              The SLERP formula gives:
            </p>

            <PrettyBlockMath math="q(0.5) = \frac{\sin(0.5 \cdot \pi/4)}{\sin(\pi/4)}q_0 + \frac{\sin(0.5 \cdot \pi/4)}{\sin(\pi/4)}q_1." />

            <p className="mb-4">
              Since <InlineMath math="\sin(\pi/8) / \sin(\pi/4) = \sin(\pi/8) \cdot \sqrt{2}" />:
            </p>

            <PrettyBlockMath math="q(0.5) = \sqrt{2}\sin\frac{\pi}{8}\left(1 + \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}\mathbf{k}\right)." />

            <p className="mb-4">
              After simplification and normalization:
            </p>

            <PrettyBlockMath math="q(0.5) = \cos\frac{\pi}{8} + \mathbf{k}\sin\frac{\pi}{8}," />

            <p className="mb-4">
              which represents a 45° rotation about the z-axis—exactly halfway between 0° and 90°, as expected for constant-velocity interpolation along the great circle.
            </p>
          </div>

          <div className="p-6 rounded-lg my-8 border-2" style={{ borderColor: '#3d7a8c', backgroundColor: 'white' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1a3b47' }}>Example 2.5: Hopf Fiber Identification</h2>

            <p className="mb-4">
              <strong>Problem:</strong> Find the Hopf fiber over the north pole of <InlineMath math="S^2" />.
            </p>

            <p className="mb-4">
              <strong>Solution:</strong> The north pole of <InlineMath math="S^2" /> is <InlineMath math="\mathbf{i}" /> (taking <InlineMath math="\mathbf{i}" /> as the reference direction). We need all quaternions <InlineMath math="q" /> such that:
            </p>

            <PrettyBlockMath math="h(q) = q\mathbf{i}q^{-1} = \mathbf{i}." />

            <p className="mb-4">
              This means <InlineMath math="q" /> commutes with <InlineMath math="\mathbf{i}" />. The quaternions commuting with <InlineMath math="\mathbf{i}" /> are exactly those of the form <InlineMath math="q = a + b\mathbf{i}" /> with <InlineMath math="a^2 + b^2 = 1" />. Parameterizing:
            </p>

            <PrettyBlockMath math="q(\theta) = \cos\theta + \mathbf{i}\sin\theta = e^{\mathbf{i}\theta}, \quad \theta \in [0, 2\pi)." />

            <p className="mb-4">
              This traces a great circle in the <InlineMath math="(1, \mathbf{i})" /> plane of <InlineMath math="\mathbb{H}" />—the Hopf fiber over the north pole. Every other fiber is a great circle passing through exactly one point of this special fiber, and all fibers are pairwise linked.
            </p>
          </div>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Practice Suggestions</p>
            <p>
              To build quaternion intuition, try these exercises: (1) Find the quaternion for a 180° rotation about the diagonal <InlineMath math="(1,1,1)/\sqrt{3}" /> axis. (2) Verify that two successive 180° rotations about orthogonal axes give a 180° rotation about the third axis. (3) Compute the geodesic distance between <InlineMath math="1" /> and <InlineMath math="\mathbf{i}" /> on <InlineMath math="S^3" />. (4) Find all quaternions whose Hopf projection is the south pole <InlineMath math="-\mathbf{i}" />.
            </p>
          </div>

        </div>
      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-2/section-2-7" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 2.7
          </Link>

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-2-8" title="Section 2.8" />

          <Link href="/chapter-2/section-2-9" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 2.9
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
