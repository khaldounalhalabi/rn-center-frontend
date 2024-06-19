import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import MedicinesForm from "@/components/common/Medicine/MedicinesForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Medicines</h2>
      <MedicinesForm />
    </PageCard>
  );
};

export default page;