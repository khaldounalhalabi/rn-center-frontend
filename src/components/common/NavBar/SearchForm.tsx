import React from "react";
import Close from "@/components/icons/Close";


const SearchForm:React.JSXElementConstructor<any> = ({show}:{show:any})=>{
    return (
        <div className='w-[calc(100%-40px] h-full flex bg-white justify-between mx-[20px] items-center'>
             <div className='flex items-center w-[calc(100%-70px)]'>
                 <Close className={`h-[25px] w-[25px] cursor-pointer hover:animate-spin`} onClick={()=>{show(false)}} />
                 <input className='ml-3 w-[calc(100%-25px)] pl-4 focus:border-0' type='text' id='search' placeholder='Search...'/>
             </div>
            <button type="button"
                    className="w-[70px] h-[36] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm  py-2.5   focus:outline-none ">
                    Search
            </button>

        </div>
    )
}

export default SearchForm