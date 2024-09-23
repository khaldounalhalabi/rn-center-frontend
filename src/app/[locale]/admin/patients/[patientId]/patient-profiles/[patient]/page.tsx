import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";
import { PatientProfilesService } from "@/services/PatientProfilesService";
import { PatientProfiles } from "@/Models/PatientProfiles";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { patientId, patient },
}: {
  params: { patientId: number; patient: number };
}) => {
  const t = await getTranslations("admin.patientsProfiles.show");
  const data =
    await PatientProfilesService.make<PatientProfilesService>().show(patient);
  const res: PatientProfiles = data?.data;
  const convertObjectToArray = (obj: { [key: string]: string }) => {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  };
  const otherData = res.other_data
    ? convertObjectToArray(JSON.parse(res.other_data))
    : [];
  return (
    <>
      <PageCard>
        <div className="flex justify-between items-center w-full h-24">
          <h2 className="card-title">{t("patientProfileDetails")}</h2>
          <Link
            href={`/admin/patients/${patientId}/patient-profiles/${patient}/edit`}
          >
            <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
          </Link>
        </div>
        <Grid md={2} gap={5}>
          <label className="label justify-start text-xl">
            {t("clinicName")} :{" "}
            <span className="ml-2 badge badge-neutral">
              {await TranslateServer(res?.clinic?.name)}
            </span>
          </label>
          <label className="label justify-start text-xl">
            {t("customerName")} :{" "}
            <span className="ml-2 badge badge-secondary">
              {await TranslateServer(res?.customer?.user?.first_name)}{" "}
              {await TranslateServer(res?.customer?.user?.middle_name)}{" "}
              {await TranslateServer(res?.customer?.user?.last_name)}
            </span>
          </label>
        </Grid>
      </PageCard>
      <PageCard>
        <h2 className="card-title">{t("otherData")} :</h2>
        <Grid md={2}>
          {otherData?.map((data, index) => (
            <label key={index} className="label justify-start text-xl">
              {data.key} :{" "}
              <span className="ml-2 badge badge-warning">{data.value}</span>
            </label>
          ))}
        </Grid>
      </PageCard>
      <PageCard>
        <h2 className="card-title">{t("description")} :</h2>
        <label className={"label text-xl"}>{t("medicalCondition")} :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={res?.medical_condition ?? ""}
        />
        <label className={"label text-xl"}>{t("note")} :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={res?.medical_condition ?? ""}
        />
      </PageCard>
    </>
  );
};

export default page;
