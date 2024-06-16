import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import Sidebar from "@/components/shared/Sidebar";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
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
    <div className={"flex text-black h-full"}>
      <div className="no-scrollbar md:h-[calc(100dvh-120px)]">
      <Sidebar id={studentId} />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
