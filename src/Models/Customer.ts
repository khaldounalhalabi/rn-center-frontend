


export interface Customer {
    id : number,
    mother_full_name : null,
    medical_condition : string,
    user_id : number,
    user : {
        id : number,
        email : string,
        birth_date : string,
        age : number,
        gender : string,
        blood_group : string,
        is_blocked : false,
        tags : string,
        fcm_token : null,
        is_archived : false,
        first_name : string,
        middle_name : string,
        last_name : string
}