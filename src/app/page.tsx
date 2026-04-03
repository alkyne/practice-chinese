import { parseAllCSVs } from "@/lib/parse-csv";
import StudyApp from "@/components/StudyApp";

export default function Home() {
  const csvFiles = parseAllCSVs();
  return <StudyApp csvFiles={csvFiles} />;
}
