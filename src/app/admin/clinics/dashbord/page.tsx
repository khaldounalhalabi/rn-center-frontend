'use client'
import Table from "@/components/common/DataTableTow/Table";
import {useQuery} from "@tanstack/react-query";
import {ClinicService} from "@/services/ClinicService";
import {ApiResponsePagination, ApiResult} from "@/Http/Response";
import {Clinic} from "@/Models/Clinic";
import React, {useState, useTransition} from "react";
import {Phone} from "@/Models/Phone";
import Eye from "@/components/icons/Eye";
import Pencil from "@/components/icons/Pencil";
import Trash from "@/components/icons/Trash";
import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";


const page = ()=>{

    const [paginate,setPaginate ] = useState(1)
    const [search,setSearch] = useState('')


    const {data,isLoading} = useQuery({
        queryKey:['tableTest',paginate,search],
        queryFn:async ()=>{
             return  await ClinicService.make().indexWithPagination(paginate,search)
        }
    })
    const res:ApiResult<Clinic> |undefined= data
    console.log(res)
    const arrayPaginate:ApiResponsePagination|undefined = res?.paginate
    const tBody = ()=>{
        return res?.data?.map((e:Clinic,index:number)=>{
            const phone:Phone[]|undefined = e.user?.phones
            return (
                <tr key={index} className='h-16  border-t-2 border-gray-300'>
                    <td className='pl-2 max-w-28 overflow-x-hidden border-r-2 border-gray-300'>
                        <p>{e.user?.first_name} {e.user?.middle_name} {e.user?.last_name}</p>
                        <p>{e.name}</p>
                    </td>
                    <td className='pl-2 border-r-2 border-gray-300'>{e.user?.address?.city?e.user?.address?.city:''}</td>
                    <td className='pl-2 border-r-2 max-w-28  border-gray-300'>{phone?phone.map((e:Phone,index:number)=>(
                        <p key={index}>{e.phone}</p>
                    )):''}</td>
                    <td>
                        <div className={`flex justify-around items-center`}>
                            <button className="btn btn-square btn-sm">
                                <Eye className="h-5 w-5 text-primary" />
                            </button>
                            <button className="btn btn-square btn-sm">
                                <Pencil className="h-5 w-5 text-success" />
                            </button>
                            <button className="btn btn-square btn-sm">
                                <Trash className="h-5 w-5 text-error" />
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    const tHead = [
        {
            name: "Doctor",
            sort:()=>{
                return (
                    <div className={`flex flex-col justify-between `}>
                        <ChevronUp
                            className={`h-3 w-3 cursor-pointer hover:text-blue-300`}
                        />
                        <ChevronDown
                            className={`h-3 w-3 cursor-pointer hover:text-blue-300`}
                        />
                    </div>
                )
            }
        },
        {
            name: "City",

        },
        {
            name: "Phone",

        },
        {
            name: "Actions",

        },
    ]



    return (
        <div className='card m-4 bg-white'>
            <Table urlCreate={'/create'} isLoading={isLoading} tHaed={tHead} tBody={tBody} arrayPaginate={arrayPaginate}  paginate={paginate} setPaginate={setPaginate} setSearch={setSearch} />
        </div>
    )
}

export default page