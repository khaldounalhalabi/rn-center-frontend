import TaskTable from "@/components/common/tasks/TaskTable";
import { RoleEnum } from "@/enums/RoleEnum";

const Page = () => {
  return <TaskTable type="all" role={RoleEnum.ADMIN} />;
};

export default Page;
