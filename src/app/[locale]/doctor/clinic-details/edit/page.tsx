import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { AuthService } from "@/services/AuthService";
import ClinicDetailsForm from "@/components/doctor/clinicDetails/ClinicDetailsForm";
import {getTranslations} from "next-intl/server";

const page = async () => {
  const UserDetails = (
    await AuthService.make<AuthService>("doctor").GetClinicDetails()
  ).data;
    const t = await getTranslations("doctor.clinic-details.edit")

    return (
    <PageCard>
      <h2 className="card-title">{t("editClinicDetails")}</h2>
      <ClinicDetailsForm
        defaultValues={{
          ...UserDetails,
        }}
      />
    </PageCard>
  );
};

export default page;