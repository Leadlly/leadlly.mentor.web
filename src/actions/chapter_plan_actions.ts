"use server";

import { cookies } from "next/headers";

import { ChapterPlanResponse, ChapterPlanSheet } from "@/helpers/types/chapter-plan";

async function headers() {
  const token = (await cookies()).get("token")?.value;
  return {
    "Content-Type": "application/json",
    Cookie: token ? `token=${token}` : "",
  };
}

export const getChapterPlanByClass = async (
  classId: string
): Promise<ChapterPlanResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/chapter-plan/class/${classId}`,
      {
        method: "GET",
        headers: await headers(),
        credentials: "include",
        cache: "no-store",
      }
    );
    return await res.json();
  } catch {
    return { success: false, plan: null, message: "Failed to load chapter plan" };
  }
};

export const getChapterPlanSheet = async (
  batchId: string,
  subject: string
): Promise<ChapterPlanSheet> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/chapter-plan/sheet?batchId=${batchId}&subject=${encodeURIComponent(subject)}`,
      {
        method: "GET",
        headers: await headers(),
        credentials: "include",
        cache: "no-store",
      }
    );
    return await res.json();
  } catch {
    return {
      success: false,
      batch: { _id: "", name: "", standard: "", subjects: [] },
      subject,
      plan: null,
      rows: [],
      weeklyLectureLoad: 5,
      academicSession: "",
      courseCompletionDate: null,
      totalLecturesRequired: 0,
      message: "Failed to load course planner",
    };
  }
};
