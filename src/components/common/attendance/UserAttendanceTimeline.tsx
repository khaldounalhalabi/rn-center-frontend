"use client";
import TimelineItem from "@/components/common/attendance/TimelineItem";
import Select from "@/components/common/ui/selects/Select";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Card, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { RoleEnum } from "@/enums/RoleEnum";
import { RealTimeEventsTypeEnum } from "@/models/NotificationPayload";
import AttendanceLogService from "@/services/AttendanceLogService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { NotificationHandler } from "../helpers/NotificationHandler";

const UserAttendanceTimeline = ({ role }: { role: RoleEnum }) => {
  const t = useTranslations("attendance");
  const [year, setYear] = useState<string>(dayjs().format("YYYY"));
  const [month, setMonth] = useState<number>(dayjs().month() + 1);
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format("MMMM"),
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user_attendance", year, month],
    queryFn: async () => {
      return await AttendanceLogService.make(role).mine(year, month);
    },
  });

  const queryClient = useQueryClient();
  const invalidate = async () => {
    queryClient.invalidateQueries({
      queryKey: ["user_attendance"],
    });
  };

  return (
    <div className="mb-2">
      <NotificationHandler
        handle={(payload) => {
          if (payload.type == RealTimeEventsTypeEnum.AttendanceEdited) {
            invalidate();
          }
        }}
        isPermanent
      />
      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpin className={"h-10 w-10 text-primary"} />
        </div>
      )}
      {isError && (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            Failed to load attendance data.
          </span>
          <button
            onClick={() => refetch()}
            className="mt-2 rounded-md bg-red-200 px-3 py-1 text-sm text-red-800 hover:bg-red-300"
          >
            Try Again
          </button>
        </div>
      )}

      {data && !isLoading && (
        <Card className="overflow-hidden m-0">
          <CardHeader className="grid grid-cols-3 grid-flow-col gap-5 items-center justify-between md:grid-flow-row">
            <CardTitle className="text-start">
              {t("attendance_date")}: {year},{" "}
              {dayjs().month(month).format("MMMM")}
            </CardTitle>
            <Input
              placeholder={`${t("year")} : ${year}`}
              type={"number"}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              defaultValue={year}
            />
            <Select
              data={months}
              selected={dayjs()
                .month(month - 1)
                .format("MMMM")}
              onChange={(val) => {
                const formattedMonthName =
                  val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
                const date = dayjs(`${year}-${val}-01`, "YYYY-MMMM-DD");
                if (date.isValid()) {
                  setMonth(date.month() + 1);
                } else {
                  console.error(
                    "Invalid date " + `${year}-${formattedMonthName}`,
                  );
                }
              }}
            />
          </CardHeader>

          <div className="max-h-[70vh] overflow-auto space-y-2">
            {Object.entries(data.data).map(([date, logs], index) => {
              return <TimelineItem logs={logs} date={date} key={index} />;
            })}
          </div>
        </Card>
      )}

      {!data && (
        <div className="border-l-4 text-secondary">
          <p>{t("no_records")}</p>
        </div>
      )}
    </div>
  );
};

export default UserAttendanceTimeline;
