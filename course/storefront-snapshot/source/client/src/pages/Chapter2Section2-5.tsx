import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter2Section2_5() {
  useEffect(() => {
    document.title = "Section 2.5: Tangent Spaces and the Maurer-Cartan Form | QSG Textbook";
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
            <div className="text-white/70 text-sm mb-2">Section 2.5</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Tangent Spaces, Frames, and the Maurer–Cartan Form
            </h1>
            <p className="text-xl text-white/90 italic">
              The Infinitesimal Structure of Rotation
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          <p className="text-lg leading-relaxed mb-6">
            To understand the 3-sphere as a geometric space, we need to examine its local structure—what does it look like at infinitesimally small scales? This section develops the tangent space, the invariant frame, and the Maurer–Cartan form, which together provide the differential-geometric toolkit for working with rotations.
          </p>

          <QSGSectionTeachingBlock
            learnerQuestion="How does a changing quaternion describe angular motion?"
            plainLanguageSetup="Section 2.4 followed finite paths on S3. This section zooms in: at each point q, tangent vectors describe instantaneous change, and the Maurer-Cartan form moves that change back to the identity where it can be read as angular velocity."
            formulaRecap={
              <>
                <PrettyBlockMath math="T_qS^3=\{v\in\mathbb{R}^4:\langle q,v\rangle=0\},\qquad \omega(\dot q)=q^{-1}\dot q" />
                <p>
                  The tangent condition keeps motion on the unit sphere. The form <InlineMath math="\omega" /> expresses that motion in the body frame.
                </p>
              </>
            }
            checkpoint="Why pull a tangent vector back to the identity?"
            revealAnswer="The identity tangent space is the pure imaginary Lie algebra, so pulling back gives a common coordinate frame for comparing angular velocities at different points."
            finalTakeaway="Local motion on S3 becomes usable when tangent vectors are translated into the shared imaginary-quaternion frame."
            nextStep="Section 2.6 projects the rotation state to direction and phase using the Hopf fibration."
          />

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Tangent Spaces on the 3-Sphere</h2>

          <p className="mb-4">
            At each point <InlineMath math="q" /> on the 3-sphere, there is a tangent space <InlineMath math="T_q S^3" /> consisting of all velocity vectors of curves passing through <InlineMath math="q" />. Since <InlineMath math="S^3" /> is embedded in <InlineMath math="\mathbb{R}^4" />, the tangent space at <InlineMath math="q" /> is the 3-dimensional hyperplane perpendicular to <InlineMath math="q" />:
          </p>

          <PrettyBlockMath math="T_q S^3 = \{v \in \mathbb{R}^4 : \langle q, v \rangle = 0\}." />

          <p className="mb-4">
            At the identity <InlineMath math="q = 1" />, the tangent space is particularly simple: it consists of all quaternions with zero real part:
          </p>

          <PrettyBlockMath math="T_1 S^3 = \operatorname{Im}\mathbb{H} = \{x\mathbf{i} + y\mathbf{j} + z\mathbf{k}\}." />

          <p className="mb-4">
            This is a three-dimensional real vector space, matching the three degrees of freedom of rotation. The basis vectors <InlineMath math="\{\mathbf{i}, \mathbf{j}, \mathbf{k}\}" /> represent infinitesimal rotations about the three coordinate axes.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Left-Invariant Frame</h2>

          <p className="mb-4">
            The group structure of <InlineMath math="S^3" /> allows us to transport the basis at the identity to every other point. For any quaternion <InlineMath math="q \in S^3" />, left multiplication <InlineMath math="L_q: p \mapsto qp" /> is a smooth map that sends <InlineMath math="1" /> to <InlineMath math="q" />. Its derivative carries the tangent space at <InlineMath math="1" /> to the tangent space at <InlineMath math="q" />:
          </p>

          <PrettyBlockMath math="(dL_q)_1: T_1 S^3 \to T_q S^3, \quad \mathbf{X} \mapsto q\mathbf{X}." />

          <p className="mb-4">
            The frame at <InlineMath math="q" /> is therefore <InlineMath math="\{q\mathbf{i}, q\mathbf{j}, q\mathbf{k}\}" />. This is called the <strong>left-invariant frame</strong> because it's defined consistently across the entire group using left multiplication.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>The Global Frame</p>
            <p>
              Unlike most curved spaces, <InlineMath math="S^3" /> admits a global smooth frame—a continuous choice of three orthonormal tangent vectors at every point. This is possible because <InlineMath math="S^3" /> is a Lie group, and the group structure provides a natural way to "parallel transport" the frame from one point to any other.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Maurer–Cartan Form</h2>

          <p className="mb-4">
            The Maurer–Cartan form is a 1-form on <InlineMath math="S^3" /> that encodes infinitesimal rotations. At each point <InlineMath math="q" />, it takes a tangent vector and returns the corresponding element of the Lie algebra (the tangent space at the identity):
          </p>

          <PrettyBlockMath math="\omega = q^{-1} dq." />

          <p className="mb-4">
            Here <InlineMath math="dq" /> represents an infinitesimal displacement on <InlineMath math="S^3" />, and multiplication by <InlineMath math="q^{-1}" /> "pulls it back" to the identity. The result is always a pure imaginary quaternion—an element of the Lie algebra <InlineMath math="\mathfrak{su}(2)" />.
          </p>

          <p className="mb-4">
            In components, if we parameterize a curve <InlineMath math="q(t)" /> on <InlineMath math="S^3" />, the Maurer–Cartan form evaluated on the velocity vector <InlineMath math="\dot{q}" /> is:
          </p>

          <PrettyBlockMath math="\omega(\dot{q}) = q^{-1}\dot{q} \in \operatorname{Im}\mathbb{H}." />

          <p className="mb-4">
            This represents the angular velocity of the rotation, expressed in the body frame (the frame attached to the rotating object).
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Maurer–Cartan Equation</h2>

          <p className="mb-4">
            The Maurer–Cartan form satisfies a fundamental structure equation:
          </p>

          <PrettyBlockMath math="d\omega + \frac{1}{2}[\omega \wedge \omega] = 0." />

          <p className="mb-4">
            Here <InlineMath math="d\omega" /> is the exterior derivative of <InlineMath math="\omega" />, and <InlineMath math="[\omega \wedge \omega]" /> is the wedge product combined with the Lie bracket (quaternion commutator). This equation expresses the integrability of the group structure—it's a consistency condition that any Lie group's Maurer–Cartan form must satisfy.
          </p>

          <p className="mb-4">
            The Maurer–Cartan equation encodes the non-commutativity of rotations. The term <InlineMath math="[\omega \wedge \omega]" /> vanishes for abelian groups but is non-zero for <InlineMath math="S^3" />, reflecting the fact that the order of rotations matters.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Connection to Angular Velocity</h2>

          <p className="mb-4">
            The Maurer–Cartan form has a direct physical interpretation. If <InlineMath math="q(t)" /> describes the orientation of a rigid body as a function of time, then:
          </p>

          <PrettyBlockMath math="\boldsymbol{\Omega}_{\mathrm{body}} = 2q^{-1}\dot{q}" />

          <p className="mb-4">
            is the angular velocity vector expressed in the body frame. The factor of 2 comes from the half-angle relationship between quaternions and rotations. This angular velocity tells us how fast the body is rotating and about which axis, from the perspective of someone riding on the body.
          </p>

          <p className="mb-4">
            The angular velocity in the space frame (fixed laboratory coordinates) is:
          </p>

          <PrettyBlockMath math="\boldsymbol{\Omega}_{\mathrm{space}} = 2\dot{q}q^{-1}." />

          <p className="mb-4">
            These two are related by the rotation itself: <InlineMath math="\boldsymbol{\Omega}_{\mathrm{space}} = q \boldsymbol{\Omega}_{\mathrm{body}} q^{-1}" />.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Left vs. Right Invariance</p>
            <p className="mb-2">
              The form <InlineMath math="\omega = q^{-1}dq" /> is left-invariant: <InlineMath math="L_g^*\omega = \omega" /> for any <InlineMath math="g \in S^3" />. There's also a right-invariant form <InlineMath math="\bar{\omega} = dq \cdot q^{-1}" />.
            </p>
            <p>
              These correspond to body-frame and space-frame angular velocities, respectively. The choice matters when studying rotating systems, and the quaternion formalism naturally accommodates both perspectives.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>The Metric and Curvature</h2>

          <p className="mb-4">
            The 3-sphere inherits a natural Riemannian metric from its embedding in <InlineMath math="\mathbb{R}^4" />. The inner product on tangent vectors is simply the Euclidean inner product of the corresponding 4-vectors. This metric is bi-invariant, meaning it's preserved by both left and right multiplication.
          </p>

          <p className="mb-4">
            Using this metric, we can compute the curvature of <InlineMath math="S^3" />. The Riemann curvature tensor is:
          </p>

          <PrettyBlockMath math="R(X, Y)Z = \langle Y, Z \rangle X - \langle X, Z \rangle Y," />

          <p className="mb-4">
            giving constant sectional curvature +1. The scalar curvature is 6, and the Ricci tensor is <InlineMath math="\mathrm{Ric} = 2g" /> (twice the metric). This makes <InlineMath math="S^3" /> an Einstein manifold—one where the Ricci curvature is proportional to the metric.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
            <p>
              The Maurer–Cartan form provides a bridge between the global group structure of <InlineMath math="S^3" /> and its local differential geometry. It allows us to express curvature, connections, and differential equations on <InlineMath math="S^3" /> in terms of the quaternion algebra. This is essential for developing spectral geometry on the 3-sphere.
            </p>
          </div>

        </div>
      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-2/section-2-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 2.4
          </Link>

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-2-5" title="Section 2.5" />

          <Link href="/chapter-2/section-2-6" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 2.6
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
