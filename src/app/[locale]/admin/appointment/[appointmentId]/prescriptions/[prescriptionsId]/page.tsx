import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { PrescriptionsService } from "@/services/PrescriptionsServise";
import { Multi, Prescriptions } from "@/Models/Prescriptions";
import { translate } from "@/Helpers/Translations";
import { Stringify } from "@/components/admin/prescriptions/PhysicalForm";

const page = async ({
  params: {appointmentId, prescriptionsId },
}: {
  params: {appointmentId:number, prescriptionsId: number };
}) => {
  const data =
    await PrescriptionsService.make<PrescriptionsService>().show(
      prescriptionsId,
    );
  const res: Prescriptions = data?.data;
  const physicalInformation: Stringify = JSON.parse(res.physical_information);
  const medicines: Multi[] = res.medicines_data;
  return (
    <>
      <PageCard>
        <div className="flex justify-between items-center w-full h-24">
          <h2 className="card-title">Prescriptions Details</h2>
          <Link href={`/admin/appointment/${appointmentId}/prescriptions/${prescriptionsId}/edit`}>
            <PrimaryButton type={"button"}>Edit</PrimaryButton>
          </Link>
        </div>
        <Grid md={2} gap={5}>
          <label className="label">
            {"Clinic Name :"}
            <span className="  badge-neutral px-2 rounded-xl text-lg">
              {translate(res.clinic.name)}
            </span>
          </label>
          <label className="label">
            {"Doctor Name :"}
            <span className=" badge-success px-2 rounded-xl text-lg">
              <h3>
                {translate(res.clinic?.user?.first_name)}{" "}
                {translate(res.clinic?.user?.middle_name)}{" "}
                {translate(res.clinic?.user?.last_name)}
              </h3>
            </span>
          </label>
          <label className="label">
            {"Customer Name :"}
            <span className=" badge-info px-2 rounded-xl text-lg">
              <h3>
                {translate(res.customer?.user?.first_name)}{" "}
                {translate(res.customer?.user?.middle_name)}{" "}
                {translate(res.customer?.user?.last_name)}
              </h3>
            </span>
          </label>

          <label className="label">
            {"Customer Age :"}
            <span className=" badge-primary px-2 rounded-xl text-lg">
              {res.customer.user.age}
            </span>
          </label>
        </Grid>
      </PageCard>
      <hr />
      <PageCard>
        <h2 className="card-title">Medicines</h2>
        {medicines.map((e, index) => (
          <div>
            <Grid md={2} gap={5} key={index}>
              <label className="label">
                {"Medicine Name :"}
                <span className="bg-base-200 px-2 rounded-xl text-lg">
                  {e.medicine?.name}
                </span>
              </label>
              <label className="label">
                {"Dosage :"}
                <span className="bg-base-200 px-2 rounded-xl text-lg">
                  {e.dosage}
                </span>
              </label>
              <label className="label">
                {"dose Interval :"}
                <span className="bg-base-200 px-2 rounded-xl text-lg">
                  {e.dose_interval}
                </span>
              </label>
              <label className="label">
                {"duration :"}
                <span className="bg-base-200 px-2 rounded-xl text-lg">
                  {e.duration}
                </span>
              </label>
            </Grid>
            <div className={"w-full"}>
              <label className={"label"}>Comment :</label>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
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
        <h2 className="card-title">Physical Information</h2>
        <Grid md={2} gap={5}>
          <label className="label">
            {"Pulse Rate:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.pulse}
            </span>
          </label>
          <label className="label">
            {"Surgery:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.surgery}
            </span>
          </label>
          <label className="label">
            {"Breast Feeding:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.breast}
            </span>
          </label>
          <label className="label">
            {"Current Medication:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.current}
            </span>
          </label>
          <label className="label">
            {"Accident:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.accident}
            </span>
          </label>
          <label className="label">
            {"Female Pregnancy:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.female}
            </span>
          </label>
          <label className="label">
            {"Medical History:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.medical}
            </span>
          </label>
          <label className="label">
            {"Diabetic:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.diabetic}
            </span>
          </label>
          <label className="label">
            {"Heart Disease:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.heart}
            </span>
          </label>
          <label className="label">
            {"Tendency Bleed:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.tendency}
            </span>
          </label>
          <label className="label">
            {"Food Allergies:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.food}
            </span>
          </label>
          <label className="label">
            {"Temperature:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.temperature}
            </span>
          </label>
          <label className="label">
            {"High Blood Pressure:"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {physicalInformation.blood}
            </span>
          </label>
          <label className="label">
            {"Others:"}
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
            <label className={"label"}>Test :</label>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              disabled={true}
              defaultValue={res.test}
            ></textarea>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>Problem Description :</label>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              disabled={true}
              defaultValue={res.problem_description}
            ></textarea>
          </div>
          <label className="label">
            {"Next Visit :"}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {res.next_visit}
            </span>
          </label>
        </Grid>
      </PageCard>
    </>
  );
};

export default page;
