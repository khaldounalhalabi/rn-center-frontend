import InputControl from "@/components/common/ui/InputControl";
import React, {useEffect, useState} from "react";
import SelectControl from "@/components/common/ui/selectControl";
import Delete from "@/components/icons/Delete";
import AsyncSelect from 'react-select/async';
import {useQuery} from "@tanstack/react-query";
import {SpecialityService} from "@/services/SpecialityService";

const ThirdForm = ({ register, errors, fields, remove, append ,selectValueGender,setValueGender}:{ register:any, errors:any, fields:any, remove:any, append:any ,selectValueGender:string,setValueGender:React.Dispatch<string>}) => {
  const gender = [
    {
      item: "Man",
    },
    {
      item: "Woman",
    },
  ];

    const options = [
        { value: 'Man', label: 'Man' },
        { value: 'Woman', label: 'Woman' },
    ]

    const {data}= useQuery({
        queryKey:['d'],
        queryFn:async ()=>{
            return await SpecialityService.make().indexWithPagination(1)
        }
    })
    // console.log(data)
    // const filterColors = (inputValue: string) => {
    //     return data.data.filter((i) =>
    //         i.label.toLowerCase().includes(inputValue.toLowerCase())
    //     );
    // };
    // const promiseOptions = (inputValue: string) =>
    //     new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(filterColors(inputValue));
    //         }, 1000);
    //     });

  return (
    <div className='px-2'>
      <div className="flex pt-12  flex-col md:flex-row w-full justify-between">
        <InputControl
          container="md:w-[49%]  w-full h-20 my-6 "
          id="user.password"
          type="text"
          register={register}
          options={{
            value: true,
            required: "password is Required",
          }}
          label="password :"
          error={errors.user?.password?.message}
          placeholder="Enter password"
        />
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="user.password_confirmation"
          type="text"
          register={register}
          options={{
            value: true,
            required: "password confirmation is Required",
          }}
          label="password confirmation :"
          error={errors.user?.password_confirmation?.message}
          placeholder="Enter password confirmation"
        />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="appointment_cost"
          type="text"
          register={register}
          options={{
            value: true,
            required: "appointment cost is Required",
          }}
          label="appointment cost :"
          error={errors.appointment_cost?.message}
          placeholder="Enter appointment cost"
        />
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="max_appointments"
          type="text"
          register={register}
          options={{
            value: true,
            required: "max appointments is Required",
          }}
          label="max appointments :"
          error={errors.max_appointments?.message}
          placeholder="Enter max appointments"
        />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="user.birth_date"
          type="date"
          register={register}
          options={{
            value: true,
            required: "birth date is Required",
          }}
          label="birth date :"
          error={errors.user?.birth_date?.message}
          placeholder="Enter birth date"
        />
              <SelectControl
                  label='select gender :'
                  className='md:w-[48%] w-full h-20 my-6 flex flex-col justify-center'
                  selectValue={selectValueGender}
                  setSelectValue={setValueGender}
                  error=''
                  data={gender}
              />
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between">
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="user[image]"
          type="file"
          register={register}
          label="image :"
          error={""}
          placeholder="image Email"
        />
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="hospital_id"
          type="text"
          register={register}
          options={{
            value: true,
            required: "hospital is Required",
          }}
          label="hospital name :"
          error={errors.hospital_id?.message}
          placeholder="Enter hospital_id"
        />
      </div>
           {/*<div className="flex flex-col md:flex-row w-full justify-between">*/}
           {/*        <div className='md:w-[49%] w-full h-20 my-6 '>*/}
           {/*            <label className='label'>Speciality : </label>*/}
           {/*            <AsyncSelect className='w-full h-[54px]' cacheOptions defaultOptions loadOptions={promiseOptions} />*/}

           {/*        </div>*/}
           {/* </div>*/}
        <div className="flex flex-col md:flex-col w-full justify-between">
            <div className='w-full grid grid-cols-1 md:grid-cols-2'>
                {fields.map((field:any, index:number) => {
                    return (
                        <div className="w-full  my-2 text-start" key={field.id}>
                            <label className='pl-3' htmlFor={`phone_number.${index}`}>Phone number : {index}</label>
                           <div className='flex flex-row'>
                               <input
                                   id="phone_number.0"
                                   type="text"
                                   {...register(`phone_number.${index}` as const)}
                                   className={
                                       errors.phone_number?.message
                                           ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-sm !border-red-600 focus:!outline-red-600"
                                           : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-blue-500"
                                   }
                                   placeholder="Enter Phone Number"
                               />
                               {index > 0 && (

                                   <button  type="button"
                                            onClick={() => {
                                                remove(index);
                                            }} className="text-red-700 mt-2 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 ">
                                       <Delete className='w-4 h-5'/>
                                   </button>

                               )}
                           </div>
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                onClick={() => append(" ")}
                className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 "
            >
                Add Phone
            </button>
        </div>



        <button
            type="submit"
            className="inline-block w-full mb-10 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
            Add Clinic
        </button>
    </div>
  );
};

export default ThirdForm;