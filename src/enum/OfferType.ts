export enum OfferType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

const OffersArray = (): string[] => {
  return Object.values(OfferType);
};

export default OffersArray;