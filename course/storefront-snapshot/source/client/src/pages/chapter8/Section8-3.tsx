import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section8_3() {
  useEffect(() => {
    document.title = "Section 8.3: Concrete Computations and Examples | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Work through concrete computations with the quaternionic factorial operator, including basic evaluations, contour integrals, and spectral actions.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      <Breadcrumb items={[
        { label: "Learn", href: "/learn" },
        { label: "Chapter 8", href: "/chapter-8-special-functions-hub" },
        { label: "Section 8.3" }
      ]} />

      <section className="relative overflow-hidden pt-16" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(77, 154, 175, 0.4) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6">
            <Link href="/chapter-8-special-functions-hub" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 8
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 8 · Section 8.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Concrete Computations and Examples
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Putting the quaternionic factorial to work
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Theory is essential, but mathematics becomes usable through computation. In this section, we work through concrete evaluations of the quaternionic factorial operator ◎, demonstrating the techniques and patterns that emerge.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do we actually compute with the quaternionic factorial?"
              plainLanguageSetup="Section 8.2 framed ◎ as a filter. Now we slow down and evaluate it at simple inputs, then use contour and spectral forms for more advanced calculations."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\circledcirc(0)=1,\qquad \circledcirc(1/2)=\frac{\sqrt{\pi}}{2}" />
                  <p>
                    These checks anchor the operator to familiar Gamma-function values before moving to quaternionic and spectral cases.
                  </p>
                </>
              }
              checkpoint="Why start with small values before contour integrals?"
              revealAnswer="Small values verify the normalization and show that the operator agrees with classical factorial/Gamma behavior where it should."
              finalTakeaway="Concrete computations make ◎ usable: first as known values, then as an operator on spectral data."
              nextStep="Section 8.4 connects the same special-function toolkit to zeta-style spectral questions."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Basic Evaluations</h2>

            <p>
              Let's start with the simplest cases. Since <InlineMath math="\circledcirc(q) = \Gamma^\sharp(q+1)" />, we can use known values of the Gamma function.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Example: ◎(0)</p>
              <PrettyBlockMath math="\circledcirc(0) = \Gamma^\sharp(1) = \Gamma(1) = 1" />
              <p className="text-gray-700 mt-3">
                The "factorial of zero" is 1—just as <InlineMath math="0! = 1" /> in classical mathematics. This base case anchors all our computations.
              </p>
            </div>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Example: ◎(1)</p>
              <PrettyBlockMath math="\circledcirc(1) = \Gamma^\sharp(2) = \Gamma(2) = 1! = 1" />
              <p className="text-gray-700 mt-3">
                The factorial of 1 is 1. The quaternionic operator reproduces classical results at integer points.
              </p>
            </div>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)', borderLeft: '4px solid #1a3b47' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Example: ◎(1/2)</p>
              <PrettyBlockMath math="\circledcirc(1/2) = \Gamma^\sharp(3/2) = \Gamma(3/2) = \frac{1}{2}\Gamma(1/2) = \frac{\sqrt{\pi}}{2}" />
              <p className="text-gray-700 mt-3">
                Here we see π appearing naturally! The "factorial of one-half" involves the fundamental constant π through the classical identity <InlineMath math="\Gamma(1/2) = \sqrt{\pi}" /> and the recurrence <InlineMath math="\Gamma(z+1) = z\,\Gamma(z)" />.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Contour Integral Representation</h2>

            <p>
              For more sophisticated computations, we can use contour integration. When <InlineMath math="\text{Re}(q) > -1" />, the quaternionic factorial admits the representation:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\circledcirc(q) = \frac{1}{2\pi i} \oint_C t^q e^{-t} \, dt" />
            </div>

            <p>
              Here <InlineMath math="C" /> is a Hankel contour—a path that comes from <InlineMath math="+\infty" /> along the top of the positive real axis, circles the origin counterclockwise, and returns to <InlineMath math="+\infty" /> along the bottom.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why Contour Integrals?</p>
              <p className="text-gray-700">
                Contour integration allows us to extend ◎ beyond the region where the ordinary integral converges. It also reveals the pole structure: as the contour is deformed, it picks up residues at the poles of the integrand, giving us information about the singular behavior of ◎.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Spectral Action on a Gaussian</h2>

            <p>
              Let's see the spectral multiplier in action. Consider the Gaussian function:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="f(x) = e^{-x^2/2}" />
            </div>

            <p>
              When we apply the ◎-based spectral multiplier <InlineMath math="T_\circledcirc" />, each frequency component gets multiplied by the value of ◎ at that frequency. The result is a super-smooth version of the Gaussian.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>The Computation</p>
              <p className="text-gray-700 mb-3">
                The Fourier transform of the Gaussian is itself a Gaussian:
              </p>
              <PrettyBlockMath math="\hat{f}(\omega) = \sqrt{2\pi} \, e^{-\omega^2/2}" />
              <p className="text-gray-700 mt-3 mb-3">
                Applying the spectral multiplier:
              </p>
              <PrettyBlockMath math="(T_\circledcirc f)^\wedge(\omega) = \circledcirc(1/2 + i\omega) \cdot \sqrt{2\pi} \, e^{-\omega^2/2}" />
              <p className="text-gray-700 mt-3">
                The exponential decay of <InlineMath math="\circledcirc(1/2 + i\omega)" /> for large <InlineMath math="|\omega|" /> means the high-frequency components are suppressed even faster than the Gaussian itself. The result is an ultra-smooth function.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>A Quaternionic Computation</h2>

            <p>
              Now let's compute ◎ at a genuinely quaternionic point. Take <InlineMath math="q = 1 + \mathbf{i}" /> where <InlineMath math="\mathbf{i}" /> is a unit imaginary quaternion.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)', borderLeft: '4px solid #1a3b47' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Example: ◎(1 + i)</p>
              <PrettyBlockMath math="\circledcirc(1 + \mathbf{i}) = \Gamma^\sharp(2 + \mathbf{i})" />
              <p className="text-gray-700 mt-3">
                Using the slice-regular structure from Chapter 7, this can be computed as:
              </p>
              <div className="my-3">
                <PrettyBlockMath math="\circledcirc(1 + \mathbf{i}) = \text{Re}\,\Gamma(2+i) + \mathbf{i}\,\text{Im}\,\Gamma(2+i)" />
              </div>
              <p className="text-gray-700">
                where <InlineMath math="\Gamma(2+i)" /> is the classical complex Gamma function. Numerically:
              </p>
              <div className="my-3">
                <PrettyBlockMath math="\Gamma(2+i) \approx 0.6527 + 0.3430i" />
              </div>
              <p className="text-gray-700">
                So <InlineMath math="\circledcirc(1+\mathbf{i}) \approx 0.6527 + 0.3430\,\mathbf{i}" />. The quaternionic factorial of <InlineMath math="1+\mathbf{i}" /> is a quaternion with both scalar and vector parts!
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Pattern of Values</h2>

            <p>
              As we compute ◎ at more points, a beautiful pattern emerges. Along the real axis, we get the classical factorials. Along the imaginary axis, the values oscillate with decaying amplitude. In the full quaternionic space, the values trace out spiraling surfaces that encode the interplay of growth and rotation.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                Every computation with ◎ is simultaneously a computation with the classical Gamma function (via the slice-regular structure) and a computation in four-dimensional quaternionic space (via the geometric interpretation). This dual perspective—analytical and geometric—is what makes the quaternionic factorial useful. The examples in this section are checks on how the operator behaves.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-8/section-8-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 8.2
          </Link>

          <MarkCompleteButton type="section" id="section-8-3" title="Section 8.3" />

          <Link href="/chapter-8/section-8-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 8.4
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
