import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGChapterFraming from "@/components/QSGChapterFraming";

const sections = [
  {
    number: "8.1",
    title: "The Quaternionic Factorial Operator ◎",
    description: "Discover how the classical factorial extends into quaternionic space, creating a versatile analytical engine for spectral geometry.",
    url: "/chapter-8/section-8-1"
  },
  {
    number: "8.2",
    title: "Relations to π, Γ(½), and Spectral Multipliers",
    description: "Explore the deep connections between ◎, fundamental constants, and how it transforms into a spectral filter.",
    url: "/chapter-8/section-8-2"
  },
  {
    number: "8.3",
    title: "Explicit Computations and Examples",
    description: "Work through concrete evaluations and see the quaternionic factorial in action on real problems.",
    url: "/chapter-8/section-8-3"
  },
  {
    number: "8.4",
    title: "Connections to ζ and Euler Products",
    description: "Uncover the surprising link between factorials, the Riemann zeta function, and prime numbers.",
    url: "/chapter-8/section-8-4"
  }
];

export default function Chapter8SpecialFunctionsHub() {
  useEffect(() => {
    document.title = "Chapter 8: Special Functions and Operators | Quaternionic Spectral Geometry";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Chapter 8: Special Functions and Operators - Learn how the quaternionic factorial operator ◎ supports computation in QSG analysis.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <Breadcrumb items={[
        { label: "Learn", href: "/learn" },
        { label: "Chapter 8: Special Functions" }
      ]} />

      <section className="pt-24 pb-12" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="text-cyan-200 text-sm font-medium mb-2">Chapter 8</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Special Functions and Operators
            </h1>
            <p className="text-xl text-cyan-100 mb-6 max-w-3xl mx-auto">
              The Quaternionic Factorial and Spectral Multipliers
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <QSGChapterFraming
              learnerQuestion="What tools let us compute with this framework?"
              givesYou="A focused collection of reusable functions and operators, with each tool tied to what it measures or transforms."
              comesNext="Chapter 9 turns these tools into algorithms, simulation choices, and visual workflows."
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chapter Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By this point, the course has built geometry, spectra, resonance, and coherence. Chapter 8 collects
              the mathematical tools that make those ideas easier to compute with.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The quaternionic factorial operator ◎ is treated as one such tool. The chapter connects it to Gamma-style
              extensions, constants such as π, and spectral multipliers, while keeping the focus on what each tool lets
              the learner calculate or compare.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mt-6">
              <p className="text-teal-900 font-medium">
                Key idea: special functions are reusable instruments. Learn what each one measures or transforms before
                using it in larger arguments.
              </p>
            </div>
          </div>

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

          <div className="mt-8">
            <MarkCompleteButton id="chapter-8" type="chapter" />
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link href="/chapter-7-spectral-coherence-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-previous-chapter">
              <ArrowLeft className="w-4 h-4" />
              Previous: Chapter 7
            </Link>
            <Link href="/learn" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-back-to-learn">
              Back to Learning Hub
            </Link>
            <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-next-chapter">
              Next: Chapter 9
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
