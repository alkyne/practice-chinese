"use client";

import { WordEntry } from "@/lib/types";

interface WordCardProps {
  entry: WordEntry;
  showPinyin: boolean;
  showKorean: boolean;
}

export default function WordCard({
  entry,
  showPinyin,
  showKorean,
}: WordCardProps) {

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

    </div>
  );
}
