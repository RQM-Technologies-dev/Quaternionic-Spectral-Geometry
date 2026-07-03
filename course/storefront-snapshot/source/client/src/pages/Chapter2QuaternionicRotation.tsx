import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen } from "lucide-react";
import { InlineMath } from 'react-katex';
import { Button } from "@/components/ui/button";
import { markChapterVisited, markChapterCompleted, getChapterProgress } from "@/lib/readingProgress";
import QSGChapterFraming from "@/components/QSGChapterFraming";

const sections = [
  {
    id: "2-1",
    title: "Deriving the Axis–Angle Form",
    description: "The fundamental representation of rotation: how the quaternionic half-angle parameterizes orientation on the 3-sphere.",
    path: "/chapter-2/section-2-1"
  },
  {
    id: "2-2",
    title: "Exponential and Logarithm on S³",
    description: "The bridge between flat tangent space and curved rotation space—the tools for linearizing and interpolating rotations.",
    path: "/chapter-2/section-2-2"
  },
  {
    id: "2-3",
    title: "SU(2) and SO(3): The Double Cover",
    description: "Why every rotation has two quaternion representatives, and the profound physical implications for spin.",
    path: "/chapter-2/section-2-3"
  },
  {
    id: "2-4",
    title: "Great Circles and Geodesics",
    description: "The shortest paths between orientations—great circles on S³ that underlie smooth rotation interpolation.",
    path: "/chapter-2/section-2-4"
  },
  {
    id: "2-5",
    title: "Tangent Spaces, Frames, and the Maurer–Cartan Form",
    description: "The infinitesimal structure of rotation: how angular velocity connects to differential geometry.",
    path: "/chapter-2/section-2-5"
  },
  {
    id: "2-6",
    title: "The Hopf Fibration",
    description: "How S³ decomposes into linked circles over S²—separating direction from phase in the geometry of spin.",
    path: "/chapter-2/section-2-6"
  },
  {
    id: "2-7",
    title: "Practical Visualization and Interpolation",
    description: "From theory to application: SLERP, stereographic projection, and real-world quaternion algorithms.",
    path: "/chapter-2/section-2-7"
  },
  {
    id: "2-8",
    title: "Worked Examples",
    description: "Step-by-step calculations illustrating axis-angle conversion, rotation composition, and the 4π identity.",
    path: "/chapter-2/section-2-8"
  },
  {
    id: "2-9",
    title: "Summary",
    description: "The core concepts consolidated, with connections to physics and a glossary of key terms.",
    path: "/chapter-2/section-2-9"
  }
];

export default function Chapter2QuaternionicRotation() {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    document.title = "Chapter 2: The Quaternionic Rotation Form | QSG Textbook";

    markChapterVisited('chapter-2');

    const progress = getChapterProgress('chapter-2');
    if (progress?.completed) {
      setIsCompleted(true);
    }

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Chapter 2 of Quaternionic Spectral Geometry textbook: The quaternionic rotation form, exponential and logarithm on S³, the SU(2)/SO(3) double cover, and the Hopf fibration.";
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
            <div className="text-white/70 text-sm mb-2">Chapter 2</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Quaternionic Rotation Form
            </h1>
            <p className="text-xl text-white/90 italic mb-6">
              <InlineMath math="q = \cos\varphi + \mathbf{u}\sin\varphi" /> and the 3-Sphere
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              This chapter deepens our geometric understanding of unit quaternions as points on the 3-sphere <InlineMath math="S^3" />. We explore how the axis-angle form encodes rotations, the exponential map, the double cover over <InlineMath math="\mathrm{SO}(3)" />, and the beautiful Hopf fibration linking spin and direction.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <QSGChapterFraming
          learnerQuestion="How can one object hold angle and direction together?"
          givesYou="The axis-angle form of a unit quaternion, so rotation has a compact coordinate handle instead of a pile of separate parameters."
          comesNext="Chapter 3 treats all unit quaternions as the space S³, where motion, distance, and change can be measured."
        />
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
                    2.{index + 1}
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
              <span>Master the axis-angle form <InlineMath math="q = \cos\varphi + \mathbf{u}\sin\varphi = e^{\mathbf{u}\varphi}" /></span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3d7a8c' }} />
              <span>Understand why <InlineMath math="S^3" /> double-covers <InlineMath math="\mathrm{SO}(3)" /> and the <InlineMath math="4\pi" /> spinor identity</span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3d7a8c' }} />
              <span>Learn geodesics and SLERP interpolation for smooth rotations</span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3d7a8c' }} />
              <span>Explore the Hopf fibration <InlineMath math="S^1 \hookrightarrow S^3 \to S^2" /></span>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-1-geometry-of-numbers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-prev-chapter">
            <ArrowLeft className="w-4 h-4" />
            Chapter 1
          </Link>

          <Button
            onClick={() => {
              markChapterCompleted('chapter-2', !isCompleted);
              setIsCompleted(!isCompleted);
            }}
            className={`px-6 py-3 ${isCompleted ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#2d5a69] hover:bg-[#1a3b47]'}`}
            data-testid="button-mark-complete"
          >
            <CheckCircle className={`w-5 h-5 mr-2 ${isCompleted ? 'fill-current' : ''}`} />
            {isCompleted ? 'Completed ✓' : 'Mark Chapter Complete'}
          </Button>

          <Link href="/chapter-3-differential-geometry-s3" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#2d5a69' }} data-testid="link-next-chapter">
            Chapter 3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
