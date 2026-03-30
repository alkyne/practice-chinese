import { parseCSV } from "@/lib/parse-csv";
import StudyApp from "@/components/StudyApp";

export default function Home() {
  const words = parseCSV();
  return <StudyApp words={words} />;
}
