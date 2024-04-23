import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["en", "ar"] as const;
export const localePrefix = "always";

export const pathnames = {
  "": "",
  "#": "#",
  "/": "/",
  "/auth/admin/login": "/auth/admin/login",
  "/auth/admin/reset-password-code": "/auth/admin/reset-password-code",
  "/auth/admin/reset-password": "/auth/admin/reset-password",
  "/auth/admin/set-new-password": "/auth/admin/set-new-password",
  "/admin": "/admin",
  "/admin/clinics": "/admin/clinics",
  "/admin/clinics/[clinicId]": "/admin/clinics/[clinicId]",
  "/admin/clinics/[clinicId]/edit": "/admin/clinics/[clinicId]/edit",
  "/admin/clinics/create": "/admin/clinics/create",
  "/admin/clinics/holidays": "/admin/clinics/holidays",
  "/admin/clinics/holidays/[holidayId]": "/admin/clinics/holidays/[holidayId]",
  "/admin/clinics/holidays/[holidayId]/edit":
    "/admin/clinics/holidays/[holidayId]/edit",
  "/admin/clinics/holidays/create": "/admin/clinics/holidays/create",
  "/admin/clinics/schedules": "/admin/clinics/schedules",
  "/admin/clinics/schedules/[clinicId]": "/admin/clinics/schedules/[clinicId]",
  "/admin/clinics/schedules/[clinicId]/edit":
    "/admin/clinics/schedules/[clinicId]/edit",
  "/admin/clinics/schedules/create": "/admin/clinics/schedules/create",
  "/admin/hospitals": "/admin/hospitals",
  "/admin/hospitals/[hospitalsId]": "/admin/hospitals/[hospitalsId]",
  "/admin/hospitals/[hospitalsId]/edit": "/admin/hospitals/[hospitalsId]/edit",
  "/admin/hospitals/create": "/admin/hospitals/create",
  "/admin/speciality": "/admin/speciality",
  "/admin/speciality/[specialityId]": "/admin/speciality/[specialityId]",
  "/admin/speciality/[specialityId]/edit":
    "/admin/speciality/[specialityId]/edit",
  "/admin/speciality/create": "/admin/hospitals/create",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames: pathnames as typeof pathnames & Record<string & {}, string>,
  });
