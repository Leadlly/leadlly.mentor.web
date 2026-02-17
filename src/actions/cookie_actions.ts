"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(name)?.value;

  if (!token) redirect("/login");

  return token;
};
