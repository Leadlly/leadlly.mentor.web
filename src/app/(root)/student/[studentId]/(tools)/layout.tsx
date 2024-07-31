import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import Sidebar from "@/components/shared/Sidebar";
import MessageBox from "@/components/shared/MessageBox";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leadlly",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MessageBox />
      <div className="h-main-height w-full">{children}</div>
    </>
  );
}
