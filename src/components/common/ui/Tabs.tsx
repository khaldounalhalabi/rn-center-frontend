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
      <TabsList className={`grid w-full ${getGridColsClass(tabs.length)}`}>
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
function getGridColsClass(gridCols: number): string {
  let className: string;

  switch (gridCols) {
    case 1:
      className = "grid-cols-1";
      break;
    case 2:
      className = "grid-cols-2";
      break;
    case 3:
      className = "grid-cols-3";
      break;
    case 4:
      className = "grid-cols-4";
      break;
    case 5:
      className = "grid-cols-5";
      break;
    case 6:
      className = "grid-cols-6";
      break;
    case 7:
      className = "grid-cols-7";
      break;
    case 8:
      className = "grid-cols-8";
      break;
    case 9:
      className = "grid-cols-9";
      break;
    case 10:
      className = "grid-cols-10";
      break;
    case 11:
      className = "grid-cols-11";
      break;
    case 12:
      className = "grid-cols-12";
      break;
    default:
      className = "grid-cols-1";
  }

  return className;
}
