"use server";

import { cookies } from "next/headers";

export async function setCookie(key:string , value:string ){
    cookies().set(key , value);
}

export async function getCookie(key:string) {
    const val = cookies().get(key)?.value;
    return val;
}