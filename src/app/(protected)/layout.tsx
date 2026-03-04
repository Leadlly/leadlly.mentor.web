import React from "react";

import { redirect } from "next/navigation";

import { getCookie } from "@/actions/cookie_actions";
import Provider from "@/components/providers/Provider";
import QueryProvider from "@/components/providers/QueryProvider";

export const dynamic = "force-dynamic";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = await getCookie("token");

  if (!token) redirect("/login");

  return (
    <Provider>
      <QueryProvider>{children}</QueryProvider>
    </Provider>
  );
};

export default ProtectedLayout;
