"use server";

import { getCookie } from "./cookie_actions";

export const markAttendance = async (formData: {
  batchId: string;
  classId: string;
  attendance: { studentId: string; status: "present" | "absent" }[];
  date?: string;
}) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/attendance/mark`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify(formData),
        credentials: "include",
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error marking attendance:", error);
    return { success: false, message: error.message };
  }
};

export const getAttendance = async (query: {
  batchId: string;
  classId: string;
  date?: string;
}) => {
  const token = await getCookie("token");
  const searchParams = new URLSearchParams();
  searchParams.append("batchId", query.batchId);
  searchParams.append("classId", query.classId);
  if (query.date) searchParams.append("date", query.date);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/attendance/get?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching attendance:", error);
    return { success: false, attendance: null };
  }
};
