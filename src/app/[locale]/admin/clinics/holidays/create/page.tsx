import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HolidayForm from "@/components/admin/holidays/HolidayForm";

const page = () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Holidays</h2>
      <HolidayForm />
    </PageCard>
  );
};

export default page;
