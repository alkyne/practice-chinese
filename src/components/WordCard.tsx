"use client";

import { WordEntry } from "@/lib/types";

interface WordCardProps {
  entry: WordEntry;
  showPinyin: boolean;
  showKorean: boolean;
  showPatterns: boolean;
}

export default function WordCard({
  entry,
  showPinyin,
  showKorean,
  showPatterns,
}: WordCardProps) {
  const hasPatterns = entry.patterns.length > 0 || entry.learningPoints.length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Word header */}
      <div className="mb-8 text-center">
        <h1 className="text-[3.45rem] font-bold text-gray-900 dark:text-gray-50 sm:text-[4.3rem]">
          {entry.word}
        </h1>
        <p
          className={`mt-2 text-xl transition-opacity duration-200 ${
            showPinyin
              ? "text-indigo-500 dark:text-indigo-400"
              : "text-transparent select-none"
          }`}
        >
          {entry.pinyin}
        </p>
        <p
          className={`mt-1 text-lg transition-opacity duration-200 ${
            showKorean
              ? "text-gray-500 dark:text-gray-400"
              : "text-transparent select-none"
          }`}
        >
          {entry.meaning}
        </p>
      </div>

      {/* Example sentences */}
      <div className="space-y-6">
        {entry.examples.map((ex, i) => (
          <div key={i} className="text-center">
            <p className="text-[1.44rem] text-gray-800 dark:text-gray-100 sm:text-[1.725rem]">
              {ex.chinese}
            </p>
            <p
              className={`mt-1 text-base transition-opacity duration-200 ${
                showPinyin
                  ? "text-indigo-400 dark:text-indigo-300"
                  : "text-transparent select-none"
              }`}
            >
              {ex.pinyin}
            </p>
            <p
              className={`mt-0.5 text-base transition-opacity duration-200 ${
                showKorean
                  ? "text-gray-400 dark:text-gray-500"
                  : "text-transparent select-none"
              }`}
            >
              {ex.korean}
            </p>
          </div>
        ))}
      </div>

      {/* Patterns & Learning Points */}
      {hasPatterns && showPatterns && (
        <div className="mt-8 rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
          {entry.patterns.length > 0 && (
            <div className="mb-3">
              <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                자주 쓰는 패턴
              </h3>
              <div className="flex flex-wrap gap-2">
                {entry.patterns.map((p, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-indigo-50 px-3 py-1 text-base text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {entry.learningPoints.length > 0 && (
            <div>
              <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                학습 포인트
              </h3>
              <ul className="space-y-1">
                {entry.learningPoints.map((lp, i) => (
                  <li
                    key={i}
                    className="text-base leading-relaxed text-gray-600 dark:text-gray-400"
                  >
                    {lp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
