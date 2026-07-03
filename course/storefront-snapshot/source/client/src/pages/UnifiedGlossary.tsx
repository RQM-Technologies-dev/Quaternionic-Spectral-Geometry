import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Search } from "lucide-react";
import { globalGlossary } from "@/data/qc-course/globalGlossary";
import { qspGlossary } from "@/data/qsp-course/glossary";

type Course = "all" | "qsp" | "qc";

interface Entry {
  term: string;
  def: string;
  chapter: number;
  course: "qsp" | "qc";
}

const allEntries: Entry[] = [
  ...qspGlossary.map(e => ({ ...e, course: "qsp" as const })),
  ...globalGlossary.map(e => ({ ...e, course: "qc" as const })),
].sort((a, b) => a.term.toLowerCase().localeCompare(b.term.toLowerCase()));

const courseMeta = {
  qsp: { label: "QSP", color: "#7c3aed", bg: "rgba(124,58,237,0.1)", path: "/learn/quaternionic-signal-processing/chapter/" },
  qc: { label: "QC", color: "#0d9488", bg: "rgba(13,148,136,0.1)", path: "/learn/quantum-computing/chapter/" },
};

export default function UnifiedGlossary() {
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState<Course>("all");

  useEffect(() => {
    document.title = "Glossary | RQM Technologies";
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allEntries.filter(e => {
      if (filterCourse !== "all" && e.course !== filterCourse) return false;
      if (!q) return true;
      return e.term.toLowerCase().includes(q) || e.def.toLowerCase().includes(q);
    });
  }, [search, filterCourse]);

  // Group by first letter for alphabetical browsing
  const grouped = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const e of filtered) {
      const letter = e.term[0]?.toUpperCase() ?? "?";
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(e);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-8" style={{ background: "linear-gradient(135deg, #0a1e28 0%, #1a3b47 100%)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/learn">
            <span className="flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm cursor-pointer mb-4">
              <ArrowLeft className="w-4 h-4" /> Learn Hub
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white">Unified Glossary</h1>
          <p className="text-gray-300 mt-2 text-sm">
            {allEntries.length} terms across the QSP and QC courses — sorted alphabetically.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-indigo-400"
              placeholder="Search terms or definitions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-glossary-search"
            />
          </div>
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
            {(["all", "qsp", "qc"] as Course[]).map(opt => (
              <button
                key={opt}
                onClick={() => setFilterCourse(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterCourse === opt ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
                data-testid={`button-filter-${opt}`}
              >
                {opt === "all" ? "All" : opt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* A–Z jump bar */}
        {grouped.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-6 bg-white p-3 rounded-xl border border-gray-200">
            {grouped.map(([letter]) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        )}

        {/* Results */}
        {grouped.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No terms match your search.</p>
        ) : (
          <div className="space-y-8">
            {grouped.map(([letter, entries]) => (
              <div key={letter} id={`letter-${letter}`}>
                <h2 className="text-2xl font-bold text-gray-300 mb-3 sticky top-16 bg-gray-50/95 backdrop-blur-sm py-2 z-10">
                  {letter}
                </h2>
                <div className="space-y-3">
                  {entries.map(e => {
                    const meta = courseMeta[e.course];
                    return (
                      <div
                        key={`${e.course}-${e.term}`}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h3 className="font-bold text-gray-800 text-sm">{e.term}</h3>
                          <Link href={`${meta.path}${e.chapter}`}>
                            <span
                              className="text-xs font-semibold px-2 py-0.5 rounded-full cursor-pointer flex-shrink-0 hover:opacity-80"
                              style={{ color: meta.color, backgroundColor: meta.bg }}
                            >
                              {meta.label} · Ch. {e.chapter}
                            </span>
                          </Link>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{e.def}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
