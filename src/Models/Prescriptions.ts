import {Customer} from "@/Models/Customer";
import {Clinic} from "@/Models/Clinic";
import {rename} from "fs";
import { Medicine } from "./Medicines";


export interface Prescription {
    id: number,
    clinic_id: number,
    customer_id: number,
    physical_information?: string,
    problem_description?: string,
    test?: string,
    next_visit?: string,
    clinic?: Clinic,
    customer?: Customer,
    medicines_data?:MedicineData[]
}
export interface MedicineData {
    id?:number
    medicine_id: number;
    dosage?: string;
    duration?: string;
    time?: string;
    dose_interval?: string;
    comment?: string;
    medicine?:Medicine
}

export interface PrescriptionsDataSend {
    clinic_id:number,
    customer_id:number,
    appointment_id:number,
    physical_information:string,
    problem_description:string,
    next_visit:string,
    test:string,
    medicines:MedicineData
}
export interface PrescriptionsData {
    clinic_id:number,
    customer_id:number,
    physical_information:string,
    problem_description:string,
    next_visit:string,
    test:string,
    medicines:MedicineData
    next:number,
    visit:string
}
