export enum AppointmentStatusEnum {
  PENDING = "pending",
  BOOKED = "booked",
  CHECKIN = "checkin",
  CHECKOUT = "checkout",
  CANCELLED = "cancelled",
  ALL = "all",
}


export const AppointmentStatusesFilter = (type: string, status: string): string[] => {
  if (type === "online") {
    switch (status) {
      case AppointmentStatusEnum.PENDING:
        return [AppointmentStatusEnum.PENDING, AppointmentStatusEnum.BOOKED];
      case AppointmentStatusEnum.BOOKED:
        return [
          AppointmentStatusEnum.BOOKED,
          AppointmentStatusEnum.CHECKIN,
          AppointmentStatusEnum.CHECKOUT,
          AppointmentStatusEnum.CANCELLED,
        ];
      case AppointmentStatusEnum.CHECKIN:
        return [
          AppointmentStatusEnum.CHECKIN,
          AppointmentStatusEnum.CHECKOUT,
          AppointmentStatusEnum.CANCELLED,
        ];
      case AppointmentStatusEnum.CHECKOUT:
        return [AppointmentStatusEnum.CHECKOUT];
      case AppointmentStatusEnum.CANCELLED:
        return [AppointmentStatusEnum.CANCELLED];
      default:
        return [];
    }
  } else {
    return Object.values(AppointmentStatusEnum).filter((item) => item !== "all");
  }
};


const AppointmentStatuses = (): string[] => {
  return Object.values(AppointmentStatusEnum).filter((item) => item != "all");
};

export default AppointmentStatuses;