import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/services/AuthService";
import { getCookieServer } from "./Actions/serverCookies";

const translationMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};

async function authenticationMiddleware(req: NextRequest) {
  const locale = await getCookieServer("locale");
  const path = `${req.nextUrl.pathname}`;

  const accsess = await AuthService.getCurrentActor();

  if (!accsess && path.includes(`/${locale}/admin`)) {
    const absolutURL = new URL(
      `/${locale}/auth/admin/login`,
      req.nextUrl.origin
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (!accsess && path.includes(`/${locale}/customer`)) {
    const absolutURL = new URL(
      `/${locale}/auth/customer/login`,
      req.nextUrl.origin
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (!accsess && path.includes(`/${locale}/doctor`)) {
    const absolutURL = new URL(
      `/${locale}/auth/doctor/login`,
      req.nextUrl.origin
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (
    accsess == "admin" &&
    (path.includes(`/${locale}/customer`) || path.includes(`/${locale}/doctor`))
  ) {
    const absolutURL = new URL(`/${locale}/404`, req.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }
  if (
    accsess == "customer" &&
    (path.includes(`/${locale}/admin`) || path.includes(`/${locale}/doctor`))
  ) {
    const absolutURL = new URL(`/${locale}/404`, req.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }
  if (
    accsess == "doctor" &&
    (path.includes(`/${locale}/customer`) || path.includes(`/${locale}/admin`))
  ) {
    const absolutURL = new URL(`/${locale}/404`, req.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }
  return await translationMiddleware(req);
}

export default async function middleware(req: NextRequest) {
  return await authenticationMiddleware(req);
}
