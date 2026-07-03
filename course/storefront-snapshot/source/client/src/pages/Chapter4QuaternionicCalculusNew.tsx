import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";

export default function Chapter4QuaternionicCalculusNew() {
  useEffect(() => {
    document.title = "Chapter 4: Quaternionic Calculus | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Chapter 4 of Quaternionic Spectral Geometry textbook: Quaternionic calculus covering differentiation, integration, slice regularity, and integral theorems.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-sm md:text-base text-blue-600 hover:text-blue-800 transition-colors mb-8" data-testid="link-back-to-book">
          <ArrowLeft className="w-4 h-4" />
          Back to Table of Contents
        </Link>

        {/* Chapter Header */}
        <div className="mb-12 border-b-2 border-blue-200 pb-6">
          <div className="text-sm text-gray-500 mb-2">Chapter 4</div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-3">
            Quaternionic Calculus
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-blue-700 italic">
            Differentiation, Integration, and Slice Regularity
          </h2>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-lg max-w-none">

          {/* Chapter Overview */}
          <div className="mb-12">
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-4">Chapter Overview</h3>
            <p className="text-sm md:text-base mb-4">
              Quaternionic Calculus extends classical real and complex calculus into the four-dimensional realm of quaternions. In this framework, differentiation and integration take on new meanings due to the <strong>non-commutativity</strong> of quaternionic multiplication. This chapter introduces how limits, derivatives, and integrals behave under quaternionic algebra, and how new analytic structures—called <strong>slice-regular functions</strong>—restore much of the beauty and power of complex analysis.
            </p>
            <p className="text-sm md:text-base mb-4">We will cover:</p>
            <ul className="list-disc ml-4 md:ml-6 lg:ml-8 space-y-2 mb-4 text-sm md:text-base">
              <li>Limit definitions and the problem of non-commutative differentiation</li>
              <li>Cullen and Gentili–Struppa slice-regular functions</li>
              <li>Quaternionic Cauchy integral formula and residue theory</li>
              <li>Gradient, divergence, and curl in quaternionic form</li>
              <li>Integral theorems on <InlineMath math="S^3" /> and <InlineMath math="S^3 \times \mathbb{R}" /></li>
            </ul>
            <p className="text-sm md:text-base mb-4">
              These ideas form the foundation of quaternionic analysis, harmonic geometry, and ultimately, the spectral coherence framework explored in later chapters.
            </p>
          </div>

          {/* Section 4.1 */}
          <section className="mb-12">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-900 mb-6">4.1 Limits and Non-Commutative Derivatives</h2>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Definition 4.1 (Quaternionic Limit)</h4>
              <p className="text-sm md:text-base mb-4">
                For <InlineMath math="f: \mathbb{H} \to \mathbb{H}" />, we say <InlineMath math="\lim_{q \to q_0} f(q) = L" /> if, for every <InlineMath math="\varepsilon > 0" />, there exists <InlineMath math="\delta > 0" /> such that whenever <InlineMath math="|q - q_0| < \delta" />, we have <InlineMath math="|f(q) - L| < \varepsilon" />. The notion of limit is identical to the real and complex cases since <InlineMath math="\mathbb{H}" /> inherits the Euclidean norm from <InlineMath math="\mathbb{R}^4" />.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">The Problem of Directional Derivatives</h4>
              <p className="text-sm md:text-base mb-4">
                In complex analysis, differentiability implies holomorphicity, but in quaternions, multiplication is <strong>non-commutative</strong>. Thus, a naive limit definition of the derivative can depend on the direction from which <InlineMath math="q" /> approaches <InlineMath math="q_0" />:
              </p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="\lim_{h \to 0} \frac{f(q_0 + h) - f(q_0)}{h}" />
              </div>
              <p className="text-sm md:text-base mb-4">may differ from</p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="\lim_{h \to 0} (f(q_0 + h) - f(q_0))h^{-1}." />
              </div>
              <p className="text-sm md:text-base mb-4">
                These are known respectively as <strong>left</strong> and <strong>right derivatives</strong>. In general, both need not exist, and if they do, they may not coincide.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm md:text-base font-semibold mb-2">Key challenge:</p>
                <p className="text-sm md:text-base">In quaternionic calculus, differentiability must respect orientation and rotation. We need a new notion of regularity that is invariant across all quaternionic "slices" <InlineMath math="\mathbb{C}_\mathbf{u}" />.</p>
              </div>
            </div>
          </section>

          {/* Section 4.2 */}
          <section className="mb-12">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-900 mb-6">4.2 Slice Regular Functions</h2>

            <p className="text-sm md:text-base mb-4">
              To overcome non-commutativity, researchers Cullen (1965) and later Gentili & Struppa (2006) developed the concept of <strong>slice-regularity</strong>, which generalizes holomorphic functions from <InlineMath math="\mathbb{C}" /> to <InlineMath math="\mathbb{H}" />.
            </p>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Definition 4.2 (Slice Regular Function)</h4>
              <p className="text-sm md:text-base mb-4">
                Let <InlineMath math="\Omega \subseteq \mathbb{H}" /> be a domain symmetric with respect to the real axis. A function <InlineMath math="f: \Omega \to \mathbb{H}" /> is <em>left slice-regular</em> if, for every imaginary unit <InlineMath math="\mathbf{u} \in S^2" />, the restriction <InlineMath math="f_\mathbf{u}" /> of <InlineMath math="f" /> to the complex plane <InlineMath math="\mathbb{C}_\mathbf{u} = \{x + \mathbf{u}y : x,y \in \mathbb{R}\}" /> is holomorphic, i.e.
              </p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="\frac{\partial f_\mathbf{u}}{\partial x} + \mathbf{u}\frac{\partial f_\mathbf{u}}{\partial y} = 0." />
              </div>
              <p className="text-sm md:text-base mb-4">
                This means <InlineMath math="f" /> behaves as an analytic function in every complex slice of <InlineMath math="\mathbb{H}" />. Analogously, <em>right slice-regular</em> functions satisfy <InlineMath math="\frac{\partial f_\mathbf{u}}{\partial x} + \frac{\partial f_\mathbf{u}}{\partial y}\mathbf{u} = 0" />.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm md:text-base font-semibold mb-2">Intuition:</p>
                <p className="text-sm md:text-base">Slice-regular functions are quaternionic functions whose restriction to any plane of the form <InlineMath math="\mathbb{C}_\mathbf{u}" /> behaves like a complex analytic function. Thus, <InlineMath math="\mathbb{H}" /> is viewed as a bundle of complex planes indexed by <InlineMath math="\mathbf{u} \in S^2" />.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Examples</h4>
              <ol className="list-decimal ml-4 md:ml-6 lg:ml-8 space-y-3 mb-4 text-sm md:text-base">
                <li><InlineMath math="f(q) = q^n" /> is slice-regular for all integers <InlineMath math="n \ge 0" />.</li>
                <li><InlineMath math="f(q) = e^q = \sum_{n=0}^\infty \frac{q^n}{n!}" /> is slice-regular everywhere on <InlineMath math="\mathbb{H}" />.</li>
                <li><InlineMath math="f(q) = (q - a)^{-1}" /> is slice-regular on <InlineMath math="\mathbb{H} \setminus \{a\}" />.</li>
              </ol>
            </div>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Theorem 4.3 (Representation Formula)</h4>
              <p className="text-sm md:text-base mb-4">
                For slice-regular <InlineMath math="f" /> on a domain symmetric in <InlineMath math="\mathbb{H}" />, and for any <InlineMath math="q = x + \mathbf{u}y" />:
              </p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="f(q) = \frac{1}{2}[f(x + iy) + f(x - iy)] + \frac{\mathbf{u}i}{2}[f(x - iy) - f(x + iy)]." />
              </div>
              <p className="text-sm md:text-base mb-4">
                This formula reconstructs <InlineMath math="f" /> on every quaternionic slice from its values on the complex plane <InlineMath math="\mathbb{C}_i" />.
              </p>
            </div>
          </section>

          {/* Section 4.3 */}
          <section className="mb-12">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-900 mb-6">4.3 The Quaternionic Cauchy Integral Formula and Residues</h2>

            <p className="text-sm md:text-base mb-4">
              Just as in complex analysis, slice-regular functions satisfy powerful integral theorems that connect boundary integrals to function values.
            </p>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Theorem 4.4 (Quaternionic Cauchy Integral Formula)</h4>
              <p className="text-sm md:text-base mb-4">
                Let <InlineMath math="f" /> be slice-regular on a domain <InlineMath math="\Omega \subseteq \mathbb{H}" /> with smooth boundary <InlineMath math="\partial \Omega" />. Then for all <InlineMath math="q \in \Omega" />:
              </p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="f(q) = \frac{1}{2\pi} \int_{\partial \Omega_\mathbf{u}} (s - q)^{-1} d s_\mathbf{u} f(s)," />
              </div>
              <p className="text-sm md:text-base mb-4">
                where <InlineMath math="d s_\mathbf{u} = -\mathbf{u}\,ds" /> and <InlineMath math="\Omega_\mathbf{u} = \Omega \cap \mathbb{C}_\mathbf{u}" />.
              </p>
              <p className="text-sm md:text-base mb-4">
                This formula implies that quaternionic slice-regular functions are entirely determined by their values on the boundary of any slice domain—mirroring the holomorphic case.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Residue Theory</h4>
              <p className="text-sm md:text-base mb-4">
                Singularities in quaternionic analysis behave similarly to poles in complex analysis but require care with non-commutativity. For isolated singularities, we define the <strong>residue</strong> <InlineMath math="\mathrm{Res}(f, q_0)" /> through a local Laurent expansion:
              </p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="f(q) = \sum_{n=-\infty}^\infty a_n (q - q_0)^n, \quad \mathrm{Res}(f, q_0) = a_{-1}." />
              </div>
              <p className="text-sm md:text-base mb-4">
                Residues enable computation of quaternionic contour integrals and play a role in potential theory and spectral analysis.
              </p>
            </div>
          </section>

          {/* Section 4.4 */}
          <section className="mb-12">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-900 mb-6">4.4 Gradient, Divergence, and Curl in Quaternionic Form</h2>

            <p className="text-sm md:text-base mb-4">
              The differential operators from vector calculus—gradient, divergence, and curl—can be elegantly expressed using quaternionic notation.
            </p>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Definition 4.5 (Quaternionic Differential Operator)</h4>
              <p className="text-sm md:text-base mb-4">
                Define the quaternionic differential operator (often called the <em>Dirac operator</em>):
              </p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="\nabla_q = \frac{\partial}{\partial x_0} + i\frac{\partial}{\partial x_1} + j\frac{\partial}{\partial x_2} + k\frac{\partial}{\partial x_3}." />
              </div>
              <p className="text-sm md:text-base mb-4">Its conjugate is</p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="\overline{\nabla}_q = \frac{\partial}{\partial x_0} - i\frac{\partial}{\partial x_1} - j\frac{\partial}{\partial x_2} - k\frac{\partial}{\partial x_3}." />
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Relations to Classical Vector Calculus</h4>
              <p className="text-sm md:text-base mb-4">
                For a quaternionic field <InlineMath math="F = f_0 + \mathbf{f}" /> with scalar part <InlineMath math="f_0" /> and vector part <InlineMath math="\mathbf{f}" />:
              </p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="\begin{aligned}
\nabla_q F
&= \left(\frac{\partial f_0}{\partial x_0} - \nabla \cdot \mathbf{f}\right) \\
&\quad + \left(\frac{\partial \mathbf{f}}{\partial x_0} + \nabla f_0 + \nabla \times \mathbf{f}\right).
\end{aligned}" />
              </div>
              <p className="text-sm md:text-base mb-4">
                Here, the scalar part gives the <strong>divergence</strong>, and the vector part combines the <strong>gradient</strong> and <strong>curl</strong>.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm md:text-base font-semibold mb-2">Unified Perspective:</p>
                <p className="text-sm md:text-base">Quaternionic calculus merges the equations of electromagnetism and fluid flow into one algebraic system. Maxwell's equations, for instance, can be written compactly as <InlineMath math="\nabla_q F = J" />, where <InlineMath math="F" /> is the electromagnetic field quaternion and <InlineMath math="J" /> is the current.</p>
              </div>
            </div>
          </section>

          {/* Section 4.5 */}
          <section className="mb-12">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-900 mb-6">4.5 Integral Theorems on <InlineMath math="S^3" /> and <InlineMath math="S^3 \times \mathbb{R}" /></h2>

            <p className="text-sm md:text-base mb-4">
              Integral theorems on <InlineMath math="S^3" /> generalize classical vector calculus results such as Gauss's divergence theorem and Stokes' theorem to quaternionic manifolds.
            </p>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Theorem 4.6 (Quaternionic Stokes' Theorem)</h4>
              <p className="text-sm md:text-base mb-4">
                For a quaternionic vector field <InlineMath math="F" /> on a domain <InlineMath math="V \subseteq \mathbb{H}" /> with boundary <InlineMath math="\partial V" />:
              </p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="\int_V (\nabla_q F)\,dV = \int_{\partial V} n F\,dS," />
              </div>
              <p className="text-sm md:text-base mb-4">
                where <InlineMath math="n" /> is the outward unit normal quaternion.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">Theorem 4.7 (Integration on <InlineMath math="S^3" />)</h4>
              <p className="text-sm md:text-base mb-4">
                On the 3-sphere with volume element <InlineMath math="dV = \sin^2\chi\sin\theta\,d\chi\, d\theta\, d\varphi" />:
              </p>
              <div className="overflow-x-auto">
                <PrettyBlockMath math="\int_{S^3} \nabla_q F\,dV = 0," />
              </div>
              <p className="text-sm md:text-base mb-4">
                for any smooth quaternionic field <InlineMath math="F" /> with compact support. This expresses the conservation of flux on a closed manifold.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm md:text-base font-semibold mb-2">Physical Analogy:</p>
                <p className="text-sm md:text-base">On <InlineMath math="S^3 \times \mathbb{R}" />, these theorems describe conservation of energy and momentum in quaternionic field theories—geometry enforces the laws of physics.</p>
              </div>
            </div>
          </section>

          {/* Section 4.6 */}
          <section className="mb-12">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-900 mb-6">4.6 Summary and Outlook</h2>

            <ul className="list-disc ml-4 md:ml-6 lg:ml-8 space-y-3 mb-6 text-sm md:text-base">
              <li>Differentiation in <InlineMath math="\mathbb{H}" /> must respect non-commutativity, leading to slice-regular analysis.</li>
              <li>The Cauchy integral formula generalizes elegantly, preserving analytic continuation and residue theory.</li>
              <li>Quaternionic differential operators unify gradient, divergence, and curl.</li>
              <li>Integral theorems on <InlineMath math="S^3" /> preserve conservation laws geometrically.</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm md:text-base font-semibold mb-2">Next Chapter Preview:</p>
              <p className="text-sm md:text-base">Chapter 5 introduces <strong>Spectral Theory on <InlineMath math="S^3 \times \mathbb{R}" /></strong>—where harmonic functions become eigenmodes, and quantization emerges from resonance between curvature and algebra.</p>
            </div>
          </section>

          {/* Further Reading */}
          <section className="mb-12">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-900 mb-6">Further Reading</h2>

            <ul className="list-disc ml-4 md:ml-6 lg:ml-8 space-y-2 text-sm md:text-base">
              <li>Cullen, <em>An Integral Theorem for Analytic Intrinsic Functions on Quaternions</em>, Duke Math. J. (1965).</li>
              <li>Gentili & Struppa, <em>A New Approach to Cullen-Regular Functions of a Quaternionic Variable</em>, C. R. Math. Acad. Sci. Paris (2006).</li>
              <li>Gürlebeck & Sprößig, <em>Quaternionic and Clifford Calculus for Physicists and Engineers</em>.</li>
              <li>Colombo, Sabadini & Struppa, <em>Noncommutative Functional Calculus</em>.</li>
              <li>Brackx, Delanghe & Sommen, <em>Clifford Analysis</em>.</li>
            </ul>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-6 border-t-2 border-blue-200">
          <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-sm md:text-base text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-back-to-book-bottom">
            <ArrowLeft className="w-4 h-4" />
            Back to Table of Contents
          </Link>
        </div>
      </div>
    </div>
  );
}
