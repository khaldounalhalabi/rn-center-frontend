"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import { Subscriptions } from "@/Models/Subscriptions";

const Page = () => {
  const tableData: DataTableData<Subscriptions> = {
    createUrl: `/admin/subscriptions/create`,
    title: `Subscriptions`,
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
      },
      {
        name: "cost",
        label: `Cost`,
        sortable: true,
        render: (data) => (
          <p className="text-center flex justify-evenly">
            {data} <span className={"badge-success badge "}>IQD</span>
          </p>
        ),
      },
      {
        name: "period",
        label: `Period`,
        sortable: true,
        render: (_period, subscription) =>
          subscription?.period && subscription?.period <= 0 ? (
            <p className="text-center flex justify-evenly">
              <span className={"badge-success badge "}>Life Time</span>
            </p>
          ) : (
            <p className="text-center flex justify-evenly">
              {subscription?.period}{" "}
              <span className={"badge-success badge "}>
                {subscription?.period_unit}
              </span>
            </p>
          ),
      },
      {
        name: "allow_period",
        label: `Allow Period`,
        sortable: true,
        render: (data) => (
          <p className="text-center flex justify-evenly">
            {data} <span className={"badge-success badge "}>days</span>
          </p>
        ),
      },
      {
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["delete", "show"]}
            baseUrl={`/admin/subscriptions`}
            showUrl={`/admin/subscriptions/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await SubscriptionsService.make<SubscriptionsService>(
        "admin",
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default Page;
