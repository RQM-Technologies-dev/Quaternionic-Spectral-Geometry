import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter4Section4_3() {
  useEffect(() => {
    document.title = "Section 4.3: Rayleigh Quotient and Variational Principles | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore the Rayleigh quotient and variational principles in quaternionic spectral geometry, understanding how energy minimization selects eigenfunctions.";
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
            <Link href="/chapter-4-spectral-calculus" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 4
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 4 · Section 4.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Rayleigh Quotient and Variational Principles
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Energy minimization and eigenfunction selection
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The Rayleigh quotient is one of the most powerful tools in spectral theory. It provides a variational characterization of eigenvalues—a way to find them by minimizing or extremizing a ratio of energies. This is not just a computational trick; it reveals that eigenfunctions are selected by nature because they optimize something fundamental.
            </p>

            <p>
              In this section, we develop the Rayleigh quotient for the Laplacian on <InlineMath math="M = SU(2) \times \mathbb{R}" /> and show how it connects to both spectral theory and physics.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How can an eigenvalue be found by measuring energy per amplitude?"
              plainLanguageSetup="Section 4.2 treated operators as spectral filters. The Rayleigh quotient gives another view: it asks how much variation a function has compared with its total size, and eigenfunctions appear at stable values of that ratio."
              formulaRecap={
                <>
                  <PrettyBlockMath math="R[f]=\frac{\int_M\|\nabla_M f\|^2\,d\mu_M}{\int_M |f|^2\,d\mu_M}" />
                  <p>
                    The numerator measures variation or gradient energy. The denominator measures total amplitude. The quotient compares the two.
                  </p>
                </>
              }
              checkpoint="What does a low Rayleigh quotient usually indicate?"
              revealAnswer="The function changes slowly relative to its size, so it belongs near the lower, smoother part of the spectrum."
              finalTakeaway="The Rayleigh quotient connects spectral labels to a variational idea: modes are selected by how they balance variation and size."
              nextStep="Section 4.4 interprets those selected modes as resonant patterns of the geometry."
            />

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                When a soap bubble forms a sphere, it's minimizing surface area for a given volume. When a vibrating string settles into its fundamental mode, it's minimizing a ratio of kinetic to potential energy. The Rayleigh quotient captures this variational principle in general: eigenfunctions are the shapes that extremize the ratio of "gradient energy" to "total amplitude." Understanding this principle lets us predict which modes will dominate in physical systems.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Defining the Rayleigh Quotient</h2>

            <p>
              For a nonzero function <InlineMath math="f" /> in <InlineMath math="L^2(M)" />, the Rayleigh quotient is defined as:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="R[f] = \frac{\int_M \|\nabla_M f\|^2 \, d\mu_M}{\int_M |f|^2 \, d\mu_M}" />
            </div>

            <p>
              Let's understand each piece:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li><strong>The numerator</strong> <InlineMath math="\int_M \|\nabla_M f\|^2 \, d\mu_M" /> is the Dirichlet energy—it measures how much the function varies across the manifold. A constant function has zero Dirichlet energy; a rapidly oscillating function has large Dirichlet energy.</li>
              <li><strong>The denominator</strong> <InlineMath math="\int_M |f|^2 \, d\mu_M" /> is the squared <InlineMath math="L^2" />-norm—it measures the total "size" or amplitude of the function.</li>
              <li><strong>The ratio</strong> tells us the average energy per unit amplitude, or roughly how "steep" the function is compared to how big it is.</li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: The Landscape Analogy</p>
              <p className="text-gray-700">
                Think of the function <InlineMath math="f" /> as the height of a landscape. The Dirichlet energy measures total steepness—how much elevation changes across the terrain. The denominator measures the total "landmass." The Rayleigh quotient tells you the average slope per unit area. A gently rolling plain has a low quotient; a jagged mountain range has a high quotient.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Spectral Form</h2>

            <p>
              The Rayleigh quotient has a beautiful expression in terms of spectral coefficients. If we expand <InlineMath math="f" /> in the eigenbasis with coefficients <InlineMath math="\hat{f}(\ell, \omega)" />, then:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\begin{aligned}
R[f]
&= \frac{
\sum_{\ell} d_\ell \int_{\mathbb{R}} (\ell(\ell+2) + \omega^2)\|\hat{f}(\ell, \omega)\|^2\,d\omega
}{
\sum_{\ell} d_\ell \int_{\mathbb{R}} \|\hat{f}(\ell, \omega)\|^2\,d\omega
}.
\end{aligned}" />
            </div>

            <p>
              Here <InlineMath math="d_\ell = (2\ell + 1)^2" /> is the dimension of the spin-<InlineMath math="\ell" /> representation. This formula says the Rayleigh quotient is a weighted average of eigenvalues, with weights given by the squared magnitudes of the spectral coefficients.
            </p>

            <p>
              In other words: the Rayleigh quotient tells you the "average eigenvalue" that the function experiences, weighted by where its energy is concentrated in the spectrum.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Minimum Principle</h2>

            <p>
              The fundamental variational principle states:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\lambda_0 = \min_{f \neq 0} R[f]" />
            </div>

            <p>
              The smallest eigenvalue of <InlineMath math="-\Delta_M" /> equals the minimum of the Rayleigh quotient over all nonzero functions. Moreover, this minimum is achieved exactly by the eigenfunctions corresponding to <InlineMath math="\lambda_0" />.
            </p>

            <p>
              For our manifold <InlineMath math="M = SU(2) \times \mathbb{R}" />, the smallest eigenvalue comes from <InlineMath math="\ell = 0" /> and any <InlineMath math="\omega" />. But the minimum Rayleigh quotient over all functions with finite norm is 0, achieved by constants (which have <InlineMath math="\ell = 0" />, <InlineMath math="\omega = 0" />).
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Higher Eigenvalues: The Minimax Principle</h2>

            <p>
              To find higher eigenvalues, we use the minimax (or min-max) principle. The <InlineMath math="n" />-th eigenvalue is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\lambda_n = \min_{\substack{V \text{ subspace} \\ \dim V = n+1}} \max_{f \in V, f \neq 0} R[f]" />
            </div>

            <p>
              In words: consider all <InlineMath math="(n+1)" />-dimensional subspaces of <InlineMath math="L^2(M)" />. In each subspace, find the maximum of the Rayleigh quotient. The <InlineMath math="n" />-th eigenvalue is the smallest such maximum across all subspaces.
            </p>

            <p>
              This principle is practically useful: to estimate <InlineMath math="\lambda_n" />, we only need to find a good <InlineMath math="(n+1)" />-dimensional trial space. The minimax principle guarantees our estimate will be an upper bound for the true eigenvalue.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: Musical Strings</p>
              <p className="text-gray-700">
                A guitar string can vibrate in many patterns: the fundamental (one big arc), the first harmonic (two arcs with a node in the middle), and so on. Each pattern minimizes the Rayleigh quotient subject to being orthogonal to all lower patterns. The fundamental is the absolute minimum; higher harmonics are "the best you can do" given that you can't use the lower modes. This is exactly the minimax principle at work.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Critical Points and Eigenfunctions</h2>

            <p>
              A function <InlineMath math="f" /> is an eigenfunction of <InlineMath math="-\Delta_M" /> if and only if it is a critical point of the Rayleigh quotient (subject to normalization). This means:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\frac{\delta R}{\delta f} = 0 \quad \Leftrightarrow \quad -\Delta_M f = \lambda f" />
            </div>

            <p>
              The Euler-Lagrange equation for extremizing <InlineMath math="R[f]" /> is precisely the eigenvalue equation. This is the deep reason why eigenfunctions are special: they are the only functions that make the Rayleigh quotient stationary.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Physical Interpretation</h2>

            <p>
              In physics, the Rayleigh quotient often has a direct energetic interpretation:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Quantum mechanics:</strong> The quotient is the expectation value of the Hamiltonian (up to constants), so minimizing it finds the ground state.</li>
              <li><strong>Vibrating membranes:</strong> The quotient is the ratio of potential to kinetic energy, and eigenfunctions are the natural modes of vibration.</li>
              <li><strong>Heat conduction:</strong> Modes with smaller eigenvalues (lower quotient) persist longer; those with larger eigenvalues decay faster.</li>
            </ul>

            <p>
              On the quaternionic manifold <InlineMath math="M" />, the Rayleigh quotient measures how a function's geometric complexity (how much it varies across <InlineMath math="SU(2)" /> and along <InlineMath math="\mathbb{R}" />) relates to its overall magnitude. Functions that vary slowly—and hence have low Rayleigh quotient—are the "ground states" of the geometry.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-4/section-4-2" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Section 4.2: Functional Calculus</span>
          </Link>
          <MarkCompleteButton type="section" id="section-4-3" title="Section 4.3" />
          <Link href="/chapter-4/section-4-4" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Section 4.4: Resonance Selection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
