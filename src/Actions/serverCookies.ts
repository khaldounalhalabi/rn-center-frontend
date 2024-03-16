'use server'
import { getCookies } from 'next-client-cookies/server';
import {cookies} from "next/headers";

export async function setCookieServer(key:string,valu:string) {
    await cookies().set(key,valu)
}

export async function getCookieServer(key:string) {
    const coc :string|undefined=await  getCookies().get(key)
    return coc?coc:''
}