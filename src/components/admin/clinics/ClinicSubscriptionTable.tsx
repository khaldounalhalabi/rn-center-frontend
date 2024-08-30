"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ClinicSubscriptionService } from "@/services/ClinicSubscriptionServic";
import { ClinicSubscription } from "@/Models/ClinicSubscription";
import {useTranslations} from "next-intl";

const ClinicSubscriptionTable = ({ clinicId }: { clinicId: number }) => {
  const t = useTranslations('admin.subscription.table')
  const tableData: DataTableData<ClinicSubscription> = {
    createUrl: `/admin/clinics/${clinicId}/subscription/create`,
    title: `${t("clinicSubscriptions")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "status",
        label: `${t("status")}`,
        sortable: true,
        render: (data) =>
          data == "active" ? (
            <span className={`badge badge-success`}>{t("active")}</span>
          ) : (
            <span className={`badge badge-error`}>{t("in-active")}</span>
          ),
      },
      {
        name: "subscription.name",
        label: `${t("subscriptionName")}`,
        sortable: true,
      },
      {
        name: "remaining",
        label: `${t("remaining")}`,
        sortable: true,
      },
      {
        name: "type",
        label: `${t("type")}`,
        sortable: true,
      },
      {
        name: "deduction_cost",
        label: `${t("deductionCost")}`,
        sortable: true,
        render: (data) => (
          <span className={`badge badge-success`}>{data} %</span>
        ),
      },
      {
        name: "subscription.cost",
        label: `${t("cost")}`,
        sortable: true,
        render: (data) => (
          <p className="text-center flex justify-evenly">
            {data} <span className={"badge-success badge "}>IQD</span>
          </p>
        ),
      },
      {
        label: `${t("actions")}`,
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