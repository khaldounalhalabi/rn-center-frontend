import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "@/Actions/serverCookies";
import { PermissionsDoctor } from "@/enum/Permissions";

const handleStaffRole = async (req: NextRequest) => {
  const path = `${req.nextUrl.pathname}`;
  const locale = await getCookieServer("NEXT_LOCALE");
  const permissions: string | undefined = await getCookieServer("permissions");
  const permissionsArray = permissions?.split(",");
  if (
    (!permissionsArray?.includes(PermissionsDoctor.MANAGE_SERVICE) &&
      path.includes(`/doctor/service`)) ||
    (!permissionsArray?.includes(PermissionsDoctor.MANAGE_APPOINTMENTS) &&
      path.includes(`/doctor/appointment`)) ||
    (!permissionsArray?.includes(PermissionsDoctor.EDIT_CLINIC_PROFILE) &&
      path.includes(`/doctor/clinic-details/edit`)) ||
    (!permissionsArray?.includes(PermissionsDoctor.MANGE_SCHEDULES) &&
      path.includes(`/doctor/schedules`)) ||
    (!permissionsArray?.includes(PermissionsDoctor.MANAGE_HOLIDAYS) &&
      path.includes(`/doctor/holidays`)) ||
    (!permissionsArray?.includes(PermissionsDoctor.MANAGE_OFFERS) &&
      path.includes(`/doctor/offer`)) ||
    (!permissionsArray?.includes(PermissionsDoctor.MANAGE_PATIENTS) &&
      path.includes(`/doctor/patients`)) ||
    (!permissionsArray?.includes(PermissionsDoctor.MANAGE_MEDICINES) &&
      path.includes(`/doctor/medicines`)) ||
    (!permissionsArray?.includes(PermissionsDoctor.MANAGE_EMPLOYEES) &&
      path.includes(`/doctor/staff`))
  ) {
    return NextResponse.redirect(new URL(`/${locale}/404`, req.url));
  }
};

export default handleStaffRole;