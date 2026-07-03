import type { ReactNode } from "react";

const QSG_ACCENT = "#3d7a8c";
const QSG_DARK = "#1a3b47";
const QSG_TINT = "rgba(77, 154, 175, 0.1)";

interface QSGSectionTeachingBlockProps {
  learnerQuestion: string;
  plainLanguageSetup: string;
  formulaRecap?: ReactNode;
  checkpoint: string;
  revealAnswer: string;
  finalTakeaway: string;
  nextStep?: string;
}

export default function QSGSectionTeachingBlock({
  learnerQuestion,
  plainLanguageSetup,
  formulaRecap,
  checkpoint,
  revealAnswer,
  finalTakeaway,
  nextStep,
}: QSGSectionTeachingBlockProps) {
  return (
    <div className="not-prose my-8 space-y-4">
      <div className="rounded-xl border bg-white p-5 shadow-sm" style={{ borderColor: QSG_ACCENT }}>
        <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: QSG_ACCENT }}>
          The learner's question
        </p>
        <p className="text-base font-semibold leading-relaxed" style={{ color: QSG_DARK }}>
          {learnerQuestion}
        </p>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">{plainLanguageSetup}</p>
      </div>

      {formulaRecap && (
        <div
          className="pretty-formula-card rounded-xl border p-5"
          style={{ backgroundColor: QSG_TINT, borderColor: QSG_ACCENT }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: QSG_DARK }}>
            Formula recap
          </p>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">{formulaRecap}</div>
        </div>
      )}

      <details className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <summary className="cursor-pointer text-sm font-bold" style={{ color: QSG_DARK }}>
          Checkpoint: {checkpoint}
        </summary>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold" style={{ color: QSG_ACCENT }}>Reveal answer:</span>{" "}
          {revealAnswer}
        </p>
      </details>

      <div className="rounded-xl border-l-4 p-5" style={{ backgroundColor: QSG_TINT, borderColor: QSG_ACCENT }}>
        <p className="text-sm font-bold mb-2" style={{ color: QSG_DARK }}>Final takeaway</p>
        <p className="text-sm text-gray-700 leading-relaxed">{finalTakeaway}</p>
        {nextStep && (
          <p className="text-sm text-gray-700 leading-relaxed mt-3">
            <span className="font-semibold">Next step:</span> {nextStep}
          </p>
        )}
      </div>
    </div>
  );
}
