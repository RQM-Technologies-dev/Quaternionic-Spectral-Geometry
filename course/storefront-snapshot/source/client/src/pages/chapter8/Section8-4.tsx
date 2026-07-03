import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section8_4() {
  useEffect(() => {
    document.title = "Section 8.4: Connections to ζ and Euler Products | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Discover the surprising connections between the quaternionic factorial, Riemann's zeta function, and prime numbers through Euler products.";
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
        { label: "Section 8.4" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 8 · Section 8.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Connections to ζ and Euler Products
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              From factorials to prime numbers
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              One of the most unexpected discoveries in mathematics is the connection between smooth, continuous functions like the Gamma function and the discrete, arithmetical world of prime numbers. The Riemann zeta function <InlineMath math="\zeta(s)" /> is the bridge between these worlds—and the quaternionic factorial ◎ crosses that bridge.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How does the special-function toolbox connect Gamma, zeta, and spectral structure?"
              plainLanguageSetup="Section 8.3 made ◎ computable. This section uses the classical Gamma-zeta relationship as a bridge to spectral arithmetic questions, while keeping the quaternionic extension tied to slice-regular analysis."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\Gamma(s)\zeta(s)=\int_0^\infty\frac{x^{s-1}}{e^x-1}\,dx,\qquad \circledcirc(q-1)\zeta^\sharp(q)=\int_0^\infty\frac{x^{q-1}}{e^x-1}\,dx" />
                  <p>
                    The first identity is classical. The second is the quaternionic-slice version used as a QSG modeling tool.
                  </p>
                </>
              }
              checkpoint="What should we be careful not to overclaim from this connection?"
              revealAnswer="The identities provide a structured bridge between special functions and spectral analysis; they do not by themselves prove unresolved number-theory claims."
              finalTakeaway="Chapter 8 closes by treating special functions as tools that transform and organize spectral information."
              nextStep="Chapter 9 moves from operators to implementation: simulation, visualization, and computational diagnostics."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The ◎-ζ Integral</h2>

            <p>
              The Riemann zeta function is defined by the series:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\zeta(s) = \sum_{n=1}^\infty \frac{1}{n^s}" />
            </div>

            <p>
              There is a classical integral representation connecting Γ and ζ:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\Gamma(s)\zeta(s) = \int_0^\infty \frac{x^{s-1}}{e^x - 1} \, dx" />
            </div>

            <p>
              This identity says that the product of the factorial and zeta can be computed as a single integral. In the quaternionic setting, this becomes:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)' }}>
              <PrettyBlockMath math="\circledcirc(q-1) \cdot \zeta^\sharp(q) = \int_0^\infty \frac{x^{q-1}}{e^x - 1} \, dx" />
            </div>

            <p>
              where <InlineMath math="\zeta^\sharp" /> denotes the slice-regular extension of the zeta function.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                The integral on the right involves the Bose-Einstein distribution <InlineMath math="1/(e^x-1)" />, which describes how bosons (like photons) distribute across energy levels. The connection between ◎, ζ, and quantum statistics gives this operator a useful spectral interpretation.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Euler Products and Prime Numbers</h2>

            <p>
              Euler's greatest insight was that the zeta function encodes information about prime numbers through its product formula:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)' }}>
              <PrettyBlockMath math="\zeta(s) = \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}}" />
            </div>

            <p>
              Each prime contributes one factor to this infinite product. The convergence of the product is equivalent to the convergence of the series definition of ζ, and the locations of ζ's zeros determine how primes are distributed among the integers.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Factorial Connection</p>
              <p className="text-gray-700">
                Through the ◎-ζ integral, the quaternionic factorial inherits connections to prime-number structure. Studying how ◎ behaves at specific quaternionic values gives a way to organize questions that are also present in zeta analysis.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Functional Equation</h2>

            <p>
              Both Γ and ζ satisfy remarkable functional equations—relations that connect their values at <InlineMath math="s" /> to their values at <InlineMath math="1-s" />. The completed zeta function:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\xi(s) = \pi^{-s/2} \Gamma(s/2) \zeta(s)" />
            </div>

            <p>
              satisfies <InlineMath math="\xi(s) = \xi(1-s)" />. This beautiful symmetry about the line <InlineMath math="\text{Re}(s) = 1/2" /> is at the heart of the Riemann Hypothesis—the most famous unsolved problem in mathematics.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)', borderLeft: '4px solid #1a3b47' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Quaternionic Perspective</p>
              <p className="text-gray-700">
                In QSG, the critical line <InlineMath math="\text{Re}(s) = 1/2" /> has a geometric interpretation: it's the slice where the quaternionic structure exhibits special symmetry. The functional equation becomes a statement about how the quaternionic factorial and zeta respect the geometry of the 3-sphere. Whether this geometric viewpoint will eventually illuminate the Riemann Hypothesis remains one of the tantalizing open questions in the field.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Exercises</h2>

            <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.05)', border: '1px solid rgba(77, 154, 175, 0.3)' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Exercise 8.1</p>
              <p className="text-gray-700">
                Verify that <InlineMath math="\circledcirc(2) = 2" /> using both the definition <InlineMath math="\circledcirc(q) = \Gamma^\sharp(q+1)" /> and the recurrence relation <InlineMath math="\circledcirc(q+1) = (q+1)\circledcirc(q)" />.
              </p>
            </div>

            <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.05)', border: '1px solid rgba(77, 154, 175, 0.3)' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Exercise 8.2</p>
              <p className="text-gray-700">
                Show that <InlineMath math="\circledcirc(-1/2) = -2\sqrt{\pi}" /> by using the reflection formula for the Gamma function.
              </p>
            </div>

            <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.05)', border: '1px solid rgba(77, 154, 175, 0.3)' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Exercise 8.3</p>
              <p className="text-gray-700">
                Consider the spectral multiplier <InlineMath math="T_\circledcirc" /> acting on the function <InlineMath math="f(x) = \sin(x)" />. Describe qualitatively how the result differs from the original sine wave.
              </p>
            </div>

            <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.05)', border: '1px solid rgba(77, 154, 175, 0.3)' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Exercise 8.4</p>
              <p className="text-gray-700">
                Using the integral representation of the ◎-ζ product, show that <InlineMath math="\circledcirc(1)\zeta(2) = \pi^2/6" /> by evaluating the integral directly.
              </p>
            </div>

            <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.05)', border: '1px solid rgba(77, 154, 175, 0.3)' }}>
              <p className="font-semibold mb-3" style={{ color: '#1a3b47' }}>Exercise 8.5 (Challenge)</p>
              <p className="text-gray-700">
                Investigate the behavior of <InlineMath math="\circledcirc(1/2 + it)" /> as <InlineMath math="t" /> increases from 0 to 10. Plot the real and imaginary parts and describe the oscillation pattern you observe.
              </p>
            </div>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The connection between ◎ and ζ shows that the quaternionic factorial can be studied alongside number-theoretic structures. The same operator used for smoothing and spectral filtering also participates in identities related to the zeta function.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-8/section-8-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 8.3
          </Link>

          <MarkCompleteButton type="section" id="section-8-4" title="Section 8.4" />

          <Link href="/chapter-8-special-functions-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>
        </div>
      </section>
    </div>
  );
}
