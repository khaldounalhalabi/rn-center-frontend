"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ClinicSubscriptionService } from "@/services/ClinicSubscriptionServic";
import { ClinicSubscription } from "@/Models/ClinicSubscription";

const ClinicSubscriptionTable = ({ clinicId }: { clinicId: number }) => {
  const tableData: DataTableData<ClinicSubscription> = {
    createUrl: `/admin/clinics/${clinicId}/subscription/create`,
    title: `Clinic Subscriptions`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "status",
        label: `Status`,
        sortable: true,
        render: (data) =>
          data == "active" ? (
            <span className={`badge badge-success`}>Active</span>
          ) : (
            <span className={`badge badge-error`}>In Active</span>
          ),
      },
      {
        name: "subscription.name",
        label: `Name`,
        sortable: true,
      },
      {
        name: "remaining",
        label: `Remaining`,
        sortable: true,
      },
      {
        name: "type",
        label: `Type`,
        sortable: true,
      },
      {
        name: "deduction_cost",
        label: `Deduction Cost`,
        sortable: true,
        render: (data) => (
          <span className={`badge badge-success`}>{data} %</span>
        ),
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
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/clinic-subscriptions`}
            editUrl={`/admin/clinics/${clinicId}/subscription/${data?.id}/edit`}
            showUrl={`/admin/clinics/${clinicId}/subscription/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ClinicSubscriptionService.make<ClinicSubscriptionService>(
        "admin",
      ).getClinicSubscriptions(
        clinicId,
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

export default ClinicSubscriptionTable;