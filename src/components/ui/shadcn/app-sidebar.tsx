"use client";

import * as React from "react";
import { ArrowUpCircleIcon } from "lucide-react";
import { NavMain } from "@/components/ui/shadcn/nav-main";
import { NavUser } from "@/components/ui/shadcn/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/shadcn/sidebar";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/UserHook";
import DashBordIcon from "@/components/icons/DashBordIcon";
import ClinicsShowIcon from "@/components/icons/ClinicsShowIcon";
import SchedulesIcon from "@/components/icons/SchedulesIcon";
import SpecialitiesIcon from "@/components/icons/SpecialitiesIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import ServiceIcon from "@/components/icons/ServiceIcon";
import HolidaysIcon from "@/components/icons/HolidaysIcon";
import AppointmentIcon from "@/components/icons/AppointmentIcon";
import PatientIcon from "@/components/icons/PatientIcon";
import MedicineIcon from "@/components/icons/MedicineIcon";
import TransactionIcon from "@/components/icons/TransactionIcon";
import InDoorIcon from "@/components/icons/InDoorIcon";
import StaffIcon from "@/components/icons/StaffIcon";
import { Link } from "@/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("sideBar");
  const { user } = useUser();
  const data = {
    navMain: [
      {
        title: t("dashboard"),
        url: "/admin",
        icon: DashBordIcon,
      },
      {
        title: t("clinics"),
        url: "/admin/clinics",
        icon: ClinicsShowIcon,
      },
      {
        title: t("specialties"),
        url: "/admin/speciality",
        icon: SpecialitiesIcon,
      },
      {
        title: t("serviceCategories"),
        url: "/admin/service-categories",
        icon: CategoryIcon,
      },
      {
        title: t("services"),
        url: "/admin/service",
        icon: ServiceIcon,
      },
      {
        title: t("holidays"),
        url: "/admin/holidays",
        icon: HolidaysIcon,
      },
      {
        title: t("appointment"),
        url: "/admin/appointment",
        icon: AppointmentIcon,
      },
      {
        title: t("patients"),
        url: "/admin/patients",
        icon: PatientIcon,
      },
      {
        title: t("medicines"),
        url: "/admin/medicines",
        icon: MedicineIcon,
      },
      {
        title: t("transaction"),
        url: "/admin/transaction",
        icon: TransactionIcon,
      },
      {
        title: t("attendance"),
        url: "/admin/attendance",
        icon: InDoorIcon,
      },
      {
        title: t("secretaries"),
        url: "/admin/secretaries",
        icon: StaffIcon,
      },
    ],
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/admin">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Reslan Alnaal Center</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
