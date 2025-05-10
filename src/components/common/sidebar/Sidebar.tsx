"use client";
import React, { useState } from "react";
import "@/app/[locale]/global.css";
import SidebarItem from "@/components/common/sidebar/SidebarItem";
import { useLocale, useTranslations } from "next-intl";
import MenuIcon from "@/components/icons/MenuIcon";
import SidebarIcon from "@/components/common/sidebar/SidebarIcon";
import SidebarCompactIcon from "@/components/common/sidebar/SidebarCompactIcon";
import SidebarCompactItem from "@/components/common/sidebar/SidebarCompactItem";
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
import TransactionIcon from "@/components/icons/TransactionIcon";
import SidebarEnIcon from "@/components/icons/SidebarIconEn";
import SidebarArIcon from "@/components/icons/SidebarArIcon";
import ServiceManagementIcon from "@/components/icons/ServiceManagementIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import HolidaysIcon from "@/components/icons/HolidaysIcon";
import InDoorIcon from "@/components/icons/InDoorIcon";
import StaffIcon from "@/components/icons/StaffIcon";

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
      icon: <DashBordIcon className={`h-7 w-7`} />,
    },
    {
      search: t("clinicsManagement"),
      title: t("clinicsManagement"),
      link: undefined,
      icon: <ClinicIcon className={`h-9 w-9`} />,
      children: [
        {
          search: t("clinics"),
          title: t("clinics"),
          link: "/admin/clinics",
          children: undefined,
          icon: <ClinicsShowIcon className={`mx-2 h-6 w-6`} />,
        },
        {
          search: t("clinicsSchedules"),
          title: t("clinicsSchedules"),
          link: "/admin/clinics/schedules",
          children: undefined,
          icon: <SchedulesIcon className={`mx-2 h-6 w-6`} />,
        },
        {
          search: t("specialties"),
          title: t("specialties"),
          link: "/admin/speciality",
          children: undefined,
          icon: <SpecialitiesIcon className={`h-8 w-8`} />,
        },
      ],
    },
    {
      search: t("services"),
      title: t("services"),
      link: undefined,
      icon: <ServiceManagementIcon className={`h-9 w-9`} />,
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
      icon: <HolidaysIcon className={`h-7 w-7`} />,
    },
    {
      search: t("appointment"),
      title: t("appointment"),
      link: "/admin/appointment",
      children: undefined,
      icon: <AppointmentIcon className={`h-8 w-8`} />,
    },
    {
      search: t("patients"),
      title: t("patients"),
      link: "/admin/patients",
      children: undefined,
      icon: <PatientIcon className={`h-7 w-7`} />,
    },
    {
      search: t("medicines"),
      title: t("medicines"),
      link: "/admin/medicines",
      children: undefined,
      icon: <MedicineIcon className={`h-8 w-8`} />,
    },
    {
      search: t("transaction"),
      title: t("transaction"),
      link: "/admin/transaction",
      icon: <TransactionIcon className={`h-8 w-8`} />,
    },
    {
      search: t("attendance"),
      title: t("attendance"),
      link: "/admin/attendance",
      icon: <InDoorIcon className={"h-8 w-8"} />,
    },
    {
      search: t("secretaries"),
      title: t("secretaries"),
      link: "/admin/secretaries",
      icon: <StaffIcon className={"h-8 w-8"} />,
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
      className={`sidebar z-50 h-full w-full !overflow-visible overflow-y-scroll bg-white duration-300 ease-in-out md:overflow-y-hidden lg:sticky lg:top-0 lg:block lg:w-[25%] lg:max-w-[300px] lg:translate-y-0 lg:flex-col lg:justify-between lg:border-e ${openNavBar.md ? "!w-16" : "lg:w-[35%]"} ${
        openNavBar.sm
          ? "absolute translate-y-0 duration-500 ease-in-out"
          : "absolute h-0 translate-y-[-300vh] duration-700 ease-in-out"
      }`}
    >
      <div className={"h-screen bg-white md:h-full"}>
        <div
          className={`flex h-20 place-content-center items-center justify-between rounded-lg px-4 py-4 text-xs ${openNavBar.md ? "!justify-center !p-0" : ""}`}
        >
          {local == "en" ? (
            <SidebarEnIcon
              className={`h-full w-64 ${openNavBar.md ? "!hidden" : "md:block"}`}
            />
          ) : (
            <SidebarArIcon
              className={`h-full w-64 ${openNavBar.md ? "!hidden" : "md:block"}`}
            />
          )}

          <MenuIcon
            className={`h-8 w-8 cursor-pointer`}
            onClick={() =>
              setOpenNavBar({ sm: !openNavBar.sm, md: !openNavBar.md })
            }
          />
        </div>
        <div className={`relative px-4 ${openNavBar.md ? "hidden" : ""}`}>
          <div
            className={`absolute top-4 flex items-center gap-2 ${local == "ar" ? "left-[8%]" : "right-[8%]"}`}
          >
            <SearchIcon className={"h-5 w-5 opacity-60"} />
          </div>
          <input
            type={"text"}
            placeholder={t("search")}
            className="kodchasan block w-full appearance-none border-0 border-b-2 border-[#c1d5df] bg-transparent px-0 py-2.5 focus:border-[#1FB8B9] focus:outline-none focus:ring-0"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <ul
          className={`h-screen transform space-y-1 overflow-y-scroll px-4 py-5 text-black duration-500 ease-in-out md:h-[85vh] ${openNavBar.md ? "hidden" : ""}`}
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
        className={`mt-5 h-[calc(100vh-64px)] overflow-scroll duration-300 ease-in-out ${openNavBar.md ? "w-full" : "hidden"}`}
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
