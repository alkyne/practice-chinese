"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { WordEntry } from "@/lib/types";
import WordCard from "./WordCard";
import ToggleControls from "./ToggleControls";

interface StudyAppProps {
  words: WordEntry[];
}

export default function StudyApp({ words }: StudyAppProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showKorean, setShowKorean] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = words.length;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  if (total === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-400">
        CSV 파일을 words_csv 폴더에 넣어주세요.
      </div>
    );
  }

  const entry = words[currentIndex];

  return (
    <div
      className="flex min-h-screen flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ToggleControls
        showPinyin={showPinyin}
        showKorean={showKorean}
        showPatterns={showPatterns}
        onTogglePinyin={() => setShowPinyin((v) => !v)}
        onToggleKorean={() => setShowKorean((v) => !v)}
        onTogglePatterns={() => setShowPatterns((v) => !v)}
      />

      <main className="pt-20 pb-20 px-4">
        <div key={currentIndex} className="animate-fadeIn">
          <WordCard
            entry={entry}
            showPinyin={showPinyin}
            showKorean={showKorean}
            showPatterns={showPatterns}
          />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 pb-5 text-center text-base text-gray-400 dark:text-gray-600">
        {currentIndex + 1} / {total}
      </footer>
    </div>
  );
}
