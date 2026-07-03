import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";

export default function Chapter8SpectralOperators() {
  useEffect(() => {
    document.title = "Chapter 8: Quaternionic Spectral Operators | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Chapter 8 of Quaternionic Spectral Geometry textbook: Quaternionic Spectral Operators including Dirac, Laplacian, and Maxwell equivalents as geometric necessities of the quaternionic manifold.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8" data-testid="link-back-to-book">
          <ArrowLeft className="w-4 h-4" />
          Back to Table of Contents
        </Link>

        {/* Chapter Header */}
        <div className="mb-12 border-b-2 border-blue-200 pb-6">
          <div className="text-sm text-gray-500 mb-2">Chapter 8</div>
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Quaternionic Spectral Operators
          </h1>
          <h2 className="text-2xl font-semibold text-blue-700 italic">
            Dirac, Laplacian, and Maxwell Equivalents
          </h2>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-lg max-w-none">

          {/* Chapter Overview */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Chapter Overview</h3>
            <p className="mb-4">
              This chapter reveals how <strong>Quaternionic Spectral Geometry (QSG)</strong> provides a unified mathematical foundation for the core field equations of physics—Dirac, Laplace, and Maxwell. Rather than being separate constructs, these equations emerge naturally from the geometry of quaternionic space, where differentiation, curvature, and spin are intrinsic features of the manifold <InlineMath math="S^3 \times \mathbb{R}" />.
            </p>
            <p className="mb-4">
              In this picture, differentiation carries orientation; curvature defines energy; and resonance links motion to geometry. The quaternionic Dirac operator describes orientation flow, the Laplacian encodes curvature energy, and the Maxwell equation emerges as the coherence transport law. Together, they demonstrate that the "laws of physics" are not imposed rules—they are geometric necessities of the quaternionic manifold.
            </p>
            <p className="mb-4">We will explore:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>The quaternionic Dirac operator and spinor harmonics</li>
              <li>Spectral decomposition of the quaternionic Laplacian</li>
              <li>The unified quaternionic Maxwell equation <InlineMath math="\nabla_q F = \mu_0 J" /></li>
              <li>Energy–momentum and curvature couplings on <InlineMath math="S^3 \times \mathbb{R}" /></li>
              <li>The geometric unification of field equations</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold mb-2">Goal:</p>
              <p>To show that quaternionic geometry is not a reformulation of physics, but its geometric origin—where spin, charge, and field are all expressions of orientation and curvature.</p>
            </div>
          </div>

          {/* Section 8.1 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">8.1 The Quaternionic Dirac Operator and Spinor Harmonics</h2>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Definition 8.1 (Quaternionic Dirac Operator)</h4>
              <p className="mb-4">The quaternionic Dirac operator captures how fields twist and evolve on <InlineMath math="S^3 \times \mathbb{R}" />:</p>
              <PrettyBlockMath math="\mathcal{D} = i\frac{\partial}{\partial x} + j\frac{\partial}{\partial y} + k\frac{\partial}{\partial z}." />
              <p className="mb-4">Its full spacetime extension includes the time derivative as a scalar component:</p>
              <PrettyBlockMath math="\nabla_q = \frac{\partial}{\partial t} + i\frac{\partial}{\partial x} + j\frac{\partial}{\partial y} + k\frac{\partial}{\partial z}." />
              <p className="mb-4">
                This single operator acts simultaneously on scalar and vector components of a quaternionic field <InlineMath math="\Psi(x, t)" />, linking them in a rotation-covariant way.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Intuitive View:</p>
                <p>In complex analysis, the derivative <InlineMath math="\frac{d}{dz}" /> tracks how a function changes in one plane. In quaternionic geometry, <InlineMath math="\nabla_q" /> tracks how a field changes in all three rotational directions at once—like a compass that turns in three axes simultaneously.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Spinor Harmonics</h4>
              <p className="mb-4">
                Because <InlineMath math="S^3" /> is isomorphic to <InlineMath math="SU(2)" />, each point on the manifold carries spinor structure naturally. Solutions to the equation
              </p>
              <PrettyBlockMath math="\nabla_q \Psi = 0" />
              <p className="mb-4">
                are <strong>free quaternionic spinors</strong>, describing rotationally coherent fields whose orientation evolves smoothly through quaternionic space.
              </p>
              <p className="mb-4">
                These spinor harmonics form representations of <InlineMath math="SU(2)" />, just like the Wigner D-matrices introduced in Chapter 5. However, here the emphasis is not algebraic but geometric: each spinor corresponds to a great-circle trajectory (a geodesic) on <InlineMath math="S^3" />, representing continuous rotation in a 4D orientation field.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Deeper Insight:</p>
                <p>In QSG, <em>spin</em> is not a mysterious quantum label—it is the natural behavior of a quaternionic rotation under 4π symmetry. A spin-½ particle is simply a field whose quaternionic orientation requires a full 720° rotation to return to identity.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Visualization:</p>
                <p>Imagine an arrow rotating on the surface of a globe. If you move it all the way around, it flips direction halfway through, only returning to its starting state after two full rotations. That's spin-½ behavior—a geometric property of <InlineMath math="S^3" /> curvature.</p>
              </div>
            </div>
          </section>

          {/* Section 8.2 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">8.2 Spectral Decomposition of the Quaternionic Laplacian</h2>

            <p className="mb-4">
              The Laplacian describes the curvature-induced energy structure of <InlineMath math="S^3" />. In quaternionic form, it measures how coherence bends, diffuses, or resonates across the manifold.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Definition 8.2 (Quaternionic Laplacian)</h4>
              <PrettyBlockMath math="\begin{aligned}
\Delta_q
&= -\nabla_q \overline{\nabla_q} \\
&= -\left(
\frac{\partial^2}{\partial t^2}
+ \frac{\partial^2}{\partial x^2}
+ \frac{\partial^2}{\partial y^2}
+ \frac{\partial^2}{\partial z^2}
\right).
\end{aligned}" />
              <p className="mb-4">
                This symmetric operator applies equally to scalar, vector, and quaternionic fields—revealing that energy, spin, and field intensity all arise from the same geometric curvature.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Spectral Decomposition</h4>
              <p className="mb-4">The eigenfunctions of <InlineMath math="\Delta_q" /> are quaternionic harmonics on <InlineMath math="S^3" />:</p>
              <PrettyBlockMath math="f(g) = \sum_{\ell=0}^{\infty} \sum_{m,n=-\ell}^{\ell} f_{\ell mn} D^{\ell}_{mn}(g)." />
              <p className="mb-4">
                Each <InlineMath math="\ell" /> corresponds to a discrete curvature resonance with eigenvalue <InlineMath math="\lambda_\ell = \ell(\ell + 2)" />. These harmonics are the geometric "standing waves" of <InlineMath math="S^3" />, describing the quantized modes of vibration allowed by its curvature.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Analogy:</p>
                <p>On a violin string, only certain frequencies fit between the fixed endpoints. On <InlineMath math="S^3" />, only certain rotational harmonics fit within the curvature of the manifold. The Laplacian quantizes geometry into harmonic layers of resonance.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Relationship Between Dirac and Laplace</h4>
              <p className="mb-4">The Dirac operator and Laplacian are related by:</p>
              <PrettyBlockMath math="\mathcal{D}^2 = -\Delta_q." />
              <p className="mb-4">
                Thus, the Laplacian is the <strong>square</strong> of the Dirac operator—showing that curvature energy (the Laplacian) is the second-order manifestation of orientation flow (the Dirac operator).
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Geometric Picture:</p>
                <p>The Dirac operator describes how orientation moves; squaring it measures how this motion curves back on itself—just like tracing a full wave from its directional derivative.</p>
              </div>
            </div>
          </section>

          {/* Section 8.3 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">8.3 Quaternionic Maxwell Equation <InlineMath math="\nabla_q F = \mu_0 J" /></h2>

            <p className="mb-4">
              In quaternionic geometry, electromagnetism emerges as a natural field coherence equation. The electric and magnetic components of the field combine seamlessly into a single quaternion:
            </p>
            <PrettyBlockMath math="F = \mathbf{E} + c\mathbf{B}." />
            <p className="mb-4">Applying the quaternionic derivative yields the unified field equation:</p>
            <PrettyBlockMath math="\nabla_q F = \mu_0 J," />
            <p className="mb-4">where <InlineMath math="J = \rho + \mathbf{J}" /> is the source quaternion.</p>

            <div className="mb-8">
              <p className="mb-4">When expanded into scalar and vector parts, this reproduces all four of Maxwell's equations:</p>
              <PrettyBlockMath math="\begin{cases}\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}, \\\nabla \times \mathbf{B} - \frac{1}{c^2}\frac{\partial \mathbf{E}}{\partial t} = \mu_0 \mathbf{J}, \\\nabla \cdot \mathbf{B} = 0, \\\nabla \times \mathbf{E} + \frac{\partial \mathbf{B}}{\partial t} = 0.\end{cases}" />
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Unified Insight:</p>
                <p>The quaternionic equation <InlineMath math="\nabla_q F = \mu_0 J" /> is not four laws stitched together—it is one law expressed in quaternionic form. The electromagnetic field is a rotating coherence vector on <InlineMath math="S^3" />, and the derivative <InlineMath math="\nabla_q" /> measures its evolution through space-time.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Visualization:</p>
                <p>Picture <InlineMath math="F" /> as a rotating helix in four dimensions, whose shadow in three-dimensional space appears as oscillating <InlineMath math="\mathbf{E}" /> and <InlineMath math="\mathbf{B}" /> fields. The quaternionic derivative simply tracks the twisting of this helical structure along time.</p>
              </div>
            </div>
          </section>

          {/* Section 8.4 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">8.4 Energy–Momentum and Curvature Couplings on <InlineMath math="S^3 \times \mathbb{R}" /></h2>

            <p className="mb-4">
              In quaternionic geometry, energy flow and curvature are not separate entities—they are dual aspects of the same field structure.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Definition 8.3 (Quaternionic Stress–Energy Tensor)</h4>
              <p className="mb-4">For a field <InlineMath math="F" />, define the stress–energy tensor as:</p>
              <PrettyBlockMath math="T = F \overline{F}." />
              <p className="mb-4">
                The scalar part of <InlineMath math="T" /> gives <strong>energy density</strong>, while the imaginary part gives <strong>momentum flux</strong>. Conservation of energy–momentum follows automatically from:
              </p>
              <PrettyBlockMath math="\nabla_q T = 0." />
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Interpretation:</p>
                <p>Energy conservation in quaternionic space is not an external symmetry—it is a geometric identity. The continuity of curvature implies the conservation of flow.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Curvature Coupling</h4>
              <p className="mb-4">The intrinsic curvature of <InlineMath math="S^3" /> introduces natural corrections to field dynamics. The effective potential term associated with curvature is:</p>
              <PrettyBlockMath math="V_{\text{curv}}(u) = \frac{\ell(\ell + 2)}{R^2}," />
              <p className="mb-4">
                where <InlineMath math="R" /> is the radius of <InlineMath math="S^3" />. This quantized curvature energy appears as the discrete ladder of resonant modes we recognize in physical spectra.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Intuitive Link:</p>
                <p>Curvature stores energy as geometry. When a field moves across curved space, part of its energy is stored in orientation—just as tension in a string stores energy in curvature. Quantized curvature naturally yields quantized energy levels.</p>
              </div>
            </div>
          </section>

          {/* Section 8.5 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">8.5 Geometric Unification of Field Equations</h2>

            <p className="mb-4">
              The Dirac, Laplace, and Maxwell equations are not separate theories—they are projections of the same quaternionic structure into different dimensional aspects of <InlineMath math="S^3 \times \mathbb{R}" />.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Operator</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Governs</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Geometric Origin</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Physical Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Dirac</td>
                    <td className="border border-gray-300 px-4 py-2">Spinor dynamics</td>
                    <td className="border border-gray-300 px-4 py-2">Quaternionic differentiation (orientation flow)</td>
                    <td className="border border-gray-300 px-4 py-2">Motion, spin, and phase transport</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Laplacian</td>
                    <td className="border border-gray-300 px-4 py-2">Energy distribution</td>
                    <td className="border border-gray-300 px-4 py-2">Second-order curvature of <InlineMath math="S^3" /></td>
                    <td className="border border-gray-300 px-4 py-2">Standing-wave resonance structure</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Maxwell</td>
                    <td className="border border-gray-300 px-4 py-2">Field coherence</td>
                    <td className="border border-gray-300 px-4 py-2">Quaternionic derivative of <InlineMath math="F" /></td>
                    <td className="border border-gray-300 px-4 py-2">Flow of electromagnetic phase</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold mb-2">Unified Picture:</p>
              <p>The quaternionic derivative defines the dynamics of coherence (Dirac). Its square gives energy curvature (Laplacian). The derivative acting on a vector field gives coherence transport (Maxwell). These three levels—motion, energy, and field—are aspects of the same resonance geometry.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold mb-2">Analogy:</p>
              <p>Think of the Dirac operator as motion, the Laplacian as vibration, and Maxwell as communication. In QSG, these are not separate—motion causes vibration, vibration carries information, and information preserves coherence.</p>
            </div>
          </section>

          {/* Section 8.6 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">8.6 Summary and Outlook</h2>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li>The <strong>Dirac operator</strong> describes how quaternionic orientations evolve, embedding spin directly into geometry.</li>
              <li>The <strong>Laplacian</strong> quantizes curvature into discrete resonance modes, giving rise to natural energy levels.</li>
              <li>The <strong>Maxwell equation</strong> unites electric and magnetic components as a single quaternionic coherence flow.</li>
              <li>The <strong>stress–energy tensor</strong> emerges from quaternionic multiplication itself, showing energy–momentum conservation as a property of geometric continuity.</li>
              <li>All three operators reflect the same underlying principle: that the universe's dynamics are expressions of quaternionic resonance on a curved manifold.</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold mb-2">Takeaway:</p>
              <p>The fundamental operators of physics—Dirac, Laplacian, and Maxwell—are different "voices" in the same quaternionic harmonic structure. Geometry, not algebraic postulate, dictates the form of physical law.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold mb-2">Next Chapter Preview:</p>
              <p>Chapter 9 introduces <strong>Computational Quaternionic Geometry</strong>, translating these geometric operators into numerical models, simulations, and visualizations that reveal the living dynamics of quaternionic resonance.</p>
            </div>
          </section>

        </div>

        {/* Chapter Navigation */}
        <div className="mt-12 pt-6 border-t-2 border-blue-200 flex justify-between items-center">
          <Link href="/chapter-7-spectral-coherence" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-previous-chapter">
            <ArrowLeft className="w-4 h-4" />
            Previous: Chapter 7
          </Link>
          <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-back-to-book-bottom">
            <ArrowLeft className="w-4 h-4" />
            Back to Table of Contents
          </Link>
          <Link href="/chapter-9-computational-geometry" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-next-chapter">
            Next: Chapter 9
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
