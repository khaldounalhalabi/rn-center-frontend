import ServiceForm from "@/components/admin/service/ServiceForm";
import PageCard from "@/components/common/ui/PageCard";
import React from "react";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Service</h2>
      <ServiceForm />
    </PageCard>
  );
};

export default page;
