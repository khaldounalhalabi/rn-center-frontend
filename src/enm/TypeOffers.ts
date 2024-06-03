
export enum Offers {
    percentage = "percentage",
    fixed = "fixed"
}

const OffersArray = (): string[] => {
    return Object.values(Offers);
};

export default OffersArray;