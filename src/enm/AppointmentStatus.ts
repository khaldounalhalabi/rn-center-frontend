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
  return Object.values(AppointmentStatusEnum).filter((item) => item != "all");
};

export default AppointmentStatuses;
