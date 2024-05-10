import {Customer} from "@/Models/Customer";
import {Clinic} from "@/Models/Clinic";
import {rename} from "fs";


export interface Prescriptions {
    "id": number,
    "clinic_id": number,
    "customer_id": number,
    "physical_information": string,
    "problem_description": string,
    "test": string,
    "next_visit": string,
    "clinic": Clinic,
    "customer": Customer,
    medicines_data:Multi[]
}
export interface Multi {
    id?:number
    medicine_id: number;
    dosage: string;
    duration: string;
    time: string;
    dose_interval: string;
    comment: string;
    medicine?:medicine
}

export interface medicine {
    "id": number,
        "name": string,
        "description": string,
        "clinic_id": number
}
export interface PrescriptionsDataSend {
    clinic_id:number,
    customer_id:number,
    appointment_id:number,
    physical_information:string,
    problem_description:string,
    next_visit:string,
    test:string,
    medicines:Multi

}
export interface PrescriptionsData {
    clinic_id:number,
    customer_id:number,
    physical_information:string,
    problem_description:string,
    next_visit:string,
    test:string,
    medicines:Multi
    next:number,
    visit:string
}
