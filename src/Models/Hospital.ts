export interface Hospital {
    id:number;
    name:string;
}


export interface AddHospital {
    id?:number
    name:string,
    phone_numbers:any,
    available_departments:any,
    images?:any
}