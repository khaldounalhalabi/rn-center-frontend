import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import CategoryForm from "@/components/admin/category/CategoryForm";

const page = async () => {
    return (
        <PageCard>
            <h2 className="card-title">Add Category</h2>
            <CategoryForm />
        </PageCard>
    );
};

export default page;