import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section6_5() {
  useEffect(() => {
    document.title = "Section 6.5: Quantization and the Spectral Ladder | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "See how discrete energy levels emerge naturally from geometric confinement, connecting quaternionic geometry to Planck's constant and the spectral ladder of quantum mechanics.";
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
        { label: "Section 6.5" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 6 · Section 6.5</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Quantization and the Spectral Ladder
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              From geometric wells to discrete energy levels
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              We've built up all the pieces: the quaternionic factorial, the anchor-generating extension, the lattice of zeros, and the anchor potential. Now it's time to see how these pieces fit together to model discrete allowed structure.
            </p>

            <p>
              Quantization is the reason atoms have discrete energy levels, why light comes in photons, and why electrons in a crystal form bands rather than continuous distributions. In the AGQF framework, the goal is to organize this discreteness through resonance wells.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How can a well structure produce discrete allowed states?"
              plainLanguageSetup="Section 6.4 turned AGQF anchors into a potential landscape. When a state is confined to a well, only patterns compatible with that well remain stable within the model."
              formulaRecap={
                <>
                  <PrettyBlockMath math="u^2\approx 2k+1,\qquad k=0,1,2,\ldots" />
                  <p>
                    The midpoint values represent the centers of the resonance wells between anchor barriers at <InlineMath math="u^2=2k" />.
                  </p>
                </>
              }
              checkpoint="What should we avoid claiming from this formula alone?"
              revealAnswer="It organizes allowed structure within the AGQF model; it does not by itself prove every physical quantization rule."
              finalTakeaway="AGQF links spectral spacing, anchors, and resonance wells into a disciplined model of discrete allowed structure."
              nextStep="Chapter 7 shifts from well organization to coherence: how aligned states remain stable or drift over time."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Confinement Creates Discreteness</h2>

            <p>
              The anchor potential creates a series of wells separated by infinite barriers. Any system living in this potential cannot cross the barriers—it must remain confined to whichever well it occupies. But what does "confinement" mean for a quantum or coherent system?
            </p>

            <p>
              It means the system's state function must fit within the well. Just as only certain wavelengths fit on a guitar string (those that match the string's length), only certain coherent modes fit within each potential well. This is the <strong>quantization condition</strong>:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.15)' }}>
              <PrettyBlockMath math="u^2 \approx 2k + 1, \quad k = 0, 1, 2, \ldots" />
            </div>

            <p>
              Each integer <InlineMath math="k" /> labels a distinct resonance well, a distinct allowed state. Between these values, coherence is impossible—the barriers at <InlineMath math="u^2 = 2k" /> forbid it.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Quantization Insight</p>
              <p className="text-gray-700">
                Quantization is not imposed by hand—it emerges from geometry. The AGQF's zeros create natural boundaries, and the spaces between them define the only locations where stable coherence can exist. This is why quantum systems have discrete states: the geometry of their underlying space allows no other possibility.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Connection to <InlineMath math="S^3" /> Geometry</h2>

            <p>
              The quadratic structure <InlineMath math="u^2 = 2k" /> isn't arbitrary—it mirrors the eigenvalue spectrum of the Laplacian on the 3-sphere. On <InlineMath math="S^3" />, the allowed frequencies of vibration form a discrete spectrum:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\lambda_\ell = \ell(\ell + 2), \quad \ell = 0, 1, 2, \ldots" />
            </div>

            <p>
              Both spectra are quadratic—both grow as <InlineMath math="\ell^2" /> for large <InlineMath math="\ell" />. This correspondence is the model's key link between the AGQF resonance wells and the <InlineMath math="S^3" /> geometry.
            </p>

            <p>
              In quaternionic spectral geometry, the 3-sphere is the natural domain of coherent states. Its curvature determines the spacing of resonances, and the AGQF captures this spacing in the form of the sine-prefactor lattice.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Role of Planck's Constant</h2>

            <p>
              So far, our analysis has been purely geometric—we've talked about the coordinate <InlineMath math="u" /> and the dimensionless spacing of wells. But physical systems have energies measured in joules, frequencies in hertz, and actions in joule-seconds. How do we connect geometry to physics?
            </p>

            <p>
              The bridge is Planck's constant <InlineMath math="\hbar" />. This fundamental constant of nature converts dimensionless geometric ratios into physical units. In the AGQF framework:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-4">
              <li>The geometric spacing of wells (in <InlineMath math="u^2" />-units) determines the <em>pattern</em> of energy levels.</li>
              <li>Planck's constant <InlineMath math="\hbar" /> determines the <em>scale</em>—how many joules each step on the ladder represents.</li>
            </ul>

            <p>
              If we assign an energy <InlineMath math="E_k" /> to each well, the structure takes a familiar form:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.15)' }}>
              <PrettyBlockMath math="E_k = E_0 + k\,\hbar\,\omega_0" />
            </div>

            <p>
              Here <InlineMath math="E_0" /> is the ground state energy, <InlineMath math="\omega_0" /> is the fundamental frequency of the lattice, and <InlineMath math="k" /> is the well index. This is exactly the spectrum of a quantum harmonic oscillator—nature's most ubiquitous quantum system.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Planck's Constant as a Translator</p>
              <p className="text-gray-700">
                Think of <InlineMath math="\hbar" /> as a conversion factor between the language of geometry and the language of physics. Geometry speaks in dimensionless ratios and angular relationships. Physics speaks in energy, time, and mass. Planck's constant translates between them, telling us how much energy corresponds to one geometric "step" on the spectral ladder.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Spectral Ladder</h2>

            <p>
              We can now visualize the complete picture: the <strong>spectral ladder</strong>. Imagine a staircase winding through quaternionic space. Each step is one resonance well—one stable location where a system can exist. The height of each step (its energy) increases uniformly, spaced by <InlineMath math="\hbar\omega_0" />.
            </p>

            <p>
              A system on this ladder can only occupy the steps—never the gaps between them. To move from one step to another, it must absorb or emit a precise quantum of energy <InlineMath math="\Delta E = \hbar\omega_0" />. This is the origin of atomic emission and absorption lines, the foundation of spectroscopy, and ultimately the basis of quantum mechanics.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Music and Matter</p>
              <p className="text-gray-700">
                The same mathematics that describes musical overtones describes atomic energy levels. Both are standing-wave phenomena constrained by boundary conditions. In music, the boundaries are the fixed ends of a string. In the AGQF, the boundaries are the zeros of the sine prefactor. The pattern of overtones in both cases is a harmonic ladder—geometry expressing itself through resonance.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Chapter Summary</h2>

            <p>
              We've completed a remarkable journey in this chapter. Let's summarize what we've discovered:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li>
                <strong>The Quaternionic Factorial</strong> <InlineMath math="\circledcirc(q)" /> generalizes the Gamma function to four dimensions, encoding both growth and rotation in a single operator.
              </li>
              <li>
                <strong>The Anchor-Generating Extension</strong> adds a sine prefactor that introduces periodic zeros, transforming smooth growth into a structured landscape.
              </li>
              <li>
                <strong>The Sine-Prefactor Lattice</strong> creates zeros at <InlineMath math="u^2 = 2k" /> and wells at <InlineMath math="u^2 = 2k + 1" />, a periodic structure of barriers and stable zones.
              </li>
              <li>
                <strong>The Anchor Potential</strong> translates this geometric structure into an energy landscape, with infinite barriers and stable minima.
              </li>
              <li>
                <strong>Quantization</strong> emerges as confinement within wells—only discrete resonant modes are geometrically allowed.
              </li>
              <li>
                <strong>Planck's Constant</strong> converts the dimensionless geometric ladder into physical energy units.
              </li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.15)', borderLeft: '4px solid #4d9aaf' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Central Message</p>
              <p className="text-gray-700">
                Quantization is not a mysterious rule of nature that we must accept without explanation. It is the natural consequence of coherent geometry. The AGQF reveals that discrete energy levels arise because the geometry of quaternionic space—specifically, the resonance structure on <InlineMath math="S^3 \times \mathbb{R}" />—permits only certain stable configurations. Nature is discrete because space is curved and coherent.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Looking Ahead</h2>

            <p>
              We've described how the model organizes discrete structure through geometric resonance. In Chapter 7, we'll explore <strong>Quaternionic Spectral Coherence</strong>: how resonance wells interact dynamically and how fields can stay aligned or drift between them.
            </p>

            <p>
              The spectral ladder isn't static—it's a living structure where coherent states evolve, interact, and transform. Understanding this dynamics will take us from static energy levels to the full richness of quantum behavior.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Takeaway</p>
              <p className="text-gray-700">
                The AGQF model frames discrete allowed states as resonance regions in a continuous geometry. Just as a drum supports certain frequencies determined by its shape, this framework studies how quaternionic geometry can organize allowed spectral structure.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-6/section-6-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 6.4
          </Link>

          <MarkCompleteButton type="section" id="section-6-5" title="Section 6.5" />

          <Link href="/chapter-7-spectral-coherence-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-chapter">
            Chapter 7
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
