import { TranslateClient } from "@/Helpers/TranslationsClient";
import Grid from "@/components/common/ui/Grid";
import React from "react";
import { Customer } from "@/Models/Customer";
import Gallery from "@/components/common/ui/Gallery";
import { useTranslations } from "next-intl";

const PatientDetails = ({
  patient,
  typePage = "admin",
}: {
  patient: Customer;
  typePage?: "admin" | "doctor";
}) => {
  const t = useTranslations("common.patient.show");

  const convertObjectToArray = (obj: { [key: string]: string }) => {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  };
  const otherData = patient?.currentClinicPatientProfile?.other_data
    ? convertObjectToArray(
        JSON.parse(patient?.currentClinicPatientProfile?.other_data),
      )
    : [];
  return (
    <>
      <Grid md={2} gap={5}>
        <label className="label justify-start text-xl">
          {t("birthDate")} :{" "}
          <span className="ml-2 badge badge-outline  ">
            {patient?.user?.birth_date}
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("age")} :{" "}
          <span className="ml-2 badge badge-accent  ">
            {patient?.user?.age}
          </span>
        </label>
        <label className="label justify-start text-xl md:block flex flex-col items-start">
          {t("address")} :{" "}
          <span className="ml-2 badge badge-success  ">
            {TranslateClient(patient?.user?.address?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("city")} :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {TranslateClient(patient?.user?.address?.city?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("gender")} :{" "}
          <span className="ml-2 badge badge-accent  ">
            {patient?.user?.gender}
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("blood")} :{" "}
          <span className="ml-2 badge badge-accent  ">
            {patient?.user?.blood_group}
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("isBlocked")} :{" "}
          {patient?.user?.is_blocked ? (
            <span className="ml-2 badge badge-error">{t("blocked")}</span>
          ) : (
            <span className="ml-2 badge badge-success">{t("notBlocked")}</span>
          )}
        </label>
        <label className="label justify-start text-xl">
          {t("isArchived")} :{" "}
          {patient?.user?.is_archived ? (
            <span className="ml-2 badge badge-neutral">{t("archived")}</span>
          ) : (
            <span className="ml-2 badge badge-warning">{t("notArchived")}</span>
          )}
        </label>
      </Grid>
      {typePage == "admin" ? (
        ""
      ) : (
        <>
          <h2 className="card-title">{t("otherData")} :</h2>
          <Grid md={2}>
            {otherData?.map((data, index) => (
              <label key={index} className="label justify-start text-xl">
                {data.key} :{" "}
                <span className="ml-2 badge badge-warning">{data.value}</span>
              </label>
            ))}
          </Grid>
          <label className={"label text-xl"}>{t("note")} :</label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={patient?.currentClinicPatientProfile?.note}
          />
          <label className={"label text-xl"}>{t("medicalCondition")} :</label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={
              patient?.currentClinicPatientProfile?.medical_condition
            }
          />
          <Gallery media={patient?.currentClinicPatientProfile?.images ?? []} />
        </>
      )}
    </>
  );
};

export default PatientDetails;