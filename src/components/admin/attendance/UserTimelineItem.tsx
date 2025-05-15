import React, { useState } from "react";
import { User } from "@/models/User";
import AttendanceLogStatusEnum from "@/enums/AttendanceLogStatusEnum";
import dayjs from "dayjs";
import { Link } from "@/navigation";
import { RoleEnum } from "@/enums/RoleEnum";
import Pencil from "@/components/icons/Pencil";
import AttendanceForm from "@/components/admin/attendance/AttendanceForm";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { useTranslations } from "next-intl";
import StatusLegend from "@/components/admin/attendance/StatusLegend";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";

interface UserTimelineItemProps {
  user?: User;
  date?: string;
  refetch?: CallableFunction;
}

const UserTimelineItem: React.FC<UserTimelineItemProps> = ({
  user,
  date,
  refetch,
}) => {
  const t = useTranslations("attendance");
  const [openEditModal, setOpenEditModal] = useState(false);

  const getStatusColor = (status: AttendanceLogStatusEnum) => {
    switch (status) {
      case AttendanceLogStatusEnum.ON_TIME:
        return "bg-green-500";
      case AttendanceLogStatusEnum.LATE:
        return "bg-red-500";
      case AttendanceLogStatusEnum.OVER_TIME:
        return "bg-blue-500";
      case AttendanceLogStatusEnum.EARLY_LEAVE:
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTime = (dateTime: string) => {
    return dayjs(dateTime).format("HH:mm");
  };

  return (
    <Card className="p-6">
      <CardHeader className="mb-4 flex flex-row w-full items-center justify-between">
        <CardTitle className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 ltr:mr-4 rtl:ml-4">
            <span className="font-bold text-gray-600">
              {user?.first_name.charAt(0)}
              {user?.last_name.charAt(0)}
            </span>
          </div>
          <div className={"flex flex-col items-start"}>
            <Link
              href={
                user?.role === RoleEnum.SECRETARY
                  ? `/admin/secretaries/${user.id}`
                  : `/admin/clinics/${user?.clinic?.id}`
              }
            >
              <Button variant={"link"}>{user?.full_name}</Button>
            </Link>
            <Badge className={"ms-3"}>
              <TranslatableEnum value={user?.role} />
            </Badge>
          </div>
        </CardTitle>
        <Sheet>
          <SheetTrigger>
            <Button
              size={"icon"}
              onClick={() => setOpenEditModal((prevState) => !prevState)}
            >
              <Pencil />
            </Button>
          </SheetTrigger>
          <SheetContent className={"w-[60vh] md:w-[80vh]"} >
            <SheetHeader>
              <SheetTitle>
                {user?.full_name} Attendance in {date}
              </SheetTitle>
            </SheetHeader>
            <div>
              <AttendanceForm
                date={date ?? ""}
                userId={user?.id ?? 0}
                attendances={user?.attendance_by_date ?? []}
                setClose={() => {
                  setOpenEditModal((prevState) => !prevState);
                  if (refetch) {
                    refetch();
                  }
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
      </CardHeader>

      <CardContent>
        {user?.attendance_by_date && user?.attendance_by_date.length > 0 ? (
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

              {/* Timeline events */}
              <div className="relative my-20 flex h-8 items-center justify-between">
                {user.attendance_by_date.map((log) => {
                  const time = dayjs(log.attend_at);
                  const totalMinutes = time.hour() * 60 + time.minute();
                  const position = (totalMinutes / (24 * 60)) * 100; // Position calculation for full day

                  return (
                    <div
                      key={log.id}
                      className={`absolute h-4 w-4 rounded-full ${getStatusColor(log.status)} z-10`}
                      style={{ left: `${position - 0.4}%`, bottom: "5%" }}
                      title={`${log.type}: ${formatTime(log.attend_at)} - ${log.status}`}
                    >
                      <div className="absolute -top-20 text-center text-xs ltr:-start-5 rtl:-start-2 border p-0.5 rounded-md">
                        <span className="font-bold">
                          {formatTime(log.attend_at)}
                        </span>
                        <br />
                        <span className="text-xs capitalize">
                          <TranslatableEnum value={`${log.type}_attendance`} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10">
              <StatusLegend />
            </div>
          </div>
        ) : (
          <p className="italic text-gray-500">{t("no_records")}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTimelineItem;
