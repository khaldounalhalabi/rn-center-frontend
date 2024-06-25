"use client";
import React from "react";
import DataTable, {
    DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import {StaffService} from "@/services/StaffService";
import {Staff} from "@/Models/Staff";
import {TranslateClient} from "@/Helpers/TranslationsClient";

const Page = () => {
    const tableData: DataTableData<Staff> = {
        createUrl: `/doctor/staff/create`,
        title: `Staff`,
        schema: [
            {
                name: "id",
                label: `id`,
                sortable: true,
            },
            {
                name: "user.full_name",
                label: `Name`,
                sortable: true,
                render: (_first_name, staff) => {
                    return (
                        <p>
                            {TranslateClient(staff?.user?.first_name)}{" "}
                            {TranslateClient(staff?.user?.middle_name)}{" "}
                            {TranslateClient(staff?.user?.last_name)}
                        </p>
                    );
                },
            },

            {
                label: `Actions`,
                render: (_undefined, data, setHidden) => (
                    <ActionsButtons
                        id={data?.id}
                        buttons={["edit", "delete", "show"]}
                        baseUrl={`/doctor/clinic-employees`}
                        editUrl={`/doctor/staff/${data?.id}/edit`}
                        showUrl={`/doctor/staff/${data?.id}`}
                        setHidden={setHidden}
                    />
                ),
            },
        ],
        api: async (page, search, sortCol, sortDir, perPage, params) =>
            await StaffService.make<StaffService>(
                "doctor",
            ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
    };
    return <DataTable {...tableData} />;
};

export default Page;