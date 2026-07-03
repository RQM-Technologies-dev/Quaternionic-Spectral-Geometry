import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, Book, Wrench, FileText, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { searchContent, type SearchableContent } from "@shared/searchIndex";

interface ContentSearchProps {
  className?: string;
  placeholder?: string;
}

export default function ContentSearch({ className, placeholder = "Search chapters, tools, resources..." }: ContentSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();

  // Local search using search index
  const results = useMemo(() => {
    if (query.length < 2) return [];
    return searchContent(query);
  }, [query]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : results.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          const result = results[selectedIndex];
          setQuery("");
          setIsOpen(false);
          setSelectedIndex(-1);
          setLocation(result.url);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchableContent) => {
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    setLocation(result.url);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'chapter':
        return <Book className="w-4 h-4" style={{ color: '#2d5a69' }} />;
      case 'tool':
        return <Wrench className="w-4 h-4" style={{ color: '#3d7a8c' }} />;
      case 'resource':
        return <Award className="w-4 h-4" style={{ color: '#4d9aaf' }} />;
      case 'page':
        return <FileText className="w-4 h-4" style={{ color: '#1a3b47' }} />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDifficultyBadge = (difficulty?: string) => {
    if (!difficulty) return null;

    const colors = {
      Beginner: "bg-emerald-100 text-emerald-700 border-emerald-300",
      Intermediate: "bg-blue-100 text-blue-700 border-blue-300",
      Advanced: "bg-purple-100 text-purple-700 border-purple-300"
    };

    return (
      <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[difficulty as keyof typeof colors]}`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 w-full bg-white border-gray-300 focus:border-[#3d7a8c] focus:ring-[#3d7a8c]/20"
          data-testid="content-search-input"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
            data-testid="search-clear"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto" style={{ borderColor: '#3d7a8c' }}>
          {results.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-500" data-testid="search-no-results">
              <p className="font-semibold">No results found</p>
              <p className="text-sm mt-1">Try different keywords or browse by category</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </div>
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={() => handleResultClick(result)}
                >
                  <div
                    className={cn(
                      "px-4 py-3 hover:bg-cyan-50 cursor-pointer transition-colors",
                      selectedIndex === index && "bg-cyan-100 border-l-4"
                    )}
                    style={selectedIndex === index ? { borderColor: '#2d5a69' } : {}}
                    data-testid={`search-result-${index}`}
                  >
                    <div className="flex items-start gap-3">
                      {getResultIcon(result.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {result.title}
                          </h4>
                          {getDifficultyBadge(result.difficulty)}
                        </div>
                        {result.subtitle && (
                          <p className="text-xs text-gray-600 italic mb-1">
                            {result.subtitle}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {result.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {result.type}
                          </span>
                          {result.category && (
                            <span className="text-xs text-gray-400">
                              {result.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {results.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
              <span>Press ↑↓ to navigate, Enter to select, Esc to close</span>
              <span className="font-semibold">{results.length} of {results.length}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
