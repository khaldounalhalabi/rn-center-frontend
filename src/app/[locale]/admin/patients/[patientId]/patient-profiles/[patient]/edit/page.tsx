import React from "react";
import {PatientProfilesService} from "@/services/PatientProfilesService";
import PatientProfilesForm from "@/components/admin/patient-profiles/PatientProfilesForm";

const page = async ({
                        params: { patientId,patient },
                    }: {
    params: {patient: number ,patientId:number};
}) => {
    const profile = (
        await PatientProfilesService.make<PatientProfilesService>("admin").show(patient)
    ).data;
    return (


        <PatientProfilesForm
            patientId={patientId}
            type={"update"}
            defaultValues={{
                ...profile,
            }}
        />

    );
};

export default page;