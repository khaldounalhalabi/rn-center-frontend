import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getCookieServer, setServerCookie } from "./Actions/serverCookies";
import { setCookieClient } from "@/Actions/clientCookies";
import {defaultLocale, locales} from "@/i18m.config";
import {localePrefix, pathnames} from "@/i18Router";

const translationMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix,
  pathnames
});

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};

async function authenticationMiddleware(req: NextRequest) {

  const path = `${req.nextUrl.pathname}`;

  const access = await getCookieServer("user-type");

  if (!access && path.includes(`/admin`)) {
    const absolutURL = new URL(
      `/auth/admin/login`,
      req.nextUrl.origin,
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (!access && path.includes(`/customer`)) {
    const absolutURL = new URL(
      `/auth/customer/login`,
      req.nextUrl.origin,
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (!access && path.includes(`/doctor`)) {
    const absolutURL = new URL(
      `/auth/doctor/login`,
      req.nextUrl.origin,
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (
    access == "admin" &&
    (path.includes(`/customer`) || path.includes(`/doctor`))
  ) {
    const absolutURL = new URL(`/404`, req.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }
  if (
    access == "customer" &&
    (path.includes(`/admin`) || path.includes(`/doctor`))
  ) {
    const absolutURL = new URL(`/404`, req.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }
  if (
    access == "doctor" &&
    (path.includes(`/customer`) || path.includes(`/admin`))
  ) {
    const absolutURL = new URL(`/404`, req.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }
  return translationMiddleware(req);
}

export default async function middleware(req: NextRequest) {
  return await authenticationMiddleware(req);
}
