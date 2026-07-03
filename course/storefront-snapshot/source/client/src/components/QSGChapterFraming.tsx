interface QSGChapterFramingProps {
  learnerQuestion: string;
  givesYou: string;
  comesNext: string;
}

export default function QSGChapterFraming({
  learnerQuestion,
  givesYou,
  comesNext,
}: QSGChapterFramingProps) {
  return (
    <div className="rounded-xl border border-teal-100 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            The learner's question
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{learnerQuestion}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            What this chapter gives you
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{givesYou}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            What comes next
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{comesNext}</p>
        </div>
      </div>
    </div>
  );
}
