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
import ClinicIcon from "@/components/icons/ClinicIcon";
import ClinicsShowIcon from "@/components/icons/ClinicsShowIcon";
import SchedulesIcon from "@/components/icons/SchedulesIcon";
import SpecialitiesIcon from "@/components/icons/SpecialitiesIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import ServiceIcon from "@/components/icons/ServiceIcon";
import AppointmentIcon from "@/components/icons/AppointmentIcon";
import MedicineIcon from "@/components/icons/MedicineIcon";
import PatientIcon from "@/components/icons/PatientIcon";
import PatientProfilesIcon from "@/components/icons/PatientProfilesIcon";
import PatientMangerIcon from "@/components/icons/PatientMangerIcon";
import TransactionIcon from "@/components/icons/TransactionIcon";
import SidebarEnIcon from "@/components/icons/SidebarIconEn";
import SidebarArIcon from "@/components/icons/SidebarArIcon";
import ServiceManagementIcon from "@/components/icons/ServiceManagementIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import HolidaysIcon from "@/components/icons/HolidaysIcon";

interface SidebarItem {
  search: string;
  title: string;
  link?: string;
  children?: SidebarItem[];
  icon?: any;
}

const Sidebar = ({
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

  const [searchTerm, setSearchTerm] = useState("");

  const sidebarItems: SidebarItem[] = [
    {
      search: t("dashboard"),
      title: t("dashboard"),
      link: "/admin",
      icon: <DashBordIcon className={`h-7 w-7 `} />,
    },
    {
      search: t("clinicsManagement"),
      title: t("clinicsManagement"),
      link: undefined,
      icon: <ClinicIcon className={`h-9 w-9 `} />,
      children: [
        {
          search: t("clinics"),
          title: t("clinics"),
          link: "/admin/clinics",
          children: undefined,
          icon: <ClinicsShowIcon className={`h-6 w-6 mx-2`} />,
        },
        {
          search: t("clinicsSchedules"),
          title: t("clinicsSchedules"),
          link: "/admin/clinics/schedules",
          children: undefined,
          icon: <SchedulesIcon className={`h-6 w-6 mx-2`} />,
        },
        {
          search: t("specialties"),
          title: t("specialties"),
          link: "/admin/speciality",
          children: undefined,
          icon: <SpecialitiesIcon className={`h-8 w-8`} />,
        },
        {
          search: t("medicines"),
          title: t("medicines"),
          link: "/admin/medicines",
          children: undefined,
          icon: <MedicineIcon className={`h-8 w-8`} />,
        },
      ],
    },
    {
      search: t("services"),
      title: t("services"),
      link: undefined,
      icon: <ServiceManagementIcon className={`h-9 w-9 `} />,
      children: [
        {
          search: t("serviceCategories"),
          title: t("serviceCategories"),
          link: "/admin/service-categories",
          children: undefined,
          icon: <CategoryIcon className={`h-8 w-8`} />,
        },
        {
          search: t("services"),
          title: t("services"),
          link: "/admin/service",
          children: undefined,
          icon: <ServiceIcon className={`h-8 w-8`} />,
        },
      ],
    },
    {
      search: t("holidays"),
      title: t("holidays"),
      link: "/admin/holidays",
      icon: <HolidaysIcon className={`h-7 w-7 `} />,
    },
    {
      search: t("appointment"),
      title: t("appointment"),
      link: "/admin/appointment",
      children: undefined,
      icon: <AppointmentIcon className={`h-8 w-8`} />,
    },
    {
      search: t("patientsManagement"),
      title: t("patientsManagement"),
      link: undefined,
      icon: <PatientMangerIcon className={`h-9 w-9 `} />,
      children: [
        {
          search: t("patients"),
          title: t("patients"),
          link: "/admin/patients",
          children: undefined,
          icon: <PatientIcon className={`h-7 w-7`} />,
        },
        {
          search: t("patientProfiles"),
          title: t("patientProfiles"),
          link: "/admin/patient-profiles",
          children: undefined,
          icon: <PatientProfilesIcon className={`h-7 w-7`} />,
        },
      ],
    },

    {
      search: t("transaction"),
      title: t("transaction"),
      link: "/admin/transaction",
      icon: <TransactionIcon className={`h-8 w-8 `} />,
    },
  ];

  const filteredItems = sidebarItems.filter(
    (item) =>
      item.search.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.children?.map((child) =>
        child.search?.toLowerCase()?.includes(searchTerm.toLowerCase()),
      )?.length,
  );

  return (
    <div
      className={`lg:block sidebar w-full !overflow-visible h-full overflow-y-scroll md:overflow-y-hidden lg:w-[25%] lg:max-w-[300px] lg:translate-y-0 z-50 lg:sticky lg:top-0 bg-white  lg:flex-col lg:justify-between lg:border-e ease-in-out duration-300
       ${openNavBar.md ? " !w-16 " : " lg:w-[35%]"}
       ${
         openNavBar.sm
           ? "absolute  translate-y-0 ease-in-out duration-500"
           : "absolute h-0 translate-y-[-300vh] ease-in-out duration-700"
       }`}
    >
      <div className={"h-screen md:h-full bg-white"}>
        <div
          className={`px-4 flex py-4 justify-between items-center place-content-center rounded-lg h-20 text-xs ${openNavBar.md ? " !justify-center !p-0" : ""}`}
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

          <MenuIcon
            className={`h-8 w-8 cursor-pointer`}
            onClick={() =>
              setOpenNavBar({ sm: !openNavBar.sm, md: !openNavBar.md })
            }
          />
        </div>
        <div className={`px-4 relative ${openNavBar.md ? " hidden " : ""}`}>
          <div
            className={`absolute flex gap-2  top-4 items-center  ${local == "ar" ? "left-[8%]" : "right-[8%]"}`}
          >
            <SearchIcon className={"w-5 h-5  opacity-60"} />
          </div>
          <input
            type={"text"}
            placeholder={t("search")}
            className="block  w-full  kodchasan py-2.5 px-0  bg-transparent border-0 border-b-2
                    border-[#c1d5df] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1FB8B9]"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <ul
          className={`space-y-1 px-4 py-5 h-screen md:h-[85vh] text-black ease-in-out duration-500 transform overflow-y-scroll ${openNavBar.md ? " hidden " : ""}`}
        >
          {searchTerm ? (
            filteredItems?.map((item, index) => (
              <SidebarItem
                setOpenNavBar={setOpenNavBar}
                openNavBar={openNavBar}
                link={item.link}
                key={index}
              >
                {" "}
                {item.title}
              </SidebarItem>
            ))
          ) : (
            <>
              {sidebarItems.map((item, index) => {
                if (item.children) {
                  return (
                    <SidebarCompactItem
                      key={index * 40}
                      links={item.children.map((child) => child.link ?? "")}
                      title={item.title}
                    >
                      {item.children.map((child, childIndex) => (
                        <SidebarItem
                          key={childIndex * 10}
                          openNavBar={openNavBar}
                          setOpenNavBar={setOpenNavBar}
                          link={child.link}
                        >
                          {child.title}
                        </SidebarItem>
                      ))}
                    </SidebarCompactItem>
                  );
                }
                return (
                  <SidebarItem
                    openNavBar={openNavBar}
                    setOpenNavBar={setOpenNavBar}
                    link={item.link}
                    key={index * 40}
                  >
                    {item.title}
                  </SidebarItem>
                );
              })}
            </>
          )}
        </ul>
      </div>
      <div
        className={`mt-5 overflow-scroll ease-in-out h-[calc(100vh-64px)] duration-300 ${openNavBar.md ? "w-full" : " hidden"}`}
      >
        <ul className={"bg-white"}>
          {sidebarItems.map((item, index) => {
            if (item.children) {
              return (
                <SidebarCompactIcon
                  key={index * 30}
                  title={item.title}
                  icon={item.icon}
                >
                  {item.children.map((child, childIndex) => (
                    <SidebarIcon
                      key={childIndex * 20}
                      link={child.link ?? ""}
                      title={child.title}
                    >
                      {child.icon}
                    </SidebarIcon>
                  ))}
                </SidebarCompactIcon>
              );
            }
            return (
              <SidebarIcon
                key={index * 30}
                link={item.link ?? ""}
                title={item.title}
              >
                {item.icon}
              </SidebarIcon>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
