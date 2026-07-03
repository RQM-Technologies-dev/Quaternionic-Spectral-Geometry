import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section7_1() {
  useEffect(() => {
    document.title = "Section 7.1: Coherence as Phase Alignment | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Discover how quaternionic states maintain synchronized orientations through phase alignment, creating the geometric foundation for wave coherence on the 3-sphere.";
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
        { label: "Section 7.1" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 7 · Section 7.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Coherence as Phase Alignment
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              How quaternionic states synchronize to create stable wave structures
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Think about a laser beam. What makes it different from the light of a candle? Both produce photons, yet the laser can cut through steel while candlelight merely flickers softly. The difference is <strong>coherence</strong>—in the laser, every photon marches in lockstep, their waves perfectly synchronized. In candlelight, photons scatter in every direction, their phases random and uncorrelated.
            </p>

            <p>
              Coherence is one of the most powerful ideas in physics. It explains why orchestras sound harmonious, why bridges can resonate dangerously with marching soldiers, and why atoms form stable structures instead of flying apart. In quaternionic geometry, we'll discover that coherence takes on an even deeper meaning—it becomes a <strong>geometric invariant</strong> that describes how orientations align across four-dimensional space.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What does it mean for quaternionic states to stay aligned?"
              plainLanguageSetup="Chapter 6 organized resonance wells. Chapter 7 asks a stability question: once states occupy a structured landscape, how do we measure whether their phases and axes remain aligned?"
              formulaRecap={
                <>
                  <PrettyBlockMath math="q=\cos\varphi+\mathbf{u}\sin\varphi" />
                  <p>
                    Coherence must read both parts of the state: the phase angle <InlineMath math="\varphi" /> and the unit direction <InlineMath math="\mathbf{u}" />.
                  </p>
                </>
              }
              checkpoint="Why is quaternionic coherence richer than complex phase matching?"
              revealAnswer="Complex coherence compares phase angles. Quaternionic coherence also compares the axes those phases rotate around."
              finalTakeaway="Coherence means alignment in both phase and orientation, not just matching scalar amplitudes."
              nextStep="Section 7.2 studies how aligned and misaligned states interfere on S3."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Quaternionic State</h2>

            <p>
              Every quaternionic state can be written in a beautiful exponential form:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" />
            </div>

            <p>
              Here, <InlineMath math="\varphi" /> is the <strong>phase angle</strong>—how far the quaternion has "rotated" from its starting position. And <InlineMath math="\mathbf{u}" /> is the <strong>phase vector</strong>—a unit vector in three-dimensional space that tells us <em>which direction</em> the rotation happens around.
            </p>

            <p>
              This is fundamentally different from complex numbers, where phase is just a single angle. In quaternions, phase has <em>direction</em> as well as magnitude. It's like the difference between saying "turn 90 degrees" (complex) versus "turn 90 degrees around the north-south axis" (quaternion).
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: The Spinning Top</p>
              <p className="text-gray-700">
                Imagine a spinning top. The angle <InlineMath math="\varphi" /> tells you how many rotations it has made. The vector <InlineMath math="\mathbf{u}" /> is the axis it spins around—pointing up, tilted to the side, or anywhere else. A quaternionic state is like a snapshot of this top: it captures both where in its rotation it is and which way it's spinning.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>What Does Coherence Mean?</h2>

            <p>
              For two quaternions to be coherent, they must agree in both phase <em>and</em> orientation. It's not enough for two spinning tops to be at the same angle in their rotation—they must also be spinning around the same axis. This is why quaternionic coherence is richer than complex coherence.
            </p>

            <p>
              We measure coherence between two quaternions <InlineMath math="q_1" /> and <InlineMath math="q_2" /> using their inner product:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="C(q_1, q_2) = |\langle q_1, q_2 \rangle| = |\mathrm{Re}(q_1 \overline{q_2})|" />
            </div>

            <p>
              This coherence value ranges from 0 to 1:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li><strong>C = 1</strong>: Perfect coherence. The two quaternions are identical or differ only by a sign (pointing in exactly the same or exactly opposite directions on <InlineMath math="S^3" />).</li>
              <li><strong>C = 0</strong>: Complete incoherence. The quaternions are orthogonal—as different as two rotations can possibly be.</li>
              <li><strong>0 &lt; C &lt; 1</strong>: Partial coherence. Some alignment exists, but with residual phase or orientation differences.</li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Geometry Behind the Formula</p>
              <p className="text-gray-700">
                The quantity <InlineMath math="\mathrm{Re}(q_1\overline{q_2})" /> measures how much two quaternionic rotations align on the hypersphere <InlineMath math="S^3" />. When <InlineMath math="q_1" /> and <InlineMath math="q_2" /> point in the same orientation, their inner product is purely real and positive. When they're misaligned, the imaginary parts introduce phase offsets that reduce the real component.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>From Points to Fields</h2>

            <p>
              Real physical systems aren't single quaternions—they're fields of quaternions spread across space and time. Consider a quaternionic field <InlineMath math="q(x, t)" /> that assigns a quaternion to every point in space at every moment. The coherence between two points becomes:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="C(x_1, x_2, t) = |\langle q(x_1, t), q(x_2, t) \rangle|" />
            </div>

            <p>
              This <strong>coherence field</strong> tells a rich story. It shows which parts of space are oscillating together (high coherence) and which parts have drifted out of sync (low coherence). It's like a map of agreement—bright where quaternions rotate in harmony, dark where they've lost their shared rhythm.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Visualization: A Field of Spinning Arrows</p>
              <p className="text-gray-700">
                Imagine a vast three-dimensional grid, with a tiny spinning arrow at each point. Each arrow represents <InlineMath math="q(x, t)" />—its direction is the phase vector <InlineMath math="\mathbf{u}" />, and its rotation state is the phase <InlineMath math="\varphi" />. Coherence means the arrows spin in harmony, maintaining a common rhythm even if they're not perfectly aligned. Decoherence means they spin at different speeds or drift apart in orientation—a kind of geometric cacophony.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Why Coherence Matters</h2>

            <p>
              Coherence isn't just a mathematical curiosity—it's the foundation of stability. When a system maintains high coherence, energy flows smoothly, patterns persist, and structures remain intact. When coherence breaks down, systems become chaotic, energy dissipates randomly, and order dissolves into noise.
            </p>

            <p>
              In quantum mechanics, coherence distinguishes quantum states that can interfere (creating phenomena like superconductivity and laser light) from classical mixtures that behave independently. In our quaternionic framework, this distinction becomes geometric: coherent states share alignment on <InlineMath math="S^3" />, while incoherent states are scattered randomly across the hypersphere.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Complex Analogy</p>
              <p className="text-gray-700">
                In complex numbers, coherence corresponds to two waves maintaining a constant phase difference—like two pendulums swinging in sync. In quaternions, this extends to four dimensions: two rotations maintaining constant phase <em>and</em> axis alignment. It's the difference between two-dimensional waves and four-dimensional spinning fields.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Looking Ahead</h2>

            <p>
              We've established what coherence means for quaternionic states: the alignment of phase and orientation in four-dimensional space. But how do coherent and incoherent states interact? When two quaternionic waves meet, do they reinforce each other or cancel out?
            </p>

            <p>
              These questions lead us to the next section, where we'll explore <strong>interference on the 3-sphere</strong>—how constructive and destructive resonance creates the rich pattern of wells and boundaries that organize energy in quaternionic space.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Takeaway</p>
              <p className="text-gray-700">
                Coherence is the geometry of agreement. When quaternionic states share aligned phases and orientations, they form structures that persist through time. The coherence measure <InlineMath math="C(q_1, q_2) = |\mathrm{Re}(q_1 \overline{q_2})|" /> quantifies this alignment, extending the familiar concept of wave synchronization into four-dimensional space where both angle and axis matter.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-7-spectral-coherence-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-7-1" title="Section 7.1" />

          <Link href="/chapter-7/section-7-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 7.2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
