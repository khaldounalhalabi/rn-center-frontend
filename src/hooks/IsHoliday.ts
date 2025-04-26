import useUser from "@/hooks/UserHook";
import { useQuery } from "@tanstack/react-query";
import { HolidayService } from "@/services/HolidayService";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const useIsHoliday = () => {
  const { role } = useUser();

  const { data } = useQuery({
    queryKey: ["holidays_data"],
    queryFn: async () =>
      await HolidayService.make(role)
        .activeHolidays()
        .then((res) => res.data),
  });

  return (date: Dayjs) => {
    date = dayjs(date) as Dayjs;
    if (data) {
      return (
        data?.filter((holiday) =>
          date.isBetween(holiday.from, holiday.to, "day", "[]"),
        )?.length > 0
      );
    }

    return false;
  };
};

export default useIsHoliday;
