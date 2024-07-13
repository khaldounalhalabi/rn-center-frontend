
export enum AppointmentDeductionsStatus{
    PENDING = "pending",
    DONE = "done",

}
const AppointmentDeductionsStatusArray = (): string[] => {
    return Object.values(AppointmentDeductionsStatus);
};

export default AppointmentDeductionsStatusArray;