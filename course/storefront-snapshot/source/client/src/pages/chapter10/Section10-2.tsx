import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section10_2() {
  useEffect(() => {
    document.title = "Section 10.2: Quaternionic Optics and Polarization | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore light as a quaternionic phenomenon where amplitude, phase, and polarization unite in a coherent geometric framework for optical analysis.";
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
        { label: "Section 10.2" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 10 · Section 10.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Quaternionic Optics and Polarization
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Light as a four-dimensional geometric phenomenon
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Light is one of nature's most elegant phenomena. A beam of light carries energy across vast distances, oscillating as both electric and magnetic fields perpendicular to its direction of travel. We describe this oscillation through amplitude (brightness), frequency (color), phase (timing), and polarization (the orientation of the electric field). Traditionally, physicists treat these as separate properties. But in quaternionic optics, they unite into a single geometric structure.
            </p>

            <p>
              The key insight is that polarization can be modeled through rotation. The electric field vector of a polarized light wave traces out a path—linear, circular, or elliptical—as the wave propagates. Quaternions are a natural mathematical language for describing rotations in three dimensions, so they provide a useful coordinate view for polarized light.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How does quaternionic geometry help organize polarization?"
              plainLanguageSetup="Section 10.1 applied QSG to signals. Optics adds a visual case: polarization states already behave like rotations, so unit quaternions provide a compact coordinate framework for their transformations."
              formulaRecap={
                <>
                  <PrettyBlockMath math="q=\cos\frac{\phi}{2}+\mathbf u\sin\frac{\phi}{2},\qquad q_{\mathrm{out}}=p q_{\mathrm{in}}\bar p" />
                  <p>
                    The first formula stores polarization as a unit-quaternion state. The second applies an optical element as a rotation-like transformation.
                  </p>
                </>
              }
              checkpoint="What does this add beyond standard Jones or Mueller calculus?"
              revealAnswer="It gives a rotation-oriented coordinate view that can be useful for interpolation, composition, and geometric interpretation; it does not replace standard optics."
              finalTakeaway="Quaternionic optics is an application of the same S3 coordinate system to polarization and optical transformations."
              nextStep="Section 10.3 uses the same rotation language for robotics and navigation."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Polarization States as Quaternions</h2>

            <p>
              Consider a monochromatic light wave propagating along the z-axis. Its electric field oscillates in the xy-plane, and we can write the polarization state as a Jones vector. But a quaternionic representation captures more structure:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="q = \cos\frac{\phi}{2} + \mathbf{u}\sin\frac{\phi}{2}" />
            </div>

            <p>
              Here, <InlineMath math="\phi" /> describes the polarization angle, and <InlineMath math="\mathbf{u}" /> is a unit imaginary quaternion specifying the rotation axis. This unit quaternion represents the polarization state as a point on <InlineMath math="S^3" />, the three-sphere.
            </p>

            <p>
              Linear polarization corresponds to quaternions with specific symmetry. Circular polarization—where the electric field traces a helix as it propagates—corresponds to pure imaginary quaternions like <InlineMath math="i" />, <InlineMath math="j" />, or <InlineMath math="k" />. Elliptical polarization, the general case, occupies the full quaternionic sphere.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Optical Elements as Quaternionic Transformations</h2>

            <p>
              When polarized light passes through an optical element—a polarizer, a wave plate, a crystal—its polarization state changes. In the quaternionic framework, this transformation becomes quaternionic multiplication:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="q_{out} = p \cdot q_{in} \cdot \bar{p}" />
            </div>

            <p>
              The quaternion <InlineMath math="p" /> encodes the optical element's effect. This sandwich product (conjugation) is exactly how quaternions describe rotations in 3D space. A quarter-wave plate, for instance, is represented by a quaternion that rotates linear polarization into circular polarization.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why Quaternions Excel Here</p>
              <p className="text-gray-700">
                Matrix methods (Mueller calculus, Jones calculus) also describe polarization transformations, but quaternions offer key advantages: no gimbal lock when cascading many optical elements, natural interpolation between polarization states, and direct geometric interpretation as rotations on the Poincaré sphere.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Birefringence and Quaternionic Phase</h2>

            <p>
              Birefringent materials—crystals like calcite, or stressed glass—have different refractive indices for different polarizations. A beam entering such a material splits into two rays with orthogonal polarizations, traveling at different speeds. This creates a phase difference that changes the polarization state.
            </p>

            <p>
              In quaternionic optics, birefringence is a rotation in <InlineMath math="S^3" /> that depends on the quaternionic phase parameter <InlineMath math="u" />:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)' }}>
              <PrettyBlockMath math="\Delta\phi(u) = \frac{2\pi d}{\lambda}(n_e(u) - n_o(u))" />
            </div>

            <p>
              The dependence on <InlineMath math="u" /> captures how different slices through quaternionic space experience different phase shifts. This connects directly to the slice-regular functions of Chapter 4 and explains why certain polarization states are stable (resonant) while others evolve rapidly.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Coherence Wells in Polarization Space</h2>

            <p>
              Here's where the AGQF framework (Chapter 6) meets optics. The resonance wells we identified in quaternionic space have direct optical meaning: they correspond to stable polarization configurations.
            </p>

            <p>
              When light propagates through a complex optical system—multiple birefringent elements, scattering media, or turbulent atmosphere—most polarization states evolve chaotically. But certain states remain stable, sitting in "coherence wells" where the cumulative phase shifts conspire to return the polarization to itself.
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="V_{pol}(q) = -\beta\log|\sin(\pi |q|^2/2) + \delta|" />
            </div>

            <p>
              This potential function, adapted from the AGQF anchor potential, predicts which polarization states will be preferentially observed after propagation through complex media. The wells correspond to eigenstates of the combined optical system.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Experimental Application</p>
              <p className="text-gray-700">
                This framework explains observations in optical coherence tomography (OCT), where certain polarization states produce cleaner images. It also guides the design of laser cavities, where stable polarization modes correspond to low-loss resonances.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Optical Vortices and Quaternionic Phase Singularities</h2>

            <p>
              Some of the most exotic optical phenomena—optical vortices, phase singularities, and beams carrying orbital angular momentum—have natural quaternionic descriptions. An optical vortex is a beam where the phase winds around the propagation axis, creating a dark core where the phase is undefined.
            </p>

            <p>
              In quaternionic terms, these singularities occur where the quaternionic field vanishes—the zeros of a slice-regular optical function. The topological charge of the vortex (how many times the phase winds around) corresponds to the winding number on <InlineMath math="S^3" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                Quaternionic optics can model amplitude, phase, and polarization as aspects of a single quaternionic field evolving on <InlineMath math="S^3 \times \mathbb{R}" />. This unified coordinate view can simplify some analyses and make geometric relationships easier to inspect.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarkCompleteButton id="section-10-2" type="section" />

        <div className="flex justify-between items-center pt-8 border-t-2 mt-8" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-10/section-10-1" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Previous: 10.1 Signal Processing
          </Link>

          <Link href="/chapter-10-applications-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#3d7a8c' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <Link href="/chapter-10/section-10-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#1a3b47' }} data-testid="link-next-section">
            Next: 10.3 Robotics
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
