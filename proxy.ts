import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!sessionCookie || !session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Redirect authenticated users away from login page
  if (request.nextUrl.pathname.startsWith("/auth/login")) {
    if (sessionCookie && session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};
