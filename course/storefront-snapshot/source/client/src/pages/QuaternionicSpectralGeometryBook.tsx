import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

interface Chapter {
  number: number;
  title: string;
  subtitle: string;
  sections: string[];
  goal: string;
}

const chapters: Chapter[] = [
  {
    number: 1,
    title: "The Geometry of Numbers",
    subtitle: "From Real to Complex to Quaternionic",
    sections: [
      "Historical progression: ℝ → ℂ → ℍ",
      "Why Hamilton's discovery matters geometrically",
      "The quaternion basis ({1, i, j, k}) and non-commutativity",
      "Real, complex, and quaternionic planes visualized",
      "The unit hypersphere (S³): definition, volume, and topology",
      "Quaternionic conjugation, norm, and inverse as geometric reflections"
    ],
    goal: "Problem solved: why more than real and complex numbers are needed. Next step: use quaternions as a practical rotation form."
  },
  {
    number: 2,
    title: "The Quaternionic Rotation Form",
    subtitle: "q = cos φ + u sin φ and the 3-Sphere",
    sections: [
      "Deriving q(t) = cos φ + u sin φ from unit-norm constraints",
      "Connection to SU(2) and SO(3): double-cover symmetry",
      "4π rotation identity and the topology of spin",
      "Geodesics, tangent spaces, and Hopf fibration (S³ → S²)",
      "Visualization: rotation as movement along great circles of S³"
    ],
    goal: "Problem solved: how one object can hold angle and direction together. Next step: treat the unit quaternions as a smooth space."
  },
  {
    number: 3,
    title: "Differential Geometry on S³",
    subtitle: "Manifold Structure and Metrics",
    sections: [
      "Coordinate charts and bi-invariant metric",
      "Lie group structure of SU(2) and left/right-invariant vector fields",
      "Connection forms, curvature tensors, and volume measure (2π²)",
      "Laplacian on S³ and its eigenvalues (ℓ(ℓ+2))",
      "Parallel transport and curvature-induced phase"
    ],
    goal: "Problem solved: how motion and change can be described on S³. Next step: turn that geometry into operators and calculation."
  },
  {
    number: 4,
    title: "Spectral Calculus",
    subtitle: "Operators, Eigenvalues, and Resonance",
    sections: [
      "Spectra of the Laplacian on SU(2) x R",
      "Functional calculus and heat operators",
      "Rayleigh quotient and variational principles",
      "Resonance selection and geometric modes"
    ],
    goal: "Problem solved: how functions and operators act on quaternionic geometry. Next step: read the allowed patterns as spectra."
  },
  {
    number: 5,
    title: "Spectral Theory on S³ × ℝ",
    subtitle: "Harmonic Analysis and Eigenfunctions",
    sections: [
      "Separation of variables on S³",
      "Wigner D-matrices and spherical harmonics as quaternionic modes",
      "Fourier and Laplace transforms on SU(2)×ℝ",
      "Spectral density and orthogonality relations",
      "Energy, frequency, and orientation in unified spectral space"
    ],
    goal: "Problem solved: how shape produces allowed patterns. Next step: use that spectral structure to understand resonance wells."
  },
  {
    number: 6,
    title: "The Anchor-Generating Quaternionic Factorial (AGQF)",
    subtitle: "Resonance Wells and Quantization",
    sections: [
      "Definition of the quaternionic factorial ◎(q)",
      "Extension to anchored forms ◎ᵃⁿᶜʰᵒʳₘ,Ψ(q)",
      "Sine-prefactor lattice and zero boundaries (u² = 2k)",
      "Effective potential Uₐₙcₕₒᵣ(u) = -β log[sinᵐ(πu²/2) + δ]",
      "Quantization as confinement within resonance wells",
      "Relationship between AGQF, ℏ, and spectral ladder structure"
    ],
    goal: "Problem solved: how resonance wells can organize allowed states. Next step: ask how systems stay aligned within that landscape."
  },
  {
    number: 7,
    title: "Quaternionic Spectral Coherence",
    subtitle: "Resonance, Alignment, and Field Stability",
    sections: [
      "Coherence as alignment of quaternionic phase vectors",
      "Interference, constructive/destructive resonance on S³",
      "Spectral coherence functions and correlation metrics",
      "Temporal equilibration of eigenvectors (Resonant Axis concept)",
      "Visualizing coherence fields and resonance transitions"
    ],
    goal: "Problem solved: what alignment and stability mean in spectral space. Next step: collect the reusable tools that make the framework computable."
  },
  {
    number: 8,
    title: "Special Functions and Operators",
    subtitle: "The Quaternionic Factorial and Spectral Tools",
    sections: [
      "The quaternionic factorial operator ◎",
      "Relations to π, Γ(1/2), and spectral multipliers",
      "Concrete computations and examples",
      "Connections to zeta and Euler products"
    ],
    goal: "Problem solved: which mathematical tools let us compute inside QSG. Next step: implement and visualize those tools."
  },
  {
    number: 9,
    title: "Computational Quaternionic Geometry",
    subtitle: "Algorithms, Simulation, and Visualization",
    sections: [
      "Numerical representation of quaternions and SU(2) rotations",
      "Quaternionic FFTs and spectral filters",
      "Visualization of wells, isosurfaces, and coherence fields",
      "Python and Mathematica toolkits for quaternionic analysis",
      "Data structures for quaternionic tensors and signals"
    ],
    goal: "Problem solved: how to simulate and visualize quaternionic geometry. Next step: connect the framework to software, physics, and engineering."
  },
  {
    number: 10,
    title: "Applications and Frontiers",
    subtitle: "From Theory to Technology",
    sections: [
      "Quaternionic signal processing and communication systems",
      "Quaternionic optics and polarization analysis",
      "Orientation tracking in robotics and navigation",
      "Quantum spectral interpretation of atomic systems",
      "Open problems: spectral packing, quaternionic prime structure, and geometric zeta fields"
    ],
    goal: "Problem solved: where the coordinate framework can be useful. Final step: leave with a disciplined map of applications and open research."
  }
];

const appendices = [
  "A: Quaternion algebra identities and proofs",
  "B: Volume and curvature formulas on S³",
  "C: Quaternionic Fourier Transform derivations",
  "D: Reference tables of spectral eigenmodes and constants"
];

export default function QuaternionicSpectralGeometryBook() {
  useEffect(() => {
    document.title = "QSG Textbook | 10 Free Chapters | RQM";

    let metaDescription = document.querySelector('meta[name="description"]');
    const originalContent = metaDescription?.getAttribute('content') || '';

    if (metaDescription) {
      metaDescription.setAttribute('content', 'A 10-chapter Quaternionic Spectral Geometry textbook that moves from numbers and S3 geometry to spectra, resonance, computation, and applications.');
    }

    return () => {
      if (metaDescription && originalContent) {
        metaDescription.setAttribute('content', originalContent);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Quaternionic Spectral Geometry
            </h1>
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">
              A Calculus for the 21st Century
            </h2>
            <div className="text-lg text-blue-600 mb-8">
              <p className="mb-2">University-Level Textbook</p>
              <p className="text-base text-gray-600">RQM Technologies LLC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Introduction */}
          <div className="mb-12">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4">About This Textbook</h3>
                <p className="text-blue-800 leading-relaxed mb-4">
                  This textbook teaches Quaternionic Spectral Geometry (QSG) as a coordinate framework for waves,
                  rotations, spectra, and quantum states. The course starts with numbers and geometry, then builds
                  toward motion, spectral patterns, resonance, computation, and applications.
                </p>
                <p className="text-blue-800 leading-relaxed">
                  Read it in order the first time. You do not need to memorize every formula immediately. Focus on the
                  repeated thread: number, shape, motion, spectra, resonance, computation, and application. The formula
                  sections are there to make the intuition precise.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Table of Contents */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-900 mb-8 border-b-2 border-blue-200 pb-4">
              Table of Contents
            </h3>

            <div className="space-y-6">
              {chapters.map((chapter) => {
                const chapterUrls: Record<number, string> = {
                  1: '/chapter-1-geometry-of-numbers',
                  2: '/chapter-2-quaternionic-rotation',
                  3: '/chapter-3-differential-geometry-s3',
                  4: '/chapter-4-spectral-calculus',
                  5: '/chapter-5-spectral-theory',
                  6: '/chapter-6-agqf-hub',
                  7: '/chapter-7-spectral-coherence-hub',
                  8: '/chapter-8-special-functions-hub',
                  9: '/chapter-9-computational-hub',
                  10: '/chapter-10-applications-hub'
                };

                return (
                  <Link key={chapter.number} href={chapterUrls[chapter.number]} className="block">
                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <h4 className="text-xl font-bold text-blue-800 mb-2 hover:text-blue-900">
                        Chapter {chapter.number} — {chapter.title}
                      </h4>
                      <h5 className="text-lg font-semibold text-blue-600 mb-4 italic">
                        {chapter.subtitle}
                      </h5>

                      <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                        {chapter.sections.map((section, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">•</span>
                            <span className="leading-relaxed">{section}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-4">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Goal:</span> {chapter.goal}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* Appendices */}
              <div>
                <h4 className="text-xl font-bold text-green-800 mb-4">
                  Appendices
                </h4>
                <div className="bg-green-50 p-6 rounded-lg">
                  <ul className="space-y-2 text-gray-700 ml-4">
                    {appendices.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Access Information */}
          <div className="text-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Digital Textbook Access</h3>
              <p className="text-gray-700 mb-4">
                This comprehensive textbook is currently under development as part of RQM Technologies'
                educational initiative in quaternionic mathematics and spectral geometry.
              </p>
              <p className="text-sm text-gray-600">
                For academic access and collaboration inquiries: <strong>contact@rqmtechnologies.com</strong>
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
