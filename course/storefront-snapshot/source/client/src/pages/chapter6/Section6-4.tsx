import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section6_4() {
  useEffect(() => {
    document.title = "Section 6.4: The Anchor Potential | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Understand the energy landscape that governs stability in quaternionic space—peaks that repel and valleys that attract quantum states.";
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
        { label: "Section 6.4" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 6 · Section 6.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Anchor Potential
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Translating geometry into energy landscapes
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              We've mapped out the lattice of zeros and wells that the AGQF creates in quaternionic space. But to truly understand how physical systems behave in this landscape, we need to translate our geometric picture into the language of energy. That's where the anchor potential comes in.
            </p>

            <p>
              In classical mechanics, a potential energy function tells you where a ball will roll: downhill toward valleys (low potential) and away from peaks (high potential). The anchor potential does the same thing for quantum states in the AGQF framework—it describes where coherent states are attracted and where they're repelled.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do AGQF wells become an energy-like landscape?"
              plainLanguageSetup="Section 6.3 located zeros and wells. The anchor potential translates that geometry into a scalar landscape so we can talk about low-potential wells and high-potential barriers."
              formulaRecap={
                <>
                  <PrettyBlockMath math="U_{\mathrm{anchor}}(u)=-\beta\log\!\left[\sin^m\!\left(\frac{\pi u^2}{2}\right)+\delta\right]" />
                  <p>
                    The logarithm turns the multiplicative prefactor into an additive potential. The small <InlineMath math="\delta" /> regularizes the expression near zeros.
                  </p>
                </>
              }
              checkpoint="What does a low value of the anchor potential mean in this model?"
              revealAnswer="It marks a well region where coherent structure is favored relative to nearby high-potential barrier regions."
              finalTakeaway="The anchor potential gives the AGQF landscape a readable energy-like form while staying tied to the sine-prefactor structure."
              nextStep="Section 6.5 explains how confinement within those wells leads to discrete allowed structure."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Defining the Anchor Potential</h2>

            <p>
              The anchor potential <InlineMath math="U_{\mathrm{anchor}}(u)" /> is constructed from the sine prefactor by taking its logarithm and flipping the sign:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.15)' }}>
              <PrettyBlockMath math="U_{\mathrm{anchor}}(u) = -\beta \log\!\left[\sin^m\!\left(\frac{\pi u^2}{2}\right) + \delta\right]" />
            </div>

            <p>
              Let's understand each piece:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-4">
              <li>
                <strong>The depth parameter <InlineMath math="\beta" /></strong>: This positive constant controls the overall strength of the potential. Larger <InlineMath math="\beta" /> means deeper wells and higher barriers.
              </li>
              <li>
                <strong>The regularization <InlineMath math="\delta" /></strong>: A small positive constant (like <InlineMath math="10^{-6}" />) that prevents the logarithm from diverging to negative infinity at the zeros. It acts like a mathematical safety net.
              </li>
              <li>
                <strong>The negative sign</strong>: This flips the logarithm so that where the sine is small (near zeros), the potential is large, and where the sine is large (at wells), the potential is low.
              </li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why the Logarithm?</p>
              <p className="text-gray-700">
                The logarithm transforms the multiplicative structure of the sine prefactor into an additive potential. In physics, energies add—if you stack two systems, their energies combine. The logarithm ensures our potential obeys this additive property, making it physically natural.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Shape of the Landscape</h2>

            <p>
              Let's trace what happens as we move along the <InlineMath math="u" />-axis:
            </p>

            <p>
              <strong>At the zeros</strong> (where <InlineMath math="u^2 = 2k" />): The sine function vanishes, so <InlineMath math="\sin^m \to 0" />. The argument of the logarithm approaches <InlineMath math="\delta" />, which is tiny. Therefore:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="U_{\mathrm{anchor}}(u) \to -\beta \log(\delta) \to +\infty" />
            </div>

            <p>
              The potential shoots up to infinity—these are <strong>impenetrable walls</strong>. No finite-energy system can exist here.
            </p>

            <p>
              <strong>At the well centers</strong> (where <InlineMath math="u^2 = 2k + 1" />): The sine function reaches its maximum value of 1. Therefore:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="U_{\mathrm{anchor}}(u) \to -\beta \log(1 + \delta) \approx -\beta \delta \approx 0" />
            </div>

            <p>
              The potential reaches its minimum—these are the <strong>stable valleys</strong> where systems want to settle.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>A Mountain Range</p>
              <p className="text-gray-700">
                Imagine walking through a mountain range. Every so often, you encounter an infinitely tall, impassable peak (at <InlineMath math="u^2 = 2k" />). Between peaks are valleys (at <InlineMath math="u^2 = 2k + 1" />) where you can rest. You can wander within a valley, but you can never cross a peak to reach the next valley without quantum tunneling—and even that is suppressed when <InlineMath math="m" /> is large.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Role of Parameters</h2>

            <p>
              The anchor potential has two key tunable parameters:
            </p>

            <p>
              <strong>The null order <InlineMath math="m" /></strong> (from the sine prefactor): Higher <InlineMath math="m" /> makes the barriers more abrupt. When <InlineMath math="m = 2" />, the potential rises smoothly toward the peaks. When <InlineMath math="m = 6" /> or <InlineMath math="8" />, the rise is much steeper, creating sharper confinement.
            </p>

            <p>
              <strong>The depth <InlineMath math="\beta" /></strong>: Larger <InlineMath math="\beta" /> deepens the wells and raises the barriers. This controls the overall "energy scale" of the potential. In physical applications, <InlineMath math="\beta" /> relates to the fundamental energy unit of the system.
            </p>

            <p>
              Together, <InlineMath math="m" /> and <InlineMath math="\beta" /> let us model a wide range of physical scenarios, from loosely bound molecular orbitals to tightly confined atomic states.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Physical Interpretation</h2>

            <p>
              The anchor potential isn't just a mathematical convenience—it has direct physical meaning. Consider an electron in an atom. The electron doesn't wander freely; it's confined to specific orbitals by the electric potential of the nucleus. The anchor potential plays an analogous role in quaternionic geometry: it confines coherent states to specific resonance wells.
            </p>

            <p>
              But there's a crucial difference. In ordinary quantum mechanics, the potential is imposed by external forces (like the electric field of a nucleus). In the AGQF framework, the potential <em>emerges from geometry itself</em>. The sine prefactor encodes the natural resonance structure of quaternionic space, and the anchor potential simply translates that structure into energy language.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Emergent Confinement</p>
              <p className="text-gray-700">
                In this view, particles aren't confined by external forces acting upon them. They're confined by the geometry of the space they live in. The anchor potential reveals this geometric confinement—it's the shape of quaternionic space itself, expressed in the language of energy.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Local Approximation Near a Well</h2>

            <p>
              Near the center of each well, the potential looks approximately harmonic. Expanding around <InlineMath math="u^2 = 2k + 1" />, we find:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="U_{\mathrm{anchor}}(u) \approx U_0 + \frac{1}{2} \kappa (u - u_k)^2 + \ldots" />
            </div>

            <p>
              where <InlineMath math="u_k = \sqrt{2k+1}" /> is the well center, <InlineMath math="U_0" /> is the well depth, and <InlineMath math="\kappa" /> is an effective "spring constant" that depends on <InlineMath math="m" /> and <InlineMath math="\beta" />.
            </p>

            <p>
              This harmonic approximation connects the AGQF to familiar physics. Near each well center, a system behaves like a quantum harmonic oscillator—the most well-studied system in quantum mechanics. The discrete energy levels of the oscillator arise naturally from this local parabolic shape.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Complete Picture</h2>

            <p>
              The anchor potential completes our translation from geometry to physics:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-4">
              <li>The <strong>sine prefactor</strong> creates the lattice of zeros and wells.</li>
              <li>The <strong>anchor potential</strong> translates this lattice into an energy landscape.</li>
              <li><strong>Infinite barriers</strong> at <InlineMath math="u^2 = 2k" /> separate the wells.</li>
              <li><strong>Energy minima</strong> at <InlineMath math="u^2 = 2k + 1" /> define stable states.</li>
              <li><strong>Harmonic behavior</strong> near well centers connects to standard quantum mechanics.</li>
            </ul>

            <p>
              In the next section, we'll see how confinement within these wells supports discrete allowed structure and how the model relates geometric spacing to physical energy scales.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The anchor potential <InlineMath math="U_{\mathrm{anchor}}(u)" /> is the energy landscape of quaternionic space. Its infinite peaks at <InlineMath math="u^2 = 2k" /> forbid continuous motion; its valleys at <InlineMath math="u^2 = 2k + 1" /> attract stable states. This potential doesn't come from external forces—it's the natural expression of geometric resonance, revealing that space itself has structure that confines and quantizes.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-6/section-6-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 6.3
          </Link>

          <MarkCompleteButton type="section" id="section-6-4" title="Section 6.4" />

          <Link href="/chapter-6/section-6-5" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 6.5
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
