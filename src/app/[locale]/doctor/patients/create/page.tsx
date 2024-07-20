import React from "react";
import PatientForm from "@/components/doctor/patients/PatientForm";
import PageCard from "@/components/common/ui/PageCard";

const page = async () => {

  return (
    <PageCard>
      <h2 className="card-title">Add Patient</h2>
      <PatientForm />
    </PageCard>
  );
};

export default page;