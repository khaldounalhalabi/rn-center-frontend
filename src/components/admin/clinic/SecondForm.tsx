import InputControl from "@/components/common/ui/InputControl";
import SelectControl from "@/components/common/ui/selectControl";
import React from "react";


const SecondForm = ({ register, errors }:{ register:any, errors:any }) => {

  return (
    <>
      <div className="flex pt-12 flex-col md:flex-row w-full justify-between">
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="user.first_name"
          type="text"
          register={register}
          options={{
            value: true,
            required: "first name is Required",
          }}
          label="first name EN:"
          error={errors.user?.first_name?.message}
          placeholder="Enter first name"
        />
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="user.middle_name"
          type="text"
          register={register}
          options={{
            value: true,
            required: "middle name is Required",
          }}
          label="middle name EN:"
          error={errors.user?.middle_name?.message}
          placeholder="Enter middle name"
        />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="user.last_name"
          type="text"
          register={register}
          options={{
            value: true,
            required: "last name is Required",
          }}
          label="last name EN:"
          error={errors.user?.middle_name?.message}
          placeholder="Enter last name"
        />
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="name"
          type="text"
          register={register}
          options={{
            value: true,
            required: "clinic name is Required",
          }}
          label="clinic name EN:"
          error={errors.name?.message}
          placeholder="Enter clinic name"
        />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
          <InputControl
              container=" w-full h-20 my-6 "
              id="user.email"
              type="text"
              register={register}
              options={{
                  value: true,
                  required: "Email is Required",
              }}
              label="Email :"
              error={errors.name?.message}
              placeholder="Enter Your Email"
          />
      </div>
    </>
  );
};

export default SecondForm