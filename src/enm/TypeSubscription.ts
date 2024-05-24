export enum TypeSubscription {
    ACTIVE = "Booking Cost Based Subscription",
    INACTIVE = "Monthly Paid Based Subscription",
}

const SubscriptionArray = (): string[] => {
    return Object.values(TypeSubscription);
};

export default SubscriptionArray;