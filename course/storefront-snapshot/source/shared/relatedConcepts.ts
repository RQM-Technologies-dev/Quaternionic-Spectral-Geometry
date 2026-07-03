// Related concepts recommendation engine

export interface RelatedConcept {
  chapterId: string;
  title: string;
  url: string;
  reason: string;
  relevanceScore: number;
}

// Concept graph defining relationships between chapters
const conceptGraph: Record<string, string[]> = {
  'chapter-1': ['chapter-2', 'chapter-3'], // Geometry of Numbers → Rotation & Differential Geometry
  'chapter-2': ['chapter-1', 'chapter-3', 'chapter-4'], // Rotation → Geometry, Diff Geo, Calculus
  'chapter-3': ['chapter-2', 'chapter-4', 'chapter-5'], // Diff Geometry → Rotation, Calculus, Spectral Theory
  'chapter-4': ['chapter-3', 'chapter-5'], // Calculus → Diff Geometry, Spectral Theory
  'chapter-5': ['chapter-4', 'chapter-6', 'chapter-7'], // Spectral Theory → Calculus, AGQF, Coherence
  'chapter-6': ['chapter-5', 'chapter-7'], // AGQF → Spectral Theory, Coherence
  'chapter-7': ['chapter-5', 'chapter-6', 'chapter-8'], // Coherence → Spectral Theory, AGQF, Operators
  'chapter-8': ['chapter-7', 'chapter-9'], // Operators → Coherence, Computational
  'chapter-9': ['chapter-8', 'chapter-10'], // Computational → Operators, Applications
  'chapter-10': ['chapter-9'] // Applications → Computational
};

// Chapter metadata for recommendations
const chapterMetadata: Record<string, { title: string; url: string; category: string }> = {
  'chapter-1': { title: 'The Geometry of Numbers', url: '/chapter-1-geometry-of-numbers', category: 'Foundations' },
  'chapter-2': { title: 'The Quaternionic Rotation Form', url: '/chapter-2-quaternionic-rotation', category: 'Foundations' },
  'chapter-3': { title: 'Differential Geometry on S³', url: '/chapter-3-differential-geometry-s3', category: 'Foundations' },
  'chapter-4': { title: 'Quaternionic Calculus', url: '/chapter-4-quaternionic-calculus-new', category: 'Calculus & Spectral Theory' },
  'chapter-5': { title: 'Spectral Theory on S³ × ℝ', url: '/chapter-5-distributions-pde', category: 'Calculus & Spectral Theory' },
  'chapter-6': { title: 'The Anchor-Generating Quaternionic Factorial (AGQF)', url: '/chapter-6-agqf', category: 'Advanced Concepts' },
  'chapter-7': { title: 'Quaternionic Spectral Coherence', url: '/chapter-7-spectral-coherence', category: 'Advanced Concepts' },
  'chapter-8': { title: 'Quaternionic Spectral Operators', url: '/chapter-8-spectral-operators', category: 'Applications' },
  'chapter-9': { title: 'Computational Quaternionic Geometry', url: '/chapter-9-computational-geometry', category: 'Applications' },
  'chapter-10': { title: 'Applications and Frontiers', url: '/chapter-10-applications', category: 'Applications' }
};

// Relationship reasons
const relationshipReasons: Record<string, Record<string, string>> = {
  'chapter-1': {
    'chapter-2': 'Builds on quaternion fundamentals with rotation applications',
    'chapter-3': 'Extends geometric concepts to manifold structures'
  },
  'chapter-2': {
    'chapter-1': 'Foundational quaternion concepts needed for rotations',
    'chapter-3': 'Geometric framework for understanding rotations on S³',
    'chapter-4': 'Calculus tools for analyzing rotation dynamics'
  },
  'chapter-3': {
    'chapter-2': 'Rotation theory provides context for manifold geometry',
    'chapter-4': 'Differential geometry enables quaternionic calculus',
    'chapter-5': 'Manifold structure supports spectral analysis'
  },
  'chapter-4': {
    'chapter-3': 'Differential geometry foundations for calculus',
    'chapter-5': 'Calculus tools essential for spectral theory'
  },
  'chapter-5': {
    'chapter-4': 'Calculus techniques applied to spectral problems',
    'chapter-6': 'Spectral foundations for quantization theory',
    'chapter-7': 'Spectral analysis of coherence phenomena'
  },
  'chapter-6': {
    'chapter-5': 'Spectral theory underpins quantization concepts',
    'chapter-7': 'Resonance wells connect to coherence theory'
  },
  'chapter-7': {
    'chapter-5': 'Spectral concepts applied to coherence',
    'chapter-6': 'AGQF provides quantization framework',
    'chapter-8': 'Coherence theory applies to operators'
  },
  'chapter-8': {
    'chapter-7': 'Coherence concepts in operator theory',
    'chapter-9': 'Computational methods for operators'
  },
  'chapter-9': {
    'chapter-8': 'Numerical implementation of operators',
    'chapter-10': 'Computational tools enable applications'
  },
  'chapter-10': {
    'chapter-9': 'Computational techniques for real-world problems'
  }
};

/**
 * Get related concepts for a given chapter
 * @param currentChapterId - The ID of the current chapter
 * @param limit - Maximum number of recommendations (default: 3)
 * @returns Array of related concepts sorted by relevance
 */
export function getRelatedConcepts(currentChapterId: string, limit: number = 3): RelatedConcept[] {
  const relatedIds = conceptGraph[currentChapterId] || [];

  const recommendations: RelatedConcept[] = relatedIds.map((relatedId, index) => {
    const metadata = chapterMetadata[relatedId];
    const reason = relationshipReasons[currentChapterId]?.[relatedId] || 'Related concept';

    // Calculate relevance score (higher for earlier recommendations)
    const relevanceScore = 100 - (index * 10);

    return {
      chapterId: relatedId,
      title: metadata.title,
      url: metadata.url,
      reason,
      relevanceScore
    };
  });

  return recommendations.slice(0, limit);
}

/**
 * Get the next recommended chapter in sequence
 * @param currentChapterId - The ID of the current chapter
 * @returns The next chapter or null if at the end
 */
export function getNextChapter(currentChapterId: string): RelatedConcept | null {
  const chapterNumber = parseInt(currentChapterId.split('-')[1]);
  if (chapterNumber >= 10) return null;

  const nextId = `chapter-${chapterNumber + 1}`;
  const metadata = chapterMetadata[nextId];

  if (!metadata) return null;

  return {
    chapterId: nextId,
    title: metadata.title,
    url: metadata.url,
    reason: 'Continue your learning journey',
    relevanceScore: 100
  };
}

/**
 * Get the previous chapter in sequence
 * @param currentChapterId - The ID of the current chapter
 * @returns The previous chapter or null if at the beginning
 */
export function getPreviousChapter(currentChapterId: string): RelatedConcept | null {
  const chapterNumber = parseInt(currentChapterId.split('-')[1]);
  if (chapterNumber <= 1) return null;

  const prevId = `chapter-${chapterNumber - 1}`;
  const metadata = chapterMetadata[prevId];

  if (!metadata) return null;

  return {
    chapterId: prevId,
    title: metadata.title,
    url: metadata.url,
    reason: 'Review previous concepts',
    relevanceScore: 90
  };
}
