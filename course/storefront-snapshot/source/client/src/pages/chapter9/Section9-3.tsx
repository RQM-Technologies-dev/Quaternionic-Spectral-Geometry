import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section9_3() {
  useEffect(() => {
    document.title = "Section 9.3: Visualization of Resonance Wells | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Learn techniques for visualizing AGQF resonance wells, coherence fields, and quaternionic structures using interactive 3D representations.";
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
        { label: "Section 9.3" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 9 · Section 9.3</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Visualization of Resonance Wells
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Making the invisible geometry visible
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Mathematics written on a page is like music written in a score—it captures the structure but
              not the experience. When we visualize quaternionic geometry, the abstract resonance wells of
              the AGQF become landscapes we can explore, coherence fields become flowing colors, and the
              hidden structure of <InlineMath math="S^3 \times \mathbb{R}" /> reveals itself to our eyes.
            </p>

            <p>
              This section presents practical techniques for visualizing quaternionic structures, from simple
              2D projections to interactive 3D environments that let you "walk through" the resonance landscape.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do we see a quaternionic computation well enough to debug it?"
              plainLanguageSetup="Section 9.2 produced spectra. Visualization turns those arrays into diagnostics: wells, barriers, coherence regions, projection artifacts, and numerical instability become visible."
              formulaRecap={
                <>
                  <PrettyBlockMath math="U(r)=-\beta\log\left(\sin^m\left(\frac{\pi r^2}{2}\right)+\delta\right)" />
                  <p>
                    The plotted potential should show barrier and well structure. Visual inspection helps confirm the formula, parameter choices, and sampling resolution.
                  </p>
                </>
              }
              checkpoint="What should a useful QSG visualization help diagnose?"
              revealAnswer="It should reveal whether the computation preserves expected structure: unit norms, well locations, coherence regions, and smooth transitions."
              finalTakeaway="Visualization is a numerical QA tool, not just an illustration."
              nextStep="Section 9.4 packages these computations into reproducible Python and Mathematica workflows."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Visualizing the AGQF Potential</h2>

            <p>
              The AGQF anchor potential from Chapter 6 takes the form:
            </p>

            <div className="overflow-x-auto my-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)' }}>
              <PrettyBlockMath math="U(r) = -\beta \log\left(\sin^m\left(\frac{\pi r^2}{2}\right) + \delta\right)" />
            </div>

            <p>
              This creates a radial potential landscape with wells at specific positions. Here's how to
              visualize it effectively:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

def agqf_potential(r, m=2, beta=1.0, delta=0.01):
    """Compute AGQF anchor potential.

    Args:
        r: Radial coordinate (can be array)
        m: Exponent parameter
        beta: Depth parameter
        delta: Regularization offset
    Returns:
        Potential values U(r)
    """
    sin_term = np.sin(np.pi * r**2 / 2)**m
    return -beta * np.log(sin_term + delta)

def plot_radial_potential(m=2, beta=1.0, delta=0.01, r_max=3.0):
    """Plot 1D radial cross-section of potential."""
    r = np.linspace(0.01, r_max, 500)
    U = agqf_potential(r, m, beta, delta)

    plt.figure(figsize=(10, 6))
    plt.plot(r, U, 'b-', linewidth=2)

    # Mark well positions (where sin(πr²/2) = 0)
    wells = np.sqrt(np.arange(1, int(r_max**2)+1) * 2)
    wells = wells[wells < r_max]
    for w in wells:
        plt.axvline(w, color='r', linestyle='--', alpha=0.5)
        plt.annotate(f'n={int(w**2/2):.0f}', (w, plt.ylim()[0]+0.5))

    plt.xlabel('Radial coordinate r')
    plt.ylabel('Potential U(r)')
    plt.title('AGQF Resonance Well Structure')
    plt.grid(True, alpha=0.3)
    plt.show()

def plot_2d_potential_surface(m=2, beta=1.0, delta=0.01, extent=3.0):
    """Create 2D heatmap of potential in x-y plane."""
    x = np.linspace(-extent, extent, 300)
    y = np.linspace(-extent, extent, 300)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt(X**2 + Y**2)

    U = agqf_potential(R, m, beta, delta)

    plt.figure(figsize=(10, 8))
    plt.contourf(X, Y, U, levels=50, cmap='viridis')
    plt.colorbar(label='Potential U')
    plt.contour(X, Y, U, levels=20, colors='white', alpha=0.3)
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('AGQF Potential Landscape (2D slice)')
    plt.axis('equal')
    plt.show()`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Visualization Insight</p>
              <p className="text-gray-700">
                The concentric rings of the potential landscape aren't arbitrary—they mark the quantized
                positions where <InlineMath math="\sin(\pi r^2/2) = 0" />. These are the anchor wells,
                the stable configurations where quantum states naturally settle. Color gradients (like
                viridis) reveal the depth structure at a glance.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>3D Isosurface Visualization</h2>

            <p>
              For truly immersive visualization, we can render isosurfaces—surfaces where the potential
              equals a constant value. These form nested shells like the layers of an onion:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`from mpl_toolkits.mplot3d import Axes3D
from skimage import measure

def plot_3d_isosurfaces(m=2, beta=1.0, delta=0.01, grid_size=50):
    """Render 3D isosurfaces of the AGQF potential."""
    # Create 3D grid
    extent = 2.5
    x = np.linspace(-extent, extent, grid_size)
    y = np.linspace(-extent, extent, grid_size)
    z = np.linspace(-extent, extent, grid_size)
    X, Y, Z = np.meshgrid(x, y, z, indexing='ij')
    R = np.sqrt(X**2 + Y**2 + Z**2)

    # Compute potential
    U = agqf_potential(R, m, beta, delta)

    # Select isosurface levels
    levels = np.linspace(U.min()*0.3, U.max()*0.7, 4)

    fig = plt.figure(figsize=(12, 10))
    ax = fig.add_subplot(111, projection='3d')

    colors = ['blue', 'cyan', 'yellow', 'red']
    alphas = [0.3, 0.4, 0.5, 0.6]

    for level, color, alpha in zip(levels, colors, alphas):
        try:
            verts, faces, _, _ = measure.marching_cubes(U, level)
            # Scale vertices to actual coordinates
            verts = verts / grid_size * 2 * extent - extent
            ax.plot_trisurf(verts[:, 0], verts[:, 1], faces, verts[:, 2],
                           color=color, alpha=alpha, linewidth=0)
        except:
            pass

    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_title('AGQF Potential Isosurfaces')
    plt.show()`}</code>
            </pre>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Coherence Field Visualization</h2>

            <p>
              The coherence measure <InlineMath math="\mathcal{C}(q)" /> from Chapter 7 can be visualized
              as a flowing field, showing where quantum states maintain phase alignment:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`def coherence_field(x, y, kappa=1.0, t=0):
    """Compute local coherence measure for visualization.

    Args:
        x, y: Coordinate arrays
        kappa: Coherence decay parameter
        t: Time for animation
    Returns:
        Coherence values at each point
    """
    r = np.sqrt(x**2 + y**2)
    theta = np.arctan2(y, x)

    # Coherence peaks at anchor wells, decays between them
    well_contribution = np.zeros_like(r)
    for n in range(1, 5):
        r_n = np.sqrt(2 * n)  # Well positions
        well_contribution += np.exp(-kappa * (r - r_n)**2)

    # Add rotational phase
    phase = np.cos(3*theta - t)

    return well_contribution * (0.5 + 0.5*phase)

def animate_coherence(frames=60):
    """Create animated coherence field."""
    from matplotlib.animation import FuncAnimation

    fig, ax = plt.subplots(figsize=(10, 10))
    x = np.linspace(-4, 4, 200)
    y = np.linspace(-4, 4, 200)
    X, Y = np.meshgrid(x, y)

    def update(frame):
        ax.clear()
        t = 2 * np.pi * frame / frames
        C = coherence_field(X, Y, t=t)
        ax.contourf(X, Y, C, levels=30, cmap='plasma')
        ax.set_title(f'Coherence Field (t = {t:.2f})')
        ax.axis('equal')
        return ax

    anim = FuncAnimation(fig, update, frames=frames, interval=50)
    return anim`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Interactive 3D in the Browser</p>
              <p className="text-gray-700">
                For web-based visualizations, Three.js provides powerful WebGL rendering. The code structure
                for a Three.js quaternionic visualizer includes: (1) Scene setup with camera and controls,
                (2) Mesh generation from potential isosurfaces, (3) Shader-based coloring for coherence fields,
                and (4) Animation loop for time evolution. See our live demos in the Tools Hub for examples.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Stereographic Projection of S³</h2>

            <p>
              Since <InlineMath math="S^3" /> is four-dimensional, we cannot visualize it directly.
              Stereographic projection maps points from <InlineMath math="S^3" /> to <InlineMath math="\mathbb{R}^3" />,
              allowing us to see the structure:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`def stereographic_project(q):
    """Project unit quaternion from S³ to R³.

    Projects from (w, x, y, z) with |q|=1 to (X, Y, Z) in R³.
    Uses north pole projection: excludes q = (1, 0, 0, 0).

    Args:
        q: Unit quaternion [w, x, y, z]
    Returns:
        3D point [X, Y, Z]
    """
    w, x, y, z = q
    denom = 1 - w + 1e-10  # Avoid division by zero
    return np.array([x/denom, y/denom, z/denom])

def visualize_s3_sample(n_points=1000):
    """Visualize random S³ sample via stereographic projection."""
    fig = plt.figure(figsize=(12, 10))
    ax = fig.add_subplot(111, projection='3d')

    # Sample random unit quaternions
    for _ in range(n_points):
        q = np.random.randn(4)
        q = q / np.linalg.norm(q)

        # Project to R³
        p = stereographic_project(q)

        # Color by original w coordinate
        color = plt.cm.coolwarm((q[0] + 1) / 2)
        ax.scatter(*p, c=[color], s=5, alpha=0.5)

    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_title('S³ via Stereographic Projection')
    plt.show()`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                Visualization transforms abstract quaternionic structures into intuitive geometric landscapes.
                When we see resonance wells as valleys and coherence as flowing color, the mathematics becomes
                physical intuition. This visual understanding accelerates both learning and research in QSG.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarkCompleteButton id="section-9-3" type="section" />

        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-9/section-9-2" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Previous: Section 9.2
          </Link>

          <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter 9 Hub
          </Link>

          <Link href="/chapter-9/section-9-4" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-next-section">
            Next: Section 9.4
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
