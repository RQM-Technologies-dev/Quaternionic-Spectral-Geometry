import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen } from "lucide-react";
import { InlineMath } from 'react-katex';
import { Button } from "@/components/ui/button";
import { markChapterVisited, markChapterCompleted, getChapterProgress } from "@/lib/readingProgress";
import QSGChapterFraming from "@/components/QSGChapterFraming";

const sections = [
  {
    id: "1-1",
    title: "From ℝ to ℂ to ℍ",
    description: "The geometric journey through number systems—how each extension adds algebraic structure to express deeper geometry.",
    path: "/chapter-1/section-1-1"
  },
  {
    id: "1-2",
    title: "Algebraic Structure and Geometric Decomposition",
    description: "How quaternions split into scalars and vectors, and the elegant dot-cross identity that unifies metric and oriented geometry.",
    path: "/chapter-1/section-1-2"
  },
  {
    id: "1-3",
    title: "Non-Commutativity and Its Necessity",
    description: "Why quaternion multiplication must be non-commutative—because 3D rotations themselves don't commute.",
    path: "/chapter-1/section-1-3"
  },
  {
    id: "1-4",
    title: "Unit Quaternions and the 3-Sphere S³",
    description: "The geometry of orientations: how unit quaternions form a 3-sphere and the axis-angle representation.",
    path: "/chapter-1/section-1-4"
  },
  {
    id: "1-5",
    title: "Rotations in ℝ³ via Conjugation",
    description: "The Euler-Rodrigues formula and how quaternion conjugation encodes 3D rotations.",
    path: "/chapter-1/section-1-5"
  },
  {
    id: "1-6",
    title: "Quaternionic Planes and Slices",
    description: "The complex planes hidden inside quaternions—how to use complex analysis slice by slice.",
    path: "/chapter-1/section-1-6"
  },
  {
    id: "1-7",
    title: "S³ as a Lie Group; Relation to SU(2)",
    description: "The isomorphism between unit quaternions and SU(2), and the topology that explains spinor behavior.",
    path: "/chapter-1/section-1-7"
  },
  {
    id: "1-8",
    title: "The Hopf Fibration S¹ → S³ → S²",
    description: "How the 3-sphere fibers over the 2-sphere with circle fibers—linking direction and phase.",
    path: "/chapter-1/section-1-8"
  },
  {
    id: "1-9",
    title: "Measure and Volume of S³",
    description: "The Haar measure and the volume 2π²—the natural uniform distribution over orientations.",
    path: "/chapter-1/section-1-9"
  },
  {
    id: "1-10",
    title: "Why S³ Is the Natural Home for Orientation",
    description: "Completeness, smoothness, stability, and computational efficiency—why quaternions are perfect for rotations.",
    path: "/chapter-1/section-1-10"
  },
  {
    id: "1-11",
    title: "Summary",
    description: "The core ideas in plain words, with a glossary of key terms.",
    path: "/chapter-1/section-1-11"
  }
];

export default function Chapter1GeometryOfNumbers() {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    document.title = "Chapter 1: The Geometry of Numbers | QSG Textbook";

    markChapterVisited('chapter-1');

    const progress = getChapterProgress('chapter-1');
    if (progress?.completed) {
      setIsCompleted(true);
    }

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Chapter 1 of Quaternionic Spectral Geometry textbook: From Real to Complex to Quaternionic numbers, exploring the geometric foundations of quaternions and the unit hypersphere S³.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="relative overflow-hidden mt-16" style={{
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
            <div className="text-white/70 text-sm mb-2">Chapter 1</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Geometry of Numbers
            </h1>
            <p className="text-xl text-white/90 italic mb-6">
              From Real to Complex to Quaternionic
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              This chapter develops the algebra and geometry of the quaternions <InlineMath math="\mathbb{H}" /> as a natural extension of <InlineMath math="\mathbb{R}" /> and <InlineMath math="\mathbb{C}" />. We emphasize how unit quaternions form the 3-sphere <InlineMath math="S^3" /> and act by conjugation to encode all 3D rotations.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <QSGChapterFraming
          learnerQuestion="Why do we need more than real and complex numbers?"
          givesYou="A first map from number systems to coordinate systems, with quaternions introduced as a way to hold phase and orientation together."
          comesNext="Chapter 2 turns the quaternion idea into the usable rotation form q = cos phi + u sin phi."
        />
      </section>

      {/* Visual Foundation Video */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="rounded-xl border-l-4 bg-white shadow-md p-6" style={{ borderColor: '#3d7a8c' }}>
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#3d7a8c' }}>Visual Foundation · Watch First</span>
            <h2 className="text-xl font-bold mt-1" style={{ color: '#1a3b47' }}>
              High-Dimensional Geometry: Why 4D Space Is Real
            </h2>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Before diving into the algebra of quaternions, this lecture by Grant Sanderson (3Blue1Brown) builds the geometric intuition you'll need throughout this chapter. It shows why four-dimensional spaces are mathematically real and tractable, why your 3D instincts will sometimes mislead you, and — crucially — why the unit quaternions you are about to study form a 3-sphere S³ in exactly the same sense that this video explores. The "spiky cube" puzzle is a direct preview of the kind of counterintuitive geometry that makes quaternionic space so powerful.
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
          <p className="text-xs text-gray-400 mt-3 text-right">3Blue1Brown · ~58 min · Click to play</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1a3b47' }}>Chapter Sections</h2>
          <p className="text-gray-600">Click any section to explore in depth.</p>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <Link
              key={section.id}
              href={section.path}
              className="block group"
              data-testid={`link-section-${section.id}`}
            >
              <div className="p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg" style={{
                borderColor: '#3d7a8c',
                backgroundColor: 'white'
              }}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2d5a69' }}>
                    1.{index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold group-hover:underline" style={{ color: '#1a3b47' }}>
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      {section.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#3d7a8c' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: '#1a3b47' }}>Learning Objectives</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3d7a8c' }} />
              <span>Understand the quaternion basis and non-commutativity</span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3d7a8c' }} />
              <span>Master the polar/axis-angle form <InlineMath math="q = \cos\phi + u\sin\phi" /></span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3d7a8c' }} />
              <span>Recognize the identification <InlineMath math="S^3 = \{q \in \mathbb{H} : |q| = 1\}" /></span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3d7a8c' }} />
              <span>Understand why <InlineMath math="S^3" /> is the natural home for orientation</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-back-to-book-bottom">
            <ArrowLeft className="w-4 h-4" />
            Table of Contents
          </Link>

          <Button
            onClick={() => {
              markChapterCompleted('chapter-1', !isCompleted);
              setIsCompleted(!isCompleted);
            }}
            className={`px-6 py-3 ${isCompleted ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#2d5a69] hover:bg-[#1a3b47]'}`}
            data-testid="button-mark-complete"
          >
            <CheckCircle className={`w-5 h-5 mr-2 ${isCompleted ? 'fill-current' : ''}`} />
            {isCompleted ? 'Completed ✓' : 'Mark Chapter Complete'}
          </Button>

          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-chapter">
            Chapter 2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
