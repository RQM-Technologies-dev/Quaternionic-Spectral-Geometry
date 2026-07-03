import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter3Section3_5() {
  useEffect(() => {
    document.title = "Section 3.5: Volume Form and Integration on S³ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn about the volume form, integration theory, and Haar measure on the 3-sphere for quaternionic spectral analysis.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 3 · Section 3.5</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Volume Form and Integration on <InlineMath math="S^3" />
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Measure theory and the Haar measure
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              To do analysis on <InlineMath math="S^3" />, we need to integrate. The volume form tells us how to measure the "size" of regions on the 3-sphere, and the total volume gives us a normalization constant for probability measures. On a Lie group like <InlineMath math="S^3" />, there's a special measure—the Haar measure—that's invariant under group multiplication. This invariance is what makes harmonic analysis work.
            </p>

            <p>
              This section constructs the volume form from the metric, computes the total volume of <InlineMath math="S^3" />, and explains the role of Haar measure in representation theory and spectral analysis.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do we average functions and compare modes on a curved group?"
              plainLanguageSetup="Section 3.4 introduced spectral modes. To make those modes useful, we need integration: a symmetry-respecting way to measure size, normalize functions, and compute inner products on S3."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\operatorname{Vol}(S^3)=2\pi^2,\qquad \langle f,h\rangle=\int_{S^3} f(q)\overline{h(q)}\,d\mu(q)" />
                  <p>
                    The volume sets the scale. The inner product integrates against Haar measure, so comparison respects the group symmetry of unit quaternions.
                  </p>
                </>
              }
              checkpoint="Why use Haar measure instead of a coordinate-dependent measure?"
              revealAnswer="Haar measure is invariant under group multiplication, so the result does not depend on an arbitrary coordinate chart or preferred orientation."
              finalTakeaway="Integration on S3 provides the measurement layer needed for normalized harmonics and spectral decompositions."
              nextStep="Section 3.6 returns from functions to paths, using geodesics and parallel transport to describe motion."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Volume Form</h2>

            <p>
              On any oriented Riemannian manifold, the metric determines a natural volume form—a way to assign a number (volume) to each region. In local coordinates <InlineMath math="(x^1, x^2, x^3)" />, the volume form is:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="dV = \sqrt{|g|} \, dx^1 \wedge dx^2 \wedge dx^3" />
            </div>

            <p>
              where <InlineMath math="|g|" /> is the determinant of the metric tensor. The wedge product <InlineMath math="\wedge" /> ensures that the form changes sign under orientation reversal and behaves correctly under coordinate changes.
            </p>

            <p>
              On <InlineMath math="S^3" /> with the round metric, the volume form is uniquely determined (up to sign) by the condition that it gives volume 1 to an orthonormal parallelepiped. In terms of quaternions, if <InlineMath math="q \in S^3" /> and <InlineMath math="e_1, e_2, e_3" /> is an orthonormal basis for <InlineMath math="T_qS^3" />, then:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="dV(e_1, e_2, e_3) = 1" />
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Computing the Total Volume</h2>

            <p>
              The total volume of the unit 3-sphere is:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\mathrm{Vol}(S^3) = \int_{S^3} dV = 2\pi^2" />
            </div>

            <p>
              This can be computed in several ways. One approach uses the fact that <InlineMath math="S^3" /> is the boundary of the 4-ball of radius 1. The volume of the 4-ball is <InlineMath math="\frac{\pi^2}{2}" />, and by the relationship between ball volume and sphere surface area, the 3-sphere has "surface area" <InlineMath math="2\pi^2" />.
            </p>

            <p>
              Another approach uses Euler angles. Parameterizing <InlineMath math="S^3" /> by angles <InlineMath math="(\psi, \theta, \phi)" /> with <InlineMath math="0 \leq \psi \leq \pi" />, <InlineMath math="0 \leq \theta \leq \pi" />, <InlineMath math="0 \leq \phi < 2\pi" />, the volume element becomes:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="dV = \frac{1}{2}\sin^2\psi \sin\theta \, d\psi \, d\theta \, d\phi" />
            </div>

            <p>
              Integrating over the full parameter range gives <InlineMath math="2\pi^2" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition</p>
              <p className="text-gray-700">
                The volume <InlineMath math="2\pi^2" /> might seem surprising—why not <InlineMath math="4\pi" /> like the 2-sphere? The pattern is that the <InlineMath math="n" />-sphere of radius 1 has volume <InlineMath math="\frac{2\pi^{(n+1)/2}}{\Gamma((n+1)/2)}" />. For <InlineMath math="n = 3" />, this gives <InlineMath math="\frac{2\pi^2}{\Gamma(2)} = 2\pi^2" />.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Haar Measure</h2>

            <p>
              On a Lie group, there's a distinguished measure called the Haar measure—the unique (up to scale) measure that's invariant under group multiplication. For <InlineMath math="S^3" />, left-invariance means:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\int_{S^3} f(pq) \, d\mu(q) = \int_{S^3} f(q) \, d\mu(q)" />
            </div>

            <p>
              for any <InlineMath math="p \in S^3" /> and integrable function <InlineMath math="f" />. This says that translating a function by left multiplication doesn't change its integral—the measure "weighs" all regions the same way, regardless of where they are.
            </p>

            <p>
              Because <InlineMath math="S^3" /> has a bi-invariant metric, the Haar measure is also right-invariant:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\int_{S^3} f(qp) \, d\mu(q) = \int_{S^3} f(q) \, d\mu(q)" />
            </div>

            <p>
              This bi-invariance is special—most Lie groups have left Haar measure different from right Haar measure. It reflects the symmetric nature of <InlineMath math="S^3" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Integration and Inner Products</h2>

            <p>
              The volume form defines an inner product on functions:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\langle f, g \rangle = \int_{S^3} \overline{f(q)} g(q) \, dV(q)" />
            </div>

            <p>
              This makes <InlineMath math="L^2(S^3)" /> into a Hilbert space—the completion of smooth functions in the norm <InlineMath math="\|f\| = \sqrt{\langle f, f \rangle}" />. The spherical harmonics form an orthonormal basis for this space.
            </p>

            <p>
              Normalization matters. If we want the spherical harmonics to be orthonormal:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\langle Y_{nm}, Y_{n'm'} \rangle = \delta_{nn'}\delta_{mm'}" />
            </div>

            <p>
              then we need to divide by appropriate constants. The standard convention normalizes so that the constant function <InlineMath math="Y_{00} = (2\pi^2)^{-1/2}" /> has unit norm.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                The Haar measure is the "fair" way to average over <InlineMath math="S^3" />. It's essential for defining expected values, computing coefficients in harmonic expansions, and proving orthogonality relations. Without it, we couldn't do probability or statistics on the group.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Integration by Parts</h2>

            <p>
              A key property of the Laplacian is that it's self-adjoint with respect to the <InlineMath math="L^2" /> inner product. This means:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\langle \Delta f, g \rangle = \langle f, \Delta g \rangle" />
            </div>

            <p>
              for smooth functions <InlineMath math="f" /> and <InlineMath math="g" />. This is the curved-space version of integration by parts, and it follows from the fact that <InlineMath math="S^3" /> has no boundary.
            </p>

            <p>
              Self-adjointness implies that eigenvalues of <InlineMath math="\Delta" /> are real and eigenfunctions for different eigenvalues are orthogonal. These are exactly the properties we need for spectral theory.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Probability Measure</h2>

            <p>
              For probabilistic applications, we often normalize the Haar measure to be a probability measure:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="d\mu = \frac{1}{2\pi^2} dV" />
            </div>

            <p>
              so that <InlineMath math="\mu(S^3) = 1" />. This is the uniform distribution on <InlineMath math="S^3" />—the distribution you get by picking a random orientation uniformly. In quaternion terms, it's the distribution of a random unit quaternion.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Looking Ahead</p>
              <p className="text-gray-700">
                With integration in hand, we can now study curves and motion on <InlineMath math="S^3" />. The next section develops geodesics—the straightest possible paths—and parallel transport, which shows how vectors change as they move along curves.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-3/section-3-4" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Section 3.4</span>
          </Link>
          <MarkCompleteButton type="section" id="section-3-5" title="Section 3.5" />
          <Link href="/chapter-3/section-3-6" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Section 3.6</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
