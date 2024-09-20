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
import UsersIcon from "@/components/icons/UsersIcon";
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
import SettingManagementIcon from "@/components/icons/SettingManagementIcon";
import ServiceManagementIcon from "@/components/icons/ServiceManagementIcon";
import OffersManagementIcon from "@/components/icons/OffersManagementIcon";

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
      className={`lg:block w-full !overflow-visible  min-h-screen overflow-y-hidden lg:w-[25%] lg:max-w-[300px]  lg:translate-y-0 z-20 lg:sticky lg:top-0 bg-white  lg:flex-col lg:justify-between lg:border-e ease-in-out duration-300 lg:bg-white
       ${openNavBar.md ? " !w-16 " : " lg:w-[35%]"}
       ${
         openNavBar.sm
           ? "absolute  translate-y-0 ease-in-out duration-500"
           : "absolute h-0 translate-y-[-300vh] ease-in-out duration-700"
       }`}
    >
      <div className={"overflow-hidden "}>
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
          <SidebarItem
            setOpenNavBar={setOpenNavBar}
            openNavBar={openNavBar}
            link={"/admin"}
          >
            {" "}
            {t("dashboard")}
          </SidebarItem>
          <SidebarCompactItem
            title={t("clinicsManagement")}
            links={[
              "/admin/clinics",
              "/admin/clinics/schedules",
              "/admin/clinics/holidays",
              "/admin/subscriptions",
              "/admin/speciality",
              "/admin/medicines",
            ]}
          >
            <div className="flex flex-col">
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/clinics"}
              >
                {" "}
                {t("clinics")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/clinics/schedules"}
              >
                {t("clinicsSchedules")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/clinics/holidays"}
              >
                {t("clinicsHolidays")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/subscriptions"}
              >
                {t("subscriptions")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/speciality"}
              >
                {t("specialties")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/medicines"}
              >
                {t("medicines")}
              </SidebarItem>
            </div>
          </SidebarCompactItem>
          <div className="flex flex-col">
            <SidebarItem
              setOpenNavBar={setOpenNavBar}
              openNavBar={openNavBar}
              link={"/admin/appointment"}
            >
              {t("appointment")}
            </SidebarItem>
            <SidebarCompactItem
              title={t("patientsManagement")}
              links={["/admin/patients", "/admin/patient-profiles"]}
            >
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/patients"}
              >
                {t("patients")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/patient-profiles"}
              >
                {t("patientProfiles")}
              </SidebarItem>
            </SidebarCompactItem>

            <SidebarCompactItem
              title={t("offersManagement")}
              links={["/admin/offer", "/admin/system-offer"]}
            >
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/offer"}
              >
                {t("offers")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/system-offer"}
              >
                {t("systemOffers")}
              </SidebarItem>
            </SidebarCompactItem>
            <SidebarCompactItem
              title={t("accountantManagement")}
              links={["/admin/transaction", "/admin/appointment-deductions"]}
            >
              <div className="flex flex-col">
                <SidebarItem
                  setOpenNavBar={setOpenNavBar}
                  openNavBar={openNavBar}
                  link={"/admin/transaction"}
                >
                  {t("transaction")}
                </SidebarItem>
                <SidebarItem
                  setOpenNavBar={setOpenNavBar}
                  openNavBar={openNavBar}
                  link={"/admin/appointment-deductions"}
                >
                  {t("appointmentDeductions")}
                </SidebarItem>
              </div>
            </SidebarCompactItem>

            <SidebarCompactItem
              title={t("services")}
              links={["/admin/category", "/admin/service"]}
            >
              <div className="flex flex-col">
                <SidebarItem
                  setOpenNavBar={setOpenNavBar}
                  openNavBar={openNavBar}
                  link={"/admin/category"}
                >
                  {t("serviceCategories")}
                </SidebarItem>
                <SidebarItem
                  setOpenNavBar={setOpenNavBar}
                  openNavBar={openNavBar}
                  link={"/admin/service"}
                >
                  {t("services")}
                </SidebarItem>
              </div>
            </SidebarCompactItem>

            <SidebarCompactItem
              title={t("hospitalsManagement")}
              links={["/admin/hospitals", "/admin/hospital-departments"]}
            >
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/hospitals"}
              >
                {t("hospitals")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/hospital-departments"}
              >
                {t("availableDepartments")}
              </SidebarItem>
            </SidebarCompactItem>

            <SidebarItem
              setOpenNavBar={setOpenNavBar}
              openNavBar={openNavBar}
              link={"/admin/user"}
            >
              {t("users")}
            </SidebarItem>
            <SidebarItem
              setOpenNavBar={setOpenNavBar}
              openNavBar={openNavBar}
              link={"/admin/blood-donation"}
            >
              {t("bloodDonation")}
            </SidebarItem>
            <SidebarItem
              setOpenNavBar={setOpenNavBar}
              openNavBar={openNavBar}
              link={"/admin/enquiries"}
            >
              {t("enquiries")}
            </SidebarItem>

            <SidebarCompactItem
              title={t("settings")}
              links={["/admin/setting", "/admin/blocked-item"]}
            >
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/setting"}
              >
                {t("settings")}
              </SidebarItem>
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={"/admin/blocked-item"}
              >
                {t("blockedItems")}
              </SidebarItem>
            </SidebarCompactItem>
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
                <ClinicsShowIcon className={`h-6 w-6 mx-2`} />
              </SidebarIcon>
              <SidebarIcon
                link={"/admin/clinics/schedules"}
                title={t("clinicsSchedules")}
              >
                <SchedulesIcon className={`h-6 w-6 mx-2`} />
              </SidebarIcon>
              <SidebarIcon
                link={"/admin/clinics/holidays"}
                title={t("clinicsHolidays")}
              >
                <HolidaysIcon className={`h-6 w-6 mx-2`} />
              </SidebarIcon>
              <SidebarIcon link={"/admin/subscriptions"} title={"Subscriptions"}>
                <SubscriptionIcon className={`h-7 w-7`} />
              </SidebarIcon>
              <SidebarIcon link={"/admin/speciality"} title={t("specialties")}>
                <SpecialitiesIcon className={`h-8 w-8`} />
              </SidebarIcon>
              <SidebarIcon link={"/admin/medicines"} title={"Medicines"}>
                <MedicineIcon className={`h-8 w-8`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>
          <SidebarIcon link={"/admin/appointment"} title={t("appointment")}>
            <AppointmentIcon className={`h-8 w-8`} />
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
          <SidebarCompactIcon
              title={t("offersManagement")}
              icon={<OffersManagementIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
              <SidebarIcon link={"/admin/offer"} title={"Offers"}>
                <OfferIcon className={`h-8 w-8`} />
              </SidebarIcon>
              <SidebarIcon link={"/admin/system-offer"} title={"Blood Donation"}>
                <SystemOfferIcon className={`h-8 w-8`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>
          <SidebarCompactIcon
              title={"Accountant Management"}
              icon={<CompacTransactiontIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
              <SidebarIcon link={"/admin/transaction"} title={"Transaction"}>
                <TransactionIcon className={`h-8 w-8 `} />
              </SidebarIcon>
              <SidebarIcon
                  link={"/admin/appointment-deductions"}
                  title={"Appointment Deductions"}
              >
                <AppointmentDeductionstIcon className={`h-8 w-8 `} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>
          <SidebarCompactIcon
              title={"Service"}
              icon={<ServiceManagementIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
              <SidebarIcon link={"/admin/category"} title={t("serviceCategories")}>
                <CategoryIcon className={`h-8 w-8`} />
              </SidebarIcon>
              <SidebarIcon link={"/admin/service"} title={t("services")}>
                <ServiceIcon className={`h-8 w-8`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>


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


          <SidebarIcon link={"/admin/user"} title={"Users"}>
            <UsersIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/blood-donation"} title={"Blood Donation"}>
            <BloodIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/admin/enquiries"} title={"Enquiries"}>
            <EnquirieIcon className={`h-8 w-8`} />
          </SidebarIcon>



          <SidebarCompactIcon
              title={"Settings Management"}
              icon={<SettingManagementIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">
              <SidebarIcon link={"/admin/setting"} title={"Settings"}>
                <SettingIcon className={`h-8 w-8`} />
              </SidebarIcon>
              <SidebarIcon link={"/admin/blocked-item"} title={"Blocked Items"}>
                <BlockedItemIcon className={`h-7 w-7`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>

        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;