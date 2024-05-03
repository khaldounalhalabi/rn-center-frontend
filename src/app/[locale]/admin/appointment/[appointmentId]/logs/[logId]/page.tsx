import {  AppointmentLogs } from "@/Models/Appointment";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { AppointmentLogsService } from "@/services/AppointmentLogsService";

const page = async ({ params: { logId } }: { params: { logId: number } }) => {
  const data =
    await AppointmentLogsService.make<AppointmentLogsService>().show(logId);
  const res: AppointmentLogs = data?.data;
  console.log(res.cancellation_reason)
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Log Details</h2>
      </div>
      <div className={"card p-5 bg-base-200 my-3"}>
        <Grid md={"2"}>
          <label className="label justify-start text-xl">
            Status :{" "}
            <span className="ml-2 badge badge-success ">
              {res.status}
            </span>
          </label>
          <label className="label justify-start text-xl">
            Happen In :{" "}
            <span className="ml-2 badge badge-accent  ">
              {res.happen_in}
            </span>
          </label>
        </Grid>
        {res.cancellation_reason?
            <div >
              <p>Cancellation Reason :</p>
              <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  disabled={true}
                  defaultValue={res?.cancellation_reason}
              />
            </div>:false}
      </div>
    </PageCard>
  );
};

export default page