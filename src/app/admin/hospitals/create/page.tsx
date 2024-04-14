import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HospitalsForm from "@/components/admin/hospitals/HospitalsForm";
import { DepartmentsService } from "@/services/DepartmentsService";

const page = async () => {
    return (
        <div>
            <div className="w-full h-24 flex justify-start items-center">
                <h2 className="ml-5 text-2xl font-medium">Add Hospital</h2>
            </div>
            <PageCard>
                <HospitalsForm />
            </PageCard>
        </div>
    );
};

export default page;
