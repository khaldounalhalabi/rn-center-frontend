import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import AppointmentForm from "@/components/doctor/appointment/AppointmentForm";
import { AppointmentService } from "@/services/AppointmentService";

const page = async ({
                        params: { appointmentId },
                    }: {
    params: { appointmentId: number };
}) => {
    const appointment = (
        await AppointmentService.make<AppointmentService>("doctor").show(
            appointmentId,
        )
    ).data;

    return (
        <PageCard>
            <h2 className="card-title">Edit Appointment</h2>
            <AppointmentForm
                type={"update"}
                defaultValues={{
                    ...appointment,
                }}
            />
        </PageCard>
    );
};

export default page;