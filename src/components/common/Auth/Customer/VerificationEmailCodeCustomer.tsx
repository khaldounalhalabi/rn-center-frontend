"use client";
import LogoIcon from "@/components/icons/logoIcon";
import Form from "@/components/common/ui/Form";
import Input from "@/components/common/ui/Inputs/Input";
import React, { useState } from "react";
import { POST } from "@/Http/Http";
import { AuthResponse } from "@/Models/User";
import { isArray } from "util";
import { getCookieClient, setCookieClient } from "@/Actions/clientCookies";
import { Role } from "@/enum/Role";
import { ApiResponse } from "@/Http/Response";
import { Navigate } from "@/Actions/navigate";
import { Link } from "@/navigation";
import { AuthService } from "@/services/AuthService";
import { toast } from "react-toastify";


const VerificationEmailCodeCustomer = ({ url, urlResendCode }: { url: string, urlResendCode: string }) => {
    const emailCoc = getCookieClient('email')

    const handleSubmit = (data: { verificationCode: string }) => {
        const dataSend = {
            email:emailCoc,
            verificationCode:data.verificationCode
        }
        return AuthService.make<AuthService>().requestVerificationCode(url, dataSend);
    };
    const handleResendVerCode = () => {
        const email = {
            email: emailCoc,
        };
        return POST(urlResendCode, email).then((res)=>{
            return toast.success("Resend Success");
        });
    };
    const handleSuccess = () => {
        Navigate(`/customer`);
    };
    return (
        <div className={"min-h-screen flex flex-col items-center "}>
            <div className="navbar hidden md:block bg-base-100 border-b-2 border-gray-400 shadow-md shadow-gray-500">
                <LogoIcon className={"w-24 mx-4 h-full"} />
            </div>

            <div className={"  w-full md:card md:bg-white md:p-20 p-10 shadow-gray-500 md:shadow-xl h-full flex flex-col items-center  justify-center mt-20 md:mt-28 md:max-w-[50%]"}>
                <Form handleSubmit={handleSubmit} onSuccess={handleSuccess} className={'md:w-2/3 w-full h-full '} button={'w-full h-12 font-bold text-xl hover:bg-[#F0F5F5] badge bg-[#12C7D4]'} buttonText={"logIn"}>
                    <div className={"flex w-full flex-col items-center justify-center "}>
                        <h1 className={"md:text-[32px] text-[28px] my-4"}>Verification Email</h1>
                        <LogoIcon className={"md:w-24 w-36 md:hidden mx-4 h-full"} />
                        <div className={"w-full my-4 hidden md:block"}>
                            <Input
                                name="verificationCode"
                                type="text"
                                placeholder="Enter Verification Code"
                            />            </div>


                        <div className="w-full text-left">
                            <p
                                onClick={handleResendVerCode}
                                className="mt-3 pl-2 text-blue-600 text-sm cursor-pointer"
                            >
                                Resend The code ?
                            </p>
                        </div>
                    </div>

                </Form>
                <Link href={'/auth/customer/register'} className={' w-full md:w-2/3 h-12  md:text-lg text-md  badge bg-[#c5efef] '}>Register</Link>
            </div>
        </div>
    );
};

export default VerificationEmailCodeCustomer