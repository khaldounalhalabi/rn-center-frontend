import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Badge } from "@/components/ui/shadcn/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/shadcn/select";
import { RoleEnum } from "@/enums/RoleEnum";
import TaskStatusEnum from "@/enums/TaskStatusEnum";
import { getEnumValues } from "@/helpers/Enums";
import Task from "@/models/Task";
import TaskService from "@/services/TaskService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TaskStatusColumn = ({ task, role }: { task?: Task; role: RoleEnum }) => {
  const [status, setStatus] = useState<TaskStatusEnum>(
    task?.status ?? TaskStatusEnum.PENDING,
  );
  const [loading, setLoading] = useState(false);
  const onChange = (value: TaskStatusEnum) => {
    setLoading(true);
    TaskService.make(role)
      .changeStatus(task?.id ?? 0, value)
      .then((res) => {
        setLoading(false);
        if (res.ok()) {
          setStatus(res.data ?? status);
          toast.success(res.message as string);
        } else {
          toast.error(res.message as string);
        }
      });
  };

  useEffect(() => {
    setStatus(task?.status ?? TaskStatusEnum.PENDING);
  }, [task]);

  return loading ? (
    <LoadingSpin />
  ) : (
    <Select defaultValue={status} onValueChange={onChange}>
      <SelectTrigger>
        <Badge
          variant={getVariantByStatus(status)}
          className={"cursor-pointer"}
        >
          <TranslatableEnum value={status} />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {getEnumValues(TaskStatusEnum).map((s, index) => (
          <SelectItem value={s} key={index}>
            <Badge variant={getVariantByStatus(s)}>
              <TranslatableEnum value={s} />
            </Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const getVariantByStatus = (status: TaskStatusEnum) =>
  status == TaskStatusEnum.PENDING
    ? "outline"
    : status == TaskStatusEnum.IN_PROGRESS
      ? "default"
      : status == TaskStatusEnum.CANCELLED
        ? "destructive"
        : "success";

export default TaskStatusColumn;
