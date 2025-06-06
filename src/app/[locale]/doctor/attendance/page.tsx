import ExportAttendanceButton from "@/components/admin/attendance/ExportAttendanceButton";
import PageCard from "@/components/common/ui/PageCard";
import { getTranslations } from "next-intl/server";
import UserAttendanceTimeline from "@/components/common/attendance/UserAttendanceTimeline";
import { RoleEnum } from "@/enums/RoleEnum";

const Page = async () => {
  const t = await getTranslations("attendance");
  return (
    <PageCard
      title={t("attendance_timeline")}
      actions={
        <div className={"flex items-center gap-2"}>
          <ExportAttendanceButton />
        </div>
      }
    >
      <UserAttendanceTimeline role={RoleEnum.DOCTOR}/>
    </PageCard>
  );
};

export default Page;
