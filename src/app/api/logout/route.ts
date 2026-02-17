import { NextRequest, NextResponse } from "next/server";

import apiClient from "@/apiClient/apiClient";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not Logged In" }, { status: 400 });
    }

    const response = await apiClient.post("/api/auth/logout", {});

    const res = NextResponse.json(response.data);

    res.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
