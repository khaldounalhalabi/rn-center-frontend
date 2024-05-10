import {Clinic} from "@/Models/Clinic";


export interface Medicines  {
    "id": number,
    "name": string,
    "description": string,
    "clinic_id": number,
    "clinic": Clinic
}