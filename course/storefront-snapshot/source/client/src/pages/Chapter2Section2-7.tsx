import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter2Section2_7() {
  useEffect(() => {
    document.title = "Section 2.7: Practical Visualization and Interpolation | QSG Textbook";
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
            <div className="text-white/70 text-sm mb-2">Section 2.7</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Practical Visualization and Interpolation
            </h1>
            <p className="text-xl text-white/90 italic">
              From Theory to Application
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          <p className="text-lg leading-relaxed mb-6">
            Quaternions are not just elegant mathematics—they are the workhorses of modern 3D graphics, robotics, and aerospace engineering. This section bridges theory and practice, showing how to visualize quaternions, interpolate between them smoothly, and implement efficient algorithms for real-world applications.
          </p>

          <QSGSectionTeachingBlock
            learnerQuestion="What should we look at when visualizing rotations on S3?"
            plainLanguageSetup="Section 2.6 separated direction from phase. For visualization, we track projections, slices, and moving frames so the invisible four-dimensional motion becomes a readable three-dimensional pattern."
            formulaRecap={
              <>
                <PrettyBlockMath math="\gamma(t)=\cos t+\mathbf{u}\sin t,\qquad \mathrm{SLERP}(q_0,q_1;t)=\frac{\sin((1-t)\Omega)}{\sin\Omega}q_0+\frac{\sin(t\Omega)}{\sin\Omega}q_1" />
                <p>
                  Great circles show constant-axis motion. SLERP computes the corresponding shortest smooth path between two orientations.
                </p>
              </>
            }
            checkpoint="What should a good rotation visualization preserve?"
            revealAnswer="It should preserve unit length, show the axis or projected direction, and make the path's constant-speed spherical motion visible."
            finalTakeaway="Visualization is a translation layer: it turns angle plus direction on S3 into projections, frames, and paths we can inspect."
            nextStep="Section 2.8 works through concrete calculations with the same rotation form."
          />

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Visualizing the 3-Sphere</h2>

          <p className="mb-4">
            The 3-sphere lives in four dimensions, so we cannot see it directly. However, we can use projections to understand its structure.
          </p>

          <p className="mb-4">
            <strong>Stereographic Projection:</strong> The most useful projection maps <InlineMath math="S^3" /> to <InlineMath math="\mathbb{R}^3" /> by projecting from the "north pole" <InlineMath math="(0, 0, 0, 1)" />:
          </p>

          <PrettyBlockMath math="\sigma(a, b, c, d) = \frac{1}{1 - d}(a, b, c)." />

          <p className="mb-4">
            This maps the south pole <InlineMath math="(0, 0, 0, -1)" /> to the origin, and sends the north pole to infinity. Great circles on <InlineMath math="S^3" /> become circles (or lines) in <InlineMath math="\mathbb{R}^3" />. The Hopf fibers appear as a beautiful family of linked circles filling all of space.
          </p>

          <p className="mb-4">
            <strong>Slicing:</strong> Another approach is to take 3D "slices" of <InlineMath math="S^3" />. Fixing the real part <InlineMath math="a = a_0" />, the remaining constraint <InlineMath math="b^2 + c^2 + d^2 = 1 - a_0^2" /> describes a 2-sphere of radius <InlineMath math="\sqrt{1-a_0^2}" />. Animating through different values of <InlineMath math="a_0" /> shows how these 2-spheres shrink from the equator (at <InlineMath math="a_0 = 0" />) to points at the poles (at <InlineMath math="a_0 = \pm 1" />).
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Visualizing Great Circles</p>
            <p>
              A great circle traced by <InlineMath math="\gamma(t) = \cos t + \mathbf{u}\sin t" /> can be visualized by plotting the corresponding rotation: at each time <InlineMath math="t" />, show what happens to a reference frame rotated by <InlineMath math="\gamma(t)" />. The frame rotates smoothly about axis <InlineMath math="\mathbf{u}" /> at constant angular velocity—the defining characteristic of geodesic motion on <InlineMath math="S^3" />.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>SLERP: Spherical Linear Interpolation</h2>

          <p className="mb-4">
            The most important practical algorithm for quaternions is SLERP (Spherical Linear Interpolation). Given two orientations <InlineMath math="q_0" /> and <InlineMath math="q_1" />, SLERP produces a smooth path between them:
          </p>

          <PrettyBlockMath math="\mathrm{SLERP}(q_0, q_1; t) = \frac{\sin((1-t)\Omega)}{\sin\Omega}q_0 + \frac{\sin(t\Omega)}{\sin\Omega}q_1," />

          <p className="mb-4">
            where <InlineMath math="\Omega = \arccos(\langle q_0, q_1 \rangle)" /> is the angle between the quaternions. This formula traces a great circle arc at constant angular velocity.
          </p>

          <p className="mb-4">
            <strong>Why SLERP matters:</strong> Unlike linear interpolation of Euler angles (which can produce erratic motion and gimbal lock), SLERP gives the shortest, smoothest rotation between two orientations. The angular velocity is constant, there are no singularities, and the path is independent of coordinate system choice.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Implementation Details</h2>

          <p className="mb-4">
            A robust SLERP implementation must handle several edge cases:
          </p>

          <ol className="list-decimal ml-6 mb-6 space-y-2">
            <li><strong>Antipodal check:</strong> If <InlineMath math="\langle q_0, q_1 \rangle < 0" />, the quaternions are on opposite hemispheres. Replace <InlineMath math="q_1" /> with <InlineMath math="-q_1" /> to take the shorter arc.</li>
            <li><strong>Near-identity:</strong> When <InlineMath math="\Omega" /> is very small, <InlineMath math="\sin\Omega \approx \Omega" /> and we can use linear interpolation: <InlineMath math="q(t) \approx (1-t)q_0 + tq_1" /> followed by normalization.</li>
            <li><strong>Normalization:</strong> Due to floating-point errors, always normalize the result to ensure <InlineMath math="|q| = 1" />.</li>
          </ol>

          <div className="bg-gray-100 p-4 rounded-lg my-6 font-mono text-sm overflow-x-auto">
            <pre>{`function slerp(q0, q1, t) {
  let dot = q0.w*q1.w + q0.x*q1.x + q0.y*q1.y + q0.z*q1.z;

  // If dot < 0, negate q1 for shorter arc
  if (dot < 0) {
    q1 = negate(q1);
    dot = -dot;
  }

  // If nearly parallel, use linear interpolation
  if (dot > 0.9995) {
    return normalize(lerp(q0, q1, t));
  }

  // Standard SLERP
  let omega = Math.acos(dot);
  let sinOmega = Math.sin(omega);
  let s0 = Math.sin((1-t)*omega) / sinOmega;
  let s1 = Math.sin(t*omega) / sinOmega;

  return {
    w: s0*q0.w + s1*q1.w,
    x: s0*q0.x + s1*q1.x,
    y: s0*q0.y + s1*q1.y,
    z: s0*q0.z + s1*q1.z
  };
}`}</pre>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Beyond SLERP: Spline Interpolation</h2>

          <p className="mb-4">
            SLERP handles interpolation between two orientations, but many applications require smooth curves through multiple keyframes. Quaternion splines extend SLERP to this setting.
          </p>

          <p className="mb-4">
            <strong>SQUAD (Spherical and Quadrangle):</strong> A common method that computes smooth curves through a sequence of quaternions with continuous angular velocity. It uses the quaternion logarithm to compute intermediate control points.
          </p>

          <p className="mb-4">
            <strong>Cumulative B-splines:</strong> Another approach uses the exponential-logarithm framework to adapt B-spline algorithms to the quaternion setting, providing even smoother curves with controlled continuity.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Applications</h2>

          <p className="mb-4">
            Quaternion interpolation appears throughout modern technology:
          </p>

          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li><strong>Computer Animation:</strong> Character skeletal animation, camera movements, and object rotations all use quaternion interpolation for smooth, natural motion.</li>
            <li><strong>Robotics:</strong> Robot arm path planning requires smooth orientation changes to avoid jerky movements that could damage mechanisms or drop payloads.</li>
            <li><strong>Aerospace:</strong> Spacecraft attitude control systems use quaternions to command smooth reorientation maneuvers and to track orientation continuously.</li>
            <li><strong>Virtual Reality:</strong> Head tracking and controller orientation use quaternions to provide responsive, drift-free rotation sensing.</li>
          </ul>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Performance Advantages</p>
            <p className="mb-2">
              Quaternions are more efficient than rotation matrices for many operations:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Storage: 4 numbers vs. 9 for matrices</li>
              <li>Composition: 16 multiplications vs. 27 for matrix multiplication</li>
              <li>Normalization: Simple rescaling vs. Gram-Schmidt orthogonalization</li>
              <li>Interpolation: SLERP is simpler and more stable than matrix interpolation</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Converting Between Representations</h2>

          <p className="mb-4">
            In practice, you often need to convert between quaternions and other rotation representations:
          </p>

          <p className="mb-4">
            <strong>Quaternion to Rotation Matrix:</strong>
          </p>

          <PrettyBlockMath math="R = \begin{pmatrix} 1-2(y^2+z^2) & 2(xy-wz) & 2(xz+wy) \\ 2(xy+wz) & 1-2(x^2+z^2) & 2(yz-wx) \\ 2(xz-wy) & 2(yz+wx) & 1-2(x^2+y^2) \end{pmatrix}" />

          <p className="mb-4">
            <strong>Axis-Angle to Quaternion:</strong>
          </p>

          <PrettyBlockMath math="q = \cos\frac{\theta}{2} + \sin\frac{\theta}{2}(u_x\mathbf{i} + u_y\mathbf{j} + u_z\mathbf{k})" />

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
            <p>
              The power of quaternions lies in their combination of mathematical elegance and computational efficiency. SLERP and related algorithms translate the abstract geometry of <InlineMath math="S^3" /> into practical tools that run millions of times per second in graphics engines and control systems worldwide.
            </p>
          </div>

        </div>
      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-2/section-2-6" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 2.6
          </Link>

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-2-7" title="Section 2.7" />

          <Link href="/chapter-2/section-2-8" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 2.8
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
