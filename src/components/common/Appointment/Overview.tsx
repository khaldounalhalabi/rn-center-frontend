import React from "react";
import { Appointment } from "@/Models/Appointment";
import Grid from "@/components/common/ui/Grid";
import { SystemOffers } from "@/Models/SystemOffer";
import { Offers } from "@/Models/Offers";
import HandleCalcOffers from "@/hooks/HandleCalcOffers";

const Overview = ({
                      appointment,
                      userType = "admin"
                  }: {
    appointment?: Appointment | undefined | null;
    userType?: "admin" | "doctor"

}) => {
    console.log(appointment)


    const appointmentCost = userType == "doctor" ?
        HandleCalcOffers(appointment?.offers ?? [], appointment?.clinic?.appointment_cost ?? 0, "offer") :
        HandleCalcOffers(appointment?.offers ?? [], HandleCalcOffers(appointment?.system_offers ?? [], appointment?.clinic?.appointment_cost ?? 0, "system"), "offer")

    const handleTotalCost = (): number => {
        return Number(appointmentCost ?? 0) + Number(appointment?.extra_fees ?? 0) + Number(appointment?.service?.price ?? 0) - Number(appointment?.discount ?? 0)
    };

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
                        {appointment?.total_cost?.toLocaleString()} IQD
                    </p>
                    <label className={"label"}>Appointment Sequence : </label>
                    <p className={"badge badge-info"} suppressHydrationWarning>
                        {appointment?.appointment_sequence?.toLocaleString()}
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
                        <td>
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
                        <td>Discount</td>
                        <td>{Number(appointment?.discount) ?? 0} IQD</td>
                    </tr>
                    {appointment?.offers?.length != 0
                        ? appointment?.offers?.map((e: Offers, index) => (
                            <tr key={index}>
                                <td>Offer [{index}]</td>
                                <td>
                                    {e?.value ?? 0} {e?.type == "fixed" ? "IQD" : "%"}
                                </td>
                            </tr>
                        ))
                        : ""}
                    {userType == "admin" ?
                        appointment?.system_offers?.length != 0
                            ? appointment?.system_offers?.map((e: SystemOffers, index) => (
                                <tr key={index}>
                                    <td>System Offer [{index}]</td>
                                    <td>
                                        {e?.amount ?? 0} {e?.type == "fixed" ? "IQD" : "%"}
                                    </td>
                                </tr>
                            ))
                            : "" : ""
                    }
                    <tr>
                        <td className="text-lg">Total Cost</td>
                        <td className="text-lg">
                            {handleTotalCost()}{" "}
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