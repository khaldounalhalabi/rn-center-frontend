import React, { useState } from "react";
import { User } from "@/models/User";
import AttendanceLogStatusEnum from "@/enum/AttendanceLogStatusEnum";
import dayjs from "dayjs";
import { Link } from "@/navigation";
import { RoleEnum } from "@/enum/RoleEnum";
import Pencil from "@/components/icons/Pencil";
import Dialog from "@/components/common/ui/Dialog";
import AttendanceForm from "@/components/admin/attendance/AttendanceForm";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { useTranslations } from "next-intl";
import StatusLegend from "@/components/admin/attendance/StatusLegend";

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
    <div className="p-6">
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center">
          <div className="ltr:mr-4 rtl:ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
            <span className="font-bold text-gray-600">
              {user?.first_name.charAt(0)}
              {user?.last_name.charAt(0)}
            </span>
          </div>
          <div>
            <Link
              href={
                user?.role === RoleEnum.SECRETARY
                  ? `/admin/secretaries/${user.id}`
                  : `/admin/clinics/${user?.clinic?.id}`
              }
              className="btn btn-sm text-lg font-semibold"
            >
              {user?.full_name}
            </Link>
            <p className="text-gray-600">
              <TranslatableEnum value={user?.role} />
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="btn btn-square btn-sm"
            onClick={() => setOpenEditModal((prevState) => !prevState)}
          >
            <Pencil className="h-6 w-6 text-success" />
          </button>
        </div>
      </div>

      <Dialog open={openEditModal}>
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
      </Dialog>

      {user?.attendance_by_date && user?.attendance_by_date.length > 0 ? (
        <div className="mt-4">
          <div className="relative">
            <div className="absolute top-5 h-1 w-full bg-gray-200"></div>
            {Array.from({ length: 25 }, (_, i) => i).map((hour) => {
              const leftPosition = (hour / 24) * 100;
              return (
                <div
                  key={hour}
                  className="absolute text-xs text-gray-500"
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
                    <div className="absolute ltr:-start-4 rtl:-start-2 -top-20 text-center text-xs">
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
    </div>
  );
};

export default UserTimelineItem;
