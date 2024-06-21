"use client";
import React from "react";
import DataTable, {
    DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import {AvailableDepartmentService} from "@/services/AvailableDepartmentService";
import {AvailableDepartment} from "@/Models/AvailableDepartment";

const Page = () => {
    const tableData: DataTableData<AvailableDepartment> = {
        createUrl: `/admin/department/create`,
        title: `Available Department`,
        schema: [
            {
                name: "id",
                label: `id`,
                sortable: true,
            },
            {
                name: "name",
                label: `Name`,
                sortable: true,
                translatable:true
            },
            {
                name: "description",
                label: `Description`,
                sortable: true,
                translatable:true
            },

            {
                label: `Actions`,
                render: (_undefined, data, setHidden) => (
                    <ActionsButtons
                        id={data?.id}
                        buttons={["edit", "delete", "show"]}
                        baseUrl={`/admin/available-departments`}
                        editUrl={`/admin/department/${data?.id}/edit`}
                        showUrl={`/admin/department/${data?.id}`}
                        setHidden={setHidden}
                    />
                ),
            },
        ],
        api: async (page, search, sortCol, sortDir, perPage, params) =>
            await AvailableDepartmentService.make<AvailableDepartmentService>("admin").indexWithPagination(
                page,
                search,
                sortCol,
                sortDir,
                perPage,
                params,
            ),
    };
    return <DataTable {...tableData} />;
};

export default Page;