"use client";
import React from "react";
import DataTable, {
    DataTableData,
} from "@/components/common/Datatable/DataTable";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import Link from "next/link";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import {SpecialityService} from "@/services/SpecialityService";

const tableData: DataTableData<ClinicHoliday> = {
    createUrl: "/admin/clinics/speciality/create",
    title: "Clinics Speciality",
    schema: [
        {
            name: "name",
            label: "Speciality",
            sortable: true,
            translatable: true,
        },
        {
            label: "Actions",
            render: (_undefined, data, setHidden) => (
                <ActionsButtons
                    id={data?.id}
                    buttons={["edit", "delete", "show"]}
                    baseUrl={"/admin/speciality"}
                    editUrl={`/admin/clinics/speciality/${data?.id}/edit`}
                    showUrl={`/admin/clinics/speciality/${data?.id}`}
                    setHidden={setHidden}
                />
            ),
        },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
        await SpecialityService.make().indexWithPagination(
            page,
            search,
            sortCol,
            sortDir,
            perPage,
            params,
        ),
};
const Page = () => {
    return <DataTable {...tableData} />;
};

export default Page;
