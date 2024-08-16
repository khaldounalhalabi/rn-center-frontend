"use client";
import React from "react";
import XMark from "@/components/icons/XMark";
import "@/app/[locale]/global.css";
import SidebarItem from "@/components/common/Sidebar/SidebarItem";
import { useLocale, useTranslations } from "next-intl";
import MenuIcon from "@/components/icons/MenuIcon";
import SidebarIcon from "@/components/common/Sidebar/SidebarIcon";
import SidebarCompactIcon from "@/components/common/Sidebar/SidebarCompactIcon";
import SidebarCompactItem from "@/components/common/Sidebar/SidebarCompactItem";
import DashBordIcon from "@/components/icons/DashBordIcon";
import ClinicIcon from "@/components/icons/ClinicIcon";
import ClinicsShowIcon from "@/components/icons/ClinicsShowIcon";
import SchedulesIcon from "@/components/icons/SchedulesIcon";
import HolidaysIcon from "@/components/icons/HolidaysIcon";
import SpecialitiesIcon from "@/components/icons/SpecialitiesIcon";
import HospitalsIcon from "@/components/icons/HospitalsIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import ServiceIcon from "@/components/icons/ServiceIcon";
import AppointmentIcon from "@/components/icons/AppointmentIcon";
import MedicineIcon from "@/components/icons/MedicineIcon";
import UserIcon from "@/components/icons/UserIcon";
import PatientIcon from "@/components/icons/PatientIcon";
import SubscriptionIcon from "@/components/icons/SubscriptionIcon";
import BlockedItemIcon from "@/components/icons/BlockedItemIcon";
import EnquirieIcon from "@/components/icons/EnquirieIcon";
import OfferIcon from "@/components/icons/OfferIcon";
import PatientProfilesIcon from "@/components/icons/PatientProfilesIcon";
import PatientMangerIcon from "@/components/icons/PatientMangerIcon";
import TransactionIcon from "@/components/icons/TransactionIcon";
import BloodIcon from "@/components/icons/BloodIcon";
import CompactHospitalIcon from "@/components/icons/CompactHospitalIcon";
import AvailableDepartmentIcon from "@/components/icons/AvailableDepartmentIcon";
import SystemOfferIcon from "@/components/icons/SystemOfferIcon";
import SidebarEnIcon from "@/components/icons/SidebarIconEn";
import CompacTransactiontIcon from "@/components/icons/CompacTransactiontIcon";
import AppointmentDeductionstIcon from "@/components/icons/AppointmentDeductionIcon";
import SettingIcon from "@/components/icons/SettingIcon";
import SidebarArIcon from "@/components/icons/SidebarArIcon";

const SidebarAdmin = ({
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
  const local = useLocale();

  return (
    <div
      className={`md:block w-full !overflow-visible  h-screen overflow-y-hidden md:w-[25%] md:max-w-[300px]  md:translate-y-0 z-20 md:sticky md:top-0 bg-white  md:flex-col md:justify-between md:border-e ease-in-out duration-300 md:bg-white
       ${openNavBar.md ? " !w-16 " : " md:w-[35%]"}
       ${
         openNavBar.sm
           ? "absolute  translate-y-0 ease-in-out duration-500"
           : "absolute h-0 translate-y-[-300vh] ease-in-out duration-700"
       }`}
    >
      <div className={"overflow-hidden h-[inherit]"}>
        <div
          className={`flex py-4 justify-between items-center place-content-center rounded-lg h-20 text-xs ${openNavBar.md ? " !justify-center !p-0" : ""}`}
        >
          {local == "en" ? (
            <SidebarEnIcon
              className={`w-64 h-full  ${openNavBar.md ? " !hidden" : "md:block"}`}
            />
          ) : (
            <SidebarArIcon
              className={`w-64 h-full  ${openNavBar.md ? " !hidden" : "md:block"}`}
            />
          )}
          <XMark
            className={`h-8 w-8 md:hidden cursor-pointer`}
            onClick={() => setOpenNavBar({ sm: !openNavBar.sm, md: false })}
          />
          <XMark
            className={`h-8 w-8 mx-4 hidden cursor-pointer ${openNavBar.md ? " !hidden" : "md:block"}`}
            onClick={() => setOpenNavBar({ sm: false, md: !openNavBar.md })}
          />
          <MenuIcon
            className={`h-8 w-8  hidden cursor-pointer ${openNavBar.md ? "md:block " : "!hidden"}`}
            onClick={() => setOpenNavBar({ sm: false, md: !openNavBar.md })}
          />
        </div>
        <ul
          className={` space-y-1 px-4 pt-3  h-[calc(100vh-64px)] text-black ease-in-out duration-500 transform overflow-scroll ${openNavBar.md ? " hidden " : ""}`}
        >
          <SidebarItem link={"/admin"}> {t("dashboard")}</SidebarItem>
          <SidebarCompactItem
            title={t("clinicsManagement")}
            links={[
              "/admin/clinics",
              "/admin/clinics/schedules",
              "/admin/clinics/holidays",
            ]}
          >
            <div className="flex flex-col">
              <SidebarItem link={"/admin/clinics"}> {t("clinics")}</SidebarItem>
              <SidebarItem link={"/admin/clinics/schedules"}>
                {t("clinicsSchedules")}
              </SidebarItem>
              <SidebarItem link={"/admin/clinics/holidays"}>
                {t("clinicsHolidays")}
              </SidebarItem>
            </div>
          </SidebarCompactItem>
          <div className="flex flex-col">
            <SidebarItem link={"/admin/speciality"}>
              {t("specialties")}
            </SidebarItem>

            <SidebarItem link={"/admin/category"}>
              {t("serviceCategories")}
            </SidebarItem>
            <SidebarItem link={"/admin/service"}>{t("services")}</SidebarItem>
            <SidebarItem link={"/admin/appointment"}>
              {t("appointment")}
            </SidebarItem>
            <SidebarCompactItem
              title={"Hospitals Management"}
              links={["/admin/hospitals", "/admin/hospital-departments"]}
            >
              <SidebarItem link={"/admin/hospitals"}>
                {t("hospitals")}
              </SidebarItem>
              <SidebarItem link={"/admin/hospital-departments"}>
                Available Departments
              </SidebarItem>
            </SidebarCompactItem>
            <SidebarItem link={"/admin/medicines"}>Medicines</SidebarItem>

            <SidebarItem link={"/admin/user"}>Users</SidebarItem>
            <SidebarCompactItem
              title={"Patients Management"}
              links={["/admin/patients", "/admin/patient-profiles"]}
            >
              <SidebarItem link={"/admin/patients"}>Patients</SidebarItem>
              <SidebarItem link={"/admin/patient-profiles"}>
                Patient Profiles
              </SidebarItem>
            </SidebarCompactItem>
            <SidebarItem link={"/admin/subscriptions"}>
              Subscriptions
            </SidebarItem>
            <SidebarItem link={"/admin/blocked-item"}>
              Blocked Items
            </SidebarItem>
            <SidebarItem link={"/admin/enquiries"}>Enquiries</SidebarItem>
            <SidebarItem link={"/admin/offer"}>Offers</SidebarItem>
            <SidebarCompactItem
              title={"Accountant Management"}
              links={["/admin/transaction", "/admin/appointment-deductions"]}
            >
              <div className="flex flex-col">
                <SidebarItem link={"/admin/transaction"}>
                  Transactions
                </SidebarItem>
                <SidebarItem link={"/admin/appointment-deductions"}>
                  Appointment Deductions
                </SidebarItem>
              </div>
            </SidebarCompactItem>
            <SidebarItem link={"/admin/blood-donation"}>
              Blood Donation
            </SidebarItem>
            <SidebarItem link={"/admin/system-offer"}>
              System Offers
            </SidebarItem>
            <SidebarItem link={"/admin/setting"}>Settings</SidebarItem>
          </div>
        </ul>
      </div>
      <div
        className={`mt-5 overflow-scroll ease-in-out h-[calc(100vh-64px)] duration-300 ${openNavBar.md ? "w-full" : " hidden"}`}
      >
        <ul className={""}>
          <SidebarIcon link={"/admin"} title={t("dashboard")}>
            <DashBordIcon className={`h-7 w-7 `} />
          </SidebarIcon>
          <SidebarCompactIcon
            title={t("clinicsManagement")}
            icon={<ClinicIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
              <SidebarIcon link={"/admin/clinics"} title={t("clinics")}>
                <ClinicsShowIcon className={`h-8 w-8 mx-3`} />
              </SidebarIcon>
              <SidebarIcon
                link={"/admin/clinics/schedules"}
                title={t("clinicsSchedules")}
              >
                <SchedulesIcon className={`h-7 w-7 mx-3`} />
              </SidebarIcon>
              <SidebarIcon
                link={"/admin/clinics/holidays"}
                title={t("clinicsHolidays")}
              >
                <HolidaysIcon className={`h-7 w-7 mx-3`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>
          <SidebarIcon link={"/admin/speciality"} title={t("specialties")}>
            <SpecialitiesIcon className={`h-7 w-7`} />
          </SidebarIcon>
          <SidebarCompactIcon
            title={"Hospitals Management"}
            icon={<CompactHospitalIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
              <SidebarIcon link={"/admin/hospitals"} title={t("hospitals")}>
                <HospitalsIcon className={`h-9 w-9`} />
              </SidebarIcon>
              <SidebarIcon
                link={"/admin/hospital-departments"}
                title={t("hospitals")}
              >
                <AvailableDepartmentIcon className={`h-9 w-9`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>

          <SidebarIcon link={"/admin/category"} title={t("serviceCategories")}>
            <CategoryIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/service"} title={t("services")}>
            <ServiceIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/appointment"} title={t("appointment")}>
            <AppointmentIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/medicines"} title={"Medicines"}>
            <MedicineIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/user"} title={"Users"}>
            <UserIcon className={`h-8 w-8`} />
          </SidebarIcon>

          <SidebarCompactIcon
            title={"Patients Management"}
            icon={<PatientMangerIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
              <SidebarIcon link={"/admin/patients"} title={"Patients"}>
                <PatientIcon className={`h-7 w-7`} />
              </SidebarIcon>
              <SidebarIcon
                link={"/admin/patient-profiles"}
                title={"Patient Profiles"}
              >
                <PatientProfilesIcon className={`h-7 w-7`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>
          <SidebarIcon link={"/admin/subscriptions"} title={"Subscriptions"}>
            <SubscriptionIcon className={`h-7 w-7`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/blocked-item"} title={"Blocked Items"}>
            <BlockedItemIcon className={`h-7 w-7`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/enquiries"} title={"Enquiries"}>
            <EnquirieIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/offer"} title={"Offers"}>
            <OfferIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarCompactIcon
            title={"Accountant Management"}
            icon={<CompacTransactiontIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
              <SidebarIcon link={"/admin/transaction"} title={"Transaction"}>
                <TransactionIcon className={`h-7 w-7 mx-3`} />
              </SidebarIcon>
              <SidebarIcon
                link={"/admin/appointment-deductions"}
                title={"Appointment Deductions"}
              >
                <AppointmentDeductionstIcon className={`h-7 w-7 mx-3`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>
          <SidebarIcon link={"/admin/blood-donation"} title={"Blood Donation"}>
            <BloodIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/system-offer"} title={"Blood Donation"}>
            <SystemOfferIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/setting"} title={"Settings"}>
            <SettingIcon className={`h-8 w-8`} />
          </SidebarIcon>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
