import React from "react";
import AttendanceLogStatusEnum from "@/enum/AttendanceLogStatusEnum";

const StatusLegend: React.FC = () => {
  const statuses = [
    { color: "bg-green-500", label: "On Time", status: AttendanceLogStatusEnum.ON_TIME },
    { color: "bg-red-500", label: "Late", status: AttendanceLogStatusEnum.LATE },
    { color: "bg-blue-500", label: "Over Time", status: AttendanceLogStatusEnum.OVER_TIME },
    { color: "bg-yellow-500", label: "Early Leave", status: AttendanceLogStatusEnum.EARLY_LEAVE },
  ];

  return (
    <div className="flex items-center space-x-6">
      {statuses.map((status) => (
        <div key={status.status} className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${status.color} mr-2`}></div>
          <span className="text-xs">{status.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatusLegend;
