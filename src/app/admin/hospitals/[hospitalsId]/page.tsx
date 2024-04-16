import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Link from "next/link";
import { HospitalService } from "@/services/HospitalService";
import { AddHospital } from "@/Models/Hospital";
import {translate} from "@/Helpers/Translations";import {DepartmentsService} from "@/services/DepartmentsService";
import {Department} from "@/Models/Departments";

const page = async ({
                        params: { hospitalsId },
                    }: {
    params: { hospitalsId: number };
}) => {
    const data = await HospitalService.make().show(hospitalsId);
    const res: AddHospital = data?.data;
    return (
        <PageCard>
            <div className="w-full h-24 flex justify-between items-center">
                <h2 className="card-title">Holiday Details</h2>
                <Link href={`/admin/hospitals/${res.id}/edit`}>
                    <PrimaryButton type={"button"}>Edit</PrimaryButton>
                </Link>
            </div>
            <div className="flex flex-col">
                <div className="my-2 flex justify-between items-center">
                    <h2 className="text-xl">
                        Hospital Name :{" "}
                        <span className="text-lg bg-base-200 rounded-xl px-2">
              {translate(res?.name)}
            </span>
                    </h2>
                </div>
                <div className="my-5">
                    {res?.phone_numbers?res?.phone_numbers.map((e:string,index:number)=>(
                            <div key={index} className=''>
                                <span className='text-lg md:text-xl my-3 w-3/12 inline-block'>Phone {index} : {' '}</span>
                                <span className='text-lg badge badge-neutral '>{e}</span>
                            </div>
                        )):
                        <div>
                            <span className='text-lg md:text-xl my-3 w-3/12 inline-block'>Phone  : {' '}</span>
                            <span className='text-lg badge badge-neutral'>non</span>
                        </div>}
                </div>
                <div className="my-5">
                    <span className='text-lg md:text-xl my-3 w-3/12 inline-block'>Departments : {' '}</span>
                    {res?.available_departments?res?.available_departments.map((e:Department, index:number)=>{
                            return (
                                <span key={index} className='text-lg badge badge-accent ltr:ml-1 rtl:mr-1'>{translate(e.name)}</span>
                            )
                        }):
                        <span className='text-lg badge badge-neutral'> non </span>}
                </div>
                <div className="my-5">
                    <span className='text-lg md:text-xl my-3 w-3/12 '>Image : {' '}</span>
                    <div className='flex justify-between my-1'>
                        {res?.images?res?.images.map((e:string,index:number)=>(
                                <div key={index} className='p-3 bg-gray-400 w-5/12 max-h-40 rounded-2xl'>
                                    <img  src={e} alt='..' className=' w-full h-full rounded-2xl'/>
                                </div>
                            )):
                            <span className='text-lg badge my-1 badge-accent'>No Data</span>}

                    </div>
                </div>
            </div>
        </PageCard>
    );
};

export default page;
