import { useEffect } from "react";
import { Link } from "wouter";
import { Math } from "@/components/Math";

export default function Chapter2DifferentialCalculus() {
  useEffect(() => {
    document.title = "Chapter 2: Differential Calculus on M - QSG Textbook";
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
            Chapter 2 · Differential Calculus on <em>M</em>
          </h1>

          <p className="text-black mb-8">
            Differential calculus is the art of measuring change. On the real line, we measure change with derivatives like <Math>{"d/dx"}</Math>. On a higher-dimensional manifold like <Math>{"M = SU(2) \\times \\mathbb{R}"}</Math>, we need a systematic way to take derivatives in every possible direction. This chapter introduces those tools.
          </p>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">2.1 Left-Invariant Vector Fields on <em>SU</em>(2)</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Definition 2.1 (Lie algebra of <em>SU</em>(2)).</p>
            <p className="text-black mb-4">
              Every Lie group has a tangent space at the identity, called its <strong>Lie algebra</strong>. For <em>SU</em>(2), the Lie algebra is <em>su</em>(2), consisting of traceless skew-Hermitian <Math>{"2 \\times 2"}</Math> complex matrices.
            </p>

            <p className="text-black mb-4">A standard basis of <em>su</em>(2) is:</p>

            <div className="text-center my-6">
              <Math display={true} size="large">
                {"X_1 = \\frac{1}{2} \\begin{bmatrix} 0 & i \\\\ i & 0 \\end{bmatrix}, \\quad X_2 = \\frac{1}{2} \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}, \\quad X_3 = \\frac{1}{2} \\begin{bmatrix} i & 0 \\\\ 0 & -i \\end{bmatrix}"}
              </Math>
            </div>

            <p className="text-black mb-6">
              These generate all infinitesimal motions of <em>SU</em>(2).
            </p>
          </div>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Definition 2.2 (Left-invariant vector fields).</p>
            <p className="text-black mb-4">
              Each <em>X<sub>i</sub></em> gives rise to a differential operator (also called a vector field) on the group manifold <em>SU</em>(2), denoted again by <em>X<sub>i</sub></em>. These act on smooth functions <em>f</em>: <em>SU</em>(2) → ℍ by differentiating along the group's natural directions.
            </p>

            <p className="text-black mb-4">They satisfy the commutation relations</p>

            <Math display={true} size="large">
              {"[X_i, X_j] = 2\\sum_k \\varepsilon_{ijk} X_k"}
            </Math>

            <p className="text-black mb-6">
              where ε<sub><em>ijk</em></sub> is the Levi-Civita symbol.
            </p>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> A vector field is like a "directional derivative" glued to each point of the manifold.
            </p>

            <p className="text-black mb-4">
              The phrase "left-invariant" means: if you move the function around by multiplying on the left by some group element <em>g</em>, the vector field's definition does not change. This ensures the calculus respects the symmetry of the group.
            </p>

            <p className="text-black mb-4">
              The commutation relation says: if you move first in direction <em>X<sub>i</sub></em> then in <em>X<sub>j</sub></em>, it differs from moving in the opposite order by an infinitesimal rotation in the third direction. This is the algebraic encoding of the geometry of rotations.
            </p>

            <p className="text-black mb-6">
              <strong>Mini-example.</strong> On the circle <em>S</em>¹, there's a single left-invariant vector field: differentiation with respect to angle θ. On <em>SU</em>(2), there are three such "rotational derivatives," one for each axis of rotation.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">2.2 Derivatives on <em>M</em> = <em>SU</em>(2) × ℝ</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Definition 2.3 (Full derivative system).</p>
            <p className="text-black mb-4">
              On the product manifold <em>M</em> = <em>SU</em>(2) × ℝ, we combine the three left-invariant derivatives on <em>SU</em>(2) with the ordinary derivative on ℝ.
            </p>

            <Math display={true} size="large">
              {"\\nabla_M := (X_1, X_2, X_3, \\partial_u)"}
            </Math>

            <p className="text-black mb-4">where</p>
            <ul className="space-y-2 text-black ml-6 mb-4">
              <li><em>X</em><sub>1</sub>, <em>X</em><sub>2</sub>, <em>X</em><sub>3</sub> act on the <em>SU</em>(2)-variable,</li>
              <li>∂<sub><em>u</em></sub> is the usual derivative with respect to the real coordinate <em>u</em>.</li>
            </ul>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> This formula says: the geometry of <em>M</em> has four independent directions in which things can change. Three correspond to "rotating" in the group <em>SU</em>(2), and one corresponds to sliding along the real line <em>u</em>.
            </p>

            <p className="text-black mb-6">
              Think of standing on the surface of the Earth: at each point, you can walk east–west, north–south, or up–down. That's three directions. On <em>M</em>, the extra <em>u</em>-axis adds a fourth dial, representing scale or frequency.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">2.3 Leibniz Rules and Conjugation</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Definition 2.4 (Leibniz rule for quaternionic functions).</p>
            <p className="text-black mb-4">
              For quaternion-valued functions <em>f</em>, <em>g</em>: <em>M</em> → ℍ and a derivative <em>D</em> ∈ {"{"}<em>X</em><sub>1</sub>, <em>X</em><sub>2</sub>, <em>X</em><sub>3</sub>, ∂<sub><em>u</em></sub>{"}"},
            </p>

            <Math display={true} size="large">
              {"D(fg) = (Df)g + f(Dg), \\quad D(\\overline{f}) = \\overline{Df}"}
            </Math>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> The product rule still holds for quaternion-valued functions. If you differentiate a product, you must differentiate each factor separately and add the results.
            </p>

            <p className="text-black mb-4">
              The conjugation rule says: differentiation and quaternionic conjugation commute — taking the derivative first and then conjugating is the same as conjugating first and then differentiating.
            </p>

            <p className="text-black mb-6">
              Why is this important? Because quaternions are noncommutative, one might worry that derivatives would behave strangely. These identities reassure us that the basic logical structure of calculus is preserved.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">2.4 Gradient, Divergence, and Laplacians</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Definition 2.5 (Gradient, divergence, and Laplacians).</p>
            <p className="text-black mb-4">
              With respect to the product metric (bi-invariant on <em>SU</em>(2) and Euclidean on ℝ):
            </p>

            <p className="text-black mb-4">The <strong>gradient</strong> of a function <em>f</em>: <em>M</em> → ℍ is the 4-vector</p>

            <Math display={true} size="large">
              {"\\text{grad } f = \\sum_{i=1}^3 (X_i f) e_i + (\\partial_u f) e_4"}
            </Math>

            <p className="text-black mb-4">
              where <em>e</em><sub>1</sub>, <em>e</em><sub>2</sub>, <em>e</em><sub>3</sub>, <em>e</em><sub>4</sub> are the orthonormal basis vectors of the tangent space.
            </p>

            <p className="text-black mb-4">The <strong>divergence</strong> of a vector field <em>V</em> = (<em>V</em><sub>1</sub>, <em>V</em><sub>2</sub>, <em>V</em><sub>3</sub>, <em>V</em><sub>4</sub>) is</p>

            <Math display={true} size="large">
              {"\\text{div } V = \\sum_{i=1}^3 X_i V_i + \\partial_u V_4"}
            </Math>

            <p className="text-black mb-4">The <strong>Laplacian operators</strong> are:</p>

            <Math display={true} size="large">
              {"\\Delta_{SU(2)} := \\sum_{i=1}^3 X_i^2, \\quad \\Delta_M := \\Delta_{SU(2)} + \\partial_u^2"}
            </Math>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> The gradient tells us the direction of steepest increase of a function. On <em>M</em>, it is built from derivatives along the three rotational axes of <em>SU</em>(2) plus the <em>u</em>-axis.
            </p>

            <p className="text-black mb-4">
              The divergence measures how much a vector field is "flowing out" of a point — positive divergence means sources, negative means sinks.
            </p>

            <p className="text-black mb-4">
              The Laplacian is the master operator of calculus: it adds up all the second derivatives, measuring how much a function deviates from being "flat." On <em>M</em>, the Laplacian is just the sum of the rotational Laplacian on <em>SU</em>(2) and the second derivative along <em>u</em>.
            </p>

            <p className="text-black mb-6">
              <strong>Mini-example.</strong> On ℝ, the Laplacian is just d²/d<em>x</em>². On the sphere <em>S</em>², the Laplacian detects how a function curves over the surface. On <em>M</em>, the Laplacian does both at once: it accounts for curvature in the group direction and oscillation in the frequency direction.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">2.5 Integration by Parts and Green's Identity</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Theorem 2.1 (Green–Gauss identities on <em>M</em>).</p>
            <p className="text-black mb-4">
              For smooth, compactly supported functions <em>f</em>, <em>g</em>: <em>M</em> → ℍ:
            </p>

            <Math display={true}>
              {"\\int_M (X_i f) g \\, d\\mu_M = -\\int_M f (X_i g) \\, d\\mu_M"}
            </Math>

            <Math display={true}>
              {"\\int_M (\\partial_u f) g \\, d\\mu_M = -\\int_M f (\\partial_u g) \\, d\\mu_M"}
            </Math>

            <p className="text-black mb-4">and</p>

            <Math display={true}>
              {"\\int_M \\langle \\nabla_M f, \\nabla_M g \\rangle \\, d\\mu_M = -\\int_M f (\\Delta_M g) \\, d\\mu_M"}
            </Math>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> These are the fundamental <strong>integration by parts</strong> formulas for <em>M</em>. They say: you can "move" derivatives from one function to another, picking up a minus sign.
            </p>

            <p className="text-black mb-4">
              The first two formulas handle the individual derivatives (rotational and along <em>u</em>). The third is <strong>Green's identity</strong>, which relates the "energy" of two functions (their gradient dot product) to how one function responds to the Laplacian of the other.
            </p>

            <p className="text-black mb-6">
              These identities are the backbone of variational calculus, partial differential equations, and spectral theory on <em>M</em>. They generalize the familiar integration by parts on the real line to our quaternionic manifold setting.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">2.6 The Dirac Operator</h2>

          <div className="mb-8 text-sm md:text-base">
            <p className="font-semibold text-black mb-3 text-lg">Definition 2.6 (Quaternionic Dirac operator).</p>
            <p className="text-black mb-4">
              The <strong>Dirac operator</strong> on <em>M</em> is defined as
            </p>

            <Math display={true} size="large">
              {"\\mathcal{D} := \\sum_{i=1}^3 \\mathbf{e}_i X_i + \\mathbf{e}_4 \\partial_u"}
            </Math>

            <p className="text-black mb-4">
              where <strong>e<sub>i</sub></strong> are the <strong>quaternionic units</strong> (<strong>i</strong>, <strong>j</strong>, <strong>k</strong>) and <strong>e</strong><sub>4</sub> is a fourth unit (often taken as 1 or a separate symbol).
            </p>

            <p className="text-black mb-4">The key property is that</p>

            <Math display={true} size="large">
              {"\\mathcal{D}^2 = -(\\Delta_{SU(2)} + \\partial_u^2) = -\\Delta_M"}
            </Math>

            <p className="text-black mb-4">
              <strong>Plain-language explanation.</strong> The Dirac operator is a "square root" of the Laplacian. While the Laplacian measures second-order changes (curvature), the Dirac operator captures first-order changes but in a way that naturally incorporates the quaternionic structure.
            </p>

            <p className="text-black mb-4">
              In physics, Dirac operators describe the motion of spin-½ particles (like electrons). On our manifold <em>M</em>, the quaternionic Dirac operator provides a natural way to study "spinor fields" — functions that transform in a specific way under rotations of <em>SU</em>(2).
            </p>

            <p className="text-black mb-6">
              The relation 𝒟<sup>2</sup> = -Δ<sub><em>M</em></sub> means that solving Dirac equations is intimately connected to solving Laplace and heat equations. This connection is one of the deep insights of modern differential geometry.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">Exercises</h2>

          <div className="space-y-8">
            <div>
              <p className="font-semibold text-black mb-3 text-lg">1. Commutation relations.</p>
              <p className="text-black mb-4">
                Verify the commutation relation [<em>X</em><sub>1</sub>, <em>X</em><sub>2</sub>] = 2<em>X</em><sub>3</sub> by explicit matrix computation using the definitions from Section 2.1.
              </p>
              <p className="text-black italic">
                <strong>Hint:</strong> Compute <em>X</em><sub>1</sub><em>X</em><sub>2</sub> and <em>X</em><sub>2</sub><em>X</em><sub>1</sub> separately, then subtract.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">2. Product rule verification.</p>
              <p className="text-black mb-4">
                Let <em>f</em>(<em>x</em>, <em>u</em>) = <em>u</em> + <em>u</em><strong>i</strong> and <em>g</em>(<em>x</em>, <em>u</em>) = 1 + <em>u</em><strong>j</strong> be functions on <em>M</em>. Verify that ∂<sub><em>u</em></sub>(<em>fg</em>) = (∂<sub><em>u</em></sub><em>f</em>)<em>g</em> + <em>f</em>(∂<sub><em>u</em></sub><em>g</em>).
              </p>
              <p className="text-black italic">
                <strong>Note:</strong> Be careful with the order of multiplication since quaternions are noncommutative.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">3. Laplacian computation.</p>
              <p className="text-black mb-4">
                For the function <em>f</em>(<em>x</em>, <em>u</em>) = <em>e</em><sup>-<em>u</em>²</sup> (which depends only on the ℝ coordinate), compute Δ<sub><em>M</em></sub><em>f</em>.
              </p>
              <p className="text-black italic">
                <strong>Hint:</strong> Since <em>f</em> doesn't depend on the <em>SU</em>(2) variable, <em>X<sub>i</sub>f</em> = 0 for <em>i</em> = 1, 2, 3.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black mb-3 text-lg">4. Integration by parts.</p>
              <p className="text-black mb-4">
                Using the Green–Gauss identity, show that for smooth compactly supported functions <em>f</em>, <em>g</em> on <em>M</em>,
              </p>
              <Math display={true} size="large">
                {"\\int_M f (\\Delta_M g) \\, d\\mu_M = \\int_M (\\Delta_M f) g \\, d\\mu_M"}
              </Math>
              <p className="text-black italic">
                <strong>Hint:</strong> Apply Green's identity twice, once with (<em>f</em>, <em>g</em>) and once with (<em>g</em>, <em>f</em>).
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-600 text-center">
              This completes <strong>Chapter 2</strong> on differential calculus, providing the foundational tools for analysis on the quaternionic manifold <em>M</em>.
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
              Chapter 2 of "Quaternionic Spectral Geometry: A Calculus for the 21st Century"
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