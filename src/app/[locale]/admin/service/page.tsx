"use client";
import React from "react";
import DataTable, {
    DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import {Category} from "@/Models/Category";
import {Service} from "@/Models/Service";
import {ServiceService} from "@/services/ServiceService";
const tableData: DataTableData<Service> = {
    createUrl: `/admin/service/create`,
    title: "Category",
    schema: [
        {
            name: "name",
            label: "Category",
            sortable: true,
            translatable: true,
        },
        {
            name: "clinic.name",
            label: "Clinic",
            sortable: true,
            translatable: true,

        },
        {
            name: "approximate_duration",
            label: "Approximate Duration",
            sortable: true,
            render : (data)=>(
                <div className='text-center'><p className='badge-success badge'>{data}</p></div>
            )
        },
        {
            name: "serviceCategory.name",
            label: "Category",
            sortable: true,
            translatable: true,

        },
        {
            name: "price",
            label: "Price",
            sortable: true,

        },
        {
            name: "status",
            label: "Status",
            sortable: true,
            render: (data) =>
                data == "active" ? (
                    <span className={`badge badge-success`}>Active</span>
                ) : (
                    <span className={`badge badge-error`}>In-active</span>
                ),

        },

        {
            label: "Actions",
            render: (_undefined, data, setHidden) => (
                <ActionsButtons
                    id={data?.id}
                    buttons={["edit", "delete", "show"]}
                    baseUrl={`/admin/service`}
                    editUrl={`/admin/service/${data?.id}/edit`}
                    showUrl={`/admin/service/${data?.id}`}
                    setHidden={setHidden}
                />
            ),
        },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
        await ServiceService.make<ServiceService>('admin').indexWithPagination(
            page,
            search,
            sortCol,
            sortDir,
            perPage,
            params
        ),
};
const Page = () => {
    return <DataTable {...tableData} />;
};

export default Page;
