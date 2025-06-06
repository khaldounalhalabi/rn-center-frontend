import AttendanceLogStatusEnum from "@/enums/AttendanceLogStatusEnum";
import AttendanceLog from "@/models/AttendanceLog";
import dayjs from "dayjs";

const TimelineEvents = ({ logs }: { logs: AttendanceLog[] }) => {
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
    <div className="relative my-20 flex h-8 items-center justify-between">
      {logs.map((log) => {
        const time = dayjs(log.attend_at);
        const totalMinutes = time.hour() * 60 + time.minute();
        const position = (totalMinutes / (24 * 60)) * 100; // Position calculation for full day

        return (
          <div
            key={log.id}
            className={`absolute h-4 w-4 rounded-full ${getStatusColor(log.status)} z-10`}
            style={{ left: `${position - 0.4}%`, bottom: "5%" }}
            title={`${log.type}: ${formatTime(log.attend_at)} - ${log.status}`}
          ></div>
        );
      })}
    </div>
  );
};

export default TimelineEvents;
