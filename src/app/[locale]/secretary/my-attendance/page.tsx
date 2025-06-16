import ExportAttendanceButton from "@/components/admin/attendance/ExportAttendanceButton";
import UserAttendanceTimeline from "@/components/common/attendance/UserAttendanceTimeline";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("attendance");
  return (
    <PageCard
      title={t("attendance_timeline")}
      actions={
        <div className={"flex items-center gap-2"}>
          <ExportAttendanceButton exportUrl="secretary/attendances/export/mine" />
        </div>
      }
    >
      <UserAttendanceTimeline role={RoleEnum.SECRETARY} />
    </PageCard>
  );
};

export default Page;
