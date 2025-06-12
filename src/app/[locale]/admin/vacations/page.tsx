"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
  getTableQueryName,
} from "@/components/common/Datatable/DataTable";
import { NotificationHandler } from "@/components/common/helpers/NotificationHandler";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import PageCard from "@/components/common/ui/PageCard";
import ShowVacationSheet from "@/components/common/Vacations/ShowVacationSheet";
import VacationFormSheet from "@/components/common/Vacations/VacationFormSheet";
import VacationStatusColumn from "@/components/common/Vacations/VacationStatusColumn";
import { RoleEnum } from "@/enums/RoleEnum";
import { NotificationsTypeEnum } from "@/models/NotificationPayload";
import Vacation from "@/models/Vacation";
import VacationService from "@/services/VacationService";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("vacations");
  const schema: DataTableSchema<Vacation>[] = [
    {
      name: "id",
      label: "ID",
      sortable: true,
    },
    {
      name: "user.full_name",
      label: t("user"),
      sortable: true,
    },
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
      render: (status, vacation, _setHidden, revalidate) => (
        <VacationStatusColumn
          vacation={vacation}
          role={RoleEnum.ADMIN}
          revalidate={revalidate}
        />
      ),
      sortable: true,
    },
    {
      name: "actions",
      label: t("actions"),
      render(data, fullObject, setHidden, revalidate) {
        return (
          <ActionsButtons
            data={fullObject}
            baseUrl="/admin/vacations"
            buttons={["delete"]}
            reverse
            setHidden={setHidden}
          >
            <VacationFormSheet
              type="update"
              vacation={fullObject}
              role={RoleEnum.ADMIN}
              revalidate={revalidate}
            />
            <ShowVacationSheet vacation={fullObject} />
          </ActionsButtons>
        );
      },
    },
  ];

  const datatable: DataTableData<Vacation> = {
    async api(page, search, sortCol, sortDir, perPage, params) {
      return await VacationService.make(RoleEnum.ADMIN).indexWithPagination(
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
          role={RoleEnum.ADMIN}
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
          if (payload.type == NotificationsTypeEnum.NewVacationRequest) {
            queryClient.invalidateQueries({
              queryKey: [queryName],
            });
          }
        }}
        isPermanent
      />
      <DataTable {...datatable} />
    </PageCard>
  );
};

export default Page;
