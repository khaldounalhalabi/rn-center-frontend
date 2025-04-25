"use client";
import { Tab } from "@headlessui/react";
import React from "react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({
  tabs,
}: {
  tabs: {
    title: string;
    render: React.ReactNode | (() => React.ReactNode);
  }[];
}) => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
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
            {tab.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {tabs.map((tab, index) => (
          <Tab.Panel key={index} className={"w-full"}>
            {typeof tab.render == "function" ? tab.render() : tab.render}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
