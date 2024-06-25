import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./Actions/serverCookies";
import { locales } from "./navigation";
import PermissionsDoctorArray, {PermissionsDoctor} from "@/enum/Permissions";
import handleStaffRole from "@/hooks/handleStaffRole";

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
  const role = await getCookieServer("role");
  const access = await getCookieServer("user-type");
  const locale = await getCookieServer("NEXT_LOCALE");
  const permissions :string |undefined = await getCookieServer('permissions')
  const permissionsArray = permissions?.split(',')
  if (!access && path.includes(`${locale}/admin`)) {
    const absolutURL = new URL(
      `${locale}/auth/admin/login`,
      req.nextUrl.origin,
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (!access && path.includes(`${locale}/customer`)) {
    const absolutURL = new URL(
      `${locale}/auth/customer/login`,
      req.nextUrl.origin,
    );
    return NextResponse.redirect(absolutURL.toString());
  }
  if (!access && path.includes(`${locale}/doctor`)) {
    const absolutURL = new URL(
      `${locale}/auth/doctor/login`,
      req.nextUrl.origin,
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

  if(access == 'doctor' && role == "clinic-employee"){
    return  await handleStaffRole(req)
  }

  return translationMiddleware(req);
}

export default async function middleware(req: NextRequest) {
  return await authenticationMiddleware(req);
}