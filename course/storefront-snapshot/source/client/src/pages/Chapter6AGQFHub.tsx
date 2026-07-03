import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGChapterFraming from "@/components/QSGChapterFraming";

const sections = [
  {
    number: "6.1",
    title: "The Quaternionic Factorial Operator",
    description: "Discover how the classical factorial extends into four-dimensional quaternionic space, creating a powerful engine for resonance analysis.",
    url: "/chapter-6/section-6-1"
  },
  {
    number: "6.2",
    title: "The Anchor-Generating Extension (AGQF)",
    description: "Learn how adding a sine-prefactor transforms smooth growth into a quantized landscape of resonance wells and stability zones.",
    url: "/chapter-6/section-6-2"
  },
  {
    number: "6.3",
    title: "The Sine-Prefactor Lattice",
    description: "Explore the periodic structure of zeros and wells that creates nature's harmonic ladder of allowed states.",
    url: "/chapter-6/section-6-3"
  },
  {
    number: "6.4",
    title: "The Anchor Potential",
    description: "Understand the energy landscape that governs stability—peaks that repel and valleys that attract quantum states.",
    url: "/chapter-6/section-6-4"
  },
  {
    number: "6.5",
    title: "Quantization and the Spectral Ladder",
    description: "See how discrete energy levels emerge naturally from geometric confinement, connecting geometry to Planck's constant.",
    url: "/chapter-6/section-6-5"
  }
];

export default function Chapter6AGQFHub() {
  useEffect(() => {
    document.title = "Chapter 6: The AGQF | Quaternionic Spectral Geometry";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Chapter 6: The Anchor-Generating Quaternionic Factorial - Learn how quantization emerges from geometric resonance wells in quaternionic space.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <Breadcrumb items={[
        { label: "Learn", href: "/learn" },
        { label: "Chapter 6: The AGQF" }
      ]} />

      {/* Hero Section */}
      <section className="pt-24 pb-12" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="text-cyan-200 text-sm font-medium mb-2">Chapter 6</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The Anchor-Generating Quaternionic Factorial
            </h1>
            <p className="text-xl text-cyan-100 mb-6 max-w-3xl mx-auto">
              Resonance Wells and Quantization
            </p>
          </div>
        </div>
      </section>

      {/* Chapter Overview */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <QSGChapterFraming
              learnerQuestion="How can resonance wells organize allowed states?"
              givesYou="A way to place the AGQF after the spectral groundwork: wells, zeros, barriers, and a careful model for allowed resonant structure."
              comesNext="Chapter 7 asks how states remain aligned or drift once this resonance landscape is present."
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chapter Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              After Chapter 5, you have a spectral picture: shapes can have natural modes. This chapter asks what
              happens when that spectrum is organized by wells, zeros, and barriers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Anchor-Generating Quaternionic Factorial (AGQF) is introduced as a structured way to model a
              resonance landscape in quaternionic space. The chapter builds the idea step by step: first the
              factorial extension, then the anchor term, then the resulting wells and spectral ladder.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mt-6">
              <p className="text-teal-900 font-medium">
                Key idea: once resonance is represented as a landscape, allowed states can be discussed as
                stable regions in that landscape rather than as isolated formulas.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-teal-200 rounded-lg p-4 mt-6">
              <p className="text-gray-700 mb-3">
                <strong>See the related visual model:</strong> The Hydrogenic Spectral Atlas connects this resonance-well
                language to discrete spectral lines in the site visualization.
              </p>
              <Link href="/spectral-atlas">
                <button className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors text-sm"
                  style={{ background: 'linear-gradient(to right, #1a3b47, #4d9aaf)' }}
                  data-testid="link-spectral-atlas">
                  <ArrowRight className="w-4 h-4" />
                  Explore the Spectral Atlas
                </button>
              </Link>
            </div>
          </div>

          {/* Prerequisite Video */}
          <div className="rounded-xl border-l-4 bg-amber-50 shadow-sm p-6 mt-8 mb-2" style={{ borderColor: '#d97706' }}>
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">Prerequisite Viewing · The Gamma Function</span>
              <h2 className="text-xl font-bold mt-1 text-gray-900">
                Factorials, Gamma, and Why π Hides Inside Them
              </h2>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                The AGQF is built on extending the factorial into quaternionic space — but first you need to see how the classical factorial already generalizes to non-integers through the <strong>Gamma function</strong>. This lecture by Grant Sanderson (3Blue1Brown) derives the N-dimensional ball volume formula π<sup>n/2</sup>/Γ(n/2+1), revealing that Γ(½) = √π and that π is secretly embedded in factorial arithmetic. The second half (from ~25 min) is the direct mathematical precursor to the AGQF derivation in Section 6.1.
              </p>
            </div>
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/fsLh-NYhOoU"
                title="Volumes of N-Dimensional Balls — 3Blue1Brown"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-amber-600 mt-3 text-right">3Blue1Brown · ~58 min · Second half especially relevant · Click to play</p>
          </div>

          {/* Section Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Sections in This Chapter</h3>

            {sections.map((section) => (
              <Link key={section.number} href={section.url} data-testid={`link-section-${section.number.replace('.', '-')}`}>
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:border-teal-300 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: 'linear-gradient(135deg, #1a3b47, #4d9aaf)' }}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                        {section.number}: {section.title}
                      </h4>
                      <p className="text-gray-600 mt-1">{section.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mark Complete Button */}
          <div className="mt-8">
            <MarkCompleteButton id="chapter-6" type="chapter" />
          </div>

          {/* Chapter Navigation */}
          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link href="/chapter-5-spectral-theory" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-previous-chapter">
              <ArrowLeft className="w-4 h-4" />
              Previous: Chapter 5
            </Link>
            <Link href="/learn" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-back-to-learn">
              Back to Learning Hub
            </Link>
            <Link href="/chapter-7-spectral-coherence-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-next-chapter">
              Next: Chapter 7
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
