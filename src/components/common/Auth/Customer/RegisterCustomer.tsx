'use client'
import LogoIcon from "@/components/icons/logoIcon";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Form from "@/components/common/ui/Form";
import Input from "@/components/common/ui/Inputs/Input";
import ImageUploader from "@/components/common/ui/ImageUploader";
import Grid from "@/components/common/ui/Grid";
import ApiSelect from "../../ui/Selects/ApiSelect";
import { CityService } from "@/services/CityService";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { City } from "@/Models/City";
import TranslatableInput from "../../ui/Inputs/TranslatableInput";
import { POST } from "@/Http/Http";
import { setCookieClient } from "@/Actions/clientCookies";
import { Navigate } from "@/Actions/navigate";
import MultiInput from "../../ui/Inputs/MultiInput";


const RegisterCustomer = ({ url }: { url: string }) => {

    const history = useRouter();

    const handleRegister = async (data: any) => {
        console.log(data)
        return await POST(url, data).then((res) => {
            return res;
        })
    }


    const [locale, setLocale] = useState<"en" | "ar">("en");

    const handleSuccess = (data: any) => {
        console.log(data)
        window.localStorage.setItem("user", JSON.stringify(data?.data?.user ?? undefined))
        setCookieClient("token", data?.data?.token ?? "");
        setCookieClient("refresh_token", data?.data?.refresh_token ?? "");
        setCookieClient("user-type", "customer");
        setCookieClient("email", data.data.user.email);
        Navigate(`/customer`);
    };

    return (
        <div className={"min-h-screen flex flex-col items-center"}>
            <div className="navbar flex justify-between bg-base-100 border-b-2 border-gray-400 shadow-md shadow-gray-500">
                <LogoIcon className={"w-24 mx-4 h-full"} />
                <div className="w-32 mx-4 ">
                    <Link href={'/auth/customer/login'} className="btn w-full btn-square btn-ghost text-xl">
                        Log In
                    </Link>
                </div>
            </div>
            <div className={"w-full md:card md:bg-white md:p-20 p-10 shadow-gray-500 md:shadow-xl h-full flex flex-col items-center  justify-center my-10 md:my-16 md:max-w-[60%]"}>
            <h1 className={"md:text-[32px] text-[28px] my-4"}>Create new account</h1>

                <Form setLocale={setLocale} onSuccess={handleSuccess}
                    handleSubmit={handleRegister} className={' w-full h-full '} button={'w-full h-12 font-bold text-xl hover:bg-[#F0F5F5] badge bg-[#12C7D4]'} buttonText={"Register"}>
                    <div className={"flex w-full flex-col items-center justify-center "}>
                        <LogoIcon className={"md:w-24 w-36 md:hidden mx-4 h-full"} />
                        <div className={'w-full'}>
                            <Grid md={3}>
                                <TranslatableInput
                                    locale={locale}
                                    locales={["en", "ar"]}
                                    label={"First Name :"}
                                    name="first_name"
                                    type="text"
                                    placeholder="First Name"
                                />
                                <TranslatableInput
                                    locale={locale}
                                    locales={["en", "ar"]}
                                    label={"Middle Name :"}
                                    name="middle_name"
                                    type="text"
                                    placeholder="Middle Name"
                                />
                                <TranslatableInput
                                    locale={locale}
                                    locales={["en", "ar"]}
                                    label={"Last Name :"}
                                    name="last_name"
                                    type="text"
                                    placeholder="Last Name"
                                />

                            </Grid>

                            <label className="col-span-6 label">Email :</label>
                            <Input name="email" type="email" placeholder="Enter Your Email" />
                            <Grid md={2}>
                                <Input label='Password :' name="password" type="text" placeholder="Enter Password" />
                                <Input
                                    label='Password Confirmation :'
                                    name="password_confirmation"
                                    type="text"
                                    placeholder="Confirm Password"
                                />
                                <TranslatableInput
                                    locale={locale}
                                    locales={["en", "ar"]}
                                    label={"Address :"}
                                    name="address.name"
                                    type="text"
                                    placeholder="address"
                                />

                                <ApiSelect
                                    required={true}
                                    name={"address.city_id"}
                                    label={"city"}
                                    placeHolder={"Select City Name ..."}
                                    api={(page?: number | undefined, search?: string | undefined) =>
                                        CityService.make<CityService>().getAllCities(page, search)
                                    }
                                    getOptionLabel={(item: City) => TranslateClient(item?.name)}
                                    optionValue={"id"}

                                />
                            </Grid>
                            <div className={`flex gap-5 p-2 items-center`}>
                                <label className={`bg-pom p-2 rounded-md text-white`}>Gender:</label>
                                <Input
                                    name={"gender"}
                                    label="Male"
                                    type="radio"
                                    className="radio radio-info"
                                    value={"male"}

                                />

                                <Input
                                    name={"gender"}
                                    label={"Female"}
                                    type="radio"
                                    className="radio radio-info"
                                    value={"female"}
                                />
                            </div>
                            <div className={'w-full'}>
                                <MultiInput
                                    type={"tel"}
                                    name={"phone_number"}
                                    placeholder={"Enter Clinic Phone Number"}
                                    label={("Phones")}
                                    required={true}
                                />
                            </div>

                            <ImageUploader name={"image"} />
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default RegisterCustomer