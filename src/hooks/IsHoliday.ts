import { RoleEnum } from "@/enums/RoleEnum";
import { HolidayService } from "@/services/HolidayService";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";

const useIsHoliday = ({ role = RoleEnum.ADMIN }: { role?: RoleEnum }) => {
  const { data: holidays } = useQuery({
    queryKey: ["holidays_data"],
    queryFn: async () =>
      await HolidayService.make(role)
        .activeHolidays()
        .then((res) => res.data),
  });

  return (date: Dayjs) => {
    date = dayjs(date) as Dayjs;
    if (holidays) {
      return (
        holidays?.filter(
          (holiday) =>
            (date.isSame(dayjs(holiday.from)) ||
              date.isAfter(dayjs(holiday.from))) &&
            (date.isBefore(dayjs(holiday.to)) ||
              date.isSame(dayjs(holiday.to))),
        )?.length > 0
      );
    }

    return false;
  };
};

export default useIsHoliday;
