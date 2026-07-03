import { useEffect } from "react";
import { Link } from "wouter";
import Math from "@/components/Math";

export default function Chapter1ManifoldMeasures() {
  useEffect(() => {
    document.title = "Chapter 1: The Manifold and Measures - QSG Textbook";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/quaternionic-spectral-geometry-book" className="text-blue-600 hover:underline text-sm md:text-base">
            ← Back to Textbook Index
          </Link>
        </div>

        {/* Chapter Content */}
        <div className="prose max-w-none text-sm md:text-base lg:text-lg leading-relaxed">

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-8 border-b border-gray-300 pb-4">
            Chapter 1 · The Manifold and Measures
          </h1>

          {/* Notation and Conventions Section */}
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-8 mb-6">Notation and Conventions</h2>
          <p className="text-black text-sm md:text-base mb-4 italic text-sm md:text-base">(used throughout the book)</p>

          <p className="text-black text-sm md:text-base mb-6 text-sm md:text-base">
            Before we begin developing Quaternionic Spectral Geometry (QSG), it is essential to establish <strong>notation</strong>. At its core, QSG represents calculus on the unit hypersphere in quaternionic space, making the dimensional progression from real numbers (1D) to complex numbers (2D) to quaternions (4D) fundamental to understanding the geometric foundations that underlie every theorem and formula in this text. These dimensional relationships define the very space in which QSG analysis takes place, and the following conventions will be used throughout the book to navigate this rich mathematical landscape.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">The Real Numbers: ℝ</h3>

          <p className="text-black text-sm md:text-base mb-4 text-sm md:text-base">
            ℝ denotes the set of <strong>real numbers</strong>. These are the familiar numbers that can be represented on a continuous line:
          </p>

          <div className="text-center my-6 text-sm md:text-base lg:text-lg italic overflow-x-auto">
            …, -2.5, -1, 0, ½, 3.1415, √2, …
          </div>

          <p className="text-black text-sm md:text-base mb-8 text-sm md:text-base">
            Real numbers are the building blocks of continuous mathematics. Length, mass, and time are measured on real scales. In QSG, real numbers appear as coordinates (e.g., the scale variable <em>u</em>), coefficients in expansions, and as values of integrals.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">The Complex Numbers: ℂ</h3>

          <p className="text-black text-sm md:text-base mb-4 text-sm md:text-base">
            ℂ denotes the set of <strong>complex numbers</strong>. A complex number <em>z</em> has the form
          </p>

          <div className="text-center my-6 overflow-x-auto">
            <Math block={true}>
              {"z = a + bi, \\quad a,b \\in \\mathbb{R}"}
            </Math>
          </div>

          <p className="text-black text-sm md:text-base mb-4 text-sm md:text-base">
            where <em>i</em> is the <strong>imaginary unit</strong> satisfying <Math>{"i^2 = -1"}</Math>.
          </p>

          <ul className="space-y-2 text-black ml-4 md:ml-6 lg:ml-8 mb-4 text-sm md:text-base">
            <li>The <strong>conjugate</strong> of <em>z</em> is <Math>{"\\overline{z} = a - bi"}</Math>.</li>
            <li>The <strong>modulus</strong> (or absolute value) is <Math>{"|z| = \\sqrt{a^2 + b^2}"}</Math>.</li>
          </ul>

          <p className="text-black text-sm md:text-base mb-4 text-sm md:text-base">
            <strong>Example.</strong> If <Math>{"z = 3 - 4i"}</Math>, then <Math>{"\\overline{z} = 3 + 4i"}</Math> and <Math>{"|z| = 5"}</Math>.
          </p>

          <p className="text-black text-sm md:text-base mb-8 text-sm md:text-base">
            Complex numbers extend the real line into the <strong>complex plane</strong>. They are central to Fourier analysis, quantum mechanics, and analytic continuation — all of which play major roles in QSG.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">The Quaternions: ℍ</h3>

          <p className="text-black text-sm md:text-base mb-4 text-sm md:text-base">
            ℍ denotes the set of <strong>quaternions</strong>, a four-dimensional extension of complex numbers discovered by William Rowan Hamilton in 1843. A quaternion <em>q</em> is written
          </p>

          <div className="text-center my-6 overflow-x-auto">
            <Math block={true}>
              {"q = a + b\\mathbf{i} + c\\mathbf{j} + d\\mathbf{k}, \\quad a,b,c,d \\in \\mathbb{R}"}
            </Math>
          </div>

          <p className="text-black text-sm md:text-base mb-4 text-sm md:text-base">
            where <strong>i</strong>, <strong>j</strong>, <strong>k</strong> are <strong>imaginary units</strong> obeying the multiplication rules:
          </p>

          <div className="text-center my-6 overflow-x-auto">
            <Math block={true}>
              {"\\mathbf{i}^2 = \\mathbf{j}^2 = \\mathbf{k}^2 = \\mathbf{ijk} = -1"}
            </Math>
          </div>

          <ul className="space-y-2 text-black ml-4 md:ml-6 lg:ml-8 mb-4 text-sm md:text-base">
            <li>The <strong>conjugate</strong> of <em>q</em> is <Math>{"\\overline{q} = a - b\\mathbf{i} - c\\mathbf{j} - d\\mathbf{k}"}</Math>.</li>
            <li>The <strong>norm</strong> (length) is <Math>{"|q| = \\sqrt{q\\overline{q}} = \\sqrt{a^2 + b^2 + c^2 + d^2}"}</Math>.</li>
          </ul>

          <p className="text-black text-sm md:text-base mb-4 text-sm md:text-base">
            <strong>Example.</strong> For <Math>{"q = 1 + 2\\mathbf{i} - 3\\mathbf{j} + \\mathbf{k}"}</Math>, we have <Math>{"\\overline{q} = 1 - 2\\mathbf{i} + 3\\mathbf{j} - \\mathbf{k}"}</Math> and <Math>{"|q| = \\sqrt{1 + 4 + 9 + 1} = \\sqrt{15}"}</Math>.
          </p>

          <p className="text-black text-sm md:text-base mb-8 text-sm md:text-base">
            Quaternions form a <strong>noncommutative division algebra</strong>: in general <Math>{"pq \\neq qp"}</Math>. This property makes them particularly suited to describing <strong>rotations</strong> and <strong>orientations</strong>, which is why they underlie the geometry of <em>SU</em>(2).
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">Purely Imaginary Quaternions: Im ℍ</h3>

          <p className="text-black text-sm md:text-base mb-4 text-sm md:text-base">The subset</p>

          <div className="text-center my-6 overflow-x-auto">
            <Math block={true}>
              {"\\text{Im}\\,\\mathbb{H} := \\{b\\mathbf{i} + c\\mathbf{j} + d\\mathbf{k} : b,c,d \\in \\mathbb{R}\\}"}
            </Math>
          </div>

          <p className="text-black text-sm md:text-base mb-4 text-sm md:text-base">
            consists of quaternions with no real part. These are sometimes called <strong>pure imaginary quaternions</strong>.
          </p>

          <p className="text-black text-sm md:text-base mb-8 text-sm md:text-base">
            Geometrically, <Math>{"\\text{Im}\\,\\mathbb{H} \\cong \\mathbb{R}^3"}</Math>. A vector in three-dimensional space can be viewed as a purely imaginary quaternion. This identification is why quaternions are widely used in computer graphics and physics to represent 3D rotations.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">Unit Spheres: <em>S</em><sup><em>n</em></sup></h3>

          <p className="text-black text-sm md:text-base mb-4">The unit <em>n</em>-sphere is defined by</p>

          <div className="text-center my-6 text-xl">
            <Math block={true}>
              {"S^n := \\{x \\in \\mathbb{R}^{n+1} : \\|x\\| = 1\\}"}
            </Math>
          </div>

          <p className="text-black text-sm md:text-base mb-4">the set of points in <Math>{"\\mathbb{R}^{n+1}"}</Math> at distance 1 from the origin.</p>

          <ul className="space-y-2 text-black ml-4 md:ml-6 lg:ml-8 text-sm md:text-base mb-4">
            <li><em>S</em>¹ is the unit circle.</li>
            <li><em>S</em>² is the unit sphere in 3D space.</li>
            <li><Math>{"S^3"}</Math> lives in <Math>{"\\mathbb{R}^4"}</Math> and is crucial to QSG.</li>
          </ul>

          <p className="text-black text-sm md:text-base mb-4">In particular,</p>

          <div className="text-center my-6 text-xl">
            <Math block={true}>
              {"S^2 \\subset \\text{Im}\\,\\mathbb{H}"}
            </Math>
          </div>

          <p className="text-black text-sm md:text-base mb-8">
            is the set of <strong>unit imaginary quaternions</strong>. Each element <Math>{"\\mathbf{I} \\in S^2"}</Math> satisfies <Math>{"\\mathbf{I}^2 = -1"}</Math>. Choosing a unit imaginary quaternion is equivalent to choosing a "complex slice" inside the quaternions.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">The Identity Matrix <em>I</em></h3>

          <p className="text-black text-sm md:text-base mb-4">When we write <em>I</em>, we mean the <strong>2×2 identity matrix</strong>:</p>

          <div className="text-center my-6 text-xl italic">
            <em>I</em> =
            <span className="text-2xl">[</span>
            <div className="inline-block mx-2">
              <div>1 &nbsp;&nbsp;&nbsp; 0</div>
              <div>0 &nbsp;&nbsp;&nbsp; 1</div>
            </div>
            <span className="text-2xl">]</span>
          </div>

          <p className="text-black text-sm md:text-base mb-8">
            This is the multiplicative identity in matrix algebra, i.e. <Math>{"IA = AI = A"}</Math> for any <Math>{"2 \\times 2"}</Math> matrix <em>A</em>.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">Matrix Operations</h3>

          <p className="text-black text-sm md:text-base mb-4">For a complex matrix <em>A</em>:</p>

          <ul className="space-y-2 text-black ml-4 md:ml-6 lg:ml-8 text-sm md:text-base mb-4">
            <li><em>A</em>* = <em>Ā</em><sup>T</sup> is the <strong>conjugate transpose</strong> (also called the Hermitian adjoint).</li>
            <li>det(<em>A</em>) is the <strong>determinant</strong>, a scalar measuring how the matrix scales oriented volume.</li>
          </ul>

          <p className="text-black text-sm md:text-base mb-4"><strong>Example.</strong> If</p>

          <div className="text-center my-6 text-xl italic">
            <em>A</em> =
            <span className="text-2xl">[</span>
            <div className="inline-block mx-2">
              <div>1 &nbsp;&nbsp;&nbsp; <em>i</em></div>
              <div>-<em>i</em> &nbsp;&nbsp;&nbsp; 1</div>
            </div>
            <span className="text-2xl">]</span>,
          </div>

          <p className="text-black text-sm md:text-base mb-8">
            then <em>A</em>* = <span className="text-xl">[<span className="inline-block mx-1"><span className="block">1 &nbsp; <em>i</em></span><span className="block">-<em>i</em> &nbsp; 1</span></span>]</span> (in this case the same), and det(<em>A</em>) = 1² - (-<em>i</em>)(<em>i</em>) = 1 - 1 = 0.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">Integration Notation</h3>

          <Math block={true} className="text-center text-xl my-6">
            \int_X f(x) \, d\mu_X(x)
          </Math>

          <p className="text-black text-sm md:text-base mb-4">
            This expression represents integration over arbitrary measure spaces. Let us break down each component:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="text-base md:text-lg font-bold text-black mb-4">Components of the Integral:</h4>
            <ul className="space-y-3 text-black">
              <li><strong>∫</strong> — The integral sign, indicating we are summing (or "adding up") values over a region.</li>
              <li><strong><em>X</em></strong> (subscript) — The <strong>domain of integration</strong>. This specifies the space or region over which we integrate. In QSG, <em>X</em> might be <strong>ℝ</strong>, <em>S</em>³, <em>SU</em>(2), or the full manifold <em>M</em> = <em>SU</em>(2) × <strong>ℝ</strong>.</li>
              <li><strong><em>f</em>(<em>x</em>)</strong> — The <strong>integrand</strong> or function being integrated. This assigns a value to each point <em>x</em> in the domain <em>X</em>.</li>
              <li><strong>dμ<sub><em>X</em></sub>(<em>x</em>)</strong> — The <strong>measure element</strong>. This tells us how to weigh volume at each point <em>x</em> in <em>X</em>. The measure μ<sub><em>X</em></sub> encodes the geometry of the space.</li>
            </ul>
          </div>

          <p className="text-black text-sm md:text-base mb-4">
            <strong>Key insight:</strong> The measure μ<sub><em>X</em></sub> is what makes integration meaningful on curved or abstract spaces. It provides the local "volume element" that accounts for the geometry of <em>X</em>.
          </p>

          <ul className="space-y-2 text-black ml-4 md:ml-6 lg:ml-8 text-sm md:text-base mb-4">
            <li><strong>On ℝ:</strong> μ<sub><em>X</em></sub> is Lebesgue measure, so dμ<sub><em>X</em></sub>(<em>u</em>) = d<em>u</em> (standard calculus).</li>
            <li><strong>On compact groups like <em>SU</em>(2):</strong> μ<sub><em>X</em></sub> is the <strong>Haar measure</strong>, which provides a uniform probability distribution over the group that respects the group structure.</li>
            <li><strong>On spheres like <em>S</em>³:</strong> μ<sub><em>X</em></sub> is the surface measure that accounts for the sphere's curvature.</li>
            <li><strong>On product spaces like <em>M</em> = <em>SU</em>(2) × ℝ:</strong> The measure typically factorizes as the product of measures on each component.</li>
          </ul>

          <p className="text-black text-sm md:text-base mb-8">
            This unified notation allows us to pass seamlessly from familiar real integrals to integrals on sophisticated geometric spaces, maintaining the same conceptual framework while adapting to the local geometry encoded in the measure.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">Isomorphism: ≅</h3>

          <p className="text-black text-sm md:text-base mb-4">When we write</p>

          <div className="text-center my-6 text-xl italic">
            <em>A</em> ≅ <em>B</em>,
          </div>

          <p className="text-black text-sm md:text-base mb-4">
            we mean there is a <strong>canonical isomorphism</strong> between mathematical objects <em>A</em> and <em>B</em>. An isomorphism is a structure-preserving identification — it says the two objects are "the same" for all practical purposes, though they may look different at first sight.
          </p>

          <p className="text-black text-sm md:text-base mb-8">
            <strong>Example:</strong> <em>SU</em>(2) ≅ <em>S</em>³. One is a group of matrices, the other is a 3-sphere sitting in ℝ⁴. But their structures correspond exactly.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mt-8 mb-4">Purpose of these conventions</h3>

          <p className="text-black text-sm md:text-base mb-4">
            Every field of advanced mathematics begins by fixing a notational language. By declaring these conventions at the start, we ensure that:
          </p>

          <ul className="space-y-2 text-black ml-4 md:ml-6 lg:ml-8 text-sm md:text-base mb-4">
            <li>Every formula can be read without ambiguity.</li>
            <li>Symbols have <strong>one meaning only</strong> throughout the text.</li>
            <li>The reader does not have to guess at definitions when encountering new operations.</li>
          </ul>

          <p className="text-black text-sm md:text-base mb-8">
            This careful foundation is what allows us to build QSG as a <strong>calculus</strong>: layer by layer, theorem by theorem, without shifting definitions underfoot.
          </p>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">1.1 The Underlying Manifold</h2>

          <div className="mb-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Definition 1.1 (The group <em>SU</em>(2)).</p>
            <p className="text-black text-sm md:text-base mb-4">
              The <strong>special unitary group of degree two</strong> is
            </p>
            <div className="text-center my-6 text-xl italic">
              <em>SU</em>(2) := {"{"}<em>A</em> ∈ ℂ<sup>2×2</sup> : <em>A</em>*<em>A</em> = <em>I</em>, det(<em>A</em>) = 1{"}"}
            </div>

            <p className="text-black text-sm md:text-base mb-4"><strong>Here:</strong></p>
            <ul className="space-y-2 text-black ml-4 md:ml-6 lg:ml-8 text-sm md:text-base mb-4">
              <li>ℂ<sup>2×2</sup> is the set of complex 2×2 matrices,</li>
              <li><em>A</em>* is the conjugate transpose of <em>A</em>,</li>
              <li><em>I</em> is the 2×2 identity matrix,</li>
              <li>det(<em>A</em>) is the determinant of <em>A</em>.</li>
            </ul>

            <p className="text-black text-sm md:text-base mb-4">A standard parametrization is</p>
            <div className="text-center my-6 text-xl italic">
              <em>A</em>(α,β) =
              <div className="mt-2">
                <span className="text-2xl">[</span>
                <div className="inline-block mx-2">
                  <div>α &nbsp;&nbsp;&nbsp; -β̄</div>
                  <div>β &nbsp;&nbsp;&nbsp; ᾱ</div>
                </div>
                <span className="text-2xl">]</span>
              </div>
              <div className="mt-4">
                α,β ∈ ℂ, &nbsp;&nbsp;&nbsp; |α|² + |β|² = 1
              </div>
            </div>

            <p className="text-black text-sm md:text-base mb-4">The condition |α|² + |β|² = 1 ensures <em>A</em>*<em>A</em> = <em>I</em> and det(<em>A</em>) = 1.</p>

            <p className="text-black text-sm md:text-base mb-4">
              What this means in plain language: <strong>"Unitary"</strong> (<em>A</em>*<em>A</em> = <em>I</em>) means the matrix preserves complex inner products; it is a rotation-like object in complex 2D. <strong>"Special"</strong> (det(<em>A</em>) = 1) trims off reflections and uniform scalings, leaving pure "orientation-preserving rotations." The parametrization above says: to specify an element of <em>SU</em>(2), it suffices to pick two complex numbers α,β on the <strong>unit 3-sphere</strong> in ℂ².
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Remark 1.1 (From matrices to a sphere).</p>
            <p className="text-black text-sm md:text-base mb-4">Define</p>
            <div className="text-center my-6 text-xl italic">
              <em>S</em>³ := {"{"} (α,β) ∈ ℂ² : |α|² + |β|² = 1 {"}"}
            </div>

            <p className="text-black text-sm md:text-base mb-4">
              The map (α,β) ↦ <em>A</em>(α,β) is a <strong>bijection</strong> between <em>S</em>³ and <em>SU</em>(2). Hence
            </p>
            <div className="text-center my-6 text-xl italic">
              <em>SU</em>(2) ≅ <em>S</em>³
            </div>

            <p className="text-black text-sm md:text-base mb-4">This lets us <strong>freely switch</strong> viewpoints:</p>
            <ul className="space-y-2 text-black ml-4 md:ml-6 lg:ml-8 text-sm md:text-base mb-4">
              <li><strong>Group viewpoint:</strong> <em>SU</em>(2) with matrix multiplication.</li>
              <li><strong>Geometric viewpoint:</strong> <em>S</em>³ as a curved 3D surface in ℝ⁴.</li>
            </ul>

            <p className="text-black text-sm md:text-base mb-6">
              <strong>Historical/structural note:</strong> <em>SU</em>(2) is the <strong>double cover</strong> of the rotation group of 3-space, <em>SO</em>(3) (the group of 3×3 real orthogonal matrices with determinant 1). Formally, there is a surjective 2-to-1 homomorphism <em>SU</em>(2) → <em>SO</em>(3). We will not use <em>SO</em>(3) yet, but this relationship anchors intuition: <em>SU</em>(2) is the "spin" version of 3D rotations.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Definition 1.2 (The product manifold <em>M</em>).</p>
            <p className="text-black text-sm md:text-base mb-4">Let</p>
            <div className="text-center my-6 text-xl italic">
              <em>M</em> := <em>SU</em>(2) × ℝ
            </div>

            <p className="text-black text-sm md:text-base mb-4">
              A typical point is (<em>x</em>,<em>u</em>) where <em>x</em> ∈ <em>SU</em>(2) and <em>u</em> ∈ ℝ. We interpret the <strong>ℝ-coordinate <em>u</em></strong> as a <strong>log-frequency (or scale) axis</strong>. Throughout QSG, <em>SU</em>(2) carries the <strong>orientation/phase geometry</strong> and <em>u</em> carries the <strong>scale/frequency geometry</strong>.
            </p>

            <p className="text-black text-sm md:text-base mb-4">
              Think of <em>M</em> as a "curved–flat" plane: The <strong>horizontal</strong> part is not ℝ but the compact, curved manifold <em>SU</em>(2) ≅ <em>S</em>³. The <strong>vertical</strong> part is the unbounded line ℝ capturing scales or logarithmic frequencies.
            </p>

            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Remark 1.2 (Why this product matters).</p>
            <p className="text-black text-sm md:text-base">
              Calculus on ℝ² is powerful because it separates variables (e.g., <em>x</em> and <em>y</em>). QSG does the <strong>same separation</strong> for problems where <strong>orientation</strong> (on <em>SU</em>(2)) and <strong>scale</strong> (on ℝ) both matter. Many physical, signal-processing, and quantum problems naturally live on <em>SU</em>(2) × ℝ, not on flat ℝ<sup><em>n</em></sup>.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">1.2 Measures and Integration</h2>

          <p className="text-black text-sm md:text-base mb-6">
            To integrate functions on manifolds, we need <strong>measures</strong>—rules assigning volumes to sets and making integrals meaningful.
          </p>

          <div className="mb-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Definition 1.3 (Haar measure on <em>SU</em>(2)).</p>
            <p className="text-black text-sm md:text-base mb-4">
              A <strong>Haar measure</strong> on a topological group is a measure invariant under the group's own motions. On <em>SU</em>(2), there exists a <strong>unique</strong> (up to scaling) <strong>bi-invariant</strong> probability measure, denoted d<em>μ<sub>SU(2)</sub></em>, satisfying
            </p>
            <div className="text-center my-6 text-lg">
              <Math block={true}>
                {"\\int_{SU(2)} f(x) \\, d\\mu_{SU(2)}(x) = \\int_{SU(2)} f(gx) \\, d\\mu_{SU(2)}(x) = \\int_{SU(2)} f(xg) \\, d\\mu_{SU(2)}(x)"}
              </Math>
            </div>

            <p className="text-black text-sm md:text-base mb-4">
              for every integrable function <em>f</em>: <em>SU</em>(2) → ℂ (or ℝ) and every <em>g</em> ∈ <em>SU</em>(2). <strong>Bi-invariant</strong> means both <strong>left-invariant</strong> (<em>x</em> ↦ <em>gx</em>) and <strong>right-invariant</strong> (<em>x</em> ↦ <em>xg</em>). We <strong>normalize</strong> it so that
            </p>
            <div className="text-center my-6 text-xl">
              <Math block={true}>
                {"\\int_{SU(2)} 1 \\, d\\mu_{SU(2)}(x) = 1"}
              </Math>
            </div>

            <p className="text-black text-sm md:text-base mb-6">
              Because <em>SU</em>(2) is compact and homogeneous, there is a unique notion of "uniform distribution" on it. Haar measure is that uniform measure. Rotating the group (left or right) does not change volumes.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Definition 1.4 (Product measure on <em>M</em>).</p>
            <p className="text-black text-sm md:text-base mb-4">
              Let d<em>u</em> be <strong>Lebesgue measure</strong> on ℝ (the standard notion of length/volume on the real line). The product measure on the product space <em>M</em> = <em>SU</em>(2) × ℝ is
            </p>
            <div className="text-center my-6 text-xl italic">
              d<em>μ<sub>M</sub></em>(<em>x</em>,<em>u</em>) := d<em>μ<sub>SU(2)</sub></em>(<em>x</em>) d<em>u</em>
            </div>

            <p className="text-black text-sm md:text-base mb-4">
              This is the natural measure for integrating functions <em>f</em>: <em>M</em> → ℂ, ℝ, or ℍ:
            </p>
            <div className="text-center my-6 text-lg">
              <Math block={true}>
                {"\\int_M f(x,u) \\, d\\mu_M(x,u) = \\int_{SU(2)} \\int_{\\mathbb{R}} f(x,u) \\, du \\, d\\mu_{SU(2)}(x)"}
              </Math>
            </div>

            <p className="text-black text-sm md:text-base">
              Fubini–Tonelli theorems apply: under standard integrability conditions, we can swap integrals and compute them iteratively.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Example 1.1 (A simple product integral).</p>
            <p className="text-black text-sm md:text-base mb-4">
              Let <em>f</em>(<em>x</em>,<em>u</em>) := <em>e</em><sup>-|<em>u</em>|</sup>, which <strong>does not depend</strong> on <em>x</em> ∈ <em>SU</em>(2). Then
            </p>
            <div className="text-center my-6 text-lg">
              <Math block={true}>
                {"\\int_M f \\, d\\mu_M = \\left(\\int_{SU(2)} 1 \\, d\\mu_{SU(2)}(x)\\right)\\left(\\int_{\\mathbb{R}} e^{-|u|} \\, du\\right) = 1 \\cdot 2 = 2"}
              </Math>
            </div>

            <p className="text-black text-sm md:text-base">
              Here we used the normalization of Haar measure and the elementary real integral <Math>{"\\int_{\\mathbb{R}} e^{-|u|} \\, du = 2"}</Math>.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">1.3 Function Spaces</h2>

          <p className="text-black text-sm md:text-base mb-6">
            We now formalize the space of <strong>signals</strong> we will analyze.
          </p>

          <div className="mb-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Definition 1.5 (Quaternion-valued functions on <em>M</em>).</p>
            <p className="text-black text-sm md:text-base mb-4">A <strong>signal</strong> in QSG is a function</p>
            <div className="text-center my-6 text-xl italic">
              <em>f</em>: <em>M</em> → ℍ, &nbsp;&nbsp;&nbsp; (<em>x</em>,<em>u</em>) ↦ <em>f</em>(<em>x</em>,<em>u</em>)
            </div>

            <p className="text-black text-sm md:text-base mb-4">
              taking values in the quaternions ℍ. We often write <em>f</em> ∈ <em>L</em>⁰(<em>M</em>,ℍ) to indicate measurability.
            </p>

            <p className="text-black text-sm md:text-base mb-6">
              ℍ encodes amplitude and multi-axis phase/orientation in a single algebraic object. This is natural on <em>SU</em>(2), whose geometry is itself quaternionic.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Definition 1.6 (Inner product and the <em>L</em>² space).</p>
            <p className="text-black text-sm md:text-base mb-4">
              For two quaternion-valued signals <em>f</em>,<em>g</em>: <em>M</em> → ℍ, define the <strong>(real) inner product</strong>
            </p>
            <div className="text-center my-6 text-lg">
              <Math block={true}>
                {"\\langle f, g \\rangle := \\int_{SU(2)} \\int_{\\mathbb{R}} \\text{Re}(\\overline{f}(x,u) \\, g(x,u)) \\, du \\, d\\mu_{SU(2)}(x)"}
              </Math>
            </div>

            <p className="text-black text-sm md:text-base mb-4"><strong>Here:</strong></p>
            <ul className="space-y-2 text-black ml-4 md:ml-6 lg:ml-8 text-sm md:text-base mb-4">
              <li><em>f̄</em>(<em>x</em>,<em>u</em>) is the <strong>quaternionic conjugate</strong> of <em>f</em>(<em>x</em>,<em>u</em>),</li>
              <li>Re(<em>q</em>) is the <strong>real part</strong> of a quaternion <em>q</em>.</li>
            </ul>

            <p className="text-black text-sm md:text-base mb-4">
              The associated <strong>norm</strong> is ||<em>f</em>||<sub><em>L</em>²(<em>M</em>)</sub> := √⟨<em>f</em>,<em>f</em>⟩. We then define
            </p>
            <div className="text-center my-6 text-xl italic">
              <em>L</em>²(<em>M</em>,ℍ) := {"{"}<em>f</em>: <em>M</em> → ℍ measurable : ||<em>f</em>||<sub><em>L</em>²(<em>M</em>)</sub> &lt; ∞{"}"}
            </div>

            <p className="text-black text-sm md:text-base mb-4">
              Completeness of <em>L</em>² (limits of Cauchy sequences exist in the space) makes it a <strong>Hilbert space</strong> over ℝ.
            </p>

            <p className="text-black text-sm md:text-base mb-6">
              Quaternion multiplication is <strong>noncommutative</strong>, so <em>f̄ g</em> is quaternion-valued. Taking the <strong>real part</strong> extracts a scalar that is symmetric and positive-definite, yielding a bona-fide norm and making variational arguments (energy minimization, Euler–Lagrange) well-posed. If one needs a <strong>right ℍ-Hilbert module</strong> structure, the same formula works with the appropriate order conventions; we keep the real inner product to streamline analysis.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">1.4 Slice Structure</h2>

          <p className="text-black text-sm md:text-base mb-6">
            To connect quaternionic analysis to complex analysis, we work on <strong>slices</strong> that look exactly like ℂ.
          </p>

          <div className="mb-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Definition 1.7 (Global slice <em>C<sub>𝐈</sub></em>).</p>
            <p className="text-black text-sm md:text-base mb-4">
              Pick any <strong>unit imaginary quaternion</strong> <strong>𝐈</strong> ∈ <em>S</em>² ⊂ Im ℍ (so |<strong>𝐈</strong>| = 1 and <strong>𝐈</strong>² = -1). The <strong>global slice</strong> determined by <strong>𝐈</strong> is
            </p>
            <div className="text-center my-6 text-xl italic">
              <em>C<sub>𝐈</sub></em> := {"{"}<em>a</em> + <em>b</em><strong>𝐈</strong> : <em>a</em>,<em>b</em> ∈ ℝ{"}"} ≅ ℂ
            </div>

            <p className="text-black text-sm md:text-base mb-4">
              The isomorphism is explicit: <em>a</em> + <em>b</em><strong>𝐈</strong> ↔ <em>a</em> + <em>ib</em>. On <em>C<sub>𝐈</sub></em>, <strong>quaternionic addition and multiplication reduce to the usual complex operations</strong> because <strong>𝐈</strong> plays the role of √(-1).
            </p>

            <p className="text-black text-sm md:text-base mb-6">
              Many special functions (e.g., the Gamma function Γ, the Riemann ξ-function) are <strong>holomorphic</strong> in complex variables. By working slice-wise on <em>C<sub>𝐈</sub></em>, we can import complex-analytic identities into QSG and then <strong>lift</strong> them to <em>M</em> (by coupling with <em>SU</em>(2)-harmonics in the angular/orientation variables).
            </p>

            <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">Remark 1.4 (From slice to full geometry).</p>
            <p className="text-black text-sm md:text-base mb-4">
              Think of <em>C<sub>𝐈</sub></em> as a <strong>chart</strong> where one variable behaves exactly like a complex number. We will:
            </p>
            <ol className="list-decimal space-y-2 text-black ml-6 mb-4">
              <li>Define/operate with functions on the slice (<em>C<sub>𝐈</sub></em>-level).</li>
              <li>Use the <em>SU</em>(2) side (via harmonic analysis) to distribute those operations across the whole manifold <em>M</em> = <em>SU</em>(2) × ℝ.</li>
            </ol>
            <p className="text-black text-sm md:text-base">
              This "slice-first, lift-later" workflow is a central theme of QSG.
            </p>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-black mt-12 mb-6">Exercises</h2>

          <div className="space-y-8">
            <div>
              <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">1. <em>SU</em>(2) basics.</p>
              <p className="text-black text-sm md:text-base mb-4">Let</p>
              <div className="text-center my-6 text-xl italic">
                <em>A</em> =
                <span className="text-2xl">[</span>
                <div className="inline-block mx-2">
                  <div>α &nbsp;&nbsp;&nbsp; -β̄</div>
                  <div>β &nbsp;&nbsp;&nbsp; ᾱ</div>
                </div>
                <span className="text-2xl">]</span>
                , &nbsp;&nbsp; α,β ∈ ℂ, &nbsp;&nbsp; |α|² + |β|² = 1
              </div>

              <p className="text-black text-sm md:text-base mb-2">(a) Compute <em>A</em>*<em>A</em> and show <em>A</em>*<em>A</em> = <em>I</em>.</p>
              <p className="text-black text-sm md:text-base mb-4">(b) Compute det(<em>A</em>) and show det(<em>A</em>) = 1.</p>
              <p className="text-black italic">
                <strong>Hint:</strong> Use β̄̄ = β and |α|² = α ᾱ.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">2. Normalization of Haar measure.</p>
              <p className="text-black text-sm md:text-base mb-4">
                With d<em>μ<sub>SU(2)</sub></em> the bi-invariant probability measure, verify that
              </p>
              <div className="text-center my-6 text-xl">
                <Math block={true}>
                  {"∫_{SU(2)} 1 \\, d\\mu_{SU(2)}(x) = 1"}
                </Math>
              </div>
              <p className="text-black text-sm md:text-base">
                Then explain in words why <Math>{"∫_{SU(2)} f(gx) \\, d\\mu_{SU(2)}(x) = ∫_{SU(2)} f(x) \\, d\\mu_{SU(2)}(x)"}</Math> for any fixed <em>g</em> ∈ <em>SU</em>(2).
              </p>
            </div>

            <div>
              <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">3. A product integral.</p>
              <p className="text-black text-sm md:text-base mb-4">
                Let <em>f</em>(<em>x</em>,<em>u</em>) = χ(<em>x</em>) · <em>e</em><sup>-<em>u</em>²</sup> with χ(<em>x</em>) ≡ 1 on <em>SU</em>(2). Compute
              </p>
              <div className="text-center my-6 text-xl">
                <Math block={true}>
                  {"∫_M f(x,u) \\, d\\mu_M(x,u)"}
                </Math>
              </div>
              <p className="text-black italic">
                <strong>Hint:</strong> Separate variables and use <Math>{"∫_{\\mathbb{R}} e^{-u^2} \\, du = \\sqrt{\\pi}"}</Math>.
              </p>
            </div>

            <div>
              <p className="font-semibold text-black text-sm md:text-base mb-3 text-lg">4. Slice ≅ complex plane.</p>
              <p className="text-black text-sm md:text-base mb-4">
                Fix <strong>𝐈</strong> = <strong>i</strong> ∈ <em>S</em>² (the usual quaternion unit). Prove that
              </p>
              <div className="text-center my-6 text-xl italic">
                <em>C<sub>i</sub></em> = {"{"}<em>a</em> + <em>b</em><strong>i</strong> : <em>a</em>,<em>b</em> ∈ ℝ{"}"}
              </div>
              <p className="text-black text-sm md:text-base">
                is isomorphic to ℂ under <em>a</em> + <em>b</em><strong>i</strong> ↦ <em>a</em> + <em>ib</em>, and that multiplication on <em>C<sub>i</sub></em> matches complex multiplication.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-600 text-center">
              This completes the expanded <strong>Chapter 1</strong> with full symbol introductions, intuitive commentary, and concrete checks.
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
              Chapter 1 of "Quaternionic Spectral Geometry: A Calculus for the 21st Century"
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