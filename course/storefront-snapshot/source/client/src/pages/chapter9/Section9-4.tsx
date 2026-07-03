import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section9_4() {
  useEffect(() => {
    document.title = "Section 9.4: Python and Mathematica Environments | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Practical code examples and workflows for quaternionic computation in Python and Mathematica, with libraries and implementation tips.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      <Breadcrumb items={[
        { label: "Learn", href: "/learn" },
        { label: "Chapter 9", href: "/chapter-9-computational-hub" },
        { label: "Section 9.4" }
      ]} />

      <section className="relative overflow-hidden pt-16" style={{
        background: 'linear-gradient(to right, #1a3b47, #2d5a69, #3d7a8c, #4d9aaf)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(77, 154, 175, 0.4) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6">
            <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm" data-testid="link-back-to-chapter">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter 9
            </Link>
          </div>

          <div className="text-center">
            <div className="text-white/70 text-sm mb-2">Chapter 9 · Section 9.4</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Python and Mathematica Environments
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Practical tools for quaternionic computation
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Quaternionic Spectral Geometry lives at the intersection of pure mathematics and practical
              computation. To work effectively in this field, you need tools that can handle symbolic
              manipulation, numerical simulation, and visualization. This section provides a practical
              guide to setting up and using both Python and Mathematica for QSG work.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="What software stack supports reliable QSG experiments?"
              plainLanguageSetup="Section 9.3 emphasized visualization as QA. Now we choose tools for implementation: numerical libraries for arrays and rotations, symbolic tools for formulas, and plotting tools for diagnostics."
              formulaRecap={
                <>
                  <PrettyBlockMath math="q=(w,x,y,z),\qquad q_{\mathrm{unit}}=\frac{q}{|q|}" />
                  <p>
                    Most computational workflows repeatedly store, multiply, normalize, transform, and visualize these four-component states.
                  </p>
                </>
              }
              checkpoint="Why include both numerical and symbolic tools?"
              revealAnswer="Numerical tools simulate and visualize large examples; symbolic tools help verify formulas and derive smaller exact cases."
              finalTakeaway="A practical QSG workflow combines stable quaternion libraries, spectral routines, symbolic checks, and visualization."
              nextStep="Section 9.5 addresses scale: memory layout, chunking, acceleration, and deployment concerns."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Python Environment Setup</h2>

            <p>
              Python offers an excellent ecosystem for quaternionic computation, combining ease of use
              with powerful libraries. Here's a recommended setup:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`# requirements.txt for QSG computation
numpy>=1.21.0          # Core numerical computing
scipy>=1.7.0           # Scientific computing (rotations, FFT)
matplotlib>=3.4.0      # Visualization
plotly>=5.0.0          # Interactive 3D plots
sympy>=1.9             # Symbolic mathematics
numba>=0.54.0          # JIT compilation for speed
quaternion>=2022.4     # Neil Schaffer's quaternion library
pyquaternion>=0.9.9    # Alternative quaternion implementation

# Installation command:
# pip install numpy scipy matplotlib plotly sympy numba numpy-quaternion pyquaternion`}</code>
            </pre>

            <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#2d5a69' }}>The numpy-quaternion Library</h3>

            <p>
              The <code>numpy-quaternion</code> library provides fast, NumPy-integrated quaternion operations:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`import numpy as np
import quaternion

# Create quaternions
q1 = quaternion.quaternion(1, 0, 0, 0)  # Identity: w=1, x=y=z=0
q2 = quaternion.from_rotation_vector([0, 0, np.pi/2])  # 90° about z

# Quaternion multiplication
q3 = q1 * q2
print(f"q1 * q2 = {q3}")

# Create array of quaternions
orientations = quaternion.from_float_array(
    np.random.randn(1000, 4)  # 1000 random quaternions
)
orientations = orientations / np.abs(orientations)  # Normalize

# Rotate a vector using all orientations at once
v = np.array([1, 0, 0])
v_quat = quaternion.quaternion(0, *v)
rotated = orientations * v_quat * np.conjugate(orientations)
rotated_vectors = quaternion.as_float_array(rotated)[:, 1:4]

print(f"Rotated {len(rotated_vectors)} vectors")`}</code>
            </pre>

            <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#2d5a69' }}>SciPy Rotation Module</h3>

            <p>
              For rotation-focused work, SciPy's spatial.transform module is highly optimized:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`from scipy.spatial.transform import Rotation

# Create rotation from various representations
r_euler = Rotation.from_euler('xyz', [30, 45, 60], degrees=True)
r_quat = Rotation.from_quat([0, 0, np.sin(np.pi/4), np.cos(np.pi/4)])
r_rotvec = Rotation.from_rotvec([0, 0, np.pi/2])

# Convert between representations
print(f"Quaternion: {r_euler.as_quat()}")  # [x, y, z, w] convention!
print(f"Rotation matrix:\n{r_euler.as_matrix()}")
print(f"Euler angles: {r_euler.as_euler('xyz', degrees=True)}")

# Compose rotations
r_combined = r_euler * r_quat

# Random rotations for Monte Carlo
random_rotations = Rotation.random(num=10000)

# Apply to vectors
vectors = np.array([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
rotated = r_euler.apply(vectors)
print(f"Rotated axes:\n{rotated}")`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Convention Warning</p>
              <p className="text-gray-700">
                SciPy uses the convention <code>[x, y, z, w]</code> for quaternions, with the scalar last.
                Many other libraries (including numpy-quaternion) use <code>[w, x, y, z]</code> with scalar
                first. Always check and convert when mixing libraries!
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Mathematica for Symbolic Work</h2>

            <p>
              Mathematica excels at symbolic manipulation and exact computation. It has built-in
              quaternion support and powerful visualization:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`(* Mathematica code for quaternionic computation *)

(* Basic quaternion operations *)
q1 = Quaternion[1, 2, 3, 4];
q2 = Quaternion[0, 1, 0, 0];

(* Multiplication *)
q1 ** q2

(* Conjugate and norm *)
Conjugate[q1]
Abs[q1]

(* Create rotation quaternion *)
RotationQuaternion[theta_, axis_] :=
  Quaternion[Cos[theta/2], Sin[theta/2] axis[[1]],
             Sin[theta/2] axis[[2]], Sin[theta/2] axis[[3]]]

(* AGQF computation - symbolic form *)
AGQF[u_, m_:2, beta_:1, delta_:0.01] :=
  -beta Log[Sin[Pi (1/4 + I u)/2]^m + delta]

(* Plot the real and imaginary parts *)
Plot[{Re[AGQF[u]], Im[AGQF[u]]}, {u, -5, 5},
  PlotLegends -> {"Re[AGQF]", "Im[AGQF]"},
  PlotStyle -> {Blue, Orange},
  AxesLabel -> {"u", "AGQF"},
  PlotRange -> All]

(* 3D visualization of potential *)
Plot3D[
  Re[-Log[Sin[Pi (x^2 + y^2)/2]^2 + 0.01]],
  {x, -2, 2}, {y, -2, 2},
  PlotRange -> {-5, 5},
  ColorFunction -> "TemperatureMap",
  PlotLabel -> "AGQF Potential Landscape"
]`}</code>
            </pre>

            <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#2d5a69' }}>Gamma Function on Critical Line</h3>

            <p>
              Mathematica can compute the Gamma function along the critical line exactly:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`(* Gamma function on the critical line s = 1/2 + it *)
GammaCritical[t_] := Gamma[1/2 + I t]

(* Quaternionic factorial representation *)
QuaternionicFactorial[u_, I_] :=
  Re[Gamma[3/2 + I u]] + I Im[Gamma[3/2 + I u]]

(* Plot magnitude and phase *)
ParametricPlot[
  {Re[Gamma[1/2 + I t]], Im[Gamma[1/2 + I t]]},
  {t, -20, 20},
  PlotStyle -> ColorData["Rainbow"],
  ColorFunction -> (Hue[#3/40 + 0.5] &),
  ColorFunctionScaling -> False,
  PlotLabel -> "Gamma Function Spiral on Critical Line"
]

(* Anchor well positions *)
AnchorWells = Table[Sqrt[2 k + 1], {k, 0, 10}];
ListPlot[AnchorWells, PlotStyle -> Red,
  PlotLabel -> "Anchor Well Positions"]`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>When to Use Which</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Python:</strong> Large-scale numerical simulations, machine learning integration,
                    production code, web visualizations</li>
                <li><strong>Mathematica:</strong> Symbolic derivations, exact solutions, publication-quality
                    graphics, exploring mathematical structure</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Practical Workflow Tips</h2>

            <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#2d5a69' }}>1. Start Symbolic, Go Numerical</h3>

            <p>
              Derive formulas symbolically in Mathematica, then implement numerically in Python:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`(* In Mathematica: derive symbolic result *)
coherenceIntegral = Integrate[
  Exp[-kappa (r - r0)^2] Sin[n theta]^2 r,
  {r, 0, Infinity}, {theta, 0, 2 Pi},
  Assumptions -> {kappa > 0, r0 > 0, n ∈ Integers}
]
(* Result: Pi^(3/2) r0 / (2 Sqrt[kappa]) *)

# In Python: implement numerical version
def coherence_integral(kappa, r0, n_terms=100):
    """Numerical implementation of coherence integral."""
    from scipy.integrate import dblquad

    integrand = lambda theta, r: (
        np.exp(-kappa * (r - r0)**2) *
        np.sin(n_terms * theta)**2 * r
    )

    result, error = dblquad(integrand, 0, 10*r0, 0, 2*np.pi)
    return result

# Verify against symbolic formula
symbolic = np.pi**(3/2) * r0 / (2 * np.sqrt(kappa))
numerical = coherence_integral(kappa=1.0, r0=2.0)
print(f"Symbolic: {symbolic:.6f}, Numerical: {numerical:.6f}")`}</code>
            </pre>

            <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#2d5a69' }}>2. Use Numba for Performance</h3>

            <p>
              For computationally intensive loops, Numba provides near-C speed with minimal code changes:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`from numba import njit, prange

@njit(parallel=True)
def compute_coherence_field(x_grid, y_grid, kappa, wells):
    """Fast coherence field computation with Numba.

    10-100x speedup over pure Python loops.
    """
    nx, ny = x_grid.shape
    result = np.zeros((nx, ny))

    for i in prange(nx):
        for j in range(ny):
            x, y = x_grid[i, j], y_grid[i, j]
            r = np.sqrt(x*x + y*y)

            total = 0.0
            for w in wells:
                total += np.exp(-kappa * (r - w)**2)

            result[i, j] = total

    return result

# Usage
x = np.linspace(-5, 5, 500)
y = np.linspace(-5, 5, 500)
X, Y = np.meshgrid(x, y)
wells = np.sqrt(2 * np.arange(1, 10) + 1)

# First call compiles, subsequent calls are fast
C = compute_coherence_field(X, Y, 1.0, wells)`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                The right tool for the right job: Mathematica for deriving exact formulas and understanding
                structure, Python for large-scale simulation and integration with modern tools. Many researchers
                use both, deriving in one and implementing in the other.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarkCompleteButton id="section-9-4" type="section" />

        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-9/section-9-3" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Previous: Section 9.3
          </Link>

          <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter 9 Hub
          </Link>

          <Link href="/chapter-9/section-9-5" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-next-section">
            Next: Section 9.5
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
