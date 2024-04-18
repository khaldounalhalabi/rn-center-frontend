import React from "react";
import { ApiResponse } from "@/Http/Response";
import { AddOrUpdateClinicForm, Clinic } from "@/Models/Clinic";
import { ClinicService } from "@/services/ClinicService";
import PageCard from "@/components/common/ui/PageCard";
import ClinicForm from "@/components/admin/clinics/ClinicForm";
import { translate } from "@/Helpers/Translations";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data: ApiResponse<Clinic> = await ClinicService.make().show(clinicId);
  const clinic = data.data;

  const defaultValues: AddOrUpdateClinicForm = {
    ...clinic,
    user: {
      ...clinic?.user,
      image: null,
    },
    phone_numbers: clinic?.user?.phones.map((ph) => ph.phone),
    address: {
      ...clinic?.user?.address,
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
