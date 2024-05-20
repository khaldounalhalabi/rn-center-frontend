export enum AppointmentStatusEnum {
  PENDING = "pending",
  BOOKED = "booked",
  CHECKIN = "checkin",
  CHECKOUT = "checkout",
  CANCELLED = "cancelled",
  ALL = "all",
}

const AppointmentStatuses = (): string[] => {
  return Object.values(AppointmentStatusEnum).filter((item) => item != "all");
};

export default AppointmentStatuses;
