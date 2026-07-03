export interface SearchableContent {
  id: string;
  type: "chapter" | "tool" | "resource" | "page";
  title: string;
  subtitle?: string;
  description: string;
  url: string;
  tags: string[];
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  category?: string;
  keywords: string[];
}

export const searchableContent: SearchableContent[] = [
  // Chapters
  {
    id: "chapter-1",
    type: "chapter",
    title: "The Geometry of Numbers",
    subtitle: "From Real to Complex to Quaternionic",
    description: "Historical progression from real to complex to quaternionic numbers. Covers quaternion basis, non-commutativity, S³ topology, and geometric visualizations.",
    url: "/chapter-1-geometry-of-numbers",
    tags: ["Foundations", "Geometry", "Quaternions", "Algebra", "S³"],
    difficulty: "Beginner",
    category: "Foundations",
    keywords: ["Hamilton", "quaternion", "hypersphere", "topology", "norm", "conjugation", "basis"]
  },
  {
    id: "chapter-2",
    type: "chapter",
    title: "The Quaternionic Rotation Form",
    subtitle: "q = cos φ + u sin φ and the 3-Sphere",
    description: "Deriving quaternionic rotation form, connection to SU(2) and SO(3), 4π rotation identity, geodesics, and Hopf fibration.",
    url: "/chapter-2-quaternionic-rotation",
    tags: ["Foundations", "Rotation", "SU(2)", "SO(3)", "Hopf Fibration"],
    difficulty: "Beginner",
    category: "Foundations",
    keywords: ["rotation", "spin", "geodesic", "Hopf", "SU(2)", "SO(3)", "double cover", "4π"]
  },
  {
    id: "chapter-3",
    type: "chapter",
    title: "Differential Geometry on S³",
    subtitle: "Manifold Structure and Metrics",
    description: "Coordinate charts, bi-invariant metric, Lie group structure, connection forms, curvature tensors, and Laplacian on S³.",
    url: "/chapter-3-differential-geometry-s3",
    tags: ["Geometry", "Manifolds", "Lie Groups", "Curvature", "Differential Geometry"],
    difficulty: "Intermediate",
    category: "Foundations",
    keywords: ["manifold", "Lie group", "curvature", "Laplacian", "metric", "connection", "parallel transport"]
  },
  {
    id: "chapter-4",
    type: "chapter",
    title: "Quaternionic Calculus",
    subtitle: "Differentiation, Integration, and Slice Regularity",
    description: "Non-commutative derivatives, slice regular functions, Cauchy integral formula, gradient, divergence, curl in quaternionic form.",
    url: "/chapter-4-quaternionic-calculus-new",
    tags: ["Calculus", "Analysis", "Slice Regularity", "Integration", "Differentiation"],
    difficulty: "Intermediate",
    category: "Calculus & Spectral Theory",
    keywords: ["derivative", "integral", "Cauchy", "slice regular", "gradient", "divergence", "curl", "residue"]
  },
  {
    id: "chapter-5",
    type: "chapter",
    title: "Spectral Theory on S³ × ℝ",
    subtitle: "Harmonic Analysis and Eigenfunctions",
    description: "Separation of variables, Wigner D-matrices, spherical harmonics, Fourier and Laplace transforms, spectral density.",
    url: "/chapter-5-distributions-pde",
    tags: ["Spectral Theory", "Harmonic Analysis", "Eigenfunctions", "Fourier Transform"],
    difficulty: "Advanced",
    category: "Calculus & Spectral Theory",
    keywords: ["eigenfunction", "spectral", "Fourier", "Laplace", "Wigner", "spherical harmonics", "orthogonality"]
  },
  {
    id: "chapter-6",
    type: "chapter",
    title: "The Anchor-Generating Quaternionic Factorial (AGQF)",
    subtitle: "Resonance Wells and Quantization",
    description: "Quaternionic factorial definition, anchored forms, sine-prefactor lattice, effective potential, quantization as confinement.",
    url: "/chapter-6-agqf",
    tags: ["Quantization", "AGQF", "Resonance Wells", "Advanced Theory"],
    difficulty: "Advanced",
    category: "Advanced Concepts",
    keywords: ["AGQF", "quantization", "resonance", "well", "anchor", "factorial", "lattice", "confinement"]
  },
  {
    id: "chapter-7",
    type: "chapter",
    title: "Quaternionic Spectral Coherence",
    subtitle: "Resonance, Alignment, and Field Stability",
    description: "Coherence as phase alignment, interference patterns, spectral coherence functions, temporal equilibration.",
    url: "/chapter-7-spectral-coherence",
    tags: ["Coherence", "Resonance", "Field Theory", "Interference"],
    difficulty: "Advanced",
    category: "Advanced Concepts",
    keywords: ["coherence", "phase", "interference", "resonance", "alignment", "equilibration", "stability"]
  },
  {
    id: "chapter-8",
    type: "chapter",
    title: "Quaternionic Spectral Operators",
    subtitle: "Dirac, Laplacian, and Maxwell Equivalents",
    description: "Quaternionic Dirac operator, spectral decomposition, Maxwell equations in quaternionic form, geometric field unification.",
    url: "/chapter-8-spectral-operators",
    tags: ["Operators", "Physics", "Dirac", "Maxwell", "Field Theory"],
    difficulty: "Advanced",
    category: "Applications & Implementation",
    keywords: ["Dirac", "Laplacian", "Maxwell", "operator", "field", "unification", "spinor"]
  },
  {
    id: "chapter-9",
    type: "chapter",
    title: "Computational Quaternionic Geometry",
    subtitle: "Algorithms, Simulation, and Visualization",
    description: "Numerical quaternion representation, FFTs, spectral filters, visualization techniques, Python and Mathematica toolkits.",
    url: "/chapter-9-computational-geometry",
    tags: ["Computation", "Algorithms", "Visualization", "Simulation", "Programming"],
    difficulty: "Intermediate",
    category: "Applications & Implementation",
    keywords: ["algorithm", "FFT", "simulation", "visualization", "Python", "Mathematica", "numerical", "filter"]
  },
  {
    id: "chapter-10",
    type: "chapter",
    title: "Applications and Frontiers",
    subtitle: "From Theory to Technology",
    description: "Signal processing, optics, robotics, quantum systems, and open research problems in quaternionic spectral geometry.",
    url: "/chapter-10-applications",
    tags: ["Applications", "Signal Processing", "Robotics", "Quantum", "Industry"],
    difficulty: "Intermediate",
    category: "Applications & Implementation",
    keywords: ["application", "signal processing", "optics", "robotics", "quantum", "navigation", "communication"]
  },

  // Tools
  {
    id: "rqm-spinor-visualizer",
    type: "tool",
    title: "RQM Spinor Visualizer",
    description: "Interactive 3D visualization of quaternionic spinor states with Bloch sphere comparison, path tracing, and custom state builder.",
    url: "/rqm-spinor-visualizer",
    tags: ["Visualization", "Interactive", "Quantum", "Bloch Sphere", "Spinor"],
    category: "Interactive Tools",
    keywords: ["visualizer", "spinor", "Bloch sphere", "quantum", "rotation", "interactive", "3D"]
  },

  // Hub Pages
  {
    id: "learning-hub",
    type: "page",
    title: "Learn RQM Theory",
    description: "Structured learning journey through Quaternionic Spectral Geometry, organized into foundations, calculus, advanced concepts, and applications.",
    url: "/learn",
    tags: ["Learning", "Curriculum", "Education"],
    category: "Education",
    keywords: ["learn", "course", "curriculum", "textbook", "study", "education"]
  },
  {
    id: "tools-hub",
    type: "page",
    title: "Interactive Tools",
    description: "Explore quaternionic quantum mechanics through interactive visualizations and computational tools.",
    url: "/tools",
    tags: ["Tools", "Interactive", "Visualization"],
    category: "Tools",
    keywords: ["tools", "interactive", "visualization", "calculator", "playground"]
  },
  {
    id: "research-hub",
    type: "page",
    title: "Research Library",
    description: "Comprehensive open-access research materials on quaternionic spectral geometry including textbooks, papers, and technical documentation.",
    url: "/research",
    tags: ["Research", "Library", "Papers", "Publications"],
    category: "Research",
    keywords: ["research", "library", "papers", "publications", "textbook", "documentation"]
  },
  {
    id: "eris-achievement",
    type: "resource",
    title: "DARPA ERIS Marketplace - Awardable Status",
    description: "Recognition of quaternionic signal processing innovation through DARPA's Expedited Research Implementation Series competitive procedures.",
    url: "/eris-achievement",
    tags: ["Government", "DARPA", "Achievement", "Signal Processing"],
    category: "Government",
    keywords: ["DARPA", "ERIS", "awardable", "government", "DoD", "procurement", "signal processing"]
  }
];

// Search function with fuzzy matching
export function searchContent(query: string): SearchableContent[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  const queryTerms = lowerQuery.split(/\s+/).filter(term => term.length > 0);

  const results = searchableContent.map(item => {
    let score = 0;

    // Title exact match (highest priority)
    if (item.title.toLowerCase().includes(lowerQuery)) {
      score += 100;
    }

    // Title word matches
    queryTerms.forEach(term => {
      if (item.title.toLowerCase().includes(term)) {
        score += 50;
      }
    });

    // Subtitle matches
    if (item.subtitle?.toLowerCase().includes(lowerQuery)) {
      score += 80;
    }

    // Description matches
    if (item.description.toLowerCase().includes(lowerQuery)) {
      score += 30;
    }

    // Tag matches
    item.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowerQuery)) {
        score += 40;
      }
    });

    // Keyword matches
    item.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(lowerQuery)) {
        score += 25;
      }
    });

    // Category match
    if (item.category?.toLowerCase().includes(lowerQuery)) {
      score += 35;
    }

    return { item, score };
  })
  .filter(result => result.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(result => result.item);

  return results.slice(0, 10); // Return top 10 results
}

// Get all unique tags
export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  searchableContent.forEach(item => {
    item.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

// Get all unique categories
export function getAllCategories(): string[] {
  const categoriesSet = new Set<string>();
  searchableContent.forEach(item => {
    if (item.category) {
      categoriesSet.add(item.category);
    }
  });
  return Array.from(categoriesSet).sort();
}

// Filter content by tags, difficulty, and type
export function filterContent(filters: {
  tags?: string[];
  difficulty?: string[];
  type?: string[];
}): SearchableContent[] {
  return searchableContent.filter(item => {
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasTag = filters.tags.some(tag => item.tags.includes(tag));
      if (!hasTag) return false;
    }

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!item.difficulty || !filters.difficulty.includes(item.difficulty)) {
        return false;
      }
    }

    // Filter by type
    if (filters.type && filters.type.length > 0) {
      if (!filters.type.includes(item.type)) {
        return false;
      }
    }

    return true;
  });
}
