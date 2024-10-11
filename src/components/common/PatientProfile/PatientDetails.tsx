import { TranslateClient } from "@/Helpers/TranslationsClient";
import Grid from "@/components/common/ui/Grid";
import React from "react";
import { Customer } from "@/Models/Customer";
import Gallery from "@/components/common/ui/Gallery";
import { useTranslations } from "next-intl";
import { LabelValue } from "../ui/LabelsValues/LabelValue";
import { Value } from "../ui/LabelsValues/Value";
import { Label } from "../ui/LabelsValues/Label";

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
  console.log(patient);
  return (
    <>
      <Grid md={2} gap={5}>
        <LabelValue
          label={t("birthDate")}
          value={patient?.user?.birth_date}
          color={"primary"}
        />

        <LabelValue
          label={t("age")}
          value={patient?.user?.age}
          color={"accent"}
        />

        <LabelValue
          label={t("address")}
          value={TranslateClient(patient?.user?.address?.name)}
          color={"success"}
        />

        <LabelValue
          label={t("city")}
          value={TranslateClient(patient?.user?.address?.city?.name)}
          color={"info"}
        />

        <LabelValue
          label={t("gender")}
          value={patient?.user?.gender}
          color={"warning"}
        />

        <LabelValue
          label={t("blood")}
          value={patient?.user?.blood_group}
          color={"error"}
        />
        <LabelValue
          label={t("lastAppointment")}
          value={patient?.currentClinicPatientProfile?.last_appointment?.date}
          color={"error"}
        />
      </Grid>
      {typePage == "admin" ? (
        ""
      ) : (
        <>
          <Label label={t("otherData")} col>
            <Grid md={2}>
              {otherData?.map((data, index) => (
                <Label key={index}>
                  {data.key} : <Value color="warning" value={data.value} />
                </Label>
              ))}
            </Grid>
          </Label>

          <Label label={t("note")} col>
            <textarea
              className="textarea textarea-bordered text-sm w-full"
              disabled={true}
              defaultValue={patient?.currentClinicPatientProfile?.note}
            />
          </Label>

          <Label label={t("medicalCondition")} col>
            <textarea
              className="textarea textarea-bordered text-sm w-full"
              disabled={true}
              defaultValue={
                patient?.currentClinicPatientProfile?.medical_condition
              }
            />
          </Label>

          <Gallery media={patient?.currentClinicPatientProfile?.images ?? []} />
        </>
      )}
    </>
  );
};

export default PatientDetails;
