import React from "react";
import { User } from "@/Models/User";
import { PatientService } from "@/services/PatientService";
import { Customer } from "@/Models/Customer";
import { getTranslations } from "next-intl/server";
import UserDataView from "@/components/common/User/UserDataView";
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import PatientsOverview from "@/components/admin/patients/PatientsOverview";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const t = await getTranslations("common.patient.show");
  const attachmentsT = await getTranslations("common.patient.attachments");

  const data = await PatientService.make<PatientService>().show(patientId);
  const user: User | undefined = data?.data.user;
  const patient: Customer = data?.data;

  return (
    <UserDataView
      user={patient?.user}
      editUrl={`/admin/patients/${patientId}/edit`}
    >
      <Grid>
        <LabelValue label={t("blood")} value={patient?.blood_group} />
        <LabelValue label={t("birthDate")} value={patient?.birth_date} />
        <LabelValue label={t("age")} value={patient?.age} />
        <LabelValue label={t("joined_at")} value={patient?.created_at} />
        {patient.other_data?.map((item, index) => (
          <div className={"md:col-span-2"}><LabelValue key={index} label={item.key} value={item.value} col /></div>
        ))}
      </Grid>
      <PatientsOverview patient={patient} />
    </UserDataView>
  );
};

export default page;
