"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import Overview from "@/components/admin/appointment/Overview";
import { Appointment } from "@/Models/Appointment";
import AppointmentLogs from "@/components/admin/appointment/AppointmentLogs";
import PrescriptionsTable from "@/components/admin/prescriptions/TebalPrescriptions";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const AppointmentOverview = ({
  appointment,
}: {
  appointment?: Appointment | null | undefined;
}) => {
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
            Overview
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
            Logs
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
            Prescriptions
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={"w-full"}>
            <Overview appointment={appointment} />
          </Tab.Panel>
          <Tab.Panel className={"w-full"}>
            <AppointmentLogs appointment={appointment} />
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
