"use server";

import { getCookie } from "./cookie_actions";

export const getPresignedUploadUrl = async (params: {
  fileName: string;
  fileType: string;
  folder?: string;
}) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/upload/presigned-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify(params),
        credentials: "include",
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to get upload URL" };
    }

    return {
      success: true,
      putUrl: data.putUrl as string,
      fileUrl: data.fileUrl as string,
      key: data.key as string,
    };
  } catch (error: unknown) {
    console.error("Error getting presigned URL:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
