import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGChapterFraming from "@/components/QSGChapterFraming";

const sections = [
  {
    id: "3-1",
    title: "The Manifold Structure of S³",
    description: "How the 3-sphere is defined, visualized through stereographic projection, and covered by coordinate charts.",
    path: "/chapter-3/section-3-1"
  },
  {
    id: "3-2",
    title: "Tangent Spaces and the Lie Group Structure",
    description: "The space of infinitesimal motions at each point, and how quaternion multiplication makes S³ a Lie group.",
    path: "/chapter-3/section-3-2"
  },
  {
    id: "3-3",
    title: "The Bi-Invariant Metric and Levi-Civita Connection",
    description: "Measuring distances and angles on the 3-sphere, and the unique connection that respects this geometry.",
    path: "/chapter-3/section-3-3"
  },
  {
    id: "3-4",
    title: "The Laplace-Beltrami Operator on S³",
    description: "The curved-space Laplacian, its eigenvalues, and the connection to spherical harmonics.",
    path: "/chapter-3/section-3-4"
  },
  {
    id: "3-5",
    title: "Volume Form and Integration on S³",
    description: "The natural measure on the 3-sphere, its total volume 2π², and the Haar measure for averaging.",
    path: "/chapter-3/section-3-5"
  },
  {
    id: "3-6",
    title: "Geodesics and Parallel Transport",
    description: "The shortest paths on S³ are great circles, and how vectors move along these curves.",
    path: "/chapter-3/section-3-6"
  },
  {
    id: "3-7",
    title: "Summary and Outlook",
    description: "Bringing together the geometric toolkit and looking ahead to spectral theory.",
    path: "/chapter-3/section-3-7"
  }
];

export default function Chapter3DifferentialGeometryS3() {
  useEffect(() => {
    document.title = "Chapter 3: Differential Geometry on S³ | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Chapter 3 of Quaternionic Spectral Geometry textbook: Differential geometry on the 3-sphere, exploring manifold structure, metrics, curvature, and the Laplacian.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Differential Geometry on <InlineMath math="S^3" />
            </h1>
            <p className="text-xl text-white/90 italic">
              Manifold Structure and Metrics
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <QSGChapterFraming
          learnerQuestion="Once states live on S³, how do we talk about motion and change there?"
          givesYou="A gentle geometric toolkit: tangent directions, metrics, geodesics, volume, and the Laplacian on the 3-sphere."
          comesNext="Chapter 4 uses that geometry to explain how operators act and how spectral calculation begins."
        />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">
            This chapter builds the bridge between algebraic quaternions and geometric intuition. Here, we explore how the 3-sphere <InlineMath math="S^3" />—the space of unit quaternions—behaves as a smooth curved manifold. We learn how to move, measure, and differentiate on it, just as one does in ordinary calculus on flat <InlineMath math="\mathbb{R}^n" />. The difference is that <InlineMath math="S^3" /> curves back onto itself, meaning that straight lines become great circles, distances wrap around, and algebraic multiplication becomes geometric motion.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            We will examine coordinate systems, tangent spaces, curvature, and the Laplacian. Each of these concepts deepens the connection between geometry and rotation. By the end of the chapter, you will see how every property of <InlineMath math="S^3" />—its curvature, metric, and Laplacian—directly supports quaternionic spectral analysis and the deeper study of resonance on curved manifolds.
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
          <Link href="/chapter-2-quaternionic-rotation" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-chapter">
            <ArrowLeft className="w-4 h-4" />
            Chapter 2
          </Link>

          <MarkCompleteButton type="chapter" id="chapter-3" title="Chapter 3" />

          <Link href="/chapter-4-spectral-calculus" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-chapter">
            Chapter 4
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
