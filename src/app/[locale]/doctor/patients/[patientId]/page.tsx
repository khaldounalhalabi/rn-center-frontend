import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import UserDataView from "@/components/common/user/UserDataView";
import PatientOverview from "@/components/doctor/patients/PatientOverview";
import { RoleEnum } from "@/enums/RoleEnum";
import { Customer } from "@/models/Customer";
import { PatientService } from "@/services/PatientService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const t = await getTranslations("common.patient.show");
  await getTranslations("common.patient.attachments");
  const data = await PatientService.make(RoleEnum.DOCTOR).show(patientId);
  const patient: Customer = data?.data;

  return (
    <UserDataView user={patient?.user}>
      <Grid>
        <LabelValue label={t("blood")} value={patient?.blood_group} />
        <LabelValue label={t("birthDate")} value={patient?.birth_date} />
        <LabelValue label={t("age")} value={patient?.age} />
        <LabelValue label={t("joined_at")} value={patient?.created_at} />
        {patient.other_data?.map((item, index) => (
          <div key={index} className={"md:col-span-2"}>
            <LabelValue label={item.key} value={item.value} col />
          </div>
        ))}
      </Grid>
      <PatientOverview patient={patient} />
    </UserDataView>
  );
};

export default page;
