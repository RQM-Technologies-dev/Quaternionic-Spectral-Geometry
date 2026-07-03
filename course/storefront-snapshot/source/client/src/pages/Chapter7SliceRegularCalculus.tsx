import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Math from "@/components/Math";

export default function Chapter7SliceRegularCalculus() {
  useEffect(() => {
    document.title = "Chapter 7: Slice-Regular Calculus - QSG Textbook";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8" data-testid="link-back-to-book">
          <ArrowLeft className="w-4 h-4" />
          Back to Table of Contents
        </Link>

        {/* Chapter Content */}
        <div className="prose max-w-none text-lg leading-relaxed">

          <h1 className="text-4xl font-bold text-black mb-8 border-b border-gray-300 pb-4">
            Chapter 7 · Slice-Regular Calculus
          </h1>

          <p className="text-black mb-6">
            This chapter marks the beginning of <strong>Part IV: Quaternionic Analysis</strong> — where we develop the quaternionic analogue of complex analysis systematically, with the quaternionic factorial operator ◎ as the centerpiece. We consolidate slice-regularity into a self-contained calculus the way complex analysis texts do with holomorphic functions, Cauchy's theorem, and special functions.
          </p>

          <p className="text-black mb-6">
            <strong>The goal:</strong> By the end of this chapter, you'll have a complete toolkit for doing quaternionic analysis that parallels the power and elegance of complex analysis. You'll be able to expand functions in power series, apply Cauchy's integral formula, and work with the fundamental special functions of QSG.
          </p>

          <p className="text-black mb-8">
            <strong>What makes this possible:</strong> The key insight is that while full quaternionic analysis is complicated by noncommutativity, we can recover most of the power of complex analysis by working on carefully chosen 2-dimensional slices through quaternion space. This "slice-regular" approach gives us the best of both worlds: the computational power of complex analysis and the geometric richness of quaternions.
          </p>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">7.1 Slice-Regular Function Theory</h2>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 7.1 (Slice-regular functions).</p>
            <p className="text-black mb-4">
              Fix a unit imaginary quaternion <Math>{"\\mathbf{I} \\in S^2"}</Math> with <Math>{"\\mathbf{I}^2 = -1"}</Math>. A function <Math>{"f: C_{\\mathbf{I}} \\to C_{\\mathbf{I}}"}</Math>, written in coordinates as
            </p>

            <div className="text-center my-6 text-lg bg-gray-50 p-4 rounded">
              <Math block={true}>
                {"f(\\alpha + \\tau\\mathbf{I}) = A(\\alpha, \\tau) + \\mathbf{I} B(\\alpha, \\tau), \\quad A, B: \\mathbb{R}^2 \\to \\mathbb{R}"}
              </Math>
            </div>

            <p className="text-black mb-4">is <strong>slice-regular</strong> if</p>

            <div className="text-center my-6 text-xl bg-blue-100 border-2 border-blue-400 p-4 rounded">
              <Math block={true}>
                {"\\overline{\\partial}_{\\mathbf{I}} f := \\frac{\\partial f}{\\partial \\alpha} + \\mathbf{I} \\frac{\\partial f}{\\partial \\tau} = 0"}
              </Math>
            </div>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> This condition is the <strong>Cauchy–Riemann equation on the slice</strong>: it says the two real functions <em>A</em>, <em>B</em> are coupled so that <em>f</em> behaves like a holomorphic function of α + <em>i</em>τ.
            </p>

            <p className="text-black mb-4">
              Equivalently: <em>f</em> comes from lifting some holomorphic complex function <Math>{"F(z)"}</Math> with <Math>{"z = \\alpha + i\\tau"}</Math>.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h4 className="font-semibold text-yellow-800 mb-2">Why this matters:</h4>
              <p className="text-yellow-700 mb-3">
                Holomorphic functions in complex analysis are "magic": they obey maximum principles, power series expansions, contour integrals, and beautiful identities. Slice-regular functions inherit much of this magic. This is the quaternionic way of keeping complex analysis alive <strong>without breaking under noncommutativity</strong>.
              </p>
              <p className="text-yellow-700">
                <strong>Historical context:</strong> Many attempts to extend complex analysis to quaternions have failed because they tried to impose commutativity where none exists. Slice-regularity succeeds because it respects the quaternionic structure while preserving analytic power on carefully chosen subspaces.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Theorem 7.1 (Series expansion).</p>
            <p className="text-black mb-4">If <em>f</em> is slice-regular on a neighborhood of <em>q</em><sub>{'0'}</sub> ∈ <em>C</em><sub>{'𝐈'}</sub>, then</p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              <em>f</em>(<em>q</em>) = Σ<sub>{'n=0'}</sub><sup>{'∞'}</sup> <em>a</em><sub>{'n'}</sub> (<em>q</em> - <em>q</em><sub>{'0'}</sub>)<sup>{'n'}</sup>, &nbsp;&nbsp; <em>a</em><sub>{'n'}</sub> ∈ <em>C</em><sub>{'𝐈'}</sub>,
            </div>

            <p className="text-black mb-4">
              with convergence radius identical to the complex radius of convergence of its generating holomorphic <em>F</em>.
            </p>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> This is the analogue of a Taylor series. On the slice, powers of (<em>q</em> - <em>q</em><sub>{'0'}</sub>) behave exactly like complex powers, so all the familiar "local expansion" properties of holomorphic functions carry over.
            </p>

            <p className="text-black mb-4">
              This means: in QSG, you can expand special functions (like Γ, ζ, ξ) in power series <strong>on any slice</strong> — and then carry them into the spectral domain of <em>M</em>.
            </p>

            <p className="text-black mb-6">
              <strong>Computational advantage:</strong> Because the convergence properties are inherited from the complex case, you can predict exactly where series converge without having to re-derive convergence theorems from scratch. This makes quaternionic analysis as practical as complex analysis for actual calculations.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">7.2 Proofs of Cauchy–Fueter Analogues</h2>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Theorem 7.2 (Slice Cauchy Integral Formula).</p>
            <p className="text-black mb-4">
              Let γ ⊂ <em>C</em><sub>{'𝐈'}</sub> be a positively oriented closed contour enclosing a point <em>q</em><sub>{'0'}</sub>. If <em>f</em> is slice-regular on and inside γ, then
            </p>

            <div className="text-center my-6 text-xl bg-blue-100 border-2 border-blue-400 p-4 rounded">
              <Math block={true}>
                {"f(q_0) = \\frac{1}{2\\pi\\mathbf{I}} \\int_{\\gamma} \\frac{f(q)}{q - q_0} \\, dq"}
              </Math>
            </div>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> This is the <strong>quaternionic Cauchy formula</strong> on a slice: values of a function inside are determined by its boundary values. This is perhaps the most important theorem in complex analysis, and remarkably, it carries over to slice-regular functions with almost no modification.
            </p>

            <ul className="space-y-3 text-black ml-6 mb-4">
              <li>• The 2π<strong>𝐈</strong> in the denominator is the quaternionic analogue of 2π<em>i</em>.</li>
              <li>• This formula proves that slice-regular functions are rigid, just like holomorphic ones: knowing them on a contour tells you everything inside.</li>
              <li>• The geometric interpretation is identical to the complex case: the function at any interior point is a weighted average of its boundary values.</li>
            </ul>

            <p className="text-black mb-6">
              <strong>Why this is profound:</strong> The Cauchy integral formula is the foundation stone of complex analysis. It leads to power series, residue calculus, and analytic continuation. Having this formula intact on quaternionic slices means we can build the entire edifice of complex analysis in the quaternionic setting.
            </p>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <h4 className="font-semibold text-green-800 mb-2">Comparison with full quaternionic analysis:</h4>
              <p className="text-green-700 mb-3">
                In full quaternionic analysis (with the Cauchy–Fueter operator), the Cauchy formula is much more complicated because of noncommutativity. You have to deal with left vs. right multiplication, and the formula involves more complex geometric considerations.
              </p>
              <p className="text-green-700">
                But on slices, it looks almost identical to the complex case. This is why slices are the natural "entry point" into quaternionic function theory — they give you maximum analytical power with minimum additional complexity.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">7.3 Worked Examples: ◎, Γ, ζ on the Slice</h2>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Example 7.1 (Computing ◎).</p>
            <p className="text-black mb-4">Recall</p>

            <div className="text-center my-6 text-lg italic bg-gray-50 p-4 rounded">
              <Math block={true}>
                {"\\circleddash(q) = ∫_0^\\infty e^{-x} e^{q \\log x} \\, dx, \\quad q \\in C_{\\mathbf{I}}, \\, \\Re(q) > -1"}
              </Math>
            </div>

            <p className="text-black mb-4">For <em>q</em> = ½:</p>

            <div className="text-center my-6 text-xl italic bg-blue-50 p-4 rounded border-2 border-blue-300">
              ◎(½) = Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(3/2) = Γ(3/2) = √π/2.
            </div>

            <p className="text-black mb-4">
              <strong>Explanation.</strong> Here we see ◎ matches the Gamma function, just shifted by 1, exactly as intended. The evaluation at 1/2 is neat: it lands on a square root of π, the same constant that organizes Gaussian integrals and probability distributions.
            </p>

            <p className="text-black mb-4">
              This ties ◎ directly to the "hidden harmony" of π. The appearance of π is not accidental — it reflects deep connections between geometry (circumference of a circle), analysis (Gaussian integrals), and number theory (via the Gamma function's relationship to factorials).
            </p>

            <p className="text-black mb-6">
              <strong>Computational note:</strong> This evaluation gives you a concrete way to check whether your quaternionic implementations are working correctly. If ◎(½) doesn't equal √π/2, something is wrong in your quaternionic Gamma function.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Example 7.1a (Closed form on the critical slice).</p>
            <p className="text-black mb-4">
              On the slice <Math>{"q = \\frac{1}{2} + u\\mathbf{I}"}</Math> with fixed unit imaginary quaternion <Math>{"\\mathbf{I}"}</Math>,
            </p>

            <Link href="/closed-form-critical-slice" className="block">
              <div className="text-center my-6 text-xl bg-blue-100 border-2 border-blue-400 p-4 rounded hover:bg-blue-200 hover:border-blue-500 transition-colors cursor-pointer">
                <Math block={true}>
                  {"\\circleddash\\!\\big(\\frac{1}{2}+u\\mathbf{I}\\big) \\;=\\; \\Re\\!\\big(\\Gamma(\\frac{3}{2}+iu)\\big)\\;+\\;\\mathbf{I}\\,\\Im\\!\\big(\\Gamma(\\frac{3}{2}+iu)\\big)"}
                </Math>
              </div>
              <div className="text-center text-sm text-blue-600 mt-2 font-medium">
                Click to explore interactive 3D visualization →
              </div>
            </Link>

            <p className="text-black mb-4">
              <strong>Explanation.</strong> This identity shows that ◎ is not merely related to Γ at isolated points, but is in fact a slice-lifted version of the Gamma function itself. The real part encodes the "breathing frequency" of the slice, while the imaginary part encodes its potential trajectory. Together, they form a quaternionic embedding of Γ that respects slice-regularity.
            </p>

            <p className="text-black mb-4">
              <strong>Interpretation.</strong> This makes ◎ the natural quaternionic analogue of Γ: its values along the <Link href="/eigen-circle" className="text-blue-600 hover:text-blue-800 underline">critical slice <Math>{"\\Re(q)=\\frac{1}{2}"}</Math></Link> align directly with the complex Γ function, but rotated into quaternionic coordinates. Later chapters will show how this closed form underpins resonance structures tied to the Riemann zeta function and the <Link href="/eigen-circle" className="text-blue-600 hover:text-blue-800 underline">critical line</Link>.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <h4 className="font-semibold text-purple-800 mb-2">Bridge Theorem:</h4>
              <p className="text-purple-700">
                This identity is more than just another worked example — it's a <strong>structural bridge</strong> that ties ◎ to Γ explicitly in quaternionic coordinates. It elevates the single-point check in Example 7.1 to a complete slice-level equivalence, proving that quaternionic analysis preserves the deep mathematical relationships of complex analysis while extending them into higher dimensions.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Example 7.2 (Γ reflection identity).</p>
            <p className="text-black mb-4">On the slice <em>C</em><sub>{'𝐈'}</sub>,</p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>) Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(1 - <em>q</em>) = π/sin(π<em>q</em>), &nbsp;&nbsp; <em>q</em> ∈ <em>C</em><sub>{'𝐈'}</sub>.
            </div>

            <p className="text-black mb-4">
              <strong>Explanation.</strong> This is the classic reflection formula of Euler and Legendre, now valid quaternionically slice-by-slice. It says the Gamma function, though it has poles at negative integers, has a deep symmetry around the line ℜ(<em>q</em>) = 1/2.
            </p>

            <p className="text-black mb-6">
              The reflection formula is one of the most beautiful identities in mathematics — it relates the values of Γ at <em>q</em> and 1-<em>q</em>, showing that the function has a hidden symmetry around the critical line ℜ(<em>q</em>) = 1/2 despite its apparent complexity. This symmetry becomes even more explicit through the quaternionic structure in QSG.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Example 7.3 (ζ via Dirichlet series on the slice).</p>
            <p className="text-black mb-4">On ℜ(<em>q</em>) &gt; 1:</p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              ζ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>) = Σ<sub>{'n=1'}</sub><sup>{'∞'}</sup> 1/<em>n</em><sup>{'q'}</sup> = Σ<sub>{'n=1'}</sub><sup>{'∞'}</sup> <em>e</em><sup>{'-q log n'}</sup>, &nbsp;&nbsp; <em>q</em> ∈ <em>C</em><sub>{'𝐈'}</sub>.
            </div>

            <p className="text-black mb-4">
              <strong>Explanation.</strong> This is the Riemann zeta function, written slice-wise as an exponential series. Each term is a pure quaternionic exponential <em>e</em><sup>{'-q log n'}</sup>. This way of writing ζ emphasizes that primes (hidden in the Dirichlet product form) are really <strong>frequencies</strong> in disguise — resonances along the slice.
            </p>

            <p className="text-black mb-4">
              <strong>Physical interpretation:</strong> Think of each integer <em>n</em> as contributing a "note" to the zeta function's "chord," with frequency proportional to log <em>n</em>. Prime numbers contribute the fundamental frequencies, while composite numbers contribute harmonics. The convergence condition ℜ(<em>q</em>) &gt; 1 ensures this infinite series of frequencies doesn't blow up.
            </p>

            <p className="text-black mb-6">
              <strong>Quaternionic advantage:</strong> By working on slices, we can apply all the classical theory of Dirichlet series while gaining access to the richer geometric structure of quaternions. This sets the stage for new insights into the distribution of primes and the nature of the Riemann zeros.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">Exercises</h2>

          <div className="space-y-8">
            <div>
              <p className="font-semibold text-black mb-3 text-lg">1. Slice Cauchy-Riemann verification.</p>
              <p className="text-black mb-4">
                For <em>f</em>(α + τ<strong>𝐈</strong>) = (α² - τ²) + <strong>𝐈</strong>(2ατ), verify that ∂̄<sub>{'𝐈'}</sub> <em>f</em> = 0 and identify the corresponding complex holomorphic function.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">2. Power series convergence.</p>
              <p className="text-black mb-4">
                Show that if <em>F</em>(<em>z</em>) = Σ<sub>{'n=0'}</sub><sup>{'∞'}</sup> <em>a</em><sub>{'n'}</sub> <em>z</em><sup>{'n'}</sup> has radius of convergence <em>R</em>, then its slice lift <em>f</em>(<em>q</em>) = Σ<sub>{'n=0'}</sub><sup>{'∞'}</sup> <em>a</em><sub>{'n'}</sub> <em>q</em><sup>{'n'}</sup> also has radius <em>R</em> on <em>C</em><sub>{'𝐈'}</sub>.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">3. Contour integral computation.</p>
              <p className="text-black mb-4">
                Using the slice Cauchy formula, compute <Math>{"∫_{|q|=2} \\frac{\\circleddash(q)}{q - 1} \\, dq"}</Math> on the slice <em>C</em><sub>{'𝐈'}</sub>.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">4. Reflection formula verification.</p>
              <p className="text-black mb-4">
                Use the integral representation of Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub> to verify the reflection formula Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>) Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(1 - <em>q</em>) = π/sin(π<em>q</em>) for a specific value <em>q</em> = ¼ + ¼<strong>𝐈</strong>.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-600 text-center">
              This completes <strong>Chapter 7</strong> on slice-regular calculus, establishing the quaternionic analogue of complex analysis.
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
              Chapter 7 of "Quaternionic Spectral Geometry: A Calculus for the 21st Century"
            </p>
          </div>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-6 border-t-2 border-blue-200">
          <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-back-to-book-bottom">
            <ArrowLeft className="w-4 h-4" />
            Back to Table of Contents
          </Link>
        </div>
      </div>
    </div>
  );
}