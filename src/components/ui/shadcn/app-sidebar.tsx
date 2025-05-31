"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  CalculatorIcon,
  HandCoinsIcon,
  LayoutDashboard,
  VariableIcon,
} from "lucide-react";
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
import ClinicsShowIcon from "@/components/icons/ClinicsShowIcon";
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
import { RoleEnum } from "@/enums/RoleEnum";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("sideBar");
  const { user } = useUser();
  const data = {
    navMain: [
      {
        group: t("main"),
        items: [
          {
            title: t("dashboard"),
            url: `/${user?.role}`,
            icon: LayoutDashboard,
          },
        ],
        roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
      },
      {
        group: t("clinic_management"),
        items: [
          {
            title: t("clinics"),
            url: `/${user?.role}/clinics`,
            icon: ClinicsShowIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY],
          },
          {
            title: t("specialties"),
            url: `/${user?.role}/speciality`,
            icon: SpecialitiesIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY],
          },
          {
            title: t("serviceCategories"),
            url: `/${user?.role}/service-categories`,
            icon: CategoryIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY],
          },
          {
            title: t("services"),
            url: `/${user?.role}/service`,
            icon: ServiceIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
          },
          {
            title: t("holidays"),
            url: `/${user?.role}/holidays`,
            icon: HolidaysIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
          },
        ],
      },
      {
        group: t("patient_management"),
        items: [
          {
            title: t("appointment"),
            url: `/${user?.role}/appointment`,
            icon: AppointmentIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
          },
          {
            title: t("patients"),
            url: `/${user?.role}/patients`,
            icon: PatientIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
          },
          {
            title: t("medicines"),
            url: `/${user?.role}/medicines`,
            icon: MedicineIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY],
          },
        ],
      },
      {
        group: t("administration"),
        items: [
          {
            title: t("transaction"),
            url: `/${user?.role}/transaction`,
            icon: TransactionIcon,
            roles: [RoleEnum.ADMIN],
          },
          {
            title: t("attendance"),
            url: `/${user?.role}/attendance`,
            icon: InDoorIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
          },
          {
            title: t("secretaries"),
            url: `/${user?.role}/secretaries`,
            icon: StaffIcon,
            roles: [RoleEnum.ADMIN],
          },
        ],
      },
      {
        group: t("finance"),
        roles: [RoleEnum.ADMIN],
        items: [
          {
            title: t("formulas"),
            url: `/${user?.role}/formulas`,
            icon: CalculatorIcon,
            roles: [RoleEnum.ADMIN],
          },
          {
            title: t("formula_variables"),
            url: `/${user?.role}/formula-variables`,
            icon: VariableIcon,
            roles: [RoleEnum.ADMIN],
          },
          {
            title: t("payruns"),
            url: `/${user?.role}/payruns`,
            icon: HandCoinsIcon,
            roles: [RoleEnum.ADMIN],
          },
        ],
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
              <Link href={`/${user?.role}`}>
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">
                  {t("center_name")}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} user={user} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
