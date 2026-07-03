import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Printer } from "lucide-react";

/**
 * Floating toolbar that appears on chapter pages and provides a "Save as PDF"
 * action. Uses the existing print stylesheet — the user's browser print dialog
 * has a "Save as PDF" destination on every modern OS.
 *
 * Mounted once at the App level so we don't have to edit each of the 13
 * chapter pages.
 */
export default function ChapterToolbar() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(
      location.startsWith("/learn/quaternionic-signal-processing/chapter/") ||
      location.startsWith("/learn/quantum-computing/chapter/"),
    );
  }, [location]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex flex-col gap-2 no-print"
      data-testid="chapter-toolbar"
    >
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white shadow-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-quantum-blue transition-colors"
        title="Print or save this chapter as PDF"
        aria-label="Print or save this chapter as PDF"
        data-testid="button-print-chapter"
      >
        <Printer className="w-3.5 h-3.5" />
        Save as PDF
      </button>
    </div>
  );
}
