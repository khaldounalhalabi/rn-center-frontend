import {Media} from "@/Models/Media";
import {Clinic} from "@/Models/Clinic";

export interface SystemOffers {
    "id": number,
    "title": string,
    "description": string,
    "type": string,
    "amount": number,
    "allowed_uses": number,
    "allow_reuse": boolean,
    "from": string,
    "to": string,
    "status": string,
    "image": Media[],
    "clinics"?:Clinic[]
}