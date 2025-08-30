"use client";

import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
  getTableQueryName,
} from "@/components/common/Datatable/DataTable";
import ShowTaskSheet from "@/components/common/tasks/ShowTaskSheet";
import TaskFromSheet from "@/components/common/tasks/TaskFormSheet";
import TaskStatusColumn from "@/components/common/tasks/TaskStatusColumn";
import PageCard from "@/components/common/ui/PageCard";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Select from "@/components/common/ui/selects/Select";
import { Badge } from "@/components/ui/shadcn/badge";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import TaskLabelEnum from "@/enums/TaskLabelEnum";
import TaskStatusEnum from "@/enums/TaskStatusEnum";
import { getEnumValues } from "@/helpers/Enums";
import useUser from "@/hooks/UserHook";
import { NotificationsTypeEnum } from "@/models/NotificationPayload";
import Task from "@/models/Task";
import TaskService from "@/services/TaskService";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { NotificationHandler } from "../helpers/NotificationHandler";

function TaskTable({ type , role }: { type: "mine" | "all" , role:RoleEnum }) {
  const { user } = useUser();
  const t = useTranslations("tasks");
  const schema: DataTableSchema<Task>[] = [
    {
      label: "ID",
      name: "id",
      sortable: true,
    },
    {
      label: t("label"),
      name: "label",
      sortable: true,
      render: (data) => (
        <Badge
          variant={
            data == TaskLabelEnum.LOW
              ? "outline"
              : data == TaskLabelEnum.NORMAL
                ? "default"
                : "destructive"
          }
        >
          <TranslatableEnum value={data} />
        </Badge>
      ),
    },
    {
      label: t("title"),
      name: "title",
      sortable: true,
    },
    {
      label: t("due_date"),
      name: "due_date",
      sortable: true,
    },
    {
      label: t("status"),
      name: "status",
      sortable: true,
      render: (data, task) => (
        <TaskStatusColumn role={role ?? RoleEnum.ADMIN} task={task} />
      ),
    },
    {
      label: t("user"),
      name: "user.full_name",
      sortable: true,
    },
    {
      label: t("issued_at"),
      name: "issued_at",
      sortable: true,
    },
    {
      label: t("actions"),
      render(_data, task, setHidden, revalidate) {
        return (
          <ActionsButtons
            buttons={task?.can_delete ? ["delete"] : []}
            data={task}
            baseUrl={`/${role}/tasks`}
            setHidden={setHidden}
            reverse
          >
            {task?.can_update && (
              <TaskFromSheet
                type="update"
                task={task}
                revalidate={revalidate}
              />
            )}
            <ShowTaskSheet task={task} revalidate={revalidate} />
          </ActionsButtons>
        );
      },
    },
  ];

  const datatable: DataTableData<Task> = {
    schema: schema,
    api: (page, search, sortCol, sortDir, perPage, params) => {
      const service = TaskService.make(role);
      return type == "all"
        ? service.indexWithPagination(
            page,
            search,
            sortCol,
            sortDir,
            perPage,
            params,
          )
        : service.mine(page, search, sortCol, sortDir, perPage, params);
    },
    filter: (params, setParams) => (
      <div className={"grid grid-cols-1 gap-2"}>
        <Select
          data={getEnumValues(TaskStatusEnum)}
          selected={params?.status}
          onChange={(v) => setParams({ ...params, status: v })}
          label={t("status")}
          translated
        />
        <Select
          data={getEnumValues(TaskLabelEnum)}
          selected={params?.label}
          onChange={(v) => setParams({ ...params, label: v })}
          label={t("label")}
          translated
        />
        <Datepicker
          label={t("due_date")}
          defaultValue={params?.due_date}
          onChange={(date) =>
            setParams({ ...params, due_date: date?.format("YYYY-MM-DD") })
          }
        />
      </div>
    ),
    extraButton(revalidate) {
      return (
        (user?.permissions?.includes(PermissionEnum.TASKS_MANAGEMENT) ||
          role == RoleEnum.ADMIN) && (
          <TaskFromSheet type="store" revalidate={revalidate} />
        )
      );
    },
  };
  const queryName = getTableQueryName(datatable);
  const queryClient = useQueryClient();
  return (
    <PageCard title={t("index_title")}>
      <NotificationHandler
        key="TASKS_NOTIFICATIONS_HANDLER_IN_TABLE"
        isPermanent
        handle={(payload) => {
          if (
            payload.type == NotificationsTypeEnum.NewTaskAssigned ||
            payload.type == NotificationsTypeEnum.NewTaskComment ||
            payload.type == NotificationsTypeEnum.TaskStatusChanged
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
}

export default TaskTable;
