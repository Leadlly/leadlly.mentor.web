export const SUBJECT_OPTIONS = ["Physics", "Chemistry", "Maths", "Biology"] as const;

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
