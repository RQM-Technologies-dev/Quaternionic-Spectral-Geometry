import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGChapterFraming from "@/components/QSGChapterFraming";

const sections = [
  {
    number: "9.1",
    title: "Numerical Representation of Quaternions and SU(2)",
    description: "Discover how quaternions encode rotations as four real numbers, forming the computational foundation for all quaternionic algorithms.",
    url: "/chapter-9/section-9-1"
  },
  {
    number: "9.2",
    title: "Quaternionic Fast Fourier Transforms (QFFTs)",
    description: "Learn how Fourier analysis extends to quaternionic fields, enabling spectral decomposition and filtering in four dimensions.",
    url: "/chapter-9/section-9-2"
  },
  {
    number: "9.3",
    title: "Visualization of Resonance Wells",
    description: "Explore techniques for visualizing AGQF wells, coherence fields, and the intricate structure of quaternionic manifolds.",
    url: "/chapter-9/section-9-3"
  },
  {
    number: "9.4",
    title: "Python and Mathematica Environments",
    description: "Get hands-on with practical code examples and workflows for quaternionic computation in both Python and Mathematica.",
    url: "/chapter-9/section-9-4"
  },
  {
    number: "9.5",
    title: "Large-Scale Quaternionic Tensor Fields",
    description: "Master data structures and computational strategies for handling massive quaternionic datasets efficiently.",
    url: "/chapter-9/section-9-5"
  }
];

export default function Chapter9ComputationalHub() {
  useEffect(() => {
    document.title = "Chapter 9: Computational Quaternionic Geometry | Quaternionic Spectral Geometry";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Chapter 9: Computational Quaternionic Geometry - Bringing QSG to life through algorithms, simulation, and visualization.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <Breadcrumb items={[
        { label: "Learn", href: "/learn" },
        { label: "Chapter 9: Computational Geometry" }
      ]} />

      <section className="pt-24 pb-12" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="text-cyan-200 text-sm font-medium mb-2">Chapter 9</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Computational Quaternionic Geometry
            </h1>
            <p className="text-xl text-cyan-100 mb-6 max-w-3xl mx-auto">
              Algorithms, Simulation, and Visualization
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <QSGChapterFraming
              learnerQuestion="How do we simulate and visualize quaternionic geometry?"
              givesYou="A route from theory to implementation: representation, numerical workflows, QFFTs, visualization, and large field data."
              comesNext="Chapter 10 connects the framework to RQM Studio, WaveEngine, sensing, quantum computing, and future research."
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chapter Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once the mathematical tools are in place, the next question is practical: how do we represent them in
              software? This chapter moves from formulas to numerical objects, algorithms, and visual models.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You will see how quaternions and SU(2) rotations are stored, how quaternionic Fourier workflows are
              organized, and how resonance wells or coherence fields can be inspected through visualization.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mt-6">
              <p className="text-teal-900 font-medium">
                Key idea: computation is where the coordinate framework becomes testable, visual, and easier to compare
                against concrete examples.
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
            <MarkCompleteButton id="chapter-9" type="chapter" />
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link href="/chapter-8-special-functions-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-previous-chapter">
              <ArrowLeft className="w-4 h-4" />
              Previous: Chapter 8
            </Link>
            <Link href="/learn" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-back-to-learn">
              Back to Learning Hub
            </Link>
            <Link href="/chapter-10-applications-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-next-chapter">
              Next: Chapter 10
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
