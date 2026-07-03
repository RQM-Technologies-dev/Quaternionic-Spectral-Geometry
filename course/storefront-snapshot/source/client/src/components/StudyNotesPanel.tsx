import { useState, useEffect, useCallback, useRef } from "react";
import { StickyNote, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { getStudyNote, saveStudyNote, deleteStudyNote } from "@/lib/studyNotes";

interface StudyNotesPanelProps {
  chapterId: string;
}

export default function StudyNotesPanel({ chapterId }: StudyNotesPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Load existing note
  useEffect(() => {
    const existingNote = getStudyNote(chapterId);
    if (existingNote) {
      setNote(existingNote.content);
    }
  }, [chapterId]);

  // Listen for external study note updates
  useEffect(() => {
    const handleUpdate = () => {
      const updatedNote = getStudyNote(chapterId);
      if (updatedNote) {
        setNote(updatedNote.content);
      } else {
        // Note was deleted externally
        setNote("");
      }
    };

    window.addEventListener('studyNotesUpdated', handleUpdate);
    return () => window.removeEventListener('studyNotesUpdated', handleUpdate);
  }, [chapterId]);

  // Auto-save with debounce
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (note.trim()) {
      saveTimeoutRef.current = setTimeout(() => {
        saveStudyNote(chapterId, note);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }, 1000); // Auto-save 1 second after typing stops
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [note, chapterId]);

  const handleSave = () => {
    saveStudyNote(chapterId, note);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDelete = () => {
    deleteStudyNote(chapterId);
    setNote("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg"
          style={{ backgroundColor: '#2d5a69' }}
          data-testid="button-open-notes"
        >
          <StickyNote className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-80 shadow-2xl border-2" style={{ borderColor: '#3d7a8c' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <StickyNote className="w-5 h-5" style={{ color: '#2d5a69' }} />
                <h3 className="font-semibold" style={{ color: '#1a3b47' }}>Study Notes</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
                data-testid="button-close-notes"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add your personal notes about this chapter..."
              className="min-h-[200px] mb-3 text-sm"
              data-testid="textarea-study-notes"
            />

            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="flex-1"
                style={{ backgroundColor: '#2d5a69' }}
                disabled={!note.trim()}
                data-testid="button-save-notes"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaved ? 'Saved!' : 'Save'}
              </Button>
              {note && (
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  data-testid="button-delete-notes"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
