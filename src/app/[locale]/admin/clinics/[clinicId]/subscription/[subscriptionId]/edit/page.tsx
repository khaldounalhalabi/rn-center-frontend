import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import {ClinicSubscriptionService} from "@/services/ClinicSubscriptionServic";
import ClinicSubscriptionForm from "@/components/admin/clinicSubscription/ClinicSubscriptionForm";

const page = async ({
                        params: { subscriptionId,clinicId },
                    }: {
    params: { subscriptionId: number ,clinicId:number};
}) => {
    const subscription = (
        await ClinicSubscriptionService.make<ClinicSubscriptionService>("admin").show(
            subscriptionId,
        )
    ).data;
    return (
        <PageCard>
            <h2 className="card-title">Edit Clinic Subscription</h2>
            <ClinicSubscriptionForm
                type={"update"}
                id={clinicId}
                defaultValues={{
                    ...subscription,
                }}
            />
        </PageCard>
    );
};

export default page;