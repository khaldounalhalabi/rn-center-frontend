import { ClinicTransaction } from "@/Models/ClinicTransaction";
import { AppointmentDeductions } from "@/Models/AppointmentDeductions";
import dayjs from "dayjs";
import ClinicTransactionTypeArray, {
  TransactionType,
} from "@/enum/ClinicTransactionType";
import { TransactionStatus } from "@/enum/ClinicTransactionStatus";

interface FilteredData {
  [key: string]: {
    amount: number;
    type: string;
    date: string;
  }[];
}

const filterDataForChart = (
  data?: ClinicTransaction[] | AppointmentDeductions[]
): FilteredData => {
  const dataAll: FilteredData = {};

  if (!data) {
    return dataAll;
  }

  data.forEach((item) => {
    const itemType = item.type;
    if (!dataAll[itemType]) {
      dataAll[itemType] = [];
    }

    if (
      item.type == TransactionType.SYSTEM_DEBT &&
      item.status == TransactionStatus.DONE
    ) {
      dataAll[TransactionType.OUTCOME].push({
        amount: item.amount,
        type: TransactionType.OUTCOME,
        date: dayjs(item.date).format("YYYY-MM-DD"),
      });
    } else if (
      item.type == TransactionType.DEBT_TO_ME &&
      item.status == TransactionStatus.DONE
    ) {
      dataAll[TransactionType.INCOME].push({
        amount: item.amount,
        type: TransactionType.INCOME,
        date: dayjs(item.date).format("YYYY-MM-DD"),
      });
    } else {
      dataAll[itemType].push({
        amount: item.amount,
        type: item.type,
        date: dayjs(item.date).format("YYYY-MM-DD"),
      });
    }
  });

  return dataAll;
};

export default filterDataForChart;
