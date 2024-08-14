"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import PatientDetails from "@/components/common/PatientProfile/PatientDetails";
import { Customer } from "@/Models/Customer";
import PrescriptionsTable from "@/components/doctor/patients/PrescriptionsTable";
import AppointmentTable from "./AppointmentTable";
import {useTranslations} from "next-intl";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const PatientsOverview = ({
  patient,
  id,
}: {
  patient: Customer;
  id: number;
}) => {
  const t = useTranslations('common.patient.show')
  console.log(patient)
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
            {t("appointment")}
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
          <Tab.Panel>
            <PatientDetails patient={patient} typePage={"doctor"} />
          </Tab.Panel>
          <Tab.Panel>
            <AppointmentTable customer={patient} />
          </Tab.Panel>
          <Tab.Panel>
            <PrescriptionsTable patient={patient} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PatientsOverview;