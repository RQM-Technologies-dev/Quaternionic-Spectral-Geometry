import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section10_1() {
  useEffect(() => {
    document.title = "Section 10.1: Quaternionic Signal Processing and Communication | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Discover how quaternionic modulation encodes multiple signals on a single carrier, enabling beyond-5G communication systems through geometric coherence.";
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
        { label: "Chapter 10", href: "/chapter-10-applications-hub" },
        { label: "Section 10.1" }
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
            <Link href="/chapter-10-applications-hub" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 10
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 10 · Section 10.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Quaternionic Signal Processing and Communication
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Encoding multiple signals on a single carrier wave
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Every radio signal you've ever heard—every phone call, every WiFi packet, every satellite broadcast—rides on a wave. That wave has amplitude (loudness), frequency (pitch), and phase (timing). Traditional signal processing manipulates these properties one at a time. But what if we could handle them all simultaneously, as aspects of a single geometric object?
            </p>

            <p>
              This is what quaternionic signal processing studies. Instead of treating amplitude, phase, and polarization as unrelated quantities, we encode them as components of a quaternionic state. The result is a coordinate framework for analyzing multichannel and orientation-aware wave behavior.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How does the QSG course thread become a signal-processing application?"
              plainLanguageSetup="Chapter 10 connects the path number -> shape -> rotation -> S3 -> calculus -> spectra -> resonance -> coherence -> computation to applied domains. For signals, the application question is how to model amplitude, phase, and orientation together."
              formulaRecap={
                <>
                  <PrettyBlockMath math="F(t)=e^{\mathbf u\omega t}=\cos(\omega t)+\mathbf u\sin(\omega t)" />
                  <p>
                    The unit imaginary axis <InlineMath math="\mathbf u" /> gives the wave an orientation component, while <InlineMath math="\omega" /> controls oscillation rate.
                  </p>
                </>
              }
              checkpoint="Where should product positioning land for this application?"
              revealAnswer="QSP is the signal-processing capability; RQM WaveEngine is the platform that packages that capability into workflows."
              finalTakeaway="For signal processing, QSG supplies the coordinate framework and WaveEngine is the applied platform layer."
              nextStep="Section 10.2 applies the same orientation-aware view to optics and polarization."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Quaternionic Carrier Wave</h2>

            <p>
              A traditional carrier wave looks like <InlineMath math="A\cos(\omega t + \phi)" />—amplitude times a sinusoid with frequency and phase. A quaternionic carrier wave extends this into four dimensions:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="F(t) = e^{\mathbf{u}\omega t} = \cos(\omega t) + \mathbf{u}\sin(\omega t)" />
            </div>

            <p>
              Here, <InlineMath math="\mathbf{u} = u_1 i + u_2 j + u_3 k" /> is a unit imaginary quaternion—a point on the 2-sphere living inside the quaternions. This single exponential simultaneously encodes:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Frequency</strong> through <InlineMath math="\omega" /></li>
              <li><strong>Three independent phase channels</strong> through the <InlineMath math="i, j, k" /> components of <InlineMath math="\mathbf{u}" /></li>
              <li><strong>Amplitude</strong> by scaling the overall quaternion</li>
            </ul>

            <p>
              Think of it this way: a complex signal is like a compass needle that can point in any direction on a flat map. A quaternionic signal is like a gyroscope that can orient itself in any direction in three-dimensional space. The extra degrees of freedom mean we can pack more information into the same bandwidth.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Quaternionic Modulation</h2>

            <p>
              In traditional quadrature amplitude modulation (QAM), we encode data by varying the amplitude and phase of two orthogonal carriers (sine and cosine). Quaternionic modulation extends this to three orthogonal imaginary components:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="S(t) = a_0(t) + a_1(t)i\sin(\omega t) + a_2(t)j\sin(\omega t) + a_3(t)k\sin(\omega t)" />
            </div>

            <p>
              Each coefficient <InlineMath math="a_0, a_1, a_2, a_3" /> can carry structured information in the model. Where traditional QAM uses two quadrature channels, quaternionic modulation studies a four-component signal space.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Practical Advantage</p>
              <p className="text-gray-700">
                Quaternionic modulation provides a modeling lens for additional orientation and polarization structure. Any practical spectral-efficiency gain would depend on channel physics, hardware, coding, and receiver design.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>AGQF Filters: Geometric Noise Rejection</h2>

            <p>
              One of the most exciting applications comes from combining quaternionic signals with the AGQF framework we developed in Chapter 6. The AGQF creates resonance wells—regions of stability in quaternionic space. By designing filters based on these wells, we can achieve something remarkable: <em>geometric noise rejection</em>.
            </p>

            <p>
              Traditional filters reject noise based on frequency content. AGQF filters reject noise based on geometric coherence. A signal that sits in an AGQF resonance well is stable; random noise that doesn't match this geometry is naturally suppressed.
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)' }}>
              <PrettyBlockMath math="\mathcal{H}_{AGQF}[S] = \Pi_{\text{well}}[S] \cdot e^{-V(u)/\tau}" />
            </div>

            <p>
              The filter projects the signal onto the nearest resonance well and attenuates components that fall outside. The result is cleaner signal recovery, especially in multipath or interference-rich environments.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Beyond 5G: Orientation-Robust Communication</h2>

            <p>
              Modern wireless systems face a fundamental challenge: when a phone or antenna rotates, the received signal changes. Polarization mismatch can cause significant signal loss. Quaternionic communication offers a natural solution.
            </p>

            <p>
              Because quaternions naturally represent rotations, a quaternionic signal framework can encode information in a way that's <em>invariant under rotation</em>. The receiver doesn't need to know the transmitter's orientation—the geometric structure of the quaternionic signal encodes this information automatically.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Future Vision</p>
              <p className="text-gray-700">
                Imagine drone swarms communicating reliably despite tumbling through the air, or satellite networks maintaining coherence across orbital dynamics. Quaternionic signal processing makes orientation-robust communication mathematically natural rather than engineered around limitations.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Implementation Considerations</h2>

            <p>
              Quaternionic signal processing isn't just theoretical—it's being actively developed for practical systems. Key implementation aspects include:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Hardware:</strong> Quaternionic processing can be implemented using pairs of I/Q channels, with specialized DSP algorithms handling the non-commutative multiplication</li>
              <li><strong>Antenna design:</strong> Dual-polarized antennas naturally map to quaternionic components, with each polarization carrying two quadrature components</li>
              <li><strong>Computational complexity:</strong> Quaternionic FFTs exist and run in <InlineMath math="O(N\log N)" /> time, making real-time processing feasible</li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                Quaternionic signal processing isn't about replacing existing systems—it's about extending them. Every complex-valued signal processing technique has a quaternionic generalization that often reveals new capabilities. The mathematical framework of QSG provides the rigorous foundation for developing these extensions.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarkCompleteButton id="section-10-1" type="section" />

        <div className="flex justify-between items-center pt-8 border-t-2 mt-8" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-10-applications-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <Link href="/chapter-10/section-10-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#1a3b47' }} data-testid="link-next-section">
            Next: 10.2 Quaternionic Optics
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
