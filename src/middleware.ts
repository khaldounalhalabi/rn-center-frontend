import { getServerCookie } from "@/actions/ServerCookies";
import { authMiddleware } from "@/middlewares/auth-middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./navigation";

const translationMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};

export default async function middleware(request: NextRequest) {
  const access = await authMiddleware(request);
  const locale = await getServerCookie("NEXT_LOCALE");

  if (!access.canAccessAdmin) {
    const absolutURL = new URL(
      `${locale}/auth/admin/login`,
      request.nextUrl.origin,
    );
    return NextResponse.redirect(absolutURL.toString());
  }

  if (!access.canAccessCustomer) {
    const absolutURL = new URL(`${locale}`, request.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }

  if (!access.canAccessDoctor) {
    const absolutURL = new URL(
      `${locale}/auth/doctor/login`,
      request.nextUrl.origin,
    );
    return NextResponse.redirect(absolutURL.toString());
  }

  if (!access.canAccessSecretary) {
    const absolutURL = new URL(
      `${locale}/auth/secretary/login`,
      request.nextUrl.origin,
    );
    return NextResponse.redirect(absolutURL.toString());
  }

  return translationMiddleware(request);
}
