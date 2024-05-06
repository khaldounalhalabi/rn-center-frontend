
export enum AppointmentStatusEnum {
    CHECKIN = "checkin",
    BOOKED = "booked",
    CANCELLED = "cancelled",
    PENDING = "pending",
    CHECKOUT = "checkout",
    COMPLETED = "completed",
    ALL = "all",
}

 const AppointmentStatuses = (): string[] => {
    return Object.values(AppointmentStatusEnum);
}
export const AppointmentStatusesWithOutAll = (): string[] => {
    const statusArray = Object.values(AppointmentStatusEnum);
    return statusArray.slice(0, statusArray.length - 1);
}

export default AppointmentStatuses