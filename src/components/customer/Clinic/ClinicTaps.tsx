"use client";
import { Tab } from "@headlessui/react";

import React from "react";
import Overview from "@/components/customer/Clinic/Overview";
import { Clinic } from "@/Models/Clinic";
import OurWork from "@/components/customer/Clinic/OurWork";
import MapIFrame from "@/components/common/ui/MapIFrame";
import ClinicSchedules from "@/components/customer/Clinic/ClinicSchedules";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const ClinicTaps = ({ clinic }: { clinic: Clinic }) => {
  return (
    <div className={"w-full my-6"}>
      <Tab.Group>
        <Tab.List className="flex flex-row border-b space-x-1 rounded-xl bg-white p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium focus:outline-none",
                selected
                  ? "bg-white text-[#2ECBCC] "
                  : "text-black  hover:text-[#2ECBCC]",
              )
            }
          >
            Overview
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium focus:outline-none",
                selected
                  ? "bg-white text-[#2ECBCC] "
                  : "text-black  hover:text-[#2ECBCC]",
              )
            }
          >
            Schedules
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium focus:outline-none",
                selected
                  ? "bg-white text-[#2ECBCC] "
                  : "text-black  hover:text-[#2ECBCC]",
              )
            }
          >
            Our work
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium focus:outline-none",
                selected
                  ? "bg-white text-[#2ECBCC] "
                  : "text-black  hover:text-[#2ECBCC]",
              )
            }
          >
            Location
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={"w-full"}>
            <Overview clinic={clinic} />
          </Tab.Panel>
          <Tab.Panel>
            <ClinicSchedules clinic={clinic} />
          </Tab.Panel>
          <Tab.Panel>
            <OurWork clinic={clinic} />
          </Tab.Panel>
          <Tab.Panel>
            <MapIFrame iframe={clinic?.user?.address?.map_iframe} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ClinicTaps;
