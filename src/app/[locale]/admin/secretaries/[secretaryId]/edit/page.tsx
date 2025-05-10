import { UserService } from "@/services/UserService";
import { RoleEnum } from "@/enums/RoleEnum";
import PageCard from "@/components/common/ui/PageCard";
import UserForm from "@/components/common/user/UserForm";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { secretaryId },
}: {
  params: { secretaryId: number };
}) => {
  const user = (await UserService.make(RoleEnum.ADMIN).show(secretaryId))?.data;
  const t = await getTranslations("secretaries");

  return (
    <PageCard>
      <div className={"card-title"}>{t("edit_title")}</div>
      <UserForm type={"update"} user={user} />
    </PageCard>
  );
};

export default Page;
