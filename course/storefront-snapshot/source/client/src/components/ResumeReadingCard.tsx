import { useEffect, useState } from "react";
import { Link } from "wouter";
import { BookOpen, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { getReadingProgress } from "@/lib/readingProgress";
import { qspChapters } from "@/data/qsp-course/courseManifest";
import { chapters as qcChapters } from "@/data/qc-course/courseManifest";

type CourseKey = "qsp" | "qc" | "all";

interface CourseProgress {
  key: "qsp" | "qc";
  label: string;
  total: number;
  completed: number;
  resumeChapter: { number: number; title: string; path: string; completed: boolean } | null;
  accent: string;
  hubPath: string;
}

function buildCourseProgress(key: "qsp" | "qc"): CourseProgress {
  const data = getReadingProgress();
  const list = key === "qsp" ? qspChapters : qcChapters;
  const idPrefix = key === "qsp" ? "qsp-ch-" : "qc-ch-";
  const accent = key === "qsp" ? "#7c3aed" : "#0d9488";
  const hubPath = key === "qsp"
    ? "/learn/quaternionic-signal-processing"
    : "/learn/quantum-computing";
  const label = key === "qsp" ? "Quaternionic Signal Processing" : "RQM Quantum Computing";

  let completed = 0;
  let lastVisited: { ch: any; ts: number } | null = null;
  let firstIncomplete: any = null;

  for (const ch of list) {
    const id = `${idPrefix}${ch.number}`;
    const prog = data.chapters[id];
    const isDone = !!prog?.completed;
    if (isDone) completed++;
    if (!isDone && !firstIncomplete) firstIncomplete = ch;
    if (prog?.lastVisited) {
      const ts = new Date(prog.lastVisited).getTime();
      if (!lastVisited || ts > lastVisited.ts) lastVisited = { ch, ts };
    }
  }

  let resume: CourseProgress["resumeChapter"] = null;
  const target = lastVisited?.ch ?? firstIncomplete ?? list[0];
  if (target) {
    const id = `${idPrefix}${target.number}`;
    resume = {
      number: target.number,
      title: target.title,
      path: target.path,
      completed: !!data.chapters[id]?.completed,
    };
  }

  return { key, label, total: list.length, completed, resumeChapter: resume, accent, hubPath };
}

export default function ResumeReadingCard({ course = "all" }: { course?: CourseKey }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onUpdate = () => setTick(t => t + 1);
    window.addEventListener("progressUpdated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("progressUpdated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  // tick is read so React re-renders on update
  void tick;

  const courses: CourseProgress[] = course === "all"
    ? [buildCourseProgress("qsp"), buildCourseProgress("qc")]
    : [buildCourseProgress(course)];

  // Hide entirely if user has zero engagement on every shown course
  const hasAnyEngagement = courses.some(c => c.completed > 0 || c.resumeChapter);
  if (!hasAnyEngagement) return null;

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8" data-testid="resume-reading-card">
      {courses.map((c) => {
        if (!c.resumeChapter) return null;
        const pct = Math.round((c.completed / c.total) * 100);
        const ctaLabel = c.completed === 0
          ? "Start course"
          : c.resumeChapter.completed
            ? "Review chapter"
            : "Resume";
        return (
          <div
            key={c.key}
            className="bg-white border rounded-xl p-5 shadow-sm transition-all hover:shadow-md"
            style={{ borderColor: `${c.accent}33` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" style={{ color: c.accent }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.accent }}>
                  {c.label}
                </span>
              </div>
              <span className="text-xs font-mono text-gray-500">
                {c.completed}/{c.total}
              </span>
            </div>

            <div className="mb-3">
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: c.accent }}
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Pick up where you left off
            </p>
            <h3 className="text-sm font-bold text-gray-800 leading-snug mb-3">
              Chapter {c.resumeChapter.number}: {c.resumeChapter.title}
              {c.resumeChapter.completed && (
                <CheckCircle2 className="inline-block w-4 h-4 ml-1 text-emerald-500" />
              )}
            </h3>

            <div className="flex items-center justify-between gap-2">
              <Link href={c.resumeChapter.path}>
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: c.accent }}
                  data-testid={`button-resume-${c.key}`}
                >
                  {ctaLabel}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
              <Link href={c.hubPath}>
                <span className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer">
                  All chapters
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
