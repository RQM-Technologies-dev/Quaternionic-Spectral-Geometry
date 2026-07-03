import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section7_4() {
  useEffect(() => {
    document.title = "Section 7.4: The Resonant Axis Model | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Understand how quaternionic systems dynamically equilibrate toward stable coherence through the Resonant Axis Model, a geometric self-correction mechanism.";
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
        { label: "Section 7.4" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 7 · Section 7.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Resonant Axis Model
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              How systems self-correct toward geometric stability
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              A gyroscope spinning in space resists changes to its orientation. Push it, and it wobbles briefly, then settles back. Angular momentum creates a restoring effect that fights against perturbations, keeping the spin axis stable.
            </p>

            <p>
              Quaternionic systems have their own version of this stability mechanism. As they evolve through time, their internal orientation fields continuously adjust to minimize misalignment. This process—<strong>temporal equilibration</strong>—is how coherence persists through time despite the noise and fluctuations of the real world.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How can a state correct its orientation toward coherence?"
              plainLanguageSetup="Section 7.3 defined coherence across frequencies. The resonant axis model describes drift: a state can move in the direction that improves alignment with a reference state or anchor."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\frac{d\mathbf{u}}{dt}\propto-\nabla_{\mathbf{u}}(1-C(q,q_0))" />
                  <p>
                    Read this as gradient-guided adjustment. The axis <InlineMath math="\mathbf{u}" /> changes in a direction that reduces misalignment with <InlineMath math="q_0" />.
                  </p>
                </>
              }
              checkpoint="What does a high coherence value mean in this model?"
              revealAnswer="It means the current state is already well aligned with the reference, so the correction pressure is smaller than in a low-coherence region."
              finalTakeaway="The resonant axis model treats coherence as a readable stability landscape with drift toward better alignment."
              nextStep="Section 7.5 makes those coherence landscapes visible through density maps and flow fields."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Resonant Axis</h2>

            <p>
              At the heart of temporal equilibration is the concept of a <strong>Resonant Axis</strong>—a preferred direction in quaternionic space toward which the system's orientation naturally evolves. Think of it as a "magnetic north" for coherence: no matter where you start, the system tends to align toward this axis over time.
            </p>

            <p>
              Formally, the Resonant Axis is a dynamic vector field <InlineMath math="\mathbf{u}(t)" /> that evolves according to the local coherence gradient:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\frac{d\mathbf{u}}{dt} \propto -\nabla_{\mathbf{u}}(1 - C(q, q_0))" />
            </div>

            <p>
              Here, <InlineMath math="q_0" /> is a reference state—perhaps an AGQF anchor well—and <InlineMath math="C(q, q_0)" /> is the coherence between the current state and that reference. The negative gradient means the system moves in the direction that <em>increases</em> coherence.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Physical Meaning</p>
              <p className="text-gray-700">
                This equation describes how a rotating system reorients itself to maintain phase alignment with a reference axis. It's like a compass needle that doesn't just point north but actively <em>turns</em> toward north, correcting for any disturbance. The "coherence gradient" provides the torque that drives this realignment.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Bowl Analogy</h2>

            <p>
              Imagine a marble rolling inside a curved bowl. Even if you disturb it, the marble doesn't escape—it oscillates around the bottom, eventually settling back to the lowest point. The shape of the bowl creates a restoring force; the steeper the walls, the stronger the force pulling the marble back.
            </p>

            <p>
              Coherence works the same way. The "coherence potential" <InlineMath math="1 - C(q, q_0)" /> acts like the height profile of an invisible bowl. States with high coherence sit at the bottom; states with low coherence sit on the walls. The geometry of <InlineMath math="S^3" /> curves this bowl, and the system's evolution is the marble rolling within it.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Coherence as Attractor</p>
              <p className="text-gray-700">
                In dynamical systems language, the Resonant Axis is an <em>attractor</em>—a state toward which trajectories converge. Unlike chaotic systems that wander unpredictably, systems near the Resonant Axis are drawn toward it. Coherence isn't just possible; it's <em>favored</em> by the geometry of quaternionic space.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Temporal Coherence and Stability</h2>

            <p>
              If a system deviates from coherence—perhaps due to external noise or a sudden perturbation—the geometric curvature of <InlineMath math="S^3" /> exerts a restorative torque. This torque doesn't come from any external force; it emerges from the intrinsic geometry of the manifold itself.
            </p>

            <p>
              The result is a self-correcting dynamic: coherence wells act as attractors, continuously pulling drifting orientations back into alignment. This is why coherent structures—atoms, waves, orbits—are persistent. They are not static, frozen in place. They are <em>dynamically balanced</em>, maintained through continuous micro-adjustment toward resonance alignment.
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\text{Deviation} \xrightarrow{\text{curvature torque}} \text{Correction} \xrightarrow{\text{equilibration}} \text{Coherence restored}" />
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Why This Matters</h2>

            <p>
              The Resonant Axis Model asks why coherent structures can persist under disturbance. Within this model, coherence is not only an initial condition; it can also be treated as an attracting state that a system moves toward.
            </p>

            <p>
              Consider a hydrogen atom. Despite constant electromagnetic fluctuations from the vacuum, the electron maintains its orbital structure. The Resonant Axis Model suggests this stability isn't surprising—the geometry of the quaternionic manifold creates a "coherence basin" that captures and holds the electron's phase alignment.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>A Universal Mechanism</p>
              <p className="text-gray-700">
                The Resonant Axis isn't specific to any particular physical system. It's a consequence of quaternionic geometry itself. Whether we're discussing atoms, lasers, superconductors, or planetary orbits, the same geometric principle applies: coherence is an attractor, and systems naturally flow toward it.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Dynamics of Equilibration</h2>

            <p>
              How fast does equilibration happen? The answer depends on the "curvature" of the coherence potential—how steeply the bowl curves near the attractor. Steep curvature means rapid correction; gentle curvature means slow drift.
            </p>

            <p>
              In physical terms, this curvature is related to the energy scales of the system. High-energy systems (tightly bound atoms, high-frequency oscillators) have steep coherence potentials and equilibrate quickly. Low-energy systems (loosely coupled oscillators, diffuse fields) have gentle potentials and equilibrate slowly.
            </p>

            <p>
              But regardless of the timescale, the direction is the same: toward coherence. The Resonant Axis is always there, patiently pulling the system toward alignment.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Looking Ahead</h2>

            <p>
              We've established that coherence is stable, maintained by a dynamic equilibration process. But what does this coherence <em>look like</em>? How can we visualize these abstract geometric concepts in ways that build intuition?
            </p>

            <p>
              In the final section of this chapter, we'll develop visualization techniques for coherence fields—seeing coherence as flowing textures across the hypersphere, where currents of alignment form rivers, eddies, and stable basins of geometric harmony.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Takeaway</p>
              <p className="text-gray-700">
                The Resonant Axis Model reveals that coherence isn't fragile—it's an attractor. The geometry of <InlineMath math="S^3" /> creates a natural "basin" toward which quaternionic states evolve. This explains why stable structures persist: they are continuously maintained by geometric self-correction, like a gyroscope keeping its spin despite disturbances.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-7/section-7-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 7.3
          </Link>

          <MarkCompleteButton type="section" id="section-7-4" title="Section 7.4" />

          <Link href="/chapter-7/section-7-5" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 7.5
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
