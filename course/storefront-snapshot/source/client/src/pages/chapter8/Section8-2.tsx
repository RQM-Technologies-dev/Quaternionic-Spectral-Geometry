import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section8_2() {
  useEffect(() => {
    document.title = "Section 8.2: Relations to π, Γ(½), and Spectral Multipliers | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore how the quaternionic factorial connects to π, the half-integer Gamma function, and transforms into spectral multipliers for filtering.";
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
        { label: "Section 8.2" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 8 · Section 8.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Relations to π, Γ(½), and Spectral Multipliers
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Fundamental constants and the spectral filter perspective
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              One of the most beautiful identities in mathematics is Euler's discovery that <InlineMath math="\Gamma(1/2) = \sqrt{\pi}" />. This equation connects the discrete world of factorials to the continuous world of circles and geometry. In the quaternionic setting, this connection is not only preserved—it becomes a structural principle.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How does the factorial operator become a spectral filter?"
              plainLanguageSetup="Section 8.1 introduced ◎ as a quaternionic factorial. This section shows how special values and spectral multipliers turn it into a tool that changes modes rather than just evaluating numbers."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\Gamma^\sharp_{\mathbf I}(1/2)^2=\pi,\qquad (T_\circledcirc f)^\wedge(\ell,\omega)=\circledcirc(1/2+i\omega)\hat f(\ell,\omega)" />
                  <p>
                    The first formula preserves the classical half-Gamma relation. The second says the operator acts by multiplying each spectral coefficient.
                  </p>
                </>
              }
              checkpoint="What does a spectral multiplier do?"
              revealAnswer="It leaves the mode labels in place but changes each coefficient by a prescribed factor, much like a filter changes frequency bands."
              finalTakeaway="The quaternionic factorial becomes operational when read as a mode-by-mode spectral filter."
              nextStep="Section 8.3 works through concrete evaluations so the tool becomes computable."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Link to π</h2>

            <p>
              On any slice <InlineMath math="\mathbb{C}_\mathbf{I}" />, the slice-regular Gamma function satisfies:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\Gamma^\sharp_\mathbf{I}(1/2)^2 = \pi" />
            </div>

            <p>
              This means that squaring the half-integer quaternionic Gamma gives exactly π—no approximation, no error. The appearance of π here links circular geometry to the structure of the factorial function.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why Does π Appear?</p>
              <p className="text-gray-700">
                The connection comes from the integral representation. When you compute <InlineMath math="\Gamma(1/2)" />, you're evaluating <InlineMath math="\int_0^\infty e^{-x} x^{-1/2} dx" />. This integral is secretly a Gaussian integral in disguise—and Gaussian integrals always produce π. The quaternionic extension preserves this beautiful accident of calculus.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Spectral Multiplier Form</h2>

            <p>
              Perhaps the most powerful application of ◎ comes from viewing it as a spectral multiplier. In the language of Chapter 3's harmonic analysis, the operator <InlineMath math="T_\circledcirc" /> corresponding to ◎ acts on functions by:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)' }}>
              <PrettyBlockMath math="(T_\circledcirc f)^\wedge(\ell, \omega) = \circledcirc(1/2 + i\omega) \, \hat{f}(\ell, \omega)" />
            </div>

            <p>
              What does this mean? When you apply <InlineMath math="T_\circledcirc" /> to a function, it goes to the spectral domain (via the quaternionic Fourier transform), multiplies each frequency component by <InlineMath math="\circledcirc(1/2 + i\omega)" />, and transforms back. This is exactly how filters work in signal processing!
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Analogy: An Audio Equalizer</p>
              <p className="text-gray-700">
                Think of <InlineMath math="T_\circledcirc" /> like an audio equalizer that adjusts different frequencies of a sound. Low frequencies (small <InlineMath math="\omega" />) pass through with little change, while high frequencies (large <InlineMath math="\omega" />) are dramatically reduced. The "shape" of this adjustment is determined by the values of the quaternionic factorial along the imaginary axis.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>◎-Based Smoothing</h2>

            <p>
              A crucial property of the Gamma function is its rapid decay in the imaginary direction:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="|\Gamma(1/2 + i\omega)| \sim \sqrt{2\pi} \, e^{-\pi|\omega|/2} \quad \text{as } |\omega| \to \infty" />
            </div>

            <p>
              This exponential decay makes <InlineMath math="T_\circledcirc" /> an extraordinarily effective smoothing operator. High-frequency oscillations are not just reduced—they're exponentially suppressed. This makes ◎-based filtering a "super-smooth" low-pass filter, gentler than any polynomial filter but more aggressive than most exponential ones.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Physical Interpretation</p>
              <p className="text-gray-700">
                In physics, this smoothing has a natural interpretation: the quaternionic factorial filter removes high-frequency noise while preserving the harmonic structure encoded in the Gamma function's poles and zeros. It's like having a filter that "knows" about the natural resonances of the system and protects them while cleaning up everything else.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Pole Structure</h2>

            <p>
              The Gamma function has poles (points where it blows up to infinity) at non-positive integers: <InlineMath math="0, -1, -2, -3, \ldots" /> This structure is inherited by ◎, and it creates a "spectral ladder" of singular points that can be used to construct solutions to differential equations.
            </p>

            <p>
              When you apply spectral multipliers based on ◎, these poles act as "resonance points" where certain frequency components are amplified while others are suppressed. This is the analytical manifestation of the quantization we saw in Chapter 6—discrete special values emerging from continuous geometry.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)', borderLeft: '4px solid #1a3b47' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The quaternionic factorial is simultaneously a number (when evaluated at specific points), a function (when viewed as depending on a quaternionic variable), and an operator (when used as a spectral multiplier). This triple nature makes it incredibly versatile: the same mathematical object serves for computation, analysis, and filtering—all unified through the geometry of quaternionic space.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-8/section-8-1" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 8.1
          </Link>

          <MarkCompleteButton type="section" id="section-8-2" title="Section 8.2" />

          <Link href="/chapter-8/section-8-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 8.3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
