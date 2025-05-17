"use client";
import React from "react";
import DataTable, { DataTableData } from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { Service } from "@/models/Service";
import { ServiceService } from "@/services/ServiceService";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enums/RoleEnum";
import { Link } from "@/navigation";
import PageCard from "@/components/common/ui/PageCard";
import { Button } from "@/components/ui/shadcn/button";

const Page = () => {
  const t = useTranslations("admin.service.table");
  const tableData: DataTableData<Service> = {
    createUrl: `/admin/service/create`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "name",
        label: `${t("service")}`,
        sortable: true,
        translatable: true,
      },
      {
        name: "clinic.user.full_name",
        label: `${t("doctor_name")}`,
        sortable: true,
        render: (name, service) => (
          <Link className={"btn"} href={`/admin/clinics/${service?.clinic_id}`}>
            <Button variant={"link"}>{service?.clinic?.user?.full_name}</Button>
          </Link>
        ),
      },
      {
        name: "approximate_duration",
        label: `${t("approximateDuration")}`,
        sortable: true,
        render: (data) => (
          <p className="flex gap-2">
            {data} <span className={"badge badge-success"}>{t("min")}</span>
          </p>
        ),
      },
      {
        name: "service_category_id",
        label: `${t("category")}`,
        sortable: true,
        translatable: true,
        render: (_item, service) => (
          <Link
            href={`/admin/service-categories/${service?.service_category_id}`}
            className={"btn"}
          >
            {service?.service_category?.name}
          </Link>
        ),
      },
      {
        name: "price",
        label: `${t("price")}`,
        render: (data) => (
          <p>
            <span suppressHydrationWarning>
              {data.toLocaleString()} {t("iqd")}
            </span>
          </p>
        ),
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/service`}
            editUrl={`/admin/service/${data?.id}/edit`}
            showUrl={`/admin/service/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ServiceService.make<ServiceService>(
        RoleEnum.ADMIN,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return (
    <PageCard title={t("service")}>
      <DataTable {...tableData} />
    </PageCard>
  );
};

export default Page;
