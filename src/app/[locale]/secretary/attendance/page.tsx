import AttendanceImportButton from "@/components/admin/attendance/AttendanceImportButton";
import AttendanceImportExampleButton from "@/components/admin/attendance/AttendanceImportExampleButton";
import AttendanceTimeline from "@/components/admin/attendance/AttendanceTimeline";
import ExportAttendanceButton from "@/components/admin/attendance/ExportAttendanceButton";
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
          <ExportAttendanceButton exportUrl="secretary/attendances/export" />
          <AttendanceImportButton role={RoleEnum.SECRETARY} />
          <AttendanceImportExampleButton role={RoleEnum.SECRETARY} />
        </div>
      }
    >
      <AttendanceTimeline role={RoleEnum.SECRETARY} />
    </PageCard>
  );
};

export default Page;
