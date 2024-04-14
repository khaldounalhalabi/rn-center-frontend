import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SpecialityForm from "@/components/admin/speciality/SpecialityForm";
import { SpecialityService } from "@/services/SpecialityService";

const page = async ({
                        params: { specialityId },
                    }: {
    params: { specialityId: number };
}) => {
    const speciality = (await SpecialityService.make().show(specialityId)).data;
    return (
        <div>
            <div className="w-full h-24 flex justify-start items-center">
                <h2 className="ml-5 text-2xl font-medium">Edit Speciality</h2>
            </div>
            <PageCard>
                <SpecialityForm type={"update"} defaultValues={speciality} />
            </PageCard>
        </div>
    );
};

export default page;
