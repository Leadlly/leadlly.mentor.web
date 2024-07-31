"use client"
import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import Sidebar from "@/components/shared/Sidebar";
import MobileMenu from "@/components/shared/MobileMenu";
import MessageBox from "@/components/shared/MessageBox";
import { useState } from "react";
import Popup from "./components/ListComponent";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

const metadata: Metadata = {
  title: "Leadlly",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

export default function RootLayout({
  children,
  params: { studentId },
}: {
  children: React.ReactNode;
  params: { studentId: string };
}) {
  return (
    <>
      <section>
        <div className={"flex text-black h-full relative"}>
          <div className="no-scrollbar h-[calc(100dvh-120px)] md:block hidden">
            <Sidebar id={studentId} />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </section>

      <section className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.1)] overflow-hidden">
        <MobileMenu id={studentId} />
      </section>
    </>
  );
}
