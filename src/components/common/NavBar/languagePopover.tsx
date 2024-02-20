'use client'
import React, {useState} from "react";
import RoundedImage from "@/components/common/NavBar/RoundedImage";
import LanguageIcon from "@/components/icons/LanguageIcon";

const LanguagePopover = ()=>{
    const [open,setOpen] = useState(false)
    const handleOpenNot = ()=>{
        open?setOpen(false):setOpen(true)
    }

    return (
        <div className=" overflow-y-clip">
             <LanguageIcon className={`h-6 w-6 cursor-pointer`} onClick={handleOpenNot} />
            <div
                className={open?"absolute end-0 w-[180px] z-10 mt-2 !right-[20%] md:!right-[10%] divide-y divide-gray-100 rounded-2xl bg-white opacity-100 ease-in-out  duration-500 ":'w-0 h-0 opacity-0 ease-in-out duration-500 '}
                style={{boxShadow:' 0px 5px 5px -3px rgba(145, 158, 171, 0.2)' +
                        ', 0px 8px 10px 1px rgba(145, 158, 171, 0.14)' +
                        ', 0px 3px 14px 2px rgba(145, 158, 171, 0.12)'}}
                role="menu"
            >
                <div>
                    <div className='flex px-[16px] py-[8px] rounded-xl  cursor-pointer hover:bg-blue-200'>
                        <img className='w-[28px] h-[20px] mr-4' src="https://img.icons8.com/color/48/usa.png" alt="usa"/>
                        <h3>English</h3>
                    </div>
                    <div className='flex px-[16px] py-[8px] rounded-xl  cursor-pointer hover:bg-blue-200'>
                        <img className='w-[28px] h-[20px] mr-4' src="https://img.icons8.com/fluency/48/saudi-arabia.png" alt="saudi-arabia"/>
                        <h3>Arabic</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LanguagePopover