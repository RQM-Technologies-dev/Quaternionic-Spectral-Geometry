import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter3Section3_1() {
  useEffect(() => {
    document.title = "Section 3.1: The Manifold Structure of S³ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore the 3-sphere as a smooth manifold, including its definition, stereographic projection, and local coordinate systems for quaternionic spectral geometry.";
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
            <Link href="/chapter-3-differential-geometry-s3" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 3
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 3 · Section 3.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Manifold Structure of <InlineMath math="S^3" />
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Definition, stereographic projection, and local coordinates
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Chapter 2 treated unit quaternions as rotations. Chapter 3 asks the next question: if all those unit quaternions form <InlineMath math="S^3" />, what kind of space is <InlineMath math="S^3" /> and how can we do calculus on it?
            </p>

            <p>
              The plain-language model is a curved space that looks flat when you zoom in. That is what a manifold is. This section introduces the formal definition of <InlineMath math="S^3" />, then gives coordinate charts and stereographic projection so local calculations become possible.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="If unit quaternions form a space, what kind of space is it?"
              plainLanguageSetup="S³ is a smooth manifold: globally curved, locally coordinate-like. That lets us use calculus while respecting the curved orientation space."
              formulaRecap={
                <>
                  <PrettyBlockMath math="S^3 = \{(x_0,x_1,x_2,x_3)\in\mathbb{R}^4 : x_0^2+x_1^2+x_2^2+x_3^2=1\}" />
                  <p>
                    This says S³ is the unit-distance set in four coordinates. A unit quaternion <InlineMath math="q = a+bi+cj+dk" /> is a point on this same set.
                  </p>
                </>
              }
              checkpoint="Why do we need coordinate charts if S³ is already defined by one equation?"
              revealAnswer="The equation defines the curved space globally, but charts give local coordinates where derivatives, metrics, and later operators can be computed."
              finalTakeaway="S³ is not just a picture of unit quaternions. It is the smooth space on which QSG will define motion, change, calculus, and eventually spectra."
              nextStep="Section 3.2 attaches tangent spaces and the Lie group structure to this manifold."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Definition of the 3-Sphere</h2>

            <p>
              The 3-sphere is defined as the set of all points in four-dimensional space that lie at unit distance from the origin:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="S^3 = \{(x_0, x_1, x_2, x_3) \in \mathbb{R}^4 : x_0^2 + x_1^2 + x_2^2 + x_3^2 = 1\}" />
            </div>

            <p>
              This is the natural generalization of familiar spheres. The 1-sphere <InlineMath math="S^1" /> is the circle (all points in <InlineMath math="\mathbb{R}^2" /> at distance 1 from the origin). The 2-sphere <InlineMath math="S^2" /> is the ordinary sphere we see in everyday life (all points in <InlineMath math="\mathbb{R}^3" /> at distance 1). The 3-sphere continues this pattern in <InlineMath math="\mathbb{R}^4" />.
            </p>

            <p>
              What makes <InlineMath math="S^3" /> special for our purposes is its connection to quaternions. Every unit quaternion <InlineMath math="q = a + bi + cj + dk" /> with <InlineMath math="|q| = 1" /> corresponds to a point on <InlineMath math="S^3" />. The coordinates <InlineMath math="(a, b, c, d)" /> satisfy the unit constraint, and quaternion multiplication gives <InlineMath math="S^3" /> a rich algebraic structure that ordinary spheres lack.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition</p>
              <p className="text-gray-700">
                Think of <InlineMath math="S^3" /> as the space of all possible orientations of a rigid body in 3D. Every way you can rotate an object corresponds to exactly one point on <InlineMath math="S^3" /> (with a subtle sign ambiguity we'll address later). The 3-sphere is literally the "shape of rotation."
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Why We Need Local Coordinates</h2>

            <p>
              The 3-sphere is a curved three-dimensional surface sitting in four-dimensional space. We can't flatten it onto <InlineMath math="\mathbb{R}^3" /> without distortion, just as you can't flatten a map of Earth without stretching some regions. But we <em>can</em> cover <InlineMath math="S^3" /> with overlapping patches, each of which maps smoothly to a piece of <InlineMath math="\mathbb{R}^3" />. These patches are called coordinate charts.
            </p>

            <p>
              A coordinate chart assigns three numbers to each point in a region of <InlineMath math="S^3" />. Different charts cover different regions, and where they overlap, we need smooth transition functions that relate one set of coordinates to another. This collection of charts with compatible transitions is what makes <InlineMath math="S^3" /> a smooth manifold.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Stereographic Projection</h2>

            <p>
              The most useful coordinate system for many purposes is stereographic projection. The idea is simple: pick a point on <InlineMath math="S^3" /> (say the "north pole" at <InlineMath math="(1, 0, 0, 0)" />) and draw a line from that point through any other point on the sphere. Where this line intersects a flat hyperplane, that's where we map the point.
            </p>

            <p>
              Projecting from the north pole <InlineMath math="N = (1, 0, 0, 0)" /> onto the hyperplane <InlineMath math="x_0 = 0" />, the formula is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\pi(x_0, x_1, x_2, x_3) = \frac{(x_1, x_2, x_3)}{1 - x_0}" />
            </div>

            <p>
              This maps every point of <InlineMath math="S^3" /> except the north pole to a unique point in <InlineMath math="\mathbb{R}^3" />. Points near the south pole map near the origin. Points near the equator map to intermediate distances. And as you approach the north pole, points get mapped farther and farther away—the north pole itself corresponds to "infinity."
            </p>

            <p>
              The inverse map brings us back to the sphere:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="x_0 = \frac{1 - r^2}{1 + r^2}, \quad (x_1, x_2, x_3) = \frac{2\mathbf{r}}{1 + r^2}" />
            </div>

            <p>
              where <InlineMath math="\mathbf{r} = (r_1, r_2, r_3)" /> is a point in <InlineMath math="\mathbb{R}^3" /> and <InlineMath math="r = |\mathbf{r}|" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                Stereographic projection is <em>conformal</em>—it preserves angles. If two curves on <InlineMath math="S^3" /> meet at 45°, their images in <InlineMath math="\mathbb{R}^3" /> also meet at 45°. This makes it invaluable for visualizing and computing. However, it does distort distances—points near the north pole get stretched out enormously.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Covering the Whole Sphere</h2>

            <p>
              Stereographic projection from the north pole misses one point—the north pole itself. To cover all of <InlineMath math="S^3" />, we use two charts: one projecting from the north pole, another from the south pole <InlineMath math="(-1, 0, 0, 0)" />. Where these charts overlap, the transition between them is smooth (in fact, it's an inversion through a sphere in <InlineMath math="\mathbb{R}^3" />).
            </p>

            <p>
              This two-chart atlas is the simplest way to give <InlineMath math="S^3" /> a smooth structure. The existence of such an atlas—with smooth transitions between overlapping charts—is what makes <InlineMath math="S^3" /> a smooth manifold. Every calculation we do in differential geometry respects this structure.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Euler Angle Coordinates</h2>

            <p>
              Another useful coordinate system comes from Euler angles. A unit quaternion can be written as:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\begin{aligned}
q
&= \cos\frac{\alpha}{2}\cos\frac{\beta}{2}
 + \sin\frac{\alpha}{2}\cos\frac{\beta}{2}\,\mathbf{k} \\
&\quad + \cos\frac{\alpha}{2}\sin\frac{\beta}{2}\,\mathbf{j}
 + \sin\frac{\alpha}{2}\sin\frac{\beta}{2}\,\mathbf{i}.
\end{aligned}" />
            </div>

            <p>
              with angles <InlineMath math="\alpha \in [0, 2\pi)" />, <InlineMath math="\beta \in [0, \pi]" />, and a third angle <InlineMath math="\gamma \in [0, 4\pi)" /> (which we've suppressed for clarity). These coordinates directly parameterize rotations: <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> pick the rotation axis, while <InlineMath math="\gamma" /> sets the rotation angle.
            </p>

            <p>
              Euler angles are singular at certain points (the "gimbal lock" problem familiar to aerospace engineers), so they don't form a global chart. But they're often more physically intuitive than stereographic coordinates, especially when connecting quaternions to the rotation group.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Manifold Structure in Summary</h2>

            <p>
              The 3-sphere is a compact, connected, three-dimensional smooth manifold without boundary. "Compact" means it's bounded and closed—there are no edges, and you can't escape to infinity. "Connected" means it's all one piece. "Without boundary" means there's no edge like the rim of a disk.
            </p>

            <p>
              These properties have important consequences: any continuous function on <InlineMath math="S^3" /> attains its maximum and minimum (by compactness), every point can be reached from every other point by a continuous path (by connectedness), and the manifold looks the same in every direction from any point (by homogeneity, which comes from the group structure).
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Looking Ahead</p>
              <p className="text-gray-700">
                With the manifold structure established, we're ready to add more geometry. In the next section, we'll attach a tangent space to each point—the space of all possible velocities at that point. This leads directly to the Lie group structure and the algebra of infinitesimal rotations.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/chapter-3-differential-geometry-s3" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            <span>Chapter 3 Overview</span>
          </Link>
          <MarkCompleteButton type="section" id="section-3-1" title="Section 3.1" />
          <Link href="/chapter-3/section-3-2" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-next-section">
            <span>Section 3.2</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
