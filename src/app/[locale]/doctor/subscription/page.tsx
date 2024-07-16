"use client";
import React from "react";
import DataTable, {
    DataTableData,
} from "@/components/common/Datatable/DataTable";
import {ClinicSubscriptionService} from "@/services/ClinicSubscriptionServise";
import {ClinicSubscription} from "@/Models/ClinicSubscription";

const Page = () => {
    const tableData: DataTableData<ClinicSubscription> = {
        title: `Subscriptions`,
        schema: [
            {
                name: "id",
                label: `id`,
                sortable: true,
            },
            {
                name: "subscription.name",
                label: `Name`,
                sortable: true,
            },
            {
                name: "start_time",
                sortable: true,
                label: "Start Time",
                translatable: true,
            },
            {
                name: "end_time",
                sortable: true,
                label: "End Time",
                translatable: true,
            },
            {
                label: `${("Status")}`,
                name: "status",
                sortable: true,
                render: (data) =>
                    data == "active" ? (
                        <span className={`badge badge-success`}>{("Active")}</span>
                    ) : (
                        <span className={`badge badge-error`}>{("in Active")}</span>
                    ),
            },
            {
                name: "type",
                label: `Type`,
                sortable: true,
                render: (data) => (
                    <p className="text-center flex justify-evenly">
                        {data}
                    </p>
                ),
            },
            {
                name: "deduction_cost",
                label: `Deduction Cost`,
                sortable: true,
                render: (data) => (
                    <p className="text-center flex justify-evenly">
                        {data} <span className={"badge-success badge "}>IQD</span>
                    </p>
                ),
            },
            {
                name: "subscription.period",
                label: `Period`,
                sortable: true,
                render: (data) =>
                    data <= 0 ? (
                        <p className="text-center flex justify-evenly">
                            <span className={"badge-success badge "}>Life Time</span>
                        </p>
                    ) : (
                        <p className="text-center flex justify-evenly">
                            {data} <span className={"badge-success badge "}>month</span>
                        </p>
                    ),
            },

        ],
        api: async (page, search, sortCol, sortDir, perPage, params) =>
            await ClinicSubscriptionService.make<ClinicSubscriptionService>("doctor").indexWithPagination(
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