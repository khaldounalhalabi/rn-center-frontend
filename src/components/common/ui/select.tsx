'use client'
import React, {useEffect, useRef, useState} from "react";
import ChevronDown from "@/components/icons/ChevronDown";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";

type propsType={
    selectValue:string ,setSelectValue:React.Dispatch<string>,error:String,data:any
}

const Select = (props:propsType)=>{
    const [open,setOpen ] = useState(false)
    const ref: React.RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null);
    useEffect(() => {
        HandleClickOutSide(ref, setOpen);
    }, []);
    return (
        <div className="relative w-[98%]">
            <button type="button"
                    onClick={()=>{setOpen(!open)}}
                    className="w-full cursor-pointer h-[54px] rounded-md border border-gray-300 py-2 px-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {props.selectValue?props.selectValue:'Select Option ...'}
            </button>
            <ChevronDown className='absolute w-6 h-6 right-2 top-4 '/>
            <ul ref={ref} className="absolute hidden z-4 overflow-y-scroll max-h-[200px]  top-[65px] left-0 w-full rounded-md bg-white shadow-md overflow-hidden z-10" onClick={()=>{setOpen(!open)}} style={open?{display:'block'}:{}}>
                {props.data.map((e:any,index:number)=>{
                    return (
                        <li className="block px-4 py-2 hover:bg-gray-100" key={index} onClick={()=>{props.setSelectValue(e.item)}}>
                            <p className="text-sm truncate" >{e.item}</p>
                        </li>
                    )
                })}
            </ul>
        </div>


    )
}

export default Select