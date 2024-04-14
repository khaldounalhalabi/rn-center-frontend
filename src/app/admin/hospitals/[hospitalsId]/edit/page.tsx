import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HospitalsForm from "@/components/admin/hospitals/HospitalsForm";
import {HospitalService} from "@/services/HospitalService";

const page = async ({
                        params: { hospitalsId },
                    }: {
    params: { hospitalsId: number };
}) => {
    const hospital = (await HospitalService.make().show(hospitalsId)).data;
    return (
        <div>
            <div className="w-full h-24 flex justify-start items-center">
                <h2 className="ml-5 text-2xl font-medium">Edit Hospital</h2>
            </div>
            <PageCard>
                <HospitalsForm type={'update'} defaultValues={hospital}/>
            </PageCard>
        </div>
    );
};

export default page;
