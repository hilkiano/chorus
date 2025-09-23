import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "./db/drizzle";
import { organizations } from "./db/schema";
import { eq } from "drizzle-orm";

const PUBLIC_FILE = /\.(.*)$/;
const publicRoute = ["/sign-in"];

function forceSignOut(request: NextRequest) {
  const url = new URL("/sign-in", request.url);
  const response = NextResponse.redirect(url);

  // ❌ Clear BetterAuth session cookie
  response.cookies.set("better-auth.session_token", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Skip Next internals, static assets, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Skip public route
  if (publicRoute.includes(pathname)) {
    return NextResponse.next();
  }

  // Authenticated route
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else {
    // No active congregation
    if (
      !session.session.activeOrganizationId &&
      request.nextUrl.pathname !== "/choose-congregation"
    ) {
      return NextResponse.redirect(
        new URL("/choose-congregation", request.url)
      );
    } else {
      const res = NextResponse.next();

      if (session.session.activeOrganizationId) {
        const [organization] = await db
          .select()
          .from(organizations)
          .where(eq(organizations.id, session.session.activeOrganizationId))
          .limit(1);

        if (organization) {
          // Rewrite URL
          const slug = organization.slug;
          if (!pathname.startsWith(`/${slug}`)) {
            const newUrl = request.nextUrl.clone();
            newUrl.pathname = `/${slug}${pathname}`;
            return NextResponse.redirect(newUrl);
          }

          res.headers.set("x-congregation", JSON.stringify(organization));
        } else {
          return forceSignOut(request);
        }
      }

      res.headers.set("x-user", JSON.stringify(session.user));
      res.headers.set("x-session", JSON.stringify(session.session));

      return res;
    }
  }
}

// Middleware only for authorized routes
export const config = {
  runtime: "nodejs",
  matcher: ["/:path*"],
};
