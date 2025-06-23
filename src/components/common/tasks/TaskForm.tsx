"use client";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormDatepicker from "@/components/common/ui/date-time-pickers/FormDatepicker";
import FormInput from "@/components/common/ui/inputs/FormInput";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";
import FormSelect from "@/components/common/ui/selects/FormSelect";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import TaskLabelEnum from "@/enums/TaskLabelEnum";
import { getEnumValues } from "@/helpers/Enums";
import useUser from "@/hooks/UserHook";
import Task from "@/models/Task";
import TaskService from "@/services/TaskService";
import { UserService } from "@/services/UserService";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

const TaskForm = ({
  task,
  type,
  onSuccess,
}: {
  task?: Task;
  type: "store" | "update";
  onSuccess?: () => Promise<void>;
}) => {
  const t = useTranslations("tasks");
  const { role } = useUser();
  const onSubmit = (data: any) => {
    const service = TaskService.make(role);
    if (type == "store") {
      return service.store(data);
    }

    return service.update(task?.id, data);
  };
  return (
    <Form handleSubmit={onSubmit} defaultValues={task} onSuccess={onSuccess}>
      <Grid>
        <FormInput name={"title"} label={t("title")} type={"text"} />
        <FormDatepicker
          name={"due_date"}
          label={t("due_date")}
          shouldDisableDate={(day) =>
            day.isBefore(Date.now() , "date")
          }
          // df={task?.due_date}
        />
        <FormSelect
          items={getEnumValues(TaskLabelEnum)}
          name={"label"}
          label={t("label")}
          defaultValue={task?.label}
          translatable
        />
        <ApiSelect
          api={(page, search) => UserService.make(role).getSecretaries(page, search)}
          name={"users"}
          isMultiple={true}
          defaultValues={task?.users}
          optionLabel={"full_name"}
          optionValue={"id"}
          closeOnSelect={false}
          label={t("users")}
        />
        <div className={"md:col-span-2"}>
          <FormTextarea name={"description"} label={t("description")} />
        </div>
      </Grid>
    </Form>
  );
};

export default TaskForm;
