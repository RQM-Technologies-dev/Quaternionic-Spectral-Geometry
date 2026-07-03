import { useEffect } from "react";
import { BookOpen, Calculator, Lightbulb, Target, Globe, Layers, ExternalLink, Orbit } from "lucide-react";
import { Link } from "wouter";
import { RQMChatWidget } from "@/components/RQMChatWidget";

export default function QuaternionicSpectralGeometry() {
  useEffect(() => {
    document.title = "Quaternionic Spectral Geometry - RQM Technologies";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Mathematical framework for spectral analysis on quaternionic manifolds, covering eigenvalue problems and geometric methods for quantum mechanics research and applications.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with academic styling */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(to right, #2d3748, #4a5568, #718096, #a0aec0)'
      }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 2px, transparent 2px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
              Quaternionic Spectral Geometry
            </h1>

            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Advanced mathematical framework bridging quaternionic algebra, differential geometry, and spectral analysis
            </p>

            <Link href="/quaternionic-spectral-geometry-book">
              <button className="inline-flex items-center px-8 py-4 bg-slate-400 hover:bg-slate-500 text-white font-semibold rounded-lg transition-colors duration-300">
                <BookOpen className="h-6 w-6 mr-3" />
                Full Course
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Main Content */}
        <div className="mb-20">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>
              RQM Technologies builds software around a simple thesis: better coordinates create better measurement, better measurement enables better control, and better control is what makes better software possible for quantum states, waves, imaging, sensing, communications, and other scientific systems. Quaternionic Spectral Geometry (QSG) is the mathematical foundation that supplies those coordinates, preserving phase, orientation, polarization, and quantum-state structure in one coherent representation rather than projecting them away.
            </p>

            <p>
              Imagine a version of calculus that doesn't stop at real numbers (1D) or even complex numbers (2D), but extends naturally into four dimensions. Quaternionic Spectral Geometry (QSG) does exactly this. It builds a full calculus on the unit hypersphere of quaternionic space, unifying real, complex, and quaternionic analysis into a single coherent framework. In this geometry, numbers are not just magnitudes, they have orientation. Rotations, phases, and directional symmetries become part of the number system itself, allowing mathematics to express movement and balance as effortlessly as it once expressed addition and multiplication.
            </p>

            <p>
              QSG treats rotation as intrinsic to the geometry, not an extra layer added after the fact. Every quaternionic function evolves on the 3-sphere S³, where the form <span className="font-italic">q</span> = cos <span className="font-italic">φ</span> + <span className="font-bold italic">u</span> sin <span className="font-italic">φ</span> captures all possible orientations through SU(2) symmetry—the same structure that governs spin in quantum mechanics and polarization in light. <Link href="/quaternionic-hypersphere" className="text-blue-600 hover:text-blue-800 underline">Visualize this fundamental hypersphere geometry</Link> to see how quaternionic rotations trace the unit 3-sphere. This means calculus, spectral analysis, and harmonic decomposition can now account for orientation and coherence directly. The result is a richer picture of structure and resonance: one that reveals patterns of alignment, rotation, and interference that classical complex analysis could never see.
            </p>

            <p>
              Beyond mathematics, Quaternionic Spectral Geometry provides a natural language for any system where orientation and coherence matter. From the rotation of particles to the polarization of light, from navigating spacecraft to analyzing electromagnetic fields, QSG handles the full 4D behavior of signals without breaking them into separate scalar and vector parts. Its equations describe rotation and motion together, offering greater precision, stability, and insight. Whether applied to physics, geometry, or advanced signal processing, QSG transforms the way we model reality—showing that orientation itself is not an afterthought, but the very shape of mathematical truth.
            </p>
          </div>
        </div>

        {/* RQM Technologies Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-6">
              RQM Technologies has developed and published this comprehensive guide to advance the understanding and application of quaternionic spectral geometry in both academic research and practical engineering. The complete textbook provides detailed mathematical foundations, worked examples, and computational tools for implementing QSG methods across various disciplines. The same QSG framework is what RQM Studio uses to compile and reason about quantum programs, and what the RQM WaveEngine uses to model EM systems, signal propagation, and wave analysis (including Quaternionic Signal Processing as a delivered capability), so the coordinates you study here are the coordinates our products actually compute on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quaternionic-hypersphere">
                <button className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-300" data-testid="link-hypersphere">
                  <Orbit className="h-5 w-5 mr-2" />
                  Unit Hypersphere S³
                </button>
              </Link>
              <a href="/assets/models/resonant-axis/documents/maxwell-fields-as-resonant-deviations-from-coherence.pdf" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors duration-300" data-testid="link-quaternionic-maxwell">
                  <Orbit className="h-5 w-5 mr-2" />
                  Quaternionic Maxwell Equations
                </button>
              </a>
              <Link href="/quaternionic-spectral-geometry-book">
                <button className="inline-flex items-center px-6 py-3 bg-slate-400 hover:bg-slate-500 text-white font-semibold rounded-lg transition-colors duration-300">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Access Full Course
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <RQMChatWidget />
    </div>
  );
}
