import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Home, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_11() {
  useEffect(() => {
    document.title = "Section 1.11: Summary | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "A plain-language summary of Chapter 1's key concepts: quaternions, the 3-sphere, rotations, and why this geometry matters.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.11</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Summary
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              The geometry of numbers in plain words
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              We've traveled from the familiar real number line to the four-dimensional world of quaternions. Along the way, we've seen that these seemingly abstract mathematical objects have concrete geometric meaning: they are a natural language for describing orientation and rotation in three-dimensional space.
            </p>

            <p>
              Let's consolidate what we've learned into clear, memorable principles.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What should I carry forward from Chapter 1?"
              plainLanguageSetup="Chapter 1 moved from real and complex numbers into quaternions, then restricted to unit quaternions on S3. The point is not more notation; it is a coordinate system for orientation and state geometry."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\mathbb{R}\to\mathbb{C}\to\mathbb{H},\qquad S^3=\{q\in\mathbb{H}:|q|=1\}" />
                  <p>
                    The algebra grows from one axis to a four-dimensional system, and the unit condition picks out the rotation/state space used in the next chapter.
                  </p>
                </>
              }
              checkpoint="What is the central role of S3 in Chapter 1?"
              revealAnswer="S3 is the unit-quaternion space where orientation states live, multiply, project to directions, and carry phase information."
              finalTakeaway="Chapter 1 establishes the coordinate system: quaternions provide the algebra, and S3 provides the unit state space."
              nextStep="Chapter 2 turns that coordinate system into the working rotation handle q = cos phi + u sin phi."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Core Ideas</h2>

            <div className="space-y-6 my-8">
              <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
                <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Quaternions are numbers with a built-in 3D arrow.</p>
                <p className="text-gray-700">
                  Every quaternion <InlineMath math="q = a + bi + cj + dk" /> has a real part <InlineMath math="a" /> and a 3D vector part <InlineMath math="(b, c, d)" />. This structure lets quaternions simultaneously encode magnitude and direction—exactly what's needed for orientation.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
                <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Unit quaternions sit on <InlineMath math="S^3" /> and act as rotations.</p>
                <p className="text-gray-700">
                  The unit quaternions <InlineMath math="|q| = 1" /> form a 3-sphere—the higher-dimensional analog of the familiar circle and sphere. Each point on this 3-sphere represents a complete 3D orientation. Multiplying quaternions composes rotations; the conjugation action <InlineMath math="v \mapsto qvq^{-1}" /> rotates vectors.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
                <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>The product encodes dot and cross at once.</p>
                <p className="text-gray-700">
                  When you multiply two 3D vectors as quaternions, <InlineMath math="ab = -a \cdot b + a \times b" />. This fusion of metric and oriented information makes quaternions ideal for physics—torque, angular momentum, and rigid-body dynamics all involve both dot and cross products.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
                <p className="font-bold mb-2" style={{ color: '#1a3b47' }}><InlineMath math="S^3 \cong SU(2)" /> double-covers <InlineMath math="SO(3)" />.</p>
                <p className="text-gray-700">
                  The unit quaternions are isomorphic to the matrix group <InlineMath math="SU(2)" />. Both <InlineMath math="q" /> and <InlineMath math="-q" /> produce the same rotation—this is the famous double cover. Spinors (quantum spin states) live on <InlineMath math="S^3" />; physical orientations live on <InlineMath math="SO(3) = S^3/\{\pm 1\}" />.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
                <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Geodesics on <InlineMath math="S^3" /> are constant-axis spins.</p>
                <p className="text-gray-700">
                  The shortest path between two orientations on <InlineMath math="S^3" /> is a great circle—a path of constant-axis rotation <InlineMath math="e^{ut}" />. This gives clean, singularity-free kinematics. No gimbal lock, no coordinate singularities, just smooth geometry.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Tiny Glossary</h2>

            <div className="space-y-4 my-6">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-bold min-w-[180px]" style={{ color: '#2d5a69' }}>Axis (<InlineMath math="u" />)</dt>
                <dd className="text-gray-700">A unit pure imaginary quaternion; a direction in <InlineMath math="\mathbb{R}^3" />.</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-bold min-w-[180px]" style={{ color: '#2d5a69' }}>Half-angle (<InlineMath math="\phi" />)</dt>
                <dd className="text-gray-700">The spinor parameter; physical rotation angle is <InlineMath math="2\phi" />.</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-bold min-w-[180px]" style={{ color: '#2d5a69' }}>Conjugation (<InlineMath math="qvq^{-1}" />)</dt>
                <dd className="text-gray-700">Rotate vector <InlineMath math="v" /> by the orientation <InlineMath math="q" />.</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-bold min-w-[180px]" style={{ color: '#2d5a69' }}>Slice (<InlineMath math="\mathbb{C}_u" />)</dt>
                <dd className="text-gray-700">A complex plane inside <InlineMath math="\mathbb{H}" /> with imaginary <InlineMath math="u" />.</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-bold min-w-[180px]" style={{ color: '#2d5a69' }}>Hopf fiber</dt>
                <dd className="text-gray-700">The spin-phase circle over a given axis on <InlineMath math="S^2" />.</dd>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Looking Ahead</h2>

            <p>
              With this foundation in place, we're ready to explore deeper structures. In Chapter 2, we'll study quaternionic rotation in detail—the Lie group and Lie algebra perspectives, infinitesimal generators, and the relationship to angular velocity. In later chapters, we'll see how these ideas extend to spectral geometry, where the eigenvalue problem on <InlineMath math="S^3" /> reveals the harmonic structure of the rotation group.
            </p>

            <p>
              The quaternions are not just a computational tool—they're a window into the deep geometry of orientation, a geometry that underlies physics from spinning tops to electron spin. Understanding this geometry is the first step toward the spectral methods that will occupy the rest of this book.
            </p>

            <div className="p-6 rounded-lg my-8 border-2" style={{ backgroundColor: 'rgba(77, 154, 175, 0.05)', borderColor: '#3d7a8c' }}>
              <p className="font-bold mb-2 text-center" style={{ color: '#1a3b47' }}>Chapter 1 Complete</p>
              <p className="text-gray-700 text-center">
                You now have the essential tools: the algebra of <InlineMath math="\mathbb{H}" />, the geometry of <InlineMath math="S^3" />, and the connection to 3D rotation. These ideas will serve as the foundation for everything that follows.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-10" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.10
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-11" title="Section 1.11" />

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-chapter">
            Chapter 2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
