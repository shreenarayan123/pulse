import jwt from "jsonwebtoken";
import next from "next";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
    const jwtToken = process.env.JWT_SECRET || "secret";
    const decoded = jwt.verify(token, jwtToken);

    if (decoded) {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "session expired",
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/task/:path*"],
};
