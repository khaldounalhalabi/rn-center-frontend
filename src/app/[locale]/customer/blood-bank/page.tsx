'use client'
import {Link} from "@/navigation";
import CardPages from "@/components/customer/blood/CardPages";
import BloodBankIcon from "@/components/icons/BloodBankIcon";
import {BloodDonationService} from "@/services/BloodDonationService";
import {BloodBank} from "@/Models/BloodDonation";
import {useQuery} from "@tanstack/react-query";
import LoadingSpin from "@/components/icons/LoadingSpin";
import React from "react";


const page = ()=>{

    const {data,isFetching,isLoading} = useQuery({
        queryKey:['bloodBank'],
        queryFn:async ()=>{
            return await  BloodDonationService.make<BloodDonationService>().getBloodBank()
        }
    })
    const bloodBank :BloodBank[] |undefined= data?.data
    return (
        <div className={'p-4'}>
            <Link href={'/'} className={'card-title text-[#1FB8B9] underline'}>Get donor</Link>
            <div className={'w-full  '}>
                {isLoading || isFetching ? (
                    <div className={'w-full h-[300px] flex justify-center items-center'}>
                        <LoadingSpin className={'w-12 h-12'}/>
                    </div>
                ):bloodBank?.map((e,index)=>{
                    return(
                        <div key={index}>
                            <CardPages image={<BloodBankIcon />} info={
                                <div className={'w-full h-full flex flex-col items-center justify-start pt-4'}>
                                   <p className={'font-semibold text-[16px] text-[#013567]'}>{e.blood_group}</p>
                                </div>
                            }>
                                <div className={'w-full h-full flex flex-col justify-center gap-1'}>
                                    <h2 className={'text-[#013567] text-[16px]'}>{e.full_name}</h2>
                                    <p className={'text-[#1FB8B9] text-[14px]'}>{e.contact_phone}</p>
                                    <p className={'text-[#013567] text-[14px]'}>{e.nearest_hospital}</p>
                                </div>
                            </CardPages>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default page