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
import {HospitalService} from "@/services/HospitalService";

const tableData: DataTableData<ClinicHoliday> = {
    createUrl: "/admin/clinics/hospitals/create",
    title: "Clinics Hospitals",
    schema: [
        {
            name: "name",
            label: "Hospitals",
            sortable: true,
            translatable: true,
        },
        {
            label: "Actions",
            render: (_undefined, data, setHidden) => (
                <ActionsButtons
                    id={data?.id}
                    buttons={["edit", "delete", "show"]}
                    baseUrl={"/admin/hospitals"}
                    editUrl={`/admin/clinics/hospitals/${data?.id}/edit`}
                    showUrl={`/admin/clinics/hospitals/${data?.id}`}
                    setHidden={setHidden}
                />
            ),
        },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
        await HospitalService.make().indexWithPagination(
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
