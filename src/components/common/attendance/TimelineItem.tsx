import StatusLegend from "@/components/admin/attendance/StatusLegend";
import TimelineEvents from "@/components/common/attendance/TimelineEvents";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import AttendanceLog from "@/models/AttendanceLog";
import { useTranslations } from "next-intl";
import React from "react";

interface UserTimelineItemProps {
  logs: AttendanceLog[];
  date: string;
}

const TimelineItem: React.FC<UserTimelineItemProps> = ({ date, logs = [] }) => {
  const t = useTranslations("attendance");
  return (
    <Card className="p-6 m-5">
      <CardHeader className="mb-4 flex flex-row w-full items-center justify-between">
        <CardTitle className="flex items-center">{date}</CardTitle>
      </CardHeader>

      <CardContent>
        {logs?.length > 0 ? (
          <div>
            <div className="relative">
              <div className="absolute top-5 h-1 w-full bg-secondary"></div>
              {Array.from({ length: 25 }, (_, i) => i).map((hour) => {
                const leftPosition = (hour / 24) * 100;
                return (
                  <div
                    key={hour}
                    className="absolute text-xs text-primary"
                    style={{
                      left: `${leftPosition}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {`${hour.toString().padStart(2, "0")}:00`}
                  </div>
                );
              })}
              <TimelineEvents logs={logs} />
            </div>
            <div className="mt-10">
              <StatusLegend />
            </div>
          </div>
        ) : (
          <p className="italic text-primary">{t("no_records")}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TimelineItem;
