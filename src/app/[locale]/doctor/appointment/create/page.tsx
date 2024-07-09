import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import AppointmentForm from "@/components/doctor/appointment/AppointmentForm";

const page = async () => {
    return (
        <PageCard>
            <h2 className="card-title">Add Appointment</h2>
            <AppointmentForm type="store" />
        </PageCard>
    );
};

export default page;