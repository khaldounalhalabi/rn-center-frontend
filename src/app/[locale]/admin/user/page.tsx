"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { UsersService } from "@/services/UsersService";
import { User } from "@/Models/User";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import ArchiveButton from "@/components/common/ArchiveButton";
import BlockButton from "@/components/common/BlockButton";
import {useTranslations} from "next-intl";

const Page = () => {
  const t = useTranslations('admin.users')
  const tableData: DataTableData<User> = {
    title: `${t("users")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "first_name",
        sortable: true,
        label: `${t("userName")}`,
        render: (_first_name, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              <p>
                {TranslateClient(user?.first_name)}{" "}
                {TranslateClient(user?.middle_name)}{" "}
                {TranslateClient(user?.last_name)}
              </p>
            </div>
          );
        },
      },
      {
        name: "email",
        label: `${t("email")}`,
        sortable: true,
      },
      {
        name: "age",
        label: `${t("age")}`,
        sortable: true,
      },
      {
        name: "role",
        label: `${t("role")}`,
        sortable: true,
        render: (_role, user) => {
          const role =
            Array.isArray(user?.role) && user?.role.length != 0
              ? user?.role
              : [{ name: "No Data" }];
          return <p>{role[0].name}</p>;
        },
      },
      {
        name: "is_blocked",
        sortable: true,
        label: `${t("isBlocked")}`,
        render: (_is_blocked, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              {user?.is_blocked ? (
                <span className="badge badge-error">{t("blocked")}</span>
              ) : (
                <span className="badge badge-success">{t("notBlocked")}</span>
              )}
            </div>
          );
        },
      },
      {
        name: "is_archived",
        sortable: true,
        label: `${t("isArchived")}`,
        render: (_is_archived, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              {user?.is_archived ? (
                <span className="badge badge-neutral">{t("archived")}</span>
              ) : (
                <span className="badge badge-warning">{t("notArchived")}</span>
              )}
            </div>
          );
        },
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden, revalidate) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/users`}
            editUrl={`/admin/user/${data?.id}/edit`}
            showUrl={`/admin/user/${data?.id}`}
            setHidden={setHidden}
          >
            <>
              <ArchiveButton
                data={data}
                id={data?.id}
                api={UsersService}
                revalidate={revalidate}
                user={"admin"}
              />
              <BlockButton
                data={data}
                id={data?.id}
                api={UsersService}
                revalidate={revalidate}
                user={"admin"}
              />
            </>
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await UsersService.make<UsersService>("admin").indexWithPagination(
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