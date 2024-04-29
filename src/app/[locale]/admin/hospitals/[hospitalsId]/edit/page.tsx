import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HospitalsForm from "@/components/admin/hospitals/HospitalsForm";
import { HospitalService } from "@/services/HospitalService";
import { Phone } from "@/Models/Phone";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { hospitalsId },
}: {
  params: { hospitalsId: number };
}) => {
    const t = await getTranslations('admin.hospitals.creat-edit')

    const hospital = (
    await HospitalService.make<HospitalService>().show(hospitalsId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editHospital")}</h2>
      <HospitalsForm
        type={"update"}
        defaultValues={{
          ...hospital,
          phone_numbers:
            hospital?.phones?.map((phone: Phone) => phone.phone) ?? [],
          photos: hospital?.images,
          address: hospital?.address,
          images: [],
        }}
        id={hospital.id}
      />
    </PageCard>
  );
};

export default page;
