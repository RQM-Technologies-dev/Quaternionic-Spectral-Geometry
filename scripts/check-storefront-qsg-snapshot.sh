#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-$(git rev-parse --show-toplevel)}"
SNAPSHOT="$ROOT/course/storefront-snapshot"
SOURCE="$SNAPSHOT/source"

fail() {
  echo "Snapshot check failed: $*" >&2
  exit 1
}

require_file() {
  local rel="$1"
  [[ -f "$SOURCE/$rel" ]] || fail "missing $rel"
}

require_count() {
  local label="$1"
  local expected="$2"
  local pattern="$3"
  local actual
  actual="$(find "$SOURCE" -path "$SOURCE/$pattern" -type f | wc -l | tr -d ' ')"
  [[ "$actual" == "$expected" ]] || fail "$label expected $expected files, found $actual"
}

[[ -f "$SNAPSHOT/source-metadata.md" ]] || fail "missing source-metadata.md"
[[ -f "$SNAPSHOT/file-list.txt" ]] || fail "missing file-list.txt"
[[ -d "$SOURCE" ]] || fail "missing source directory"

if find "$SOURCE" -type f | grep -E '/(qc-course|qsp-course)/' >/dev/null; then
  fail "snapshot includes QC/QSP course files"
fi

require_file "client/src/App.tsx"
require_file "client/public/assets/models/resonant-axis/documents/maxwell-fields-as-resonant-deviations-from-coherence.pdf"
require_file "client/src/pages/CoursesLanding.tsx"
require_file "client/src/pages/LearningHub.tsx"
require_file "client/src/pages/QuaternionicSpectralGeometry.tsx"
require_file "client/src/pages/QuaternionicSpectralGeometryBook.tsx"
require_file "client/src/pages/UnifiedGlossary.tsx"
require_file "client/src/pages/AnchorWellLandscape.tsx"
require_file "client/src/pages/ClosedFormCriticalSlice.tsx"
require_file "client/src/pages/EigenCircle.tsx"
require_file "client/src/pages/EigenSpinor.tsx"
require_file "client/src/pages/QuaternionicHypersphere.tsx"
require_file "client/src/pages/ResearchHub.tsx"
require_file "client/src/pages/ResearchPage.tsx"
require_file "client/src/pages/RQMSpinorVisualizer.tsx"
require_file "client/src/pages/SpectralAtlas.tsx"
require_file "docs/course-plans/qsg-course-humanization-plan.md"
require_file "shared/chapterMetadata.ts"
require_file "shared/searchIndex.ts"
require_file "shared/relatedConcepts.ts"

require_file "client/src/components/QSGChapterFraming.tsx"
require_file "client/src/components/QSGSectionTeachingBlock.tsx"
require_file "client/src/components/math/PrettyMath.tsx"

require_file "client/src/pages/Chapter1GeometryOfNumbers.tsx"
require_file "client/src/pages/Chapter2QuaternionicRotation.tsx"
require_file "client/src/pages/Chapter3DifferentialGeometryS3.tsx"
require_file "client/src/pages/Chapter4SpectralCalculus.tsx"
require_file "client/src/pages/Chapter5SpectralTheory.tsx"
require_file "client/src/pages/Chapter6AGQFHub.tsx"
require_file "client/src/pages/Chapter7SpectralCoherenceHub.tsx"
require_file "client/src/pages/Chapter8SpecialFunctionsHub.tsx"
require_file "client/src/pages/Chapter9ComputationalHub.tsx"
require_file "client/src/pages/Chapter10ApplicationsHub.tsx"

require_count "Chapter 1 sections" 11 "client/src/pages/Chapter1Section1-*.tsx"
require_count "Chapter 2 sections" 9 "client/src/pages/Chapter2Section2-*.tsx"
require_count "Chapter 3 sections" 7 "client/src/pages/Chapter3Section3-*.tsx"
require_count "Chapter 4 sections" 4 "client/src/pages/Chapter4Section4-*.tsx"
require_count "Chapter 5 sections" 5 "client/src/pages/Chapter5Section5-*.tsx"
require_count "Chapter 6 sections" 5 "client/src/pages/chapter6/Section6-*.tsx"
require_count "Chapter 7 sections" 5 "client/src/pages/chapter7/Section7-*.tsx"
require_count "Chapter 8 sections" 4 "client/src/pages/chapter8/Section8-*.tsx"
require_count "Chapter 9 sections" 5 "client/src/pages/chapter9/Section9-*.tsx"
require_count "Chapter 10 sections" 5 "client/src/pages/chapter10/Section10-*.tsx"

file_count="$(wc -l < "$SNAPSHOT/file-list.txt" | tr -d ' ')"
[[ "$file_count" -ge 129 ]] || fail "expected at least 129 copied files, found $file_count"

echo "Storefront QSG snapshot check passed ($file_count files)."
