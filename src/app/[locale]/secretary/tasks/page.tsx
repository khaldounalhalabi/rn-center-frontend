import TaskTable from "@/components/common/tasks/TaskTable";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
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
      role={RoleEnum.SECRETARY}
    />
  );
};

export default Page;
