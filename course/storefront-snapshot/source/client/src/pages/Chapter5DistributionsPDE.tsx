import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";

export default function Chapter5DistributionsPDE() {
  useEffect(() => {
    document.title = "Chapter 5: Spectral Theory on S³ × ℝ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Chapter 5 of Quaternionic Spectral Geometry textbook: Spectral theory on S³ × ℝ, covering harmonic analysis, eigenfunctions, Wigner D-matrices, and quaternionic spherical harmonics.";
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
          <div className="text-sm text-gray-500 mb-2">Chapter 5</div>
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Spectral Theory on S³ × ℝ
          </h1>
          <h2 className="text-2xl font-semibold text-blue-700 italic">
            Harmonic Analysis and Eigenfunctions
          </h2>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-lg max-w-none">

          {/* Chapter Overview */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Chapter Overview</h3>
            <p className="mb-4">
              In this chapter, we explore the deep harmony between geometry, oscillation, and energy on the curved space <InlineMath math="S^3 \times \mathbb{R}" />. The 3-sphere <InlineMath math="S^3" /> provides a natural arena for rotations, while <InlineMath math="\mathbb{R}" /> represents time or translation. When combined, they form a unified stage where vibrations, rotations, and frequencies interact. This framework—called <strong>spectral theory</strong>—reveals how geometry itself determines the structure of possible waves, much like the shape of a drum determines the notes it can produce.
            </p>
            <p className="mb-4">
              Spectral theory on <InlineMath math="S^3 \times \mathbb{R}" /> is the mathematical foundation for resonance and quantization in quaternionic geometry. By decomposing functions into eigenmodes of the Laplacian and Fourier components in time, we uncover how energy, frequency, and orientation emerge as facets of a single geometric spectrum.
            </p>
            <p className="mb-4">We will explore:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Separation of variables on <InlineMath math="S^3" /></li>
              <li>Wigner D-matrices and quaternionic spherical harmonics</li>
              <li>Fourier and Laplace transforms on <InlineMath math="SU(2) \times \mathbb{R}" /></li>
              <li>Spectral density and orthogonality</li>
              <li>Unified interpretations of energy, frequency, and orientation</li>
            </ul>
          </div>

          {/* Section 5.1 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">5.1 Separation of Variables on <InlineMath math="S^3" /></h2>

            <p className="mb-4">
              The 3-sphere <InlineMath math="S^3" /> acts like a perfectly symmetrical resonant cavity. Just as the vibrations of a circular drum produce discrete harmonic frequencies, waves on <InlineMath math="S^3" /> produce a quantized spectrum of standing modes.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">The Laplace–Beltrami Equation</h4>
              <p className="mb-4">
                The Laplace–Beltrami operator <InlineMath math="\Delta_{S^3}" /> governs how functions curve and oscillate on the sphere. The equation
              </p>
              <PrettyBlockMath math="\Delta_{S^3} \psi + \lambda \psi = 0" />
              <p className="mb-4">
                is the analogue of the Helmholtz equation in Euclidean space. Its solutions describe harmonic waves that fit perfectly on <InlineMath math="S^3" /> without destructive interference.
              </p>
              <p className="mb-4">
                Because <InlineMath math="S^3" /> is compact and positively curved, the possible eigenvalues <InlineMath math="\lambda" /> are discrete:
              </p>
              <PrettyBlockMath math="\lambda_\ell = \ell(\ell + 2), \quad \ell = 0, 1, 2, \dots" />
              <p className="mb-4">
                Each integer <InlineMath math="\ell" /> corresponds to a distinct resonance layer, with multiplicity <InlineMath math="(\ell + 1)^2" />. Higher <InlineMath math="\ell" /> values represent more rapidly oscillating modes.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Time-Dependent Separation</h4>
              <p className="mb-4">
                When extended to time, the total space becomes <InlineMath math="S^3 \times \mathbb{R}" />, where waves can evolve. Writing
              </p>
              <PrettyBlockMath math="\Psi(g, t) = Y_\ell(g)e^{-i\omega t}," />
              <p className="mb-4">and substituting into the wave equation</p>
              <PrettyBlockMath math="\left(\frac{\partial^2}{\partial t^2} + \Delta_{S^3}\right)\Psi = 0," />
              <p className="mb-4">we obtain the dispersion relation:</p>
              <PrettyBlockMath math="\omega^2 = \ell(\ell + 2)." />
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Interpretation:</p>
                <p>The geometry of <InlineMath math="S^3" /> determines the allowed frequencies of vibration. The curvature confines the wave, enforcing discrete resonant frequencies, much like standing waves in a musical instrument.</p>
              </div>
              <p className="mb-4">
                These discrete spatial frequencies combine with continuous time oscillations to create a harmonic ladder that bridges geometry and energy.
              </p>
            </div>
          </section>

          {/* Section 5.2 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">5.2 Wigner D-Matrices and Quaternionic Spherical Harmonics</h2>

            <p className="mb-4">
              To describe vibrations on <InlineMath math="S^3" />, we use representation theory. Since <InlineMath math="S^3" /> is isomorphic to the Lie group <InlineMath math="SU(2)" />, every vibration mode corresponds to a representation of <InlineMath math="SU(2)" />. This unites geometry, algebra, and wave behavior into one structure.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Wigner D-Matrices</h4>
              <p className="mb-4">
                The <strong>Wigner D-matrices</strong>, <InlineMath math="D^j_{mn}(g)" />, are functions on <InlineMath math="SU(2)" /> that describe how the group's elements act in the <InlineMath math="(2j+1)" />-dimensional representation. They form a complete, orthonormal basis for all square-integrable functions on <InlineMath math="SU(2)" />:
              </p>
              <PrettyBlockMath math="f(g) = \sum_{j=0}^{\infty} \sum_{m,n=-j}^{j} f^j_{mn} D^j_{mn}(g)." />
              <p className="mb-4">Their orthogonality ensures that each vibration mode is independent:</p>
              <PrettyBlockMath math="\int_{SU(2)} D^j_{mn}(g) \overline{D^{j'}_{m'n'}(g)}\,dg = \frac{1}{2j+1}\,\delta_{jj'}\,\delta_{mm'}\,\delta_{nn'}." />
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Physical Picture:</p>
                <p>Each <InlineMath math="D^j_{mn}" /> is a "rotational harmonic"—a pattern of vibration that wraps around <InlineMath math="S^3" /> in a perfectly balanced way. The indices <InlineMath math="m" /> and <InlineMath math="n" /> represent how the pattern twists under left and right rotations, analogous to angular momentum projections.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Quaternionic Interpretation</h4>
              <p className="mb-4">
                If we write an element of <InlineMath math="S^3" /> as a quaternion <InlineMath math="g = \cos\varphi + \mathbf{u}\sin\varphi" />, then each <InlineMath math="D^j_{mn}(g)" /> represents a standing rotational wave distributed along great circles of the sphere. The parameter <InlineMath math="j" /> determines the number of nodes (regions of cancellation), while the vector <InlineMath math="\mathbf{u}" /> defines the axis of rotation.
              </p>
              <p className="mb-4">
                This quaternionic view reveals that these modes are not abstract—each corresponds to a coherent rotational resonance encoded in the manifold's geometry.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Analogy:</p>
                <p>Just as spherical harmonics <InlineMath math="Y_{\ell m}" /> describe patterns on <InlineMath math="S^2" /> (the surface of a sphere), the quaternionic harmonics <InlineMath math="Y_{\ell mn}" /> describe patterns on <InlineMath math="S^3" />, where every direction and orientation participates in the oscillation.</p>
              </div>
            </div>
          </section>

          {/* Section 5.3 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">5.3 Fourier and Laplace Transforms on <InlineMath math="SU(2) \times \mathbb{R}" /></h2>

            <p className="mb-4">
              Spectral theory becomes truly powerful when we combine spatial and temporal decomposition. The quaternionic Fourier transform allows us to express any time-varying field on <InlineMath math="S^3" /> as a superposition of rotational modes and temporal frequencies.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Quaternionic Fourier Transform</h4>
              <p className="mb-4">
                For a field <InlineMath math="F(g, t)" /> on <InlineMath math="SU(2) \times \mathbb{R}" />:
              </p>
              <PrettyBlockMath math="\mathcal{F}[F](j, \omega) = \int_{SU(2)} \int_{\mathbb{R}} F(g, t) \overline{D^j(g)} e^{i\omega t} \, dt \, dg." />
              <p className="mb-4">
                This transform extracts how much of the field vibrates at each rotational level <InlineMath math="j" /> and frequency <InlineMath math="\omega" />.
              </p>
              <p className="mb-4">The inverse transform reconstructs the original function:</p>
              <PrettyBlockMath math="F(g, t) = \sum_{j=0}^{\infty} (2j+1) \int_{\mathbb{R}} \mathcal{F}[F](j, \omega) D^j(g) e^{-i\omega t} \, d\omega." />
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Interpretation:</p>
                <p>In flat space, a signal decomposes into plane waves of different wavelengths. On <InlineMath math="S^3" />, these "plane waves" become curved rotational harmonics (the Wigner D-modes). Each term <InlineMath math="e^{-i\omega t}" /> tracks how the pattern evolves in time.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Laplace Transform for Diffusive Systems</h4>
              <p className="mb-4">
                If time evolution involves damping or diffusion, we use the Laplace transform:
              </p>
              <PrettyBlockMath math="\mathcal{L}[F](g, s) = \int_0^{\infty} e^{-st} F(g, t) \, dt." />
              <p className="mb-4">
                This replaces time with a complex spectral variable <InlineMath math="s" />, converting differential equations into algebraic ones. The Laplace transform thus allows spectral analysis of transient processes—where the Fourier transform describes steady oscillations, the Laplace transform captures how coherence grows or decays.
              </p>
            </div>
          </section>

          {/* Section 5.4 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">5.4 Spectral Density and Orthogonality</h2>

            <p className="mb-4">
              Every field defined on <InlineMath math="S^3" /> can be decomposed into orthogonal eigenmodes—mutually independent vibration patterns. The coefficients of this expansion describe how energy or variance is distributed across these modes.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Orthogonality of Eigenfunctions</h4>
              <p className="mb-4">
                For eigenmodes <InlineMath math="Y_{\ell mn}" />:
              </p>
              <PrettyBlockMath math="\int_{S^3} Y_{\ell mn}(g) \overline{Y_{\ell' m'n'}(g)}\,dg = \delta_{\ell\ell'}\delta_{mm'}\delta_{nn'}." />
              <p className="mb-4">
                This means different modes do not interfere—each one resonates independently, forming a complete and orthogonal basis for <InlineMath math="L^2(S^3)" />.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Spectral Density Function</h4>
              <p className="mb-4">
                If <InlineMath math="F(g, t)" /> represents a field, its <strong>spectral density</strong> <InlineMath math="\rho(\ell, \omega)" /> describes how its energy is distributed among rotational and temporal frequencies:
              </p>
              <PrettyBlockMath math="\rho(\ell, \omega) = |\mathcal{F}[F](\ell, \omega)|^2." />
              <p className="mb-4">The total energy is then:</p>
              <PrettyBlockMath math="E = \sum_{\ell=0}^{\infty} (2\ell+1) \int_{-\infty}^{\infty} \rho(\ell, \omega) \, d\omega." />
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Physical Meaning:</p>
                <p>Each eigenmode <InlineMath math="(\ell, m, n, \omega)" /> represents a stable standing wave that carries orientation <InlineMath math="(m, n)" />, energy (amplitude), and frequency <InlineMath math="\omega" />. The full spectral density is the harmonic fingerprint of the field's geometry and dynamics.</p>
              </div>
            </div>
          </section>

          {/* Section 5.5 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">5.5 Energy, Frequency, and Orientation in Unified Spectral Space</h2>

            <p className="mb-4">
              In quaternionic spectral geometry, energy, frequency, and orientation are facets of one unified structure. The geometry of <InlineMath math="S^3" /> links rotational symmetry to quantized energy levels, while time evolution in <InlineMath math="\mathbb{R}" /> provides the oscillatory phase. Together, they form the <strong>spectral manifold</strong> <InlineMath math="S^3 \times \mathbb{R}" />, where each state <InlineMath math="\Psi(g, t)" /> is both a spatial resonance and a temporal wave.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Unified Interpretation</h4>
              <ul className="list-disc ml-6 space-y-3 mb-4">
                <li><strong>Energy</strong> corresponds to amplitude squared, describing how much each mode contributes.</li>
                <li><strong>Frequency</strong> arises from temporal oscillation <InlineMath math="e^{-i\omega t}" />, setting the rhythm of the mode.</li>
                <li><strong>Orientation</strong> is built into the geometry of <InlineMath math="S^3" />, specifying how each wave aligns or twists in quaternionic space.</li>
              </ul>
              <p className="mb-4">
                These three elements are not separate—each quaternionic mode encodes all simultaneously. Changing one (for example, rotating the mode) affects the others, preserving total coherence.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Deeper Insight:</p>
                <p>In physical terms, this geometry shows how rotation, vibration, and energy are inseparable aspects of the same underlying field. Quantization emerges naturally: discrete spatial modes (from <InlineMath math="S^3" />) combine with continuous temporal frequencies (from <InlineMath math="\mathbb{R}" />) to form the structure of resonance.</p>
              </div>
            </div>
          </section>

          {/* Section 5.6 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">5.6 Summary and Outlook</h2>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li>The eigenfunctions of <InlineMath math="\Delta_{S^3}" /> (the Wigner D-matrices) describe intrinsic vibration modes of <InlineMath math="S^3" /> determined purely by symmetry.</li>
              <li>Each mode <InlineMath math="\ell" /> defines a rotational frequency, while time <InlineMath math="t" /> introduces a continuous oscillation <InlineMath math="\omega" />.</li>
              <li>Fourier and Laplace transforms on <InlineMath math="SU(2) \times \mathbb{R}" /> decompose signals into their harmonic building blocks—curved-space analogues of sine and cosine waves.</li>
              <li>Spectral density provides a bridge between mathematics and physics, quantifying how geometric curvature distributes energy across modes.</li>
              <li>Quaternionic geometry unifies these phenomena: energy, frequency, and orientation are not separate quantities but interlocked dimensions of resonance.</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold mb-2">Next Chapter Preview:</p>
              <p>Chapter 6 introduces <strong>Anchor Wells and Quantization</strong>, revealing how specific geometric resonances on <InlineMath math="S^3 \times \mathbb{R}" /> create discrete energy levels—bridging harmonic geometry with the fundamental structure of quantum theory.</p>
            </div>
          </section>

          {/* Further Reading */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Further Reading</h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Vilenkin & Klimyk, <em>Representation of Lie Groups and Special Functions</em>.</li>
              <li>Varshalovich, Moskalev & Khersonskii, <em>Quantum Theory of Angular Momentum</em>.</li>
              <li>Knapp, <em>Representation Theory of Semisimple Groups</em>.</li>
              <li>Stein & Weiss, <em>Introduction to Fourier Analysis on Euclidean Spaces</em>.</li>
              <li>Folland, <em>A Course in Abstract Harmonic Analysis</em>.</li>
            </ul>
          </section>

        </div>

        {/* Chapter Navigation */}
        <div className="mt-12 pt-6 border-t-2 border-blue-200 flex justify-between items-center">
          <Link href="/chapter-4-quaternionic-calculus-new" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-previous-chapter">
            <ArrowLeft className="w-4 h-4" />
            Previous: Chapter 4
          </Link>
          <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-back-to-book-bottom">
            <ArrowLeft className="w-4 h-4" />
            Back to Table of Contents
          </Link>
          <Link href="/chapter-6-agqf" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-next-chapter">
            Next: Chapter 6
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
