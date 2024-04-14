'use client'
import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SpecialityForm from "@/components/admin/speciality/SpecialityForm";

const page =  () => {


    return (
        <div>
            <div className="w-full h-24 flex justify-start items-center">
                <h2 className="ml-5 text-2xl font-medium">{('Add Speciality')}</h2>
            </div>
            <PageCard>
                <SpecialityForm/>
            </PageCard>
        </div>
    );
};

export default page;
