import { UserService } from "@/services/UserService";
import { RoleEnum } from "@/enums/RoleEnum";
import UserDataView from "@/components/common/user/UserDataView";

const Page = async ({
  params: { secretaryId },
}: {
  params: { secretaryId: number };
}) => {
  const user = (await UserService.make(RoleEnum.ADMIN).show(secretaryId))?.data;

  return (
    <UserDataView
      user={user}
      editUrl={`/admin/secretaries/${secretaryId}/edit`}
    />
  );
};

export default Page;
