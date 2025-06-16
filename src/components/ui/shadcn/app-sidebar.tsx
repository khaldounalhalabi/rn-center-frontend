"use client";

import AppointmentIcon from "@/components/icons/AppointmentIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import ClinicsShowIcon from "@/components/icons/ClinicsShowIcon";
import HolidaysIcon from "@/components/icons/HolidaysIcon";
import InDoorIcon from "@/components/icons/InDoorIcon";
import MedicineIcon from "@/components/icons/MedicineIcon";
import PatientIcon from "@/components/icons/PatientIcon";
import SchedulesIcon from "@/components/icons/SchedulesIcon";
import ServiceIcon from "@/components/icons/ServiceIcon";
import SpecialitiesIcon from "@/components/icons/SpecialitiesIcon";
import StaffIcon from "@/components/icons/StaffIcon";
import TransactionIcon from "@/components/icons/TransactionIcon";
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
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import useUser from "@/hooks/UserHook";
import { Link } from "@/navigation";
import {
  ArrowUpCircleIcon,
  CalculatorIcon,
  CalendarIcon,
  HandCoinsIcon,
  LayoutDashboard,
  OutdentIcon,
  VariableIcon,
  WalletCards,
} from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("sideBar");
  const { user, role } = useUser();
  const data = {
    navMain: [
      {
        group: t("main"),
        items: [
          {
            title: t("dashboard"),
            url: `/${role}`,
            icon: LayoutDashboard,
          },
        ],
        roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
      },
      {
        group: t("administration"),
        items: [
          {
            title: t("clinics"),
            url: `/${role}/clinics`,
            icon: ClinicsShowIcon,
            roles: [RoleEnum.ADMIN],
            permissions: PermissionEnum.CLINIC_MANAGEMENT,
          },
          {
            title: t("specialties"),
            url: `/${role}/speciality`,
            icon: SpecialitiesIcon,
            roles: [RoleEnum.ADMIN],
            permissions: PermissionEnum.CLINIC_MANAGEMENT,
          },
          {
            title: t("serviceCategories"),
            url: `/${role}/service-categories`,
            icon: CategoryIcon,
            roles: [RoleEnum.ADMIN],
            permissions: PermissionEnum.CLINIC_MANAGEMENT,
          },
          {
            title: t("services"),
            url: `/${role}/service`,
            icon: ServiceIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.DOCTOR],
            permissions: PermissionEnum.CLINIC_MANAGEMENT,
          },
          {
            title: t("holidays"),
            url: `/${role}/holidays`,
            icon: HolidaysIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
            permission: PermissionEnum.HOLIDAYS_MANAGEMENT,
          },
          {
            title: t("vacations"),
            url: `/${role}/vacations`,
            icon: CalendarIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.DOCTOR, RoleEnum.SECRETARY],
            PermissionEnum: PermissionEnum.VACATION_MANAGEMENT,
          },
          {
            title: t("transaction"),
            url: `/${role}/transaction`,
            icon: TransactionIcon,
            roles: [RoleEnum.ADMIN],
          },
          {
            title: t("attendance"),
            url: `/${role}/attendance`,
            icon: InDoorIcon,
            roles: [RoleEnum.ADMIN],
            permission: PermissionEnum.ATTENDANCE_MANAGEMENT,
          },
          {
            title: t("my_attendance"),
            url: `/${role}/my-attendance`,
            icon: OutdentIcon,
            roles: [RoleEnum.SECRETARY, RoleEnum.DOCTOR],
          },
          {
            title: t("secretaries"),
            url: `/${role}/secretaries`,
            icon: StaffIcon,
            roles: [RoleEnum.ADMIN],
          },
          {
            title: t("my_schedule"),
            url: `/${role}/schedule`,
            icon: SchedulesIcon,
            roles: [RoleEnum.DOCTOR, RoleEnum.SECRETARY],
          },
        ],
      },
      {
        group: t("patient_management"),
        items: [
          {
            title: t("appointment"),
            url: `/${role}/appointment`,
            icon: AppointmentIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
          },
          {
            title: t("patients"),
            url: `/${role}/patients`,
            icon: PatientIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
          },
          {
            title: t("medicines"),
            url: `/${role}/medicines`,
            icon: MedicineIcon,
            roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY],
          },
        ],
      },
      {
        group: t("finance"),
        roles: [RoleEnum.ADMIN, RoleEnum.SECRETARY, RoleEnum.DOCTOR],
        items: [
          {
            title: t("formulas"),
            url: `/${role}/formulas`,
            icon: CalculatorIcon,
            roles: [RoleEnum.ADMIN],
            permission: PermissionEnum.PAYROLL_MANAGEMENT,
          },
          {
            title: t("formula_variables"),
            url: `/${role}/formula-variables`,
            icon: VariableIcon,
            roles: [RoleEnum.ADMIN],
            permission: PermissionEnum.PAYROLL_MANAGEMENT,
          },
          {
            title: t("payruns"),
            url: `/${role}/payruns`,
            icon: HandCoinsIcon,
            roles: [RoleEnum.ADMIN],
            permission: PermissionEnum.PAYROLL_MANAGEMENT,
          },
          {
            title: t("payslips"),
            url: `/${role}/payslips`,
            icon: WalletCards,
            roles: [RoleEnum.DOCTOR, RoleEnum.SECRETARY],
          },
        ],
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {!role || !user ? (
                <Skeleton className={"h-full w-full"} />
              ) : (
                <Link href={`/${role}`}>
                  <ArrowUpCircleIcon className="h-5 w-5" />
                  <span className="text-base font-semibold">
                    {t("center_name")}
                  </span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {!user || !role ? (
          <Skeleton className={"h-full w-full"} />
        ) : (
          <NavMain items={data.navMain} user={user} />
        )}
      </SidebarContent>
      <SidebarFooter>
        {!user || !role ? (
          <Skeleton className={"w-full h-full"} />
        ) : (
          <NavUser user={user} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
