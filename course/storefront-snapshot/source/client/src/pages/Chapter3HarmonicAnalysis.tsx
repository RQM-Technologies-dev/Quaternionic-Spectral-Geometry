import { useEffect } from "react";
import { Link } from "wouter";
import Math from "@/components/Math";

export default function Chapter3HarmonicAnalysis() {
  useEffect(() => {
    document.title = "Chapter 3: Harmonic Analysis and Transforms - QSG Textbook";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8 text-sm md:text-base">
          <Link href="/quaternionic-spectral-geometry-book" className="text-blue-600 text-sm md:text-base hover:underline text-sm">
            ← Back to Textbook Index
          </Link>
        </div>

        {/* Chapter Content */}
        <div className="prose max-w-none text-lg leading-relaxed">

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-8 border-b border-gray-300 pb-4">
            Chapter 3 · Harmonic Analysis and Transforms
          </h1>

          <p className="text-black mb-6">
            Harmonic analysis is the study of functions by decomposing them into building blocks — oscillations, rotations, frequencies.
          </p>

          <p className="text-black mb-4">
            On <Math>{"\\mathbb{R}"}</Math>, the building blocks are exponential functions <Math>{"e^{i\\omega x}"}</Math>. This is ordinary Fourier analysis.
          </p>

          <p className="text-black mb-4">
            On the circle <Math>{"S^1"}</Math>, the building blocks are the functions <Math>{"e^{in\\theta}"}</Math>, i.e. Fourier series.
          </p>

          <p className="text-black mb-4">
            On <em>SU</em>(2), the building blocks are more elaborate: they are the matrix elements of irreducible representations of the group.
          </p>

          <p className="text-black mb-6">
            The miracle is that all of these fit together into a consistent story: every function can be expanded into sums (or integrals) of "harmonics."
          </p>

          <p className="text-black mb-4">
            Quaternionic Spectral Geometry (QSG) takes this one step further. Since our manifold is <Math>{"M = SU(2) \\times \\mathbb{R}"}</Math>, we combine:
          </p>

          <ul className="space-y-2 text-black ml-6 mb-6">
            <li>Peter-Weyl theory (the analogue of Fourier series for compact groups like <em>SU</em>(2)), and</li>
            <li>the Fourier transform on ℝ.</li>
          </ul>

          <p className="text-black mb-8">
            This creates what we will call the <strong>Peter-Weyl-R transform</strong>. It is to QSG what the Fourier transform is to calculus: the master tool for decomposing, analyzing, and recombining functions.
          </p>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">3.1 Representation Theory of <em>SU</em>(2)</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Definition 3.1 (Irreducible representations).</p>
            <p className="text-black mb-4">
              A <strong>representation</strong> of a group <em>G</em> is a homomorphism <Math>{"\\pi: G \\to GL(V)"}</Math>, mapping group elements to linear operators on a vector space <em>V</em>, preserving multiplication.
            </p>

            <p className="text-black mb-4">
              For <em>SU</em>(2), every irreducible representation is indexed by an integer or half-integer l ∈ {"{0, 1/2, 1, 3/2, ...}"}. The corresponding space has dimension <em>d<sub>l</sub></em> = 2l + 1.
            </p>

            <p className="text-black mb-6">
              The matrix coefficients of π<sub>l</sub> are denoted <em>D<sub>mn</sub><sup>l</sup></em>(<em>x</em>), where -l ≤ <em>m</em>, <em>n</em> ≤ l. These are called <strong>Wigner D-functions</strong>.
            </p>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> "Representation" means: instead of looking at the group directly, we let it act on a vector space by matrices.
            </p>

            <p className="text-black mb-4">
              For <em>SU</em>(2), the irreducible representations are labeled by a number l, which can be thought of as the "spin" in physics.
            </p>

            <p className="text-black mb-4">
              The dimension <em>d<sub>l</sub></em> = 2l + 1 counts how many independent components the representation has. For l = 0, it's trivial (dimension 1). For l = 1/2, it's 2-dimensional (this is the spinor representation). For l = 1, it's 3-dimensional (the vector representation).
            </p>

            <p className="text-black mb-4">
              The functions <em>D<sub>mn</sub><sup>l</sup></em>(<em>x</em>) are the entries of the matrix π<sub>l</sub>(<em>x</em>). They form a complete set of "oscillations" on the group <em>SU</em>(2), analogous to the sines and cosines on a circle.
            </p>

            <p className="text-black mb-6">
              So just as you can write any function on a circle as a sum of <em>e</em><sup><em>inθ</em></sup>, you can write any function on <em>SU</em>(2) as a sum of these <em>D<sub>mn</sub><sup>l</sup></em>(<em>x</em>).
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">3.2 Peter-Weyl Theorem</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Theorem 3.1 (Peter-Weyl decomposition).</p>
            <p className="text-black mb-4">The set of functions</p>

            <Math block={true} className="text-center text-xl my-6">
              {"\\{\\sqrt{d_l} D_{mn}^l(x) : l \\in (1/2)\\mathbb{N}_0, -l \\leq m, n \\leq l \\}"}
            </Math>

            <p className="text-black mb-4">forms an orthonormal basis of <em>L</em>²(<em>SU</em>(2)).</p>

            <p className="text-black mb-4">This means: every square-integrable function <em>f</em>: <em>SU</em>(2) → ℂ can be expanded as</p>

            <Math block={true} className="text-center text-xl my-6">
              {"f(x) = \\sum_{l=0}^{\\infty} d_l \\sum_{m,n=-l}^l f_{mn}^l D_{mn}^l(x)"}
            </Math>

            <p className="text-black mb-4">where the coefficients are</p>

            <Math block={true} className="text-center text-xl my-6">
              {"f_{mn}^l = \\int_{SU(2)} f(x) D_{mn}^l(x)^* \\, d\\mu_{SU(2)}(x)"}
            </Math>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> This is the Fourier series theorem for <em>SU</em>(2).
            </p>

            <p className="text-black mb-4">On the circle: every function can be written as a series of sines and cosines.</p>

            <p className="text-black mb-4">On <em>SU</em>(2): every function can be written as a series of Wigner D-functions.</p>

            <p className="text-black mb-4">
              The coefficients <em>f<sub>mn</sub><sup>l</sup></em> are like the Fourier coefficients. They tell you how much of each "spin-l" harmonic is present in your function.
            </p>

            <p className="text-black mb-6">
              So Peter-Weyl says: the geometry of <em>SU</em>(2) is entirely encoded in these harmonics. This is one of the most beautiful and powerful theorems in mathematics — it's why representation theory and harmonic analysis are inseparable.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">3.3 Fourier Transform on ℝ</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="text-black mb-4">Before we combine with <em>SU</em>(2), recall the standard Fourier transform on the real line.</p>

            <p className="font-semibold text-black mb-3 text-lg">Definition 3.2 (Fourier transform on ℝ).</p>
            <p className="text-black mb-4">For <em>g</em> ∈ <em>L</em>¹(ℝ), the Fourier transform is</p>

            <Math block={true} className="text-center text-xl my-6">
              {"\\hat{g}(\\omega) = \\int_{\\mathbb{R}} g(u) e^{-i\\omega u} \\, du"}
            </Math>

            <p className="text-black mb-4">with inverse</p>

            <Math block={true} className="text-center text-xl my-6">
              {"g(u) = \\frac{1}{2\\pi} \\int_{\\mathbb{R}} \\hat{g}(\\omega) e^{i\\omega u} \\, d\\omega"}
            </Math>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> The Fourier transform decomposes a signal into pure oscillations <em>e</em><sup><em>iωu</em></sup>.
            </p>

            <p className="text-black mb-4">ω is the frequency variable, <em>u</em> is the time/scale variable.</p>

            <p className="text-black mb-4">Together, {"{"}<em>e</em><sup><em>iωu</em></sup>{"}"} form a continuous basis for functions on the line.</p>

            <p className="text-black mb-6">
              This is exactly the one-dimensional analogy of the Peter–Weyl theorem. We are now ready to combine them.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">3.4 The Peter-Weyl-R Transform</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Definition 3.3 (Peter-Weyl-R transform).</p>
            <p className="text-black mb-4">
              For a function <em>f</em>: <em>M</em> → ℍ with <em>M</em> = <em>SU</em>(2) × ℝ, define
            </p>

            <Math block={true} className="text-center text-xl my-6">
              {"\\hat{f}(l, \\omega) := \\int_{SU(2)} \\int_{\\mathbb{R}} f(x, u) \\pi_l(x)^* e^{-i\\omega u} \\, d\\mu_{SU(2)}(x) \\, du"}
            </Math>

            <p className="text-black mb-6">
              This yields a <em>d<sub>l</sub></em> × <em>d<sub>l</sub></em> matrix (with quaternionic entries if <em>f</em> is quaternion-valued), for each (l, ω).
            </p>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> This is the master transform of QSG.
            </p>

            <p className="text-black mb-4">You feed in a function <em>f</em>(<em>x</em>, <em>u</em>) defined on <em>M</em>.</p>

            <p className="text-black mb-4">The transform "slices" it into two parts:</p>

            <ul className="space-y-2 text-black ml-6 mb-4">
              <li>Expand in harmonics on <em>SU</em>(2) (via π<sub>l</sub>(<em>x</em>)), and</li>
              <li>Expand in frequencies on ℝ (via <em>e</em><sup>-<em>iωu</em></sup>).</li>
            </ul>

            <p className="text-black mb-4">
              The output is not a number, but a whole matrix for each pair (l, ω). Each l corresponds to a "spin level," each ω corresponds to a frequency.
            </p>

            <p className="text-black mb-4">
              So instead of one Fourier coefficient, you get a whole grid of coefficients. It's like having a spectrum in two directions at once: rotational spectrum (indexed by l) and frequency spectrum (indexed by ω).
            </p>

            <p className="text-black mb-6">
              <strong>Analogy.</strong> In audio processing, you might decompose a signal into pitch and time. In QSG, you decompose into spin and frequency.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">3.5 Inversion and Plancherel's Theorem</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Theorem 3.2 (Inversion).</p>
            <p className="text-black mb-4">Every <em>f</em> ∈ <em>L</em>²(<em>M</em>) can be recovered from its transform by</p>

            <div className="text-center my-6 text-lg">
              <Math block={true}>
                {"f(x, u) = \\sum_{\\ell=0}^{\\infty} d_\\ell \\, \\text{Tr}\\left(\\pi_\\ell(x) \\frac{1}{2\\pi} \\int_{\\mathbb{R}} \\hat{f}(\\ell, \\omega) e^{i\\omega u} \\, d\\omega\\right)"}
              </Math>
            </div>

            <p className="font-semibold text-black mb-3 text-lg">Theorem 3.3 (Plancherel identity).</p>

            <div className="text-center my-6 text-lg">
              <Math block={true}>
                {"\\|f\\|_{L^2(M)}^2 = \\sum_{\\ell=0}^{\\infty} d_\\ell \\cdot \\frac{1}{2\\pi} \\int_{\\mathbb{R}} \\|\\hat{f}(\\ell, \\omega)\\|_{HS}^2 \\, d\\omega"}
              </Math>
            </div>

            <p className="text-black mb-4">Here ‖·‖<sub>HS</sub> is the Hilbert–Schmidt norm of a matrix.</p>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> Inversion says: nothing is lost. You can reconstruct the exact function from its spectral data.
            </p>

            <p className="text-black mb-4">
              Plancherel says: the energy of the function in physical space equals the energy of its coefficients in spectral space.
            </p>

            <p className="text-black mb-6">
              Together, these are the fundamental theorem of Fourier calculus for QSG. They justify using the spectral side as the natural language of analysis, just as Fourier analysis does for ordinary calculus.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">3.6 Convolution Algebra</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Definition 3.4 (Convolution on <em>M</em>).</p>
            <p className="text-black mb-4">For <em>f</em>, <em>g</em> ∈ <em>L</em>¹(<em>M</em>), define</p>

            <div className="text-center my-6 text-lg">
              <Math block={true}>
                {"(f * g)(x, u) = \\int_{SU(2)} \\int_{\\mathbb{R}} f(y, v) \\, g(y^{-1}x, u - v) \\, d\\mu_{SU(2)}(y) \\, dv"}
              </Math>
            </div>

            <p className="text-black mb-4">In the spectral domain,</p>

            <div className="text-center my-6 text-xl italic">
              <em>f̂ * g</em>(l, ω) = <em>f̂</em>(l, ω) · <em>ĝ</em>(l, ω).
            </div>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> Convolution means "smear one function against another." On ℝ, this corresponds to filtering signals. On groups, it generalizes to combining patterns by alignment.
            </p>

            <p className="text-black mb-4">
              The key property is that convolution in the physical domain corresponds to multiplication in the spectral domain. This is what makes transforms so powerful.
            </p>

            <p className="text-black mb-6">
              So in QSG, we can process functions by designing spectral filters (multipliers) and then pulling them back. This is exactly what Fourier analysis does for PDEs and signals, but generalized to quaternionic geometry.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">Exercises</h2>

          <div className="space-y-8">
            <div>
              <p className="font-semibold text-black mb-3 text-lg">1. Fourier analogy.</p>
              <p className="text-black mb-4">
                Show that if <em>M</em> = <em>S</em><sup>1</sup> × ℝ, the Peter-Weyl-R transform reduces to the classical Fourier series (in the <em>S</em><sup>1</sup> direction) combined with Fourier transform (in the ℝ direction).
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">2. Energy conservation.</p>
              <p className="text-black mb-4">
                Prove the Plancherel identity in the simple case where <em>f</em>(<em>x</em>, <em>u</em>) = <em>h</em>(<em>u</em>) depends only on <em>u</em>.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">3. Matrix coefficients.</p>
              <p className="text-black mb-4">
                Compute the l = 1/2 Peter-Weyl coefficients explicitly for a constant function <em>f</em>(<em>x</em>, <em>u</em>) ≡ 1.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-600 text-center">
              This completes <strong>Chapter 3</strong> on harmonic analysis and transforms, providing the spectral foundation for QSG analysis.
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
              Chapter 3 of "Quaternionic Spectral Geometry: A Calculus for the 21st Century"
            </p>
          </div>

          {/* Bottom navigation */}
          <div className="mt-12 pt-8 border-t border-gray-300 text-center">
            <Link href="/quaternionic-spectral-geometry-book" className="text-blue-600 text-sm md:text-base hover:underline text-lg">
              ← Back to Textbook Index
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}