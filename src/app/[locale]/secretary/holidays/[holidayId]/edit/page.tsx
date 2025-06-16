import HolidaysForm from "@/components/admin/holidays/HolidaysForm";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import { HolidayService } from "@/services/HolidayService";
import { getTranslations } from "next-intl/server";

const EditHolidayPage = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const t = await getTranslations("holidays");

  const holiday = (await HolidayService.make(RoleEnum.SECRETARY).show(holidayId))
    .data;
  return (
    <PageCard title={t("update_title")}>
      <HolidaysForm
        role={RoleEnum.SECRETARY}
        type={"update"}
        defaultValues={holiday}
      />
    </PageCard>
  );
};

export default EditHolidayPage;
