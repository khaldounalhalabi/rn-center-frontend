import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { getTranslations } from "next-intl/server";
import {StaffService} from "@/services/StaffService";
import StaffForm from "@/components/doctor/staff/StaffForm";

const page = async ({
                        params: { staffId },
                    }: {
    params: { staffId: number };
}) => {
    const t = await getTranslations("admin.service.create-edit");

    const staff = (
        await StaffService.make<StaffService>("doctor").show(staffId)
    ).data;


    const res = {
        phone_numbers:staff.user.phones?.map((ph) => ph.phone),
        ...staff.user
    }

    return (
        <PageCard>
            <h2 className="card-title">{("Edit Staff")}</h2>
            <StaffForm
                id={staff.id}
                type={"update"}
                defaultValues={{
                    ...res,
                }}
            />
        </PageCard>
    );
};

export default page;