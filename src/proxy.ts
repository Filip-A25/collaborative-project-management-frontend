import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ANONYMOUS_ROUTES, PRIVATE_ROUTES } from "@/const/Routes";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
const anonymousRoutes = Object.values(ANONYMOUS_ROUTES);

export async function proxy(request: NextRequest) {
  let redirectUrl;

  try {
    const authToken = request.cookies.get("auth_token")?.value;
    if (!authToken) {
      redirectUrl = new URL(ANONYMOUS_ROUTES.Login, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    await jwtVerify(authToken, JWT_SECRET);

    const pathname = request.nextUrl.pathname;
    const isAnonymousRequestRoute =
      pathname === "/" || anonymousRoutes.includes(pathname);

    redirectUrl = new URL(PRIVATE_ROUTES.Projects, request.url);
    if (isAnonymousRequestRoute) return NextResponse.redirect(redirectUrl);

    return NextResponse.next();
  } catch {
    redirectUrl = new URL(ANONYMOUS_ROUTES.Login, request.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|register).*)",
};
