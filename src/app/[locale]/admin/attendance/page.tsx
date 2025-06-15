import AttendanceTimeline from "@/components/admin/attendance/AttendanceTimeline";
import PageCard from "@/components/common/ui/PageCard";
import { getTranslations } from "next-intl/server";
import ExportAttendanceButton from "@/components/admin/attendance/ExportAttendanceButton";
import AttendanceImportButton from "@/components/admin/attendance/AttendanceImportButton";
import AttendanceImportExampleButton from "@/components/admin/attendance/AttendanceImportExampleButton";

const Page = async () => {
  const t = await getTranslations("attendance");
  return (
    <PageCard
      title={t("attendance_timeline")}
      actions={
        <div className={"flex items-center gap-2"}>
          <ExportAttendanceButton exportUrl="admin/attendances/export" />
          <AttendanceImportButton />
          <AttendanceImportExampleButton />
        </div>
      }
    >
      <AttendanceTimeline />
    </PageCard>
  );
};

export default Page;
