import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter2Section2_9() {
  useEffect(() => {
    document.title = "Section 2.9: Summary | QSG Textbook";
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
            <div className="text-white/70 text-sm mb-2">Section 2.9</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Chapter Summary
            </h1>
            <p className="text-xl text-white/90 italic">
              The Quaternionic Rotation Form in Review
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          <p className="text-lg leading-relaxed mb-6">
            This chapter has developed the quaternionic approach to rotation in depth. Let us consolidate the key ideas and see how they form a coherent picture of orientation geometry.
          </p>

          <QSGSectionTeachingBlock
            learnerQuestion="What is the usable rotation handle from Chapter 2?"
            plainLanguageSetup="The chapter's repeated thread is now one object: angle plus direction gives a unit quaternion, unit length keeps it on S3, multiplication composes rotations, and projection helps interpret the result."
            formulaRecap={
              <>
                <PrettyBlockMath math="q=\cos\varphi+\mathbf{u}\sin\varphi=e^{\mathbf{u}\varphi},\qquad \mathbf{v}'=q\mathbf{v}q^{-1}" />
                <p>
                  Keep these two formulas together: one constructs the state, the other shows how it acts.
                </p>
              </>
            }
            checkpoint="Why is q = cos phi + u sin phi more than a notation shortcut?"
            revealAnswer="It stores axis, half-angle, unit length, and group composition in one object, so rotation can be handled geometrically instead of by disconnected coordinate rules."
            finalTakeaway="Chapter 2 turns S3 from an abstract state space into a practical rotation coordinate system for QSG."
            nextStep="Chapter 3 uses this coordinate system to study differential geometry on S3."
          />

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Core Ideas in Plain Words</h2>

          <p className="mb-4">
            <strong>Rotations live on a sphere.</strong> The space of all possible orientations of an object in 3D is not flat—it's curved. Specifically, it's the 3-sphere <InlineMath math="S^3" />, a three-dimensional surface embedded in four dimensions. Unit quaternions are the coordinates on this sphere.
          </p>

          <p className="mb-4">
            <strong>Every rotation has an axis and an angle.</strong> The quaternion <InlineMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" /> encodes a rotation of angle <InlineMath math="2\varphi" /> about axis <InlineMath math="\mathbf{u}" />. The half-angle appears because quaternions are spinors—they "see" rotation at twice the resolution of ordinary vectors.
          </p>

          <p className="mb-4">
            <strong>Spinors require a full turn to return.</strong> Rotating a quaternion by 360° doesn't bring it back to where it started—it produces the negative quaternion. Only after 720° does the quaternion return to its original value. This is the <InlineMath math="4\pi" /> identity, and it's why electrons have spin-1/2.
          </p>

          <p className="mb-4">
            <strong>The shortest path is a great circle.</strong> To move smoothly between two orientations, follow a geodesic on <InlineMath math="S^3" />. This is what SLERP computes—constant-velocity motion along the shortest path in orientation space.
          </p>

          <p className="mb-4">
            <strong>Direction and phase separate.</strong> The Hopf fibration shows that <InlineMath math="S^3" /> decomposes into circles (phases) over a 2-sphere (directions). This structure underlies the Bloch sphere representation of quantum spin and the geometry of magnetic monopoles.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Key Mathematical Results</h2>

          <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <h3 className="font-bold mb-3" style={{ color: '#1a3b47' }}>The Axis-Angle Form</h3>
            <PrettyBlockMath math="q = \cos\varphi + \mathbf{u}\sin\varphi = e^{\mathbf{u}\varphi}" />
            <p className="mt-2 text-sm">
              Every unit quaternion can be written this way, with <InlineMath math="|\mathbf{u}| = 1" /> and <InlineMath math="\varphi \in [0, \pi]" />.
            </p>
          </div>

          <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <h3 className="font-bold mb-3" style={{ color: '#1a3b47' }}>The Rotation Action</h3>
            <PrettyBlockMath math="\mathbf{v}' = q\mathbf{v}q^{-1}" />
            <p className="mt-2 text-sm">
              This conjugation rotates vector <InlineMath math="\mathbf{v}" /> by angle <InlineMath math="2\varphi" /> about axis <InlineMath math="\mathbf{u}" />.
            </p>
          </div>

          <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <h3 className="font-bold mb-3" style={{ color: '#1a3b47' }}>The Double Cover</h3>
            <PrettyBlockMath math="S^3 / \{\pm 1\} \cong \mathrm{SO}(3)" />
            <p className="mt-2 text-sm">
              Quaternions <InlineMath math="q" /> and <InlineMath math="-q" /> represent the same rotation. The map <InlineMath math="\Pi(q)(\mathbf{v}) = q\mathbf{v}q^{-1}" /> is a 2-to-1 covering.
            </p>
          </div>

          <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <h3 className="font-bold mb-3" style={{ color: '#1a3b47' }}>The Spinor Identity</h3>
            <PrettyBlockMath math="e^{\mathbf{u}(\varphi + 2\pi)} = -e^{\mathbf{u}\varphi}, \quad e^{\mathbf{u}(\varphi + 4\pi)} = e^{\mathbf{u}\varphi}" />
            <p className="mt-2 text-sm">
              A 360° rotation flips the quaternion's sign; a 720° rotation returns it to the original value.
            </p>
          </div>

          <div className="p-6 rounded-lg my-6" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
            <h3 className="font-bold mb-3" style={{ color: '#1a3b47' }}>The Hopf Fibration</h3>
            <PrettyBlockMath math="h: S^3 \to S^2, \quad h(q) = q\mathbf{i}q^{-1}" />
            <p className="mt-2 text-sm">
              Each fiber <InlineMath math="h^{-1}(p)" /> is a circle; any two fibers are linked once.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Connections to Physics</h2>

          <p className="mb-4">
            The mathematics developed in this chapter appears throughout physics:
          </p>

          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li><strong>Quantum Spin:</strong> Spin-1/2 particles are described by 2-component spinors, which transform under <InlineMath math="\mathrm{SU}(2) \cong S^3" />. The double cover explains why fermions pick up a minus sign under 360° rotation.</li>
            <li><strong>Rigid Body Dynamics:</strong> The orientation of a spinning top or spacecraft is naturally described by quaternions. The Maurer–Cartan form gives angular velocity, and geodesics describe free rotation.</li>
            <li><strong>Gauge Theory:</strong> The Hopf fibration is the prototypical example of a nontrivial principal bundle, providing the mathematical structure for electromagnetic and Yang–Mills theories.</li>
            <li><strong>General Relativity:</strong> Spinor methods, based on the <InlineMath math="\mathrm{SL}(2, \mathbb{C})" /> cover of the Lorentz group, are powerful tools in gravitational physics.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Looking Forward</h2>

          <p className="mb-4">
            With the geometry of rotations established, we are ready to build analysis on <InlineMath math="S^3" />. The next chapters develop:
          </p>

          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li><strong>Spectral Theory:</strong> The Laplacian and other differential operators on <InlineMath math="S^3" />, leading to spherical harmonics in four dimensions.</li>
            <li><strong>Harmonic Analysis:</strong> Fourier analysis on the 3-sphere using representation theory of <InlineMath math="\mathrm{SU}(2)" />.</li>
            <li><strong>Quaternionic Calculus:</strong> Differentiation and integration in the quaternionic setting, with applications to physics and engineering.</li>
          </ul>

          <p className="mb-4">
            The foundation laid in this chapter—understanding <InlineMath math="S^3" /> as a curved space with rich geometric structure—will support all of these developments.
          </p>

          <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
            <p className="font-bold mb-2" style={{ color: '#1a3b47' }}>Chapter Takeaway</p>
            <p>
              The quaternionic rotation form <InlineMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" /> is far more than a convenient parameterization. It reveals that rotation, spin, and orientation are manifestations of motion on the 3-sphere <InlineMath math="S^3" />—a curved manifold that is the natural home for all things that turn.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3b47' }}>Glossary</h2>

          <dl className="space-y-4">
            <div>
              <dt className="font-bold" style={{ color: '#2d5a69' }}>Axis-angle form</dt>
              <dd className="ml-4">The representation <InlineMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" /> of a unit quaternion, where <InlineMath math="\mathbf{u}" /> is the rotation axis and <InlineMath math="2\varphi" /> is the rotation angle.</dd>
            </div>
            <div>
              <dt className="font-bold" style={{ color: '#2d5a69' }}>Double cover</dt>
              <dd className="ml-4">The 2-to-1 mapping from <InlineMath math="S^3" /> to <InlineMath math="\mathrm{SO}(3)" /> that identifies <InlineMath math="q" /> and <InlineMath math="-q" /> with the same rotation.</dd>
            </div>
            <div>
              <dt className="font-bold" style={{ color: '#2d5a69' }}>Geodesic</dt>
              <dd className="ml-4">A curve of shortest length between two points on a curved space. On <InlineMath math="S^3" />, geodesics are great circles.</dd>
            </div>
            <div>
              <dt className="font-bold" style={{ color: '#2d5a69' }}>Hopf fibration</dt>
              <dd className="ml-4">The decomposition of <InlineMath math="S^3" /> into linked circles over <InlineMath math="S^2" />, with projection <InlineMath math="h(q) = q\mathbf{i}q^{-1}" />.</dd>
            </div>
            <div>
              <dt className="font-bold" style={{ color: '#2d5a69' }}>Maurer–Cartan form</dt>
              <dd className="ml-4">The Lie-algebra valued 1-form <InlineMath math="\omega = q^{-1}dq" /> that encodes infinitesimal rotations on <InlineMath math="S^3" />.</dd>
            </div>
            <div>
              <dt className="font-bold" style={{ color: '#2d5a69' }}>SLERP</dt>
              <dd className="ml-4">Spherical Linear Interpolation: constant-velocity motion along the great circle arc between two quaternions.</dd>
            </div>
            <div>
              <dt className="font-bold" style={{ color: '#2d5a69' }}>Spinor</dt>
              <dd className="ml-4">An object that transforms under the double cover <InlineMath math="S^3" /> rather than <InlineMath math="\mathrm{SO}(3)" />, acquiring a minus sign under 360° rotation.</dd>
            </div>
          </dl>

        </div>
      </article>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-2/section-2-8" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 2.8
          </Link>

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-2-9" title="Section 2.9" />

          <Link href="/chapter-3-differential-geometry-s3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-chapter">
            Chapter 3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
