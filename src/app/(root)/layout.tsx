import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import "../globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Container } from "@/components";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "sonner";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leadlly",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Container
        className="md:py-3 flex items-start gap-3 flex-col h-screen overflow-hidden
          "
      >
        {/*h-screen overflow-hidden*/}
        <Navbar></Navbar>
        <section className="flex-1 h-main-height w-full">{children}</section>
      </Container>
      <Toaster richColors position="top-center" />
    </>
  );
}
