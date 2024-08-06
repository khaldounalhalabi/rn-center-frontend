import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "@/Actions/serverCookies";
import { PermissionsDoctor } from "@/enum/Permissions";

const handleStaffRole = async (req: NextRequest) => {
  const path = `${req.nextUrl.pathname}`;
  const locale = await getCookieServer("NEXT_LOCALE");
  const userPermissions = [
    "manage-schedules",
    "manage-holidays",
    "manage-services",
    "manage-patients",
    "manage-medicines",
    "manage-appointments",
    "edit-clinic-profile",
    "manage-employees"
  ];

  const pathMapping = {
    [PermissionsDoctor.MANGE_SCHEDULES]: "/doctor/schedules",
    [PermissionsDoctor.MANAGE_HOLIDAYS]: "/doctor/holidays",
    [PermissionsDoctor.MANAGE_SERVICE]: "/doctor/service",
    [PermissionsDoctor.MANAGE_OFFERS]: "/doctor/offer",
    [PermissionsDoctor.MANAGE_PATIENTS]: "/doctor/patients",
    [PermissionsDoctor.MANAGE_MEDICINES]: "/doctor/medicines",
    [PermissionsDoctor.MANAGE_APPOINTMENTS]: "/doctor/appointment",
    [PermissionsDoctor.EDIT_CLINIC_PROFILE]: "/doctor/clinic-details/edit",
    [PermissionsDoctor.MANAGE_EMPLOYEES]: "/doctor/staff"
  };


  if (!path.startsWith('/doctor')) {
    return NextResponse.next();
  }


  const isRestrictedPath = Object.values(pathMapping).some((restrictedPath) => path.includes(restrictedPath));

  if (isRestrictedPath) {

    const hasPermission = userPermissions.some(permission =>
        path.startsWith(pathMapping[permission])
    );

    if (!hasPermission) {
      return NextResponse.redirect(new URL(`/${locale}/403`, req.url));
    }
  } else {

    return NextResponse.next();
  }

  return NextResponse.next();
};

export default handleStaffRole;