"use server"
import { getCookie  } from "./cookie_actions";  


export const getErrorBook = async (id: string) => {
    const token = await getCookie("token");
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/student/errorBook/get/${id}`;
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        cache: "force-cache",
        next: {
          tags: ["errorBook Data"],
        },
        credentials: "include",
      });
  
  
      const responseData = await res.json();
      return responseData;
    } catch (error) {
      console.error(`Error in fetching planner ${(error as Error).message}`);
      throw new Error(`Error in fetching planner ${(error as Error).message}`);
    }
  };

  export const getChapterErrorBook = async ({ chapter, id }: { chapter: string, id: string }) => {
    const token = await getCookie("token");
    try {
      const url = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/student/errorBook/chapter/get/${id}?chapter=${chapter}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `token=${token}`,
        },
        credentials: "include",
        next: {
          tags: ["chapterErrorBookData", chapter],
        },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const responseData = await res.json();
      return responseData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching Error Book: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching Error Book!");
      }
    }
  };
