export const SUBJECT_OPTIONS = ["Physics", "Chemistry", "Maths", "Biology"] as const;

export const COMPETITIVE_EXAM_OPTIONS = [
  { value: "jee", label: "JEE" },
  { value: "neet", label: "NEET" },
  { value: "boards", label: "Board" },
] as const;

export function formatCompetitiveExamLabel(exam?: string | null): string {
  if (!exam) return "";
  switch (exam.toLowerCase()) {
    case "jee":
      return "JEE";
    case "neet":
      return "NEET";
    case "boards":
    case "board":
      return "Board";
    default:
      return exam.toUpperCase();
  }
}

export function formatBatchMetaLabel(
  standard: string | number | null | undefined,
  competitiveExam?: string | null
): string {
  const std = formatStdLabel(standard);
  const exam = formatCompetitiveExamLabel(competitiveExam);
  if (std === "N/A") return exam || std;
  return exam ? `${std} · ${exam}` : std;
}

export function formatStandardLabel(
  standard: string | number | null | undefined
): string {
  if (standard == null || standard === "") return "N/A";
  const s = String(standard).trim();
  if (s === "13") return "Dropper";
  return s;
}

export function formatStdLabel(
  standard: string | number | null | undefined
): string {
  const label = formatStandardLabel(standard);
  if (label === "N/A") return label;
  if (label === "Dropper") return "Dropper";
  return `Std ${label}`;
}

export function formatClassLabel(
  standard: string | number | null | undefined
): string {
  const label = formatStandardLabel(standard);
  if (label === "N/A") return label;
  if (label === "Dropper") return "Dropper";
  return `Class ${label}`;
}
