import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter3Section3_4() {
  useEffect(() => {
    document.title = "Section 3.4: The Laplace-Beltrami Operator on S³ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Understand the Laplace-Beltrami operator on the 3-sphere, its eigenvalues, and the connection to spherical harmonics in quaternionic spectral geometry.";
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
            <Link href="/chapter-3-differential-geometry" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 3
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 3 · Section 3.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Laplace-Beltrami Operator on <InlineMath math="S^3" />
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Eigenvalues, spherical harmonics, and spectral structure
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The Laplacian is the central operator in analysis on Riemannian manifolds. It measures how a function differs from its average over small spheres, encodes the spectrum of vibrations, and governs heat flow. On <InlineMath math="S^3" />, the Laplace-Beltrami operator has a beautiful discrete spectrum that connects directly to the representation theory of the rotation group.
            </p>

            <p>
              This section defines the Laplacian, computes its eigenvalues and eigenfunctions (the spherical harmonics on <InlineMath math="S^3" />), and explains why the spectrum takes the form it does. This is where differential geometry meets spectral theory—the mathematical heart of quaternionic spectral geometry.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What operator tells us the natural patterns allowed by S3?"
              plainLanguageSetup="Section 3.3 supplied measurement and differentiation. The Laplace-Beltrami operator combines them into a curved-space version of the Laplacian, which detects how functions vary across S3."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\Delta f=\operatorname{div}(\nabla f),\qquad \lambda_n=n(n+2),\quad \dim E_n=(n+1)^2" />
                  <p>
                    Read <InlineMath math="\Delta f" /> as curvature-aware spreading or averaging. The eigenvalues <InlineMath math="\lambda_n" /> label the allowed harmonic levels on the 3-sphere.
                  </p>
                </>
              }
              checkpoint="Why do eigenvalues matter here?"
              revealAnswer="They identify the modes that the geometry supports naturally. Each eigenvalue level corresponds to a family of functions with the same basic oscillation scale."
              finalTakeaway="The Laplace-Beltrami operator turns S3 geometry into a spectrum of allowed harmonic patterns."
              nextStep="Section 3.5 adds integration and inner products so those modes can be normalized and compared."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Definition of the Laplace-Beltrami Operator</h2>

            <p>
              On a Riemannian manifold with metric <InlineMath math="g" />, the Laplace-Beltrami operator acts on smooth functions by:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\Delta f = \frac{1}{\sqrt{|g|}} \sum_{i,j} \partial_i \left( \sqrt{|g|} g^{ij} \partial_j f \right)" />
            </div>

            <p>
              In local coordinates, this looks complicated, but the geometric meaning is simple: <InlineMath math="\Delta f(p)" /> measures how <InlineMath math="f(p)" /> compares to the average of <InlineMath math="f" /> over small spheres centered at <InlineMath math="p" />. If <InlineMath math="f(p)" /> is larger than the nearby average, <InlineMath math="\Delta f(p)" /> is negative; if smaller, it's positive.
            </p>

            <p>
              Equivalently, the Laplacian is the trace of the Hessian, or the divergence of the gradient:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Delta f = \mathrm{div}(\nabla f) = \mathrm{tr}(\nabla^2 f)" />
            </div>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition</p>
              <p className="text-gray-700">
                Think of the Laplacian as a "smoothness detector." Eigenfunctions of the Laplacian are functions that are as smooth as possible given their frequency—they're the natural vibration modes of the manifold. On a drum, these are the overtones. On <InlineMath math="S^3" />, they're the spherical harmonics.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Spectrum on <InlineMath math="S^3" /></h2>

            <p>
              On the unit 3-sphere, the eigenvalue equation is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Delta f = -\lambda f" />
            </div>

            <p>
              The eigenvalues form a discrete sequence:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\lambda_n = n(n+2), \quad n = 0, 1, 2, 3, \ldots" />
            </div>

            <p>
              The first few eigenvalues are <InlineMath math="\lambda_0 = 0" /> (the constant functions), <InlineMath math="\lambda_1 = 3" />, <InlineMath math="\lambda_2 = 8" />, <InlineMath math="\lambda_3 = 15" />, and so on. The gap between consecutive eigenvalues grows linearly.
            </p>

            <p>
              Each eigenvalue has a specific multiplicity—the number of linearly independent eigenfunctions. For <InlineMath math="\lambda_n = n(n+2)" />, the multiplicity is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="d_n = (n+1)^2" />
            </div>

            <p>
              So the constant function is unique (multiplicity 1), the first excited level has 4 eigenfunctions, the next has 9, then 16, and so on. These multiplicities are perfect squares—a reflection of the special symmetry of <InlineMath math="S^3" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Spherical Harmonics on <InlineMath math="S^3" /></h2>

            <p>
              The eigenfunctions of the Laplacian on <InlineMath math="S^3" /> are called spherical harmonics. They generalize the familiar spherical harmonics on <InlineMath math="S^2" />, which appear in physics as the angular parts of hydrogen atom wavefunctions.
            </p>

            <p>
              On <InlineMath math="S^3" />, spherical harmonics can be constructed from homogeneous harmonic polynomials in <InlineMath math="\mathbb{R}^4" />. A polynomial <InlineMath math="P(x_0, x_1, x_2, x_3)" /> is harmonic if <InlineMath math="\Delta_{\mathbb{R}^4} P = 0" />, and homogeneous of degree <InlineMath math="n" /> if <InlineMath math="P(tx) = t^n P(x)" />. Restricting such a polynomial to <InlineMath math="S^3" /> gives a spherical harmonic.
            </p>

            <p>
              The connection to quaternions makes this particularly elegant. The spherical harmonics of degree <InlineMath math="n" /> correspond to the irreducible representation of <InlineMath math="SU(2)" /> with spin <InlineMath math="n/2" />. The multiplicity <InlineMath math="(n+1)^2" /> equals the dimension of the representation space.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                The spherical harmonics form a complete orthonormal basis for <InlineMath math="L^2(S^3)" />—the space of square-integrable functions on the 3-sphere. Any function can be expanded as a sum of spherical harmonics, just as any periodic function can be expanded as a Fourier series. This is the foundation of harmonic analysis on <InlineMath math="S^3" />.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Heat Equation Perspective</h2>

            <p>
              The Laplacian governs how heat diffuses on <InlineMath math="S^3" />. The heat equation is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\frac{\partial u}{\partial t} = \Delta u" />
            </div>

            <p>
              An initial temperature distribution <InlineMath math="u(x, 0) = f(x)" /> evolves according to:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="u(x, t) = \sum_{n=0}^{\infty} e^{-n(n+2)t} \sum_{m=1}^{(n+1)^2} a_{nm} Y_{nm}(x)" />
            </div>

            <p>
              where <InlineMath math="Y_{nm}" /> are the spherical harmonics and <InlineMath math="a_{nm}" /> are the expansion coefficients of <InlineMath math="f" />. Higher modes decay faster because they have larger eigenvalues. Over time, the temperature distribution smooths out toward the constant average.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Connection to the Casimir Operator</h2>

            <p>
              From the Lie group perspective, the Laplacian on <InlineMath math="S^3" /> is (up to a constant) the Casimir operator of <InlineMath math="SU(2)" />. The Casimir operator is a distinguished element of the universal enveloping algebra that commutes with all group elements—it's the "total angular momentum squared" in physics language.
            </p>

            <p>
              For <InlineMath math="\mathfrak{su}(2)" /> with basis <InlineMath math="i, j, k" />, the Casimir is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="C = -\frac{1}{4}(i^2 + j^2 + k^2)" />
            </div>

            <p>
              and the Laplacian equals <InlineMath math="\Delta = 4C" />. The eigenvalue <InlineMath math="n(n+2)" /> comes from <InlineMath math="4 \cdot \frac{n}{2}(\frac{n}{2} + 1) = n(n+2)" /> where <InlineMath math="\frac{n}{2}" /> is the spin quantum number.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Looking Ahead</p>
              <p className="text-gray-700">
                The spectrum of the Laplacian determines the "shape" of <InlineMath math="S^3" /> in a spectral sense. The next section introduces the volume form and integration theory, which let us compute inner products of eigenfunctions and normalize the spherical harmonics properly.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-3/section-3-3" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Section 3.3</span>
          </Link>
          <MarkCompleteButton type="section" id="section-3-4" title="Section 3.4" />
          <Link href="/chapter-3/section-3-5" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Section 3.5</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
