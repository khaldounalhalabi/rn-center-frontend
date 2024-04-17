"use client";
import PageCard from "@/components/common/ui/PageCard";

import React from "react";
import HolidayForm from "@/components/admin/holidays/HolidayForm";

const page = () => {
  return (
    <div>
      <div className="w-full h-24 flex justify-start items-center">
        <h2 className="ml-5 text-2xl font-medium">Add Holidays</h2>
      </div>
      <PageCard>
        <HolidayForm />
      </PageCard>
    </div>
  );
};

export default page;
