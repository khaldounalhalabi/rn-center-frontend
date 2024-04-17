import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SpecialityForm from "@/components/admin/speciality/SpecialityForm";
import { SpecialityService } from "@/services/SpecialityService";

const page = async ({
  params: { specialityId },
}: {
  params: { specialityId: number };
}) => {
  const speciality = (await SpecialityService.make().show(specialityId)).data;
  return (
    <PageCard>
      <h2 className="card-title">Speciality Details</h2>
      <SpecialityForm type={"update"} defaultValues={speciality} />
    </PageCard>
  );
};

export default page;
