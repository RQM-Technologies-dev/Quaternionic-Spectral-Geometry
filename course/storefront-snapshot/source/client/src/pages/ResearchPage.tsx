import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ResearchPage() {
  useEffect(() => {
    document.title = "Research | RQM Technologies";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Research from RQM Technologies across Quaternionic Spectral Geometry (QSG), Resonant Quantum Mechanics (RQM), RQM Studio, and the RQM WaveEngine — covering timing, quantum computation, communication, and signal processing using quaternionic / S³ methods.";
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Research & Innovation
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Six research areas where quaternionic / S³ methods preserve phase, orientation, polarization, and quantum-state geometry — delivered through RQM Studio and the RQM WaveEngine.
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-lg max-w-none space-y-12">

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1a3b47' }}>
              Quaternionic Timing & Metrology
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              RQM Technologies develops timing systems that use quaternionic resonance instead of probabilistic quantum collapse. Our timing architectures lock oscillators to geometric anchor-wells creating deterministic timing references with fundamentally reduced drift. By treating time as resonance alignment on the manifold S³ × ℝ(s), these systems achieve stability and holdover impossible for conventional atomic clocks. This geometric approach eliminates the fundamental noise floor that limits traditional atomic standards, enabling precision timing for GPS-denied navigation, secure communications, and next-generation positioning systems that maintain accuracy even during extended periods without external synchronization.
            </p>
            <Link href="/quaternionic-quantum-sensing" className="inline-flex items-center font-semibold transition-colors hover:opacity-70" style={{ color: '#3d7a8c' }} data-testid="link-timing-metrology">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </section>

          <div className="border-b" style={{ borderColor: '#e5e7eb' }}></div>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1a3b47' }}>
              Quantum Computing
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Experience how Resonant Quantum Mechanics calculates quantum states, gates, and algorithms through pure quaternionic geometry. Watch spinor rotations unfold in real-time as RQM transforms abstract quantum operations into visualizable geometric transformations that reveal the deterministic mathematical foundations underlying quantum computation and make the invisible mechanics of qubits tangible and comprehensible. This framework provides new pathways for error correction and gate optimization by exposing the geometric structure that standard formulations obscure, offering practical advantages for both algorithm design and hardware implementation in the race toward fault-tolerant quantum systems.
            </p>
            <Link href="/rqm-spinor-visualizer" className="inline-flex items-center font-semibold transition-colors hover:opacity-70" style={{ color: '#3d7a8c' }} data-testid="link-quantum-computing">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </section>

          <div className="border-b" style={{ borderColor: '#e5e7eb' }}></div>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1a3b47' }}>
              Quantum Communication
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our next-generation communication systems exploit quaternionic modulation and coding to transmit and process signals in their complete spatial, spectral, and polarization domains. The result is high-capacity, interference-resistant links capable of maintaining performance in contested or bandwidth-limited scenarios. By encoding information across the full quaternionic state space, these systems achieve spectral efficiencies beyond what conventional complex-valued approaches can reach, while simultaneously providing inherent security through geometric encryption that is fundamentally resistant to interception and jamming in adversarial electromagnetic environments.
            </p>
            <Link href="/quaternionic-quantum-communication" className="inline-flex items-center font-semibold transition-colors hover:opacity-70" style={{ color: '#3d7a8c' }} data-testid="link-quantum-communication">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </section>

          <div className="border-b" style={{ borderColor: '#e5e7eb' }}></div>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1a3b47' }}>
              Resonant Quantum Mechanics
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              RQM solves fundamental quantum mysteries by deriving quantization and coherence from geometric first principles—no more mysterious axioms. Working directly in quaternionic manifold space, RQM reveals why quantum behavior emerges, providing a mathematical foundation that explains measurement, entanglement, and coherence as natural geometric phenomena rather than unexplained quantum 'weirdness.' This interpretive clarity translates into engineering advantages: systems designed with RQM principles exhibit predictable decoherence behavior and offer new control strategies for maintaining quantum states, bridging the gap between theoretical understanding and practical quantum device performance.
            </p>
            <Link href="/resonant-quantum-mechanics" className="inline-flex items-center font-semibold transition-colors hover:opacity-70" style={{ color: '#3d7a8c' }} data-testid="link-rqm">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </section>

          <div className="border-b" style={{ borderColor: '#e5e7eb' }}></div>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1a3b47' }}>
              Quaternionic Spectral Geometry
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The mathematical foundation that derives quantum behavior from pure geometry. QSG provides the tools and methods for understanding why quantization exists, how coherence emerges, and what quantum mechanics actually means—transforming it from an interpretational puzzle into a geometric certainty. This framework enables both theoretical breakthroughs and practical quantum system design. Through the spectral analysis of quaternionic operators on curved manifolds, QSG reveals the deep connections between topology, symmetry, and physical observables—providing researchers with rigorous mathematical machinery that unifies disparate quantum phenomena under a single coherent geometric paradigm.
            </p>
            <Link href="/quaternionic-spectral-geometry" className="inline-flex items-center font-semibold transition-colors hover:opacity-70" style={{ color: '#3d7a8c' }} data-testid="link-qsg">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </section>

          <div className="border-b" style={{ borderColor: '#e5e7eb' }}></div>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#1a3b47' }}>
                Signal Processing & Antenna Design
              </h2>
              <span className="px-3 py-1 text-white text-xs font-bold rounded-full" style={{ backgroundColor: '#3d7a8c' }}>
                ERIS Awardable
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We design antennas and signal-processing architectures around the RQM WaveEngine, where Quaternionic Signal Processing (QSP) is delivered as a capability rather than a separate platform. By using quaternionic / S³ methods that preserve phase, orientation, and polarization in one coherent representation, these systems achieve superior beamforming, polarization control, and interference rejection. From compact multi-mode antennas to adaptive spatial filters, the QSP capability redefines performance in contested and cluttered electromagnetic environments. Our DARPA ERIS Awardable work demonstrates how quaternionic signal representations enable real-time adaptive processing for defense and commercial applications.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/quaternionic-signal-processing" className="inline-flex items-center font-semibold transition-colors hover:opacity-70" style={{ color: '#3d7a8c' }} data-testid="link-signal-processing">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="https://www.darpaconnect.us/eris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold transition-colors hover:opacity-70"
                style={{ color: '#2d5a69' }}
                data-testid="link-eris-marketplace"
              >
                View on ERIS Marketplace <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </section>

        </div>
      </article>

      <section className="py-12 md:py-16" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1a3b47' }}>
            Interested in Our Research?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're in academia, industry, or government, we welcome collaboration on advancing quaternionic quantum technologies.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: '#2d5a69' }}
            data-testid="link-contact-research"
          >
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
