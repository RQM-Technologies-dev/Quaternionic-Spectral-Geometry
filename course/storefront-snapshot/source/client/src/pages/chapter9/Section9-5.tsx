import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { InlineMath } from 'react-katex';
import { PrettyBlockMath } from "@/components/math/PrettyMath";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import QSGSectionTeachingBlock from "@/components/QSGSectionTeachingBlock";

export default function Section9_5() {
  useEffect(() => {
    document.title = "Section 9.5: Large-Scale Quaternionic Tensor Fields | QSG Textbook";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Master data structures and computational strategies for handling massive quaternionic tensor fields efficiently in scientific computing.";
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
        { label: "Section 9.5" }
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
            <div className="text-white/70 text-sm mb-2">Chapter 9 · Section 9.5</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Large-Scale Quaternionic Tensor Fields
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Scaling computation to massive datasets
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">

            <p>
              Real-world applications of Quaternionic Spectral Geometry often involve massive datasets:
              climate simulations with orientation fields at millions of grid points, quantum chemistry
              with quaternionic wavefunctions on fine meshes, or machine learning models operating on
              3D rotational data. This section addresses the computational challenges of working at scale.
            </p>

            <QSGSectionTeachingBlock
              learnerQuestion="How do we keep QSG computations stable and practical at scale?"
              plainLanguageSetup="Section 9.4 assembled the software tools. Scaling those tools requires engineering choices: memory layout, chunking, parallelism, and diagnostic checks that catch drift before results are trusted."
              formulaRecap={
                <>
                  <PrettyBlockMath math="\mathrm{AoS}:(n_x,n_y,n_z,4),\qquad \mathrm{SoA}:(4,n_x,n_y,n_z)" />
                  <p>
                    AoS keeps each quaternion together. SoA keeps each component together. The right choice depends on the dominant operation.
                  </p>
                </>
              }
              checkpoint="What is the core tradeoff between AoS and SoA layouts?"
              revealAnswer="AoS is convenient for per-quaternion operations like multiplication; SoA is often faster for component-wise filtering and vectorized array operations."
              finalTakeaway="Computational QSG needs numerical discipline: layout, chunking, normalization, and visualization all affect correctness."
              nextStep="Chapter 10 connects these computational tools to applications and product workflows."
            />

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Data Structures for Quaternionic Tensors</h2>

            <p>
              A quaternionic tensor field assigns a quaternion to each point in some domain. For a 3D
              spatial grid, this means storing four numbers at each of potentially billions of points.
              The choice of data layout significantly impacts performance.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4" style={{ color: '#2d5a69' }}>Array-of-Structures vs Structure-of-Arrays</h3>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`import numpy as np

# Array-of-Structures (AoS): each quaternion is contiguous
# Shape: (nx, ny, nz, 4) - good for per-point operations
aos_field = np.zeros((256, 256, 256, 4), dtype=np.float32)

# Structure-of-Arrays (SoA): each component is contiguous
# Shape: (4, nx, ny, nz) - good for component-wise operations
soa_field = np.zeros((4, 256, 256, 256), dtype=np.float32)

# Memory layout matters for cache efficiency!
# AoS: q[i,j,k] gives all 4 components together
# SoA: component w,x,y,z each in separate contiguous arrays

def benchmark_layouts():
    """Compare performance of different memory layouts."""
    import time

    nx, ny, nz = 200, 200, 200

    # AoS layout
    aos = np.random.randn(nx, ny, nz, 4).astype(np.float32)

    # SoA layout
    soa = np.random.randn(4, nx, ny, nz).astype(np.float32)

    # Test: compute quaternion norms

    # AoS version
    t0 = time.time()
    norms_aos = np.linalg.norm(aos, axis=-1)
    t_aos = time.time() - t0

    # SoA version
    t0 = time.time()
    norms_soa = np.sqrt(soa[0]**2 + soa[1]**2 + soa[2]**2 + soa[3]**2)
    t_soa = time.time() - t0

    print(f"AoS time: {t_aos:.4f}s, SoA time: {t_soa:.4f}s")
    print(f"Speedup: {t_aos/t_soa:.2f}x")`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Layout Choice Rule</p>
              <p className="text-gray-700">
                Use <strong>AoS</strong> when operations typically access all four components of each quaternion
                together (rotation, multiplication). Use <strong>SoA</strong> when operations are component-wise
                (norms, filtering individual components). Many modern libraries support views that let you
                switch perspectives without copying data.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Chunked Processing for Memory Efficiency</h2>

            <p>
              When datasets exceed available working memory, process in chunks that fit comfortably:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`import numpy as np

def process_large_field_chunked(input_file, output_file,
                                 chunk_size=64, processor=None):
    """Process a large quaternionic field in chunks.

    Args:
        input_file: Path to input .npy or memory-mapped file
        output_file: Path for output
        chunk_size: Number of slices to process at once
        processor: Function to apply to each chunk
    """
    # Memory-map the input (doesn't load entire file)
    data = np.load(input_file, mmap_mode='r')
    nx, ny, nz, _ = data.shape

    # Create output file
    output = np.lib.format.open_memmap(
        output_file, mode='w+',
        dtype=data.dtype, shape=data.shape
    )

    # Process in chunks along z-axis
    for z_start in range(0, nz, chunk_size):
        z_end = min(z_start + chunk_size, nz)

        # Load chunk into memory
        chunk = np.array(data[:, :, z_start:z_end, :])

        # Process
        if processor:
            chunk = processor(chunk)

        # Write result
        output[:, :, z_start:z_end, :] = chunk

        print(f"Processed slices {z_start}-{z_end} of {nz}")

    # Flush to disk
    del output

def example_processor(chunk):
    """Example: normalize all quaternions in chunk."""
    norms = np.linalg.norm(chunk, axis=-1, keepdims=True)
    return chunk / (norms + 1e-10)`}</code>
            </pre>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>GPU Acceleration</h2>

            <p>
              For maximum performance, GPU computing offers massive parallelism. Here's a CUDA-accelerated
              quaternion field processor using CuPy:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`import cupy as cp

def quaternion_multiply_gpu(q1, q2):
    """GPU-accelerated quaternion multiplication.

    Args:
        q1, q2: Quaternion arrays on GPU, shape (..., 4)
    Returns:
        Product q1 * q2 on GPU
    """
    w1, x1, y1, z1 = q1[..., 0], q1[..., 1], q1[..., 2], q1[..., 3]
    w2, x2, y2, z2 = q2[..., 0], q2[..., 1], q2[..., 2], q2[..., 3]

    result = cp.empty_like(q1)
    result[..., 0] = w1*w2 - x1*x2 - y1*y2 - z1*z2
    result[..., 1] = w1*x2 + x1*w2 + y1*z2 - z1*y2
    result[..., 2] = w1*y2 - x1*z2 + y1*w2 + z1*x2
    result[..., 3] = w1*z2 + x1*y2 - y1*x2 + z1*w2

    return result

def agqf_potential_gpu(field, m=2, beta=1.0, delta=0.01):
    """Compute AGQF potential on GPU for entire field.

    Args:
        field: Quaternion field on GPU, shape (nx, ny, nz, 4)
    Returns:
        Potential values on GPU, shape (nx, ny, nz)
    """
    # Compute quaternion magnitude
    r = cp.linalg.norm(field, axis=-1)

    # AGQF potential
    sin_term = cp.sin(cp.pi * r**2 / 2)**m
    U = -beta * cp.log(sin_term + delta)

    return U

def gpu_workflow_example():
    """Example: process large field on GPU."""
    # Create test field on GPU
    nx, ny, nz = 512, 512, 512
    field_gpu = cp.random.randn(nx, ny, nz, 4, dtype=cp.float32)

    # Normalize to unit quaternions
    norms = cp.linalg.norm(field_gpu, axis=-1, keepdims=True)
    field_gpu = field_gpu / norms

    # Compute potential
    import time
    t0 = time.time()
    U = agqf_potential_gpu(field_gpu)
    cp.cuda.Device().synchronize()  # Wait for GPU
    t_gpu = time.time() - t0

    print(f"Computed {nx*ny*nz:,} potentials in {t_gpu:.3f}s")
    print(f"Throughput: {nx*ny*nz/t_gpu/1e6:.1f} M points/sec")

    # Transfer result back to CPU if needed
    U_cpu = cp.asnumpy(U)
    return U_cpu`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(45, 90, 105, 0.1)', borderLeft: '4px solid #2d5a69' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>GPU Performance Tips</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Minimize CPU-GPU data transfers—keep data on GPU as long as possible</li>
                <li>Use float32 instead of float64 for 2x memory and compute throughput</li>
                <li>Batch operations—small individual operations have high overhead</li>
                <li>Consider using PyTorch or JAX for automatic differentiation support</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>Parallel and Distributed Computing</h2>

            <p>
              For truly massive problems, distribute computation across multiple machines:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`from mpi4py import MPI
import numpy as np

def distributed_coherence_computation():
    """Compute coherence field across MPI ranks."""
    comm = MPI.COMM_WORLD
    rank = comm.Get_rank()
    size = comm.Get_size()

    # Global problem size
    N_total = 1000

    # Each rank handles a portion
    chunk_size = N_total // size
    start = rank * chunk_size
    end = start + chunk_size if rank < size - 1 else N_total

    # Local computation
    local_u = np.linspace(start/N_total * 10, end/N_total * 10,
                          end - start)
    local_coherence = compute_coherence_local(local_u)

    # Gather results
    all_coherence = comm.gather(local_coherence, root=0)

    if rank == 0:
        # Combine results
        full_coherence = np.concatenate(all_coherence)
        print(f"Computed coherence for {len(full_coherence)} points")
        return full_coherence
    return None

def compute_coherence_local(u_values):
    """Compute local coherence values."""
    from scipy.special import gamma

    s = 0.5 + 1j * u_values
    gamma_vals = gamma(s)
    coherence = np.abs(gamma_vals)**2
    return coherence`}</code>
            </pre>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#1a3b47' }}>File Formats for Large Quaternionic Data</h2>

            <p>
              Choose appropriate file formats based on your needs:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm">
              <code>{`import numpy as np
import h5py

def save_quaternion_field_hdf5(field, filename, metadata=None):
    """Save quaternion field to HDF5 with compression.

    HDF5 advantages:
    - Compression reduces file size 5-10x for typical fields
    - Partial I/O: read only needed chunks
    - Self-describing: metadata stored with data
    - Cross-platform and widely supported
    """
    with h5py.File(filename, 'w') as f:
        # Create compressed dataset
        dset = f.create_dataset(
            'quaternion_field',
            data=field,
            compression='gzip',
            compression_opts=4,  # 1-9, higher = smaller but slower
            chunks=True  # Enable chunked storage
        )

        # Add metadata
        dset.attrs['dtype'] = str(field.dtype)
        dset.attrs['shape'] = field.shape

        if metadata:
            for key, value in metadata.items():
                dset.attrs[key] = value

def load_quaternion_field_hdf5(filename, slice_spec=None):
    """Load quaternion field from HDF5.

    Args:
        filename: Path to HDF5 file
        slice_spec: Optional tuple for partial loading
                   e.g., (slice(0,100), slice(0,100), slice(None), slice(None))
    """
    with h5py.File(filename, 'r') as f:
        dset = f['quaternion_field']

        if slice_spec:
            # Load only requested portion
            return dset[slice_spec]
        else:
            return dset[:]

# Example usage
field = np.random.randn(256, 256, 256, 4).astype(np.float32)

save_quaternion_field_hdf5(field, 'qfield.h5',
    metadata={'description': 'AGQF resonance simulation',
              'parameters': 'm=2, beta=1.0'})

# Load just a 2D slice for visualization
slice_2d = load_quaternion_field_hdf5('qfield.h5',
    slice_spec=(slice(None), slice(None), 128, slice(None)))`}</code>
            </pre>

            <div className="p-6 rounded-lg my-8" style={{ backgroundColor: 'rgba(77, 154, 175, 0.1)', borderLeft: '4px solid #3d7a8c' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a3b47' }}>Key Insight</p>
              <p className="text-gray-700">
                Large-scale quaternionic computation requires thinking carefully about memory layout,
                I/O patterns, and parallelization strategy. The techniques in this section—chunked processing,
                GPU acceleration, and distributed computing—enable QSG algorithms to scale from laptop
                experiments to supercomputer simulations.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarkCompleteButton id="section-9-5" type="section" />

        <div className="flex justify-between items-center pt-8 border-t-2" style={{ borderColor: '#3d7a8c' }}>
          <Link href="/chapter-9/section-9-4" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-prev-section">
            <ArrowLeft className="w-4 h-4" />
            Previous: Section 9.4
          </Link>

          <Link href="/chapter-9-computational-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-chapter-hub">
            <Home className="w-4 h-4" />
            Chapter 9 Hub
          </Link>

          <Link href="/chapter-10-applications-hub" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors" data-testid="link-next-chapter">
            Next: Chapter 10
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
