// Chapter metadata for educational features

export interface ChapterMetadata {
  id: string;
  title: string;
  readingTimeMinutes: number;
  learningObjectives: string[];
  keyTakeaways: string[];
  prerequisites?: string[];
}

export const chapterMetadata: Record<string, ChapterMetadata> = {
  'chapter-1': {
    id: 'chapter-1',
    title: 'The Geometry of Numbers',
    readingTimeMinutes: 25,
    learningObjectives: [
      'Understand the historical progression from real to complex to quaternionic numbers',
      'Master quaternion basis elements and non-commutativity',
      'Visualize unit quaternions as points on the 3-sphere S³',
      'Apply quaternion conjugation and compute norms',
      'Recognize S³ as the natural space for representing 3D rotations'
    ],
    keyTakeaways: [
      'Quaternions extend complex numbers to 4D with three imaginary units i, j, k',
      'Unit quaternions form the 3-sphere S³, which double-covers SO(3)',
      'Conjugation qvq⁻¹ rotates vectors while preserving norms',
      'Non-commutativity (ij ≠ ji) reflects the non-commutativity of rotations',
      'S³ provides singularity-free kinematics unlike Euler angles'
    ],
    prerequisites: ['Multivariable calculus', 'Linear algebra', 'Basic topology']
  },
  'chapter-2': {
    id: 'chapter-2',
    title: 'The Quaternionic Rotation Form',
    readingTimeMinutes: 30,
    learningObjectives: [
      'Derive the quaternionic rotation form q = cos φ + u sin φ',
      'Understand the connection between SU(2) and SO(3)',
      'Explain the 4π rotation identity and double cover',
      'Compute geodesics on S³',
      'Visualize the Hopf fibration and its geometric significance'
    ],
    keyTakeaways: [
      'Every unit quaternion encodes a rotation: q = cos(φ) + u sin(φ)',
      'Physical rotation angle is 2φ (half-angle parameterization)',
      'S³ → SO(3) is a 2:1 covering map (spinor double cover)',
      'Geodesics on S³ are great circles (constant-axis rotations)',
      'Hopf fibration reveals S³\'s beautiful circle bundle structure'
    ],
    prerequisites: ['Chapter 1: The Geometry of Numbers']
  },
  'chapter-3': {
    id: 'chapter-3',
    title: 'Differential Geometry on S³',
    readingTimeMinutes: 35,
    learningObjectives: [
      'Construct coordinate charts and the atlas for S³ as a manifold',
      'Apply the bi-invariant metric on S³ as a Lie group',
      'Compute connection forms and curvature tensors',
      'Calculate the Laplacian operator on S³',
      'Understand parallel transport and geodesic deviation'
    ],
    keyTakeaways: [
      'S³ is a Riemannian manifold with constant sectional curvature',
      'The bi-invariant metric makes S³ a Lie group',
      'Christoffel symbols encode how tangent spaces change',
      'Curvature is constant and positive on S³',
      'Laplacian on S³ governs spectral decomposition'
    ],
    prerequisites: ['Chapter 1: The Geometry of Numbers', 'Chapter 2: The Quaternionic Rotation Form']
  },
  'chapter-4': {
    id: 'chapter-4',
    title: 'Quaternionic Calculus',
    readingTimeMinutes: 40,
    learningObjectives: [
      'Define left and right derivatives for non-commutative quaternions',
      'Understand slice regular functions and their properties',
      'Apply quaternionic Cauchy integral formula',
      'Compute gradient, divergence, and curl in quaternionic form',
      'Evaluate residues for quaternionic complex analysis'
    ],
    keyTakeaways: [
      'Non-commutativity requires left/right derivative distinction',
      'Slice regular functions generalize complex holomorphic functions',
      'Cauchy integral formula works slice-by-slice',
      'Quaternionic ∇ = ∂/∂t + i∂/∂x + j∂/∂y + k∂/∂z unifies differential operators',
      'Residue theorem enables contour integration in ℍ'
    ],
    prerequisites: ['Chapter 3: Differential Geometry on S³']
  },
  'chapter-5': {
    id: 'chapter-5',
    title: 'Spectral Theory on S³ × ℝ',
    readingTimeMinutes: 45,
    learningObjectives: [
      'Separate variables on S³ × ℝ for spectral decomposition',
      'Apply Wigner D-matrices as eigenfunctions',
      'Compute spherical harmonics on S³',
      'Perform Fourier and Laplace transforms in quaternionic context',
      'Analyze spectral density and eigenvalue distributions'
    ],
    keyTakeaways: [
      'Wigner D-matrices form complete orthogonal basis on S³',
      'Eigenvalues of Laplacian on S³ are l(l+2) for l = 0,1,2,...',
      'Fourier transform decomposes signals into frequency modes',
      'Spectral decomposition reveals resonance structure',
      'Harmonic analysis connects geometry and quantum mechanics'
    ],
    prerequisites: ['Chapter 3: Differential Geometry on S³', 'Chapter 4: Quaternionic Calculus']
  },
  'chapter-6': {
    id: 'chapter-6',
    title: 'AGQF: Anchor-Generating Quaternionic Factorial',
    readingTimeMinutes: 50,
    learningObjectives: [
      'Define the quaternionic factorial with anchor points',
      'Understand resonance wells and effective potentials',
      'Apply sine-prefactor lattice for quantization',
      'Recognize quantization as confinement in wells',
      'Connect AGQF to physical quantum systems'
    ],
    keyTakeaways: [
      'AGQF creates resonance wells that trap quantum states',
      'Anchored factorial enforces boundary conditions naturally',
      'Sine-prefactor lattice discretizes allowed energy levels',
      'Quantization emerges from geometric confinement, not axioms',
      'AGQF framework unifies various quantization schemes'
    ],
    prerequisites: ['Chapter 5: Spectral Theory on S³ × ℝ']
  },
  'chapter-7': {
    id: 'chapter-7',
    title: 'Quaternionic Spectral Coherence',
    readingTimeMinutes: 40,
    learningObjectives: [
      'Define coherence as phase alignment in quaternionic fields',
      'Analyze interference patterns from coherent states',
      'Compute spectral coherence functions',
      'Understand temporal equilibration dynamics',
      'Apply coherence theory to field stability'
    ],
    keyTakeaways: [
      'Coherence measures phase alignment across field components',
      'Interference creates observable patterns from coherent superposition',
      'Spectral coherence function quantifies frequency correlations',
      'Equilibration drives systems toward coherent steady states',
      'Field stability depends on maintaining coherence'
    ],
    prerequisites: ['Chapter 5: Spectral Theory on S³ × ℝ', 'Chapter 6: AGQF']
  },
  'chapter-8': {
    id: 'chapter-8',
    title: 'Quaternionic Spectral Operators',
    readingTimeMinutes: 45,
    learningObjectives: [
      'Construct the quaternionic Dirac operator',
      'Perform spectral decomposition of differential operators',
      'Express Maxwell equations in quaternionic form',
      'Unify electromagnetic fields geometrically',
      'Relate spinors to quaternionic rotations'
    ],
    keyTakeaways: [
      'Dirac operator encodes spin and spacetime geometry',
      'Spectral decomposition reveals operator structure',
      'Maxwell equations become ∂F = J in quaternionic form',
      'Geometric field unification emerges naturally',
      'Spinors and quaternions share deep mathematical connection'
    ],
    prerequisites: ['Chapter 7: Quaternionic Spectral Coherence']
  },
  'chapter-9': {
    id: 'chapter-9',
    title: 'Computational Quaternionic Geometry',
    readingTimeMinutes: 35,
    learningObjectives: [
      'Implement numerical quaternion arithmetic',
      'Apply Fast Fourier Transforms to quaternionic signals',
      'Design spectral filters for signal processing',
      'Create visualizations of quaternionic fields',
      'Use Python and Mathematica toolkits effectively'
    ],
    keyTakeaways: [
      'Numerical methods must respect quaternion non-commutativity',
      'FFT algorithms generalize to quaternionic data',
      'Spectral filters enable frequency-domain processing',
      'Visualization requires projecting 4D quaternions to 3D',
      'Open-source tools make quaternionic computing accessible'
    ],
    prerequisites: ['Chapter 4: Quaternionic Calculus', 'Chapter 5: Spectral Theory on S³ × ℝ']
  },
  'chapter-10': {
    id: 'chapter-10',
    title: 'Applications and Frontiers',
    readingTimeMinutes: 30,
    learningObjectives: [
      'Apply quaternionic methods to signal processing',
      'Use quaternions in optics and polarization',
      'Implement quaternionic robotics and navigation',
      'Explore quantum system applications',
      'Identify open research problems'
    ],
    keyTakeaways: [
      'Quaternionic signal processing handles multi-dimensional data naturally',
      'Optics benefits from quaternionic polarization representation',
      'Robotics uses quaternions for singularity-free orientation control',
      'Quantum systems exhibit quaternionic symmetries',
      'Many research frontiers remain in quaternionic spectral geometry'
    ],
    prerequisites: ['Chapter 9: Computational Quaternionic Geometry']
  }
};

// Get metadata for a chapter
export function getChapterMetadata(chapterId: string): ChapterMetadata | null {
  return chapterMetadata[chapterId] || null;
}

// Get total reading time for all chapters
export function getTotalReadingTime(): number {
  return Object.values(chapterMetadata).reduce((total, chapter) => total + chapter.readingTimeMinutes, 0);
}
