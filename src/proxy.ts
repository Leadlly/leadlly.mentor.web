// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getUser } from "./actions/user_actions";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = getTokenFromStorage(request);

  const isPublicPath =
    path.startsWith("/login") ||
    path.startsWith("/signup") ||
    path.startsWith("/verify") ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/resetpassword") ||
    path.startsWith("/api/auth") ||
    path.startsWith("/api/google");

  if (token && isPublicPath && !path.startsWith("/api")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (token && !isPublicPath) {
    const userData = await getUser();
    const hasSubmittedInitialInfo = !!userData.user?.about.gender;
    const isTeacher = userData.user?.role === "teacher";

    // initial personal info middleware
    if (!hasSubmittedInitialInfo && path !== "/initial-info") {
      return NextResponse.redirect(new URL("/initial-info", request.nextUrl));
    }

    if (hasSubmittedInitialInfo && path === "/initial-info") {
      return NextResponse.redirect(new URL("/Status", request.nextUrl));
    }

    if (path !== "/initial-info") {
      const isVerified = userData.user?.status === "Verified";

      if (!isVerified && path !== "/Status") {
        return NextResponse.redirect(new URL("/Status", request.nextUrl));
      }

      if (isVerified && path === "/Status") {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
    }

    if (isTeacher && path === "/") {
      return NextResponse.redirect(
        new URL("/teacher", request.nextUrl)
      );
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
    "/Status",
    "/initial-info",
    "/api/((?!auth|google).*)",
  ],
};
