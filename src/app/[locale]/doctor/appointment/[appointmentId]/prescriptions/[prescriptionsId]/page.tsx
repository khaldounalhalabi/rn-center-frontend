import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { MedicineData, Prescription } from "@/Models/Prescriptions";
import { Stringify } from "@/components/common/prescriptions/PhysicalForm";
import TranslateServer from "@/Helpers/TranslationsServer";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";

const Page = async ({
  params: { appointmentId, prescriptionsId },
}: {
  params: { appointmentId: number; prescriptionsId: number };
}) => {
  const t = await getTranslations("common.prescription.show");
  const data =
    await PrescriptionService.make<PrescriptionService>("doctor").show(
      prescriptionsId,
    );
  const res: Prescription = data?.data;
  const physicalInformation: Stringify = JSON.parse(
    res?.physical_information ?? "{}",
  );
  const medicines: MedicineData[] = res?.medicines_data ?? [];
  return (
    <>
      <PageCard>
        <div className="flex justify-between items-center w-full h-24">
          <h2 className="card-title">{t("prescriptionsDetails")}</h2>
          <Link
            href={`/doctor/appointment/${appointmentId}/prescriptions/${prescriptionsId}/edit`}
          >
            <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
          </Link>
        </div>
        <Grid md={2} gap={5}>
          <LabelValue
            label={t("customerName")}
            value={await TranslateServer(res.customer?.user?.full_name)}
            color={"primary"}
          />
          <LabelValue
            label={t("customerAge")}
            value={res?.customer?.user?.age}
            color={"success"}
          />
        </Grid>
      </PageCard>
      <PageCard>
        <Label label={t("medicines")} col={true}>
          {medicines.map((e, index) => (
            <div key={index}>
              <Grid md={2} gap={5} key={index}>
                <LabelValue
                  label={t("medicineName")}
                  value={e.medicine?.name}
                  color={"pom"}
                />
                <LabelValue
                  label={t("dosage")}
                  value={e.dosage}
                  color={"title"}
                />
                <LabelValue
                  label={t("doseInterval")}
                  value={e.dose_interval}
                  color={"brand-primary"}
                />
                <LabelValue
                  label={t("duration")}
                  value={e.duration}
                  color={"error"}
                />
              </Grid>
              <Label label={t("comment")} col>
                <textarea
                  className="text-sm textarea-bordered w-full h-24 textarea"
                  disabled={true}
                  defaultValue={e.comment}
                ></textarea>
              </Label>
            </div>
          ))}
        </Label>
      </PageCard>
      <PageCard>
        <h2 className="card-title">{t("physicalInformation")}</h2>
        <Grid md={2} gap={5}>
          <LabelValue
            label={t("pulseRate")}
            value={physicalInformation.pulse}
            color={"neutral"}
          />

          <LabelValue
            label={t("surgery")}
            value={physicalInformation.surgery}
            color={"neutral"}
          />

          <LabelValue
            label={t("breastFeeding")}
            value={physicalInformation.breast}
            color={"neutral"}
          />

          <LabelValue
            label={t("currentMedication")}
            value={physicalInformation.current}
            color={"neutral"}
          />

          <LabelValue
            label={t("accident")}
            value={physicalInformation.accident}
            color={"neutral"}
          />

          <LabelValue
            label={t("femalePregnancy")}
            value={physicalInformation.female}
            color={"neutral"}
          />

          <LabelValue
            label={t("medicalHistory")}
            value={physicalInformation.medical}
            color={"neutral"}
          />

          <LabelValue
            label={t("diabetic")}
            value={physicalInformation.diabetic}
            color={"neutral"}
          />

          <LabelValue
            label={t("heartDisease")}
            value={physicalInformation.heart}
            color={"neutral"}
          />

          <LabelValue
            label={t("tendencyBleed")}
            value={physicalInformation.tendency}
            color={"neutral"}
          />

          <LabelValue
            label={t("foodAllergies")}
            value={physicalInformation.food}
            color={"neutral"}
          />

          <LabelValue
            label={t("temperature")}
            value={physicalInformation.temperature}
            color={"neutral"}
          />

          <LabelValue
            label={t("highBloodPressure")}
            value={physicalInformation.blood}
            color={"neutral"}
          />

          <LabelValue
            label={t("others")}
            value={physicalInformation.others}
            color={"neutral"}
          />
        </Grid>
      </PageCard>
      <PageCard>
        <Label label={t("test")} col>
          <textarea
            className="text-sm textarea-bordered w-full h-24 textarea"
            disabled={true}
            defaultValue={res.test}
          ></textarea>
        </Label>
        <Label label={t("problemDescription")} col>
          <textarea
            className="textarea-bordered w-full h-24 textarea"
            disabled={true}
            defaultValue={res.problem_description}
          ></textarea>
        </Label>
        <LabelValue
          label={t("nextVisit")}
          value={`${res.next_visit?.replace(/\D/g, "")} ${res.next_visit?.replace(/\d/g, "")}`}
          color={"success"}
        />
      </PageCard>
    </>
  );
};
export default Page;
