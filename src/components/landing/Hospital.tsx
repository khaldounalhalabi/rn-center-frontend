import HospitalLandingIcon from "@/components/icons/HospitalLandingIcon";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import React from "react";


const Hospital = ()=>{


    return (
        <div className={'w-full flex md:flex-row flex-col my-6'}>
            <div className={' md:w-1/2 w-full flex justify-center items-center md:p-0 px-6'}>
                <HospitalLandingIcon />
            </div>
            <div className={'md:w-1/2 w-full flex flex-col justify-center items-center '}>
                <div className={'flex flex-col items-start gap-6'}>
                    <div>
                        <h2 className={'text-[35px] font-bold'}>Hospitals &</h2>
                        <h2 className={'text-[35px] font-bold'}>Health centers</h2>
                    </div>
                    <div className={" text-[15px] opacity-80 font-extralight"}>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>adipisicing elit. Expedita fugiat,</p>
                        <p>impedit ad saepe sit fuga iste tempora</p>
                    </div>
                    <AuthSubmitButton
                        className={'w-1/2 px-10 py-2'}

                    >
                        Explore
                    </AuthSubmitButton>
                </div>
            </div>
        </div>

    )
}

export default Hospital