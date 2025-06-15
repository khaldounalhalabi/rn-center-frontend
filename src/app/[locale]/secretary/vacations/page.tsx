"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
  getTableQueryName,
} from "@/components/common/Datatable/DataTable";
import { NotificationHandler } from "@/components/common/helpers/NotificationHandler";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import PageCard from "@/components/common/ui/PageCard";
import ShowVacationSheet from "@/components/common/Vacations/ShowVacationSheet";
import VacationFormSheet from "@/components/common/Vacations/VacationFormSheet";
import VacationStatusColumn from "@/components/common/Vacations/VacationStatusColumn";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import useUser from "@/hooks/UserHook";
import { NotificationsTypeEnum } from "@/models/NotificationPayload";
import Vacation from "@/models/Vacation";
import VacationService from "@/services/VacationService";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("vacations");
  const { user } = useUser();
  let schema: DataTableSchema<Vacation>[] = [
    {
      name: "id",
      label: "ID",
      sortable: true,
    },
  ];

  if (user?.permissions?.includes(PermissionEnum.VACATION_MANAGEMENT)) {
    schema.push({
      label: t("user"),
      name: "user.full_name",
      sortable: true,
    });
  }

  schema = [
    ...schema,
    {
      name: "from",
      label: t("from"),
      sortable: true,
    },
    {
      name: "to",
      label: t("to"),
      sortable: true,
    },
    {
      name: "status",
      label: t("status"),
      sortable: true,
      render: (status, vacation, _setHidden, revalidate) =>
        user?.permissions?.includes(PermissionEnum.VACATION_MANAGEMENT) ? (
          <VacationStatusColumn
            vacation={vacation}
            role={RoleEnum.SECRETARY}
            revalidate={revalidate}
          />
        ) : (
          <TranslatableEnum value={status} />
        ),
    },
    {
      name: "actions",
      label: t("actions"),
      render(data, fullObject, setHidden, revalidate) {
        return (
          <ActionsButtons
            data={fullObject}
            baseUrl="/secretary/vacations"
            buttons={fullObject?.can_delete ? ["delete"] : []}
            reverse
            setHidden={setHidden}
          >
            {user?.permissions?.includes(
              PermissionEnum.VACATION_MANAGEMENT,
            ) && (
              <VacationFormSheet
                type="update"
                vacation={fullObject}
                role={RoleEnum.SECRETARY}
                revalidate={revalidate}
              />
            )}
            <ShowVacationSheet vacation={fullObject} />
          </ActionsButtons>
        );
      },
    },
  ];

  const datatable: DataTableData<Vacation> = {
    async api(page, search, sortCol, sortDir, perPage, params) {
      return await VacationService.make(RoleEnum.SECRETARY).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      );
    },
    schema: schema,
    extraButton(revalidate) {
      return (
        <VacationFormSheet
          type="store"
          revalidate={revalidate}
          role={RoleEnum.SECRETARY}
        />
      );
    },
    filter(params, setParams) {
      return (
        <Datepicker
          label={t("date")}
          onChange={(date) => {
            setParams({ ...params, date: date?.format("YYYY-MM-DD") });
          }}
          defaultValue={params?.date}
        />
      );
    },
  };
  const queryName = getTableQueryName(datatable);
  const queryClient = useQueryClient();
  return (
    <PageCard title={t("index_title")}>
      <NotificationHandler
        handle={(payload) => {
          if (
            payload.type == NotificationsTypeEnum.NewVacationAdded ||
            payload.type == NotificationsTypeEnum.VacationStatusChanged ||
            payload.type == NotificationsTypeEnum.VacationUpdated
          ) {
            queryClient.invalidateQueries({
              queryKey: [queryName],
            });
          }
        }}
      />
      <DataTable {...datatable} />
    </PageCard>
  );
};

export default Page;
