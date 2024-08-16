import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import { AppointmentDeductions } from "@/Models/AppointmentDeductions";

const page = async ({
  params: { deductionId },
}: {
  params: { deductionId: number };
}) => {
  const data =
    await AppointmentDeductionsService.make<AppointmentDeductionsService>(
      "doctor",
    ).show(deductionId);
  const res: AppointmentDeductions = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Appointment Deduction Details :</h2>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          Amount :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.amount?.toLocaleString()}
          </span>
        </label>
        <label className="label">
          Status :
          <span className="badge-primary px-2 rounded-xl text-lg">
            {res?.status}
          </span>
        </label>
        <label className="label">
          Date :
          <span className="badge-outline px-2 rounded-xl text-lg">
            {res?.date}
          </span>
        </label>
        <label className="label">
          Total Cost :
          <span className="badge-warning px-2 rounded-xl text-lg">
            {res?.appointment?.total_cost?.toLocaleString()}
          </span>
        </label>
        <label className="label">
          Appointment Date :
          <span className="badge-success px-2 rounded-xl text-lg">
            {res?.appointment?.date}
          </span>
        </label>
      </Grid>
      <div className="w-full">
        <label className="label">note :</label>
        <textarea
          className="w-full p-2"
          disabled={true}
          defaultValue={res?.appointment?.note ?? ""}
        ></textarea>
      </div>
    </PageCard>
  );
};

export default page;
