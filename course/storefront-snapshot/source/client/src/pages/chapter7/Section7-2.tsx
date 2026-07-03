import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section7_2() {
  useEffect(() => {
    document.title = "Section 7.2: Interference on the 3-Sphere | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore how constructive and destructive resonance patterns emerge from quaternionic superposition on the curved 3-sphere, creating wells and boundaries of stability.";
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
        { label: "Section 7.2" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 7 · Section 7.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Interference on the 3-Sphere
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              How waves combine on curved space to create resonance patterns
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Drop two pebbles into a still pond and watch what happens. Circular ripples spread outward from each splash, and where they meet, something remarkable occurs. Sometimes the waves combine to make bigger waves—peaks align with peaks, reinforcing each other. Other times they cancel—a peak meets a trough, and the water becomes still. This is <strong>interference</strong>, one of nature's most fundamental phenomena.
            </p>

            <p>
              On the flat surface of a pond, interference is well understood. But what happens when waves propagate on a <em>curved</em> surface? What if that surface isn't even three-dimensional, but four-dimensional, like the 3-sphere <InlineMath math="S^3" />? The geometry of interference becomes far richer—and far more interesting.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do aligned or misaligned quaternionic waves combine?"
              plainLanguageSetup="Section 7.1 defined coherence as phase-and-axis alignment. Interference asks what happens when two such states meet: alignment can reinforce structure, while mismatch can reduce it."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\text{Constructive: }q_1\approx q_2\implies |q_1+q_2|\approx 2|q_1|" />
                  <p>
                    This is the readable case: similar orientation and phase make the combined magnitude large. Other axis or phase relationships can reduce the result.
                  </p>
                </>
              }
              checkpoint="What two kinds of mismatch matter on S3?"
              revealAnswer="Phase mismatch and axis mismatch both matter. Two states can have similar phase angles but still differ in orientation direction."
              finalTakeaway="Interference on S3 is a coherence test: it reveals how phase and direction combine or fail to combine."
              nextStep="Section 7.3 turns coherence into a frequency-domain function."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Richness of Curved Interference</h2>

            <p>
              On <InlineMath math="S^3" />, interference is no longer just about amplitude—adding and subtracting heights of waves. It's about <strong>orientation</strong> as well. Each point on <InlineMath math="S^3" /> carries not just a value but a direction—the axis <InlineMath math="\mathbf{u}" /> of its quaternionic phase. When two waves meet, their amplitudes combine, but so do their orientations.
            </p>

            <p>
              This means quaternionic interference is intrinsically more complex than classical wave interference. It's like comparing the mixing of colored lights (where colors combine but keep their hue) to the mixing of spinning tops (where both the rotation speed and the spin axis must be reconciled).
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Difference from Flat Space</p>
              <p className="text-gray-700">
                In flat space, waves interfere based on their phase difference alone. On <InlineMath math="S^3" />, interference depends on both <em>phase difference</em> and <em>axis difference</em>. Two waves can be perfectly in phase but still interfere destructively if their rotation axes point in opposite directions!
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Constructive Resonance: Building Wells of Stability</h2>

            <p>
              When two quaternionic states share the same axis <InlineMath math="\mathbf{u}" /> and the same phase <InlineMath math="\varphi" />, their superposition reinforces. The coherence value <InlineMath math="C" /> approaches 1, and energy density concentrates along that shared axis.
            </p>

            <p>
              These zones of constructive interference correspond to the <strong>resonance wells</strong> we encountered in the AGQF framework. They're regions where the system's internal geometry supports standing-wave alignment—like the nodes of a vibrating guitar string, but extended to four dimensions.
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\text{Constructive: } q_1 \approx q_2 \implies |q_1 + q_2| \approx 2|q_1|" />
            </div>

            <p>
              The resulting state has double the amplitude—and four times the energy density—of either component alone. This concentration of energy is what makes resonance wells "sticky": particles, waves, and excitations tend to collect in these regions because that's where energy is most efficiently stored.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Destructive Resonance: The Boundaries Between Worlds</h2>

            <p>
              What happens when two quaternions are <em>opposite</em> in orientation? When <InlineMath math="q_2 \approx -q_1" />, their sum approaches zero:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\text{Destructive: } q_2 \approx -q_1 \implies |q_1 + q_2| \approx 0" />
            </div>

            <p>
              This is destructive interference in the quaternionic setting. The cancellation can mark <strong>zero boundaries</strong>: hyperspherical shells where coherence drops sharply, separating one resonance well from another.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Shell Structure</p>
              <p className="text-gray-700">
                On <InlineMath math="S^2" /> (an ordinary sphere), interference patterns look like rings of alternating brightness—think of the bands around a soap bubble. On <InlineMath math="S^3" />, these rings become entire hyperspherical shells. Within one shell, the field oscillates coherently. At the boundary, coherence collapses to zero. Then the next shell begins with opposite phase—a new world of coherent oscillation, separated from its neighbor by a wall of destructive interference.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Quaternionic Superposition Principle</h2>

            <p>
              When two quaternionic states combine, the result encodes information about both:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="q(t) = e^{\mathbf{u}_1\varphi_1} + e^{\mathbf{u}_2\varphi_2}" />
            </div>

            <p>
              The resulting coherence depends on <em>two</em> things: the phase difference <InlineMath math="\varphi_1 - \varphi_2" /> and the angle between the axes <InlineMath math="\mathbf{u}_1" /> and <InlineMath math="\mathbf{u}_2" />. This dual dependency is unique to quaternionic systems.
            </p>

            <p>
              Consider what happens when:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li><strong>Same axis, same phase</strong>: Maximum constructive interference. The waves reinforce completely.</li>
              <li><strong>Same axis, opposite phase</strong>: Maximum destructive interference. The waves cancel completely.</li>
              <li><strong>Perpendicular axes, any phase</strong>: Partial interference. The waves neither fully reinforce nor fully cancel—they create a mixed state with rotating orientation.</li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Precession Effect</p>
              <p className="text-gray-700">
                When two quaternionic states have different axes, something subtle happens: coherence is maintained only when phase and orientation evolve together. A misalignment of axes introduces a torque-like phase drift—one state "precesses" around the other, like a wobbling gyroscope. Over time, this precession can degrade coherence unless the system finds a way to realign.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Interference as Pattern Formation</h2>

            <p>
              The interplay of constructive and destructive interference creates the rich structure of quaternionic resonance. Wells of stability alternate with shells of cancellation, forming a nested pattern like layers of an onion—but in four dimensions.
            </p>

            <p>
              This pattern isn't random. It's determined by the geometry of <InlineMath math="S^3" /> itself, the frequencies of the oscillating fields, and the initial conditions of the system. Change any of these, and the interference pattern shifts—wells move, boundaries restructure, and the entire coherence landscape transforms.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>A Deeper View</p>
              <p className="text-gray-700">
                Constructive interference represents synchronized quaternionic rotations, where phases add geometrically. Destructive interference is phase opposition, but it is still structured: the cancellation zones trace boundaries in the manifold's harmonic pattern.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Looking Ahead</h2>

            <p>
              We've seen how interference on <InlineMath math="S^3" /> creates patterns of resonance and cancellation. But coherence can be studied not only in space—it can be analyzed in <strong>frequency</strong>. How do different spectral components of a quaternionic field maintain their phase relationships?
            </p>

            <p>
              In the next section, we'll develop <strong>spectral coherence functions</strong> that measure how energy and orientation persist across frequencies, unifying phase synchronization with directional alignment in a single mathematical framework.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Takeaway</p>
              <p className="text-gray-700">
                Interference on <InlineMath math="S^3" /> combines phase and orientation in ways that flat-space waves cannot. Constructive interference creates wells of concentrated energy; destructive interference creates boundaries that separate coherent regions. This dual nature—wells and walls—is the geometric skeleton that organizes energy across the hypersphere.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-7/section-7-1" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 7.1
          </Link>

          <MarkCompleteButton type="section" id="section-7-2" title="Section 7.2" />

          <Link href="/chapter-7/section-7-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 7.3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
