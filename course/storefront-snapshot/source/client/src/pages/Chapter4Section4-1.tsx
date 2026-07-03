import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter4Section4_1() {
  useEffect(() => {
    document.title = "Section 4.1: Spectra of the Laplacian | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore the eigenvalues of the Laplacian on M = SU(2) × ℝ, Wigner D-functions, and the discrete-continuous spectrum structure that underlies quaternionic spectral geometry.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 4 · Section 4.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Spectra of the Laplacian
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Eigenvalues, Wigner D-functions, and the discrete-continuous spectrum
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The Laplacian is the fundamental differential operator in spectral geometry. On flat space like <InlineMath math="\mathbb{R}^n" />, its eigenfunctions are the familiar exponentials and trigonometric functions—the building blocks of Fourier analysis. But on the curved manifold <InlineMath math="M = SU(2) \times \mathbb{R}" />, the Laplacian's spectrum reveals a richer structure: a discrete ladder of eigenvalues indexed by spin, combined with a continuous frequency parameter.
            </p>

            <p>
              This section develops the spectral decomposition of the Laplacian on <InlineMath math="M" />, showing how every function can be expanded in terms of eigenfunctions labeled by two parameters: the spin <InlineMath math="\ell" /> and the frequency <InlineMath math="\omega" />. Understanding this decomposition is the key to solving differential equations on quaternionic geometry.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do functions break into allowed patterns on SU(2) x R?"
              plainLanguageSetup="Chapter 3 built the Laplacian on S3. Now we ask how that operator acts on the product space M: the curved SU(2) part contributes discrete spin levels, while the R direction contributes continuous frequencies."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\Delta_M=\Delta_{SU(2)}+\partial_t^2,\qquad \lambda_{\ell,\omega}=\ell(\ell+2)+\omega^2" />
                  <p>
                    Read this as two sources of variation: angular structure on <InlineMath math="SU(2)" /> and linear oscillation along <InlineMath math="\mathbb{R}" />.
                  </p>
                </>
              }
              checkpoint="Why does one spectrum have both discrete and continuous labels?"
              revealAnswer="SU(2) is compact, so its harmonic levels are discrete. The real line is noncompact, so its frequency parameter is continuous."
              finalTakeaway="The product geometry separates modes into angular spin structure and linear frequency structure."
              nextStep="Section 4.2 uses that separated spectrum to define functions of the Laplacian."
            />

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                Think of a guitar string. When you pluck it, only certain frequencies sound—those that "fit" the string's length. Similarly, the Laplacian on <InlineMath math="SU(2)" /> only allows certain discrete "spin frequencies" to exist. These aren't arbitrary—they're determined by the geometry of the 3-sphere itself. Understanding these allowed modes is the first step toward solving any differential equation on quaternionic space.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Laplacian on SU(2)</h2>

            <p>
              The group <InlineMath math="SU(2)" /> is geometrically a 3-sphere <InlineMath math="S^3" />, and like any compact manifold, it has a Laplacian operator <InlineMath math="\Delta_{SU(2)}" /> that measures how a function curves and varies across the space. The remarkable fact is that this Laplacian has a completely discrete spectrum—only certain eigenvalues are allowed.
            </p>

            <p>
              The eigenfunctions of <InlineMath math="\Delta_{SU(2)}" /> are the famous Wigner D-functions, denoted <InlineMath math="D^{\ell}_{mn}(g)" /> for a group element <InlineMath math="g \in SU(2)" />. Each function is labeled by three indices:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li><InlineMath math="\ell = 0, 1, 2, 3, \ldots" /> — the spin or angular momentum quantum number</li>
              <li><InlineMath math="m, n \in \{-\ell, -\ell+1, \ldots, \ell-1, \ell\}" /> — magnetic quantum numbers</li>
            </ul>

            <p>
              For each spin level <InlineMath math="\ell" />, there are <InlineMath math="(2\ell + 1)^2" /> distinct Wigner D-functions, forming a complete set of harmonics at that level.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Eigenvalue Formula</h2>

            <p>
              The central result is the eigenvalue equation:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\Delta_{SU(2)} D^{\ell}_{mn}(g) = -\ell(\ell + 2) D^{\ell}_{mn}(g)" />
            </div>

            <p>
              This tells us that all Wigner D-functions at the same spin level <InlineMath math="\ell" /> share the same eigenvalue <InlineMath math="-\ell(\ell + 2)" />. The eigenvalue depends only on the spin, not on the magnetic indices <InlineMath math="m" /> and <InlineMath math="n" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: The Harmonic Ladder</p>
              <p className="text-gray-700">
                Picture a ladder where each rung represents a spin level. The bottom rung (<InlineMath math="\ell = 0" />) has eigenvalue 0—these are the constant functions that don't oscillate at all. The next rung (<InlineMath math="\ell = 1" />) has eigenvalue <InlineMath math="-3" />, representing the first set of oscillating modes. As you climb higher, the eigenvalues grow as <InlineMath math="-\ell(\ell + 2)" />, and the functions oscillate more rapidly across the 3-sphere.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Continuous Spectrum from ℝ</h2>

            <p>
              The manifold <InlineMath math="M = SU(2) \times \mathbb{R}" /> includes an additional real line direction. On <InlineMath math="\mathbb{R}" />, the Laplacian is simply <InlineMath math="\partial^2/\partial t^2" /> (where <InlineMath math="t" /> parameterizes the line), and its eigenfunctions are exponentials <InlineMath math="e^{i\omega t}" /> with eigenvalue <InlineMath math="-\omega^2" />.
            </p>

            <p>
              Unlike the discrete spectrum on <InlineMath math="SU(2)" />, the frequency <InlineMath math="\omega" /> can take any real value—this is the continuous part of the spectrum.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Combined Spectrum on M</h2>

            <p>
              On the full manifold <InlineMath math="M = SU(2) \times \mathbb{R}" />, the eigenfunctions are products of Wigner D-functions and Fourier exponentials:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Psi_{\ell,m,n,\omega}(g, t) = D^{\ell}_{mn}(g) \cdot e^{i\omega t}" />
            </div>

            <p>
              The full Laplacian <InlineMath math="\Delta_M = \Delta_{SU(2)} + \partial_t^2" /> acts on these combined eigenfunctions with eigenvalue:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\Delta_M \Psi_{\ell,m,n,\omega} = -(\ell(\ell + 2) + \omega^2) \Psi_{\ell,m,n,\omega}" />
            </div>

            <p>
              The spectrum of <InlineMath math="\Delta_M" /> is thus parameterized by two quantities: the discrete spin <InlineMath math="\ell \in \{0, 1, 2, \ldots\}" /> and the continuous frequency <InlineMath math="\omega \in \mathbb{R}" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: Two Kinds of Oscillation</p>
              <p className="text-gray-700">
                A function on <InlineMath math="M" /> can oscillate in two independent ways: it can wind around the 3-sphere (measured by spin <InlineMath math="\ell" />) and it can ripple along the real line (measured by frequency <InlineMath math="\omega" />). The total "eigenvalue" combines both contributions. This is like a drum that can vibrate in radial patterns (discrete modes) while also carrying traveling waves along its length (continuous modes).
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Spectral Decomposition</h2>

            <p>
              Any square-integrable function <InlineMath math="f" /> on <InlineMath math="M" /> can be decomposed into a sum over the discrete spin levels and an integral over the continuous frequency:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="f(g, t) = \sum_{\ell=0}^{\infty} \sum_{m,n=-\ell}^{\ell} \int_{-\infty}^{\infty} \hat{f}_{\ell,m,n}(\omega) D^{\ell}_{mn}(g) e^{i\omega t} \, d\omega" />
            </div>

            <p>
              The coefficients <InlineMath math="\hat{f}_{\ell,m,n}(\omega)" /> form the spectral representation of <InlineMath math="f" />—they tell us "how much" of each eigenmode is present in the original function.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Physical Significance</h2>

            <p>
              In physics, the spin index <InlineMath math="\ell" /> corresponds to angular momentum, while the frequency <InlineMath math="\omega" /> corresponds to energy or wave propagation. The spectral decomposition is therefore not just a mathematical tool—it reveals the physical content of fields on quaternionic spacetime.
            </p>

            <p>
              The key insight is that the Laplacian organizes functions into a hierarchy based on their geometric complexity. Low-spin, low-frequency modes are smooth and slowly varying; high-spin, high-frequency modes oscillate rapidly. This organization is the foundation for everything that follows in spectral calculus.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-4-spectral-calculus" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chapter 4</span>
          </Link>
          <MarkCompleteButton type="section" id="section-4-1" title="Section 4.1" />
          <Link href="/chapter-4/section-4-2" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Section 4.2: Functional Calculus</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
