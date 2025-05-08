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
}

const UserTimelineItem: React.FC<UserTimelineItemProps> = ({ user, date }) => {
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
      <div className={"w-full flex items-center justify-between mb-4"}>
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
                user?.role == RoleEnum.SECRETARY
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
        <div className={"flex items-center"}>
          <button
            className={"btn btn-square btn-sm"}
            onClick={() => setOpenEditModal((prevState) => !prevState)}
          >
            <Pencil className={"w-6 h-6 text-success"} />
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
          }}
        />
      </Dialog>

      {user?.attendance_by_date && user?.attendance_by_date.length > 0 ? (
        <div className="mt-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute h-1 w-full bg-gray-200 top-4"></div>

            {/* Timeline events */}
            <div className="relative flex justify-between items-center h-8 my-10">
              {/* Working hours representation: 8AM to 8PM */}
              <div className="text-xs text-gray-500 absolute left-0 -bottom-6">
                8:00
              </div>
              <div className="text-xs text-gray-500 absolute left-1/4 -bottom-6">
                11:00
              </div>
              <div className="text-xs text-gray-500 absolute left-1/2 -bottom-6">
                14:00
              </div>
              <div className="text-xs text-gray-500 absolute left-3/4 -bottom-6">
                17:00
              </div>
              <div className="text-xs text-gray-500 absolute right-0 -bottom-6">
                20:00
              </div>

              {user.attendance_by_date.map((log) => {
                // Calculate position based on time (assuming 8AM-8PM workday)
                const time = dayjs(log.attend_at);
                const hours = time.hour() + time.minute() / 60;
                // Position calculation (8AM = 0%, 8PM = 100%)
                const position = ((hours - 8) / 12) * 100;

                return (
                  <div
                    key={log.id}
                    className={`absolute w-4 h-4 rounded-full ${getStatusColor(log.status)} z-10`}
                    style={{ left: `${position}%` }}
                    title={`${log.type}: ${formatTime(log.attend_at)} - ${log.status}`}
                  >
                    <div className="absolute -top-8 -left-10 w-20 text-xs text-center">
                      <span className="font-bold">
                        {formatTime(log.attend_at)}
                      </span>
                      <br />
                      <span className="capitalize">{log.type}</span>
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
