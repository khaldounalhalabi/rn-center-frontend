import React from "react";
import PatientProfilesForm from "@/components/admin/patient-profiles/PatientProfilesForm";

const page = async ({
                        params: { patientId },
                    }: {
    params: { patientId: number };
}) => {
    return (
        <PatientProfilesForm  patientId={patientId}/>
    );
};

export default page;