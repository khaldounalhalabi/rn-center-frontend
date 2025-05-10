"use client";
import { useTranslations } from "next-intl";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { RoleEnum } from "@/enums/RoleEnum";
import React from "react";
import { UserService } from "@/services/UserService";
import { User } from "@/models/User";

const Page = () => {
  const t = useTranslations("secretaries");
  const dataTableData: DataTableData<User> = {
    createUrl: `/admin/secretaries/create`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "full_name",
        sortable: true,
        label: `${t("name")}`,
      },
      {
        label: `${t("phone")}`,
        name: "phone",
        sortable: true,
      },
      {
        label: `${t("gender")}`,
        name: "gender",
        sortable: true,
        render: (gender) => <TranslatableEnum value={gender} />,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, secretary, setHidden) => (
          <ActionsButtons
            id={secretary?.id}
            buttons={["edit", "show", "delete"]}
            deleteUrl={`/admin/users/${secretary?.id}`}
            editUrl={`/admin/secretaries/${secretary?.id}/edit`}
            showUrl={`/admin/secretaries/${secretary?.id}`}
            setHidden={setHidden}
            baseUrl={""}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await UserService.make(RoleEnum.ADMIN).getSecretaries(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    title: `${t("secretaries")} :`,
  };
  return <DataTable {...dataTableData} />;
};

export default Page;
