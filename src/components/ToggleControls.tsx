"use client";

interface ToggleControlsProps {
  showPinyin: boolean;
  showKorean: boolean;
  showPatterns: boolean;
  onTogglePinyin: () => void;
  onToggleKorean: () => void;
  onTogglePatterns: () => void;
}

export default function ToggleControls({
  showPinyin,
  showKorean,
  showPatterns,
  onTogglePinyin,
  onToggleKorean,
  onTogglePatterns,
}: ToggleControlsProps) {
  return (
    <div className="fixed top-4 right-4 z-20 flex flex-col gap-2 rounded-lg bg-white/80 p-3 shadow-md backdrop-blur-sm dark:bg-slate-800/80">
      <label className="flex cursor-pointer items-center gap-2 text-base select-none">
        <input
          type="checkbox"
          checked={showPinyin}
          onChange={onTogglePinyin}
          className="h-4 w-4 accent-indigo-500"
        />
        <span className="text-gray-700 dark:text-gray-300">pinyin</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-base select-none">
        <input
          type="checkbox"
          checked={showKorean}
          onChange={onToggleKorean}
          className="h-4 w-4 accent-indigo-500"
        />
        <span className="text-gray-700 dark:text-gray-300">해석</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-base select-none">
        <input
          type="checkbox"
          checked={showPatterns}
          onChange={onTogglePatterns}
          className="h-4 w-4 accent-indigo-500"
        />
        <span className="text-gray-700 dark:text-gray-300">패턴/학습</span>
      </label>
    </div>
  );
}
