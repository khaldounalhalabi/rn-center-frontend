import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SpecialityForm from "@/components/admin/speciality/SpecialityForm";
import { SpecialityService } from "@/services/SpecialityService";

const page = async ({
  params: { specialityId },
}: {
  params: { specialityId: number };
}) => {
  const speciality = (
    await SpecialityService.make<SpecialityService>().show(specialityId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Speciality</h2>
      <SpecialityForm type={"update"} defaultValues={speciality} />
    </PageCard>
  );
};

export default page;
