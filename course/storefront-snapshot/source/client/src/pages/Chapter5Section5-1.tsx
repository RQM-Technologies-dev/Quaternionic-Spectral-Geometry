import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter5Section5_1() {
  useEffect(() => {
    document.title = "Section 5.1: Harmonic Analysis on S³ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore harmonic analysis on the 3-sphere, where spherical harmonics generalize to capture vibrations on a curved, compact space.";
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
            <Link href="/chapter-5-spectral-theory" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 5
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 5 · Section 5.1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Harmonic Analysis on <InlineMath math="S^3" />
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Spherical harmonics generalized to the 3-sphere
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              On the ordinary sphere <InlineMath math="S^2" />, harmonic analysis is built around spherical harmonics—those beautiful wave patterns you see when visualizing atomic orbitals or the cosmic microwave background. These are the natural vibrational modes of a surface that curves back on itself, the shapes a soap bubble takes when it rings.
            </p>

            <p>
              The 3-sphere <InlineMath math="S^3" /> is one dimension higher: it's the surface of a four-dimensional ball, a space where you can travel in any direction and eventually return to where you started without ever hitting a boundary. Harmonic analysis on <InlineMath math="S^3" /> asks the same question as on <InlineMath math="S^2" />: what are the natural vibrational modes of this curved, compact space?
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What patterns are allowed by the shape of S3?"
              plainLanguageSetup="Chapter 4 showed that operators select modes. Chapter 5 focuses on those modes themselves: spectra are the allowed patterns that fit the curved space."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\Delta_{S^3}\psi+\lambda\psi=0,\qquad \lambda_\ell=\ell(\ell+2)" />
                  <p>
                    The equation asks for functions that return to themselves under the Laplacian up to a scale factor. The label <InlineMath math="\ell" /> indexes the allowed harmonic levels.
                  </p>
                </>
              }
              checkpoint="Why are the allowed modes not arbitrary?"
              revealAnswer="They are constrained by the compact curved geometry of S3, just as the shape of an instrument constrains its resonant patterns."
              finalTakeaway="Harmonic analysis turns the shape of S3 into a structured list of supported wave patterns."
              nextStep="Section 5.2 explains why group representation theory provides the right basis for those patterns."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Laplacian on a Curved Space</h2>

            <p>
              On flat space, the Laplacian <InlineMath math="\Delta = \nabla^2" /> measures how a function's value at a point differs from its average in a small neighborhood. On a curved space like <InlineMath math="S^3" />, we need the Laplace-Beltrami operator <InlineMath math="\Delta_{S^3}" />, which accounts for the curvature. It still measures local deviation from averages, but now those averages are computed along geodesics—the shortest paths on the curved surface.
            </p>

            <p>
              The eigenvalue equation for harmonic analysis is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Delta_{S^3} \psi + \lambda \psi = 0" />
            </div>

            <p>
              This says: find the functions <InlineMath math="\psi" /> that, when you compute their Laplacian, you get back the same function multiplied by a constant. These special functions are the eigenfunctions—the natural vibrational modes of the sphere.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: The Shape of a Drum</p>
              <p className="text-gray-700">
                Think of a circular drumhead. When struck, it vibrates in specific patterns—some with just a central bulge, others with concentric rings, others with radial lines. These patterns are determined by the drum's shape. The 3-sphere is like a higher-dimensional drum, and its eigenfunctions are the patterns it can vibrate in.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Spectrum is Discrete</h2>

            <p>
              A key consequence of compactness is that the spectrum is discrete. The eigenvalues of <InlineMath math="\Delta_{S^3}" /> don't form a continuous range—they come in specific, quantized values:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\lambda_\ell = \ell(\ell + 2), \quad \ell = 0, 1, 2, \ldots" />
            </div>

            <p>
              This is strikingly similar to the quantum mechanical result for angular momentum. The integer <InlineMath math="\ell" /> labels distinct resonance layers. When <InlineMath math="\ell = 0" />, we have the constant functions—no variation across the sphere. When <InlineMath math="\ell = 1" />, we get functions with one nodal surface. Higher <InlineMath math="\ell" /> values correspond to more rapidly oscillating patterns with more nodes.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Multiplicity: How Many Modes?</h2>

            <p>
              For each eigenvalue <InlineMath math="\lambda_\ell" />, there isn't just one eigenfunction—there's a whole space of them. The dimension of this eigenspace is called the multiplicity. On <InlineMath math="S^3" />, the multiplicity is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="d_\ell = (\ell + 1)^2" />
            </div>

            <p>
              This means the first eigenvalue (<InlineMath math="\ell = 0" />) has multiplicity 1—just the constant function. The second (<InlineMath math="\ell = 1" />) has multiplicity 4. The third has multiplicity 9, and so on. This quadratic growth in the number of modes is characteristic of the 3-sphere's geometry.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                The multiplicity reflects symmetry. The 3-sphere is highly symmetric—it looks the same from every point and in every direction. This symmetry means that for each "energy level" <InlineMath math="\lambda_\ell" />, there are many independent ways to arrange the same pattern of oscillation. The group of rotations acts on these eigenfunctions, mixing them among themselves.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Comparing to the 2-Sphere</h2>

            <p>
              On the ordinary sphere <InlineMath math="S^2" />, the spherical harmonics <InlineMath math="Y_{\ell m}" /> have eigenvalues <InlineMath math="\lambda_\ell = \ell(\ell + 1)" /> and multiplicity <InlineMath math="2\ell + 1" />. The 3-sphere harmonics follow a similar pattern, but with an extra index. While <InlineMath math="S^2" /> harmonics are labeled by two indices <InlineMath math="(\ell, m)" />, the <InlineMath math="S^3" /> harmonics require three indices <InlineMath math="(\ell, m, n)" />.
            </p>

            <p>
              This extra index reflects the richer rotational structure of <InlineMath math="S^3" />. In two dimensions, rotation is about a single axis. In three dimensions, any rotation can be decomposed into rotations about two independent axes. The indices <InlineMath math="m" /> and <InlineMath math="n" /> capture these two independent directions.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Harmonic Ladder</h2>

            <p>
              The eigenfunctions form a ladder of increasing complexity. At each level <InlineMath math="\ell" />, the functions oscillate more rapidly across the sphere. The lowest level (<InlineMath math="\ell = 0" />) is perfectly smooth—constant everywhere. The next level shows gentle variation. Higher levels display increasingly intricate patterns of peaks and troughs.
            </p>

            <p>
              Together, these eigenfunctions form a complete orthonormal basis for square-integrable functions on <InlineMath math="S^3" />. Any function whatsoever can be decomposed into a sum of these harmonics, just as any periodic function can be written as a Fourier series. This decomposition is the heart of spectral analysis.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                Harmonic analysis on <InlineMath math="S^3" /> reveals that the geometry of a curved, compact space determines a discrete spectrum of natural vibrations. These vibrations—the eigenfunctions—provide the building blocks for analyzing any function on the space, connecting geometry to the language of frequencies and resonance.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-5-spectral-theory" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter Hub
          </Link>

          <MarkCompleteButton type="section" id="section-5-1" title="Section 5.1" />

          <Link href="/chapter-5/section-5-2" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 5.2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
