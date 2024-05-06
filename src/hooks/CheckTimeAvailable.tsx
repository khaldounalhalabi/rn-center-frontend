import dayjs, { Dayjs } from "dayjs";
import { AvailableTime } from "@/Models/AvailableTime";

type TimeRange = string;

interface TimeObject {
  startTime: string;
  endTime: string;
}

const CheckTimeAvailable = (
  data: AvailableTime,
  date: string,
  limit: number,
) => {
  const nameOfDay: string = dayjs(date).format("dddd");

  // -------------------------------------------------------------to convert string time to object hour and minutes

  function convertTimeFormat(timeString: string) {
    const [hour, minutes] = timeString.split(":");
    return { hour, minutes };
  }

  // ------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------to create a array have all time with limit
  function createTimeSlots(limit: number) {
    const allTime = [];
    const startTime = new Date("January 1, 2024 00:00:00");
    const endTime = new Date("January 1, 2024 23:59:59");
    const interval = limit * 60 * 1000;

    for (
      let time = startTime;
      time <= endTime;
      time.setTime(time.getTime() + interval)
    ) {
      const start = new Date(time);
      const end = new Date(time.getTime() + interval);
      const formattedStart = start.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedEnd = end.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
      const timeRange = `${formattedStart} - ${formattedEnd}`; // Add space between time ranges
      allTime.push(timeRange);
    }

    return allTime;
  }

  // -------------------------------------------------------------------------------------------------------------

  const allTime = createTimeSlots(limit);

  // --------------------------------------------------------------------to convert the array from string to object
  function convertToTimeObjects(arr: TimeRange[]): TimeObject[] {
    const convertedArray: TimeObject[] = [];

    arr.forEach((timeRange) => {
      const [start, end] = timeRange.split("-");
      const startTime: string = dayjs(start, "h:mm A").format("HH:mm");
      const endTime: string = dayjs(end, "h:mm A").format("HH:mm");
      convertedArray.push({ startTime, endTime });
    });

    return convertedArray;
  }

  // -----------------------------------------------------------------------------------------------------------

  const allTimeTow: TimeObject[] = convertToTimeObjects(allTime);

  // -----------------------------------------------------------------------------------To remove the hour 23:00
  function removeTimesStartingAt23(schedule: TimeObject[]) {
    return schedule.filter((timeSlot) => {
      return convertTimeFormat(timeSlot.startTime).hour !== "23";
    });
  }

  // -----------------------------------------------------------------------------------------------------------

  const allTimeFinal: TimeObject[] = removeTimesStartingAt23(allTimeTow);
  // ----------------------------------------------------------------------------------To get the time in Second
  const returnSecond = (time: string) => {
    const timeObject = dayjs(time, "HH:mm");
    return timeObject.hour() * 3600 + timeObject.minute() * 60;
  };
  // -----------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------- To get the All the Time in Schedule
  function filterTimeslots(
    timeslots: TimeObject[],
    start: string,
    end: string,
  ) {
    const array: TimeObject[] = [];
    timeslots.forEach((e, index) => {
      if (returnSecond(start) < returnSecond(end)) {
        if (
          returnSecond(e.startTime) >= returnSecond(start) &&
          returnSecond(e.endTime) <= returnSecond(end)
        ) {
          array.push(e);
        }
      } else {
        if (
          returnSecond(e.startTime) >= returnSecond(start) ||
          (returnSecond(e.startTime) <= returnSecond(start) &&
            returnSecond(e.endTime) <= returnSecond(end))
        ) {
          array.push(e);
        }
      }
    });
    return array;
  }

  // -----------------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------To get Filtered Data for all conditon
  let filteredArray: TimeObject[] = [];

  function isDateInRange(dateStr: string, range: any): boolean {
    const date = new Date(dateStr);
    const startDate = new Date(range.start_date);
    const endDate = new Date(range.end_date);
    return date >= startDate && date <= endDate;
  }

  const filterBookedTime = (allTimeInScheduleDay: TimeObject[]) => {
    if (data.booked_times.length != 0) {
      data.booked_times.forEach((e) => {
        if (date == e.date) {
          const filteredSlots = allTimeInScheduleDay.filter((slot) => {
            return !e.times.some((timeSlot) => {
              return (
                timeSlot.from === slot.startTime && timeSlot.to === slot.endTime
              );
            });
          });
          filteredArray.push(...filteredSlots);
        }
      });
    } else {
      filteredArray.push(...allTimeInScheduleDay);
    }
  };

  if (Object.entries(data.clinic_schedule).length != 0) {
    Object.entries(data.clinic_schedule).map(([day, schedule]) => {
      if (day == nameOfDay.toLowerCase()) {
        const allTimeInScheduleDay: TimeObject[] = filterTimeslots(
          allTimeFinal,
          schedule[0].start_time,
          schedule[0].end_time,
        );
        filterBookedTime(allTimeInScheduleDay);
      }
    });
  } else {
    filterBookedTime(allTimeFinal);
  }

  // -----------------------------------------------------------------------------------------------------------

  // Remove duplicates from filteredArray
  filteredArray = filteredArray.filter(
    (slot, index) =>
      filteredArray.findIndex(
        (s) => s.startTime === slot.startTime && s.endTime === slot.endTime,
      ) === index,
  );

  if (!data || !date || !limit) {
    return undefined;
  } else {
    return {
      dayName: nameOfDay,
      time: filteredArray,
    };
  }
};

export default CheckTimeAvailable;

// ------------------------------------------------------------------------------------- Handle date Picker

export const HandleDatePicker = (
  data: AvailableTime,
  day: Dayjs,
  range: number,
): boolean => {
  const schedule = data.clinic_schedule
    ? Object.keys(data.clinic_schedule)
    : [];
  const lastDay = dayjs().add(range, "day");
  const isHoliday = data.clinic_holidays.some((e) =>
    day.isBetween(e.start_date, e.end_date),
  );

  return (
    dayjs().isAfter(day) ||
    !schedule.includes(day.format("dddd").toLowerCase()) ||
    day.isAfter(lastDay) ||
    isHoliday
  );
};


// ------------------------------------------------------------------------------------- ----------------
