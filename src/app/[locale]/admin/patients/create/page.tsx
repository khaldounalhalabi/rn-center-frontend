import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PatientsForm from "@/components/admin/patients/PatientsForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Patient</h2>
      <PatientsForm />
    </PageCard>
  );
};

export default page;
