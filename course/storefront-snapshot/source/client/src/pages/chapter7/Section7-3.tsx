import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section7_3() {
  useEffect(() => {
    document.title = "Section 7.3: Spectral Coherence Functions | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn how to measure coherence across frequencies, unifying phase synchronization with directional alignment through quaternionic spectral analysis.";
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
        { label: "Chapter 7", href: "/chapter-7-spectral-coherence-hub" },
        { label: "Section 7.3" }
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
            <Link href="/chapter-7-spectral-coherence-hub" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 7
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 7 · Section 7.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Spectral Coherence Functions
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Measuring coherence across frequencies and orientations
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Listen to an orchestra tuning before a concert. Each instrument plays its own note, at its own frequency—a chaos of sound. Then, gradually, they align. The oboe plays an A, the strings adjust, the winds follow. What was noise becomes harmony. This is coherence in the frequency domain: different oscillations locking into a shared rhythm.
            </p>

            <p>
              We've studied coherence in space—how quaternionic states align at different points. But physical systems don't just extend through space; they oscillate through time, with multiple frequencies superimposed. To fully understand coherence, we need to analyze it in the <strong>spectral domain</strong>—the world of frequencies.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do we measure whether different frequencies stay aligned?"
              plainLanguageSetup="Section 7.2 looked at interference between states. Spectral coherence asks the same alignment question across frequency components: do oscillations maintain a stable relationship, or drift apart?"
              formulaRecap={
                <>
                  <PrettyBlockMath math="\Gamma(\omega_1,\omega_2)=\frac{|\langle F_1,F_2\rangle|^2}{\langle F_1,F_1\rangle\langle F_2,F_2\rangle}" />
                  <p>
                    Values near 1 mean strong predictable alignment between the components. Values near 0 mean little shared structure under this measure.
                  </p>
                </>
              }
              checkpoint="Why normalize by the self-inner-products?"
              revealAnswer="Normalization makes the value measure relationship rather than raw amplitude, so large signals do not look coherent merely because they are large."
              finalTakeaway="Spectral coherence measures alignment across frequencies while preserving the quaternionic phase-and-axis information."
              nextStep="Section 7.4 studies how systems can drift toward a resonant axis over time."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>From Space to Frequency</h2>

            <p>
              Every oscillating system can be decomposed into its frequency components. A guitar string vibrating at 440 Hz also has overtones at 880 Hz, 1320 Hz, and so on. Each frequency carries its own amplitude and phase. The question is: do these different frequencies maintain a consistent phase relationship, or do they drift independently?
            </p>

            <p>
              In quaternionic systems, this question becomes even richer. Each frequency component has not just a phase but an <em>orientation</em>—its own axis <InlineMath math="\mathbf{u}" /> in the imaginary directions. Spectral coherence must measure both the consistency of phase relationships and the consistency of orientation relationships across frequencies.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Spectral Coherence Function</h2>

            <p>
              For two quaternionic field components <InlineMath math="F_1(g, t)" /> and <InlineMath math="F_2(g, t)" />, associated with frequencies <InlineMath math="\omega_1" /> and <InlineMath math="\omega_2" />, we define the spectral coherence as:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\Gamma(\omega_1, \omega_2) = \frac{|\langle F_1, F_2 \rangle|^2}{\langle F_1, F_1 \rangle\langle F_2, F_2 \rangle}" />
            </div>

            <p>
              This formula might look familiar—it's the same structure as the classical coherence function used in signal processing. But the inner product <InlineMath math="\langle \cdot, \cdot \rangle" /> is now quaternionic, accounting for all four dimensions of the number system.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Interpretation</p>
              <p className="text-gray-700">
                The spectral coherence <InlineMath math="\Gamma(\omega_1, \omega_2)" /> measures how predictably one frequency component relates to another. When <InlineMath math="\Gamma = 1" />, knowing the state at <InlineMath math="\omega_1" /> completely determines the state at <InlineMath math="\omega_2" />. When <InlineMath math="\Gamma = 0" />, the two frequencies oscillate independently with no correlation.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Decomposing Quaternionic Correlation</h2>

            <p>
              The quaternionic inner product reveals hidden structure when we decompose it into parts:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\langle q_1, q_2 \rangle = \mathrm{Re}(q_1 \overline{q_2}) + \mathrm{Im}(q_1 \overline{q_2})" />
            </div>

            <p>
              This decomposition separates two distinct types of coherence:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li><strong>Scalar term (Real part)</strong>: Measures <em>phase coherence</em>—how well the two states maintain a consistent phase relationship over time. This is the classical notion of coherence extended to quaternions.</li>
              <li><strong>Vector term (Imaginary part)</strong>: Measures <em>directional coherence</em>—how well the two states maintain aligned rotation axes. This is unique to quaternionic systems.</li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Physical Meaning</p>
              <p className="text-gray-700">
                Imagine two signals that remain phase-locked—their crests and troughs always align. If their rotation axes also align, coherence is perfect. But if they're phase-locked with perpendicular axes, they're only <em>partially</em> coherent. The phase relationship is stable, but the orientational relationship is not. Full quaternionic coherence requires both agreements.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Light Wave Analogy</h2>

            <p>
              This dual nature of coherence has a familiar analog in optics. Light waves have both intensity (brightness) and polarization (the direction of the electric field's oscillation). Two light beams can be:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li><strong>Intensity coherent</strong>: Their brightness fluctuations are correlated.</li>
              <li><strong>Polarization coherent</strong>: Their electric fields oscillate in the same direction.</li>
              <li><strong>Fully coherent</strong>: Both intensity and polarization are correlated.</li>
            </ul>

            <p>
              In quaternionic systems, the scalar coherence plays the role of intensity coherence, while the vector coherence plays the role of polarization coherence. The quaternionic framework unifies these into a single mathematical structure.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>A Unified Language</p>
              <p className="text-gray-700">
                Classical optics treats intensity and polarization separately, requiring different mathematical tools for each. Quaternionic spectral coherence treats them as two aspects of a single geometric object—the quaternionic inner product. This unification isn't just elegant; it reveals connections between phenomena that otherwise appear unrelated.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Coherence Across the Spectrum</h2>

            <p>
              By computing <InlineMath math="\Gamma(\omega_1, \omega_2)" /> for many pairs of frequencies, we can build a complete picture of spectral coherence. The result is a two-dimensional map—a "coherence matrix"—showing which frequency pairs are correlated and which are independent.
            </p>

            <p>
              In a perfectly coherent system, this matrix would be all ones: every frequency predicts every other. In a perfectly incoherent system, the matrix would have ones only on the diagonal: each frequency oscillates independently. Real systems fall between these extremes, with clusters of coherent frequencies separated by gaps of independence.
            </p>

            <p>
              These clusters often correspond to physical structures—the modes of a resonant cavity, the energy levels of an atom, the standing waves on a membrane. Spectral coherence analysis reveals these structures without assuming their existence in advance.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Applications and Implications</h2>

            <p>
              Spectral coherence functions have practical applications across science and engineering:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li><strong>Quantum systems</strong>: Measuring how well different energy levels maintain phase relationships, crucial for quantum computing and spectroscopy.</li>
              <li><strong>Signal processing</strong>: Identifying correlated frequency bands in communications, radar, and audio processing.</li>
              <li><strong>Materials science</strong>: Probing the vibrational modes of crystals and molecules to understand their structure.</li>
            </ul>

            <p>
              The quaternionic extension adds the ability to track orientational coherence—essential for systems where spin, polarization, or other directional properties matter.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Looking Ahead</h2>

            <p>
              We now have tools to measure coherence both in space (the coherence field) and in frequency (the spectral coherence function). But coherence isn't static—it evolves through time. Systems can gain or lose coherence; they can equilibrate toward stable configurations or drift into disorder.
            </p>

            <p>
              In the next section, we'll explore the <strong>Resonant Axis Model</strong>—how quaternionic systems dynamically adjust their orientations to maintain coherence, guided by the geometry of <InlineMath math="S^3" /> itself.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Takeaway</p>
              <p className="text-gray-700">
                Spectral coherence functions extend our understanding from space to frequency, measuring how oscillations at different frequencies maintain phase and orientation relationships. The quaternionic decomposition into scalar (phase) and vector (directional) components unifies classical notions of intensity and polarization coherence into a single geometric framework.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-7/section-7-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 7.2
          </Link>

          <MarkCompleteButton type="section" id="section-7-3" title="Section 7.3" />

          <Link href="/chapter-7/section-7-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 7.4
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
