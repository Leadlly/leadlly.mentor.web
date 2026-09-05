// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getUser } from "./actions/user_actions";

const getInviteInstituteCode = (request: NextRequest) =>
  request.nextUrl.searchParams.get("institutecode") ||
  request.nextUrl.searchParams.get("instituteCode") ||
  request.nextUrl.searchParams.get("institute_code");

const redirectWithInviteCode = (path: string, request: NextRequest) => {
  const dest = new URL(path, request.nextUrl);
  const code = getInviteInstituteCode(request);
  if (code) dest.searchParams.set("institutecode", code);
  return NextResponse.redirect(dest);
};

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
    return redirectWithInviteCode("/", request);
  }

  if (!token && !isPublicPath) {
    const code = getInviteInstituteCode(request);
    return redirectWithInviteCode(code ? "/signup" : "/login", request);
  }

  if (token && !isPublicPath) {
    const userData = await getUser();
    const hasSubmittedInitialInfo =
      (Array.isArray(userData.user?.institutes) &&
        userData.user.institutes.length > 0) ||
      !!userData.user?.institute;
    const isTeacher = userData.user?.role === "teacher";

    // initial personal info middleware
    if (!hasSubmittedInitialInfo && isTeacher && path !== "/initial-info") {
      return redirectWithInviteCode("/initial-info", request);
    }

    if (hasSubmittedInitialInfo && isTeacher && path === "/initial-info") {
      if (getInviteInstituteCode(request)) {
        return NextResponse.redirect(new URL("/teacher", request.nextUrl));
      }
      return NextResponse.redirect(new URL("/teacher/profile?setup=1", request.nextUrl));
    }

    if (path !== "/initial-info") {
      const isVerified = userData.user?.status === "Verified";

      if (!isVerified && path !== "/Status") {
        return redirectWithInviteCode("/Status", request);
      }

      if (isVerified && path === "/Status") {
        return redirectWithInviteCode("/", request);
      }
    }

    if (isTeacher && path === "/") {
      return NextResponse.redirect(new URL("/teacher", request.nextUrl));
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
