import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import BloodDonationForm from "@/components/admin/blood-donation/BloodDonationForm";
import {BloodDonationService} from "@/services/BloodDonationService";

const page = async ({
                        params: { bloodId },
                    }: {
    params: { bloodId: number };
}) => {
    const BlockedItem = (
        await BloodDonationService.make<BloodDonationService>("admin").show(bloodId)
    ).data;
    return (
        <PageCard>
            <h2 className="card-title">Edit Blood Donation</h2>
            <BloodDonationForm
                type={"update"}
                defaultValues={{
                    ...BlockedItem,
                }}
            />
        </PageCard>
    );
};

export default page;