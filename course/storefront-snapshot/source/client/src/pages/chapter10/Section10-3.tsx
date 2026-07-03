import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section10_3() {
  useEffect(() => {
    document.title = "Section 10.3: Orientation Tracking in Robotics and Navigation | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn how quaternions track orientation in robots and spacecraft, enhanced by QSG's spectral and geometric context for improved navigation.";
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
        { label: "Section 10.3" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 10 · Section 10.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Orientation Tracking in Robotics and Navigation
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              From gimbal lock to geometric coherence
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Many orientation-tracking systems use quaternions. When you rotate a phone to switch from portrait to landscape mode, or when you play a motion-controlled game, a sensor pipeline may track orientation using quaternionic mathematics. QSG explains why this is more than a convenient computational trick: unit quaternions give a smooth coordinate language for orientation in space.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How does QSG turn orientation tracking into a geometric field problem?"
              plainLanguageSetup="Section 10.2 used quaternions for polarization rotations. Robotics and navigation use the same S3 state space for attitude, but with computation, sensors, and time-varying fields."
              formulaRecap={
                <>
                  <PrettyBlockMath math="R_q(\mathbf v)=q\mathbf v\bar q,\qquad q:M\times\mathbb R\to S^3" />
                  <p>
                    The first formula rotates a vector. The second treats orientation as a field over space and time.
                  </p>
                </>
              }
              checkpoint="Why is normalization still a practical issue here?"
              revealAnswer="Sensor updates and numerical integration can drift off S3, so implementations need stable normalization and diagnostics."
              finalTakeaway="For robotics and navigation, QSG organizes orientation as smooth unit-quaternion fields rather than isolated attitude values."
              nextStep="Section 10.4 connects the same SU(2)/S3 structure to quantum mechanics and RQM."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Gimbal Lock Problem</h2>

            <p>
              Consider a spacecraft navigating through space. Traditionally, its orientation is described by three Euler angles: roll, pitch, and yaw. This works fine—until two of the rotation axes align. When that happens, you lose a degree of freedom. The spacecraft can still point in any direction, but the mathematics breaks down. This is gimbal lock, and it famously threatened the Apollo 11 mission.
            </p>

            <p>
              Quaternions solve this elegantly. A unit quaternion <InlineMath math="q = w + xi + yj + zk" /> with <InlineMath math="|q| = 1" /> represents any rotation in 3D space without singularities. The four components are constrained to the three-sphere <InlineMath math="S^3" />, and every point on this sphere corresponds to a valid orientation.
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="R_q(\mathbf{v}) = q \cdot \mathbf{v} \cdot \bar{q}" />
            </div>

            <p>
              This formula rotates any vector <InlineMath math="\mathbf{v}" /> by the rotation encoded in <InlineMath math="q" />. The sandwich product automatically handles all the trigonometry that would require careful bookkeeping with Euler angles.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Quaternionic Orientation Fields</h2>

            <p>
              QSG extends this from a single orientation to <em>fields of orientations</em>. Consider a robot arm with multiple joints, each tracking its own orientation. Or a swarm of drones, each with independent attitude. Or a deformable body like a swimming fish, where orientation varies continuously along the body.
            </p>

            <p>
              We describe these systems with quaternionic fields <InlineMath math="q(x, t)" />—a quaternion assigned to each point in space and time:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="q: M \times \mathbb{R} \to S^3" />
            </div>

            <p>
              The smoothness conditions we developed in earlier chapters—slice regularity, coherence, equilibration—now have direct physical meaning. A smooth quaternionic field means the robot's joints move without discontinuous jumps. A coherent field means the system maintains global coordination. An equilibrated field means the system relaxes naturally toward stable configurations.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Spectral Context for Navigation</h2>

            <p>
              Traditional quaternion-based navigation answers the question: "What is my current orientation?" QSG adds a deeper layer: "How does my orientation relate to the geometric structure of the surrounding space?"
            </p>

            <p>
              Consider a spacecraft navigating through a gravitational field, or a submarine moving through ocean currents. The environment has structure—preferred directions, gradients, singularities. By embedding navigation in the QSG framework, the vehicle's orientation becomes aware of this structure:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)' }}>
              <PrettyBlockMath math="\frac{\partial q}{\partial t} = -\nabla_q V_{env}(q, x)" />
            </div>

            <p>
              The potential <InlineMath math="V_{env}" /> encodes environmental constraints. The gradient flow guides the vehicle toward orientations that are "aligned" with the environment—think of how a weathervane points into the wind without a detailed control rule for every angle.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Practical Example</p>
              <p className="text-gray-700">
                An autonomous underwater vehicle (AUV) swimming through a current-rich environment. In a model, an AGQF-style potential can represent "orientation wells" aligned with the current flow. The vehicle can then use that landscape as a guidance signal rather than recomputing the full hydrodynamic problem at every step.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Coherence-Based Control</h2>

            <p>
              The coherence metrics from Chapter 7 translate directly into control algorithms. When a robotic system drifts from its desired orientation, coherence measures how "organized" the deviation is. Random noise looks different from systematic drift, and QSG-based controllers can distinguish them.
            </p>

            <p>
              Define the coherence error:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\mathcal{C}_{err}(q, q_{target}) = 1 - |\langle q, q_{target} \rangle|^2" />
            </div>

            <p>
              This metric is zero when the orientations match (up to the quaternionic double-cover symmetry) and increases smoothly with deviation. A PID controller based on coherence error outperforms traditional Euler-angle controllers because it naturally handles the geometry of <InlineMath math="S^3" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Multi-Agent Coordination</h2>

            <p>
              For swarms of robots or coordinated vehicle formations, QSG provides a natural framework for collective orientation. The average orientation of a swarm is well-defined on <InlineMath math="S^3" /> (using quaternionic averaging), and coherence measures how tightly the swarm maintains formation.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Resonance and Stability</p>
              <p className="text-gray-700">
                AGQF resonance wells can model stable formations. A swarm in a resonance well can be represented as resisting perturbations: individual vehicles that drift are guided back toward the collective orientation by the modeled potential.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>From Implementation to Understanding</h2>

            <p>
              Quaternions have been used in navigation for decades, but often as a "black box"—plug in the math, get the right answer, don't ask why. QSG opens the box. It explains <em>why</em> quaternions work so well: they're not just a convenient parameterization of rotations, they're the natural coordinates on the space of orientations. And <InlineMath math="S^3" /> isn't just an abstract manifold—it's the geometric stage on which rotational dynamics play out.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                Quaternionic navigation isn't just about avoiding gimbal lock—it's about embracing the full geometric structure of orientation space. QSG provides the spectral and coherence tools to exploit this structure for more robust, more intuitive, and more powerful control systems.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarkCompleteButton id="section-10-3" type="section" />

        <div className="flex justify-between items-center pt-8 border-t-2 mt-8" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-10/section-10-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Previous: 10.2 Optics
          </Link>

          <Link href="/chapter-10-applications-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#3d7a8c' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <Link href="/chapter-10/section-10-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#1a3b47' }} data-testid="link-next-section">
            Next: 10.4 Quantum Mechanics
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
