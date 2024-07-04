// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./actions/user_actions";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = getTokenFromStorage(request);

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verify" ||
    path === "/forgot-password";


  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (token && !isPublicPath) {
    try {
      const userData = await getUser(); 

      const isVerified = userData.user.status === "Verified"

      if (!isVerified && path !== "/status") {
        return NextResponse.redirect(new URL("/status", request.nextUrl));
      }
  
      if (isVerified && path === "/status") {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return NextResponse.next(); 
}

function getTokenFromStorage(request: NextRequest) {
  const cookies = request.cookies;
  const token = cookies.get("token");
  return token;
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/verify",
    "/resetpassword/:path*",
    "/forgot-password",
    "/",
    "/status"
  ],
};
