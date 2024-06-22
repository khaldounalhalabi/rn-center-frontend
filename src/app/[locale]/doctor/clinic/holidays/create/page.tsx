import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HolidayForm from "@/components/doctor/holiday/HolidayForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">{"Add Holidays"}</h2>
      <HolidayForm />
    </PageCard>
  );
};

export default page;