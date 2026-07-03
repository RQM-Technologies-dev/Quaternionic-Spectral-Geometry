import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter3Section3_7() {
  useEffect(() => {
    document.title = "Section 3.7: Summary and Outlook | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Summary of differential geometry on S³ and connections to spectral theory in quaternionic spectral geometry.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 3 · Section 3.7</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Summary and Outlook
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Connecting geometry to spectral theory
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              We've built a complete geometric picture of the 3-sphere: its manifold structure, tangent spaces, Lie group operations, metric, curvature, Laplacian, integration theory, and geodesics. Each piece fits together into a unified framework where algebra, geometry, and analysis speak the same language. This final section summarizes what we've learned and previews how it connects to spectral theory.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What geometric tools should I carry into spectral theory?"
              plainLanguageSetup="Chapter 3 started with the need for calculus on S3. The result is a toolkit for motion, measurement, differentiation, integration, and allowed harmonic behavior on the unit-quaternion state space."
              formulaRecap={
                <>
                  <PrettyBlockMath math="T_qS^3=q\,\operatorname{Im}\mathbb{H},\qquad g_q(v,w)=\mathrm{Re}(\bar v w),\qquad \lambda_n=n(n+2)" />
                  <p>
                    These formulas summarize the chapter's thread: tangent directions, metric measurement, and spectral levels all live on the same curved space.
                  </p>
                </>
              }
              checkpoint="Why does spectral theory need all this geometry first?"
              revealAnswer="Spectra come from operators, and operators depend on the manifold's tangent spaces, metric, integration rule, and curvature-aware derivatives."
              finalTakeaway="Chapter 3 turns S3 into a working analytic space, not just a rotation picture."
              nextStep="Chapter 4 uses this analytic structure to study functions of operators and variational selection of modes."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Geometric Toolkit</h2>

            <p>
              Here's what we now have available for analysis on <InlineMath math="S^3" />:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Manifold structure:</strong> <InlineMath math="S^3" /> is a compact, connected, 3-dimensional smooth manifold without boundary. It can be covered by two coordinate charts via stereographic projection.
              </li>
              <li>
                <strong>Quaternionic identification:</strong> Points of <InlineMath math="S^3" /> are unit quaternions. Multiplication gives group structure; the imaginary quaternions give the Lie algebra.
              </li>
              <li>
                <strong>Tangent spaces:</strong> At each point <InlineMath math="q" />, the tangent space <InlineMath math="T_qS^3 = q \cdot \mathrm{Im}\mathbb{H}" /> is a 3-dimensional real vector space. Tangent vectors represent infinitesimal rotations.
              </li>
              <li>
                <strong>Bi-invariant metric:</strong> The round metric <InlineMath math="g_q(v, w) = \mathrm{Re}(\bar{v}w)" /> is preserved by both left and right multiplication. It gives <InlineMath math="S^3" /> constant positive curvature <InlineMath math="K = 1" />.
              </li>
              <li>
                <strong>Levi-Civita connection:</strong> The unique torsion-free metric connection is <InlineMath math="\nabla_X Y = \frac{1}{2}[X, Y]" /> for left-invariant fields. This controls parallel transport and curvature.
              </li>
              <li>
                <strong>Laplace-Beltrami operator:</strong> The Laplacian has eigenvalues <InlineMath math="\lambda_n = n(n+2)" /> with multiplicities <InlineMath math="(n+1)^2" />. Eigenfunctions are the spherical harmonics.
              </li>
              <li>
                <strong>Volume and Haar measure:</strong> Total volume is <InlineMath math="2\pi^2" />. The normalized Haar measure is bi-invariant and defines the natural inner product on <InlineMath math="L^2(S^3)" />.
              </li>
              <li>
                <strong>Geodesics:</strong> Great circles of the form <InlineMath math="\gamma(t) = qe^{ut}" /> are the shortest paths. They have length <InlineMath math="2\pi" /> and pass through antipodal points.
              </li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Unifying Theme</p>
              <p className="text-gray-700">
                Everything on <InlineMath math="S^3" /> is controlled by the quaternionic structure. The metric comes from the quaternion norm. The Lie algebra is the imaginary quaternions. Geodesics are exponentials. The Laplacian is the Casimir operator. This unity isn't coincidental—it's the essence of why quaternionic geometry is so powerful.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Spectral Perspective</h2>

            <p>
              Spectral theory asks: what can you learn about a space from the eigenvalues of its Laplacian? On <InlineMath math="S^3" />, the spectrum is:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\mathrm{Spec}(\Delta_{S^3}) = \{n(n+2) : n = 0, 1, 2, \ldots\}" />
            </div>

            <p>
              This sequence encodes geometric information:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>The first nonzero eigenvalue <InlineMath math="\lambda_1 = 3" /> bounds the rate of heat diffusion and the mixing time of random walks.</li>
              <li>The multiplicities <InlineMath math="(n+1)^2" /> reflect the <InlineMath math="SU(2)" /> symmetry and determine the dimension of representation spaces.</li>
              <li>The growth rate <InlineMath math="\lambda_n \sim n^2" /> determines the Weyl asymptotics and the dimension of the manifold.</li>
              <li>The spacing between eigenvalues controls the behavior of wave packets and quantum revivals.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Connections to Physics</h2>

            <p>
              The geometry of <InlineMath math="S^3" /> appears throughout physics:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Quantum mechanics:</strong> The group <InlineMath math="SU(2) \cong S^3" /> is the double cover of <InlineMath math="SO(3)" /> and governs spin-1/2 particles. The spherical harmonics on <InlineMath math="S^3" /> are precisely the matrix elements of <InlineMath math="SU(2)" /> representations.
              </li>
              <li>
                <strong>Cosmology:</strong> Some cosmological models posit that space has the topology of <InlineMath math="S^3" /> or a quotient thereof. The spectrum of the cosmic microwave background would reflect this geometry.
              </li>
              <li>
                <strong>Yang-Mills theory:</strong> Instantons on <InlineMath math="S^4" /> are controlled by the geometry of <InlineMath math="S^3" /> as the boundary at infinity. The topology of <InlineMath math="S^3" /> (specifically <InlineMath math="\pi_3(S^3) = \mathbb{Z}" />) classifies these instantons.
              </li>
              <li>
                <strong>Hopf fibration:</strong> <InlineMath math="S^3" /> fibers over <InlineMath math="S^2" /> with fiber <InlineMath math="S^1" />. This structure underlies the relationship between angular momentum and magnetic monopoles.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Product Structure <InlineMath math="S^3 \times \mathbb{R}^+" /></h2>

            <p>
              For quaternionic spectral geometry, we often work on the product <InlineMath math="S^3 \times \mathbb{R}^+" />, where <InlineMath math="\mathbb{R}^+ = (0, \infty)" /> is the radial direction. A general quaternion <InlineMath math="q \neq 0" /> can be written as <InlineMath math="q = ru" /> where <InlineMath math="r = |q| \in \mathbb{R}^+" /> and <InlineMath math="u = q/|q| \in S^3" />.
            </p>

            <p>
              This decomposition separates the "angular" part (on <InlineMath math="S^3" />) from the "radial" part (on <InlineMath math="\mathbb{R}^+" />). Operators on <InlineMath math="\mathbb{H} \setminus \{0\}" /> decompose accordingly:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Delta_{\mathbb{H}} = \frac{\partial^2}{\partial r^2} + \frac{3}{r}\frac{\partial}{\partial r} + \frac{1}{r^2}\Delta_{S^3}" />
            </div>

            <p>
              The angular Laplacian <InlineMath math="\Delta_{S^3}" /> contributes the eigenvalues we've computed; the radial part controls the fall-off behavior. This separation of variables is fundamental to solving differential equations in quaternionic domains.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                The product structure lets us analyze functions on <InlineMath math="\mathbb{H}" /> by first understanding their behavior on <InlineMath math="S^3" />. The spherical harmonics become building blocks, and the radial variable handles magnitude. This is the quaternionic analog of polar coordinates for complex numbers.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Looking Forward</h2>

            <p>
              With the differential geometry of <InlineMath math="S^3" /> in hand, we're ready for the next stage of quaternionic spectral geometry. The upcoming chapters will develop:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Quaternionic calculus:</strong> Differentiation and integration of quaternion-valued functions, including the theory of slice regularity.</li>
              <li><strong>Spectral theory on <InlineMath math="S^3 \times \mathbb{R}" />:</strong> Harmonic analysis combining angular and radial variables, with applications to wave equations.</li>
              <li><strong>The anchor-generating quaternionic factorial:</strong> A special function that captures resonance structure and quantization on quaternionic domains.</li>
              <li><strong>Spectral coherence:</strong> How the geometry of <InlineMath math="S^3" /> leads to stable resonance patterns and controlled dynamics.</li>
            </ul>

            <p>
              The geometric foundation we've built—the manifold, metric, Laplacian, and integration theory—provides the setting for all this analysis. Every spectral computation rests on the structures developed in this chapter.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Takeaway</p>
              <p className="text-gray-700">
                The 3-sphere is not just a curved space—it's the natural home for rotation, spin, and orientation. Its geometry emerges inevitably from the quaternion algebra, and its spectral structure reflects the deep symmetry of three-dimensional rotation. Understanding <InlineMath math="S^3" /> is understanding the geometry of turning itself.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-3/section-3-6" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Section 3.6</span>
          </Link>
          <MarkCompleteButton type="section" id="section-3-7" title="Section 3.7" />
          <Link href="/chapter-3-differential-geometry" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-chapter">
            <span>Back to Chapter 3</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
