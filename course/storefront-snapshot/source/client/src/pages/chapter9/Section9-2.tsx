import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section9_2() {
  useEffect(() => {
    document.title = "Section 9.2: Quaternionic Fast Fourier Transforms (QFFTs) | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn how Fourier analysis extends to quaternionic fields with QFFTs, enabling spectral decomposition and filtering in four-dimensional signal spaces.";
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
        { label: "Chapter 9", href: "/chapter-9-computational-hub" },
        { label: "Section 9.2" }
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
            <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 9
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 9 · Section 9.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Quaternionic Fast Fourier Transforms
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Spectral analysis in four dimensions
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The Fourier transform is one of mathematics' most powerful tools. It reveals the hidden frequencies
              in a signal, transforming time-domain data into a spectrum of oscillating components. But what happens
              when your signal isn't just a sequence of numbers—what if it's a sequence of quaternions, encoding
              both amplitude and orientation? This is where the Quaternionic Fast Fourier Transform (QFFT) enters.
            </p>

            <p>
              The QFFT extends classical Fourier analysis into the four-dimensional realm of quaternions, enabling
              us to decompose quaternionic signals into their rotational and oscillatory components. This is
              essential for analyzing resonance patterns in Quaternionic Spectral Geometry.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do we compute spectra for quaternion-valued data?"
              plainLanguageSetup="Section 9.1 represented quaternions in code. The next computational problem is spectral: decompose samples into frequency components while preserving orientation information."
              formulaRecap={
                <>
                  <PrettyBlockMath math="F_k=\sum_{n=0}^{N-1}f_n e^{-2\pi i kn/N},\qquad e^{\mathbf u\theta}=\cos\theta+\mathbf u\sin\theta" />
                  <p>
                    The classical DFT uses one imaginary axis. The quaternionic version lets the oscillating basis carry an orientation axis.
                  </p>
                </>
              }
              checkpoint="Why decompose quaternions into complex pairs in an implementation?"
              revealAnswer="It lets the algorithm reuse stable complex FFT routines while preserving the four-component quaternion structure."
              finalTakeaway="The QFFT is an implementation bridge from quaternionic wave geometry to practical spectral computation."
              nextStep="Section 9.3 turns computed structures into visualizations and diagnostics."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>From Complex to Quaternionic Fourier</h2>

            <p>
              The classical discrete Fourier transform (DFT) of a complex signal <InlineMath math="f_n" /> is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="F_k = \sum_{n=0}^{N-1} f_n \, e^{-2\pi i kn/N}" />
            </div>

            <p>
              Here, the complex exponential <InlineMath math="e^{i\theta} = \cos\theta + i\sin\theta" /> serves
              as the oscillating basis. For quaternionic signals <InlineMath math="f_n \in \mathbb{H}" />, we
              generalize using the quaternionic exponential:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="e^{\mathbf{u}\theta} = \cos\theta + \mathbf{u}\sin\theta" />
            </div>

            <p>
              where <InlineMath math="\mathbf{u}" /> is any unit imaginary quaternion (<InlineMath math="\mathbf{u}^2 = -1" />).
              This embeds rotational structure directly into the spectral basis—frequencies become not just rates
              of oscillation, but directions of rotation in quaternionic space.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Conceptual Difference</p>
              <p className="text-gray-700">
                In a complex FFT, frequencies are one-dimensional oscillations along the imaginary unit <InlineMath math="i" />.
                In a QFFT, frequencies are multi-dimensional oscillations in orientation space—waves rotating
                simultaneously about the <InlineMath math="i, j, k" /> axes. It's like going from a metronome
                to a spinning gyroscope.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Quaternionic FFT Algorithm</h2>

            <p>
              The QFFT can be implemented efficiently by decomposing quaternionic signals into pairs of complex
              signals. For a quaternion <InlineMath math="q = (a + bi) + (c + di)j" />, we can write:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="q = z_1 + z_2 j, \quad \text{where } z_1 = a + bi, \; z_2 = c + di" />
            </div>

            <p>
              This "simplex" decomposition allows us to compute the QFFT using two standard complex FFTs:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`import numpy as np

def quaternion_fft(q_signal):
    """Compute Quaternionic FFT using simplex decomposition.

    Args:
        q_signal: Array of shape (N, 4) - N quaternions [w, x, y, z]
    Returns:
        Q_freq: Quaternionic frequency spectrum (N, 4)
    """
    N = len(q_signal)

    # Decompose into two complex signals
    # q = (w + xi) + (y + zi)j = z1 + z2*j
    z1 = q_signal[:, 0] + 1j * q_signal[:, 1]  # w + xi
    z2 = q_signal[:, 2] + 1j * q_signal[:, 3]  # y + zi

    # Apply standard complex FFT to each component
    Z1 = np.fft.fft(z1)
    Z2 = np.fft.fft(z2)

    # Reconstruct quaternionic spectrum
    Q_freq = np.zeros((N, 4))
    Q_freq[:, 0] = Z1.real   # w component
    Q_freq[:, 1] = Z1.imag   # x component
    Q_freq[:, 2] = Z2.real   # y component
    Q_freq[:, 3] = Z2.imag   # z component

    return Q_freq

def quaternion_ifft(Q_freq):
    """Compute inverse Quaternionic FFT.

    Args:
        Q_freq: Quaternionic frequency spectrum (N, 4)
    Returns:
        q_signal: Time-domain quaternion signal (N, 4)
    """
    N = len(Q_freq)

    # Reconstruct complex components
    Z1 = Q_freq[:, 0] + 1j * Q_freq[:, 1]
    Z2 = Q_freq[:, 2] + 1j * Q_freq[:, 3]

    # Apply inverse FFT
    z1 = np.fft.ifft(Z1)
    z2 = np.fft.ifft(Z2)

    # Reconstruct quaternion signal
    q_signal = np.zeros((N, 4))
    q_signal[:, 0] = z1.real
    q_signal[:, 1] = z1.imag
    q_signal[:, 2] = z2.real
    q_signal[:, 3] = z2.imag

    return q_signal`}</code>
            </pre>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Spectral Filtering</h2>

            <p>
              Once we have the quaternionic spectrum, we can apply filters that operate in frequency space.
              A filter is a transfer function <InlineMath math="H(k)" /> that modifies each frequency component:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="F'_k = H(k) \cdot F_k" />
            </div>

            <p>
              Common quaternionic filters include:
            </p>

            <ul className="list-disc ml-6 space-y-2 my-4">
              <li><strong>Low-pass:</strong> Removes high-frequency (rapid rotation) components, smoothing the signal</li>
              <li><strong>Band-pass:</strong> Isolates specific resonance wells or frequency bands</li>
              <li><strong>AGQF Anchor Filter:</strong> Amplifies frequencies near anchor well positions <InlineMath math="u^2 = 2k + 1" /></li>
            </ul>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`def quaternion_lowpass(q_signal, cutoff_ratio=0.5):
    """Apply low-pass filter to quaternionic signal.

    Args:
        q_signal: Quaternion signal (N, 4)
        cutoff_ratio: Fraction of frequencies to keep (0 to 1)
    Returns:
        Filtered quaternion signal
    """
    N = len(q_signal)
    cutoff = int(N * cutoff_ratio / 2)

    # Transform to frequency domain
    Q_freq = quaternion_fft(q_signal)

    # Create low-pass filter mask
    mask = np.zeros(N)
    mask[:cutoff] = 1.0
    mask[-cutoff:] = 1.0

    # Apply filter to each quaternion component
    Q_filtered = Q_freq * mask[:, np.newaxis]

    # Transform back
    return quaternion_ifft(Q_filtered)

def agqf_anchor_filter(q_signal, anchor_wells, bandwidth=0.1):
    """Filter to enhance AGQF anchor well frequencies.

    Args:
        q_signal: Quaternion signal (N, 4)
        anchor_wells: List of anchor well positions (u² = 2k+1)
        bandwidth: Width of each resonance band
    Returns:
        Filtered quaternion signal emphasizing anchor resonances
    """
    N = len(q_signal)
    freqs = np.fft.fftfreq(N)

    # Build resonance-enhancing transfer function
    H = np.zeros(N)
    for well in anchor_wells:
        H += np.exp(-(freqs - well)**2 / (2 * bandwidth**2))

    # Normalize
    H = H / H.max()

    # Apply in frequency domain
    Q_freq = quaternion_fft(q_signal)
    Q_filtered = Q_freq * H[:, np.newaxis]

    return quaternion_ifft(Q_filtered)`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Physical Analogy</p>
              <p className="text-gray-700">
                Imagine a 3D wave twisting through a medium, like light polarization rotating as it travels
                through a crystal. The QFFT decomposes this twisting motion into its fundamental rhythmic
                components—orthogonal spinning modes that, when superimposed, recreate the original signal.
                Filtering selects which rhythms to keep.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Applications in Signal Processing</h2>

            <p>
              Quaternionic Fourier analysis finds applications wherever signals have rotational or
              orientation-based structure:
            </p>

            <ul className="list-disc ml-6 space-y-2 my-4">
              <li><strong>Color Image Processing:</strong> RGB images can be encoded as quaternions, enabling holistic color filtering</li>
              <li><strong>Motion Analysis:</strong> Orientation time-series from sensors become quaternionic signals</li>
              <li><strong>Quantum State Evolution:</strong> Spinor dynamics can be analyzed through quaternionic spectra</li>
              <li><strong>Coherence Analysis:</strong> QSG resonance wells appear as distinct peaks in quaternionic spectra</li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The QFFT can expose rotational structure that classical FFTs do not represent directly. By extending
                Fourier analysis to quaternions, we gain the ability to decompose and filter signals that
                carry orientation information—essential for computational work in Quaternionic Spectral Geometry.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarkCompleteButton id="section-9-2" type="section" />

        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-9/section-9-1" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Previous: Section 9.1
          </Link>

          <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter 9 Hub
          </Link>

          <Link href="/chapter-9/section-9-3" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-next-section">
            Next: Section 9.3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
