"use client"





import {Link} from "@/navigation";
import ButtonSinSvg from "@/components/common/Auth/Customer/ButtonSin";
import React from "react";

const page = ()=>{


    return (
        <div className={'w-screen h-screen bg-[#e2e8f0] flex flex-col justify-center items-center '}>
            <h1 className={'kodchasan text-[#334155]  md:text-[60px] text-[42px] font-semibold'}>430</h1>
            <h2 className={'kodchasan text-[#334155]  md:text-[40px] text-[23px] font-semibold'}>Your Account Has Been Blocked</h2>
            <Link href={'auth/doctor/login'} className={"w-52 h-16 mt-8 relative group hover:border-2 border-[#1FB8B9]  rounded-[30px]"}>
                <ButtonSinSvg className={"w-full h-full group-hover:hidden"} />
                <p
                    className={
                        "absolute tracking-5 top-1/2 right-1/2 group-hover:text-black -translate-y-1/2 translate-x-1/2 font-bold kodchasan text-[16px] text-white"
                    }
                >
                    Log In
                </p>
            </Link>
        </div>
    )
}

export default page