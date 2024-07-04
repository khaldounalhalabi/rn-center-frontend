import React from "react";
import XMark from "@/components/icons/XMark";
import "@/app/[locale]/global.css";
import SidebarItem from "@/components/common/Sidebar/SidebarItem";
import { useTranslations } from "next-intl";
import MenuIcon from "@/components/icons/MenuIcon";
import SidebarIcon from "@/components/common/Sidebar/SidebarIcon";
import SidebarCompactIcon from "@/components/common/Sidebar/SidebarCompactIcon";
import SidebarCompactItem from "@/components/common/Sidebar/SidebarCompactItem";
import DashBordIcon from "@/components/icons/DashBordIcon";
import SchedulesIcon from "@/components/icons/SchedulesIcon";
import HolidaysIcon from "@/components/icons/HolidaysIcon";
import ServiceIcon from "@/components/icons/ServiceIcon";
import PatientIcon from "@/components/icons/PatientIcon";
import OfferIcon from "@/components/icons/OfferIcon";
import MedicineIcon from "@/components/icons/MedicineIcon";
import { getCookieClient } from "@/Actions/clientCookies";
import { PermissionsDoctor } from "@/enum/Permissions";
import { Role } from "@/enum/Role";
import ClinicIcon from "@/components/icons/ClinicIcon";
import ClinicsShowIcon from "@/components/icons/ClinicsShowIcon";
import StaffIcon from "@/components/icons/StaffIcon";
import SidebarEnIcon from "@/components/icons/SidebarIconEn";
const SidebarDoctor = ({
  openNavBar,
  setOpenNavBar,
}: {
  openNavBar: {
    sm: boolean;
    md: boolean;
  };
  setOpenNavBar: React.Dispatch<{
    sm: boolean;
    md: boolean;
  }>;
}) => {
  const t = useTranslations("sideBar");
  const permissions: string | undefined = getCookieClient("permissions");
  const permissionsArray: string[] = permissions?.split(",") ?? [""];
  const role = getCookieClient("role");
  // @ts-ignore
  // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
    <div
      className={`md:block w-full !overflow-visible  h-screen overflow-y-hidden md:w-[35%] md:max-w-[400px]  md:translate-y-0 z-20 md:sticky md:top-0 bg-white  md:flex-col md:justify-between md:border-e ease-in-out duration-300 md:bg-white
       ${openNavBar.md ? " !w-16 " : " md:w-[35%]"}
       ${
         openNavBar.sm
           ? "absolute  translate-y-0 ease-in-out duration-500"
           : "absolute h-0 translate-y-[-300vh] ease-in-out duration-700"
       }`}
    >
      <div>
        <span
            className={`flex justify-between items-center place-content-center rounded-lg h-20 text-xs ${openNavBar.md ? " !justify-center !p-0" : ""}`}
        >
          <SidebarEnIcon className={`w-64 h-full ${openNavBar.md ? " !hidden" : "md:block"}`}/>
          <XMark
              className={`h-8 w-8 md:hidden cursor-pointer`}
              onClick={() => setOpenNavBar({ sm: !openNavBar.sm, md: false })}
          />
          <XMark
            className={`h-8 w-8  hidden cursor-pointer ${openNavBar.md ? " !hidden" : "md:block"}`}
            onClick={() => setOpenNavBar({ sm: false, md: !openNavBar.md })}
          />
          <MenuIcon
            className={`h-8 w-8  hidden cursor-pointer ${openNavBar.md ? "md:block " : "!hidden"}`}
            onClick={() => setOpenNavBar({ sm: false, md: !openNavBar.md })}
          />
        </span>
        <ul
          className={` space-y-1 mt-6 px-4 pt-3 pb-6 h-[calc(100vh-64px)] text-black ease-in-out duration-500 transform overflow-scroll ${openNavBar.md ? " hidden " : ""}`}
        >
          <SidebarItem link={"/doctor"}> {"Dashboard"}</SidebarItem>
          <SidebarCompactItem title={"Clinic Management"}>
            <div className="flex flex-col">
                <SidebarItem link={"/doctor/clinic-details"}>
                    {"Clinic Details"}
                </SidebarItem>
              <SidebarItem
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(PermissionsDoctor.MANGE_SCHEDULES)
                    ? "hidden"
                    : ""
                }
                link={"/doctor/clinic/schedules"}
              >
                {"Clinics Schedules"}
              </SidebarItem>
              <SidebarItem
                link={"/doctor/clinic/holidays"}
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(PermissionsDoctor.MANAGE_HOLIDAYS)
                      ? "hidden"
                      : ""
                }
              >
                {"Clinic Holidays"}
              </SidebarItem>
            </div>
          </SidebarCompactItem>
          <SidebarItem
            link={"/doctor/service"}
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.MANAGE_SERVICE)
                  ? "hidden"
                  : ""
            }
          >
            {t("services")}
          </SidebarItem>
          <SidebarItem
            link={"/doctor/offer"}
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.MANAGE_OFFERS)
                  ? "hidden"
                  : ""
            }
          >
            Offers
          </SidebarItem>
          <SidebarItem
            link={"/doctor/patients"}
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.MANAGE_PATIENTS)
                  ? "hidden"
                  : ""
            }
          >
            Patients
          </SidebarItem>
          <SidebarItem
            link={"/doctor/medicines"}
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.MANAGE_MEDICINES)
                  ? "hidden"
                  : ""
            }
          >
            Medicines
          </SidebarItem>
          <SidebarItem
            link={"/doctor/staff"}
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.MANAGE_EMPLOYEES)
                  ? "hidden"
                  : ""
            }
          >
            Staff
          </SidebarItem>
        </ul>
      </div>
      <div
        className={`mt-5 overflow-scroll ease-in-out h-[calc(100vh-64px)] duration-300 ${openNavBar.md ? "w-full" : " hidden"}`}
      >
        <ul className={""}>
          <SidebarIcon link={"/doctor"} title={t("dashboard")}>
            <DashBordIcon className={`h-7 w-7 `} />
          </SidebarIcon>
          <SidebarCompactIcon
            title={"Clinic Management"}
            icon={<ClinicIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
                <SidebarIcon
                    link={"/doctor/clinic-details"}
                    title={"Clinic Details"}
                >
                    <ClinicsShowIcon className={`h-7 w-7 mx-3`} />
                </SidebarIcon>
              <SidebarIcon
                  className={
                    role == Role.CLINIC_EMPLOYEE &&
                    !permissionsArray.includes(PermissionsDoctor.MANGE_SCHEDULES)
                        ? "hidden"
                        : ""
                  }
                link={"/doctor/clinic/schedules"}
                title={"Clinics Schedules"}
              >
                <SchedulesIcon className={`h-7 w-7 mx-3`} />
              </SidebarIcon>
              <SidebarIcon
                  className={
                    role == Role.CLINIC_EMPLOYEE &&
                    !permissionsArray.includes(PermissionsDoctor.MANAGE_HOLIDAYS)
                        ? "hidden"
                        : ""
                  }
                link={"/doctor/clinic/holidays"}
                title={"Clinic Holidays"}
              >
                <HolidaysIcon className={`h-7 w-7 mx-3`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>
          <SidebarIcon
              className={
                role == Role.CLINIC_EMPLOYEE &&
                !permissionsArray.includes(PermissionsDoctor.MANAGE_SERVICE)
                    ? "hidden"
                    : ""
              }
              link={"/doctor/service"} title={t("services")}>
            <ServiceIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon
              className={
                role == Role.CLINIC_EMPLOYEE &&
                !permissionsArray.includes(PermissionsDoctor.MANAGE_OFFERS)
                    ? "hidden"
                    : ""
              }
              link={"/doctor/offer"} title={"Offers"}>
            <OfferIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon
              className={
                role == Role.CLINIC_EMPLOYEE &&
                !permissionsArray.includes(PermissionsDoctor.MANAGE_PATIENTS)
                    ? "hidden"
                    : ""
              }
              link={"/doctor/patients"} title={"Patients"}>
            <PatientIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon
              className={
                role == Role.CLINIC_EMPLOYEE &&
                !permissionsArray.includes(PermissionsDoctor.MANAGE_MEDICINES)
                    ? "hidden"
                    : ""
              }
              link={"/doctor/medicines"} title={"medicines"}>
            <MedicineIcon className={`h-8 w-8`} />
          </SidebarIcon>
            <SidebarIcon
                className={
                    role == Role.CLINIC_EMPLOYEE &&
                    !permissionsArray.includes(PermissionsDoctor.MANAGE_EMPLOYEES)
                        ? "hidden"
                        : ""
                }
                link={"/doctor/staff"} title={"medicines"}>
                <StaffIcon className={`h-8 w-8`} />
            </SidebarIcon>
        </ul>
      </div>
    </div>
  );
};

export default SidebarDoctor;