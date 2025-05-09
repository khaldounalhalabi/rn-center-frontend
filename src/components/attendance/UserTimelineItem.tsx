import React, { useState } from "react";
import { User } from "@/Models/User";
import AttendanceLogStatusEnum from "@/enum/AttendanceLogStatusEnum";
import dayjs from "dayjs";
import StatusLegend from "./StatusLegend";
import { Link } from "@/navigation";
import { RoleEnum } from "@/enum/RoleEnum";
import Pencil from "@/components/icons/Pencil";
import Dialog from "@/components/common/ui/Dialog";
import AttendanceForm from "@/components/attendance/AttendanceForm";

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
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
            <span className="text-gray-600 font-bold">
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
              className="text-lg font-semibold btn btn-sm"
            >
              {user?.full_name}
            </Link>
            <p className="text-gray-600">{user?.role}</p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="btn btn-square btn-sm"
            onClick={() => setOpenEditModal((prevState) => !prevState)}
          >
            <Pencil className="w-6 h-6 text-success" />
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
            <div className="absolute h-1 w-full bg-gray-200 top-5"></div>
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
            <div className="relative flex justify-between items-center h-8 my-10">
              {user.attendance_by_date.map((log) => {
                const time = dayjs(log.attend_at);
                const totalMinutes = time.hour() * 60 + time.minute();
                const position = (totalMinutes / (24 * 60)) * 100; // Position calculation for full day

                return (
                  <div
                    key={log.id}
                    className={`absolute w-4 h-4 rounded-full ${getStatusColor(log.status)} z-10`}
                    style={{ left: `${position - 0.4}%`, bottom: "5%" }}
                    title={`${log.type}: ${formatTime(log.attend_at)} - ${log.status}`}
                  >
                    <div className="absolute -top-12 -left-5 text-xs text-center">
                      <span className="font-bold border-l">
                        {formatTime(log.attend_at)}
                      </span>
                      <br />
                      <span className="capitalize text-xs">{log.type}</span>
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
        <p className="text-gray-500 italic">
          No attendance records for this date
        </p>
      )}
    </div>
  );
};

export default UserTimelineItem;
