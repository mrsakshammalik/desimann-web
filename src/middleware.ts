import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all /admin routes except /admin-login
  if (path.startsWith("/admin") && !path.startsWith("/admin-login")) {
    const adminToken = request.cookies.get("admin_token")?.value;
    
    // Check if the token exists and is valid
    if (adminToken !== "authenticated") {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
