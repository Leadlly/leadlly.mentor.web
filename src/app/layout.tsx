import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getUser } from "@/actions/user_actions";
import { SocketProvider } from "@/contexts/socket/socketProvider";

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
      <body
        className={cn(
          "font-sans antialiased custom__scrollbar",
          fontSans.variable
        )}
      >
      <SocketProvider>
        <StoreProvider user={userData?.user}>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <main className="">{children}</main>
            <Toaster richColors position="top-center" />
          </GoogleOAuthProvider>
        </StoreProvider>
      </SocketProvider>
      </body>
    </html>
  );
}
