"use server";

import { ChapterPlanResponse } from "@/helpers/types/chapter-plan";

import { getCookie } from "./cookie_actions";

export const getChapterPlanByClass = async (
  classId: string
): Promise<ChapterPlanResponse> => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/chapter-plan/class/${classId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );
    return await res.json();
  } catch {
    return { success: false, plan: null, message: "Failed to load chapter plan" };
  }
};
