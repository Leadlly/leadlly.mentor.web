import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import "../globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Container } from "@/components";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import { getUser } from "@/actions/user_actions";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leadlly",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getUser();
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <StoreProvider user={userData?.user}>
        <div className="lg:hidden">
            <Navbar/>
            </div>
          <div
            className="max-w-7xl w-full mx-auto flex items-start gap-3 px-0 flex-col h-screen overflow-hidden
          <Container
            className="py-3 flex items-start gap-3 flex-col h-screen overflow-hidden"
          > 
            {/*h-screen overflow-hidden*/}
            <main className="flex-1 h-main-height w-full">{children}</main>
           </Container>
          </div>
        </StoreProvider>
      </body>
    </html>
       

  );
}
