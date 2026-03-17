"use server";

import { revalidateTag, updateTag } from "next/cache";

import { error } from "console";

// import { Student } from "@/helpers/types";

import apiClient from "@/apiClient/apiClient";
import {
  ForgotPasswordProps,
  IMentorReportProps,
  MentorPersonalInfoProps,
  ResetPasswordProps,
  SignUpDataProps,
} from "@/helpers/types";

import { getCookie } from "./cookie_actions";

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

    const data: { success: boolean; user: MentorPersonalInfoProps } =
      await res.json();

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
    updateTag("userData");

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

    // if (!res.ok) {
    //   const errorText = await res.text();
    //   console.error(`status: ${res.status}, response: ${errorText}`);
    //   throw new Error(`status: ${res.status}, response: ${errorText}`);
    // }

    const responseData = await res.json();

    return responseData;
  } catch (error) {
    console.error("Error in fetching student info:", (error as Error).message);
    throw new Error(
      `Error in fetching student info: ${(error as Error).message}`
    );
  }
};

export const getInstituteStudents = async (instituteId: string) => {
  const token = await getCookie("token");

  try {
    const endpoint = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/institute/${instituteId}/students`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      credentials: "include",
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error in fetching institute students:", (error as Error).message);
    return { success: false, students: [] };
  }
};

export const Studentinfo = async (id: string) => {
  if (!id || id === "undefined") {
    throw new Error("Student ID is required");
  }

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

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`status: ${res.status}, response: ${errorText}`);
      throw new Error(`status: ${res.status}, response: ${errorText}`);
    }

    const responseData = await res.json();

    return responseData;
  } catch (error) {
    console.error("Error in fetching student info:", (error as Error).message);
    throw new Error(
      `Error in fetching student info: ${(error as Error).message}`
    );
  }
};

export const getplanner = async (id: any) => {
  const token = await getCookie("token");
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/student/planner/get/${id}`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      // cache: "force-cache",
      // next: {
      //   tags: ["plannerData"],
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

export const getTracker = async (subject: string | string[], id: any) => {
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

export const getTeacherReport = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/user/report`,
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

    const data: { success: boolean; data: IMentorReportProps } =
      await res.json();

    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching report: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching report!");
    }
  }
};

export const getTeacherDashboard = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/user/dashboard`,
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

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch dashboard");
    }

    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching dashboard: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching dashboard!");
  }
};
