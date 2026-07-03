import { Clock } from "lucide-react";

interface ReadingTimeEstimateProps {
  minutes: number;
  className?: string;
}

export default function ReadingTimeEstimate({ minutes, className = "" }: ReadingTimeEstimateProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 ${className}`}>
      <Clock className="w-4 h-4 text-gray-600" />
      <span className="text-sm text-gray-700">
        {minutes} min read
      </span>
    </div>
  );
}
