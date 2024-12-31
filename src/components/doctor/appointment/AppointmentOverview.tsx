"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import { Appointment } from "@/Models/Appointment";
import PrescriptionsTable from "@/components/doctor/appointment/PrescriptionsTable";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import DynamicLoading from "@/components/icons/DynamicLoading";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const AppointmentOverview = ({
  appointment,
}: {
  appointment?: Appointment | undefined;
}) => {
  const t = useTranslations("common.appointment.show");
  const AppointmentDetails = dynamic(
    () => import("@/components/common/Appointment/Overview"),
    {
      ssr: false,
      loading: DynamicLoading,
    },
  );
  return (
    <div className={"w-full"}>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-500 hover:bg-white/[0.12] hover:text-white",
              )
            }
          >
            {t("overview")}
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-blue-400 shadow"
                  : "text-blue-500 hover:bg-white/[0.12] hover:text-white",
              )
            }
          >
            {t("prescriptions")}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={"w-full"}>
            <AppointmentDetails appointment={appointment} userType={"doctor"} />
          </Tab.Panel>
          <Tab.Panel className={"w-full"}>
            <PrescriptionsTable appointment={appointment} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AppointmentOverview;
