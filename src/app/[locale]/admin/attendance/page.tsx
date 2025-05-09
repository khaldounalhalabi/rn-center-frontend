import AttendanceTimeline from "@/components/attendance/AttendanceTimeline";
import PageCard from "@/components/common/ui/PageCard";

const Page = async () => {
  return (
    <PageCard>
      <AttendanceTimeline />
    </PageCard>
  );
};

export default Page;
