export enum SubscriptionStatusEnum {
    true = "active",
    false = "in_active",
}

const SubscriptionStatuses = (): string[] => {
    return Object.values(SubscriptionStatusEnum)
};

export default SubscriptionStatuses;