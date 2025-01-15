"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { SettingService } from "@/services/SettingService";
import { Setting } from "@/Models/setting";
import { useTranslations } from "next-intl";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";

const Page = () => {
  const t = useTranslations("admin.setting");
  const tableData: DataTableData<Setting> = {
    title: `${t("settings")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "label",
        label: `${t("label")}`,
        sortable: true,
        render: (data) => <TranslatableEnum value={data} />,
      },
      {
        name: "value",
        label: `${t("value")}`,
        sortable: true,
        render: (data) => (
          <div className={"max-h-[200px] max-w-[200px] overflow-hidden overflow-ellipsis"}>{data}</div>
        ),
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit"]}
            baseUrl={`/admin/settings`}
            editUrl={`/admin/setting/${data?.id}/edit`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await SettingService.make<SettingService>("admin").indexWithPagination(
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
