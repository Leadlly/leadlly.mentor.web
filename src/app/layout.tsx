import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leadlly Mentor",
  description:
    "Leadlly Mentor is a platform for mentors to connect with students and provide guidance and support.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased custom__scrollbar",
          fontSans.variable
        )}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <main className="">{children}</main>
          <Toaster richColors position="top-center" />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
