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
                name: "subscription.cost",
                label: `Cost`,
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
            {
                name: "subscription.allow_period",
                label: `Allow Period`,
                sortable: true,
                render: (data) => (
                    <p className="text-center flex justify-evenly">
                        {data} <span className={"badge-success badge "}>days</span>
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