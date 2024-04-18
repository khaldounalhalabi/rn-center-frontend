import {NextResponse} from "next/server";
import {getCookies} from "next-client-cookies/server";
import { AuthService } from "@/services/AuthService";

const locale:string|undefined  =getCookies().get('locale')
const token:string|undefined  =getCookies().get('token')


export default async function middlewsfare(req:any){

    const Accsess = await AuthService.getCurrentActor()
    const path :string= `${req.nextUrl.pathname}`
    if(!token && path.includes(`/${locale}/admin`)){
        console.log('login')
        return NextResponse.redirect(`/${locale}/auth/admin/login`)
    }
    if(!token && path.includes(`/${locale}/customer`)){
        console.log('login')

        return NextResponse.redirect(`/${locale}/auth/customer/login`)
    }

    if(!token && path.includes(`/${locale}/doctor`)){
        console.log('login')
        return NextResponse.redirect(`/${locale}/auth/doctor/login`)
    }

   

}
