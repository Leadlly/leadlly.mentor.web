import { Metadata } from "next";
import React from "react";
import { Mada as FontSans } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "sonner";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leadlly | Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <StoreProvider>
        <div className={cn("h-main-height", fontSans.variable)}>
          {children}
        </div>
        <Toaster richColors position="top-center" />
      </StoreProvider>
    </GoogleOAuthProvider>
      </body>
      
    </html>
    
  );
}
