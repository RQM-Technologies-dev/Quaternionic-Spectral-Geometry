import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_6() {
  useEffect(() => {
    document.title = "Section 1.6: Quaternionic Planes and Slices | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore the complex planes hidden inside the quaternions, and learn how to use complex analysis slice by slice.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.6</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Quaternionic Planes and Slices
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Complex analysis inside quaternions
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              One of the most useful structural features of the quaternions is that they contain infinitely many copies of the complex plane. This isn't an abstract curiosity—it's a powerful computational tool. When working with a quaternion problem, you can often "zoom in" to a single complex slice, apply familiar complex analysis techniques, and then "zoom out" to see how the results fit into the full quaternionic picture.
            </p>

            <p>
              This section develops the theory of quaternionic slices, showing how the complex numbers sit inside the quaternions and how this structure enables sophisticated analysis.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How can complex-plane thinking still live inside quaternionic space?"
              plainLanguageSetup="The previous section used quaternions to rotate vectors. Here, the bridge is simpler: every chosen unit imaginary direction gives a familiar complex plane inside the larger quaternion space."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\mathbb{C}_u = \{x + uy : x,y\in\mathbb{R},\ |u|=1,\ u^2=-1\}" />
                  <p>
                    The symbol <InlineMath math="u" /> is the chosen imaginary axis. Inside this slice, <InlineMath math="u" /> behaves like the ordinary complex <InlineMath math="i" />.
                  </p>
                </>
              }
              checkpoint="Why does a slice let us use complex intuition without reducing everything to the usual i-plane?"
              revealAnswer="Because any unit imaginary direction can play the role of i. A slice gives complex arithmetic inside H while still remembering that many such planes sit in the full quaternionic space."
              finalTakeaway="Quaternionic analysis does not throw complex intuition away; it organizes many complex planes inside one four-dimensional algebra."
              nextStep="Section 1.7 restricts attention to unit quaternions and shows why S3 is not only a shape, but also a multiplication-compatible group."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Complex Slice</h2>

            <p>
              For any unit pure imaginary quaternion <InlineMath math="u" /> (meaning <InlineMath math="|u| = 1" /> and <InlineMath math="u^2 = -1" />), define:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\mathbb{C}_u = \{x + uy : x, y \in \mathbb{R}\}" />
            </div>

            <p>
              This is a two-dimensional real subspace of <InlineMath math="\mathbb{H}" />, and it's isomorphic to the complex numbers <InlineMath math="\mathbb{C}" />. The element <InlineMath math="u" /> plays the role of the imaginary unit <InlineMath math="i" />—it squares to <InlineMath math="-1" /> and spans the "imaginary axis" of this slice.
            </p>

            <p>
              The standard complex numbers <InlineMath math="\mathbb{C}" /> sit inside <InlineMath math="\mathbb{H}" /> as the slice <InlineMath math="\mathbb{C}_i = \{x + iy\}" />. But there are infinitely many other slices: <InlineMath math="\mathbb{C}_j" />, <InlineMath math="\mathbb{C}_k" />, and <InlineMath math="\mathbb{C}_u" /> for any other unit imaginary <InlineMath math="u" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Sphere of Imaginaries</h2>

            <p>
              The unit pure imaginaries form a 2-sphere inside <InlineMath math="\mathbb{H}" />:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="S^2 = \{u \in \text{Im}\,\mathbb{H} : |u| = 1\} = \{bi + cj + dk : b^2 + c^2 + d^2 = 1\}" />
            </div>

            <p>
              Each point on this sphere determines a complex slice. As <InlineMath math="u" /> varies over <InlineMath math="S^2" />, the corresponding slices <InlineMath math="\mathbb{C}_u" /> sweep out the entire quaternion algebra (except for the purely real axis, which is shared by all slices).
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Geometric Picture</p>
              <p className="text-gray-700">
                Imagine <InlineMath math="\mathbb{H}" /> as <InlineMath math="\mathbb{R}^4" /> with the real axis as a vertical spine. The complex slices are planes that all contain this spine, fanning out in different directions through the imaginary dimensions. Every point in <InlineMath math="\mathbb{H}" /> lies on some slice (infinitely many, in fact, except for the purely real points).
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Properties of Slices</h2>

            <p>
              The slice structure has several important properties:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>Intersection:</strong> Any two distinct slices <InlineMath math="\mathbb{C}_u" /> and <InlineMath math="\mathbb{C}_v" /> (with <InlineMath math="u \neq \pm v" />) intersect only along the real axis <InlineMath math="\mathbb{R}" />.
              </li>
              <li>
                <strong>Opposite slices:</strong> <InlineMath math="\mathbb{C}_u = \mathbb{C}_{-u}" />—the slice is the same whether you use <InlineMath math="u" /> or <InlineMath math="-u" /> as the imaginary unit.
              </li>
              <li>
                <strong>Commutativity within slices:</strong> Elements of the same slice commute with each other, since each slice is a copy of the commutative algebra <InlineMath math="\mathbb{C}" />.
              </li>
              <li>
                <strong>Polar form:</strong> Every quaternion <InlineMath math="q \neq 0" /> can be written as <InlineMath math="q = re^{u\theta}" /> for some <InlineMath math="r > 0" />, unit imaginary <InlineMath math="u" />, and angle <InlineMath math="\theta" />.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Using Slices for Computation</h2>

            <p>
              The slice structure enables powerful computational techniques. If you need to analyze a quaternion <InlineMath math="q = a + v" /> with <InlineMath math="v \neq 0" />, write <InlineMath math="u = v/|v|" /> and work in the slice <InlineMath math="\mathbb{C}_u" />. Within this slice, <InlineMath math="q = a + u|v|" /> looks exactly like a complex number <InlineMath math="a + i|v|" />.
            </p>

            <p>
              Functions that make sense for complex numbers often extend to quaternions by applying them slice-by-slice:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="e^q = e^{a + v} = e^a e^v = e^a(\cos|v| + u\sin|v|)" />
            </div>

            <p>
              This is the quaternion exponential, computed by treating <InlineMath math="v" /> as a "complex-like" imaginary part. The same approach works for logarithms, powers, and other functions.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Helps</p>
              <p className="text-gray-700">
                You can leverage your complex analysis intuition within quaternions. Need to find roots of a quaternion polynomial? Work in a slice. Need to understand the geometry of an exponential map? Visualize it as complex exponentiation, then remember you're on a 3-sphere of possible axes. The slice perspective makes high-dimensional quaternion geometry tractable.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Slice Regularity</h2>

            <p>
              The slice structure leads to an important concept in quaternionic analysis: slice regularity. A function <InlineMath math="f: \mathbb{H} \to \mathbb{H}" /> is called slice regular if its restriction to each complex slice is holomorphic in the usual complex sense.
            </p>

            <p>
              Many important quaternionic functions are slice regular: polynomials, exponentials, and certain classes of power series. This theory, developed in the early 2000s, provides a rigorous framework for quaternionic calculus that respects the slice structure.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Connecting to Rotations</h2>

            <p>
              The slice structure connects beautifully to the rotation interpretation. Each slice <InlineMath math="\mathbb{C}_u" /> corresponds to rotations around the axis <InlineMath math="u" />. The unit circle in the slice—the set <InlineMath math="\{e^{u\theta} : \theta \in [0, 2\pi)\}" />—is a great circle on <InlineMath math="S^3" />, representing all rotations (at various angles) around the fixed axis <InlineMath math="u" />.
            </p>

            <p>
              When you move from one slice to another, you're changing the rotation axis. The full <InlineMath math="S^3" /> emerges from the union of all these great circles, one for each axis direction on the sphere <InlineMath math="S^2" /> of imaginaries.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-5" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.5
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-6" title="Section 1.6" />

          <Link href="/chapter-1/section-1-7" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.7
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
