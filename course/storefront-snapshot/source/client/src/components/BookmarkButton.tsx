import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addBookmark, removeBookmark, isBookmarked } from "@/lib/bookmarks";

interface BookmarkButtonProps {
  chapterId: string;
  chapterTitle: string;
  url: string;
}

export default function BookmarkButton({ chapterId, chapterTitle, url }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(chapterId));

    const handleUpdate = () => {
      setBookmarked(isBookmarked(chapterId));
    };

    window.addEventListener('bookmarksUpdated', handleUpdate);
    return () => window.removeEventListener('bookmarksUpdated', handleUpdate);
  }, [chapterId]);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(chapterId);
    } else {
      addBookmark(chapterId, chapterTitle, url);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <Button
      onClick={toggleBookmark}
      variant={bookmarked ? "default" : "outline"}
      className={bookmarked ? "" : "border-2"}
      style={bookmarked ? { backgroundColor: '#2d5a69' } : { borderColor: '#3d7a8c', color: '#2d5a69' }}
      data-testid="button-bookmark"
    >
      <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  );
}
