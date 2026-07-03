import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter1Section1_9() {
  useEffect(() => {
    document.title = "Section 1.9: Measure and Volume of S³ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Calculate the volume of the 3-sphere and understand the Haar measure—the natural uniform distribution over orientations.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 1 · Section 1.9</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Measure and Volume of <InlineMath math="S^3" />
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              The geometry of uniform randomness
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              When we speak of a "random rotation" or a "uniform distribution over orientations," we're implicitly invoking a measure on the 3-sphere. This section develops the natural measure on <InlineMath math="S^3" />—the Haar measure—and computes the total volume. These results underpin everything from random sampling in computer graphics to quantum state tomography.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What does it mean to measure uniformly on a curved state space?"
              plainLanguageSetup="The Hopf fibration organized S3 into directions and phases. To compute averages or random samples, we also need a notion of uniform size that respects the symmetry of the space."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\operatorname{Vol}(S^3)=2\pi^2,\qquad \mu(gA)=\mu(A)" />
                  <p>
                    The volume gives the total size of the unit 3-sphere. Haar measure says that multiplying every point by the same unit quaternion does not change the measure of a region.
                  </p>
                </>
              }
              checkpoint="Why is ordinary flat volume not enough for S3?"
              revealAnswer="S3 is curved and also has group symmetry. Haar measure is the uniform measure that respects that symmetry, so no orientation is privileged."
              finalTakeaway="Uniformity on S3 means symmetry-respecting measure, not a flat coordinate grid imposed from outside."
              nextStep="Section 1.10 uses these structural facts to explain why S3 is a natural coordinate space for orientation."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Volume Formula</h2>

            <div className="overflow-x-auto my-6 p-4 rounded-lg border-2" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderColor: '#3d7a8c' }}>
              <PrettyBlockMath math="\text{Vol}(S^3) = 2\pi^2" />
            </div>

            <p>
              This is the 3-dimensional volume (or "surface area" in the sense of the boundary of the 4-ball) of the unit 3-sphere. To understand where this formula comes from, we can compute it using spherical coordinates in <InlineMath math="\mathbb{R}^4" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Derivation via Integration</h2>

            <p>
              Parameterize the unit 3-sphere using angles <InlineMath math="(\psi, \theta, \phi)" />:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\begin{aligned}
w &= \cos\psi \\
x &= \sin\psi\cos\theta \\
y &= \sin\psi\sin\theta\cos\phi \\
z &= \sin\psi\sin\theta\sin\phi
\end{aligned}" />
            </div>

            <p>
              where <InlineMath math="\psi \in [0, \pi]" />, <InlineMath math="\theta \in [0, \pi]" />, and <InlineMath math="\phi \in [0, 2\pi)" />. The volume element on <InlineMath math="S^3" /> is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="dV = \sin^2\psi \sin\theta \, d\psi \, d\theta \, d\phi" />
            </div>

            <p>
              Integrating:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\text{Vol}(S^3) = \int_0^{2\pi} d\phi \int_0^\pi \sin\theta \, d\theta \int_0^\pi \sin^2\psi \, d\psi = 2\pi \cdot 2 \cdot \frac{\pi}{2} = 2\pi^2" />
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Haar Measure</h2>

            <p>
              The Haar measure on a compact Lie group is the unique probability measure that is invariant under left (or right) multiplication. For <InlineMath math="S^3 \cong SU(2)" />, this means:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\mu(gA) = \mu(A)" />
            </div>

            <p>
              for any measurable set <InlineMath math="A \subseteq S^3" /> and any <InlineMath math="g \in S^3" />. The Haar measure is the "uniform" measure—it assigns equal probability density to all regions of equal volume.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Physical Meaning</p>
              <p className="text-gray-700">
                When you sample a "random orientation" uniformly, you're sampling from the Haar measure on <InlineMath math="S^3" />. This is the natural notion of randomness for rotations—no direction or axis is preferred, and applying any fixed rotation to a uniform random orientation produces another uniform random orientation.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Comparison with Other Spheres</h2>

            <p>
              The volume formula for the n-sphere <InlineMath math="S^n" /> of radius <InlineMath math="r" /> is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\text{Vol}(S^n) = \frac{2\pi^{(n+1)/2}}{\Gamma((n+1)/2)} r^n" />
            </div>

            <p>
              For the unit spheres:
            </p>

            <ul className="list-none space-y-2 my-6">
              <li><InlineMath math="S^1" />: circumference = <InlineMath math="2\pi" /></li>
              <li><InlineMath math="S^2" />: surface area = <InlineMath math="4\pi" /></li>
              <li><InlineMath math="S^3" />: volume = <InlineMath math="2\pi^2 \approx 19.74" /></li>
            </ul>

            <p>
              The pattern involves powers of <InlineMath math="\pi" /> and gamma functions, reflecting the deep connection between spherical geometry and the Gaussian integral.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Uniform Sampling</h2>

            <p>
              To sample a unit quaternion uniformly (i.e., from the Haar measure), the standard approach is:
            </p>

            <ol className="list-decimal ml-6 space-y-3 my-6">
              <li>
                Generate 4 independent standard normal random variables <InlineMath math="(w, x, y, z)" />.
              </li>
              <li>
                Normalize to unit length: <InlineMath math="q = (w, x, y, z) / \sqrt{w^2 + x^2 + y^2 + z^2}" />.
              </li>
            </ol>

            <p>
              This works because the Gaussian distribution in <InlineMath math="\mathbb{R}^4" /> is rotationally invariant—projecting onto the unit sphere gives the uniform distribution on <InlineMath math="S^3" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Why Volume Matters</h2>

            <p>
              The volume <InlineMath math="2\pi^2" /> appears throughout harmonic analysis on <InlineMath math="S^3" />:
            </p>

            <ul className="list-disc ml-6 space-y-3 my-6">
              <li>
                <strong>Normalization:</strong> The probability measure has total mass 1, so the density is <InlineMath math="1/(2\pi^2)" /> times the volume element.
              </li>
              <li>
                <strong>Character integrals:</strong> Orthogonality relations for spherical harmonics on <InlineMath math="S^3" /> involve this volume factor.
              </li>
              <li>
                <strong>Physics:</strong> Path integrals over rotation configurations weight by the Haar measure, with <InlineMath math="2\pi^2" /> appearing in partition functions.
              </li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Takeaway</p>
              <p className="text-gray-700">
                The Haar measure on <InlineMath math="S^3" /> is the mathematically natural way to speak of "uniform randomness" over orientations. Its total volume <InlineMath math="2\pi^2" /> is a fundamental constant of 3D rotation geometry, appearing wherever we average over all possible orientations.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1/section-1-8" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 1.8
          </Link>

          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-1-9" title="Section 1.9" />

          <Link href="/chapter-1/section-1-10" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 1.10
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
