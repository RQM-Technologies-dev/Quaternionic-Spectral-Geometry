import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGChapterFraming from "@/components/QSGChapterFraming";

export default function Chapter5SpectralTheory() {
  useEffect(() => {
    document.title = "Chapter 5: Spectral Theory on S³ × ℝ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore spectral theory on S³ × ℝ, including harmonic analysis, the Peter-Weyl theorem, Wigner D-functions, and applications to quaternionic analysis.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  const sections = [
    {
      number: "5.1",
      title: "Harmonic Analysis on S³",
      description: "Spherical harmonics generalized to the 3-sphere—the natural vibration modes of a curved, compact space.",
      path: "/chapter-5/section-5-1"
    },
    {
      number: "5.2",
      title: "The Peter-Weyl Theorem",
      description: "How representation theory provides a complete orthonormal basis for functions on compact groups.",
      path: "/chapter-5/section-5-2"
    },
    {
      number: "5.3",
      title: "Wigner D-Functions as Eigenfunctions",
      description: "The building blocks of spectral decomposition on S³, connecting rotation to quantum numbers.",
      path: "/chapter-5/section-5-3"
    },
    {
      number: "5.4",
      title: "Product Structure M = S³ × ℝ",
      description: "Combining angular and linear spectral components into a unified framework.",
      path: "/chapter-5/section-5-4"
    },
    {
      number: "5.5",
      title: "Applications to Quaternionic Analysis",
      description: "Connecting spectral theory to slice regularity and quaternionic function theory.",
      path: "/chapter-5/section-5-5"
    }
  ];

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
            <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-book">
              <ArrowLeft className="w-4 h-4" />
              Back to Table of Contents
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 5</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Spectral Theory on <InlineMath math="S^3 \times \mathbb{R}" />
            </h1>
            <p className="text-xl text-white/90 italic">
              Harmonic Analysis and Eigenfunctions
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <QSGChapterFraming
          learnerQuestion="How does shape produce allowed patterns?"
          givesYou="A spectral view of S³ x R: harmonics, Wigner D-functions, product structure, and the idea that geometry has natural modes."
          comesNext="Chapter 6 uses that spectral picture to introduce resonance wells and the AGQF."
        />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">
            Spectral theory on <InlineMath math="S^3 \times \mathbb{R}" /> reveals the deep harmony between geometry, oscillation, and energy. The 3-sphere provides a curved arena for rotations, while <InlineMath math="\mathbb{R}" /> represents time or translation. Together, they form a unified stage where vibrations, rotations, and frequencies interact—the mathematical foundation for resonance and quantization in quaternionic geometry.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            By decomposing functions into eigenmodes of the Laplacian and Fourier components in time, we uncover how energy, frequency, and orientation emerge as facets of a single geometric spectrum. This chapter develops the machinery of harmonic analysis on curved spaces, culminating in the Wigner D-functions—the natural building blocks of spectral decomposition on the quaternionic sphere.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <Link
              key={section.number}
              href={section.path}
              className="block p-6 rounded-lg border-2 transition-all hover:shadow-lg"
              style={{
                borderColor: '#3d7a8c',
                backgroundColor: 'rgba(77, 154, 175, 0.05)'
              }}
              data-testid={`link-section-${section.number}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2d5a69' }}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium" style={{ color: '#3d7a8c' }}>Section {section.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#1a3b47' }}>{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-4-spectral-calculus" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-chapter">
            <ArrowLeft className="w-4 h-4" />
            Chapter 4
          </Link>

          <MarkCompleteButton type="chapter" id="chapter-5" title="Chapter 5" />

          <Link href="/chapter-6-agqf-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-chapter">
            Chapter 6
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
