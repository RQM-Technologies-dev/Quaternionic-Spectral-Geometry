import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_8() {
  useEffect(() => {
    document.title = "Section 1.8: The Hopf Fibration | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Discover the Hopf fibration S¹ → S³ → S², a beautiful structure showing how the 3-sphere fibers over the 2-sphere with circle fibers.";
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
            <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 1
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.8</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Hopf Fibration
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              <InlineMath math="S^1 \to S^3 \to S^2" />: Circles over spheres
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The Hopf fibration is one of the most useful constructions in this chapter. It shows that the 3-sphere <InlineMath math="S^3" /> can be decomposed into circles, with each circle corresponding to a point on the ordinary 2-sphere <InlineMath math="S^2" />. This structure connects quaternions to direction, phase, and the geometry of spin.
            </p>

            <p>
              Understanding the Hopf fibration reveals why spinors carry both directional and phase information—and why these two aspects are geometrically intertwined on the 3-sphere.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How can S3 contain both phase and direction?"
              plainLanguageSetup="Section 1.7 treated S3 as a group. The Hopf fibration adds a projection: a unit quaternion can point to a direction on S2 while still carrying a circle of phase information above that direction."
              formulaRecap={
                <>
                  <PrettyBlockMath math="h:S^3\to S^2,\qquad h(q)=qi\bar q" />
                  <p>
                    The map rotates a reference axis, here <InlineMath math="i" />, by the state <InlineMath math="q" />. Quaternions that differ only by fiber phase can land on the same direction.
                  </p>
                </>
              }
              checkpoint="What stays fixed along one Hopf fiber?"
              revealAnswer="The projected direction in S2 stays fixed. Moving along the fiber changes the phase associated with that direction."
              finalTakeaway="The Hopf fibration packages direction and phase together without pretending they are independent flat coordinates."
              nextStep="Section 1.9 asks how to measure and average uniformly on this curved unit-quaternion state space."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Hopf Map</h2>

            <p>
              Define the Hopf map <InlineMath math="h: S^3 \to S^2" /> by:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="h(q) = qi\bar{q} \in S^2" />
            </div>

            <p>
              Here we're using the conjugation action on the basis element <InlineMath math="i" />. The result is always a unit pure imaginary quaternion (an element of <InlineMath math="S^2 \subset \text{Im}\,\mathbb{H}" />), representing the direction that <InlineMath math="q" /> takes the <InlineMath math="i" />-axis to.
            </p>

            <p>
              In physical terms: if we pick <InlineMath math="i" /> as a reference direction (like "up"), then <InlineMath math="h(q)" /> tells us which physical direction a system in state <InlineMath math="q" /> considers to be "up."
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Fibers</h2>

            <p>
              What quaternions <InlineMath math="q" /> map to the same point on <InlineMath math="S^2" />? If <InlineMath math="h(q) = h(q')" />, then <InlineMath math="qi\bar{q} = q'i\bar{q'}" />, which means <InlineMath math="q^{-1}q'" /> commutes with <InlineMath math="i" />. The quaternions commuting with <InlineMath math="i" /> are precisely those in the slice <InlineMath math="\mathbb{C}_i" />, which intersects <InlineMath math="S^3" /> in a circle.
            </p>

            <p>
              Therefore:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="h^{-1}(p) = \{qe^{i\theta} : \theta \in [0, 2\pi)\}" />
            </div>

            <p>
              for any <InlineMath math="q" /> with <InlineMath math="h(q) = p" />. Each fiber is a circle—the <InlineMath math="S^1" /> of "phases" that share the same direction.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Picture</p>
              <p className="text-gray-700">
                Think of <InlineMath math="S^3" /> as made of circles, one for each point on <InlineMath math="S^2" />. Every point on the 2-sphere (representing a direction in 3D space) has a whole circle of quaternions above it—all the different spin phases that point in that direction. The 3-sphere is "all directions <InlineMath math="\times" /> all phases," but the product is twisted in a beautiful, nontrivial way.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Why "Fibration"?</h2>

            <p>
              A fibration is a map <InlineMath math="E \to B" /> where the inverse image of each point (the "fiber") has the same topological type, and locally the space looks like a product. The Hopf fibration has:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>Total space:</strong> <InlineMath math="E = S^3" /> (the 3-sphere of unit quaternions)
              </li>
              <li>
                <strong>Base space:</strong> <InlineMath math="B = S^2" /> (the 2-sphere of directions)
              </li>
              <li>
                <strong>Fiber:</strong> <InlineMath math="F = S^1" /> (the circle of phases)
              </li>
            </ul>

            <p>
              Locally, near any point of <InlineMath math="S^2" />, the portion of <InlineMath math="S^3" /> above it looks like <InlineMath math="(\text{disk}) \times S^1" />. But globally, the circles are linked together in a nontrivial way—the fibration is not a mere product <InlineMath math="S^2 \times S^1" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Linked Circles</h2>

            <p>
              One of the most remarkable features: any two Hopf fibers are linked. Take two points <InlineMath math="p, p' \in S^2" />. The corresponding circles in <InlineMath math="S^3" /> pass through each other exactly once—they form a Hopf link.
            </p>

            <p>
              This linking encodes the non-triviality of the fibration. If the fibration were a product, you could separate any two fibers; the linking shows that <InlineMath math="S^3" /> genuinely differs from <InlineMath math="S^2 \times S^1" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Physical Interpretation</p>
              <p className="text-gray-700">
                In quantum mechanics, the Hopf fibration explains why spin states cannot be reduced to mere direction vectors. A spin-1/2 particle has both a direction (where on <InlineMath math="S^2" /> its spin points) and a phase (where on the fiber circle it sits). These are intertwined: you can't specify one independently of the other in a global way, because the bundle is twisted.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Connection to Rotations</h2>

            <p>
              The Hopf fibration relates directly to the double cover <InlineMath math="S^3 \to SO(3)" />. While the Hopf map projects to directions (<InlineMath math="S^2" />), we can think of the base as the space of "oriented axes"—each axis direction on <InlineMath math="S^2" /> corresponds to many rotations (all those with that axis), forming the fiber.
            </p>

            <p>
              More precisely, the Hopf fiber over a direction <InlineMath math="u \in S^2" /> consists of all rotations around the axis <InlineMath math="u" />. The fiber is <InlineMath math="U(1) \cong S^1" />—the group of rotations around a fixed axis.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Stereographic Visualization</h2>

            <p>
              While we can't directly see <InlineMath math="S^3" />, we can visualize the Hopf fibration by stereographic projection. Project <InlineMath math="S^3" /> to <InlineMath math="\mathbb{R}^3" />; the Hopf fibers become:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>Most fibers project to circles in <InlineMath math="\mathbb{R}^3" /></li>
              <li>One fiber (through the projection point) becomes a straight line</li>
              <li>The circles are linked in nested, swirling patterns called "torus knots"</li>
            </ul>

            <p>
              These visualizations reveal the intricate structure: the Hopf fibration fills all of <InlineMath math="S^3" /> with interlocking circles, each passing through every other exactly once.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-7" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.7
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-8" title="Section 1.8" />

          <Link href="/chapter-1/section-1-9" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.9
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
