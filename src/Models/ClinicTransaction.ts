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
}

export interface Summary{
    "clinic_balance": number,
    "pending_amount": number
}