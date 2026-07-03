import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter5Section5_5() {
  useEffect(() => {
    document.title = "Section 5.5: Applications to Quaternionic Analysis | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore how spectral theory on S³ × ℝ connects to quaternionic analysis, including slice regularity and quaternionic function theory.";
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
            <Link href="/chapter-5-spectral-theory" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 5
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 5 · Section 5.5</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Applications to Quaternionic Analysis
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Connecting spectral theory to quaternionic functions
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The spectral theory we've developed on <InlineMath math="S^3 \times \mathbb{R}" /> isn't just abstract mathematics—it connects directly to quaternionic analysis, the study of quaternion-valued functions and their generalizations of complex analyticity. This final section explores how the spectral framework illuminates quaternionic function theory and opens paths to applications in physics and geometry.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How does spectral theory help us organize quaternionic functions?"
              plainLanguageSetup="Sections 5.1-5.4 built the allowed mode language for S3 x R. This summary section connects that language to quaternionic function theory, where slices, angular modes, and coefficients all need to fit together."
              formulaRecap={
                <>
                  <PrettyBlockMath math="f(g,t)\sim\sum_{j,m,n}\int \hat f^j_{mn}(\omega)D^j_{mn}(g)e^{i\omega t}\,d\omega" />
                  <p>
                    Read the expansion as a bookkeeping system: angular behavior is indexed by <InlineMath math="j,m,n" />, and temporal or linear behavior is indexed by <InlineMath math="\omega" />.
                  </p>
                </>
              }
              checkpoint="What does the spectrum add to slice-based quaternionic analysis?"
              revealAnswer="It separates a function into angular and frequency components, making it easier to see which modes are present, absent, or constrained."
              finalTakeaway="Spectral theory provides a mode-by-mode coordinate framework for quaternionic functions on S3 x R."
              nextStep="Chapter 6 introduces AGQF as a resonance-organizing tool built after the spectral picture is in place."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Quaternionic Functions and Slice Regularity</h2>

            <p>
              In complex analysis, holomorphic functions satisfy the Cauchy-Riemann equations and can be expanded in power series. The quaternionic analogue is more subtle because quaternion multiplication doesn't commute. The modern approach uses <em>slice regularity</em>, where a function is analyzed on complex slices through <InlineMath math="\mathbb{H}" />.
            </p>

            <p>
              A slice-regular function <InlineMath math="f: \mathbb{H} \to \mathbb{H}" /> satisfies differential conditions on each complex plane <InlineMath math="\mathbb{C}_u = \{x + uy : x, y \in \mathbb{R}\}" />. The spectral decomposition provides a natural framework for such functions: expanding <InlineMath math="f" /> in Wigner D-functions separates the angular behavior from the radial or temporal behavior.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: Slicing Through Quaternions</p>
              <p className="text-gray-700">
                Imagine the quaternions as a four-dimensional space. Through each point, infinitely many complex planes pass (one for each unit imaginary direction <InlineMath math="u" />). A slice-regular function behaves holomorphically on each slice. The spectral decomposition captures how these slices fit together into a coherent whole.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Spectral Characterization of Regular Functions</h2>

            <p>
              The eigenfunctions of the Laplacian on <InlineMath math="S^3" /> have direct connections to regular quaternionic functions. A function that is slice-regular has a spectral expansion where certain modes are absent or related. The regularity condition imposes constraints on the Fourier coefficients <InlineMath math="\hat{f}^j_{mn}" />.
            </p>

            <p>
              For example, the simplest slice-regular functions are the quaternionic polynomials <InlineMath math="q^n" />. Their spectral decomposition involves only specific representations, with coefficients determined by the power <InlineMath math="n" />. The exponential function <InlineMath math="e^q" />, defined through its power series, similarly has a characteristic spectral fingerprint.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Quaternionic Fourier Transform</h2>

            <p>
              The spectral decomposition on <InlineMath math="S^3 \times \mathbb{R}" /> defines a quaternionic Fourier transform. For a function <InlineMath math="F(g, t)" />:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\mathcal{F}[F](j, m, n, \omega) = \int_{S^3} \int_{\mathbb{R}} F(g, t) \, \overline{D^j_{mn}(g)} \, e^{i\omega t} \, dt \, dg" />
            </div>

            <p>
              This transform extracts the content of <InlineMath math="F" /> at each angular mode and frequency. The inverse transform reconstructs <InlineMath math="F" /> from its spectral coefficients. For quaternionic analysis, this transform reveals which representation content a function carries.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Applications to Differential Equations</h2>

            <p>
              Many partial differential equations on <InlineMath math="S^3 \times \mathbb{R}" /> become simpler in the spectral domain. The Laplacian becomes multiplication by an eigenvalue. The wave equation becomes an algebraic condition relating angular and temporal frequencies.
            </p>

            <p>
              For the quaternionic Dirac equation, which describes spinor fields, the spectral decomposition separates the problem into independent modes. Each mode satisfies a simple first-order equation, making the full solution a superposition of these elementary pieces.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                Spectral methods turn differential equations into algebraic equations. For quaternionic PDEs, where the non-commutativity of quaternions complicates direct approaches, the spectral framework provides a systematic way to find solutions. The eigenfunctions do the heavy lifting.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Energy, Angular Momentum, and Orientation</h2>

            <p>
              In quantum mechanics, the spectral decomposition corresponds to measuring observables. On <InlineMath math="S^3 \times \mathbb{R}" />, the spectral labels have physical interpretations:
            </p>

            <ul className="list-none space-y-4 my-6">
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>j</span>
                <span>The total angular momentum quantum number, determining how rapidly the state oscillates on the sphere.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>m, n</span>
                <span>Projections of angular momentum along two independent axes, specifying orientation within the angular momentum shell.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>ω</span>
                <span>The temporal frequency, related to energy through <InlineMath math="E = \hbar\omega" />.</span>
              </li>
            </ul>

            <p>
              The spectral decomposition thus encodes both the rotational and temporal characteristics of a physical state. Energy and angular momentum emerge together from the geometry of <InlineMath math="M" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Spectral Density and Resonance</h2>

            <p>
              The spectral density <InlineMath math="\rho(j, \omega) = |\hat{F}^j(\omega)|^2" /> measures how a field's energy is distributed across modes. Peaks in the spectral density indicate resonances—modes that the field strongly excites.
            </p>

            <p>
              For a field on <InlineMath math="S^3 \times \mathbb{R}" />, resonance occurs when the angular and temporal frequencies match the dispersion relation <InlineMath math="\omega^2 = j(j+1)" />. These resonant modes propagate coherently; off-resonant contributions decay or interfere destructively.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Toward Quaternionic Quantum Theory</h2>

            <p>
              The spectral framework on <InlineMath math="S^3 \times \mathbb{R}" /> provides mathematical infrastructure for quaternionic approaches to quantum theory. The Wigner D-functions naturally describe spin, the product structure separates internal and spacetime degrees of freedom, and the Fourier transform connects position and momentum representations.
            </p>

            <p>
              While standard quantum mechanics uses complex Hilbert spaces, quaternionic extensions have been explored since the 1930s. The spectral theory developed here shows how such extensions might be structured: the representation theory of <InlineMath math="SU(2)" /> provides the angular part, and standard Fourier analysis provides the rest.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                Spectral theory on <InlineMath math="S^3 \times \mathbb{R}" /> connects abstract harmonic analysis to concrete applications in quaternionic function theory, differential equations, and physics. The Wigner D-functions, Peter-Weyl theorem, and product structure provide a complete toolkit for analyzing quaternionic fields, waves, and quantum states.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Summary: The Spectral Perspective</h2>

            <p>
              This chapter has developed a comprehensive spectral theory for the manifold <InlineMath math="S^3 \times \mathbb{R}" />. The key elements are:
            </p>

            <ul className="list-disc ml-6 space-y-2 my-6">
              <li>The Laplacian on <InlineMath math="S^3" /> has discrete eigenvalues <InlineMath math="\lambda_j = j(j+1)" /> with multiplicities <InlineMath math="(2j+1)^2" />.</li>
              <li>The Peter-Weyl theorem guarantees that Wigner D-functions form a complete orthonormal basis.</li>
              <li>On the product <InlineMath math="S^3 \times \mathbb{R}" />, eigenfunctions factor into angular (D-functions) and temporal (exponentials) parts.</li>
              <li>The quaternionic Fourier transform decomposes any function into its spectral components.</li>
              <li>Applications range from solving PDEs to understanding quantum states with spin.</li>
            </ul>

            <p>
              This spectral perspective—seeing functions as superpositions of harmonics rather than point values—is the natural language for physics on curved quaternionic spaces. It connects the geometry of <InlineMath math="S^3" /> to the dynamics of waves, fields, and quantum systems.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-5/section-5-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 5.4
          </Link>

          <MarkCompleteButton type="section" id="section-5-5" title="Section 5.5" />

          <Link href="/chapter-5-spectral-theory" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>
        </div>
      </section>
    </div>
  );
}
