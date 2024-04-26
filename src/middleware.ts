import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./Actions/serverCookies";
import { locales } from "./navigation";

const translationMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};

async function authenticationMiddleware(req: NextRequest) {
  const path = `${req.nextUrl.pathname}`;

  const access = await getCookieServer("user-type");
  const locale = await getCookieServer("NEXT_LOCALE");

  if (!access && path.includes(`${locale}/admin`)) {
    const absolutURL = new URL(
      `${locale}/auth/admin/login`,
      req.nextUrl.origin
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (!access && path.includes(`${locale}/customer`)) {
    const absolutURL = new URL(
      `${locale}/auth/customer/login`,
      req.nextUrl.origin
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (!access && path.includes(`${locale}/doctor`)) {
    const absolutURL = new URL(
      `${locale}/auth/doctor/login`,
      req.nextUrl.origin
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (
    access == "admin" &&
    (path.includes(`${locale}/customer`) || path.includes(`${locale}/doctor`))
  ) {
    const absolutURL = new URL(`${locale}/404`, req.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }
  if (
    access == "customer" &&
    (path.includes(`${locale}/admin`) || path.includes(`${locale}/doctor`))
  ) {
    const absolutURL = new URL(`${locale}/404`, req.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }
  if (
    access == "doctor" &&
    (path.includes(`${locale}/customer`) || path.includes(`${locale}/admin`))
  ) {
    const absolutURL = new URL(`${locale}/404`, req.nextUrl.origin);
    return NextResponse.redirect(absolutURL.toString());
  }
  return translationMiddleware(req);
}

export default async function middleware(req: NextRequest) {
  return await authenticationMiddleware(req);
}
