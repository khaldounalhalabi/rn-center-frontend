import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HospitalsForm from "@/components/admin/hospitals/HospitalsForm";
import {getTranslations} from "next-intl/server";

const page = async () => {
    const t = await getTranslations('admin.hospitals.create-edit')
  return (
    <PageCard>
      <h2 className="card-title">{t('addHospital')}</h2>
      <HospitalsForm />
    </PageCard>
  );
};

export default page;
