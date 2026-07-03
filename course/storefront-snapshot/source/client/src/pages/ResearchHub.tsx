import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Award, BookOpen, ExternalLink } from "lucide-react";
import { RQMChatWidget } from "@/components/RQMChatWidget";

interface Resource {
  title: string;
  description: string;
  type: "textbook" | "paper" | "achievement" | "documentation";
  url: string;
  date?: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    title: "Quaternionic Spectral Geometry: A Calculus for the 21st Century",
    description: "Complete 10-chapter university-level textbook covering foundations through applications of quaternionic spectral geometry",
    type: "textbook",
    url: "/learn",
    tags: ["Textbook", "Complete Course", "10 Chapters"]
  },
  {
    title: "DARPA ERIS Marketplace - Awardable Status",
    description: "Recognition of quaternionic signal processing innovation through DARPA's Expedited Research Implementation Series competitive procedures",
    type: "achievement",
    url: "/eris-achievement",
    date: "2025",
    tags: ["Government", "Awardable", "Signal Processing"]
  },
  {
    title: "The Geometry of Numbers",
    description: "Foundational chapter exploring the progression from real to complex to quaternionic number systems and S³ topology",
    type: "paper",
    url: "/chapter-1-geometry-of-numbers",
    tags: ["Foundations", "Geometry", "Beginner"]
  },
  {
    title: "Anchor-Generating Quaternionic Factorial (AGQF)",
    description: "Advanced treatment of resonance wells, quantization, and spectral ladder structure in quaternionic space",
    type: "paper",
    url: "/chapter-6-agqf",
    tags: ["Quantization", "Advanced", "Spectral Theory"]
  },
  {
    title: "Computational Quaternionic Geometry",
    description: "Algorithms, simulation techniques, and visualization methods for quaternionic spectral systems",
    type: "paper",
    url: "/chapter-9-computational-geometry",
    tags: ["Computation", "Algorithms", "Visualization"]
  },
  {
    title: "Applications and Frontiers",
    description: "Real-world applications in signal processing, optics, robotics, and quantum systems with open research problems",
    type: "paper",
    url: "/chapter-10-applications",
    tags: ["Applications", "Industry", "Research Frontiers"]
  }
];

const typeIcons = {
  textbook: BookOpen,
  paper: FileText,
  achievement: Award,
  documentation: FileText
};

const typeColors = {
  textbook: "bg-blue-100 text-blue-700 border-blue-300",
  paper: "bg-purple-100 text-purple-700 border-purple-300",
  achievement: "bg-amber-100 text-amber-700 border-amber-300",
  documentation: "bg-emerald-100 text-emerald-700 border-emerald-300"
};

export default function ResearchHub() {
  useEffect(() => {
    document.title = "Research Library | RQM Technologies";

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalContent = metaDescription?.getAttribute('content') || '';

    if (metaDescription) {
      metaDescription.setAttribute('content', 'Open research library from RQM Technologies covering Quaternionic Spectral Geometry (QSG), Resonant Quantum Mechanics (RQM), the RQM Studio quantum-computing platform, and the RQM WaveEngine signal-processing platform — textbooks, papers, and technical documentation.');
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
      <Breadcrumb items={[{ label: "Research Library" }]} />

      {/* Hero Section */}
      <section className="pt-24 pb-12" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              Research Library
            </h1>
            <p className="text-xl text-cyan-100 mb-6 max-w-3xl mx-auto">
              Resources on Quaternionic Spectral Geometry, Resonant Quantum Mechanics, and the platforms built on them: RQM Studio and the RQM WaveEngine.
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-semibold">Free Access</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-semibold">Peer-Reviewed</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-semibold">Continuously Updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Introduction */}
          <Card className="mb-12 border-2 border-[#3d7a8c] bg-gradient-to-br from-cyan-50 to-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-[#1a3b47] mb-4">Open Access Research</h2>
              <p className="text-[#2d5a69] leading-relaxed mb-4">
                All RQM Technologies research materials are freely available to support academic study, industry development, and government applications. Our work spans the mathematical foundations of Quaternionic Spectral Geometry, the physics of Resonant Quantum Mechanics, and the platforms that put them to work — RQM Studio for quantum computation and the RQM WaveEngine for signal processing.
              </p>
              <p className="text-[#3d7a8c] text-sm">
                <strong>Citation:</strong> All materials are available for academic use. Please cite appropriately when referencing RQM Technologies publications in your work.
              </p>
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "All Resources", count: resources.length },
              { label: "Textbooks", count: resources.filter(r => r.type === "textbook").length },
              { label: "Papers", count: resources.filter(r => r.type === "paper").length },
              { label: "Achievements", count: resources.filter(r => r.type === "achievement").length }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold" style={{ color: '#1a3b47' }}>{item.count}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="space-y-6">
            {resources.map((resource, idx) => {
              const IconComponent = typeIcons[resource.type];

              return (
                <Card
                  key={idx}
                  className="border-2 border-gray-200 hover:border-[#4d9aaf] hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-6">

                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="text-white p-3 rounded-lg" style={{ backgroundColor: '#2d5a69' }}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${typeColors[resource.type]}`}>
                                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                              </span>
                              {resource.date && (
                                <span className="text-xs text-gray-500">
                                  {resource.date}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#1a3b47' }}>
                              {resource.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">
                          {resource.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {resource.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link href={resource.url}>
                          <button className="inline-flex items-center gap-2 font-semibold group hover:opacity-80" style={{ color: '#2d5a69' }}>
                            View Resource
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="mt-12">
            <Card className="border-2 border-[#3d7a8c] bg-gradient-to-br from-cyan-50 to-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#1a3b47' }}>Stay Updated</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  New research materials, papers, and visualizations are added regularly. Check back frequently or contact us to discuss collaboration opportunities.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/contact">
                    <button className="px-6 py-3 text-white font-semibold rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: '#2d5a69' }}>
                      Contact Research Team
                    </button>
                  </Link>
                  <Link href="/learn">
                    <button className="px-6 py-3 border-2 font-semibold rounded-lg transition-colors hover:bg-cyan-50" style={{ borderColor: '#2d5a69', color: '#2d5a69' }}>
                      Start Learning
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
      <RQMChatWidget />
    </div>
  );
}
