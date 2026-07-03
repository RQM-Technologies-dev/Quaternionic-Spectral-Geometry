import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Chapter5Section5_4() {
  useEffect(() => {
    document.title = "Section 5.4: Product Structure M = S³ × ℝ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Understand how the product structure S³ × ℝ combines angular and linear spectral components into a unified spectral theory.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 5 · Section 5.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Product Structure <InlineMath math="M = S^3 \times \mathbb{R}" />
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Combining angular and linear spectral components
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              The manifold <InlineMath math="M = S^3 \times \mathbb{R}" /> combines two fundamentally different spaces: the compact, curved 3-sphere and the infinite, flat real line. This product structure creates a spectral theory with two distinct flavors—discrete angular modes from <InlineMath math="S^3" /> and continuous frequencies from <InlineMath math="\mathbb{R}" />. Together, they form a rich framework for analyzing waves and fields.
            </p>

            <p>
              Think of <InlineMath math="M" /> as an infinite cylinder whose cross-section is the 3-sphere. A point in <InlineMath math="M" /> is specified by a unit quaternion <InlineMath math="g \in S^3" /> (the angular position) and a real number <InlineMath math="t \in \mathbb{R}" /> (the position along the cylinder, often interpreted as time).
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do angular modes on S3 combine with continuous motion along R?"
              plainLanguageSetup="Section 5.3 gave the S3 building blocks. On S3 x R, each angular Wigner mode pairs with a plane-wave frequency along the real line."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\Delta_M=\Delta_{S^3}+\frac{\partial^2}{\partial t^2},\qquad D^j_{mn}(g)e^{i\omega t}" />
                  <p>
                    The product eigenfunction has an angular part <InlineMath math="D^j_{mn}(g)" /> and a linear frequency part <InlineMath math="e^{i\omega t}" />.
                  </p>
                </>
              }
              checkpoint="Why can the eigenfunctions split into a product?"
              revealAnswer="The two Laplacian terms act on different variables and commute, so angular and linear behavior can be solved separately and then multiplied."
              finalTakeaway="The spectrum on S3 x R is a product spectrum: discrete angular structure plus continuous linear frequency."
              nextStep="Section 5.5 connects this spectral framework back to quaternionic function theory."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>The Product Laplacian</h2>

            <p>
              The geometry of <InlineMath math="M" /> is the product of the geometries of its factors. The Laplacian on <InlineMath math="M" /> splits naturally:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="\Delta_M = \Delta_{S^3} + \frac{\partial^2}{\partial t^2}" />
            </div>

            <p>
              The first term measures curvature on the sphere; the second measures variation along the real line. Because these operators act on different coordinates and commute with each other, eigenfunctions of <InlineMath math="\Delta_M" /> can be written as products of eigenfunctions of the individual factors.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Intuition: Separation of Variables</p>
              <p className="text-gray-700">
                The product structure means we can separate the problem. Angular behavior on <InlineMath math="S^3" /> is governed by the Wigner D-functions. Linear behavior on <InlineMath math="\mathbb{R}" /> is governed by complex exponentials or plane waves. The full solution is the product of these two pieces.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Eigenfunctions on the Product</h2>

            <p>
              A natural set of eigenfunctions for <InlineMath math="\Delta_M" /> has the form:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Psi_{jmn,\omega}(g, t) = D^j_{mn}(g) \cdot e^{i\omega t}" />
            </div>

            <p>
              Here <InlineMath math="D^j_{mn}(g)" /> is a Wigner D-function handling the angular part, and <InlineMath math="e^{i\omega t}" /> is a Fourier mode handling the time part. The eigenvalue of this combined function is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\Delta_M \Psi = \left(-j(j+1) - \omega^2\right) \Psi" />
            </div>

            <p>
              The total eigenvalue is the sum of the contributions from each factor: <InlineMath math="-j(j+1)" /> from the sphere and <InlineMath math="-\omega^2" /> from the line.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Two Types of Spectrum</h2>

            <p>
              The spectrum of <InlineMath math="\Delta_M" /> combines discrete and continuous aspects:
            </p>

            <ul className="list-none space-y-4 my-6">
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>Discrete (from <InlineMath math="S^3" />)</span>
                <span>The angular quantum number <InlineMath math="j" /> takes discrete values <InlineMath math="0, \frac{1}{2}, 1, \frac{3}{2}, \ldots" />. Each <InlineMath math="j" /> defines a fixed contribution to the eigenvalue. The indices <InlineMath math="m, n" /> run from <InlineMath math="-j" /> to <InlineMath math="+j" />.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold" style={{ color: '#3d7a8c' }}>Continuous (from <InlineMath math="\mathbb{R}" />)</span>
                <span>The frequency <InlineMath math="\omega" /> is any real number. There's no gap, no quantization—all frequencies are allowed.</span>
              </li>
            </ul>

            <p>
              The full spectrum is thus a discrete-continuous hybrid. For each fixed <InlineMath math="j" />, the eigenvalue <InlineMath math="-j(j+1) - \omega^2" /> varies continuously with <InlineMath math="\omega" />.
            </p>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Why This Matters</p>
              <p className="text-gray-700">
                This hybrid spectrum appears throughout physics. In quantum mechanics, angular momentum is quantized (discrete), but energy from translation can be continuous. The product structure <InlineMath math="S^3 \times \mathbb{R}" /> captures both aspects simultaneously.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Fourier Transform on <InlineMath math="M" /></h2>

            <p>
              Any function <InlineMath math="F(g, t)" /> on <InlineMath math="M" /> can be decomposed using both the spherical Fourier transform (expanding in D-functions) and the ordinary Fourier transform (expanding in exponentials):
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="F(g, t) = \sum_j (2j+1) \sum_{m,n} \int_{-\infty}^{\infty} \hat{F}^j_{mn}(\omega) \, D^j_{mn}(g) \, e^{i\omega t} \, d\omega" />
            </div>

            <p>
              The coefficients <InlineMath math="\hat{F}^j_{mn}(\omega)" /> tell us how much of <InlineMath math="F" /> lives at angular mode <InlineMath math="(j, m, n)" /> and frequency <InlineMath math="\omega" />. This is the complete spectral decomposition of <InlineMath math="F" />.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Wave Equation on <InlineMath math="M" /></h2>

            <p>
              The wave equation on the product manifold is:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\frac{\partial^2 \Psi}{\partial t^2} = \Delta_{S^3} \Psi" />
            </div>

            <p>
              Looking for solutions of the form <InlineMath math="\Psi = D^j_{mn}(g) e^{-i\omega t}" />, we find the dispersion relation:
            </p>

            <div className="overflow-x-auto my-6">
              <PrettyBlockMath math="\omega^2 = j(j+1)" />
            </div>

            <p>
              This tells us that the angular mode determines the temporal frequency. Higher <InlineMath math="j" /> (more rapidly oscillating angular patterns) corresponds to higher frequency oscillation in time. The curvature of <InlineMath math="S^3" /> creates a natural "mass gap"—even the lowest nontrivial mode has a nonzero frequency.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Physical Interpretation</h2>

            <p>
              The product structure <InlineMath math="S^3 \times \mathbb{R}" /> provides a natural arena for describing fields that have both rotational and temporal structure:
            </p>

            <ul className="list-disc ml-6 space-y-2 my-6">
              <li><strong>Orientation:</strong> The <InlineMath math="S^3" /> part encodes angular degrees of freedom—the orientation of a particle, the polarization of a field.</li>
              <li><strong>Time evolution:</strong> The <InlineMath math="\mathbb{R}" /> part tracks how things change, oscillate, or propagate.</li>
              <li><strong>Energy:</strong> The combination <InlineMath math="j(j+1) + \omega^2" /> plays the role of total energy, with contributions from both rotation and translation.</li>
            </ul>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The product structure <InlineMath math="S^3 \times \mathbb{R}" /> separates angular and temporal behavior, giving us a tractable spectral theory. The Wigner D-functions handle the curved, compact part; Fourier exponentials handle the flat, infinite part. Together, they provide a complete basis for any function on the manifold.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-5/section-5-3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Section 5.3
          </Link>

          <MarkCompleteButton type="section" id="section-5-4" title="Section 5.4" />

          <Link href="/chapter-5/section-5-5" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-section">
            Section 5.5
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
