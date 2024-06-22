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
          <p className={"badge badge-primary"}>{appointment?.extra_fees} IQD</p>
          <label className={"label"}>Total Cost : </label>
          <p className={"badge badge-ghost"} suppressHydrationWarning>
            {appointment?.total_cost.toLocaleString()} IQD
          </p>
          <label className={"label"}>Appointment Sequence : </label>
          <p className={"badge badge-info"} suppressHydrationWarning>
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
      <div className="overflow-x-auto border-2 rounded-2xl">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Clinic Appointment Cost</td>
              <td
                className={`${appointment?.service?.price ? "line-through" : ""}`}
              >
                {appointment?.clinic?.appointment_cost ?? 0} IQD
              </td>
            </tr>
            <tr>
              <td>Service</td>
              <td>{appointment?.service?.price ?? 0} IQD</td>
            </tr>
            <tr>
              <td>Extra Fees</td>
              <td>{Number(appointment?.extra_fees) ?? 0} IQD</td>
            </tr>
            <tr>
              <td className="text-lg">Total Cost</td>
              <td className="text-lg">
                {appointment?.service?.price
                  ? appointment?.service?.price +
                    (Number(appointment?.extra_fees) ?? 0)
                  : (appointment?.clinic?.appointment_cost ?? 0) +
                    (Number(appointment?.extra_fees) ?? 0)}{" "}
                IQD
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
