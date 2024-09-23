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

const Page = async ({
  params: { appointmentId, prescriptionsId },
}: {
  params: { appointmentId: number; prescriptionsId: number };
}) => {
  const t = await getTranslations("common.prescription.show");
  const data =
    await PrescriptionService.make<PrescriptionService>().show(prescriptionsId);
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
            href={`/admin/appointment/${appointmentId}/prescriptions/${prescriptionsId}/edit`}
          >
            <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
          </Link>
        </div>
        <Grid md={2} gap={5}>
          <label className="label">
            {t("clinicName")}
            <span className="px-2 rounded-xl text-lg badge-neutral">
              {await TranslateServer(res?.clinic?.name)}
            </span>
          </label>
          <label className="label">
            {t("doctorName")}
            <span className="px-2 rounded-xl text-lg badge-success">
              <h3>
                {await TranslateServer(res.clinic?.user?.first_name)}{" "}
                {await TranslateServer(res.clinic?.user?.middle_name)}{" "}
                {await TranslateServer(res.clinic?.user?.last_name)}
              </h3>
            </span>
          </label>
          <label className="label">
            {t("customerName")}
            <span className="px-2 rounded-xl text-lg badge-info">
              <h3>
                {await TranslateServer(res.customer?.user?.first_name)}{" "}
                {await TranslateServer(res.customer?.user?.middle_name)}{" "}
                {await TranslateServer(res.customer?.user?.last_name)}
              </h3>
            </span>
          </label>

          <label className="label">
            {t("customerAge")}
            <span className="px-2 rounded-xl text-lg badge-primary">
              {res?.customer?.user?.age}
            </span>
          </label>
        </Grid>
      </PageCard>
      <hr />
      <PageCard>
        <h2 className="card-title">{t("medicines")}</h2>
        {medicines.map((e, index) => (
          <div key={index}>
            <Grid md={2} gap={5} key={index}>
              <label className="label">
                {t("medicineName")} :
                <span className="bg-base-200 px-2 rounded-xl text-lg">
                  {e.medicine?.name}
                </span>
              </label>
              <label className="label">
                {t("dosage")} :
                <span className="bg-base-200 px-2 rounded-xl text-lg">
                  {e.dosage}
                </span>
              </label>
              <label className="label">
                {t("doseInterval")} :
                <span className="bg-base-200 px-2 rounded-xl text-lg">
                  {e.dose_interval}
                </span>
              </label>
              <label className="label">
                {t("duration")} :
                <span className="bg-base-200 px-2 rounded-xl text-lg">
                  {e.duration}
                </span>
              </label>
            </Grid>
            <div className={"w-full"}>
              <label className={"label"}>{t("comment")} :</label>
              <textarea
                className="textarea-bordered w-full h-24 textarea"
                disabled={true}
                defaultValue={e.comment}
              ></textarea>
            </div>
            <hr />
          </div>
        ))}
      </PageCard>
      <hr />
      <PageCard>
        <h2 className="card-title">{t("physicalInformation")}</h2>
        <Grid md={2} gap={5}>
          <label className="label">
            {t("pulseRate")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.pulse}
            </span>
          </label>
          <label className="label">
            {t("surgery")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.surgery}
            </span>
          </label>
          <label className="label">
            {t("breastFeeding")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.breast}
            </span>
          </label>
          <label className="label">
            {t("currentMedication")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.current}
            </span>
          </label>
          <label className="label">
            {t("accident")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.accident}
            </span>
          </label>
          <label className="label">
            {t("femalePregnancy")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.female}
            </span>
          </label>
          <label className="label">
            {t("medicalHistory")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.medical}
            </span>
          </label>
          <label className="label">
            {t("diabetic")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.diabetic}
            </span>
          </label>
          <label className="label">
            {t("heartDisease")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.heart}
            </span>
          </label>
          <label className="label">
            {t("tendencyBleed")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.tendency}
            </span>
          </label>
          <label className="label">
            {t("foodAllergies")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.food}
            </span>
          </label>
          <label className="label">
            {t("temperature")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.temperature}
            </span>
          </label>
          <label className="label">
            {t("highBloodPressure")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.blood}
            </span>
          </label>
          <label className="label">
            {t("others")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.others}
            </span>
          </label>
        </Grid>
      </PageCard>
      <hr />
      <PageCard>
        <Grid md={2} gap={5}>
          <div className={"w-full"}>
            <label className={"label"}>{t("test")} :</label>
            <textarea
              className="textarea-bordered w-full h-24 textarea"
              disabled={true}
              defaultValue={res.test}
            ></textarea>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("problemDescription")} :</label>
            <textarea
              className="textarea-bordered w-full h-24 textarea"
              disabled={true}
              defaultValue={res.problem_description}
            ></textarea>
          </div>
          <label className="label">
            {t("nextVisit")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {res.next_visit?.replace(/\D/g, "")}{" "}
              {res.next_visit?.replace(/\d/g, "")}
            </span>
          </label>
        </Grid>
      </PageCard>
    </>
  );
};
export default Page;
