import { Clinic } from "./Clinic"




export interface Service {
    id:number,
    name:string,
    approximate_duration:number,
    service_category_id:number,
    price:number,
    status:string,
    description:string,
    clinic_id:number,
    serviceCategory:ServiceCategory,
    clinic:Clinic
}

export interface ServiceCategory {
    id:number,
    name:string
}