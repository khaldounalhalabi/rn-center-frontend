'use client'
import { useCookies } from 'next-client-cookies';

export function setCookieClient(key:string , value:string ){
    return useCookies().set(key , value);
}

export function getCookieClient(key:string ){
    const coc :string|undefined=  useCookies().get(key );
    return coc?coc:''
}

