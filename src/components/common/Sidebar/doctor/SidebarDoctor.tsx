"use client";
import React, { useState } from "react";
import "@/app/[locale]/global.css";
import SidebarItem from "@/components/common/Sidebar/SidebarItem";
import { useLocale, useTranslations } from "next-intl";
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
import AppointmentIcon from "@/components/icons/AppointmentIcon";
import AppointmentDeductionstIcon from "@/components/icons/AppointmentDeductionIcon";
import TransactionIcon from "@/components/icons/TransactionIcon";
import CompacTransactiontIcon from "@/components/icons/CompacTransactiontIcon";
import SidebarArIcon from "@/components/icons/SidebarArIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import CreditCardIcon from "@/components/icons/CreditCardIcon";
import PaperIcon from "@/components/icons/PaperIcon";

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
  const local = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const sidebarItems = [
    {
      search: "dashboard,لوحةالقيادة,داشبورد",
      title: t("dashboard"),
      link: "/doctor",
      role: "",
    },
    {
      search: "clinic schedules,schedules,clinic,schedule,مواعيد العيادة",
      title: t("clinicsSchedules"),
      link: "/doctor/clinic/schedules",
      role: PermissionsDoctor.MANGE_SCHEDULES,
    },
    {
      search:
        "clinic holidays,clinic,holidays,holiday,العطل,عطل العيادة,عيادة,ال",
      title: t("clinic_holidays"),
      link: "/doctor/clinic/holidays",
      role: PermissionsDoctor.MANAGE_HOLIDAYS,
    },
    {
      search: "medicines,medicine,الدواء,علاج,ادوية",
      title: t("medicines"),
      link: "/doctor/medicines",
      role: PermissionsDoctor.MANAGE_MEDICINES,
    },
    {
      search: "appointment,appointments,موعد,مواعيد",
      title: t("appointment"),
      link: "/doctor/appointment",
      role: PermissionsDoctor.MANAGE_APPOINTMENTS,
    },
    {
      search: "patients,patient,مرضى,مريض",
      title: t("patients"),
      link: "/doctor/patients",
      role: PermissionsDoctor.MANAGE_PATIENTS,
    },
  ];
  const filteredItems = sidebarItems.filter((item) =>
    item.search.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div
      className={`lg:block sidebar w-full !overflow-visible  min-h-screen overflow-y-hidden lg:w-[25%] lg:max-w-[300px]  lg:translate-y-0 z-20 lg:sticky lg:top-0 bg-white  lg:flex-col lg:justify-between lg:border-e ease-in-out duration-300 lg:bg-white
       ${openNavBar.md ? " !w-16 " : " lg:w-[35%]"}
       ${
         openNavBar.sm
           ? "absolute  translate-y-0 ease-in-out duration-500"
           : "absolute h-0 translate-y-[-300vh] ease-in-out duration-700"
       }`}
    >
      <div className={"overflow-hidden"}>
        <span
          className={`px-4 flex py-4 justify-between items-center place-content-center rounded-lg h-20 text-xs ${openNavBar.md ? " !justify-center !p-0" : ""}`}
        >
          {local == "en" ? (
            <SidebarEnIcon
              className={`w-64 h-full ${openNavBar.md ? " !hidden" : "md:block"}`}
            />
          ) : (
            <SidebarArIcon
              className={`w-64 h-full ${openNavBar.md ? " !hidden" : "md:block"}`}
            />
          )}

          <MenuIcon
            className={`h-8 w-8 cursor-pointer`}
            onClick={() =>
              setOpenNavBar({ sm: !openNavBar.sm, md: !openNavBar.md })
            }
          />
        </span>
        <div className={`px-4 relative ${openNavBar.md ? " hidden " : ""}`}>
          <div
            className={`absolute flex gap-2  top-4 items-center  ${local == "ar" ? "left-[8%]" : "right-[8%]"}`}
          >
            <SearchIcon className={"w-5 h-5  opacity-60"} />
          </div>
          <input
            type={"text"}
            placeholder={"Search"}
            className="block  w-full  kodchasan py-2.5 px-0  bg-transparent border-0 border-b-2
                    border-[#c1d5df] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1FB8B9]"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <ul
          className={` space-y-1 mt-2 px-4 pt-3 pb-6 h-[calc(100vh-64px)] text-black ease-in-out duration-500 transform overflow-scroll ${openNavBar.md ? " hidden " : ""}`}
        >
          {searchTerm ? (
            filteredItems?.map((item, index) => (
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={item.link}
                key={index}
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(item.role)
                    ? "hidden"
                    : ""
                }
              >
                {" "}
                {item.title}
              </SidebarItem>
            ))
          ) : (
            <>
              <SidebarItem
                link={"/doctor"}
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
              >
                {" "}
                {t("dashboard")}
              </SidebarItem>
              <SidebarCompactItem
                title={t("clinic_management")}
                links={[
                  "/doctor/clinic-details",
                  "/doctor/clinic/schedules",
                  "/doctor/clinic/holidays",
                ]}
              >
                <div className="flex flex-col">
                  <SidebarItem
                    setOpenNavBar={setOpenNavBar}
                    openNavBar={openNavBar}
                    link={"/doctor/clinic-details"}
                  >
                    {t("clinicDetails")}
                  </SidebarItem>
                  <SidebarItem
                    setOpenNavBar={setOpenNavBar}
                    openNavBar={openNavBar}
                    className={
                      role == Role.CLINIC_EMPLOYEE &&
                      !permissionsArray.includes(
                        PermissionsDoctor.MANGE_SCHEDULES,
                      )
                        ? "hidden"
                        : ""
                    }
                    link={"/doctor/clinic/schedules"}
                  >
                    {t("clinicsSchedules")}
                  </SidebarItem>
                  <SidebarItem
                    setOpenNavBar={setOpenNavBar}
                    openNavBar={openNavBar}
                    link={"/doctor/clinic/holidays"}
                    className={
                      role == Role.CLINIC_EMPLOYEE &&
                      !permissionsArray.includes(
                        PermissionsDoctor.MANAGE_HOLIDAYS,
                      )
                        ? "hidden"
                        : ""
                    }
                  >
                    {t("clinic_holidays")}
                  </SidebarItem>
                  <SidebarItem
                    setOpenNavBar={setOpenNavBar}
                    openNavBar={openNavBar}
                    link={"/doctor/medicines"}
                    className={
                      role == Role.CLINIC_EMPLOYEE &&
                      !permissionsArray.includes(
                        PermissionsDoctor.MANAGE_MEDICINES,
                      )
                        ? "hidden"
                        : ""
                    }
                  >
                    {t("medicines")}
                  </SidebarItem>
                </div>
              </SidebarCompactItem>
              <SidebarItem
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(
                    PermissionsDoctor.MANAGE_APPOINTMENTS,
                  )
                    ? "hidden"
                    : ""
                }
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/doctor/appointment"}
              >
                {t("appointment")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/doctor/patients"}
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(PermissionsDoctor.MANAGE_PATIENTS)
                    ? "hidden"
                    : ""
                }
              >
                {t("patients")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/doctor/offer"}
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(PermissionsDoctor.MANAGE_OFFERS)
                    ? "hidden"
                    : ""
                }
              >
                {t("offers")}
              </SidebarItem>
              <SidebarCompactItem
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(
                    PermissionsDoctor.ACCOUNTANT_MANAGEMENT,
                  )
                    ? "hidden"
                    : ""
                }
                title={t("accountantManagement")}
                links={[
                  "/doctor/transaction",
                  "/doctor/appointment-deductions",
                ]}
              >
                <div className="flex flex-col">
                  <SidebarItem
                    setOpenNavBar={setOpenNavBar}
                    openNavBar={openNavBar}
                    link={"/doctor/transaction"}
                  >
                    {t("transaction")}
                  </SidebarItem>
                  <SidebarItem
                    setOpenNavBar={setOpenNavBar}
                    openNavBar={openNavBar}
                    link={"/doctor/appointment-deductions"}
                  >
                    {t("appointmentDeductions")}
                  </SidebarItem>
                </div>
              </SidebarCompactItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
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
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/doctor/staff"}
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(PermissionsDoctor.MANAGE_EMPLOYEES)
                    ? "hidden"
                    : ""
                }
              >
                {t("staff")}
              </SidebarItem>

              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/doctor/contact-and-payment"}
              >
                {t("contact_and_payment")}
              </SidebarItem>

              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/doctor/contract"}
              >
                {t("contract")}
              </SidebarItem>
            </>
          )}
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
              <SidebarIcon
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(PermissionsDoctor.MANAGE_MEDICINES)
                    ? "hidden"
                    : ""
                }
                link={"/doctor/medicines"}
                title={"medicines"}
              >
                <MedicineIcon className={`h-8 w-8`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>
          <SidebarIcon
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.MANAGE_APPOINTMENTS)
                ? "hidden"
                : ""
            }
            link={"/doctor/appointment"}
            title={"Appointment"}
          >
            <AppointmentIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.MANAGE_PATIENTS)
                ? "hidden"
                : ""
            }
            link={"/doctor/patients"}
            title={"Patients"}
          >
            <PatientIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.MANAGE_OFFERS)
                ? "hidden"
                : ""
            }
            link={"/doctor/offer"}
            title={"Offers"}
          >
            <OfferIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarCompactIcon
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(
                PermissionsDoctor.ACCOUNTANT_MANAGEMENT,
              )
                ? "hidden"
                : ""
            }
            title={"Accountant Management"}
            icon={<CompacTransactiontIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
              <SidebarIcon link={"/doctor/transaction"} title={"Transaction"}>
                <TransactionIcon className={`h-7 w-7 mx-3`} />
              </SidebarIcon>
              <SidebarIcon
                link={"/doctor/appointment-deductions"}
                title={"Appointment Deductions"}
              >
                <AppointmentDeductionstIcon className={`h-7 w-7 mx-3`} />
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
            link={"/doctor/service"}
            title={t("services")}
          >
            <ServiceIcon className={`h-8 w-8`} />
          </SidebarIcon>

          <SidebarIcon
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.MANAGE_EMPLOYEES)
                ? "hidden"
                : ""
            }
            link={"/doctor/staff"}
            title={"Staff"}
          >
            <StaffIcon className={`h-8 w-8`} />
          </SidebarIcon>

          <SidebarIcon
            link={"/doctor/contact-and-payment"}
            title={t("contact_and_payment")}
          >
            <CreditCardIcon className={`h-8 w-8`} />
          </SidebarIcon>

          <SidebarIcon link={"/doctor/contract"} title={t("contract")}>
            <PaperIcon className={`h-8 w-8`} />
          </SidebarIcon>
        </ul>
      </div>
    </div>
  );
};

export default SidebarDoctor;
