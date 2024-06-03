
export enum OfferType {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED"
}

const OffersArray = (): string[] => {
    return Object.values(OfferType);
};

export default OffersArray;