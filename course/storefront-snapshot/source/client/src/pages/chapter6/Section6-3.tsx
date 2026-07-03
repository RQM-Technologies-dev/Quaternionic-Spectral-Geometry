import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section6_3() {
  useEffect(() => {
    document.title = "Section 6.3: The Sine-Prefactor Lattice | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore the periodic structure of zeros and wells that creates nature's harmonic ladder of allowed quantum states.";
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
        { label: "Section 6.3" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 6 · Section 6.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Sine-Prefactor Lattice
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Zero boundaries and the geometry of allowed states
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              We've seen that the AGQF introduces a sine prefactor <InlineMath math="\sin^m(\pi u^2 / 2)" /> that modulates the quaternionic factorial. But where exactly does this prefactor vanish? And what happens between those vanishing points? These questions lead us to one of the most beautiful structures in quaternionic spectral geometry: the lattice of zeros and wells.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="Where do AGQF wells and barriers come from?"
              plainLanguageSetup="Section 6.2 defined the anchor prefactor. This section reads its zeros as boundaries and the intervals between them as candidate resonance wells."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\sin^m\!\left(\frac{\pi u^2}{2}\right)=0\quad\Longleftrightarrow\quad u^2=2k" />
                  <p>
                    The zeros occur when the sine argument is an integer multiple of <InlineMath math="\pi" />. The coordinate <InlineMath math="u^2" /> gives the clean spacing.
                  </p>
                </>
              }
              checkpoint="Why describe spacing in u squared rather than u?"
              revealAnswer="The prefactor is built from u squared, so the anchor pattern is evenly organized in that variable even if the raw u positions are not equally spaced."
              finalTakeaway="The AGQF zero lattice supplies a structured way to talk about resonance wells and separating barriers."
              nextStep="Section 6.4 turns the well-and-barrier picture into an anchor potential."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Where Are the Zeros?</h2>

            <p>
              The sine function vanishes whenever its argument is a multiple of <InlineMath math="\pi" />. For our prefactor <InlineMath math="\sin^m(\pi u^2 / 2)" />, this means:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.15)' }}>
              <PrettyBlockMath math="\frac{\pi u^2}{2} = k\pi \quad \Longrightarrow \quad u^2 = 2k, \quad k \in \mathbb{Z}" />
            </div>

            <p>
              This gives us zeros at <InlineMath math="u = \pm\sqrt{2}, \pm 2, \pm\sqrt{6}, \pm 2\sqrt{2}, \ldots" />—an infinite sequence of nodal points stretching in both directions along the <InlineMath math="u" />-axis.
            </p>

            <p>
              Notice something remarkable: these zeros are not evenly spaced in <InlineMath math="u" /> itself, but they <em>are</em> evenly spaced in <InlineMath math="u^2" />. The quadratic nature of the spacing mirrors the quadratic eigenvalue spectrum of the Laplacian on the 3-sphere, <InlineMath math="\lambda_\ell = \ell(\ell + 2)" />. This is no coincidence—it's the geometric signature of the sphere's curvature appearing in our analysis.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The First Few Zeros</p>
              <p className="text-gray-700 mb-4">
                For positive <InlineMath math="u" />, the zeros occur at:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li><InlineMath math="k = 1" />: <InlineMath math="u = \sqrt{2} \approx 1.414" /></li>
                <li><InlineMath math="k = 2" />: <InlineMath math="u = 2" /></li>
                <li><InlineMath math="k = 3" />: <InlineMath math="u = \sqrt{6} \approx 2.449" /></li>
                <li><InlineMath math="k = 4" />: <InlineMath math="u = 2\sqrt{2} \approx 2.828" /></li>
              </ul>
              <p className="text-gray-700 mt-4">
                As <InlineMath math="k" /> increases, the zeros get closer together in <InlineMath math="u" />-space, but the <em>area</em> between them remains constant in <InlineMath math="u^2" />-space.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Meaning of Destructive Interference</h2>

            <p>
              At each zero, the prefactor <InlineMath math="\sin^m(\pi u^2 / 2) = 0" />. This means the AGQF vanishes at these points. Within the model, these locations behave like destructive-interference barriers for coherence.
            </p>

            <p>
              Think of it like trying to create a standing wave on a string at a node. No matter how hard you push, the node doesn't move—it's geometrically forbidden. The zeros of the AGQF are the mathematical equivalent: points where the structure of quaternionic space forbids stable coherence.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Where Are the Wells?</h2>

            <p>
              If destructive interference occurs at <InlineMath math="u^2 = 2k" />, then <strong>constructive interference</strong>—maximum coherence—occurs halfway between, where the sine function reaches its peak. This happens at:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="u^2 \approx 2k + 1, \quad k = 0, 1, 2, \ldots" />
            </div>

            <p>
              These are the <strong>resonance wells</strong>—locations where the AGQF achieves local maxima, where coherence is reinforced rather than canceled. A system that finds itself in one of these wells experiences stability: it's in a natural resonance of the quaternionic geometry.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Visualizing the Lattice</p>
              <p className="text-gray-700">
                Picture the <InlineMath math="u" />-axis as an infinite string. At each point <InlineMath math="u^2 = 2k" />, a node is pinned in place—the string cannot move there. Between nodes, the string can vibrate freely, forming antinodes at <InlineMath math="u^2 = 2k + 1" />. Each antinode is a resonance well, a stable standing wave segment. The entire structure is a harmonic ladder built from geometry.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Effect of the Null Order <InlineMath math="m" /></h2>

            <p>
              The exponent <InlineMath math="m" /> in <InlineMath math="\sin^m(\pi u^2 / 2)" /> controls the sharpness of the zeros. When <InlineMath math="m = 2" />, the function vanishes quadratically—a gentle approach to zero with smooth curvature. When <InlineMath math="m = 4" /> or higher, the approach becomes steeper, with the function hugging zero more tightly.
            </p>

            <p>
              Higher <InlineMath math="m" /> values create more abrupt "walls" between wells. This means:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-4">
              <li>
                <strong>Low <InlineMath math="m" /></strong>: Wells are broad and gently separated. Systems can "tunnel" more easily between adjacent wells.
              </li>
              <li>
                <strong>High <InlineMath math="m" /></strong>: Wells are sharply defined with steep walls. Systems are more tightly confined to individual wells.
              </li>
            </ul>

            <p>
              This tunability is one of the AGQF's powers: by choosing <InlineMath math="m" />, we can model different levels of confinement, from loosely bound states to tightly localized resonances.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Lattice as a Spectrum of States</h2>

            <p>
              The alternating pattern of zeros and wells defines a complete spectrum of stability zones. Each well corresponds to a possible stable state—a mode that the system can occupy. The zeros between them are forbidden zones—barriers that separate one state from another.
            </p>

            <p>
              This is exactly what we see in quantum mechanics. Electrons in atoms don't exist at arbitrary energy levels; they occupy specific orbitals separated by energy gaps. The AGQF's lattice is a geometric realization of the same phenomenon: discrete states arising from the structure of space itself.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Connection to Quantum Numbers</p>
              <p className="text-gray-700">
                Each well can be labeled by its index <InlineMath math="k" />. This index plays the role of a quantum number—a discrete label identifying which resonance state the system occupies. The quadratic spacing <InlineMath math="u^2 = 2k + 1" /> mirrors the quadratic energy scaling of quantum harmonic oscillators and angular momentum states.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>From Lattice to Quantization</h2>

            <p>
              We now have a complete picture of the AGQF's structure: a lattice of zeros and wells carved into quaternionic space by the sine prefactor. The zeros are impenetrable barriers; the wells are stable resonances. Any system interacting with this structure must align with one of the wells—it has no choice but to quantize.
            </p>

            <p>
              But we haven't yet translated this geometric picture into the language of energy and potential. To do that, we need to introduce the anchor potential—a function that describes how systems experience attraction toward wells and repulsion from barriers. That's the subject of the next section.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The sine-prefactor lattice organizes continuous quaternionic space into a discrete set of resonance regions. The zeros act as destructive-interference walls; the wells mark constructive coherence regions. This gives the model a geometric source for allowed structure.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-6/section-6-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 6.2
          </Link>

          <MarkCompleteButton type="section" id="section-6-3" title="Section 6.3" />

          <Link href="/chapter-6/section-6-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 6.4
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
