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
          className={`flex justify-between items-center place-content-center px-4 pt-6 pb-3 rounded-lg h-10 text-xs ${openNavBar.md ? " !justify-center !p-0" : ""}`}
        >
          {/*Logo*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 394 80"
            className={`w-36 px-2 ease-in-out duration-500 transform ${openNavBar.md ? " hidden" : ""}`}
          >
            <path
              fill="#000"
              d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"
            />
            <path
              fill="#000"
              d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"
            />
          </svg>
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
          <SidebarItem link={"/doctor"}> {("Dashboard")}</SidebarItem>
          <SidebarCompactItem title={("Clinic Management")}>
            <div className="flex flex-col">
              <SidebarItem link={"/doctor/clinic/schedules"}>
                {("Clinics Schedules")}
              </SidebarItem>
              <SidebarItem link={"/doctor/clinic/holidays"}>
                {("Clinic Holidays")}
              </SidebarItem>
            </div>
          </SidebarCompactItem>
          <SidebarItem link={"/doctor/service"}>{t("services")}</SidebarItem>
          <SidebarItem link={"/doctor/offer"}>Offers</SidebarItem>


        </ul>
      </div>
      <div
        className={`mt-5 overflow-scroll ease-in-out h-[calc(100vh-64px)] duration-300 ${openNavBar.md ? "w-full" : " hidden"}`}
      >
        <ul className={''}>
          <SidebarIcon link={"/doctor"} title={t("dashboard")}>
            <DashBordIcon className={`h-7 w-7 `} />
          </SidebarIcon>
          <SidebarCompactIcon
              title={("Clinic Management")}
              icon={<ClinicIcon className={`h-9 w-9 `} />}
          >
            <div className="flex flex-col">

              <SidebarIcon
                  link={"/doctor/clinic/schedules"}
                  title={("Clinics Schedules")}
              >
                <SchedulesIcon className={`h-7 w-7 mx-3`} />
              </SidebarIcon>
              <SidebarIcon
                  link={"/doctor/clinic/holidays"}
                  title={("Clinic Holidays")}
              >
                <HolidaysIcon className={`h-7 w-7 mx-3`} />
              </SidebarIcon>
            </div>
          </SidebarCompactIcon>
          <SidebarIcon link={"/doctor/service"} title={t("services")}>
            <ServiceIcon className={`h-8 w-8`} />
          </SidebarIcon>
          <SidebarIcon link={"/doctor/offer"} title={"Offers"}>
            <OfferIcon className={`h-8 w-8`} />
          </SidebarIcon>
        </ul>
      </div>
    </div>
  );
};

export default SidebarDoctor;