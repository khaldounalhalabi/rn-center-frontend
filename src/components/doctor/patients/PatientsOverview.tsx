"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import { User } from "@/Models/User";
import PatientDetails from "@/components/common/PatientProfile/PatientDetails";
import {Customer} from "@/Models/Customer";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const PatientsOverview = ({
                              patient,
                              id,
                          }: {
    patient: Customer ;
    id: number;
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
                        {"Overview"}
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
                        Appointment
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
                    <Tab.Panel>
                        <PatientDetails patient={patient} typePage={"doctor"}/>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div></div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div></div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default PatientsOverview;