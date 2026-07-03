import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section6_1() {
  useEffect(() => {
    document.title = "Section 6.1: The Quaternionic Factorial Operator | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Discover how the quaternionic factorial operator extends the classical Gamma function into four-dimensional space, creating the foundation for resonance analysis.";
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
        { label: "Chapter 6", href: "/chapter-6-agqf-hub" },
        { label: "Section 6.1" }
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
            <Link href="/chapter-6-agqf-hub" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 6
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 6 · Section 6.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Quaternionic Factorial Operator
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Extending the Gamma function to four dimensions
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Every mathematician has a favorite function, and for many, that function is the factorial. The factorial of 5 is <InlineMath math="5! = 5 \times 4 \times 3 \times 2 \times 1 = 120" />—a simple enough idea. But what about the factorial of 1/2? Or the factorial of a complex number? These questions led Euler to one of mathematics' most beautiful discoveries: the Gamma function.
            </p>

            <p>
              The Gamma function <InlineMath math="\Gamma(z)" /> extends the factorial to any number, not just integers. It's the smooth curve that passes through all the factorial values: <InlineMath math="\Gamma(n+1) = n!" />. This function has become indispensable in physics, statistics, and pure mathematics. But here's a question few have asked: what happens when we extend the factorial even further—into the realm of quaternions?
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="Why introduce a quaternionic factorial after spectral theory?"
              plainLanguageSetup="Chapter 5 gave us allowed modes and spectral organization. AGQF begins by extending a familiar growth function into quaternionic coordinates, then later uses that structure to organize resonance wells."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\circledcirc(q)=\int_0^\infty e^{-x}x^q\frac{dx}{x}" />
                  <p>
                    Read this as a Gamma-style integral with a quaternionic argument. Within this model, the output carries growth and phase information together.
                  </p>
                </>
              }
              checkpoint="What problem is this section preparing us to solve?"
              revealAnswer="It sets up a quaternionic function that can later be modulated into a structured resonance landscape, rather than introducing wells without a source."
              finalTakeaway="The quaternionic factorial is the base object; AGQF will add anchors to organize spectral resonance structure."
              nextStep="Section 6.2 introduces the anchor-generating modulation that turns the base function into a well-and-barrier landscape."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Why Quaternions?</h2>

            <p>
              Quaternions are four-dimensional numbers, discovered by Hamilton in 1843. While complex numbers can be written as <InlineMath math="z = a + bi" />, quaternions have three imaginary units: <InlineMath math="q = a + bi + cj + dk" />. They famously describe rotations in three-dimensional space—your phone's orientation sensor uses them, as do spacecraft navigation systems.
            </p>

            <p>
              But quaternions are more than a tool for rotation. They form a complete number system where multiplication doesn't commute (<InlineMath math="ij \neq ji" />), creating a richer algebraic structure than complex numbers. When we ask what the factorial means in this richer space, we're asking how growth and resonance can be represented in four dimensions.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Defining the Quaternionic Factorial</h2>

            <p>
              The classical Gamma function is defined by an integral:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Gamma(z) = \int_0^\infty e^{-x} x^{z-1} dx" />
            </div>

            <p>
              This integral "weighs" powers of <InlineMath math="x" /> against exponential decay. For the quaternionic factorial, we need to generalize this to quaternionic arguments. Working along what we call the "slice coordinate" <InlineMath math="q = 1/2 + u\mathbf{I}" />, where <InlineMath math="\mathbf{I}" /> is a unit imaginary quaternion and <InlineMath math="u" /> is a real parameter, we define:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\circledcirc(q) = \int_0^\infty e^{-x} x^q \frac{dx}{x}" />
            </div>

            <p>
              This is the quaternionic factorial operator, denoted by the special symbol <InlineMath math="\circledcirc" />. It behaves like a quaternionic engine: feed in a quaternion, and out comes a new quaternion that encodes information about growth, decay, and rotation all at once.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Connection to Gamma</p>
              <p className="text-gray-700">
                In closed form, the quaternionic factorial connects directly to the classical Gamma function:
              </p>
              <div className="my-4">
                <PrettyBlockMath math="\circledcirc(q) = \mathrm{Re}\,\Gamma(3/2 + iu) + \mathbf{I}\,\mathrm{Im}\,\Gamma(3/2 + iu)" />
              </div>
              <p className="text-gray-700">
                The real and imaginary parts of the complex Gamma function become the scalar and vector parts of a quaternion—a beautiful fusion of classical analysis with four-dimensional geometry.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>What Does It Look Like?</h2>

            <p>
              Imagine graphing the quaternionic factorial as <InlineMath math="u" /> varies. The real part grows and oscillates like waves on an expanding ocean. The imaginary part spirals through phase, rotating as it grows. Together, they trace a path through four-dimensional space—a kind of resonance spiral that encodes both amplitude and phase.
            </p>

            <p>
              This dual nature—simultaneous growth and oscillation—is what makes the quaternionic factorial useful here. It measures both magnitude and orientation, like a compass paired with a speed reading.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)', borderLeft: '4px solid #1a3b47' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Interactive Visualization</p>
              <p className="text-gray-700 mb-3">
                Want to see the quaternionic factorial in action? Explore our interactive 3D visualization that shows how the operator behaves across quaternionic space:
              </p>
              <Link
                href="/quaternionic-factorial"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: '#1a3b47' }}
                data-testid="link-quaternionic-factorial-viz"
              >
                View Quaternionic Factorial Visualization →
              </Link>
            </div>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: A Multidimensional Spiral</p>
              <p className="text-gray-700">
                Think of <InlineMath math="\circledcirc(q)" /> as tracing a spiral staircase through quaternionic space. Each step up the staircase increases in magnitude (the factorial growth), but each step also rotates (the phase oscillation). This spiral is the geometric fingerprint of how energy and coherence organize themselves in four dimensions.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Foundation for What Comes Next</h2>

            <p>
              The quaternionic factorial is the raw material from which we'll build the Anchor-Generating Quaternionic Factorial, or AGQF. By modifying this operator with carefully chosen prefactors, the model creates a structured setting for discrete resonance levels.
            </p>

            <p>
              But that's for the next section. For now, appreciate what we've accomplished: we've extended one of mathematics' most important functions into a four-dimensional setting, creating an operator that captures both growth and rotation, magnitude and phase, in a single unified framework.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The quaternionic factorial <InlineMath math="\circledcirc(q)" /> is not just a generalization—it's a revelation. It shows that the factorial, far from being a mere counting function, encodes deep geometric information about how oscillations and growth interweave. This operator forms the analytic foundation for understanding resonance in quaternionic spectral geometry.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-6-agqf-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-6-1" title="Section 6.1" />

          <Link href="/chapter-6/section-6-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 6.2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
