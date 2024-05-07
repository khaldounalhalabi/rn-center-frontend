import dayjs, { Dayjs } from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
import {AvailableTime} from "@/Models/AvailableTime";

export const HandleDatePicker = (
  data: AvailableTime,
  day: Dayjs,
  range: number,
): boolean => {
  const schedule = data?.clinic_schedule
    ? Object.keys(data.clinic_schedule)
    : [];
  const lastDay = dayjs().add(range, "day");
  const isHoliday = data?.clinic_holidays ?data?.clinic_holidays.some((e) =>
    day.isBetween(e.start_date, e.end_date),
  ):true

  return (
    dayjs().isAfter(day) ||
    !schedule.includes(day.format("dddd").toLowerCase()) ||
    day.isAfter(lastDay) ||
    isHoliday
  );
};


// ------------------------------------------------------------------------------------- ----------------
