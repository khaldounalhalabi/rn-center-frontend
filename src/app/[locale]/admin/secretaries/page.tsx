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
import PageCard from "@/components/common/ui/PageCard";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/shadcn/button";
import SchedulesIcon from "@/components/icons/SchedulesIcon";

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
          >
            <Link href={`/admin/secretaries/${secretary?.id}/schedules`}>
              <Button size={"icon"} variant={"outline"}>
                <SchedulesIcon />
              </Button>
            </Link>
          </ActionsButtons>
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
  };
  return (
    <PageCard title={t("secretaries")}>
      <DataTable {...dataTableData} />
    </PageCard>
  );
};

export default Page;
