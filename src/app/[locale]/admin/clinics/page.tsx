"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import Tooltip from "@/components/common/ui/Tooltip";
import Timepicker from "@/components/common/ui/date-time-pickers/Timepicker";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Select from "@/components/common/ui/selects/Select";
import SchedulesIcon from "@/components/icons/SchedulesIcon";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import WeekDayEnum from "@/enums/WeekDayEnum";
import { getEnumValues } from "@/helpers/Enums";
import { Clinic } from "@/models/Clinic";
import { Link } from "@/navigation";
import { ClinicsService } from "@/services/ClinicsService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.clinic.table");
  const schedulesT = useTranslations("admin.schedules.table");
  const dataTableData: DataTableData<Clinic> = {
    createUrl: `/admin/clinics/create`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "user.full_name",
        sortable: true,
        label: `${t("doctor")}`,
      },
      {
        label: `${t("phone")}`,
        name: "user.phone",
        sortable: true,
      },
      {
        label: `${t("gender")}`,
        name: "user.gender",
        sortable: true,
        render: (gender) => <TranslatableEnum value={gender} />,
      },
      {
        name: "total_appointments",
        label: `${t("total-appointments")}`,
        render: (_undefined, clinic) => {
          return (
            <span suppressHydrationWarning>
              {clinic?.total_appointments.toLocaleString()}
            </span>
          );
        },
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, clinic, setHidden) => (
          <ActionsButtons
            id={clinic?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/admin/clinics`}
            setHidden={setHidden}
            deleteMessage={t("delete_warning")}
          >
            <Tooltip title={schedulesT("clinicSchedules")}>
              <Link href={`/admin/clinics/schedules/${clinic?.id}`}>
                <Button variant={"outline"} size={"icon"}>
                  <SchedulesIcon />
                </Button>
              </Link>
            </Tooltip>
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ClinicsService.make(RoleEnum.ADMIN).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    filter: (params, setParams) => {
      return (
        <Grid md={1}>
          <Select
            onChange={(e) => {
              setParams({ ...params, day_of_week: e });
            }}
            selected={params.day_of_week}
            data={getEnumValues(WeekDayEnum)}
            translated={true}
            label={t("available_day")}
          />

          <Label label={t("available_time")} col>
            <Timepicker
              onChange={(event) => {
                setParams({
                  ...params,
                  available_time: event?.format("HH:mm"),
                });
              }}
              defaultValue={params.available_time}
            />
          </Label>
        </Grid>
      );
    },
  };
  return (
    <PageCard title={t("clinics")}>
      <DataTable {...dataTableData} />
    </PageCard>
  );
};

export default Page;
