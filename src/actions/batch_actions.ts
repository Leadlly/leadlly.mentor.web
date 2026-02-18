"use server";

import { IClassProps } from "@/helpers/types";

import { getCookie } from "./cookie_actions";

export const getBatches = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/class/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "force-cache",
        next: {
          tags: ["batches"],
          revalidate: 30,
        },
      }
    );
    if (!res.ok && res.status === 404) {
      return [];
    }

    const data: {
      message: string;
      class: IClassProps[];
    } = await res.json();

    return data.class;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching batches: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching batches!");
    }
  }
};
