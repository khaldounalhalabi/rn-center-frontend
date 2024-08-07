'use client'
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Form from "@/components/common/ui/Form";
import { POST } from "@/Http/Http";
import { setCookieClient } from "@/Actions/clientCookies";
import { Navigate } from "@/Actions/navigate";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import ButtonSinSvg from "@/components/common/Auth/Customer/ButtonSin";




const RegisterCustomer = ({ url }: { url: string })=>{
    const [privacy,setPrivacy] = useState<boolean>()
    console.log(privacy)
    const handleRegister = async (data: any) => {
        console.log(data)
        return await POST(url, data).then((res) => {
            return res;
        })
    }

    const handleSuccess = (data: any) => {
        console.log(data)
        window.localStorage.setItem("user", JSON.stringify(data?.data?.user ?? undefined))
        setCookieClient("token", data?.data?.token ?? "");
        setCookieClient("refresh_token", data?.data?.refresh_token ?? "");
        setCookieClient("user-type", "customer");
        setCookieClient("unverified-email", data.data.user.email);
        Navigate(`/auth/customer/verification-email-code`);
    };



    return (
        <div
            className={
                "min-w-full kodchasan tracking-5 min-h-screen content-end bg-gradient-to-b from-[#1FB8B9]  to-[#8AFEFF] md:flex md:justify-center md:items-center"
            }
        >
            <div
                className={
                    "w-full md:w-[60%] max-w-[900px] md:h-full h-[90vh] flex flex-col  items-center "
                }
            >
                <h1
                    className={
                        "kodchasan text-[40px] md:text-[64px] font-semibold text-[#f1fcfc]"
                    }
                >
                    Join PoM family
                </h1>
                <div
                    className={
                        "mt-[5vh] md:mt-10 bg-[#FFFFFF] opacity-90  md:opacity-[70%] rounded-t-[30px] md:rounded-[30px] w-full h-full"
                    }
                >
                    <div className={"card "}>
                        <div
                            className={
                                "card-body className={'flex flex-col md:px-40 md:py-20 items-center"
                            }
                        >
                            <Form
                                handleSubmit={handleRegister}
                                onSuccess={handleSuccess}
                                className={"w-full"}
                                button={"w-fit h-fit"}
                                buttonText={""}
                                NewButton={
                                    <button className={"w-52 h-16 relative group hover:border-2 border-[#1FB8B9]  rounded-[30px]"}>
                                        <ButtonSinSvg className={"w-full h-full group-hover:hidden"} />
                                        <p
                                            className={
                                                "absolute tracking-5 top-1/2 right-1/2 group-hover:text-black -translate-y-1/2 translate-x-1/2 font-bold kodchasan text-[16px] text-white"
                                            }
                                        >
                                            Create
                                        </p>
                                    </button>
                                }
                            >
                                <InputLoginCustomer
                                    name={"first-name"}
                                    label={"First name"}
                                    type={"text"}
                                    labelClass={
                                        "text-[#013567] font-light text-[16px] md:text-[20px]"
                                    }
                                    conClass={"my-8"}
                                />
                                <InputLoginCustomer
                                    name={"middle-name"}
                                    label={"Middle name"}
                                    type={"text"}
                                    labelClass={
                                        "text-[#2e5b83] font-light text-[16px] md:text-[20px]"
                                    }
                                    conClass={"my-8"}
                                />
                                <InputLoginCustomer
                                    name={"last-name"}
                                    label={"Last name"}
                                    type={"text"}
                                    labelClass={
                                        "text-[#2e5b83] font-light text-[16px] md:text-[20px]"
                                    }
                                    conClass={"my-8"}
                                />
                                <InputLoginCustomer
                                    name={"number"}
                                    label={"Phone Number"}
                                    type={"number"}
                                    labelClass={
                                        "text-[#013567] font-light text-[16px] md:text-[20px]"
                                    }
                                    conClass={"my-8"}
                                />
                                <InputLoginCustomer
                                    name={"password"}
                                    label={"Password"}
                                    type={"text"}
                                    labelClass={
                                        "text-[#2e5b83] font-light text-[16px] md:text-[20px]"
                                    }
                                    conClass={"my-8"}
                                />
                                    <div className={'flex justify-start w-fit items-center mt-4'}>
                                        <p
                                            className={
                                                " md:text-[15px] w-fit text-[14px]   text-[#013567]"
                                            }
                                        >
                                            i have agree to{" "}
                                            <Link href={"/"} className={"text-[#1FB8B9] "}>
                                                privacy policy
                                            </Link> {" "}
                                        </p>
                                        <input  type="checkbox" className="checkbox ml-2" onChange={(e)=>setPrivacy(e.target.checked)}/>
                                    </div>
                            </Form>
                            <hr className={"h-[2px] w-full bg-[#bcdfe6]"} />

                            <p
                                className={
                                    " md:text-[16px] text-[14px] mt-4  text-[#013567]"
                                }
                            >
                                Already have an account?{" "}
                                <Link href={"/auth/customer/login"} className={"text-[#1FB8B9] "}>
                                    sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterCustomer