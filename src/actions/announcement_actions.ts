"use server";

import { getCookie } from "./cookie_actions";

export const createAnnouncement = async (formData: {
  content: string;
  batchId?: string;
  classId?: string;
  attachment?: { title: string; fileUrl: string; fileType: string };
}) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/announcement/create`,
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
    console.error("Error creating announcement:", error);
    return { success: false, message: error.message };
  }
};

export const getAnnouncements = async (query: {
  batchId?: string;
  classId?: string;
}) => {
  const token = await getCookie("token");
  const searchParams = new URLSearchParams();
  if (query.batchId) searchParams.append("batchId", query.batchId);
  if (query.classId) searchParams.append("classId", query.classId);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/announcement/all?${searchParams.toString()}`,
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
    console.error("Error fetching announcements:", error);
    return { success: false, announcements: [] };
  }
};
