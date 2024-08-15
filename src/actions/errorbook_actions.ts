"use server"
import { getCookie  } from "./cookie_actions";  


export const getErrorBook = async (id: any) => {
    const token = await getCookie("token");
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/student/errorBook/get/${id}`;
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        // cache: "force-cache",
        // next: {
        //   tags: ["errorBook Data"],
        // },
        credentials: "include",
      });
  
  
      const responseData = await res.json();
      return responseData;
    } catch (error) {
      console.error(`Error in fetching planner ${(error as Error).message}`);
      throw new Error(`Error in fetching planner ${(error as Error).message}`);
    }
  };