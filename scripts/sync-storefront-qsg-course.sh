#!/usr/bin/env bash
set -euo pipefail

SOURCE_REPO="${1:-/Users/home/Documents/GitHub/RQM Technologies LLC/RQM-Storefront}"
DEST_REPO="${2:-$(git rev-parse --show-toplevel)}"
SNAPSHOT_ROOT="$DEST_REPO/course/storefront-snapshot"
SOURCE_ROOT="$SNAPSHOT_ROOT/source"

if ! git -C "$SOURCE_REPO" rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "Source repo is not a git checkout: $SOURCE_REPO" >&2
  exit 1
fi

if ! git -C "$DEST_REPO" rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "Destination repo is not a git checkout: $DEST_REPO" >&2
  exit 1
fi

rm -rf "$SOURCE_ROOT"
mkdir -p "$SOURCE_ROOT"

copy_file() {
  local rel="$1"
  if [[ ! -f "$SOURCE_REPO/$rel" ]]; then
    echo "Missing source file: $rel" >&2
    return 1
  fi

  mkdir -p "$SOURCE_ROOT/$(dirname "$rel")"
  cp "$SOURCE_REPO/$rel" "$SOURCE_ROOT/$rel"
}

collect_files() {
  {
    printf '%s\n' \
      "docs/course-plans/qsg-course-humanization-plan.md" \
      "client/src/App.tsx" \
      "client/public/assets/models/resonant-axis/documents/maxwell-fields-as-resonant-deviations-from-coherence.pdf" \
      "shared/chapterMetadata.ts" \
      "shared/relatedConcepts.ts" \
      "shared/searchIndex.ts" \
      "client/src/components/AGQFViewer.tsx" \
      "client/src/components/BookmarkButton.tsx" \
      "client/src/components/Breadcrumb.tsx" \
      "client/src/components/ChapterToolbar.tsx" \
      "client/src/components/ContentSearch.tsx" \
      "client/src/components/EigenCircleVisual.tsx" \
      "client/src/components/EigenSpinorVisual.tsx" \
      "client/src/components/KeyTakeaways.tsx" \
      "client/src/components/MarkCompleteButton.tsx" \
      "client/src/components/Math.tsx" \
      "client/src/components/ProgressBar.tsx" \
      "client/src/components/QSGChapterFraming.tsx" \
      "client/src/components/QSGSectionTeachingBlock.tsx" \
      "client/src/components/QuaternionicSpaceViz.tsx" \
      "client/src/components/ReadingTimeEstimate.tsx" \
      "client/src/components/ResumeReadingCard.tsx" \
      "client/src/components/S3xRStage.tsx" \
      "client/src/components/StudyNotesPanel.tsx" \
      "client/src/components/math/PrettyMath.tsx"

    find "$SOURCE_REPO/client/src/pages" -type f \
      \( \
        -name 'Chapter*.tsx' \
        -o -name 'Chapter*.tsx.backup' \
        -o -name 'AnchorWellLandscape.tsx' \
        -o -name 'ClosedFormCriticalSlice.tsx' \
        -o -name 'CoursesLanding.tsx' \
        -o -name 'EigenCircle.tsx' \
        -o -name 'EigenSpinor.tsx' \
        -o -path "$SOURCE_REPO/client/src/pages/chapter*/Section*.tsx" \
        -o -name 'LearningHub.tsx' \
        -o -name 'QuaternionicHypersphere.tsx' \
        -o -name 'QSG*.tsx' \
        -o -name 'QuaternionicSpectralGeometry*.tsx' \
        -o -name 'ResearchHub.tsx' \
        -o -name 'ResearchPage.tsx' \
        -o -name 'RQMSpinorVisualizer.tsx' \
        -o -name 'SpectralAtlas.tsx' \
        -o -name 'UnifiedGlossary.tsx' \
      \) \
      ! -path '*/qc-course/*' \
      ! -path '*/qsp-course/*' \
      | sed "s|^$SOURCE_REPO/||"
  } | sort -u
}

while IFS= read -r rel; do
  copy_file "$rel"
done < <(collect_files)

find "$SOURCE_ROOT" -type f \
  \( -name '*.backup' -o -name '*.md' -o -name '*.ts' -o -name '*.tsx' -o -name '*.txt' -o -name '*.sh' \) \
  -print0 | xargs -0 perl -0pi -e 's/[ \t]+$//mg'

find "$SOURCE_ROOT" -type f | sed "s|^$SOURCE_ROOT/||" | sort > "$SNAPSHOT_ROOT/file-list.txt"

SOURCE_COMMIT="$(git -C "$SOURCE_REPO" rev-parse HEAD)"
SOURCE_BRANCH="$(git -C "$SOURCE_REPO" rev-parse --abbrev-ref HEAD)"
SOURCE_REMOTE="$(git -C "$SOURCE_REPO" remote get-url origin 2>/dev/null || true)"
SOURCE_STATUS="$(git -C "$SOURCE_REPO" status --short)"
SNAPSHOT_DATE="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
FILE_COUNT="$(wc -l < "$SNAPSHOT_ROOT/file-list.txt" | tr -d ' ')"

{
  printf '# Storefront QSG Course Snapshot Metadata\n\n'
  printf -- '- Snapshot date: `%s`\n' "$SNAPSHOT_DATE"
  printf -- '- Source repo: `%s`\n' "$SOURCE_REPO"
  printf -- '- Source remote: `%s`\n' "$SOURCE_REMOTE"
  printf -- '- Source branch: `%s`\n' "$SOURCE_BRANCH"
  printf -- '- Source commit: `%s`\n' "$SOURCE_COMMIT"
  printf -- '- Copied file count: `%s`\n' "$FILE_COUNT"
  printf '\n'
  if [[ -n "$SOURCE_STATUS" ]]; then
    printf '## Source Working Tree Status\n\n'
    printf 'The source checkout was dirty when this snapshot was created:\n\n'
    printf '```text\n%s\n```\n' "$SOURCE_STATUS"
  else
    printf '## Source Working Tree Status\n\n'
    printf 'The source checkout was clean when this snapshot was created.\n'
  fi
} > "$SNAPSHOT_ROOT/source-metadata.md"

echo "Copied $FILE_COUNT files from RQM-Storefront QSG course into $SNAPSHOT_ROOT"
