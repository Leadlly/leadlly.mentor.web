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
      const user = await getUser(); 

      if (user && user.status === "Verified") {
        return NextResponse.redirect(new URL("/", request.nextUrl)); 
      } else {
        return NextResponse.next(); 
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
  ],
};
