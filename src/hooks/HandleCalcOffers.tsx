import {Offers} from "@/Models/Offers";
import {SystemOffers} from "@/Models/SystemOffer";


const HandleCalcOffers = (
    discounts: any,
    initialAmount: number,
    type:"system"|"offer"
): number => {
    let finalAmount = initialAmount;
    if(type == "offer"){
        discounts.forEach((discount: Offers) => {
            if (discount.type === "fixed") {
                finalAmount -= discount.value;
            } else if (discount.type === "percentage") {
                finalAmount -= (discount.value / 100) * initialAmount;
            }
        });
    }else {
        discounts.forEach((discount: SystemOffers) => {
            if (discount.type === "fixed") {
                finalAmount -= discount.amount;
            } else if (discount.type === "percentage") {
                finalAmount -= (discount.amount / 100) * initialAmount;
            }
        });
    }
    return finalAmount;
};

export default HandleCalcOffers