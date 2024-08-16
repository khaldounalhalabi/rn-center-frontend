import React from "react";
import { ApiResponse } from "@/Http/Response";
import { AddOrUpdateClinicForm, Clinic } from "@/Models/Clinic";
import { ClinicsService } from "@/services/ClinicsService";
import PageCard from "@/components/common/ui/PageCard";
import ClinicForm from "@/components/admin/clinics/ClinicForm";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data: ApiResponse<Clinic> =
    await ClinicsService.make<ClinicsService>().show(clinicId);
  const clinic = data.data;

  const defaultValues: AddOrUpdateClinicForm = {
    ...clinic,
    user: {
      ...clinic?.user,
      photo: clinic?.user?.image,
      image: [],
    },
    phone_numbers: clinic?.user?.phones?.map((ph) => ph.phone),
    address: {
      ...clinic?.user?.address,
      city_id: clinic?.user?.address?.city_id,
      map_iframe: clinic.user?.address?.map_iframe,
    },
    speciality_ids:
      clinic && clinic.specialities
        ? clinic?.specialities?.map((spec) => spec.id)
        : [],
    hospital_id: clinic?.hospital_id,
    specialities: clinic?.specialities,
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
