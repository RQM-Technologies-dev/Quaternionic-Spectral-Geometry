import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGChapterFraming from "@/components/QSGChapterFraming";

const sections = [
  {
    number: "7.1",
    title: "Coherence as Phase Alignment",
    description: "Discover how quaternionic states maintain synchronized orientations, creating the geometric foundation for wave coherence.",
    url: "/chapter-7/section-7-1"
  },
  {
    number: "7.2",
    title: "Interference on the 3-Sphere",
    description: "Explore how constructive and destructive resonance patterns emerge from quaternionic superposition in curved space.",
    url: "/chapter-7/section-7-2"
  },
  {
    number: "7.3",
    title: "Spectral Coherence Functions",
    description: "Learn how to measure coherence across frequencies, unifying phase synchronization with directional alignment.",
    url: "/chapter-7/section-7-3"
  },
  {
    number: "7.4",
    title: "The Resonant Axis Model",
    description: "Understand how systems dynamically equilibrate toward stable coherence through geometric self-correction.",
    url: "/chapter-7/section-7-4"
  },
  {
    number: "7.5",
    title: "Visualizing Coherence Fields",
    description: "See coherence as flowing textures and patterns across the hypersphere—a living field of geometric harmony.",
    url: "/chapter-7/section-7-5"
  }
];

export default function Chapter7SpectralCoherenceHub() {
  useEffect(() => {
    document.title = "Chapter 7: Spectral Coherence | Quaternionic Spectral Geometry";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Chapter 7: Quaternionic Spectral Coherence - Explore how resonance, alignment, and field stability emerge from geometric harmony.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <Breadcrumb items={[
        { label: "Learn", href: "/learn" },
        { label: "Chapter 7: Spectral Coherence" }
      ]} />

      {/* Hero Section */}
      <section className="pt-24 pb-12" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="text-cyan-200 text-sm font-medium mb-2">Chapter 7</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Quaternionic Spectral Coherence
            </h1>
            <p className="text-xl text-cyan-100 mb-6 max-w-3xl mx-auto">
              Resonance, Alignment, and Field Stability
            </p>
          </div>
        </div>
      </section>

      {/* Chapter Overview */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <QSGChapterFraming
              learnerQuestion="What does it mean for a state or system to stay aligned?"
              givesYou="A plain-language route into coherence, drift, alignment, and stability before the formal coherence measures."
              comesNext="Chapter 8 gathers the reusable special functions and operators that make these ideas computable."
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chapter Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chapter 6 gave you a resonance landscape. Chapter 7 asks a different question: when a system moves
              through that landscape, what does it mean for its phase and orientation to stay aligned?
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This chapter treats coherence as alignment in quaternionic spectral space. You will move from the
              familiar idea of phase agreement toward interference on S³, coherence functions, drift, and stability.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mt-6">
              <p className="text-teal-900 font-medium">
                Key idea: coherence is a way to ask whether quaternionic phases and orientations are staying
                coordinated, drifting apart, or settling into a stable pattern.
              </p>
            </div>
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
            <MarkCompleteButton id="chapter-7" type="chapter" />
          </div>

          {/* Chapter Navigation */}
          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link href="/chapter-6-agqf-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-previous-chapter">
              <ArrowLeft className="w-4 h-4" />
              Previous: Chapter 6
            </Link>
            <Link href="/learn" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-back-to-learn">
              Back to Learning Hub
            </Link>
            <Link href="/chapter-8-special-functions-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-next-chapter">
              Next: Chapter 8
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
