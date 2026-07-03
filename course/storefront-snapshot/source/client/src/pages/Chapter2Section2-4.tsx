import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter2Section2_4() {
  useEffect(() => {
    document.title = "Section 2.4: Great Circles and Geodesics | QSG Textbook";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="relative overflow-hidden mt-16" style={{
        background: 'linear-gradient(135deg, #1a3b47 0%, #2d5a69 50%, #3d7a8c 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(77, 154, 175, 0.4) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6">
            <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 2
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Section 2.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Geometry of <InlineMath math="S^3" />: Great Circles and Geodesics
            </h1>
            <p className="text-xl text-white/90 italic">
              The Shortest Paths Between Orientations
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          <p className="text-lg leading-relaxed mb-6">
            On a curved surface, the shortest path between two points is not a straight line but a geodesic—a curve that bends along with the surface while minimizing distance. On the 3-sphere <InlineMath math="S^3" />, geodesics are great circles, and understanding them reveals how rotations flow smoothly from one orientation to another.
          </p>

          <QSGSectionTeachingBlock
            learnerQuestion="How do we move smoothly between two orientations?"
            plainLanguageSetup="Section 2.3 explained why rotations are represented by antipodal pairs on S3. To interpolate, we follow a shortest arc on that sphere instead of drawing a straight line through the ambient coordinates."
            formulaRecap={
              <>
                <PrettyBlockMath math="\gamma(t)=\cos t+\mathbf{X}\sin t,\qquad d_{S^3}(q_1,q_2)=\arccos\langle q_1,q_2\rangle" />
                <p>
                  A great circle keeps unit length automatically, and the distance formula measures the spherical angle between two unit quaternions.
                </p>
              </>
            }
            checkpoint="Why not interpolate quaternion components linearly?"
            revealAnswer="Linear interpolation can leave S3 or move with uneven speed unless it is corrected. A geodesic stays on the unit sphere and follows the natural shortest path."
            finalTakeaway="Smooth rotation interpolation means moving along S3, not through the flat four-dimensional space around it."
            nextStep="Section 2.5 studies the infinitesimal version: tangent vectors, frames, and angular velocity."
          />

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>What is a Geodesic?</h2>

          <p className="mb-4">
            A geodesic is a curve that locally minimizes length. On a flat plane, geodesics are straight lines. On the surface of Earth (approximately a 2-sphere), geodesics are great circles—the largest circles that can be drawn on the sphere, like the equator or any meridian.
          </p>

          <p className="mb-4">
            On <InlineMath math="S^3" />, geodesics are also great circles, but now they live in four-dimensional space. A great circle on <InlineMath math="S^3" /> is the intersection of the 3-sphere with a 2-dimensional plane through the origin of <InlineMath math="\mathbb{R}^4" />.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Geodesics Through the Identity</h2>

          <p className="mb-4">
            The geodesics through the identity quaternion <InlineMath math="q = 1" /> have a particularly simple form. They are parameterized by:
          </p>

          <PrettyBlockMath math="\gamma(t) = e^{\mathbf{X}t} = \cos t + \mathbf{X}\sin t," />

          <p className="mb-4">
            where <InlineMath math="\mathbf{X}" /> is a unit pure imaginary quaternion (satisfying <InlineMath math="|\mathbf{X}| = 1" />). As <InlineMath math="t" /> varies, this traces a great circle on <InlineMath math="S^3" /> that passes through <InlineMath math="1" /> at <InlineMath math="t = 0" />.
          </p>

          <p className="mb-4">
            The parameter <InlineMath math="t" /> represents arc length along the geodesic. When <InlineMath math="t = \pi" />, we reach <InlineMath math="\gamma(\pi) = -1" />, the antipodal point to the identity. When <InlineMath math="t = 2\pi" />, we return to <InlineMath math="\gamma(2\pi) = 1" />, completing the circle.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Physical Interpretation</p>
            <p>
              Moving along the geodesic <InlineMath math="\gamma(t) = e^{\mathbf{X}t}" /> corresponds to rotating about a fixed axis <InlineMath math="\mathbf{X}" /> at constant angular velocity. The angle increases linearly with time, giving the smoothest possible rotation between two orientations.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Distance on the 3-Sphere</h2>

          <p className="mb-4">
            The geodesic distance between two unit quaternions <InlineMath math="q_1" /> and <InlineMath math="q_2" /> is the length of the shortest great circle arc connecting them:
          </p>

          <PrettyBlockMath math="d_{S^3}(q_1, q_2) = \arccos(\langle q_1, q_2 \rangle)," />

          <p className="mb-4">
            where <InlineMath math="\langle q_1, q_2 \rangle = a_1 a_2 + b_1 b_2 + c_1 c_2 + d_1 d_2" /> is the Euclidean inner product in <InlineMath math="\mathbb{R}^4" />. This formula measures the angle between the quaternions when viewed as 4-vectors.
          </p>

          <p className="mb-4">
            Because antipodal quaternions <InlineMath math="q" /> and <InlineMath math="-q" /> represent the same rotation, the distance in <InlineMath math="\mathrm{SO}(3)" /> is:
          </p>

          <PrettyBlockMath math="d_{\mathrm{SO}(3)}(R_1, R_2) = \arccos(|\langle q_1, q_2 \rangle|)." />

          <p className="mb-4">
            The absolute value ensures we measure to the closer of the two quaternion representatives.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Rotation Angle from Distance</h2>

          <p className="mb-4">
            The geodesic distance relates directly to the physical rotation angle. If <InlineMath math="q_1" /> and <InlineMath math="q_2" /> are unit quaternions, the rotation <InlineMath math="R = q_1^{-1} q_2" /> has half-angle:
          </p>

          <PrettyBlockMath math="\varphi = d_{S^3}(q_1, q_2) = \arccos(\langle q_1, q_2 \rangle)." />

          <p className="mb-4">
            The full rotation angle in physical space is <InlineMath math="\Theta = 2\varphi" />. This means:
          </p>

          <PrettyBlockMath math="\Theta = 2\arccos(|\langle q_1, q_2 \rangle|)." />

          <p className="mb-4">
            Small geodesic distances correspond to small rotation angles, and the maximum distance <InlineMath math="\pi" /> corresponds to a 180° rotation (the farthest any orientation can be from another).
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Geodesics Between Any Two Points</h2>

          <p className="mb-4">
            To find the geodesic between arbitrary quaternions <InlineMath math="q_0" /> and <InlineMath math="q_1" />, we use left translation. The geodesic through <InlineMath math="q_0" /> and <InlineMath math="q_1" /> is:
          </p>

          <PrettyBlockMath math="\gamma(t) = q_0 \exp\bigl(t \cdot \log(q_0^{-1}q_1)\bigr), \quad t \in [0,1]." />

          <p className="mb-4">
            At <InlineMath math="t = 0" /> we have <InlineMath math="\gamma(0) = q_0" />, and at <InlineMath math="t = 1" /> we have <InlineMath math="\gamma(1) = q_1" />. The curve travels along a great circle at constant speed.
          </p>

          <p className="mb-4">
            This formula is the mathematical foundation of SLERP (Spherical Linear Interpolation), the standard algorithm for smoothly interpolating between orientations in computer graphics and robotics.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>SLERP: Spherical Linear Interpolation</p>
            <p className="mb-2">
              The SLERP formula, when <InlineMath math="\langle q_0, q_1 \rangle = \cos\Omega" />, is:
            </p>
            <PrettyBlockMath math="\mathrm{SLERP}(q_0, q_1; t) = \frac{\sin((1-t)\Omega)}{\sin\Omega}q_0 + \frac{\sin(t\Omega)}{\sin\Omega}q_1." />
            <p className="mt-2">
              This produces motion at constant angular velocity—no speeding up or slowing down—giving the smoothest possible transition between orientations.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Curvature of the 3-Sphere</h2>

          <p className="mb-4">
            The 3-sphere has constant positive curvature. Unlike flat space, where parallel lines remain parallel, geodesics on <InlineMath math="S^3" /> eventually converge and cross. Starting two nearby geodesics from the identity, they will meet again at the antipodal point <InlineMath math="-1" />.
          </p>

          <p className="mb-4">
            The sectional curvature of <InlineMath math="S^3" /> (a measure of how quickly geodesics converge) equals 1 everywhere when the sphere has radius 1. This constant curvature makes <InlineMath math="S^3" /> a symmetric space—it looks the same from every point and in every direction.
          </p>

          <p className="mb-4">
            The volume of <InlineMath math="S^3" /> is <InlineMath math="2\pi^2" />, the surface area of a 4-dimensional ball of radius 1. This finite volume means that the space of orientations is compact—there are only "so many" ways to orient an object.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Why Great Circles Matter</h2>

          <p className="mb-4">
            Understanding geodesics on <InlineMath math="S^3" /> is essential for practical applications:
          </p>

          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li><strong>Animation:</strong> Interpolating along great circles produces natural-looking rotations without wobble or sudden changes in speed.</li>
            <li><strong>Robotics:</strong> Moving a robot arm along a geodesic minimizes the total rotation, reducing wear and energy consumption.</li>
            <li><strong>Navigation:</strong> For spacecraft attitude control, geodesic paths represent optimal reorientation maneuvers.</li>
            <li><strong>Statistics:</strong> Computing averages and distributions of orientations requires understanding the geodesic structure.</li>
          </ul>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
            <p>
              The geodesics of <InlineMath math="S^3" /> are the "straight lines" of orientation space. Just as mechanics in flat space involves motion along straight lines, mechanics of rotation involves motion along these great circles. The quaternionic exponential and logarithm provide the tools to work with them computationally.
            </p>
          </div>

        </div>
      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-2/section-2-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 2.3
          </Link>

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-2-4" title="Section 2.4" />

          <Link href="/chapter-2/section-2-5" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 2.5
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
