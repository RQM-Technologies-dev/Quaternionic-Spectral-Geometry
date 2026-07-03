import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ContentSearch from "@/components/ContentSearch";
import ProgressBar from "@/components/ProgressBar";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Lightbulb, Zap, Rocket } from "lucide-react";
import { RQMChatWidget } from "@/components/RQMChatWidget";
import ResumeReadingCard from "@/components/ResumeReadingCard";

interface Chapter {
  number: number;
  title: string;
  subtitle: string;
  url: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const chaptersByCategory = {
  foundations: {
    title: "Foundations",
    icon: BookOpen,
    description: "What kind of number and shape can hold rotation?",
    chapters: [
      {
        number: 1,
        title: "The Geometry of Numbers",
        subtitle: "Why do we need more than real and complex numbers? This chapter shows how number systems become coordinate systems for the next step.",
        url: "/chapter-1-geometry-of-numbers",
        difficulty: "Beginner" as const
      },
      {
        number: 2,
        title: "The Quaternionic Rotation Form",
        subtitle: "How can one object hold angle and direction together? This chapter gives you q = cos φ + u sin φ as the first usable handle.",
        url: "/chapter-2-quaternionic-rotation",
        difficulty: "Beginner" as const
      },
      {
        number: 3,
        title: "Differential Geometry on S³",
        subtitle: "Once states live on S³, how do we describe motion and change there? This chapter introduces tangent directions, metrics, and derivatives.",
        url: "/chapter-3-differential-geometry-s3",
        difficulty: "Intermediate" as const
      }
    ]
  },
  calculus: {
    title: "Calculus & Spectral Theory",
    icon: Lightbulb,
    description: "How do we measure change and vibration on that shape?",
    chapters: [
      {
        number: 4,
        title: "Spectral Calculus",
        subtitle: "How do functions and operators act on quaternionic geometry? This chapter moves from shape to calculation.",
        url: "/chapter-4-spectral-calculus",
        difficulty: "Intermediate" as const
      },
      {
        number: 5,
        title: "Spectral Theory on S³ × ℝ",
        subtitle: "How does shape produce allowed patterns? This chapter introduces eigenfunctions, harmonics, and spectral structure.",
        url: "/chapter-5-spectral-theory",
        difficulty: "Advanced" as const
      }
    ]
  },
  advanced: {
    title: "Advanced Concepts",
    icon: Zap,
    description: "How do resonance and coherence become organized structure?",
    chapters: [
      {
        number: 6,
        title: "The Anchor-Generating Quaternionic Factorial (AGQF)",
        subtitle: "How can resonance wells organize allowed states? This chapter places AGQF after the spectrum is already in view.",
        url: "/chapter-6-agqf-hub",
        difficulty: "Advanced" as const
      },
      {
        number: 7,
        title: "Quaternionic Spectral Coherence",
        subtitle: "What does it mean for a state or system to stay aligned? This chapter introduces coherence, drift, and stability.",
        url: "/chapter-7-spectral-coherence-hub",
        difficulty: "Advanced" as const
      }
    ]
  },
  applications: {
    title: "Applications & Implementation",
    icon: Rocket,
    description: "How does this become usable software, physics, and engineering?",
    chapters: [
      {
        number: 8,
        title: "Special Functions and Operators",
        subtitle: "What tools let us compute with this framework? This chapter collects reusable mathematical operators.",
        url: "/chapter-8-special-functions-hub",
        difficulty: "Advanced" as const
      },
      {
        number: 9,
        title: "Computational Quaternionic Geometry",
        subtitle: "How do we simulate and visualize this? This chapter moves from theory to algorithms and visual models.",
        url: "/chapter-9-computational-hub",
        difficulty: "Intermediate" as const
      },
      {
        number: 10,
        title: "Applications and Frontiers",
        subtitle: "Where does this become useful? This chapter connects QSG to RQM Studio, WaveEngine, sensing, quantum computing, and future research.",
        url: "/chapter-10-applications-hub",
        difficulty: "Intermediate" as const
      }
    ]
  }
};

const difficultyColors = {
  Beginner: "bg-emerald-100 text-emerald-700 border-emerald-300",
  Intermediate: "bg-blue-100 text-blue-700 border-blue-300",
  Advanced: "bg-purple-100 text-purple-700 border-purple-300"
};

export default function LearningHub() {
  useEffect(() => {
    document.title = "Learn RQM Theory | Learning Hub | RQM Technologies";

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalContent = metaDescription?.getAttribute('content') || '';

    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn Quaternionic Spectral Geometry as a step-by-step coordinate framework for waves, rotations, spectra, and quantum states.');
    }

    return () => {
      if (metaDescription && originalContent) {
        metaDescription.setAttribute('content', originalContent);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <Breadcrumb items={[{ label: "Learn RQM Theory" }]} />

      {/* Hero Section */}
      <section className="pt-24 pb-12" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              Learn RQM Theory
            </h1>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Learn a coordinate framework for waves, rotations, spectra, and quantum states, one necessary idea at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search Bar */}
          <div className="mb-6">
            <ContentSearch placeholder="Search all 10 chapters..." />
          </div>

          {/* Resume Reading - QSP + QC courses */}
          <ResumeReadingCard course="all" />

          {/* Progress Bar */}
          <div className="mb-8">
            <ProgressBar />
          </div>

          {/* Introduction Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a3b47] mb-4">Welcome to Your Learning Journey</h2>
            <p className="text-[#2d5a69] leading-relaxed mb-4">
              This course teaches <strong>Quaternionic Spectral Geometry (QSG)</strong> as a coordinate framework for problems where phase, direction, rotation, and spectra need to be seen together. You will start with numbers and geometry, then move gradually toward spectra, resonance, computation, and applications.
            </p>
            <p className="text-[#2d5a69] leading-relaxed mb-4">
              You do not need to understand every formula on the first pass. Each chapter adds one piece to the same thread: number, shape, motion, spectra, resonance, computation, and application.
            </p>
            <p className="text-[#3d7a8c] text-sm">
              <strong>Suggested Path:</strong> Read in order the first time. Let the formula sections make the intuition precise, but keep your attention on why the coordinate system is being built.
            </p>
          </div>

          <div className="mb-12 rounded-lg border-l-4 bg-white p-6 shadow-sm" style={{ borderColor: '#3d7a8c' }}>
            <h2 className="text-xl font-bold text-[#1a3b47] mb-3">How to read this course</h2>
            <ul className="space-y-2 text-[#2d5a69]">
              <li>Read the first pass in order so the path from number to application stays visible.</li>
              <li>Do not try to memorize every formula immediately; first ask what problem the formula is solving.</li>
              <li>Watch for the repeated thread: number, shape, motion, spectra, resonance, computation, application.</li>
              <li>Use the formal sections as precision tools after the plain-language model is clear.</li>
            </ul>
          </div>

          {/* Chapter Categories */}
          <div className="space-y-12">
            {Object.entries(chaptersByCategory).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <div key={key}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-white p-3 rounded-lg" style={{ backgroundColor: '#2d5a69' }}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold" style={{ color: '#1a3b47' }}>{category.title}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.chapters.map((chapter) => (
                      <Link key={chapter.number} href={chapter.url}>
                        <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-gray-200 hover:border-[#4d9aaf]">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-4xl font-bold" style={{ color: 'rgba(29, 59, 71, 0.2)' }}>
                                {chapter.number}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 transition-colors" style={{ color: '#1a3b47' }}>
                              {chapter.title}
                            </h3>
                            <p className="text-sm text-gray-600 italic">
                              {chapter.subtitle}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <Link href="/quaternionic-spectral-geometry-book">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-[#3d7a8c] hover:border-[#4d9aaf]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#1a3b47' }}>📖 Full Textbook View</h3>
                  <p className="text-gray-700">
                    Browse all chapters in traditional textbook format with complete table of contents
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rqm-spinor-visualizer">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-[#3d7a8c] hover:border-[#4d9aaf]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#1a3b47' }}>🎯 Interactive Visualizer</h3>
                  <p className="text-gray-700">
                    Explore quaternionic rotations with our interactive RQM Spinor Visualizer
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

        </div>
      </section>
      <RQMChatWidget />
    </div>
  );
}
