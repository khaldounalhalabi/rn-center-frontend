import { AppointmentLogs } from "@/Models/AppointmentLog";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { AppointmentLogsService } from "@/services/AppointmentLogsService";
import TranslateServer from "@/Helpers/TranslationsServer";

const page = async ({ params: { logId } }: { params: { logId: number } }) => {
  const data =
    await AppointmentLogsService.make<AppointmentLogsService>().show(logId);
  const res: AppointmentLogs = data?.data;
  console.log(res.cancellation_reason);
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Log Details</h2>
      </div>
      <div className={"card p-5 bg-base-200 my-3"}>
        <Grid md={"2"}>
          <label className="label text-xl">
            Status : <span className="badge badge-success ">{res.status}</span>
          </label>
          <label className="label text-xl">
            Happen In :{" "}
            <span className="badge badge-accent  ">{res.happen_in}</span>
          </label>
          <label className={"label text-xl"}>
            Actor :
            <span className={"ml-2 badge badge-neutral"}>
              {await TranslateServer(res.actor?.first_name)}{" "}
              {await TranslateServer(res.actor?.middle_name)}{" "}
              {await TranslateServer(res.actor?.last_name)}
            </span>
          </label>
        </Grid>
        <label className={"label text-xl"}>Event :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={res?.event}
        />

        {res.cancellation_reason ? (
          <div>
            <p>Cancellation Reason :</p>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              disabled={true}
              defaultValue={res?.cancellation_reason}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </PageCard>
  );
};

export default page;