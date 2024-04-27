import React from "react";
import { Appointment } from "@/Models/Appointment";

const Overview = ({
  appointment,
}: {
  appointment?: Appointment | undefined | null;
}) => {
  return (
    <div className={"card p-5 bg-base-200 my-3 w-full"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
        <div className={"w-full"}>
          <label className={"label"}>Status : </label>
          <p className={"badge badge-warning"}>{appointment?.status}</p>
          <label className={"label"}>Type : </label>
          <p className={"badge badge-accent"}>{appointment?.type}</p>
          <label className={"label"}>Extra Fees : </label>
          <p className={"badge badge-primary"}>{appointment?.extra_fees}</p>
          <label className={"label"}>Total Cost : </label>
          <p className={"badge badge-ghost"}>{appointment?.total_cost}</p>
          <label className={"label"}>Appointment Sequence : </label>
          <p className={"badge badge-info"}>
            {appointment?.appointment_sequence}
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Device Type : </label>
          <p className={"badge badge-outline"}>{appointment?.device_type}</p>
          <label className={"label"}>Date :</label>
          <p className={"badge badge-neutral"}>{appointment?.date}</p>
          <label className={"label"}>From :</label>
          <p className={"badge badge-error"}>
            {appointment?.from ?? "No Date"}
          </p>
          <label className={"label"}>To :</label>
          <p className={"badge badge-secondary"}>
            {appointment?.to ?? "No Date"}
          </p>
        </div>
      </div>
      <div className={"w-full"}>
        <label className={"label"}>Note :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={appointment?.note}
        ></textarea>
      </div>
    </div>
  );
};

export default Overview;
