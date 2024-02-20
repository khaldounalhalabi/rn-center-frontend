'use client'
import React, {useState} from "react";
import RoundedImage from "@/components/common/NavBar/RoundedImage";

const ProfileOptionsPopover = ()=>{
    const [open,setOpen] = useState(false)
    const handleOpenNot = ()=>{
        open?setOpen(false):setOpen(true)
    }


    return (

        <div className=" overflow-y-clip">
            <div onClick={handleOpenNot} className={open?'rounded-full w-7 h-7 border-2 border-blue-500 mt-2':'mt-2 w-7 h-7'}>
                <RoundedImage
                    src={"/user.png"} alt={"user-profile"} />
            </div>

            <div
                className={open?"absolute end-0 w-[200px] z-10 mt-2   !right-[5%] divide-y divide-gray-100 rounded-2xl opacity-100 bg-white  ease-in-out duration-500 ":'w-0 opacity-0 h-0 ease-in-out duration-500 '}
                role="menu"
                style={{boxShadow:' 0px 5px 5px -3px rgba(145, 158, 171, 0.2)' +
                        ', 0px 8px 10px 1px rgba(145, 158, 171, 0.14)' +
                        ', 0px 3px 14px 2px rgba(145, 158, 171, 0.12)'}}
            >
                <div className='px-[16px] my-[12px]'>
                    <h2>Jaydon Frankie</h2>
                    <p className='opacity-[0.6]'>demo@minimals.cc</p>
                </div>
                <div className='opacity-[0.8]'>
                    <div className='text-start px-[16px] py-[6px]'>
                        <h3 >Home</h3>
                    </div>
                    <div className='text-start px-[16px] py-[6px]'>
                        <h3 >Profile</h3>
                    </div>
                    <div className='text-start px-[16px] py-[6px]'>
                        <h3 >Setting</h3>
                    </div>
                </div>
                <hr className='my-[8px]'></hr>
                <div className='py-[12px] px-[16px] text-[#ff5630]'>
                    <h3>Logout</h3>
                </div>
            </div>
        </div>
    )
}

export default  ProfileOptionsPopover