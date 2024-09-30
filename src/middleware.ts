// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow the request if it's for the sign-in page, API calls, or if the user has a token
  if (pathname.startsWith("/auth") || pathname.startsWith("/api") || token) {
    return NextResponse.next();
  }

  // Redirect to sign-in page if not authenticated
  return NextResponse.redirect(new URL("/sign-in", req.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"], // Apply to multiple paths
};

// https://www.googleapis.com/auth/userinfo.email
// https://www.googleapis.com/auth/userinfo.profile
// https://www.googleapis.com/auth/drive.activity.readonly
// https://www.googleapis.com/auth/drive.metadata
// https://www.googleapis.com/auth/drive.readonly