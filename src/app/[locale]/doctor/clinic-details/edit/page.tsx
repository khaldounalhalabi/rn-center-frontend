import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { AuthService } from "@/services/AuthService";
import ClinicDetailsForm from "@/components/doctor/clinicDetails/ClinicDetailsForm";

const page = async () => {
  const UserDetails = (
    await AuthService.make<AuthService>("doctor").GetClinicDetails()
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Clinic Details</h2>
      <ClinicDetailsForm
        defaultValues={{
          ...UserDetails,
        }}
      />
    </PageCard>
  );
};

export default page;