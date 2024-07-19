"use client";
import LogoIcon from "@/components/icons/logoIcon";
import Form from "@/components/common/ui/Form";
import Input from "@/components/common/ui/Inputs/Input";
import React, {useState} from "react";
import {POST} from "@/Http/Http";
import {AuthResponse} from "@/Models/User";
import {isArray} from "util";
import {setCookieClient} from "@/Actions/clientCookies";
import {Role} from "@/enum/Role";
import {ApiResponse} from "@/Http/Response";
import {Navigate} from "@/Actions/navigate";
import {Link} from "@/navigation";


const LoginCustomer = ({url}:{url:string}) => {
    const [error, setError] = useState(false);
    const [errorBlocked,setErrorBlocked] = useState()

    const handleLogIn = (data: { email: string; password: string }) => {
        setError(false);
        return POST<AuthResponse>(url, data).then((res: any) => {
            console.log(res)
            if (res.code == 401) {
                setError(true);
                return res;
            }else if( res.code == 430 || res.code == 431){
                setErrorBlocked(res?.message)
                return res
            } else {
                isArray(res?.data?.user?.role)? res?.data?.user.role?.forEach((e:{id:number,name:string})=>{
                    setCookieClient('role', e.name)
                    if(e.name == Role.CLINIC_EMPLOYEE){

                        const permissions = res.data.user.permissions
                        return setCookieClient('permissions',permissions.toString())
                    }else {
                        return setCookieClient('permissions',"dffds%2Cfdsf")
                    }
                }):false
                return res;
            }
        });
    };

    const handleSuccess = (data: ApiResponse<AuthResponse>) => {
        window.localStorage.setItem("user",JSON.stringify(data?.data?.user??undefined))
        setCookieClient("token", data?.data?.token ?? "");
        setCookieClient("refresh_token", data?.data?.refresh_token ?? "");
        setCookieClient("user-type", "customer");
        Navigate(`/customer`);
    };
  return (
    <div className={"min-h-screen flex flex-col items-center"}>
      <div className="navbar hidden md:block bg-base-100 border-b-2 border-gray-400 shadow-md shadow-gray-500">
        <LogoIcon className={"w-24 mx-4 h-full"} />
      </div>

      <div className={"  w-full md:card md:bg-white md:p-20 p-10 shadow-gray-500 md:shadow-xl h-full flex flex-col items-center  justify-center mt-20 md:mt-28 md:max-w-[50%]"}>
        <Form handleSubmit={handleLogIn} onSuccess={handleSuccess} className={'md:w-2/3 w-full h-full '} button={'w-full h-12 font-bold text-xl hover:bg-[#F0F5F5] badge bg-[#12C7D4]'} buttonText={"logIn"}>
          <div className={"flex w-full flex-col items-center justify-center "}>
            <h1  className={"md:text-[32px] text-[28px] my-4"}>Log in to your account</h1>
              <LogoIcon className={"md:w-24 w-36 md:hidden mx-4 h-full"} />
            <div className={"w-full my-4 hidden md:block"}>
                <Input name={"email"} type={"text"} label={"Email :"} />
            </div>
            <div className={"w-full my-4 hidden md:block"}>
                <Input name={"password"} type={"text"} label={"Password :"} />
            </div>
              <div className={"w-full my-4 block md:hidden"}>
                  <Input name={"email"} type={"text"} placeholder={"Email ..."} className={`input placeholder:text-[#61878A] input-bordered bg-[#F0F5F5] w-full  focus:outline-pom focus:border-pom`}/>
              </div>
              <div className={"w-full my-4 block md:hidden"}>
                  <Input name={"password"} type={"text"} placeholder={"Password ..."} className={`input placeholder:text-[#61878A] input-bordered bg-[#F0F5F5] w-full  focus:outline-pom focus:border-pom`}/>
              </div>
          </div>
            {error && (
                <p className="my-3 p-2 w-full text-error text-sm">
                    The email or password is incorrect. Try again or click Forgot
                    Password.
                </p>
            )}
            {errorBlocked?
                <p className="my-3 p-2 w-full text-error text-sm">
                    {errorBlocked}
                </p>
                :""
            }
        </Form>
          <Link href={'/auth/customer/reset-password'} className={' w-full md:w-2/3 h-12  md:text-lg text-md  badge bg-[#c5efef] '}>Forgot password ...</Link>
      </div>
    </div>
  );
};

export default LoginCustomer