import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter5Section5_3() {
  useEffect(() => {
    document.title = "Section 5.3: Wigner D-Functions as Eigenfunctions | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn how Wigner D-functions serve as the building blocks of spectral decomposition on S³, connecting rotation, quantum numbers, and harmonic modes.";
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
            <Link href="/chapter-5-spectral-theory" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 5
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 5 · Section 5.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Wigner D-Functions as Eigenfunctions
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              The building blocks of spectral decomposition
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The Wigner D-functions are the workhorses of harmonic analysis on <InlineMath math="S^3" />. Named after the physicist Eugene Wigner, who introduced them in the context of quantum mechanics, these functions describe how rotations transform quantum states with definite angular momentum. On the 3-sphere, they play the same role that complex exponentials <InlineMath math="e^{in\theta}" /> play on the circle.
            </p>

            <p>
              Every function on <InlineMath math="S^3" /> can be decomposed into Wigner D-functions. Understanding them is the key to spectral analysis on the quaternionic sphere.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What are the actual building blocks in the S3 spectrum?"
              plainLanguageSetup="Section 5.2 explained why representation functions form a basis. This section names the concrete basis functions used for SU(2): Wigner D-functions, indexed by representation level and left/right behavior."
              formulaRecap={
                <>
                  <PrettyBlockMath math="D^j_{mn}:g\mapsto D^j_{mn}(g),\qquad j=0,\frac12,1,\ldots" />
                  <p>
                    The label <InlineMath math="j" /> sets the representation level, while <InlineMath math="m" /> and <InlineMath math="n" /> track how the mode transforms from the left and right.
                  </p>
                </>
              }
              checkpoint="Why are there multiple D-functions at one level j?"
              revealAnswer="A representation of level j has many matrix entries, and each entry gives a different basis function on the group."
              finalTakeaway="Wigner D-functions are the named spectral coordinates for decomposing functions on S3."
              nextStep="Section 5.4 combines these angular modes with the continuous R direction."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Definition and Notation</h2>

            <p>
              The Wigner D-function <InlineMath math="D^j_{mn}(g)" /> depends on three labels:
            </p>

            <ul className="list-none space-y-4 my-6">
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>j</span>
                <span>The representation index (a non-negative half-integer): <InlineMath math="j = 0, \frac{1}{2}, 1, \frac{3}{2}, \ldots" />. This determines the "level" or "energy" of the mode.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>m</span>
                <span>The "left" index, ranging from <InlineMath math="-j" /> to <InlineMath math="+j" /> in integer steps. This describes how the function transforms under left rotations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>n</span>
                <span>The "right" index, also ranging from <InlineMath math="-j" /> to <InlineMath math="+j" />. This describes how the function transforms under right rotations.</span>
              </li>
            </ul>

            <p>
              For each value of <InlineMath math="j" />, there are <InlineMath math="(2j+1)^2" /> distinct D-functions, one for each pair <InlineMath math="(m, n)" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: Two Kinds of Spinning</p>
              <p className="text-gray-700">
                On the 3-sphere, there are two independent ways to "spin" a function: from the left and from the right (since quaternion multiplication doesn't commute). The index <InlineMath math="m" /> tells you how the function responds to left rotation, while <InlineMath math="n" /> tells you how it responds to right rotation. Together, they completely characterize the angular behavior.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Euler Angle Parameterization</h2>

            <p>
              A useful way to write the D-functions uses Euler angles <InlineMath math="(\alpha, \beta, \gamma)" />, which parameterize a rotation as a sequence of three turns. In this parameterization:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="D^j_{mn}(\alpha, \beta, \gamma) = e^{-im\alpha} \, d^j_{mn}(\beta) \, e^{-in\gamma}" />
            </div>

            <p>
              The function <InlineMath math="d^j_{mn}(\beta)" /> is the "reduced" Wigner function that depends only on the middle Euler angle. The exponentials <InlineMath math="e^{-im\alpha}" /> and <InlineMath math="e^{-in\gamma}" /> capture the phase winding in the first and third angles.
            </p>

            <p>
              This factorized form shows how the D-function separates into phases (like ordinary Fourier modes) and a nontrivial angular part (the reduced Wigner function).
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Eigenfunctions of the Laplacian</h2>

            <p>
              The D-functions are eigenfunctions of the Laplace-Beltrami operator on <InlineMath math="S^3" />:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Delta_{S^3} D^j_{mn} = -j(j+1) D^j_{mn}" />
            </div>

            <p>
              All D-functions with the same <InlineMath math="j" /> share the same eigenvalue, regardless of <InlineMath math="m" /> and <InlineMath math="n" />. This reflects the fact that the Laplacian is invariant under rotations—it treats all directions equally. The indices <InlineMath math="m" /> and <InlineMath math="n" /> distinguish modes within the same energy level, but don't affect the eigenvalue.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Orthogonality and Completeness</h2>

            <p>
              The D-functions satisfy beautiful orthogonality relations:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\int_{S^3} D^j_{mn}(g) \overline{D^{j'}_{m'n'}(g)} \, dg = \frac{\delta_{jj'} \delta_{mm'} \delta_{nn'}}{2j+1}" />
            </div>

            <p>
              Two D-functions with different indices integrate to zero. Two with the same indices integrate to a normalization constant. This orthogonality is the foundation of spectral decomposition—it lets us extract individual modes from a superposition.
            </p>

            <p>
              Completeness means any square-integrable function on <InlineMath math="S^3" /> can be written as a sum of D-functions:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="f(g) = \sum_j (2j+1) \sum_{m,n} \hat{f}^j_{mn} D^j_{mn}(g)" />
            </div>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                The D-functions give us a complete toolkit for analyzing any function on <InlineMath math="S^3" />. They're the natural "Fourier modes" of the 3-sphere. Any wave, any field, any physical quantity defined on <InlineMath math="S^3" /> can be decomposed into these building blocks, making spectral analysis tractable.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Quaternionic Interpretation</h2>

            <p>
              When we write a point on <InlineMath math="S^3" /> as a unit quaternion <InlineMath math="q = \cos\phi + \mathbf{u}\sin\phi" />, the Wigner D-functions can be expressed through this quaternionic representation. The half-integer <InlineMath math="j" /> connects to the fact that quaternions naturally represent spin-1/2 objects—the D-functions with half-integer <InlineMath math="j" /> change sign when <InlineMath math="q" /> is replaced by <InlineMath math="-q" />.
            </p>

            <p>
              This sign behavior is the mathematical expression of spin: it distinguishes objects that need a full 720° rotation to return to their original state from those that return after 360°. The D-functions encode this deep topological property.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Relationship to Spherical Harmonics</h2>

            <p>
              The ordinary spherical harmonics <InlineMath math="Y_{\ell m}" /> on <InlineMath math="S^2" /> can be recovered from the Wigner D-functions. Specifically:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="Y_{\ell m}(\theta, \phi) = \sqrt{\frac{2\ell+1}{4\pi}} D^\ell_{m0}(\phi, \theta, 0)" />
            </div>

            <p>
              This shows that spherical harmonics are special cases of D-functions—those where the "right" index <InlineMath math="n" /> is zero. The full set of D-functions is richer because it includes all possible values of both indices.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The Wigner D-functions are the universal building blocks of spectral decomposition on <InlineMath math="S^3" />. They're eigenfunctions of the Laplacian, they form an orthonormal basis, and they encode the full rotational structure of the 3-sphere. Every spectral analysis on <InlineMath math="S^3" /> ultimately rests on these functions.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-5/section-5-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 5.2
          </Link>

          <MarkCompleteButton type="section" id="section-5-3" title="Section 5.3" />

          <Link href="/chapter-5/section-5-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 5.4
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
