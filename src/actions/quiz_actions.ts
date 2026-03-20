"use server";

import { getCookie } from "./cookie_actions";

interface CreateQuizParams {
  classId: string;
  batchId: string;
  instituteId?: string;
  subject: string;
  chapterId: string;
  chapterName: string;
  topicIds: string[];
  questionsNumber: number;
  endDate?: string;
}

export const createQuizForClass = async (params: CreateQuizParams) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/quiz/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        body: JSON.stringify(params),
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to create quiz",
      };
    }

    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (error: unknown) {
    console.error("Error creating quiz:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const getClassQuizzes = async (query: { classId: string; date?: string }) => {
  const token = await getCookie("token");
  const searchParams = new URLSearchParams();
  searchParams.append("classId", query.classId);
  if (query.date) searchParams.append("date", query.date);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/quiz/list?${searchParams.toString()}`,
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
    return data;
  } catch (error: unknown) {
    console.error("Error fetching quizzes:", error);
    return { success: false, quizzes: [] };
  }
};

export const deleteQuiz = async (id: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/quiz/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error("Error deleting quiz:", error);
    return { success: false, message: error instanceof Error ? error.message : "Something went wrong" };
  }
};

export const getQuiz = async (id: string, attempted: string) => {
  const token = await getCookie("token");
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/student/quiz/weeklyQuiz/get/${id}?attempted=${attempted}`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      next: {
        tags: ["Quiz Data"],
      },
      credentials: "include",
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error(`Error in fetching Quiz ${(error as Error).message}`);
    throw new Error(`Error in fetching Quiz ${(error as Error).message}`);
  }
};

export const getChapterQuiz = async (id: string, attempted: string) => {
  const token = await getCookie("token");
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/student/quiz/chapter/get/${id}?attempted=${attempted}`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      next: {
        tags: ["Quiz Data"],
      },
      credentials: "include",
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error(`Error in fetching Quiz ${(error as Error).message}`);
    throw new Error(`Error in fetching Quiz ${(error as Error).message}`);
  }
};
