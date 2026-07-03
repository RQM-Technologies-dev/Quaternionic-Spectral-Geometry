import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section6_2() {
  useEffect(() => {
    document.title = "Section 6.2: The Anchor-Generating Extension (AGQF) | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn how the Anchor-Generating Quaternionic Factorial transforms smooth growth into a quantized landscape of resonance wells and stability zones.";
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
        { label: "Section 6.2" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 6 · Section 6.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Anchor-Generating Extension
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              How modulation creates quantized resonance
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              In the previous section, we met the quaternionic factorial—a smooth, spiraling function that generalizes growth into four dimensions. But smoothness, beautiful as it is, doesn't give us quantum mechanics. Quantum systems have discrete states, sharp energy levels, specific allowed values. Where do these come from?
            </p>

            <p>
              The answer lies in adding structure to the quaternionic factorial. By introducing a carefully chosen modulation—a periodic factor that rises and falls like the tide—we transform smooth growth into a landscape of distinct wells and barriers. This is the Anchor-Generating Quaternionic Factorial, or AGQF.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What does AGQF add to the base quaternionic factorial?"
              plainLanguageSetup="Section 6.1 introduced a smooth quaternionic factorial. AGQF adds a prefactor that creates repeated zeros and high/low regions, giving the model a way to organize resonance wells."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\circledcirc^{\mathrm{anchor}}_{m,\Psi}(q)=P_m(u)\int_0^\infty \Psi(t)e^{-\pi u^2t}\,dt,\qquad P_m(u)=C_m\sin^m\!\left(\frac{\pi u^2}{2}\right)" />
                  <p>
                    The integral supplies the base spectral profile. The sine prefactor supplies the anchor pattern along the slice coordinate <InlineMath math="u" />.
                  </p>
                </>
              }
              checkpoint="Why does the sine prefactor matter?"
              revealAnswer="It creates regularly describable zeros and wells, so resonance organization becomes a structural feature of the model rather than an added label."
              finalTakeaway="AGQF is introduced as an organizing operator for resonance structure, not as a replacement for spectral theory."
              nextStep="Section 6.3 locates the zeros and interprets the wells between them."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Musical Analogy</h2>

            <p>
              Think of a guitar string. When you pluck it, it doesn't vibrate at just any frequency—it vibrates at specific harmonics: the fundamental, the second harmonic, the third, and so on. Why? Because the string is fixed at both ends. These fixed points—these "anchors"—constrain the string to vibrate only in ways that fit neatly between them.
            </p>

            <p>
              The AGQF does something analogous to the quaternionic factorial. It introduces mathematical anchors—points where the function is forced to zero—and between these anchors, stable resonance wells form. Just as a guitar string's overtones are determined by its length and tension, the AGQF's resonance wells are determined by the geometry of quaternionic space.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Definition</h2>

            <p>
              The anchor-generating extension introduces a sine-prefactor <InlineMath math="P_m(u)" /> that multiplies the base quaternionic factorial. The complete definition is:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.15)' }}>
              <PrettyBlockMath math="\circledcirc^{\mathrm{anchor}}_{m,\Psi}(q) = P_m(u) \int_0^\infty \Psi(t) e^{-\pi u^2 t}\,dt" />
            </div>

            <p>
              where the prefactor is:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="P_m(u) = C_m \sin^m\!\left(\frac{\pi u^2}{2}\right)" />
            </div>

            <p>
              Let's unpack this piece by piece:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-4">
              <li>
                <strong>The coordinate <InlineMath math="u" /></strong>: This is the slice coordinate we met before, parameterizing how far along the quaternionic "axis" we are. It's a real number that indexes different resonance locations.
              </li>
              <li>
                <strong>The exponent <InlineMath math="m" /></strong>: Called the "null order," this integer (<InlineMath math="m = 2, 3, 4, \ldots" />) controls how sharply the function vanishes at its zeros. Higher <InlineMath math="m" /> means more abrupt walls between resonance wells.
              </li>
              <li>
                <strong>The constant <InlineMath math="C_m" /></strong>: A scaling factor ensuring consistent normalization across different values of <InlineMath math="m" />.
              </li>
              <li>
                <strong>The kernel <InlineMath math="\Psi(t)" /></strong>: A spectral kernel (often a Gaussian) that ensures the integral is well-behaved and produces smooth, positive coherence within each well.
              </li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why the Sine Function?</p>
              <p className="text-gray-700">
                The sine function is nature's oscillator. When raised to a power, <InlineMath math="\sin^m(x)" /> creates zeros at regular intervals with controllable sharpness. These zeros become the boundaries of our resonance wells—the "walls" that separate different quantum states.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Visualizing the Transformation</h2>

            <p>
              Imagine the original quaternionic factorial as a smooth hill rising into the distance. Now imagine slicing this hill with periodic walls that cut down to zero. Between each pair of walls, you get a separate mound—a resonance well. A system living on this landscape can settle into any one of these wells, but it cannot smoothly transition between them without climbing over the walls.
            </p>

            <p>
              This is exactly what the AGQF creates. The <InlineMath math="\sin^m" /> prefactor introduces regular zeros wherever <InlineMath math="\pi u^2 / 2" /> is a multiple of <InlineMath math="\pi" />—that is, wherever <InlineMath math="u^2 = 2k" /> for integer <InlineMath math="k" />. Between these zeros, at <InlineMath math="u^2 \approx 2k + 1" />, the function reaches local maxima—the stable resonance wells.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Role of the Integral</h2>

            <p>
              The integral <InlineMath math="\int_0^\infty \Psi(t) e^{-\pi u^2 t}\,dt" /> is a Laplace-type transform that smooths and weights the coherence. The exponential decay <InlineMath math="e^{-\pi u^2 t}" /> ensures that larger values of <InlineMath math="u" /> (further along the slice) experience faster damping at each scale <InlineMath math="t" />. The kernel <InlineMath math="\Psi(t)" /> shapes this decay, often chosen as a Gaussian or theta function for optimal mathematical properties.
            </p>

            <p>
              Together, the prefactor and integral create a complete resonance structure: the prefactor determines <em>where</em> resonances can occur, and the integral determines their <em>strength</em> and <em>shape</em>.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Standing Wave Analogy</p>
              <p className="text-gray-700">
                Remember the guitar string? The AGQF works the same way. The zeros at <InlineMath math="u^2 = 2k" /> are like the fixed ends of the string—nodes where the amplitude must vanish. The resonance wells between them are like the antinodes—places of maximum vibration. What we're seeing is a standing wave in quaternionic space, with geometry itself determining the allowed modes.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Why "Anchor-Generating"?</h2>

            <p>
              The name comes from what these zeros do: they <em>anchor</em> the coherence structure. Without them, the quaternionic factorial would flow smoothly, and there would be no preferred locations, no stable states. The anchors—the zeros—are what <em>generate</em> the discrete structure. They nail down the mathematical fabric at regular intervals, forcing what lies between to organize into distinct, stable configurations.
            </p>

            <p>
              This shifts the perspective. Within the model, discrete structure comes from the geometry of the prefactor rather than from a separate list of allowed values. The anchors are consequences of how the sine prefactor interacts with the quaternionic structure.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The AGQF transforms the smooth quaternionic factorial into a structured landscape of wells and walls. In this model, that landscape organizes discrete resonance zones. In the next section, we'll examine the lattice of zeros in detail and see how they divide quaternionic space into distinct regions.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-6/section-6-1" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 6.1
          </Link>

          <MarkCompleteButton type="section" id="section-6-2" title="Section 6.2" />

          <Link href="/chapter-6/section-6-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 6.3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
