import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section7_5() {
  useEffect(() => {
    document.title = "Section 7.5: Visualizing Coherence Fields | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "See coherence as flowing textures and patterns across the hypersphere—a living field of geometric harmony, with summary insights and outlook for spectral operators.";
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
        { label: "Section 7.5" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 7 · Section 7.5</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Visualizing Coherence Fields
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Seeing the geometry of harmony across the hypersphere
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Mathematics often proceeds through equations, but understanding arrives through images. We can define coherence precisely with formulas, but to truly grasp what it means requires visualization—seeing the abstract geometry made tangible.
            </p>

            <p>
              Visualizing quaternionic coherence requires thinking of orientation as <strong>texture</strong> rather than shape. Every point on <InlineMath math="S^3" /> carries its own local direction and phase. The coherence field describes how smoothly these orientations transition across the manifold—where they flow in harmony and where they clash.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How can we see coherence, drift, and stability in a field?"
              plainLanguageSetup="Section 7.4 described drift toward a resonant axis. Visualization turns the same information into readable maps: brightness for coherence, arrows for phase flow, and surfaces for stable or unstable regions."
              formulaRecap={
                <>
                  <PrettyBlockMath math="C(q_1,q_2)\quad\text{and}\quad \frac{d\mathbf{u}}{dt}" />
                  <p>
                    The coherence value tells how aligned states are. The drift vector tells how the orientation axis changes over time.
                  </p>
                </>
              }
              checkpoint="What does a bright, converging region suggest in a coherence visualization?"
              revealAnswer="It suggests strong alignment and local drift toward a stable coherence region, within the limits of the chosen metric and visualization."
              finalTakeaway="Visualization makes coherence operational: it shows where alignment is strong, where drift points, and where stability may break down."
              nextStep="Chapters 8-10 can build on this by studying spectral operators, computation, and applications."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Three Ways to See Coherence</h2>

            <p>
              There's no single "right" way to visualize a four-dimensional coherence field on a two-dimensional page. Instead, we use complementary methods that each reveal different aspects of the same underlying structure.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#2d5a69' }}>1. Coherence Density Maps</h3>

            <p>
              The simplest visualization uses color intensity to represent <InlineMath math="C(q_1, q_2)" />. Bright regions indicate stable alignment; dark regions show decoherence boundaries. Imagine looking at Earth from space through a thermal camera—hot regions glow, cold regions are dark.
            </p>

            <p>
              On a coherence density map, the "hot" regions are where quaternionic states align perfectly. The "cold" regions are the destructive interference shells where coherence collapses. The pattern resembles a topographic map, with coherence wells as valleys and decoherence boundaries as ridges.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#2d5a69' }}>2. Flow Lines and Phase Currents</h3>

            <p>
              A more dynamic visualization shows the direction of phase drift <InlineMath math="d\mathbf{u}/dt" /> as arrows or streamlines. These flow lines reveal how orientations evolve—which directions they tend toward, where they circulate, and where they converge.
            </p>

            <p>
              Regions where flow lines converge are <strong>resonance attractors</strong>—the Resonant Axes we studied earlier. Flow lines that circle without converging indicate oscillatory regions where coherence fluctuates. Regions where flow lines diverge are unstable—coherence there is transient, quickly lost to neighboring attractors.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The River Metaphor</p>
              <p className="text-gray-700">
                Think of coherence flow like rivers on a landscape. Water flows downhill toward basins; phase orientation flows toward coherence wells. Rivers merge as they approach the ocean; flow lines merge as they approach resonance attractors. The entire "drainage pattern" of the coherence field reveals the geometry of stability.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#2d5a69' }}>3. Phase Shells and Standing Waves</h3>

            <p>
              Surfaces of equal phase alignment—called <strong>phase shells</strong>—correspond to the hyperspherical boundaries that separate different coherence regions. These are the geometric analogues of standing waves: locations where the field's oscillation has a consistent phase relationship with the origin.
            </p>

            <p>
              Visualizing phase shells means drawing nested surfaces, like the layers of an onion or the equipotential surfaces around a charge. Each shell represents a different phase value, and the spacing between shells indicates how rapidly phase changes—tight spacing means rapid change, wide spacing means gradual transition.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Dynamic Picture</h2>

            <p>
              Real coherence fields aren't static—they evolve. As the system changes, coherence flows like a fluid across <InlineMath math="S^3" />. Currents of alignment circulate, form vortices, and stabilize in resonance basins. When coherence fronts collide, they form interference boundaries that delineate quantized zones of stability.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Weather in Higher Dimensions</p>
              <p className="text-gray-700">
                Coherence on <InlineMath math="S^3" /> is like weather in higher dimensions. There are regions of calm alignment—the clear skies of perfect coherence. There are storms of destructive interference—turbulent zones where orientations clash. But even these storms are structured: their boundaries trace the manifold's harmonic rhythm, separating one coherent region from the next.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Chapter Summary: The Geometry of Agreement</h2>

            <p>
              We've traveled far in this chapter, from the definition of quaternionic coherence to its visualization as living fields on the hypersphere. Let's gather the key insights:
            </p>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li><strong>Coherence is geometric alignment</strong>: In quaternionic geometry, coherence means the alignment of both phase and orientation, measured by <InlineMath math="C(q_1, q_2) = |\mathrm{Re}(q_1 \overline{q_2})|" />.</li>
              <li><strong>Interference creates structure</strong>: Constructive and destructive interference on <InlineMath math="S^3" /> generate alternating regions of resonance and decoherence—the wells and walls that organize energy.</li>
              <li><strong>Spectral coherence unifies phase and direction</strong>: The spectral coherence function measures how energy and orientation persist across frequencies, decomposing into scalar (phase) and vector (directional) components.</li>
              <li><strong>Equilibration maintains stability</strong>: The Resonant Axis Model shows how systems naturally evolve toward coherence, guided by geometric curvature that creates restoring forces.</li>
              <li><strong>Coherence is visible as texture</strong>: Flow lines, density maps, and phase shells reveal coherence as a flowing, living field of geometric harmony.</li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Central Insight</p>
              <p className="text-gray-700">
                Coherence is not a fragile alignment easily broken—it is an <strong>attractor</strong> in geometric space. Systems resonate toward coherence as naturally as objects fall toward gravity. The quaternionic manifold provides the curvature that makes this possible, bending the space of orientations so that aligned states are energetically favored.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Looking Forward: Spectral Operators</h2>

            <p>
              We now understand coherence—what it means, how it arises, and why it persists. But coherence doesn't exist in isolation; it's shaped by the dynamics of fields governed by differential equations. The natural question is: what operators describe these dynamics?
            </p>

            <p>
              In the next chapter, we'll introduce <strong>Quaternionic Spectral Operators</strong>: tools for describing how coherence is generated, transported, or disrupted. We'll see how familiar operators like the Laplacian, the Dirac operator, and Maxwell's equations can be studied in quaternionic coordinates.
            </p>

            <p>
              The spectral operators will connect everything we've learned—from the manifold structure of Chapter 3 to the coherence concepts of this chapter—into a unified framework for understanding how physical systems evolve while maintaining their geometric integrity.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Chapter 8 Preview</p>
              <p className="text-gray-700">
                Chapter 8 introduces <strong>Quaternionic Spectral Operators</strong>, connecting the geometry of coherence to the mathematics of field equations. We'll discover how the Dirac, Maxwell, and Laplace operators emerge as natural structures on quaternionic space—showing that the fundamental equations of physics are expressions of quaternionic resonance geometry.
              </p>
            </div>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Takeaway</p>
              <p className="text-gray-700">
                Visualizing coherence transforms abstract geometry into tangible intuition. Whether through density maps, flow lines, or phase shells, we see that coherence is not static but dynamic—a living field of geometric harmony that flows, equilibrates, and stabilizes across the hypersphere. This visual understanding prepares us for the operator formalism that will make these dynamics precise.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-7/section-7-4" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 7.4
          </Link>

          <MarkCompleteButton type="section" id="section-7-5" title="Section 7.5" />

          <Link href="/chapter-8-special-functions-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-chapter">
            Chapter 8
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
