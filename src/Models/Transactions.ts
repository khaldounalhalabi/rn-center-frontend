



export interface Transactions  {
    "id": number,
    "type": string,
    "amount": number,
    "description": string,
    "date": string,
    "actor_id": number,
    "actor": {
        "id": number,
        "email": string,
        "birth_date": string,
        "age": number,
        "gender": string,
        "blood_group": string,
        "is_blocked": boolean,
        "tags": string,
        "fcm_token": string,
        "is_archived": boolean,
        "first_name": string,
        "middle_name":string,
        "last_name": string
    }
}