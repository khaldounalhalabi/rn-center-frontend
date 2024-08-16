export enum SubscriptionPeriodUnit {
  DAY = "day",
  MONTH = "month",
}

const SubscriptionPeriodUnitArray = (): string[] => {
  return Object.values(SubscriptionPeriodUnit);
};

export default SubscriptionPeriodUnitArray;
