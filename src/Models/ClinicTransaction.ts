import {Appointment} from "@/Models/Appointment";
import {Clinic} from "@/Models/Clinic";


export interface ClinicTransaction {
    "id": number,
    "amount": number,
    "appointment_id": number,
    "type": string,
    "clinic_id": number,
    "notes": string,
    "status": string,
    "date": string,
    "appointment": Appointment
    clinic?:Clinic
    before_balance:number,
    after_balance:number
}

export interface ClinicSummary{
    "clinic_balance": number,
    "pending_amount": number
}