import React from "react";

import { Metadata } from "next";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Leadlly | Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={cn("min-h-screen")}>{children}</div>;
}
