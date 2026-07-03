import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter4Section4_2() {
  useEffect(() => {
    document.title = "Section 4.2: Functional Calculus | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn how functions of the Laplacian work spectrally, including heat operators and wave operators, transforming complex differential equations into simple spectral multiplications.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 4 · Section 4.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Functional Calculus
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              How functions of the Laplacian work spectrally
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Once we know the eigenvalues and eigenfunctions of the Laplacian, something remarkable becomes possible: we can define and compute operators that are functions of the Laplacian. Want to take the square root of the Laplacian? The exponential? A fractional power? All of these become straightforward once we understand spectral functional calculus.
            </p>

            <p>
              The key insight is simple but powerful: if an operator acts on eigenfunctions by multiplying them by eigenvalues, then any function of that operator acts by multiplying by the same function applied to the eigenvalues. This transforms complex differential equations into mere multiplication in spectral space.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What does it mean to apply a function to an operator?"
              plainLanguageSetup="Section 4.1 gave the eigenmode labels. Functional calculus uses those labels as a control panel: instead of changing a function directly in position space, we change each spectral mode by a chosen multiplier."
              formulaRecap={
                <>
                  <PrettyBlockMath math="F(-\Delta_M)f\longleftrightarrow F(\ell(\ell+2)+\omega^2)\,\hat f(\ell,\omega)" />
                  <p>
                    Read this as: decompose <InlineMath math="f" />, multiply each coefficient by <InlineMath math="F" /> evaluated at that mode's eigenvalue, then reconstruct.
                  </p>
                </>
              }
              checkpoint="Why is spectral space easier for many operators?"
              revealAnswer="Eigenmodes diagonalize the operator, so applying F(-Delta_M) becomes multiplication by one scalar factor per mode."
              finalTakeaway="Functional calculus turns operator action into mode-by-mode filtering on the spectrum."
              nextStep="Section 4.3 asks which modes are selected by energy minimization through the Rayleigh quotient."
            />

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                Imagine you need to solve the heat equation—a partial differential equation that describes how temperature diffuses over time. In position space, this is a complicated problem involving derivatives and boundary conditions. But in spectral space, the heat operator becomes simple multiplication: each eigenmode gets damped by a factor that depends on its eigenvalue. Functional calculus is the tool that makes this simplification possible.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Basic Principle</h2>

            <p>
              Suppose we have a function <InlineMath math="F: \mathbb{R}_{\geq 0} \to \mathbb{C}" /> and we want to define the operator <InlineMath math="F(-\Delta_M)" />. The spectral theorem tells us exactly how to do this:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="F(-\Delta_M) f \longleftrightarrow F(\ell(\ell+2) + \omega^2) \cdot \hat{f}(\ell, \omega)" />
            </div>

            <p>
              In words: transform to spectral space, multiply each coefficient by the appropriate value of <InlineMath math="F" /> evaluated at the eigenvalue, then transform back. The operator <InlineMath math="F(-\Delta_M)" /> is defined by what it does to each eigenmode.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: The Equalizer Analogy</p>
              <p className="text-gray-700">
                Think of an audio equalizer on a stereo. The input sound is a mix of many frequencies. The equalizer lets you boost or cut each frequency band independently. Functional calculus works the same way: the function <InlineMath math="F" /> is like the equalizer settings, telling us how much to amplify or suppress each spectral mode. The only difference is that our "frequencies" are labeled by both spin <InlineMath math="\ell" /> and linear frequency <InlineMath math="\omega" />.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Heat Operator</h2>

            <p>
              The heat equation describes diffusion—how an initial temperature distribution smooths out over time. The solution operator is the heat semigroup <InlineMath math="e^{t\Delta_M}" />, which evolves an initial condition forward in time by an amount <InlineMath math="t" />.
            </p>

            <p>
              In spectral space, this operator is remarkably simple:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="e^{t\Delta_M} \longleftrightarrow e^{-t(\ell(\ell+2) + \omega^2)}" />
            </div>

            <p>
              Each spectral mode is multiplied by an exponentially decaying factor. Modes with larger eigenvalues—those oscillating more rapidly in space—decay faster. This is the mathematical expression of the physical fact that sharp features smooth out under diffusion.
            </p>

            <p>
              Notice what happens at different scales:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Low spin, low frequency</strong> (<InlineMath math="\ell" /> and <InlineMath math="\omega" /> small): The eigenvalue is small, so the decay factor <InlineMath math="e^{-t(\ell(\ell+2) + \omega^2)}" /> is close to 1. These smooth, slowly varying modes persist.</li>
              <li><strong>High spin or high frequency</strong>: The eigenvalue is large, so the mode is rapidly suppressed. Fine details and rapid oscillations wash out quickly.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Resolvent Operator</h2>

            <p>
              The resolvent <InlineMath math="(-\Delta_M + \lambda)^{-1}" /> is the inverse of the shifted Laplacian. It appears when solving elliptic equations like Poisson's equation with a mass term.
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="(-\Delta_M + \lambda)^{-1} \longleftrightarrow \frac{1}{\ell(\ell+2) + \omega^2 + \lambda}" />
            </div>

            <p>
              Each spectral mode is divided by its shifted eigenvalue. The parameter <InlineMath math="\lambda > 0" /> ensures we never divide by zero (for positive <InlineMath math="\lambda" />, the denominator is always positive).
            </p>

            <p>
              The resolvent is the Green's operator for the equation <InlineMath math="(-\Delta_M + \lambda)u = f" />. Given a source <InlineMath math="f" />, the solution is <InlineMath math="u = (-\Delta_M + \lambda)^{-1}f" />, computed by spectral division.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Wave Operators and Propagation</h2>

            <p>
              The wave equation describes propagation without dissipation. Its solution involves operators like <InlineMath math="\cos(t\sqrt{-\Delta_M})" /> and <InlineMath math="\sin(t\sqrt{-\Delta_M})/\sqrt{-\Delta_M}" />.
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\cos(t\sqrt{-\Delta_M}) \longleftrightarrow \cos\left(t\sqrt{\ell(\ell+2) + \omega^2}\right)" />
            </div>

            <p>
              Unlike heat flow, wave propagation doesn't damp modes—it makes them oscillate in time. Each mode rings at its own natural frequency determined by the square root of the eigenvalue. This is why waves preserve sharp features while heat flow smooths them.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: Heat vs. Waves</p>
              <p className="text-gray-700">
                Imagine striking a bell. The sound waves propagate outward, maintaining their shape (wave equation). But if you heat one end of a metal rod, the temperature profile gradually smooths out (heat equation). Both processes are described by functions of the Laplacian, but with very different spectral multipliers: oscillating cosines for waves, decaying exponentials for heat.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Fractional Powers</h2>

            <p>
              Functional calculus also allows us to define fractional powers of the Laplacian, like <InlineMath math="(-\Delta_M)^{1/2}" /> or <InlineMath math="(-\Delta_M)^{\alpha}" /> for any <InlineMath math="\alpha > 0" />:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="(-\Delta_M)^{\alpha} \longleftrightarrow (\ell(\ell+2) + \omega^2)^{\alpha}" />
            </div>

            <p>
              These fractional operators appear in many contexts, from defining Sobolev spaces to describing anomalous diffusion. The spectral viewpoint makes them no harder to work with than ordinary powers.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Power of Spectral Methods</h2>

            <p>
              The central lesson of functional calculus is that the spectral domain is where differential operators become simple. A complicated partial differential equation in position space becomes a family of independent algebraic problems—one for each eigenmode—in spectral space.
            </p>

            <p>
              This is why spectral methods are so powerful in computational physics. Instead of discretizing derivatives (which introduces numerical errors), you work directly with the eigenmodes. The equations become exact, and the only approximation is in truncating the spectral expansion.
            </p>

            <p>
              In the context of quaternionic geometry, functional calculus reveals how the curved structure of <InlineMath math="SU(2)" /> and the flat structure of <InlineMath math="\mathbb{R}" /> interact through their combined spectrum. Every operator built from the Laplacian inherits this hybrid character.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-4/section-4-1" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Section 4.1: Spectra of the Laplacian</span>
          </Link>
          <MarkCompleteButton type="section" id="section-4-2" title="Section 4.2" />
          <Link href="/chapter-4/section-4-3" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Section 4.3: Rayleigh Quotient</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
