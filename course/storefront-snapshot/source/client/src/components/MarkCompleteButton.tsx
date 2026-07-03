import { useState, useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  markChapterCompleted,
  markSectionCompleted,
  isChapterCompleted,
  isSectionCompleted,
  markChapterVisited
} from "@/lib/readingProgress";
import { useToast } from "@/hooks/use-toast";
import { chapters as qcChapters } from "@/data/qc-course/courseManifest";

interface MarkCompleteButtonProps {
  type: "chapter" | "section";
  id: string;
  title?: string;
}

const QC_CHAPTER_IDS = new Set(qcChapters.map((chapter) => chapter.id));

// Best-effort server sync for the QC course. Used to populate session state
// that the certificate-signing endpoint relies on. Failures are silent — the
// local UI still updates; only the "Verified" badge on shared certificates
// will be unavailable.
function postJson(url: string, body: unknown): void {
  try {
    void fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => undefined);
  } catch {
    // ignore
  }
}

export default function MarkCompleteButton({ type, id, title }: MarkCompleteButtonProps) {
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (type === "chapter") {
      setCompleted(isChapterCompleted(id));
      // Track local "last visited" so the Resume Reading card can surface
      // the most recently opened chapter on the Learn hub and course hubs.
      markChapterVisited(id);
      // Record a server-side visit for QC chapters so the engagement gate
      // before "Mark complete" starts ticking. Visiting a chapter is benign
      // and idempotent on the server.
      if (QC_CHAPTER_IDS.has(id)) {
        postJson("/api/qc-course/chapter/visit", { chapterId: id });
      }
    } else {
      setCompleted(isSectionCompleted(id));
    }
  }, [type, id]);

  const handleToggle = () => {
    const newState = !completed;

    if (type === "chapter") {
      markChapterCompleted(id, newState);
      if (QC_CHAPTER_IDS.has(id)) {
        postJson("/api/qc-course/chapter/complete", {
          chapterId: id,
          completed: newState,
        });
      }
    } else {
      markSectionCompleted(id, newState);
    }

    setCompleted(newState);

    const label = title || (type === "chapter" ? `Chapter ${id.replace('chapter-', '')}` : `Section ${id}`);

    toast({
      title: newState ? "Progress Saved!" : "Progress Updated",
      description: newState
        ? `${label} marked as complete. Keep up the great work!`
        : `${label} marked as incomplete.`,
      duration: 3000
    });
  };

  return (
    <Button
      onClick={handleToggle}
      variant={completed ? "default" : "outline"}
      className={`gap-2 transition-all ${
        completed
          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
          : "border-2 hover:border-emerald-500 hover:text-emerald-600"
      }`}
      style={!completed ? { borderColor: '#3d7a8c', color: '#2d5a69' } : {}}
      data-testid={`button-mark-${type}-complete-${id}`}
    >
      {completed ? (
        <>
          <CheckCircle className="w-5 h-5" />
          {type === "chapter" ? "Chapter Completed" : "Section Completed"}
        </>
      ) : (
        <>
          <Circle className="w-5 h-5" />
          Mark {type === "chapter" ? "Chapter" : "Section"} Complete
        </>
      )}
    </Button>
  );
}
