import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import UserDetailsForm from "@/components/doctor/userDetails/UserDetailsForm";
import {AuthService} from "@/services/AuthService";

const page = async () => {
    const UserDetails = (
        await AuthService.make<AuthService>("doctor").GetUserDetails()
    ).data;
    return (
        <PageCard>
            <h2 className="card-title">Edit User Details</h2>
            <UserDetailsForm
                defaultValues={{
                    ...UserDetails,
                }}
            />
        </PageCard>
    );
};

export default page;