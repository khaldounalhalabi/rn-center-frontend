import HolidaysForm from "@/components/admin/holidays/HolidaysForm";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import { getTranslations } from "next-intl/server";

const CreateHolidayPage = async () => {
  const t = await getTranslations("holidays");
  return (
    <PageCard title={t("create")}>
      <HolidaysForm role={RoleEnum.ADMIN} />
    </PageCard>
  );
};

export default CreateHolidayPage;
