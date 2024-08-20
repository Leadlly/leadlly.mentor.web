import { getCookie } from "./cookie_actions";

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
        // cache: "force-cache",
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
        // cache: "force-cache",
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
  }
  