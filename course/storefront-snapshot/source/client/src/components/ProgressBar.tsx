import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { getReadingProgress, getOverallProgress } from "@/lib/readingProgress";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(10);

  const updateProgress = () => {
    const data = getReadingProgress();
    setProgress(getOverallProgress());
    setCompletedCount(data.completedChapters);
    setTotalCount(data.totalChapters);
  };

  useEffect(() => {
    updateProgress();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'rqm_reading_progress') {
        updateProgress();
      }
    };

    // Listen for custom progress update events
    const handleProgressUpdate = () => {
      updateProgress();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('progressUpdated', handleProgressUpdate);

    // Refresh on window focus to catch any missed updates
    window.addEventListener('focus', updateProgress);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('progressUpdated', handleProgressUpdate);
      window.removeEventListener('focus', updateProgress);
    };
  }, []);

  return (
    <div className="bg-white border-2 rounded-lg p-6" style={{ borderColor: '#3d7a8c' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold" style={{ color: '#1a3b47' }}>
          Your Learning Progress
        </h3>
        <span className="text-sm font-semibold" style={{ color: '#2d5a69' }}>
          {completedCount} of {totalCount} chapters
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-full transition-all duration-500 rounded-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(to right, #2d5a69, #4d9aaf)'
          }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{progress}% Complete</span>
        {progress === 100 && (
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle className="w-4 h-4" />
            All chapters completed!
          </span>
        )}
      </div>
    </div>
  );
}
