export type ChapterSheetStatus = "not_started" | "running" | "completed";

export interface PlannedChapter {
  chapterId: string;
  chapterName: string;
  sequenceOrder: number;
  plannedLectureCount: number;
  expectedStartDate: string;
  chapterStatus?: ChapterSheetStatus;
}

export interface ChapterPlanRecord {
  _id: string;
  batch: string | { _id: string; name?: string; standard?: string };
  subject: string;
  weeklyLectureLoad?: number;
  academicSession?: string;
  courseCompletionDate?: string | null;
  chapters: PlannedChapter[];
  createdAt: string;
  updatedAt: string;
}

export interface ChapterPlanResponse {
  success: boolean;
  plan: ChapterPlanRecord | null;
  canEdit?: boolean;
  class?: {
    _id: string;
    subject: string;
    batch: { _id: string; name: string; standard: string };
  };
  message?: string;
}

export interface ChapterPlanSheetRow {
  slNo: number;
  chapterId: string;
  topicName: string;
  plannedLectureCount: number;
  expectedStartDate: string | null;
  actualLectureCount: number;
  actualStartDate: string | null;
  chapterStatus: ChapterSheetStatus;
  sheetStatus?: ChapterSheetStatus | string;
}

export interface ChapterPlanSheet {
  success: boolean;
  batch: { _id: string; name: string; standard: string; subjects: string[] };
  subject: string;
  plan: ChapterPlanRecord | null;
  rows: ChapterPlanSheetRow[];
  weeklyLectureLoad: number;
  academicSession: string;
  courseCompletionDate: string | null;
  totalLecturesRequired: number;
  message?: string;
}
