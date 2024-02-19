import SearchIcon from "@/components/icons/SearchIcon";
import React from "react";


const SearchForm:React.JSXElementConstructor<any> = ()=>{
    return (
        <div className='w-[calc(100%-40px] h-full flex bg-white justify-between mx-[20px] items-center'>
             <div className='flex items-center'>
                 <SearchIcon className={`h-[20px] w-[20px] `} />
                 <input className='ml-3' type='text' id='search' placeholder='Search...'/>
             </div>
            <button type="button"
                    className="w-[70px] h-[36] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm  py-2.5   focus:outline-none ">
                    Search
            </button>

        </div>
    )
}

export default SearchForm