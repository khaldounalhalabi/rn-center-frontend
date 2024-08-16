import dayjs from "dayjs";

import { DateFilter } from "@/enum/ClinicTransactionDate";

const HandleFormatArrayDateFilter = (filter: string): string[] => {
  const today = dayjs();
  let startDate, endDate;

  switch (filter) {
    case DateFilter.LAST_WEEK:
      startDate = today.subtract(6, "day");
      endDate = today;
      break;
    case DateFilter.LAST_MONTH:
      startDate = today.subtract(1, "month").startOf("month");
      endDate = today.subtract(1, "month").endOf("month");
      break;
    case DateFilter.LAST_YEAR:
      startDate = today.subtract(1, "year").startOf("year");
      endDate = today.subtract(1, "year").endOf("year");
      break;
    case DateFilter.CURRENT_MONTH:
      startDate = today.startOf("month");
      endDate = today;
      break;
    case DateFilter.CURRENT_YEAR:
      startDate = today.startOf("year");
      endDate = today;
      break;
    default:
      throw new Error("Invalid DateFilter");
  }

  return [startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")];
};
export default HandleFormatArrayDateFilter;
