export enum SubscriptionStatusEnum {
    true = "active",
    false = "in-active",
}

const SubscriptionStatuses = (): string[] => {
    return Object.values(SubscriptionStatusEnum)
};

export default SubscriptionStatuses;