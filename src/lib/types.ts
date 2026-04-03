export interface CSVFile {
  name: string;
  words: WordEntry[];
}

export interface WordEntry {
  number: number;
  word: string;
  pinyin: string;
  meaning: string;
  reading: string;
  examples: {
    chinese: string;
    korean: string;
    pinyin: string;
  }[];
  patterns: string[];
  learningPoints: string[];
}
