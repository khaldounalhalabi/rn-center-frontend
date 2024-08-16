"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { OffersService } from "@/services/OffersService";
import { Offers } from "@/Models/Offers";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("doctor.offer.table");
  const tableData: DataTableData<Offers> = {
    createUrl: `/doctor/offer/create`,
    title: `${t("offers")}`,
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
        translatable: true,
      },
      {
        name: "value",
        label: `${t("value")}`,
        sortable: true,
        render: (_value, offer) => {
          return (
            <div className={`flex flex-col items-start`}>
              {offer?.type == "percentage" ? (
                <span>
                  {offer?.value} <span className="badge badge-neutral">%</span>
                </span>
              ) : offer?.type == "fixed" ? (
                <span>
                  {offer?.value}{" "}
                  <span className="badge badge-warning">IQD</span>
                </span>
              ) : (
                <span className="badge badge-warning">No Data</span>
              )}
            </div>
          );
        },
      },
      {
        name: "type",
        label: `${t("type")}`,
        sortable: true,
      },
      {
        name: "is_active",
        sortable: true,
        label: `${t("isActive")}`,
        render: (_is_active, offer) => {
          return (
            <div className={`flex flex-col items-start`}>
              {offer?.is_active ? (
                <span className="badge badge-neutral">{t("active")}</span>
              ) : (
                <span className="badge badge-warning">{t("not-active")}</span>
              )}
            </div>
          );
        },
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/doctor/offers`}
            editUrl={`/doctor/offer/${data?.id}/edit`}
            showUrl={`/doctor/offer/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await OffersService.make<OffersService>("doctor").indexWithPagination(
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
