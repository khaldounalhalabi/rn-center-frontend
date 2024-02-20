'use client'
import React, {useState} from "react";
import NotificationsIcon from "@/components/icons/NotificationsIcon";
import Link from "next/link";

const NotificationsPopover = ()=>{
    const [open,setOpen] = useState(false)
    const handleOpenNot = ()=>{
        open?setOpen(false):setOpen(true)
    }

    return (
        <div className=" overflow-y-clip">
            <NotificationsIcon onClick={handleOpenNot}
                className={open?`h-6 w-6 cursor-pointer text-[#909CA6] fill-blue-500`:'h-6 w-6 cursor-pointer text-[#909CA6] fill-[#909CA6]'}
            />

            <div
                className={open?"absolute end-0 w-[80%] z-10 mt-2 left-[10%] md:w-[360px] md:left-auto md:!right-[10%] divide-y divide-gray-100 rounded-2xl  bg-white opacity-100  ease-in-out duration-500 ":'w-0 h-0 opacity-0 ease-in-out duration-500 '}
                role="menu"
                style={{boxShadow:' 0px 5px 5px -3px rgba(145, 158, 171, 0.2)' +
                        ', 0px 8px 10px 1px rgba(145, 158, 171, 0.14)' +
                        ', 0px 3px 14px 2px rgba(145, 158, 171, 0.12)'}}
            >
               <div className='px-[20px] py-[16px]'>
                   <h2>Notifications</h2>
                   <p className='opacity-[0.6]'>You have 0 unread messages</p>
               </div>
                <div className=''>
                    <div >
                        <h3 className='px-[20px] py-[8px] opacity-[0.6] text-[0.75rem]'>NEW</h3>
                        <div className='px-[20px] py-[12px]'>

                        </div>
                    </div>
                    <div>
                        <h3 className='px-[20px] py-[8px] opacity-[0.6] text-[0.75rem]'>BEFORE THAT</h3>
                        <div className='px-[20px] py-[12px]'>

                        </div>
                    </div>
                </div>
                <div className='px-[8] py-[6] text-center'>
                    <Link href='/' className='text-[#1978f2] font-bold text-[0.875rem]'>View All</Link>
                </div>
            </div>
        </div>
    )
}

export default NotificationsPopover