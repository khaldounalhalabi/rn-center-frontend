import React from "react";
import { ApiResponse } from "@/Http/Response";
import { AddOrUpdateClinicForm, Clinic } from "@/Models/Clinic";
import { ClinicService } from "@/services/ClinicService";
import PageCard from "@/components/common/ui/PageCard";
import ClinicForm from "@/components/admin/clinics/ClinicForm";
import { translate } from "@/Helpers/ObjectHelpers";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data: ApiResponse<Clinic> = await ClinicService.make().show(clinicId);
  const clinic = data.data;

  const defaultValues: AddOrUpdateClinicForm = {
    name: translate(clinic?.name, true),
    user: {
      ...clinic?.user,
      first_name: translate(clinic?.user?.first_name, true),
      middle_name: translate(clinic?.user?.middle_name, true),
      last_name: translate(clinic?.user?.last_name, true),
      image: null,
    },
    phone_numbers: clinic?.user?.phones.map((ph) => ph.phone),
    address: {
      name: translate(clinic?.user?.address?.name, true),
      city_id: clinic?.user?.address?.city_id,
      lat: clinic?.user?.address?.lat,
      lng: clinic?.user?.address?.lng,
    },
    speciality_ids: clinic?.specialities?.map((spec) => spec.id),
    hospital_id: clinic?.hospital_id,
  };
  return (
    <PageCard>
      <ClinicForm
        type={"update"}
        defaultValues={{ ...clinic, ...defaultValues }}
        id={clinic?.id}
      />
    </PageCard>
  );
};

export default Page;
