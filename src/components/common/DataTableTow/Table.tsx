import SearchIcon from "@/components/icons/SearchIcon";
import React, {useState, useTransition} from "react";
import DocumentPlus from "@/components/icons/DocumentPlus";
import Link from "next/link";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import {ApiResponsePagination} from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";


type Table={
    urlCreate:string,
    isLoading:any
    tHaed:any
    tBody:any
    arrayPaginate:any
    paginate:number,
    setPaginate:React.Dispatch<number>
    setSearch:React.Dispatch<string>
}

const Table =(table:Table)=>{

    const arrayPaginate:ApiResponsePagination =table.arrayPaginate
    const totalPage = Array.from({ length: arrayPaginate?.total_pages }, (_, i) => i + 1);

    const tBody = table.tBody




    return (
      <div className="p-5 flex flex-col">
        <div className="flex justify-between w-full">
          <div>
            <Link href={table.urlCreate ?? "#"}>
              <button className="btn btn-square btn-sm btn-info">
                <DocumentPlus className={`h-6 w-6`} />
              </button>
            </Link>
          </div>
          <div>
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input type="text" className="grow" onChange={(e)=>{table.setSearch(e.target.value)}} placeholder="Search" />
              <SearchIcon className={`w-4 h-4 opacity-70`} />
            </label>
          </div>
        </div>
        <div className="my-5 overflow-x-auto border-2 border-gray-300 rounded-2xl">
          {table.isLoading ? (
              <div className='flex justify-center'>
                  <LoadingSpin className="w-8 h-8 my-8 animate-spin stroke-blue-500" />
              </div>
          ) : (
            <table className="w-full overflow-x-scroll min-w-[500px] h-full border-b-2 border-gray-300">
              <thead>
                <tr className="">
                  {table.tHaed.map((e: {name:string,sort?:any}, index: number) => {
                    return (
                      <th className={`text-start h-10 pl-2 ${e?.sort?'flex px-2 justify-between items-center':''}`} key={index}>
                        <p>{e.name}</p>
                        {e?.sort ? <p>{e?.sort()}</p> : ""}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>{tBody()}</tbody>
            </table>
          )}
          <div className="w-full flex justify-end my-4 pr-4">
            <div className="flex">
              <button
                onClick={() => {
                  table.setPaginate(table.paginate - 1);
                }}
                disabled={arrayPaginate?.isFirst}
                className="inline-flex size-8 items-center  hover:bg-blue-300 justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 cursor-pointer"
              >
                <span className="sr-only">Prev Page</span>
                <ChevronLeft />
              </button>
              {totalPage.map((e:number, index:number) => (
                <button
                  key={index}
                  onClick={()=>{table.setPaginate(e)}}
                  className={`block size-8 rounded border cursor-pointer  hover:bg-blue-300 border-gray-100 text-center leading-8 text-gray-900 ${table.paginate == e ? 'bg-blue-300':false} `}
                >
                  {e}
                </button>
              ))}
              <button
                onClick={() => {
                  table.setPaginate(table.paginate + 1);
                }}
                disabled={arrayPaginate?.isLast}
                className="inline-flex size-8 items-center hover:bg-blue-300 justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 cursor-pointer"
              >
                <span className="sr-only">Next Page</span>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Table