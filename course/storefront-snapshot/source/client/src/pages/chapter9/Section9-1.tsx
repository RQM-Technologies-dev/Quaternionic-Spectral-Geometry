import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section9_1() {
  useEffect(() => {
    document.title = "Section 9.1: Numerical Representation of Quaternions and SU(2) | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn how quaternions are represented computationally as four real numbers encoding rotation, with practical Python examples and SU(2) sampling techniques.";
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
        { label: "Chapter 9", href: "/chapter-9-computational-hub" },
        { label: "Section 9.1" }
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
            <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 9
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 9 · Section 9.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Numerical Representation of Quaternions and SU(2)
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              From abstract algebra to computational arrays
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Pick up your smartphone and tilt it. The screen rotates to match your orientation. Behind this
              seemingly simple action lies one of mathematics' most elegant structures: quaternions. Every time
              your phone tracks its orientation, it's computing with four-dimensional numbers that encode
              three-dimensional rotation. In this section, we'll learn exactly how this works.
            </p>

            <p>
              Every quaternion <InlineMath math="q = a + bi + cj + dk" /> can be represented in code as four real numbers:
              an array <InlineMath math="[a, b, c, d]" />. This simple representation encodes 3D rotations, complex
              waveforms, and the rich geometric structures of quaternionic spectral geometry. The group of unit
              quaternions—those with magnitude 1—forms the 3-sphere <InlineMath math="S^3" />, which double-covers
              the rotation group <InlineMath math="SO(3)" />.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What is the first computational problem in QSG?"
              plainLanguageSetup="Chapter 8 gave us operator tools. Chapter 9 asks how to implement the objects those tools act on, starting with the basic data structure: a quaternion as four real components."
              formulaRecap={
                <>
                  <PrettyBlockMath math="q=a+bi+cj+dk,\qquad q=\cos(\theta/2)+\mathbf u\sin(\theta/2)" />
                  <p>
                    The first form is storage-friendly. The second form is rotation-friendly and should remain normalized for unit-quaternion computations.
                  </p>
                </>
              }
              checkpoint="What numerical check should follow most rotation updates?"
              revealAnswer="Check or restore unit norm. Small floating-point errors can move a quaternion off S3 unless the implementation renormalizes when needed."
              finalTakeaway="Computational QSG begins by treating quaternions as ordinary arrays with geometric constraints."
              nextStep="Section 9.2 moves from individual quaternions to quaternionic Fourier transforms."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Four Numbers That Encode Rotation</h2>

            <p>
              A quaternion <InlineMath math="q = a + bi + cj + dk" /> has a scalar part <InlineMath math="a" /> and
              a vector part <InlineMath math="(b, c, d)" />. When <InlineMath math="|q| = 1" />, this quaternion
              represents a rotation about the axis <InlineMath math="\mathbf{u} = (b, c, d)/|(b,c,d)|" /> by
              an angle <InlineMath math="2\phi" />, where <InlineMath math="\cos\phi = a" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>The Quaternion Rotation Formula</p>
              <p className="text-gray-700 mb-4">
                A rotation by angle <InlineMath math="\theta" /> about unit axis <InlineMath math="\mathbf{u}" /> is encoded as:
              </p>
              <div className="my-4">
                <PrettyBlockMath math="q = \cos(\theta/2) + \mathbf{u}\sin(\theta/2)" />
              </div>
              <p className="text-gray-700">
                The factor of 2 arises from the double-cover: quaternions <InlineMath math="q" /> and <InlineMath math="-q" /> represent the same rotation.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Quaternion Multiplication in Python</h2>

            <p>
              Given two quaternions <InlineMath math="q_1 = (a_1, b_1, c_1, d_1)" /> and <InlineMath math="q_2 = (a_2, b_2, c_2, d_2)" />,
              their product follows the Hamilton product rule:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="q_1 q_2 = (a_1a_2 - b_1b_2 - c_1c_2 - d_1d_2,\; a_1b_2 + b_1a_2 + c_1d_2 - d_1c_2,\; a_1c_2 - b_1d_2 + c_1a_2 + d_1b_2,\; a_1d_2 + b_1c_2 - c_1b_2 + d_1a_2)" />
            </div>

            <p>
              Here's a complete Python implementation:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`import numpy as np

def quaternion_multiply(q1, q2):
    """Multiply two quaternions q1 and q2.

    Each quaternion is [w, x, y, z] = [scalar, i, j, k]
    """
    w1, x1, y1, z1 = q1
    w2, x2, y2, z2 = q2

    return np.array([
        w1*w2 - x1*x2 - y1*y2 - z1*z2,  # scalar part
        w1*x2 + x1*w2 + y1*z2 - z1*y2,  # i part
        w1*y2 - x1*z2 + y1*w2 + z1*x2,  # j part
        w1*z2 + x1*y2 - y1*x2 + z1*w2   # k part
    ])

def quaternion_conjugate(q):
    """Return the conjugate of quaternion q."""
    return np.array([q[0], -q[1], -q[2], -q[3]])

def quaternion_normalize(q):
    """Normalize quaternion to unit length."""
    return q / np.linalg.norm(q)

# Example: 90-degree rotation about z-axis
angle = np.pi / 2  # 90 degrees
axis = np.array([0, 0, 1])  # z-axis
q = np.array([np.cos(angle/2),
              axis[0]*np.sin(angle/2),
              axis[1]*np.sin(angle/2),
              axis[2]*np.sin(angle/2)])
print(f"Quaternion for 90° about z: {q}")`}</code>
            </pre>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Rotating Vectors with Quaternions</h2>

            <p>
              To rotate a 3D vector <InlineMath math="\mathbf{v} = (x, y, z)" /> by quaternion <InlineMath math="q" />,
              we embed the vector as a pure quaternion <InlineMath math="v = 0 + xi + yj + zk" /> and compute:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\mathbf{v}' = q \, v \, q^{-1}" />
            </div>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`def rotate_vector(v, q):
    """Rotate 3D vector v by unit quaternion q.

    Args:
        v: 3D vector [x, y, z]
        q: unit quaternion [w, x, y, z]
    Returns:
        rotated 3D vector
    """
    # Embed vector as pure quaternion [0, x, y, z]
    v_quat = np.array([0, v[0], v[1], v[2]])

    # Compute q * v * q^(-1)
    # For unit quaternion, q^(-1) = conjugate(q)
    q_conj = quaternion_conjugate(q)
    result = quaternion_multiply(
        quaternion_multiply(q, v_quat),
        q_conj
    )

    # Extract vector part
    return result[1:4]

# Test: rotate [1, 0, 0] by 90° about z-axis
v = np.array([1, 0, 0])
v_rotated = rotate_vector(v, q)
print(f"Rotated vector: {v_rotated}")  # Should be [0, 1, 0]`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(26, 59, 71, 0.1)', borderLeft: '4px solid #1a3b47' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Real-World Application: Phone Sensors</p>
              <p className="text-gray-700">
                Your smartphone's accelerometer and gyroscope continuously update a quaternion representing the
                phone's orientation. This quaternion is multiplied with the current screen content's orientation
                quaternion to determine the correct display angle—all in real-time, hundreds of times per second.
                The same math powers VR headsets, drone stabilization, and spacecraft attitude control.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>SU(2) Sampling: Covering Orientation Space</h2>

            <p>
              In many applications—from Monte Carlo simulations to machine learning on orientation data—we need
              to sample rotations uniformly. The key insight is that unit quaternions live on the 3-sphere
              <InlineMath math="S^3" />, and uniform sampling on <InlineMath math="S^3" /> corresponds to uniform
              sampling of orientations.
            </p>

            <p>
              The elegant method: draw four independent samples from a standard normal distribution
              <InlineMath math="\mathcal{N}(0, 1)" />, then normalize:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`def random_unit_quaternion():
    """Generate a uniformly random unit quaternion.

    This samples uniformly over SO(3) rotations.
    """
    # Draw from 4D Gaussian
    q = np.random.randn(4)
    # Normalize to unit sphere
    return q / np.linalg.norm(q)

def sample_rotation_ensemble(n_samples):
    """Generate n uniformly distributed rotations."""
    return np.array([random_unit_quaternion()
                     for _ in range(n_samples)])

# Generate 1000 random orientations
orientations = sample_rotation_ensemble(1000)
print(f"Generated {len(orientations)} random orientations")`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Works</p>
              <p className="text-gray-700">
                The 4D Gaussian distribution is spherically symmetric—it has no preferred direction in
                <InlineMath math="\mathbb{R}^4" />. When we normalize to unit length, we project onto
                <InlineMath math="S^3" /> while preserving this symmetry. The result is uniform coverage
                of orientation space, essential for unbiased statistical analysis.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Practical Libraries</h2>

            <p>
              While understanding the fundamentals is essential, production code typically uses optimized libraries:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`from scipy.spatial.transform import Rotation

# Create rotation from Euler angles
r = Rotation.from_euler('xyz', [30, 45, 60], degrees=True)

# Get quaternion representation
q = r.as_quat()  # Returns [x, y, z, w] (note: scalar last!)
print(f"Quaternion (scipy): {q}")

# Apply rotation to vector
v = np.array([1, 0, 0])
v_rotated = r.apply(v)
print(f"Rotated: {v_rotated}")

# Generate random rotations
random_rotations = Rotation.random(num=100)
print(f"Generated {len(random_rotations)} rotations")`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                By coding quaternionic multiplication and rotation, you directly experience the relationship
                between algebra and geometry. Multiplying two quaternions produces not just a number, but a
                new rotation—a transformation of orientation space itself. This hands-on understanding forms
                the foundation for all computational work in Quaternionic Spectral Geometry.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarkCompleteButton id="section-9-1" type="section" />

        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter 9 Hub
          </Link>

          <Link href="/chapter-9/section-9-2" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-next-section">
            Next: Section 9.2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
