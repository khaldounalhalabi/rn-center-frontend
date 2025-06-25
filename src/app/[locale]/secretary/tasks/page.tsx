"use client";
import TaskTable from "@/components/common/tasks/TaskTable";
import PermissionEnum from "@/enums/PermissionEnum";
import useUser from "@/hooks/UserHook";

const Page = () => {
  const { user } = useUser();
  return (
    <TaskTable
      type={
        user?.permissions?.includes(PermissionEnum.TASKS_MANAGEMENT)
          ? "all"
          : "mine"
      }
    />
  );
};

export default Page;
