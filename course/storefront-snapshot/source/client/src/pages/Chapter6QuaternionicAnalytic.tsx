import { useEffect } from "react";
import { Link } from "wouter";
import Math from "@/components/Math";

export default function Chapter6QuaternionicAnalytic() {
  useEffect(() => {
    document.title = "Chapter 6: Quaternionic-Specific Analytic Structures - QSG Textbook";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/quaternionic-spectral-geometry-book" className="text-blue-600 hover:underline text-sm">
            ← Back to Textbook Index
          </Link>
        </div>

        {/* Chapter Content */}
        <div className="prose max-w-none text-lg leading-relaxed">

          <h1 className="text-4xl font-bold text-black mb-8 border-b border-gray-300 pb-4">
            Chapter 6 · Quaternionic-Specific Analytic Structures
          </h1>

          <p className="text-black mb-6">
            The previous chapters gave you a complete 20th-century calculus on <em>M</em> = <em>SU</em>(2) × ℝ: derivatives, transforms, spectra, kernels. Now we take the next step into genuinely <strong>quaternionic analysis</strong> — a calculus that goes beyond what was possible in the 20th century.
          </p>

          <p className="text-black mb-6">
            The quaternionic layer adds an <strong>analytic</strong> calculus comparable to complex analysis, but adapted to quaternions in a way that plays well with the <em>SU</em>(2) × ℝ geometry and your global slice <em>C</em><sub>{'𝐈'}</sub>. This chapter introduces the fundamental analytic structures that make quaternionic function theory possible while preserving the essential features of complex analysis that mathematicians and physicists have relied upon for centuries.
          </p>

          <p className="text-black mb-8">
            <strong>What you'll learn in this chapter:</strong> How to extend the power of complex analysis to quaternions through slice-regular functions, how the Cauchy–Fueter and Dirac operators provide geometric control, and how special functions like Γ and ζ can be imported faithfully into the quaternionic setting. By the end, you'll see how quaternionic analysis provides the "missing piece" that makes QSG a complete next-generation calculus.
          </p>

          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-400">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Throughout this chapter:</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• ℍ is the algebra of quaternions.</li>
              <li>• Im ℍ is the 3-D subspace of purely imaginary quaternions.</li>
              <li>• <strong>𝐈</strong> ∈ <em>S</em>² ⊂ Im ℍ is a fixed <strong>unit imaginary quaternion</strong> with <strong>𝐈</strong>² = -1.</li>
              <li>• <em>C</em><sub>{'𝐈'}</sub> := {"{a + b𝐈 : a, b ∈ ℝ}"} ≅ ℂ is the <strong>global slice</strong> (a copy of the complex plane inside ℍ).</li>
              <li>• Coordinates on the slice are (α, τ) ∈ ℝ² with <em>q</em> = α + τ<strong>𝐈</strong> ∈ <em>C</em><sub>{'𝐈'}</sub>.</li>
              <li>• The <strong>scale/log-frequency axis</strong> <em>u</em> ∈ ℝ of <em>M</em> is <strong>separate</strong> from the slice coordinates (α, τ).</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">6.1 Slice-Regular Calculus on <em>C</em><sub>{'𝐈'}</sub></h2>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 6.1 (Slice restriction and the complex–to–slice lift).</p>
            <p className="text-black mb-4">
              Let <Math>{"F: \\Omega \\subset \\mathbb{C} \\to \\mathbb{C}"}</Math> be a complex holomorphic function, with complex variable written <Math>{"z = \\alpha + i\\tau"}</Math> (<Math>{"\\alpha, \\tau \\in \\mathbb{R}"}</Math>). Define the <strong>slice lift</strong>
            </p>

            <div className="text-center my-6 text-lg bg-gray-50 p-4 rounded">
              <Math block={true}>
                {"\\mathcal{J}_{\\mathbf{I}}[F]: \\Omega_{\\mathbf{I}} \\subset C_{\\mathbf{I}} \\to C_{\\mathbf{I}}"}
              </Math>
              <Math block={true}>
                {"\\mathcal{J}_{\\mathbf{I}}[F](\\alpha + \\tau\\mathbf{I}) := \\text{Re}\\, F(\\alpha + i\\tau) + \\mathbf{I} \\, \\text{Im}\\, F(\\alpha + i\\tau)"}
              </Math>
            </div>

            <p className="text-black mb-4">Here <Math>{"\\Omega_{\\mathbf{I}} := \\{\\alpha + \\tau\\mathbf{I} : \\alpha + i\\tau \\in \\Omega\\}"}</Math>.</p>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> Think of this as a "translation device" between complex and quaternionic analysis. 𝒥<sub>{'𝐈'}</sub> takes an ordinary complex function <em>F</em> and <strong>re-draws it</strong> on your chosen slice <em>C</em><sub>{'𝐈'}</sub> by replacing the complex unit <em>i</em> with the quaternionic unit <strong>𝐈</strong>. If <em>F</em> = <em>a</em> + <em>ib</em>, its value on the slice becomes <em>a</em> + <strong>𝐈</strong><em>b</em>.
            </p>

            <p className="text-black mb-4">
              This process is the safest way to import complex special functions (like Γ, ζ, ξ) into the quaternionic world <strong>without breaking their analytic identities</strong> on that slice. It preserves all the beautiful theorems of complex analysis — power series expansions, Cauchy's integral formula, residue calculus — while extending them to the richer quaternionic setting.
            </p>

            <p className="text-black mb-6">
              <strong>Why this matters:</strong> Complex analysis is one of the most successful mathematical theories ever developed, with applications ranging from quantum mechanics to signal processing. The slice lift gives us a way to bring this entire toolkit into quaternionic geometry without losing any of its power.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 6.2 (Slice-regular functions on <em>C</em><sub>{'𝐈'}</sub>).</p>
            <p className="text-black mb-4">
              A function <Math>{"f: C_{\\mathbf{I}} \\to C_{\\mathbf{I}}"}</Math> is <strong>slice-regular</strong> (on <Math>{"C_{\\mathbf{I}}"}</Math>) if there exists a holomorphic <Math>{"F"}</Math> with <Math>{"f = \\mathcal{J}_{\\mathbf{I}}[F]"}</Math> on the corresponding domain. The <strong>slice Cauchy–Riemann operator</strong> is
            </p>

            <div className="text-center my-6 text-xl bg-gray-50 p-4 rounded">
              <Math block={true}>
                {"\\overline{\\partial}_{\\mathbf{I}} := \\frac{\\partial}{\\partial \\alpha} + \\mathbf{I} \\frac{\\partial}{\\partial \\tau}"}
              </Math>
            </div>

            <p className="text-black mb-4">and slice-regularity is equivalent to ∂̄<sub>{'𝐈'}</sub> <em>f</em> = 0.</p>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> This is the quaternionic analogue of "holomorphic" — the gold standard of complex analysis. On each slice <em>C</em><sub>{'𝐈'}</sub> you <strong>inherit</strong> complex analyticity, with <strong>𝐈</strong> playing the role of <em>i</em>.
            </p>

            <p className="text-black mb-4">
              The operator ∂̄<sub>{'𝐈'}</sub> is the "anti-holomorphic" derivative along the slice; setting it to zero enforces the Cauchy–Riemann condition. This is the same condition that makes complex functions "smooth" in the sense that they can be expanded in power series, integrated along contours, and continued analytically.
            </p>

            <p className="text-black mb-4">
              The remarkable fact is that power series, product rules, and contour formulas familiar from complex analysis now hold <strong>on the slice</strong>. This means you can do calculus on quaternions that looks almost identical to complex calculus, but with the added richness of quaternionic geometry.
            </p>

            <p className="text-black mb-4">
              <strong>Historical note:</strong> Mathematicians have long sought to extend complex analysis to higher dimensions. Slice-regular functions provide one of the most successful approaches, preserving the key analytic properties while respecting the noncommutative nature of quaternions.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h4 className="font-semibold text-yellow-800 mb-2">Key facts on the slice:</h4>
              <ul className="space-y-1 text-yellow-700">
                <li><strong>Power series:</strong> If <em>F</em>(<em>z</em>) = Σ<sub>{'n≥0'}</sub> <em>a</em><sub>{'n'}</sub> (<em>z</em> - <em>z</em><sub>{'0'}</sub>)<sup>{'n'}</sup>, then <em>f</em>(<em>q</em>) = Σ<sub>{'n≥0'}</sub> <em>a</em><sub>{'n'}</sub> (<em>q</em> - <em>q</em><sub>{'0'}</sub>)<sup>{'n'}</sup></li>
                <li><strong>Product/chain rules:</strong> Standard complex rules transfer verbatim to the slice lift</li>
                <li><strong>Zeros and symmetry:</strong> Zeros in ℂ map to zeros on <em>C</em><sub>{'𝐈'}</sub> with the same multiplicities</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 6.3 (Slice derivative).</p>
            <p className="text-black mb-4">For <em>f</em> = 𝒥<sub>{'𝐈'}</sub>[<em>F</em>], define the <strong>slice derivative</strong></p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              ∂<sub>{'𝐈'}</sub> <em>f</em> := ∂<em>f</em>/∂α - <strong>𝐈</strong> ∂<em>f</em>/∂τ &nbsp;&nbsp; (lifting <em>F</em>'(<em>z</em>)).
            </div>

            <p className="text-black mb-4">Then ∂<sub>{'𝐈'}</sub> <em>f</em> = 𝒥<sub>{'𝐈'}</sub>[<em>F</em>'].</p>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> This is the "holomorphic derivative" along the slice. It behaves exactly like <em>F</em>' in complex analysis; rates of change, Taylor series, and analytic continuation all look <strong>identical</strong> on <em>C</em><sub>{'𝐈'}</sub>.
            </p>

            <p className="text-black mb-6">
              Just as the derivative of a complex function encodes how the function changes in the complex plane, ∂<sub>{'𝐈'}</sub> encodes how a slice-regular function changes along the quaternionic slice. The beauty is that all the computational rules you know from complex calculus — chain rule, product rule, quotient rule — work without modification on the slice.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">6.2 Cauchy–Fueter vs. Dirac on <em>M</em></h2>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 6.4 (Cauchy–Fueter operator on ℍ).</p>
            <p className="text-black mb-4">
              In full quaternionic variables <em>q</em> = <em>a</em> + <em>b</em><strong>i</strong> + <em>c</em><strong>j</strong> + <em>d</em><strong>k</strong>, the classical <strong>Cauchy–Fueter operator</strong> is
            </p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              𝒞ℱ := ∂/∂<em>a</em> + <strong>i</strong> ∂/∂<em>b</em> + <strong>j</strong> ∂/∂<em>c</em> + <strong>k</strong> ∂/∂<em>d</em>.
            </div>

            <p className="text-black mb-4">A function <em>F</em>: ℍ → ℍ is <strong>(left) monogenic</strong> if 𝒞ℱ <em>F</em> = 0.</p>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> Monogenicity is the quaternionic analogue of holomorphy <strong>in all four real directions at once</strong>. While slice-regularity gives you complex-like behavior on individual 2D slices, monogenicity enforces this behavior simultaneously across all quaternionic directions.
            </p>

            <p className="text-black mb-4">
              This is much more restrictive than slice-regularity (which only enforces holomorphy inside a single 2-D slice). Monogenic functions satisfy a first-order PDE that couples all quaternionic directions and underpins quaternionic potential theory.
            </p>

            <p className="text-black mb-6">
              <strong>Geometric intuition:</strong> Think of slice-regular functions as "holomorphic along lines" through quaternion space, while monogenic functions are "holomorphic in all directions simultaneously." The latter is much more rigid, which makes monogenic functions harder to construct but more powerful when they exist.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 6.5 (Geometric Dirac operator on <em>M</em>).</p>
            <p className="text-black mb-4">Recall the first-order operator from §2.6:</p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              𝒟 := σ<sub>{'1'}</sub> <em>X</em><sub>{'1'}</sub> + σ<sub>{'2'}</sub> <em>X</em><sub>{'2'}</sub> + σ<sub>{'3'}</sub> <em>X</em><sub>{'3'}</sub> + σ<sub>{'4'}</sub> ∂<sub>{'u'}</sub>,
            </div>

            <p className="text-black mb-4">
              where {"{X"}<sub>{'i'}</sub>{"}"} are left-invariant derivatives on <em>SU</em>(2), ∂<sub>{'u'}</sub> is the derivative along <em>u</em> ∈ ℝ, σ<sub>{'1,2,3'}</sub> are Pauli matrices, and σ<sub>{'4'}</sub> = <em>I</em> is the 2×2 identity matrix. It satisfies 𝒟² = -Δ<sub>{'M'}</sub> + ℛ (a curvature correction).
            </p>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> 𝒟 is the <strong>geometry-aware</strong> first-order operator that "square-roots" the Laplacian on <em>M</em>. In physics, Dirac operators describe fundamental particles like electrons; here, 𝒟 plays the analogous role for the curved–flat manifold <em>SU</em>(2) × ℝ.
            </p>

            <p className="text-black mb-4">
              In QSG we use <strong>both</strong> analytic approaches strategically:
            </p>

            <ul className="space-y-3 text-black ml-6 mb-6">
              <li>• <strong>Slice-regularity</strong> to import complex-analytic special functions on <em>C</em><sub>{'𝐈'}</sub> with all their classical identities intact.</li>
              <li>• <strong>Dirac/Cauchy–Fueter</strong> structure to maintain first-order geometric control across the full manifold <em>M</em>.</li>
            </ul>

            <p className="text-black mb-4">
              These approaches are complementary rather than competing: slice methods give you holomorphic-like calculus where it's strongest (on individual slices), while Dirac/Cauchy–Fueter gives you first-order geometric control across the entire space <em>M</em>.
            </p>

            <p className="text-black mb-6">
              <strong>The key insight:</strong> Rather than trying to force one approach to do everything, QSG uses the right tool for each job. This flexibility is what makes quaternionic analysis both powerful and practical.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">6.3 Special-Function Calculus on the Slice</h2>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 6.6 (Complex special function lifted to <em>C</em><sub>{'𝐈'}</sub>).</p>
            <p className="text-black mb-4">
              If <em>F</em>: Ω ⊂ ℂ → ℂ is holomorphic, its <strong>quaternionic slice lift</strong> is <em>f</em> = 𝒥<sub>{'𝐈'}</sub>[<em>F</em>]: Ω<sub>{'𝐈'}</sub> → <em>C</em><sub>{'𝐈'}</sub>. We write
            </p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              <em>F</em><sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>) := 𝒥<sub>{'𝐈'}</sub>[<em>F</em>](<em>q</em>), &nbsp;&nbsp; <em>q</em> ∈ Ω<sub>{'𝐈'}</sub>.
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
              <ul className="space-y-1 text-green-700">
                <li>• Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>) = 𝒥<sub>{'𝐈'}</sub>[Γ](<em>q</em>).</li>
                <li>• ζ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>) = 𝒥<sub>{'𝐈'}</sub>[ζ](<em>q</em>) (on a domain where ζ is defined/continued).</li>
                <li>• ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>) = 𝒥<sub>{'𝐈'}</sub>[ξ](<em>q</em>) for the Riemann ξ-function.</li>
              </ul>
            </div>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> This gives a <strong>clean, lossless doorway</strong> for complex identities into QSG: reflection formulas, product expansions, and log-derivatives carry across the slice, preserving theorems like ξ(<em>s</em>) = ξ(1 - <em>s</em>) as symmetries <em>q</em> ↦ 1 - <em>q</em> on <em>C</em><sub>{'𝐈'}</sub>.
            </p>

            <p className="text-black mb-4">
              <strong>Why this is revolutionary:</strong> For over a century, mathematicians have struggled to extend complex analysis to higher dimensions while preserving its most powerful properties. The slice lift solves this problem by giving us a systematic way to import the entire arsenal of complex special functions into quaternionic analysis.
            </p>

            <p className="text-black mb-6">
              <strong>Practical impact:</strong> Every formula involving Γ, ζ, or ξ that you know from complex analysis — reflection formulas, functional equations, asymptotic expansions — now becomes available in QSG. This means decades of accumulated knowledge about special functions can be directly applied to quaternionic problems.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 6.7 (Quaternionic factorial operator ◎ on the slice).</p>
            <p className="text-black mb-4">Define, for <em>q</em> ∈ <em>C</em><sub>{'𝐈'}</sub> with Re <em>q</em> &gt; -1,</p>

            <div className="text-center my-6 text-lg bg-blue-100 border-2 border-blue-400 p-6 rounded">
              <Math block={true}>
                {"\\boxed{\\circleddash(q) := \\int_0^{\\infty} e^{-x} e^{q \\log x} \\, dx = \\mathcal{J}_{\\mathbf{I}}[\\Gamma(\\cdot + 1)](q)}"}
              </Math>
            </div>

            <p className="text-black mb-4">i.e., ◎(<em>q</em>) = Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em> + 1).</p>

            <p className="text-black mb-4">
              Equivalently, writing <em>q</em> = α + τ<strong>𝐈</strong> with α, τ ∈ ℝ,
            </p>

            <div className="text-center my-6 text-lg italic bg-gray-50 p-4 rounded">
              ◎(<em>q</em>) = Re Γ(α + 1 + <em>i</em>τ) + <strong>𝐈</strong> Im Γ(α + 1 + <em>i</em>τ).
            </div>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> ◎ is your quaternionic analogue of the factorial, designed to live on the slice and <strong>track the complex Γ</strong> faithfully while staying in <em>C</em><sub>{'𝐈'}</sub>. The integral form is the usual Γ-integral with <em>x</em><sup>{'q'}</sup> = <em>e</em><sup>{'q log x'}</sup>.
            </p>

            <p className="text-black mb-4">
              The clean identity ◎(<em>q</em>) = Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em> + 1) makes all standard Γ identities available, shifted by +1.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <h4 className="font-semibold text-purple-800 mb-2">Immediate properties (slice-level):</h4>
              <ul className="space-y-1 text-purple-700">
                <li><strong>Shift rule:</strong> ◎(<em>q</em> + 1) = (<em>q</em> + 1) ◎(<em>q</em>)</li>
                <li><strong>Value at q = ½:</strong> ◎(½) = Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(3/2) = Γ(3/2) = √π/2 ∈ ℝ ⊂ <em>C</em><sub>{'𝐈'}</sub></li>
                <li><strong>Gaussian moment:</strong> for real α &gt; -1, ◎(α) = Γ(α + 1) recovers standard real moments</li>
              </ul>
            </div>

            <p className="text-black mb-6">
              <strong>Connection to Γ(½)² = π.</strong> On the slice, Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(½) = Γ(½) = √π (real). Thus Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(½)² = π, exactly as in complex analysis. This identity is often the simplest "resonance" between Γ and π; ◎ inherits it through the shift.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">6.4 ξ-Operations on the Slice and Symmetry</h2>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 6.8 (Completed ξ on the slice).</p>
            <p className="text-black mb-4">Let</p>

            <div className="text-center my-6 text-lg italic bg-gray-50 p-4 rounded">
              ξ(<em>s</em>) = ½ <em>s</em>(<em>s</em> - 1) π<sup>{'-s/2'}</sup> Γ(<em>s</em>/2) ζ(<em>s</em>),
            </div>

            <p className="text-black mb-4">the completed Riemann ξ-function, entire and satisfying ξ(<em>s</em>) = ξ(1 - <em>s</em>). Define its slice lift</p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>) := 𝒥<sub>{'𝐈'}</sub>[ξ](<em>q</em>), &nbsp;&nbsp; <em>q</em> = α + τ<strong>𝐈</strong>.
            </div>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub> brings the full power of the ξ-symmetry into QSG. On the critical slice α = ½, the reflection <em>s</em> ↦ 1 - <em>s</em> becomes τ ↦ -τ, so
            </p>

            <div className="text-center my-6 text-lg italic bg-blue-50 p-4 rounded">
              ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(½ + τ<strong>𝐈</strong>) = ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(½ - τ<strong>𝐈</strong>),
            </div>

            <p className="text-black mb-6">
              an <strong>even</strong> function of τ valued in <em>C</em><sub>{'𝐈'}</sub>. This symmetry is the cleanest way to encode "no preferred phase direction" on the critical slice.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black mb-3 text-lg">Definition 6.9 (Slice log-derivative and stability metrics).</p>
            <p className="text-black mb-4">Define the <strong>slice log-derivative</strong></p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              ℒ<sub>{'𝐈'}</sub>(<em>q</em>) := ∂<sub>{'𝐈'}</sub>(log ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>)),
            </div>

            <p className="text-black mb-4">
              whenever ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>) ≠ 0. On the critical slice <em>q</em> = ½ + τ<strong>𝐈</strong>, ℒ<sub>{'𝐈'}</sub> measures <strong>phase-rate</strong> along τ. In RQM usage, related quantities provide misfit and stability diagnostics (your <em>M</em>, <em>L</em>, <em>G</em>).
            </p>

            <p className="text-black mb-6">
              <strong>Plain-English explanation.</strong> ℒ<sub>{'𝐈'}</sub> is to ξ what <em>F</em>'/<em>F</em> is to a complex signal <em>F</em>: it records <strong>how fast</strong> amplitude/phase change along the slice. In spectral controllers, that derivative becomes a <strong>weight</strong> or <strong>feedback</strong> acting in the <em>u</em>-domain through the transform machinery of Chapter 3.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">6.5 From Slice Functions to Operators on <em>M</em></h2>

          <div className="mb-8">
            <p className="text-black mb-4">The passage from slice-functions to <strong>operators on signals <em>f</em>: <em>M</em> → ℍ</strong> uses the spectral engine of §3–§4.</p>

            <p className="font-semibold text-black mb-3 text-lg">Definition 6.10 (Slice multiplier → spectral weight).</p>
            <p className="text-black mb-4">
              Let <em>W</em>(<em>q</em>) be a bounded slice-regular function on <em>C</em><sub>{'𝐈'}</sub>. Build a spectral <strong>weight</strong> <em>w</em>(ℓ, ω) that depends only on the ℝ frequency ω or, when needed, also on ℓ through a designed rule. Define the <strong>QSG filter</strong>
            </p>

            <div className="text-center my-6 text-xl italic bg-gray-50 p-4 rounded">
              (<em>T</em><sub>{'W'}</sub> <em>f</em>)^(ℓ, ω) := <em>w</em>(ℓ, ω) <em>f̂</em>(ℓ, ω).
            </div>

            <p className="text-black mb-4">
              <strong>Plain-English explanation.</strong> This is how slice analytics act on real signals. The slice function <em>W</em> informs a <strong>spectral multiplier</strong> <em>w</em> in (ℓ, ω) space. Because convolution ↔ multiplication (Chapter 3), <em>T</em><sub>{'W'}</sub> is a <strong>convolution-type operator</strong> on <em>M</em> that implements ξ-locks, ◎-based tapers, band-limits, or stability feedback directly on data.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
              <h4 className="font-semibold text-orange-800 mb-2">Design patterns:</h4>
              <ul className="space-y-2 text-orange-700">
                <li><strong>ξ-locks:</strong> choose <em>W</em>(<em>q</em>) = (ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em>))<sup>{'-1'}</sup> on permitted bands to attenuate drift away from the critical slice</li>
                <li><strong>◎-tapers:</strong> choose <em>W</em>(<em>q</em>) = ◎(<em>q</em>)<sup>{'-β'}</sup> to control high-"slice-order" growth</li>
                <li><strong>Critical-nesting:</strong> let <em>w</em>(ℓ, ω) emphasize ℓ bands compatible with <em>S</em>³ ⊃ <em>S</em>²<sub>{'crit'}</sub> ⊃ <em>S</em>¹<sub>{'eig'}</sub></li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">6.6 Practical Identities and Checks</h2>

          <div className="space-y-8">
            <div>
              <p className="font-semibold text-black mb-3 text-lg">1. Representation identity (slice):</p>
              <p className="text-black mb-4">
                If <em>f</em> = 𝒥<sub>{'𝐈'}</sub>[<em>F</em>] and <em>g</em> = 𝒥<sub>{'𝐈'}</sub>[<em>G</em>], then on <em>C</em><sub>{'𝐈'}</sub>:
              </p>
              <div className="text-center my-4 text-lg italic bg-gray-50 p-4 rounded">
                (<em>f</em> · <em>g</em>)(<em>q</em>) = 𝒥<sub>{'𝐈'}</sub>[<em>FG</em>](<em>q</em>), &nbsp;&nbsp; ∂<sub>{'𝐈'}</sub><em>f</em> = 𝒥<sub>{'𝐈'}</sub>[<em>F</em>'].
              </div>
              <p className="text-black mb-4">This preserves product and derivative rules from ℂ.</p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">2. ◎–Γ link (slice):</p>
              <div className="text-center my-4 text-lg italic bg-gray-50 p-4 rounded">
                ◎(<em>q</em>) = Γ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(<em>q</em> + 1), &nbsp;&nbsp; ◎(<em>q</em> + 1) = (<em>q</em> + 1) ◎(<em>q</em>), &nbsp;&nbsp; ◎(½) = √π/2.
              </div>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">3. ξ symmetry (critical slice):</p>
              <div className="text-center my-4 text-lg italic bg-gray-50 p-4 rounded">
                ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(½ + τ<strong>𝐈</strong>) is even in τ; &nbsp;&nbsp; ∂<sub>{'𝐈'}</sub> log ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(½ + τ<strong>𝐈</strong>) is odd in τ.
              </div>
              <p className="text-black mb-4">These parity rules are useful when designing even/odd spectral controllers.</p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">4. Operator realization (Chapter 3 tie-in):</p>
              <p className="text-black mb-4">
                Any slice weight <em>W</em> implemented as <em>w</em>(ℓ, ω) yields a bounded operator <em>T</em><sub>{'W'}</sub> on <em>L</em>²(<em>M</em>) with
              </p>
              <div className="text-center my-4 text-lg italic bg-gray-50 p-4 rounded">
                <Math block={true}>
                  {"‖T_W f‖_{L^2(M)}^2 = \\sum_\\ell d_\\ell \\frac{1}{2\\pi} ∫_{\\mathbb{R}} |w(\\ell, \\omega)|^2 ‖\\hat{f}(\\ell, \\omega)‖_{HS}^2 \\, d\\omega"}
                </Math>
              </div>
              <p className="text-black mb-4">by Plancherel (Chapter 3). This gives immediate <strong>stability bounds</strong> for controllers/filters.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">Exercises</h2>

          <div className="space-y-8">
            <div>
              <p className="font-semibold text-black mb-3 text-lg">1. Slice CR-conditions.</p>
              <p className="text-black mb-4">
                Let <em>f</em>(α + τ<strong>𝐈</strong>) = <em>A</em>(α, τ) + <strong>𝐈</strong> <em>B</em>(α, τ) with real scalar fields <em>A</em>, <em>B</em>. Show that ∂̄<sub>{'𝐈'}</sub> <em>f</em> = 0 iff <em>A</em><sub>{'α'}</sub> = <em>B</em><sub>{'τ'}</sub> and <em>A</em><sub>{'τ'}</sub> = -<em>B</em><sub>{'α'}</sub> (the Cauchy–Riemann system on the slice).
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">2. ◎ shift rule.</p>
              <p className="text-black mb-4">
                Starting from <Math>{"\\circleddash(q) = ∫_0^\\infty e^{-x} x^q \\, dx"}</Math>, integrate by parts to obtain ◎(<em>q</em> + 1) = (<em>q</em> + 1) ◎(<em>q</em>) on <em>C</em><sub>{'𝐈'}</sub>.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">3. ξ parity.</p>
              <p className="text-black mb-4">
                Using ξ(<em>s</em>) = ξ(1 - <em>s</em>), prove that ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(½ + τ<strong>𝐈</strong>) is even in τ and ∂<sub>{'𝐈'}</sub> log ξ<sup>{'♯'}</sup><sub>{'𝐈'}</sub>(½ + τ<strong>𝐈</strong>) is odd.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">4. Filter stability bound.</p>
              <p className="text-black mb-4">
                Given <em>w</em>(ℓ, ω) ∈ <em>L</em><sup>{'∞'}</sup>, show <em>T</em><sub>{'W'}</sub> is bounded on <em>L</em>²(<em>M</em>) with ‖<em>T</em><sub>{'W'}</sub>‖ ≤ ‖<em>w</em>‖<sub>{'L∞'}</sub> by Plancherel.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-600 text-center">
              This completes <strong>Chapter 6</strong> on quaternionic-specific analytic structures, providing the holomorphic-style toolkit for QSG.
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
              Chapter 6 of "Quaternionic Spectral Geometry: A Calculus for the 21st Century"
            </p>
          </div>

          {/* Bottom navigation */}
          <div className="mt-12 pt-8 border-t border-gray-300 text-center">
            <Link href="/quaternionic-spectral-geometry-book" className="text-blue-600 hover:underline text-lg">
              ← Back to Textbook Index
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}