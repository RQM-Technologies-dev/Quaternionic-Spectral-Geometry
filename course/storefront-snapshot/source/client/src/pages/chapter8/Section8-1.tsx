import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section8_1() {
  useEffect(() => {
    document.title = "Section 8.1: The Quaternionic Factorial Operator ◎ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Discover how the quaternionic factorial operator ◎ extends the classical Gamma function to four dimensions, becoming the central analytical tool of QSG.";
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
        { label: "Section 8.1" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 8 · Section 8.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Quaternionic Factorial Operator ◎
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              The Swiss Army knife of quaternionic analysis
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The factorial is one of the first functions we learn in mathematics. The factorial of 5 is <InlineMath math="5! = 120" />—the number of ways to arrange five distinct objects. It counts permutations, appears in combinatorics, and forms the backbone of probability theory.
            </p>

            <p>
              But what does it mean to take the factorial of a fraction? Or a complex number? Or—most ambitiously—a quaternion? These questions lead us to the quaternionic factorial operator ◎, the centerpiece of special function theory in Quaternionic Spectral Geometry.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What tool are we adding to the QSG toolbox, and what does it transform?"
              plainLanguageSetup="Chapters 6 and 7 used resonance and coherence. Chapter 8 turns to special functions and operators: tools that act on quaternionic states, spectra, and slices in controlled ways."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\circledcirc(q):=\Gamma^\sharp_{\mathbf I}(q+1)" />
                  <p>
                    Read this as a slice-regular factorial operator: it extends <InlineMath math="n!" /> by using the Gamma function on a quaternionic slice.
                  </p>
                </>
              }
              checkpoint="Why is the slice part important?"
              revealAnswer="A slice gives a complex-like plane inside H where Gamma-style analysis can be defined before the result is interpreted quaternionically."
              finalTakeaway="The quaternionic factorial is a tool for extending factorial/Gamma behavior into the coordinate system used throughout QSG."
              nextStep="Section 8.2 reads this operator as a spectral multiplier tied to pi and half-integer Gamma values."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>From Counting to Continuous</h2>

            <p>
              Euler discovered that the factorial can be extended beyond integers through the Gamma function:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Gamma(z) = \int_0^\infty e^{-x} x^{z-1} dx" />
            </div>

            <p>
              This integral converges for any complex number with positive real part, and it satisfies <InlineMath math="\Gamma(n+1) = n!" /> for positive integers. The Gamma function is the unique "smooth interpolation" of the factorial that also satisfies the functional equation <InlineMath math="\Gamma(z+1) = z\,\Gamma(z)" />.
            </p>

            <p>
              The quaternionic factorial operator ◎ takes this one step further. It extends the Gamma function to quaternionic arguments, opening up a four-dimensional playground for factorial-like analysis.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Definition</h2>

            <p>
              On a slice <InlineMath math="\mathbb{C}_\mathbf{I}" /> (the complex plane determined by a unit imaginary quaternion <InlineMath math="\mathbf{I}" />), we define:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\circledcirc(q) := \Gamma^\sharp_\mathbf{I}(q + 1)" />
            </div>

            <p>
              Here, <InlineMath math="\Gamma^\sharp_\mathbf{I}" /> denotes the slice-regular extension of the classical Gamma function to the slice. The shift by 1 in the argument means that <InlineMath math="\circledcirc(n) = n!" /> for non-negative integers, matching our intuition that the "quaternionic factorial of n" should give n factorial.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why "Swiss Army Knife"?</p>
              <p className="text-gray-700">
                The operator ◎ earns its nickname because it does so many things:
              </p>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>• <strong>Generalizes factorials:</strong> <InlineMath math="\circledcirc(n) = n!" /> for integers</li>
                <li>• <strong>Connects to π:</strong> <InlineMath math="\circledcirc(1/2)" /> involves <InlineMath math="\sqrt{\pi}" /></li>
                <li>• <strong>Creates spectral filters:</strong> Its values multiply frequency components</li>
                <li>• <strong>Links to zeta:</strong> Integral connections to Riemann's zeta function</li>
                <li>• <strong>Preserves slice-regularity:</strong> Analytical power from Chapter 7</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Key Properties</h2>

            <p>
              The quaternionic factorial inherits the essential structure of the Gamma function while gaining new quaternionic features:
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)', borderLeft: '4px solid #1a3b47' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Integral Representation</p>
              <PrettyBlockMath math="\circledcirc(q) = \int_0^{\infty} e^{-x} x^q \, dx" />
              <p className="text-gray-700 mt-3">
                This integral converges whenever the real part of <InlineMath math="q" /> exceeds <InlineMath math="-1" />. The exponential decay of <InlineMath math="e^{-x}" /> tames the growth of <InlineMath math="x^q" />, producing a well-defined quaternionic result.
              </p>
            </div>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Shift Relation (Recurrence)</p>
              <PrettyBlockMath math="\circledcirc(q + 1) = (q + 1) \circledcirc(q)" />
              <p className="text-gray-700 mt-3">
                This is the quaternionic version of <InlineMath math="n! = n \cdot (n-1)!" />. It shows that the factorial structure—each value determined by multiplying the previous by an incrementing factor—survives in the quaternionic setting.
              </p>
            </div>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Classical Connection</p>
              <PrettyBlockMath math="\circledcirc(n) = n! \quad \text{for } n = 0, 1, 2, 3, \ldots" />
              <p className="text-gray-700 mt-3">
                At integer points, the quaternionic factorial reduces to the classical factorial. This ensures backward compatibility—all the combinatorial interpretations of <InlineMath math="n!" /> remain valid within the quaternionic framework.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>An Analogy: Factorial as "Arrangement Space"</h2>

            <p>
              Think of <InlineMath math="n!" /> as measuring the "size" of the space of all arrangements of <InlineMath math="n" /> objects. When we extend to quaternions, we're asking: how does this "arrangement space" look when the number of objects itself becomes a four-dimensional quantity?
            </p>

            <p>
              The answer is that the space develops structure—oscillations, phases, and resonances that don't appear in the purely real case. The quaternionic factorial captures all this structure in a single operator, encoding both the "how many" (magnitude) and "which direction" (phase) aspects of arrangement counting.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The quaternionic factorial ◎ is not merely a technical generalization—it reveals that factorials encode geometric information. The smooth interpolation between integer factorials carries the signature of rotations, phases, and spectral structure that become visible only in the quaternionic setting. This is the foundation upon which all the special function theory of QSG is built.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-8-special-functions-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-8-1" title="Section 8.1" />

          <Link href="/chapter-8/section-8-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 8.2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
