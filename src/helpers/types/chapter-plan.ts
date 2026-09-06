export interface PlannedChapter {
  chapterId: string;
  chapterName: string;
  sequenceOrder: number;
  plannedLectureCount: number;
  expectedStartDate: string;
}

export interface ChapterPlanRecord {
  _id: string;
  batch: string | { _id: string; name?: string; standard?: string };
  subject: string;
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
