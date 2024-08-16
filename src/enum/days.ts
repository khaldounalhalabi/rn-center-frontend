export enum daysType {
  SATURDAY = "saturday",
  SUNDAY = "sunday",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
}

const daysArray = (): string[] => {
  return Object.values(daysType);
};

export default daysArray;
