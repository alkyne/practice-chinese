import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { WordEntry, CSVFile } from "./types";

const COLUMN_MAP: Record<string, string> = {
  "번호": "number",
  "단어": "word",
  "병음": "pinyin",
  "뜻": "meaning",
  "음독": "reading",
  "예문1_중국어": "example1Chinese",
  "예문1_한국어": "example1Korean",
  "예문1_병음": "example1Pinyin",
  "예문2_중국어": "example2Chinese",
  "예문2_한국어": "example2Korean",
  "예문2_병음": "example2Pinyin",
  "예문3_중국어": "example3Chinese",
  "예문3_한국어": "example3Korean",
  "예문3_병음": "example3Pinyin",
  "자주쓰는패턴1": "pattern1",
  "자주쓰는패턴2": "pattern2",
  "자주쓰는패턴3": "pattern3",
  "학습포인트1": "learningPoint1",
  "학습포인트2": "learningPoint2",
};

function parseSingleCSV(filePath: string): WordEntry[] {
  let content = fs.readFileSync(filePath, "utf-8");

  // Strip UTF-8 BOM
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }

  const result = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data.map((row) => {
    const mapped: Record<string, string> = {};
    for (const [koreanKey, englishKey] of Object.entries(COLUMN_MAP)) {
      mapped[englishKey] = (row[koreanKey] ?? "").trim();
    }

    return {
      number: parseInt(mapped.number, 10) || 0,
      word: mapped.word,
      pinyin: mapped.pinyin,
      meaning: mapped.meaning,
      reading: mapped.reading,
      examples: [
        {
          chinese: mapped.example1Chinese,
          korean: mapped.example1Korean,
          pinyin: mapped.example1Pinyin,
        },
        {
          chinese: mapped.example2Chinese,
          korean: mapped.example2Korean,
          pinyin: mapped.example2Pinyin,
        },
        {
          chinese: mapped.example3Chinese,
          korean: mapped.example3Korean,
          pinyin: mapped.example3Pinyin,
        },
      ].filter((ex) => ex.chinese),
      patterns: [mapped.pattern1, mapped.pattern2, mapped.pattern3].filter(
        Boolean
      ),
      learningPoints: [mapped.learningPoint1, mapped.learningPoint2].filter(
        Boolean
      ),
    };
  });
}

export function parseAllCSVs(): CSVFile[] {
  const csvDir = path.join(process.cwd(), "words_csv");
  const files = fs.readdirSync(csvDir).filter((f) => f.endsWith(".csv"));

  return files.map((f) => ({
    name: f.replace(/\.csv$/i, ""),
    words: parseSingleCSV(path.join(csvDir, f)),
  }));
}
