import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HospitalsForm from "@/components/admin/hospitals/HospitalsForm";
import { HospitalService } from "@/services/HospitalService";
import { Phone } from "@/Models/Phone";

const page = async ({
  params: { hospitalsId },
}: {
  params: { hospitalsId: number };
}) => {
  const hospital = (await HospitalService.make().show(hospitalsId)).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Hospital</h2>
      <HospitalsForm
        type={"update"}
        defaultValues={{
          ...hospital,
          phone_numbers: hospital?.phones?.map((phone: Phone) => phone.phone),
        }}
        id={hospital.id}
      />
    </PageCard>
  );
};

export default page;
