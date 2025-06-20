"use client";
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import React from "react";

const Tabs = ({
  tabs,
}: {
  tabs: {
    title: string;
    render: React.ReactNode | (() => React.ReactNode);
  }[];
}) => {
  return (
    <ShadcnTabs defaultValue={tabs?.[0]?.title} className={"my-5"}>
      <TabsList className={`grid w-full grid-cols-${tabs.length}`}>
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={tab.title}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent value={tab.title} key={index}>
          {typeof tab.render == "function" ? tab.render() : tab.render}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
};

export default Tabs;
