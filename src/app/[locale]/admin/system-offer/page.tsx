"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { SystemOffersService } from "@/services/SystemOffersService";
import { SystemOffers } from "@/Models/SystemOffer";
import {useTranslations} from "next-intl";

const Page = () => {
  const t = useTranslations("admin.system.table")

  const tableData: DataTableData<SystemOffers> = {
    createUrl: `/admin/system-offer/create`,
    title: `${t("systemOffers")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "title",
        label: `${t("title")}`,
        sortable: true,
      },
      {
        name: "type",
        label: `${t("type")}`,
        sortable: true,
      },
      {
        name: "amount",
        label: `${t("amount")}`,
        sortable: true,
      },
      {
        label: `${t("status")}`,
        name: "status",
        sortable: true,
        render: (data) =>
          data == "active" ? (
              <span className="badge badge-neutral">{t("active")}</span>
          ) : (
              <span className="badge badge-warning">{t("not-active")}</span>
          ),
      },
      {
        name: "from",
        label: `${t("startDate")}`,
        sortable: true,
      },
      {
        name: "to",
        label: `${t("endDate")}`,
        sortable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/admin/system-offers`}
            editUrl={`/admin/system-offer/${data?.id}/edit`}
            showUrl={`/admin/system-offer/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await SystemOffersService.make<SystemOffersService>(
        "admin",
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default Page;