import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter5Section5_2() {
  useEffect(() => {
    document.title = "Section 5.2: The Peter-Weyl Theorem | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Understand the Peter-Weyl theorem and how representation theory provides a complete orthonormal basis for functions on compact groups like S³.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 5 · Section 5.2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Peter-Weyl Theorem
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Orthonormal bases from representation theory
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The Peter-Weyl theorem is one of the most beautiful results in harmonic analysis. It tells us that for any compact group—including the 3-sphere viewed as the group <InlineMath math="SU(2)" />—the functions that arise from group representations form a complete orthonormal basis. In other words, representation theory hands us exactly the right building blocks to decompose any function on the group.
            </p>

            <p>
              This is a useful connection between algebra (representations) and analysis (Fourier decomposition). The symmetries of the space determine its natural harmonics.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="Why do group representations become the Fourier modes of S3?"
              plainLanguageSetup="Section 5.1 introduced harmonic modes as allowed patterns. Since S3 is also SU(2), its symmetries are group symmetries, and Peter-Weyl says representation matrix entries form the natural basis."
              formulaRecap={
                <>
                  <PrettyBlockMath math="f(g)=\sum_{j,m,n}\hat f^j_{mn}D^j_{mn}(g)" />
                  <p>
                    Read this as a Fourier expansion on the group: <InlineMath math="D^j_{mn}" /> are basis functions and <InlineMath math="\hat f^j_{mn}" /> are the spectral coefficients.
                  </p>
                </>
              }
              checkpoint="What role does compactness play in the Peter-Weyl picture?"
              revealAnswer="Compactness makes the representation-based modes form a discrete orthonormal basis, so functions can be decomposed cleanly."
              finalTakeaway="Peter-Weyl connects symmetry to analysis: the group structure of S3 supplies the harmonic building blocks."
              nextStep="Section 5.3 looks more closely at the Wigner D-functions that act as those building blocks."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>What is a Representation?</h2>

            <p>
              A representation of a group is a way of realizing the group's elements as matrices acting on a vector space. For the group <InlineMath math="SU(2)" /> of unit quaternions, each representation assigns to every group element <InlineMath math="g" /> a matrix <InlineMath math="D^j(g)" /> of size <InlineMath math="(2j+1) \times (2j+1)" />, where <InlineMath math="j = 0, \frac{1}{2}, 1, \frac{3}{2}, \ldots" /> is a half-integer label.
            </p>

            <p>
              These matrices respect the group structure: <InlineMath math="D^j(g_1 g_2) = D^j(g_1) D^j(g_2)" />. The identity element gives the identity matrix, and the inverse gives the inverse matrix. The representation makes the abstract group concrete—you can compute with it.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: Representations as Viewpoints</p>
              <p className="text-gray-700">
                Think of each representation as a different way of viewing the group. The trivial representation (<InlineMath math="j = 0" />) sees every element as the same—the number 1. The fundamental representation (<InlineMath math="j = \frac{1}{2}" />) sees elements as 2×2 matrices. Higher representations give larger, more detailed pictures. Each reveals different aspects of the group's structure.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Matrix Coefficients as Functions</h2>

            <p>
              The key insight is that each matrix entry of a representation defines a function on the group. If <InlineMath math="D^j(g)" /> is a <InlineMath math="(2j+1) \times (2j+1)" /> matrix, then for each pair of indices <InlineMath math="(m, n)" />, the function:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="D^j_{mn}: g \mapsto D^j_{mn}(g)" />
            </div>

            <p>
              takes a group element and returns the <InlineMath math="(m,n)" />-entry of its representation matrix. These functions are called <em>matrix coefficients</em>. For <InlineMath math="SU(2)" />, the matrix coefficients of all irreducible representations are precisely the Wigner D-functions.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Theorem Statement</h2>

            <p>
              The Peter-Weyl theorem makes three powerful claims:
            </p>

            <p>
              <strong>Completeness:</strong> Any square-integrable function on the group can be approximated arbitrarily well by linear combinations of matrix coefficients. No function is left out.
            </p>

            <p>
              <strong>Orthogonality:</strong> Matrix coefficients from different representations, or different entries of the same representation, are orthogonal:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\int_{SU(2)} D^j_{mn}(g) \overline{D^{j'}_{m'n'}(g)} \, dg = \frac{\delta_{jj'} \delta_{mm'} \delta_{nn'}}{2j+1}" />
            </div>

            <p>
              <strong>Normalization:</strong> With appropriate scaling, the matrix coefficients form an orthonormal basis. The factor <InlineMath math="2j+1" /> in the denominator comes from the dimension of the representation.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                The Peter-Weyl theorem guarantees that we can decompose any function on <InlineMath math="S^3" /> (viewed as <InlineMath math="SU(2)" />) into a sum of Wigner D-functions. This is the curved-space analogue of Fourier series, but with the symmetries of the sphere built in from the start.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Fourier Expansion on <InlineMath math="SU(2)" /></h2>

            <p>
              Given any function <InlineMath math="f" /> on the group, we can expand it as:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="f(g) = \sum_{j=0,\frac{1}{2},1,\ldots} (2j+1) \sum_{m,n=-j}^{j} \hat{f}^j_{mn} D^j_{mn}(g)" />
            </div>

            <p>
              The coefficients <InlineMath math="\hat{f}^j_{mn}" /> are the Fourier coefficients, computed by:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\hat{f}^j_{mn} = \int_{SU(2)} f(g) \overline{D^j_{mn}(g)} \, dg" />
            </div>

            <p>
              This is exactly like the familiar Fourier transform, but adapted to the curved geometry of the group. The integral is over the group manifold, and the "basis functions" are the Wigner D-functions rather than complex exponentials.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Connection to Harmonic Analysis</h2>

            <p>
              The Peter-Weyl theorem reveals that the eigenfunctions of the Laplacian on <InlineMath math="S^3" /> are precisely the Wigner D-functions. Each representation <InlineMath math="j" /> corresponds to an eigenvalue <InlineMath math="\lambda = j(j+1)" /> (using the angular momentum convention), and all <InlineMath math="(2j+1)^2" /> matrix coefficients in that representation share the same eigenvalue.
            </p>

            <p>
              This explains why representation theory and spectral theory are so deeply intertwined for symmetric spaces. The group's symmetries determine both the representations and the spectrum of the Laplacian. They're two faces of the same coin.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Generalization to Other Groups</h2>

            <p>
              The Peter-Weyl theorem applies to any compact Lie group, not just <InlineMath math="SU(2)" />. For the circle group <InlineMath math="U(1)" />, it reduces to ordinary Fourier series. For the rotation group <InlineMath math="SO(3)" />, it gives spherical harmonics. For <InlineMath math="SU(2)" />, it gives the Wigner D-functions.
            </p>

            <p>
              The theorem's power lies in its universality: wherever there is symmetry, there is a natural spectral decomposition, and the building blocks come from representation theory.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The Peter-Weyl theorem bridges algebra and analysis. It says that the study of group representations—a purely algebraic endeavor—gives us exactly the tools we need for harmonic analysis on the group manifold. For <InlineMath math="S^3 \cong SU(2)" />, the representations are the source of all spectral structure.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-5/section-5-1" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 5.1
          </Link>

          <MarkCompleteButton type="section" id="section-5-2" title="Section 5.2" />

          <Link href="/chapter-5/section-5-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 5.3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
