import dayjs, { Dayjs } from "dayjs";
import { AvailableTime } from "@/Models/AvailableTime";
import plugin from "dayjs/plugin/isBetween";

dayjs.extend(plugin);

export const HandleDatePicker = (
  data: AvailableTime,
  day: Dayjs,
  range: number,
): boolean => {
  const schedule = data?.clinic_schedule
    ? Object.keys(data.clinic_schedule)
    : [];
  const lastDay = dayjs().add(range - 1, "day");
  const isHoliday = data?.clinic_holidays
    ? data?.clinic_holidays.some((e) => day.isBetween(e.start_date, e.end_date))
    : true;

  return (
    dayjs().isAfter(day.subtract(-1, "day")) ||
    !schedule.includes(day.format("dddd").toLowerCase()) ||
    day.isAfter(lastDay) ||
    isHoliday
  );
};

// ------------------------------------------------------------------------------------- ----------------
