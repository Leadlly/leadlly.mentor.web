import React from "react";

import { redirect } from "next/navigation";

import { getCookie } from "@/actions/cookie_actions";
import Provider from "@/components/providers/Provider";
import QueryProvider from "@/components/providers/QueryProvider";
import BlockedScreen from "@/components/BlockedScreen";

export const dynamic = "force-dynamic";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = await getCookie("token");

  if (!token) redirect("/login");

  // Check if user is blocked before rendering the app
  let isBlocked = false;
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
        cache: "no-store",
      }
    );

    if (res.status === 403) {
      const data = await res.json().catch(() => ({}));
      const msg: string = data?.message ?? "";
      if (msg.toLowerCase().includes("cannot access this institute") || msg.toLowerCase().includes("blocked")) {
        isBlocked = true;
      }
    }
  } catch {
    // Network error — let Provider handle it gracefully
  }

  if (isBlocked) {
    return <BlockedScreen />;
  }

  return (
    <Provider>
      <QueryProvider>{children}</QueryProvider>
    </Provider>
  );
};

export default ProtectedLayout;
