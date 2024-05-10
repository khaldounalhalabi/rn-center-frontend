import React from "react";
import {PrescriptionsService} from "@/services/PrescriptionsServise";
import PrescriptionsForm from "@/components/admin/prescriptions/PrescriptionsForm";
import {AppointmentService} from "@/services/AppointmentService";

const page = async ({
                        params: {appointmentId, prescriptionsId },
                    }: {
    params: { appointmentId:number,prescriptionsId: number };
}) => {
    const prescriptions = (
        await PrescriptionsService.make<PrescriptionsService>("admin").show(
            prescriptionsId,
        )
    ).data;
    const appointment = await AppointmentService.make<AppointmentService>().show(appointmentId)


    return (
        <div>
            <h2 className="card-title mt-8 ml-8">Edit Prescription</h2>
            <PrescriptionsForm
                type={"update"}
                appointment={appointment?.data}
                defaultValues={{
                    ...prescriptions,
                }}

            />
        </div>
    );
};

export default page;
