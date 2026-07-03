import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";

export default function Chapter9ComputationalGeometry() {
  useEffect(() => {
    document.title = "Chapter 9: Computational Quaternionic Geometry | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Chapter 9 of Quaternionic Spectral Geometry textbook: Computational Quaternionic Geometry covering algorithms, simulation, and visualization of quaternionic structures.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8" data-testid="link-back-to-book">
          <ArrowLeft className="w-4 h-4" />
          Back to Table of Contents
        </Link>

        {/* Chapter Header */}
        <div className="mb-12 border-b-2 border-blue-200 pb-6">
          <div className="text-sm text-gray-500 mb-2">Chapter 9</div>
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Computational Quaternionic Geometry
          </h1>
          <h2 className="text-2xl font-semibold text-blue-700 italic">
            Algorithms, Simulation, and Visualization
          </h2>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-lg max-w-none">

          {/* Chapter Overview */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Chapter Overview</h3>
            <p className="mb-4">
              In this chapter, we bring Quaternionic Spectral Geometry (QSG) to life through computation. The goal is not only to describe quaternionic resonance mathematically, but also to simulate, visualize, and experiment with it using modern numerical tools. When theory becomes code, geometry becomes motion—and the abstract curvature of <InlineMath math="S^3 \times \mathbb{R}" /> turns into patterns of light, sound, and field coherence we can explore directly.
            </p>
            <p className="mb-4">
              This chapter therefore serves as the bridge between formal geometry and hands-on exploration. It will show how quaternionic structures can be computed efficiently, how resonance wells can be visualized, and how coherence flows across a manifold can be animated. In doing so, students learn that QSG is not an isolated theory—it is a living computational framework.
            </p>
            <p className="mb-4">We will cover:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Numerical representation of quaternions and <InlineMath math="SU(2)" /> rotations</li>
              <li>Quaternionic Fast Fourier Transforms (QFFTs) and spectral filtering</li>
              <li>Visualization of resonance wells, coherence fields, and hyperspherical structures</li>
              <li>Python and Mathematica environments for quaternionic computation</li>
              <li>Data structures and workflows for large-scale quaternionic tensor fields</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold mb-2">Goal:</p>
              <p>To make quaternionic geometry interactive—turning equations into simulations, and resonance structures into visual experience.</p>
            </div>
          </div>

          {/* Section 9.1 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">9.1 Numerical Representation of Quaternions and <InlineMath math="SU(2)" /> Rotations</h2>

            <p className="mb-4">
              Every quaternion <InlineMath math="q = a + bi + cj + dk" /> is represented in code as four real numbers. This representation can encode 3D rotations, complex waveforms, or fields in quaternionic spectral geometry. The group of unit quaternions forms <InlineMath math="S^3" />, which double-covers the rotation group <InlineMath math="SO(3)" />.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Quaternion Operations in Practice</h4>
              <p className="mb-4">
                Given <InlineMath math="q_1 = (a_1, b_1, c_1, d_1)" /> and <InlineMath math="q_2 = (a_2, b_2, c_2, d_2)" />, multiplication is defined by:
              </p>
              <PrettyBlockMath math="q_1 q_2 = (a_1a_2 - b_1b_2 - c_1c_2 - d_1d_2,\; a_1b_2 + b_1a_2 + c_1d_2 - d_1c_2,\; a_1c_2 - b_1d_2 + c_1a_2 + d_1b_2,\; a_1d_2 + b_1c_2 - c_1b_2 + d_1a_2)." />
              <p className="mb-4">
                Normalization ensures <InlineMath math="|q| = 1" />, maintaining the structure of <InlineMath math="SU(2)" /> rotations.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Intuitive Interpretation:</p>
                <p>Each quaternion represents a rotation about an axis <InlineMath math="\mathbf{u}" /> by angle <InlineMath math="2\phi" />. The four coefficients encode the cosine and sine components of that rotation, forming a minimal, numerically stable representation of 3D orientation.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">SU(2) Sampling and Uniform Coverage</h4>
              <p className="mb-4">To simulate rotational ensembles or stochastic processes, one must sample orientations uniformly over <InlineMath math="S^3" />. The method is simple:</p>
              <ol className="list-decimal ml-6 space-y-2 mb-4">
                <li>Draw a random 4D vector from a normal distribution <InlineMath math="\mathcal{N}(0, 1)" />.</li>
                <li>Normalize it to unit length.</li>
              </ol>
              <p className="mb-4">
                This produces even sampling over <InlineMath math="S^3" />, ensuring fair statistical coverage of orientation space.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Visualization Note:</p>
                <p>In a stereographic projection, such a uniform distribution appears denser near the equatorial zone of <InlineMath math="S^3" />. This distortion reflects the projection's mapping from curved to flat space.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Computational Representation</h4>
              <p className="mb-4">In Python, quaternions are often stored as arrays:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                <code>{`import numpy as np
# Quaternion: [a, b, c, d]
q = np.array([1.0, 0.0, 0.0, 0.0])  # Identity rotation`}</code>
              </pre>
              <p className="mb-4">
                A rotation of a 3D vector <InlineMath math="v = (x, y, z)" /> by quaternion <InlineMath math="q" /> is implemented as:
              </p>
              <PrettyBlockMath math="v' = qvq^{-1}," />
              <p className="mb-4">
                where multiplication uses the above rule. Libraries like <strong>NumPy</strong>, <strong>PyTorch</strong>, or <strong>SciPy Rotation</strong> can perform these efficiently.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Pedagogical Insight:</p>
                <p>By coding quaternionic multiplication, students directly experience the relationship between algebra and geometry. Multiplying two quaternions produces not a number, but a new rotation—a transformation of orientation space itself.</p>
              </div>
            </div>
          </section>

          {/* Section 9.2 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">9.2 Quaternionic FFTs and Spectral Filters</h2>

            <p className="mb-4">
              Fourier analysis generalizes naturally to quaternionic fields, providing a method to decompose quaternionic data into spatial and rotational frequency components.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Quaternionic Fourier Transform (QFFT)</h4>
              <p className="mb-4">
                For discrete quaternionic signals <InlineMath math="f_n \in \mathbb{H}" />, define the QFFT as:
              </p>
              <PrettyBlockMath math="F_k = \sum_{n=0}^{N-1} e^{-2\pi i kn/N} f_n," />
              <p className="mb-4">
                where quaternionic exponentials <InlineMath math="e^{\mathbf{u}\theta} = \cos\theta + \mathbf{u}\sin\theta" /> embed rotational structure into the spectral basis.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Conceptual Difference:</p>
                <p>In a complex FFT, frequencies are 1D oscillations along the imaginary unit <InlineMath math="i" />. In a QFFT, frequencies are multi-dimensional oscillations in orientation space—waves rotating simultaneously about the <InlineMath math="i, j, k" /> axes.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Implementing Quaternionic FFTs</h4>
              <p className="mb-4">
                In practice, the QFFT is implemented as two complex FFTs, separating even and odd imaginary components. The resulting transform retains phase and orientation, making it ideal for analyzing quaternionic signals in physics, engineering, and image processing.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Visualization Analogy:</p>
                <p>Imagine a 3D wave twisting through a medium. The QFFT decomposes this twisting into orthogonal spinning components—like decomposing a complex dance into its fundamental rhythmic steps.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Spectral Filters</h4>
              <p className="mb-4">
                Spectral filters act in quaternionic frequency space as transfer functions <InlineMath math="H(q)" />:
              </p>
              <PrettyBlockMath math="F'_k = H(q_k) F_k." />
              <p className="mb-4">Examples:</p>
              <ul className="list-disc ml-6 space-y-2 mb-4">
                <li><strong>Low-pass:</strong> removes high-frequency or high-curvature components.</li>
                <li><strong>Band-pass:</strong> isolates specific resonance wells or modes.</li>
                <li><strong>AGQF Anchor Filter:</strong> amplifies or suppresses frequencies near anchor well positions <InlineMath math="u^2 = 2k + 1" />, mirroring the quantization pattern derived in Chapter 6.</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Physical Analogy:</p>
                <p>Applying a quaternionic spectral filter is like tuning a radio receiver—not just by frequency, but by orientation in geometric space. You select which harmonic directions resonate.</p>
              </div>
            </div>
          </section>

          {/* Section 9.3 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">9.3 Visualization of Wells, Isosurfaces, and Coherence Fields</h2>

            <p className="mb-4">
              Visualization transforms quaternionic data into intuition. By mapping fields and potentials onto 3D projections of <InlineMath math="S^3" />, we can see how coherence forms and evolves.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Anchor Wells and Resonance Landscapes</h4>
              <p className="mb-4">
                The effective anchor potential <InlineMath math="U_{\text{anchor}}(u) = -\beta\log[\sin^m(\tfrac{\pi u^2}{2}) + \delta]" /> can be visualized as a series of concentric wells and barriers.
              </p>
              <ul className="list-disc ml-6 space-y-2 mb-4">
                <li>Wells represent zones of coherent resonance.</li>
                <li>Barriers mark destructive interference.</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Visualization Technique:</p>
                <p>Use isosurfaces of constant potential energy to show these wells. In Mathematica, use <code>ContourPlot3D</code>; in Python, use <code>Mayavi</code> or <code>Plotly</code>'s 3D volume rendering.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Analogy:</p>
                <p>These structures resemble rippling interference shells—like the standing waves inside a resonant cavity, except here the cavity is the quaternionic manifold itself.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Coherence Fields and Temporal Animation</h4>
              <p className="mb-4">
                The coherence field <InlineMath math="C(x_1, x_2, t) = |\langle q(x_1, t), q(x_2, t) \rangle|" /> evolves as waves of alignment and misalignment move through <InlineMath math="S^3" />.
              </p>
              <ul className="list-disc ml-6 space-y-2 mb-4">
                <li>Use brightness or color gradients to encode coherence magnitude.</li>
                <li>Animate temporal evolution to show phase locking, interference fronts, and equilibration toward resonant axes.</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Visualization Tip:</p>
                <p>A rotating color map (phase hue) combined with intensity (coherence magnitude) effectively captures quaternionic phase flow in 3D visualizations.</p>
              </div>
            </div>
          </section>

          {/* Section 9.4 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">9.4 Python and Mathematica Toolkits for Quaternionic Analysis</h2>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Python Ecosystem</h4>
              <p className="mb-4">
                Python's open-source ecosystem provides an ideal platform for practical quaternionic computation.
              </p>
              <ul className="list-disc ml-6 space-y-2 mb-4">
                <li><strong>NumPy / SciPy:</strong> Numerical backbone for quaternion arrays, FFTs, and differential operators.</li>
                <li><strong>SymPy:</strong> Symbolic algebra system capable of expanding quaternionic operators (e.g., Dirac, Laplacian).</li>
                <li><strong>Matplotlib / Plotly:</strong> 3D and animated visualizations of coherence and anchor wells.</li>
                <li><strong>PyTorch / CuPy:</strong> GPU acceleration for large-scale quaternionic tensor computations.</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Teaching Example:</p>
                <p>Using NumPy, one can simulate a quaternionic wave packet propagating through an AGQF potential, observing how coherence persists or dissipates as the wave interacts with geometric barriers.</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Mathematica Environment</h4>
              <p className="mb-4">
                Mathematica's symbolic and visualization capabilities make it ideal for exploring quaternionic functions and spectral structures interactively.
              </p>
              <ul className="list-disc ml-6 space-y-2 mb-4">
                <li><code>Quaternion[a, b, c, d]</code> objects support symbolic computation.</li>
                <li><code>RegionPlot3D</code> renders anchor potential wells as nested shells.</li>
                <li><code>Manipulate</code> enables real-time parameter exploration (e.g., varying <InlineMath math="m, \beta, \delta" />).</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Educational Benefit:</p>
                <p>Mathematica provides a bridge between visualization and algebra—students can immediately see how algebraic parameters shape resonance geometry.</p>
              </div>
            </div>
          </section>

          {/* Section 9.5 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">9.5 Data Structures for Quaternionic Tensors and Signals</h2>

            <p className="mb-4">
              Quaternionic systems often involve multi-dimensional data: fields of orientations, coherence matrices, and dynamic spinor states.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Quaternionic Tensor Representation</h4>
              <p className="mb-4">
                A quaternionic tensor of rank <InlineMath math="n" /> can be implemented as a real tensor of rank <InlineMath math="n+1" /> with four channels (scalar and three vector components). Efficient data storage and parallel computation can be achieved by grouping these components in GPU-based tensor libraries.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Example Pipeline</h4>
              <ol className="list-decimal ml-6 space-y-3 mb-4">
                <li><strong>Quaternionic Input Field:</strong> A 3D grid of quaternionic orientations or field states.</li>
                <li><strong>Spectral Transform:</strong> Apply a QFFT or quaternionic Laplace transform to access harmonic structure.</li>
                <li><strong>Anchor Filtering:</strong> Use AGQF-derived kernels to confine analysis to resonance wells.</li>
                <li><strong>Coherence Evaluation:</strong> Compute local or global coherence using <InlineMath math="|\langle q_1, q_2 \rangle|" />.</li>
                <li><strong>Visualization:</strong> Generate 3D/4D renderings of resonance fields.</li>
              </ol>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="font-semibold mb-2">Intuitive Summary:</p>
                <p>This pipeline is analogous to processing music through an equalizer: the spectral transform decomposes the geometry's harmonics, the anchor filter selects the resonant notes, and the coherence computation measures how well the system "stays in tune."</p>
              </div>
            </div>
          </section>

          {/* Section 9.6 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">9.6 Summary and Outlook</h2>

            <ul className="list-disc ml-6 space-y-3 mb-6">
              <li>Quaternionic geometry can be simulated numerically with precision using modern computational tools.</li>
              <li>QFFT algorithms extend Fourier analysis into the rotational and coherence domain.</li>
              <li>Visualization reveals the living structure of geometry—wells, shells, and flows of resonance across <InlineMath math="S^3" />.</li>
              <li>Python and Mathematica together provide both symbolic and experimental environments for QSG research.</li>
              <li>Quaternionic tensors generalize scalar and vector fields into coherent, multi-component data suitable for high-dimensional physics and AI applications.</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold mb-2">Takeaway:</p>
              <p>Computational Quaternionic Geometry transforms abstract resonance theory into something tangible. By simulating quaternionic coherence, we begin to <em>see</em> the geometry of quantization—the curvature of energy, the symmetry of phase, and the harmonics of space itself.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold mb-2">Next Chapter Preview:</p>
              <p>Chapter 10 will explore <strong>Applications and Frontiers</strong>, demonstrating how quaternionic spectral computation applies to real-world domains such as quantum communication, sensing, signal processing, and resonant metrology.</p>
            </div>
          </section>

        </div>

        {/* Chapter Navigation */}
        <div className="mt-12 pt-6 border-t-2 border-blue-200 flex justify-between items-center">
          <Link href="/chapter-8-spectral-operators" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-previous-chapter">
            <ArrowLeft className="w-4 h-4" />
            Previous: Chapter 8
          </Link>
          <Link href="/quaternionic-spectral-geometry-book" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-back-to-book-bottom">
            <ArrowLeft className="w-4 h-4" />
            Back to Table of Contents
          </Link>
          <Link href="/chapter-10-applications" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors" data-testid="link-next-chapter">
            Next: Chapter 10
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
