"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { UsersService } from "@/services/UsersService";
import { User } from "@/Models/User";
import { translate } from "@/Helpers/Translations";
import ArchiveButton from "@/components/common/ArchiveButton";
import { AppointmentService } from "@/services/AppointmentService";
import BlockButton from "@/components/common/BlockButton";

const Page = () => {
  const tableData: DataTableData<User> = {
    createUrl: `/admin/user/create`,
    title: `Users`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "first_name",
        sortable: true,
        label: "User Name",
        render: (_first_name, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              <p>
                {translate(user?.first_name)} {translate(user?.middle_name)}{" "}
                {translate(user?.last_name)}
              </p>
            </div>
          );
        },
      },
      {
        name: "email",
        label: `Email`,
        sortable: true,
      },
      {
        name: "age",
        label: `Age`,
        sortable: true,
      },
      {
        name: "is_blocked",
        sortable: true,
        label: "is blocked",
        render: (_is_blocked, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              {user?.is_blocked ? (
                <span className="badge badge-error">Blocked</span>
              ) : (
                <span className="badge badge-success">Not Blocked</span>
              )}
            </div>
          );
        },
      },
      {
        name: "is_archived",
        sortable: true,
        label: "is Archived",
        render: (_is_archived, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              {user?.is_archived ? (
                <span className="badge badge-neutral">Archived</span>
              ) : (
                <span className="badge badge-warning">Not Archived</span>
              )}
            </div>
          );
        },
      },
      {
        label: `Actions`,
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
