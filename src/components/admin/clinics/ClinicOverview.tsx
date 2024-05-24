"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import { Clinic } from "@/Models/Clinic";
import Overview from "@/components/admin/clinics/Overview";
import { useTranslations } from "next-intl";
import Appointments from "@/components/admin/clinics/Appointments";
import ClinicSubscriptionTable from "@/components/admin/clinics/ClinicSubscriptionTable";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const ClinicOverview = ({ clinic }: { clinic: Clinic | null | undefined }) => {
  const t = useTranslations("admin.clinic.show");
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
            {t("appointments")}
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
            Clinic Subscription
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={"w-full"}>
            <Overview clinic={clinic} />
          </Tab.Panel>
          <Tab.Panel>
            <Appointments clinicId={clinic?.id ?? 0} />
          </Tab.Panel>
          <Tab.Panel>
            <ClinicSubscriptionTable clinicId={clinic?.id ?? 0} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ClinicOverview;