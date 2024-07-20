import React from "react";
import AppointmentForm from "@/components/doctor/appointment/AppointmentForm";

const page = async ({
    params: { patientId},
}: {
params: { patientId:number};
}) => {
    return (

            <AppointmentForm type="store" patientId={patientId}/>

    );
};

export default page;