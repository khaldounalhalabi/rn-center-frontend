"use client";
import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SpecialityForm from "@/components/admin/speciality/SpecialityForm";

const page = () => {
  return (
    <PageCard>
      <h2 className="card-title">{"Add Speciality"}</h2>
      <SpecialityForm />
    </PageCard>
  );
};

export default page;
