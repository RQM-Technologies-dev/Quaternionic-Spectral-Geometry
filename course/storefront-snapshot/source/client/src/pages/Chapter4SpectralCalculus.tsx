import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGChapterFraming from "@/components/QSGChapterFraming";

const sections = [
  {
    id: "4-1",
    title: "Spectra of the Laplacian",
    description: "The eigenvalues of the Laplacian on SU(2) × ℝ, and how they form a two-dimensional frequency space.",
    path: "/chapter-4/section-4-1"
  },
  {
    id: "4-2",
    title: "Functional Calculus",
    description: "How functions of the Laplacian—like the heat operator—act by simple multiplication in the spectral domain.",
    path: "/chapter-4/section-4-2"
  },
  {
    id: "4-3",
    title: "Rayleigh Quotient and Variational Principles",
    description: "Energy minimization and how eigenfunctions emerge as critical points of energy functionals.",
    path: "/chapter-4/section-4-3"
  },
  {
    id: "4-4",
    title: "Resonance Selection",
    description: "How variational extremals correspond to resonant modes—the geometry that selects which frequencies ring.",
    path: "/chapter-4/section-4-4"
  }
];

export default function Chapter4SpectralCalculus() {
  useEffect(() => {
    document.title = "Chapter 4: Spectral Calculus | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Chapter 4 of Quaternionic Spectral Geometry textbook: Spectral calculus on M = SU(2) × ℝ, exploring Laplacian eigenvalues, functional calculus, and resonance selection.";
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
            <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-book">
              <ArrowLeft className="w-4 h-4" />
              Back to Table of Contents
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Spectral Calculus on <InlineMath math="M = SU(2) \times \mathbb{R}" />
            </h1>
            <p className="text-xl text-white/90 italic">
              Operators, Eigenvalues, and Resonance
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <QSGChapterFraming
          learnerQuestion="How do functions and operators act on quaternionic geometry?"
          givesYou="The bridge from shape to calculation: Laplacian spectra, functional calculus, variational principles, and resonance selection."
          comesNext="Chapter 5 asks how those operator patterns become the allowed harmonic modes of S³ x R."
        />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">
            In ordinary calculus, the spectral viewpoint is simple: the eigenfunctions of the derivative operator are exponential functions, and the eigenfunctions of the Laplacian are sines and cosines. This viewpoint makes differential equations solvable—to solve a wave equation, you just recognize the eigenfunctions and let them do the work.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            In Quaternionic Spectral Geometry, the same principle applies—but our eigenfunctions are indexed by two parameters: the spin index <InlineMath math="\ell" /> on <InlineMath math="SU(2)" />, and the frequency <InlineMath math="\omega" /> on <InlineMath math="\mathbb{R}" />. This chapter develops the calculus of operators in that spectral domain, showing how every operation becomes transparent when viewed through the lens of eigenfunctions.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.path}
              className="block p-6 rounded-lg border-2 transition-all hover:shadow-lg"
              style={{
                borderColor: '#3d7a8c',
                backgroundColor: 'rgba(77, 154, 175, 0.05)'
              }}
              data-testid={`link-section-${section.id}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2d5a69' }}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium" style={{ color: '#3d7a8c' }}>Section {section.id}</span>
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
          <Link href="/chapter-3-differential-geometry-s3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-chapter">
            <ArrowLeft className="w-4 h-4" />
            Chapter 3
          </Link>

          <MarkCompleteButton type="chapter" id="chapter-4" title="Chapter 4" />

          <Link href="/chapter-5-spectral-theory" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-chapter">
            Chapter 5
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
