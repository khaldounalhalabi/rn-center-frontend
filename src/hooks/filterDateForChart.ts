import {ClinicTransaction} from "@/Models/ClinicTransaction";
import {AppointmentDeductions} from "@/Models/AppointmentDeductions";
import dayjs from "dayjs";


interface FilteredData {
    [key: string]: {
        amount: number;
        type: string;
        date: string;
    }[];
}

const filterDataForChart = (data?: ClinicTransaction[] |AppointmentDeductions[]): FilteredData => {
    const dataAll: FilteredData = {};

    if (!data) {
        return dataAll;
    }

    data.forEach(item => {
        const itemType = item.type;
        if (!dataAll[itemType]) {
            dataAll[itemType] = [];
        }

        dataAll[itemType].push({
            amount: item.amount,
            type: item.type,
            date: dayjs(item.date).format("YYYY-MM-DD")
        });
    });



    return dataAll;
};



export default filterDataForChart