import React from "react";
import {useFormContext} from "react-hook-form";
import {getNestedPropertyValue} from "@/Helpers/ObjectHelpers";

const InputLoginCustomer = ({
  label,
  labelClass,
                                conClass,
  type,
  name,
}: {
  label: string;
  labelClass?: string;
  conClass?:string
  type: string;
  name: string;
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = getNestedPropertyValue(errors, `${name}.message`);


    return (
    <div className={`${conClass} relative z-0`}>
      <input
        type={type}
        {...register(`${name}`)}
        id={name}
        className="block kodchasan py-2.5 px-0 w-full   bg-transparent border-0 border-b-2 border-[#c1d5df] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1FB8B9]  peer"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={
          `kodchasan ${labelClass} absolute   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0` +
            " peer-focus:text-[#2e5b83]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0" +
            ` peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`
        }
      >
        {label}
      </label>
        {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default InputLoginCustomer;