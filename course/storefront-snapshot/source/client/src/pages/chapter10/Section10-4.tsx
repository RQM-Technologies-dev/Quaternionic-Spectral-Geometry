import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section10_4() {
  useEffect(() => {
    document.title = "Section 10.4: Quaternionic Quantum Mechanics | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Understand quaternionic Hilbert spaces, spin-1/2 systems, and the deep connection between SU(2) structure and Resonant Quantum Mechanics.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      <Breadcrumb items={[
        { label: "Learn", href: "/learn" },
        { label: "Chapter 10", href: "/chapter-10-applications-hub" },
        { label: "Section 10.4" }
      ]} />

      <section className="relative overflow-hidden pt-16" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(77, 154, 175, 0.4) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6">
            <Link href="/chapter-10-applications-hub" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 10
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 10 · Section 10.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Quaternionic Quantum Mechanics
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Beyond complex Hilbert spaces to geometric quantum theory
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Standard quantum mechanics lives in complex Hilbert space. States are complex vectors, observables are Hermitian operators, and probabilities emerge from the squared modulus of complex amplitudes. This framework has been spectacularly successful for nearly a century. But a question has lingered since the early days: why complex numbers? Could quantum mechanics be formulated over other number systems?
            </p>

            <p>
              The answer, explored by physicists from Birkhoff and von Neumann onward, is yes—with qualifications. Quaternionic quantum mechanics is possible, and it reveals deep connections between quantum structure and the geometry of rotations. QSG provides the mathematical framework to understand these connections.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How does QSG connect to the RQM quantum-physics framework?"
              plainLanguageSetup="Section 10.3 used S3 for physical orientation. In quantum mechanics, the same SU(2)/S3 structure appears in spinors, gates, and spin-1/2 rotations; RQM builds on that QSG foundation."
              formulaRecap={
                <>
                  <PrettyBlockMath math="|\psi\rangle=\begin{pmatrix}\alpha\\ \beta\end{pmatrix}\leftrightarrow q=\alpha+\beta j,\qquad S^3\cong SU(2)" />
                  <p>
                    The spinor-quaternion correspondence lets single-qubit and spin-1/2 structure be read in unit-quaternion coordinates.
                  </p>
                </>
              }
              checkpoint="Where does RQM Studio fit in this positioning?"
              revealAnswer="RQM Studio is the quantum-computing platform that applies RQM/QSG ideas to circuit and gate workflows."
              finalTakeaway="QSG is the mathematical foundation; RQM is the quantum-physics framework built on it; RQM Studio is the quantum-computing platform."
              nextStep="Section 10.5 closes with a speculative/frontier connection to zeta and spectral coherence, stated with care."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Quaternionic Hilbert Spaces</h2>

            <p>
              A quaternionic Hilbert space <InlineMath math="\mathcal{H}_\mathbb{H}" /> is a vector space over the quaternions, equipped with a quaternion-valued inner product. The key subtlety is handedness: because quaternion multiplication doesn't commute, we must choose whether scalars multiply from the left or the right.
            </p>

            <p>
              For a right quaternionic Hilbert space, the inner product satisfies:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\langle \psi | \phi \cdot q \rangle = \langle \psi | \phi \rangle \cdot q" />
              <PrettyBlockMath math="\langle \psi \cdot q | \phi \rangle = \bar{q} \cdot \langle \psi | \phi \rangle" />
            </div>

            <p>
              This is more constrained than the complex case. The probability interpretation requires taking the real part or the norm-squared of the inner product, and the algebra of observables becomes more restricted.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Spin-1/2 and the SU(2) Connection</h2>

            <p>
              The most natural home for quaternionic quantum mechanics is spin-1/2 systems. An electron's spin state can be represented as a complex two-component spinor, but it can equally be represented as a single quaternion:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="|\psi\rangle = \begin{pmatrix} \alpha \\ \beta \end{pmatrix} \leftrightarrow q = \alpha + \beta j" />
            </div>

            <p>
              This isn't just a notational trick. The group SU(2) of spin rotations is <em>isomorphic</em> to the unit quaternions <InlineMath math="S^3" />. Every spin rotation is a quaternionic multiplication, and the double-cover relationship (rotating by <InlineMath math="4\pi" /> to return to the original state) is built into the quaternionic structure.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Deep Connection</p>
              <p className="text-gray-700">
                The Pauli matrices <InlineMath math="\sigma_x, \sigma_y, \sigma_z" /> that generate spin rotations correspond closely to the quaternionic units <InlineMath math="i, j, k" /> in matrix form. This makes quaternions a compact coordinate system for spin geometry.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Spinor Equation in QSG</h2>

            <p>
              In the QSG framework, the Dirac equation for a spin-1/2 particle becomes a quaternionic differential equation on <InlineMath math="S^3 \times \mathbb{R}" />:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)' }}>
              <PrettyBlockMath math="\left( \partial_\tau + \mathbf{D}_{S^3} \right) \Psi = m \bar{\Psi}" />
            </div>

            <p>
              Here <InlineMath math="\mathbf{D}_{S^3}" /> is the Dirac operator on the three-sphere (Chapter 8), and <InlineMath math="\Psi" /> is a quaternionic spinor field. The mass term couples the spinor to its quaternionic conjugate, creating the oscillation between particle and antiparticle components that characterizes relativistic quantum mechanics.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Resonant Quantum Mechanics (RQM)</h2>

            <p>
              The culmination of quaternionic quantum mechanics within QSG is <strong>Resonant Quantum Mechanics</strong> (RQM). This framework proposes that quantum states are not probabilistic superpositions but <em>resonant modes</em> of quaternionic geometry.
            </p>

            <p>
              In RQM, the electron in a hydrogen atom isn't a probability cloud—it's a standing wave on <InlineMath math="S^3 \times \mathbb{R}" />, stabilized in an AGQF resonance well. The discrete energy levels emerge because only certain quaternionic configurations can sustain coherence:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="u_n^2 \approx 2n + 1, \quad n = 0, 1, 2, \ldots" />
            </div>

            <p>
              These are the resonance conditions from Chapter 6, now interpreted as quantum numbers. The Bohr radius, the Rydberg energy, the fine structure—all emerge from geometry rather than being fitted parameters.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Philosophical Shift</p>
              <p className="text-gray-700">
                RQM suggests that quantum "randomness" is actually deterministic resonance dynamics in a higher-dimensional geometry. What appears as probability in complex Hilbert space is the projection of deterministic motion on <InlineMath math="S^3" />. This doesn't contradict quantum predictions—it reinterprets their origin.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Multi-Particle Systems and Entanglement</h2>

            <p>
              Extending quaternionic quantum mechanics to multiple particles requires care. The tensor product of quaternionic Hilbert spaces is more subtle than the complex case, leading to restrictions on allowed entanglement structures.
            </p>

            <p>
              In RQM, entanglement is understood as <em>geometric correlation</em>—two particles sharing a resonance well have correlated quaternionic phases. The famous "spooky action at a distance" becomes phase-locking in <InlineMath math="S^3" />, no more mysterious than two pendulums on a shared beam synchronizing their swings.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Experimental Predictions</h2>

            <p>
              Does quaternionic quantum mechanics make different predictions than complex quantum mechanics? In many situations, no—the theories are equivalent for systems that can be embedded in complex Hilbert space. But at the boundaries—multi-particle entanglement, time-reversal asymmetry, and certain interference experiments—subtle differences may appear.
            </p>

            <p>
              RQM specifically predicts:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li>Atomic spectra match NIST data with geometric precision (demonstrated for H, He, Li, Be, B, C)</li>
              <li>Phase coherence times in resonance wells exceed complex QM predictions</li>
              <li>Spin-spin correlations follow <InlineMath math="S^3" /> geodesics rather than Bloch sphere arcs</li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                Quaternionic quantum mechanics isn't a replacement for standard QM—it's a completion. Just as complex numbers complete the reals for algebraic purposes, quaternions may complete the complex numbers for capturing the full geometry of quantum spin. QSG provides the spectral tools to make this completion rigorous and predictive.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarkCompleteButton id="section-10-4" type="section" />

        <div className="flex justify-between items-center pt-8 border-t-2 mt-8" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-10/section-10-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Previous: 10.3 Robotics
          </Link>

          <Link href="/chapter-10-applications-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#3d7a8c' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <Link href="/chapter-10/section-10-5" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#1a3b47' }} data-testid="link-next-section">
            Next: 10.5 Riemann Hypothesis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
