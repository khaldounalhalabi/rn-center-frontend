import React from "react";
import PageCard from "@/components/common/ui/PageCard";
import ClinicForm from "@/components/admin/clinics/ClinicForm";

const Page = () => {
  return (
    <PageCard>
      <ClinicForm type={"store"} />
    </PageCard>
  );
};
export default Page;
