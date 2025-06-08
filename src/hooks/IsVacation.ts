import { RoleEnum } from "@/enums/RoleEnum";
import VacationService from "@/services/VacationService";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";

const useIsVacation = ({
  role = RoleEnum.ADMIN,
  userId,
}: {
  role?: RoleEnum;
  userId?: number;
}) => {
  const { data: vacations } = useQuery({
    queryKey: ["vacations_data"],
    queryFn: async () =>
      role == RoleEnum.DOCTOR
        ? await VacationService.make(RoleEnum.DOCTOR)
            .myActiveVacations()
            .then((r) => r.data)
        : await VacationService.make(role)
            .activeByUser(userId ?? 0)
            .then((res) => res.data),
    enabled:
      (role != RoleEnum.DOCTOR && userId != 0 && userId != undefined) ||
      role == RoleEnum.DOCTOR,
  });

  return (date: Dayjs) => {
    date = dayjs(date) as Dayjs;
    if (vacations) {
      return (
        vacations?.filter(
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

export default useIsVacation;
