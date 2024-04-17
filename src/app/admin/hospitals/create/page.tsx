import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HospitalsForm from "@/components/admin/hospitals/HospitalsForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Hospital</h2>
      <HospitalsForm />
    </PageCard>
  );
};

export default page;
