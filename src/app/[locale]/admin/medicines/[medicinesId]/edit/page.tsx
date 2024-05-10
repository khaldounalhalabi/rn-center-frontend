import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import {MedicinesService} from "@/services/MedicinesSevice";
import MedicinesForm from "@/components/admin/medicines/MedicinesForm";

const page = async ({
                        params: { medicinesId },
                    }: {
    params: { medicinesId: number };
}) => {
    const medicines = (
        await MedicinesService.make<MedicinesService>("admin").show(
            medicinesId,
        )
    ).data;


    return (
        <PageCard>
            <h2 className="card-title">Edit Medicine</h2>
            <MedicinesForm
                type={"update"}
                defaultValues={{
                    ...medicines,
                }}
            />
        </PageCard>
    );
};

export default page;
