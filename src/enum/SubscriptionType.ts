export enum SubscriptionType {
  BOOKING_COST = "Booking Cost Based Subscription",
  MONTHLY_PAID = "Monthly Paid Based Subscription",
}

const SubscriptionArray = (): string[] => {
  return Object.values(SubscriptionType);
};

export default SubscriptionArray;