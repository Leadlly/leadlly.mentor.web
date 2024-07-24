"use server";

import {
  ForgotPasswordProps,
  ResetPasswordProps,
  SignUpDataProps,
  MentorPersonalInfoProps
} from "@/helpers/types";
import { getCookie } from "./cookie_actions";
import { revalidateTag } from "next/cache";
// import { Student } from "@/helpers/types";

import apiClient from "@/apiClient/apiClient";
import { error } from "console";

export const signUpUser = async (data: SignUpDataProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error registering user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while registering user!");
    }
  }
};

export const resendOtp = async (email: string) => {
  try {
    const res = await apiClient.post("/api/auth/resend", { email });

    const data = res.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error re-sending OTP: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while re-sending OTP!");
    }
  }
};

export const forgotPassword = async (data: ForgotPasswordProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/auth/forgetpassword`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Error sending password resetting link: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while sending password resetting link!"
      );
    }
  }
};

export const resetPassword = async (
  data: ResetPasswordProps,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/auth/resetpassword/${token}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error resetting password: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while resetting password!");
    }
  }
};

export const getUser = async () => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/auth/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "force-cache",
        next: {
          tags: ["userData"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching logged in user: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching logged in user"
      );
    }
  }
};

export const mentorPersonalInfo = async (data: any) => {
  const token = await getCookie("token");
  console.log(data, "here")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/user/info/save`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    const responseData = await res.json();
    revalidateTag('userData')

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in saving student info: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while saving student info");
    }
  }
};

export const getAllStudents = async () => {
  const token = await getCookie("token");

  try {
    const endpoint = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/user/getstudents`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      // cache: "force-cache",
      // next: {
      //   tags: ["allocatedStudents"],
      // },
      credentials: "include",
    });

    console.log(res)
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`status: ${res.status}, response: ${errorText}`); 
      throw new Error(`status: ${res.status}, response: ${errorText}`);
    }

    const responseData = await res.json();
    console.log("Fetched data:", responseData);

    return responseData;
  } catch (error) {
    console.error("Error in fetching student info:", (error as Error).message);
    throw new Error(`Error in fetching student info: ${(error as Error).message}`);
  }
};

export const Studentinfo = async (id:string) => {
  const token = await getCookie("token");

  try {
    const endpoint = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/user/getstudents?studentId=${id}`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      // cache: "force-cache",
      // next: {
      //   tags: ["allocatedStudents"],
      // },
      credentials: "include",
    });

    console.log(res)
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`status: ${res.status}, response: ${errorText}`); 
      throw new Error(`status: ${res.status}, response: ${errorText}`);
    }

    const responseData = await res.json();
    console.log("Fetched data:", responseData);

    return responseData;
  } catch (error) {
    console.error("Error in fetching student info:", (error as Error).message);
    throw new Error(`Error in fetching student info: ${(error as Error).message}`);
  }
};

export const getplanner = async (id:any) => {
  const token = await getCookie("token")
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/student/planner/get/${id}`
    const res = await fetch(endpoint,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      cache: "force-cache",
      next: {
        tags: ["allocatedStudents"],
      },
      credentials: "include",
    })

    if(!res.ok){
     const errortext =await res.text();
     console.error(`status: ${res.status}, response: ${errortext}`)
     throw new Error(`status: ${res.status}, response: ${errortext}`)
    }

    const responseData =await res.json();
    console.log("fteched data", responseData)
    return responseData

  } catch (error) {
    console.error(`Error in fetching planner ${(error as Error).message}` )
    throw new Error(`Error in fetching planner ${(error as Error).message}` )

  }

}

export const getTracker = async (subject: string | string[],id:any) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/student/tracker/get/${id}?subject=${subject}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        next: {
          tags: ["userTracker"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching user tracker: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching user tracker!");
    }
  }
};

