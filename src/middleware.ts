import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else {
    if (
      !session.session.activeOrganizationId &&
      request.nextUrl.pathname !== "/choose-congregation"
    ) {
      return NextResponse.redirect(
        new URL("/choose-congregation", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/", "/choose-congregation"],
};
