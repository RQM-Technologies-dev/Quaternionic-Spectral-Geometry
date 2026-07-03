import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter4Section4_4() {
  useEffect(() => {
    document.title = "Section 4.4: Resonance Selection | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Discover how variational extremals become resonant modes, connecting the mathematics of eigenvalue problems to the physics of resonance and natural vibration.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #1a3b47 0%, #2d5a69 50%, #3d7a8c 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(77, 154, 175, 0.4) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6">
            <Link href="/chapter-4-spectral-calculus" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 4
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 4 · Section 4.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Resonance Selection
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Variational extremals as resonant modes
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The deepest insight of spectral calculus is that eigenfunctions are not arbitrary mathematical objects—they are resonant modes selected by the geometry itself. Just as a violin string can only sustain certain pitches, the manifold <InlineMath math="M = SU(2) \times \mathbb{R}" /> can only sustain certain spatial patterns. This section explores the physical meaning of this resonance selection.
            </p>

            <p>
              The variational principles of the previous section now acquire a new interpretation: critical points of the Rayleigh quotient are patterns that resonate with the geometry. They are the shapes that, once excited, persist and oscillate without distorting—the natural modes of the space.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="Why do eigenfunctions behave like resonant modes?"
              plainLanguageSetup="Section 4.3 showed that the Rayleigh quotient selects stable energy ratios. Here we read those selected patterns physically: a mode resonates when the geometry lets it persist without mixing into other shapes."
              formulaRecap={
                <>
                  <PrettyBlockMath math="-\Delta_M f=\lambda f,\qquad \lambda=\ell(\ell+2)+\omega^2" />
                  <p>
                    The operator returns the same pattern multiplied by <InlineMath math="\lambda" />. That is why the pattern can act as a stable spectral component.
                  </p>
                </>
              }
              checkpoint="What makes a resonant mode different from a general function?"
              revealAnswer="A general function decomposes into many modes. A resonant eigenmode keeps its shape under the operator and only changes by a scalar factor."
              finalTakeaway="Spectral calculus explains how geometry selects persistent patterns rather than arbitrary functions."
              nextStep="Chapter 5 develops those allowed patterns as harmonic analysis on S3 x R."
            />

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                Every musical instrument has resonant frequencies determined by its shape and material. A flute, a violin, and a drum each produce specific pitches because their geometries select certain vibration patterns. In exactly the same way, the quaternionic manifold <InlineMath math="M" /> has intrinsic resonances. Understanding these resonances is the key to understanding how fields propagate, how quantum states organize, and how geometric structure manifests in physics.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Resonance Principle</h2>

            <p>
              The central principle connecting variational calculus to physics is this:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <p className="font-semibold text-center" style={{ color: '#1a3b47' }}>
                Critical points of the Rayleigh quotient correspond to resonant modes—eigenfunctions of the Laplacian with eigenvalue <InlineMath math="\ell(\ell+2) + \omega^2" />.
              </p>
            </div>

            <p>
              A resonant mode is a pattern that, when set in motion, oscillates at a single frequency without changing shape. Drop a function into the wave equation, and in general it will distort and evolve in complex ways. But drop in an eigenfunction, and it simply oscillates up and down like a pure tone—the spatial pattern stays fixed while the amplitude varies sinusoidally in time.
            </p>

            <p>
              This is why eigenfunctions are special: they are the only patterns that the geometry doesn't scramble. They resonate.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: The Swing Analogy</p>
              <p className="text-gray-700">
                Pushing a child on a swing, you learn quickly that timing matters. Push at random moments, and the motion is chaotic. Push at exactly the right moment—in resonance with the natural frequency—and the amplitude builds smoothly. Eigenfunctions are like the natural swinging motion: they're the patterns that build up rather than cancel out when driven by the geometry.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Geometry Selects the Modes</h2>

            <p>
              On <InlineMath math="M = SU(2) \times \mathbb{R}" />, the allowed resonances are determined by two geometric facts:
            </p>

            <ul className="list-disc ml-6 space-y-4">
              <li>
                <strong>The compactness of SU(2):</strong> Because <InlineMath math="SU(2)" /> is compact (it's a 3-sphere), only discrete spin values <InlineMath math="\ell = 0, 1, 2, \ldots" /> are allowed. The geometry forces quantization. Just as a circular drum can only vibrate in modes with an integer number of nodal circles, the 3-sphere can only support Wigner D-functions with integer spin.
              </li>
              <li>
                <strong>The non-compactness of ℝ:</strong> Because the real line extends to infinity, all frequencies <InlineMath math="\omega \in \mathbb{R}" /> are allowed. There is no quantization along this direction—any wavelength fits.
              </li>
            </ul>

            <p>
              The combined spectrum reflects both features: discrete in spin, continuous in frequency. This hybrid character is what makes <InlineMath math="M" /> interesting—it has quantized angular structure but unrestricted scale structure.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Physical Meaning of the Eigenvalue</h2>

            <p>
              The eigenvalue <InlineMath math="\lambda = \ell(\ell+2) + \omega^2" /> has direct physical meaning:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li><InlineMath math="\ell(\ell+2)" /> measures the angular complexity—how many times the function oscillates as you go around the 3-sphere.</li>
              <li><InlineMath math="\omega^2" /> measures the scale complexity—how rapidly the function oscillates along the real line.</li>
              <li>The total eigenvalue measures the overall geometric complexity or "energy" of the mode.</li>
            </ul>

            <p>
              In quantum mechanics, the eigenvalue is proportional to energy. Low-eigenvalue modes (small <InlineMath math="\ell" />, small <InlineMath math="|\omega|" />) are the ground states and low-lying excitations. High-eigenvalue modes are highly excited states that oscillate rapidly.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Resonance in Wave Propagation</h2>

            <p>
              Consider a wave propagating on <InlineMath math="M" />. If we decompose the initial condition into eigenmodes, each mode evolves independently:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Psi_{\ell,\omega}(g, t, \tau) = D^{\ell}_{mn}(g) e^{i\omega t} \cos\left(\sqrt{\ell(\ell+2) + \omega^2} \cdot \tau\right)" />
            </div>

            <p>
              Here <InlineMath math="\tau" /> is "wave time"—the time variable in the wave equation. Each eigenmode oscillates at its own characteristic frequency <InlineMath math="\sqrt{\ell(\ell+2) + \omega^2}" />, determined by the square root of the eigenvalue.
            </p>

            <p>
              The resonance principle says: if you want to excite a particular eigenmode, drive the system at its natural frequency. Driving at other frequencies produces transient responses that eventually damp away, leaving only the resonant modes.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: Tuning Forks and Resonance</p>
              <p className="text-gray-700">
                Strike a tuning fork, and it rings at exactly one pitch—its resonant frequency. Place it near another tuning fork of the same pitch, and that fork begins to vibrate too, "catching" the resonance. The eigenmodes of <InlineMath math="M" /> work the same way: they are the "pitches" that the geometry naturally sustains. All other patterns are transients that decay away.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Selection Rules and Quantum Numbers</h2>

            <p>
              In quantum physics, transitions between states follow selection rules that specify which changes in quantum numbers are allowed. These rules emerge from the structure of the eigenmodes and their overlaps.
            </p>

            <p>
              On <InlineMath math="M" />, the spin index <InlineMath math="\ell" /> plays the role of angular momentum. Selection rules for transitions involve the matrix elements of operators between Wigner D-functions. The representation theory of <InlineMath math="SU(2)" /> determines which transitions are allowed—typically, <InlineMath math="\Delta \ell = 0, \pm 1" /> for dipole interactions.
            </p>

            <p>
              This is the deep connection between geometry and physics: the selection rules that govern quantum transitions are built into the representation theory of the manifold's symmetry group.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Physical Picture</h2>

            <p>
              Imagine the manifold <InlineMath math="M" /> as a vast, curved space that can sustain vibrations. The Laplacian is the operator that tells us how these vibrations propagate. The eigenfunctions are the natural modes—the patterns that the space "likes" to vibrate in.
            </p>

            <p>
              When we solve a physical problem on <InlineMath math="M" />—whether it's heat diffusion, wave propagation, or quantum mechanics—we're really asking: how does the initial condition project onto these resonant modes, and how do those modes evolve?
            </p>

            <p>
              The answer is always the same: expand in eigenfunctions, evolve each mode according to its eigenvalue, and sum up the result. The geometry has selected the modes; all we have to do is listen for the resonance.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Big Picture</p>
              <p className="text-gray-700">
                Spectral calculus transforms the question "how do things behave on this space?" into the question "what are the resonant modes?" Once we know the modes—the Wigner D-functions and Fourier exponentials on <InlineMath math="M" />—we can solve any linear problem by decomposition. The variational principle guarantees that these modes are unique and complete. And the resonance interpretation tells us why they matter physically: they are the patterns that persist, the notes that ring true.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-4/section-4-3" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Section 4.3: Rayleigh Quotient</span>
          </Link>
          <MarkCompleteButton type="section" id="section-4-4" title="Section 4.4" />
          <Link href="/chapter-4-spectral-calculus" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Back to Chapter 4</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
