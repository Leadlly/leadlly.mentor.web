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

export const getClassLectures = async (
  classId: string,
  page = 1,
  limit = 10
) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/lecture/class/${classId}?page=${page}&limit=${limit}`,
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

    if (!res.ok) {
      if (res.status === 404)
        return { lectures: [], pagination: null };
      return { lectures: [], pagination: null };
    }

    const data = await res.json();
    return {
      lectures: data.lectures || [],
      pagination: data.pagination || null,
    };
  } catch {
    return { lectures: [], pagination: null };
  }
};

export const createTodaysWork = async (payload: {
  classId: string;
  batchId: string;
  chapter: Array<{ _id: string; name: string }>;
  topics: Array<{
    _id: string;
    name: string;
    subItems?: Array<{ _id: string; name: string }>;
  }>;
  subtopics?: Array<{ _id: string; name: string }>;
  duration: number;
}) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/lecture/todays-work`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to save today's work");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while saving today's work");
  }
};

export const getTodaysLecture = async (classId: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/lecture/todays-work/${classId}`,
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

    const data = await res.json();

    if (!res.ok) return null;

    return data.lecture || null;
  } catch {
    return null;
  }
};

export const updateTodaysWork = async (
  lectureId: string,
  payload: {
    chapter: Array<{ _id: string; name: string }>;
    topics: Array<{
      _id: string;
      name: string;
      subItems?: Array<{ _id: string; name: string }>;
    }>;
    subtopics?: Array<{ _id: string; name: string }>;
    duration: number;
  }
) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/lecture/todays-work/${lectureId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update today's work");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while updating today's work");
  }
};
