import React from "react";
import { Appointment } from "@/Models/Appointment";
import Grid from "@/components/common/ui/Grid";

const Overview = ({
  appointment,
}: {
  appointment?: Appointment | undefined | null;
}) => {
  return (
    <div className={"card p-5 bg-base-200 my-3 w-full"}>
      <Grid md={2} gap={5}>
        <div className={"w-full"}>
          <label className={"label"}>Status : </label>
          <p className={"badge badge-warning"}>{appointment?.status}</p>
          <label className={"label"}>Type : </label>
          <p className={"badge badge-accent"}>{appointment?.type}</p>
          <label className={"label"}>Extra Fees : </label>
          <p className={"badge badge-primary"}>{appointment?.extra_fees}</p>
          <label className={"label"}>Total Cost : </label>
          <p className={"badge badge-ghost"}>{appointment?.total_cost.toLocaleString()} IQD</p>
          <label className={"label"}>Appointment Sequence : </label>
          <p className={"badge badge-info"}>
            {appointment?.appointment_sequence.toLocaleString()}
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Device Type : </label>
          <p className={"badge badge-outline"}>{appointment?.device_type}</p>
          <label className={"label"}>Date :</label>
          <p className={"badge badge-neutral"}>{appointment?.date}</p>
        </div>
      </Grid>
      <div className={"w-full"}>
        <label className={"label"}>Note :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={appointment?.note}
        />
      </div>
    </div>
  );
};

export default Overview;
