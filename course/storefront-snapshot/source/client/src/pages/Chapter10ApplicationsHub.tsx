import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGChapterFraming from "@/components/QSGChapterFraming";

const sections = [
  {
    number: "10.1",
    title: "Quaternionic Signal Processing and Communication",
    description: "Discover how quaternionic modulation encodes multiple signals on a single carrier, enabling beyond-5G communication systems.",
    url: "/chapter-10/section-10-1"
  },
  {
    number: "10.2",
    title: "Quaternionic Optics and Polarization",
    description: "Explore light as a quaternionic phenomenon where amplitude, phase, and polarization unite in a coherent geometric framework.",
    url: "/chapter-10/section-10-2"
  },
  {
    number: "10.3",
    title: "Orientation Tracking in Robotics and Navigation",
    description: "Learn how quaternions track orientation in robots and spacecraft, enhanced by QSG's spectral and geometric context.",
    url: "/chapter-10/section-10-3"
  },
  {
    number: "10.4",
    title: "Quaternionic Quantum Mechanics",
    description: "Understand quaternionic Hilbert spaces, spin-1/2 systems, and the deep connection to Resonant Quantum Mechanics.",
    url: "/chapter-10/section-10-4"
  },
  {
    number: "10.5",
    title: "The Riemann Hypothesis Connection",
    description: "Investigate how quaternionic slices illuminate the ζ-function zeros and open new paths in number theory research.",
    url: "/chapter-10/section-10-5"
  }
];

export default function Chapter10ApplicationsHub() {
  useEffect(() => {
    document.title = "Chapter 10: Applications and Frontiers | Quaternionic Spectral Geometry";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Chapter 10: Applications and Frontiers - From Theory to Technology. Connect QSG mathematics to real-world applications in communication, optics, robotics, and quantum systems.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <Breadcrumb items={[
        { label: "Learn", href: "/learn" },
        { label: "Chapter 10: Applications and Frontiers" }
      ]} />

      <section className="pt-24 pb-12" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="text-cyan-200 text-sm font-medium mb-2">Chapter 10</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Applications and Frontiers
            </h1>
            <p className="text-xl text-cyan-100 mb-6 max-w-3xl mx-auto">
              From Theory to Technology
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <QSGChapterFraming
              learnerQuestion="Where does this coordinate framework become useful?"
              givesYou="A disciplined application map across software, physics, engineering, quantum computing, signal processing, and open research."
              comesNext="This is the final chapter. Leave with a map of where QSG helps organize problems and where claims still need evidence."
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chapter Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The final chapter asks where the coordinate framework can help. It does not ask you to replace existing
              physics or engineering methods. Instead, it shows how the QSG lens can organize problems involving
              rotation, polarization, coherence, spectra, and computation.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The applications are grouped by modeling need: communication and WaveEngine-style signal analysis,
              optical polarization, orientation tracking, quantum-state geometry, and research questions where spectral
              structure matters.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The goal is a disciplined map. Each application should make clear what standard methods already do well,
              what the quaternionic coordinate view adds, and where further evidence or research is still required.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mt-6">
              <p className="text-teal-900 font-medium">
                Key idea: applications are strongest when the modeling problem actually needs phase, direction,
                rotation, spectra, or coherence to be tracked together.
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
            <MarkCompleteButton id="chapter-10" type="chapter" />
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-previous-chapter">
              <ArrowLeft className="w-4 h-4" />
              Previous: Chapter 9
            </Link>
            <Link href="/learn" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-back-to-learn">
              Back to Learning Hub
            </Link>
            <div className="text-gray-400 italic text-sm">
              Final Chapter
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
