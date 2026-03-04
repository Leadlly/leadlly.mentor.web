"use server";

import { ILectureProps } from "@/helpers/types";

import { getCookie } from "./cookie_actions";

export const getLectures = async (timeframe = "all") => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/lecture/all?timeframe=${timeframe}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "force-cache",
        next: {
          tags: ["teacher-report"],
          revalidate: 60 * 60 * 24,
        },
      }
    );

    const data: {
      count: number;
      lectures: ILectureProps[];
      message: string;
      success: boolean;
      timeframe: string;
    } = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching lectures: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching lectures!");
    }
  }
};
