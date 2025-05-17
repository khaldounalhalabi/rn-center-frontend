import { UserService } from "@/services/UserService";
import { RoleEnum } from "@/enums/RoleEnum";
import UserDataView from "@/components/common/user/UserDataView";
import { Button } from "@/components/ui/shadcn/button";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

const Page = async ({
  params: { secretaryId },
}: {
  params: { secretaryId: number };
}) => {
  const user = (await UserService.make(RoleEnum.ADMIN).show(secretaryId))?.data;
  const t = await getTranslations("secretaries");

  return (
    <UserDataView
      user={user}
      editUrl={`/admin/secretaries/${secretaryId}/edit`}
      actions={
        <Link href={`/admin/secretaries/${secretaryId}/schedules`}>
          <Button variant={"secondary"}>{t("schedule")}</Button>
        </Link>
      }
    />
  );
};

export default Page;
