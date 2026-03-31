"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { WordEntry } from "@/lib/types";
import WordCard from "./WordCard";
import ToggleControls from "./ToggleControls";

interface StudyAppProps {
  words: WordEntry[];
}

export default function StudyApp({ words }: StudyAppProps) {
  const [shuffled, setShuffled] = useState(words);

  useEffect(() => {
    setShuffled([...words].sort(() => Math.random() - 0.5));
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showKorean, setShowKorean] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = shuffled.length;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

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

  const entry = shuffled[currentIndex];
  const hasPatterns = entry.patterns.length > 0 || entry.learningPoints.length > 0;

  return (
    <div
      className="min-h-screen flex flex-col"
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

      <main className="flex flex-1 items-center justify-center py-20 px-6">
        {/* Wrapper: relative so the panel can absolute-position outside it */}
        <div className="relative w-full max-w-2xl">

          {/* Patterns panel — absolutely outside the wrapper to the left, never shifts word card */}
          {showPatterns && hasPatterns && (
            <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-20 w-80 rounded-lg border border-gray-200 bg-white/90 p-5 shadow-md backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/90">
              {entry.patterns.length > 0 && (
                <div className="mb-4">
                  <h3 className="mb-2 text-[1rem] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    패턴
                  </h3>
                  <div className="flex flex-col gap-2">
                    {entry.patterns.map((p, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-indigo-50 px-3 py-1.5 text-[1.44rem] text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {entry.learningPoints.length > 0 && (
                <div>
                  <h3 className="mb-2 text-[1rem] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    학습 포인트
                  </h3>
                  <ul className="space-y-2">
                    {entry.learningPoints.map((lp, i) => (
                      <li key={i} className="text-[1.15rem] leading-relaxed text-gray-600 dark:text-gray-400">
                        {lp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Word card — always same position */}
          <div key={currentIndex} className="animate-fadeIn">
            <WordCard
              entry={entry}
              showPinyin={showPinyin}
              showKorean={showKorean}
            />
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 pb-5 text-center text-base text-gray-400 dark:text-gray-600">
        {currentIndex + 1} / {total}
      </footer>
    </div>
  );
}
