"use client";
import React from "react";
import DataTable, {
    DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import {translate} from "@/Helpers/Translations";
import {MedicineService} from "@/services/MedicinesSevice";
import {Medicine} from "@/Models/Medicines";

const Page = () => {
    const tableData: DataTableData<Medicine> = {
        createUrl: `/admin/medicines/create`,
        title: `Medicines`,
        schema: [
            {
                name: "id",
                label: `id`,
                sortable: true,
            },
            {
                name: "clinic.name",
                sortable: true,
                label: "Clinic Name",
                translatable: true,
            },
            {
                name: "clinic.user.first_name",
                sortable: true,
                label: "Doctor Name",
                render: (_first_name, medicines) => {
                    return (
                        <p>
                            {translate(medicines?.clinic?.user?.first_name)}{" "}
                            {translate(medicines?.clinic?.user?.middle_name)}{" "}
                            {translate(medicines?.clinic?.user?.last_name)}
                        </p>
                    );
                },
            },
            {
                name: "name",
                label: "Medicine",
            },
            {
                label: `Actions`,
                render: (_undefined, data, setHidden) => (
                    <ActionsButtons
                        id={data?.id}
                        buttons={["edit", "delete", "show"]}
                        baseUrl={`/admin/medicines`}
                        editUrl={`/admin/medicines/${data?.id}/edit`}
                        showUrl={`/admin/medicines/${data?.id}`}
                        setHidden={setHidden}
                    />
                ),
            },
        ],
        api: async (page, search, sortCol, sortDir, perPage, params) =>
            await MedicineService.make<MedicineService>("admin").indexWithPagination(
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
