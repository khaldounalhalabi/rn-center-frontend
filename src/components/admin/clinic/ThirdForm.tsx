import InputControl from "@/components/common/ui/InputControl";
import React from "react";
import SelectControl from "@/components/common/ui/selectControl";

const ThirdForm = ({ register, errors, fields, remove, append }) => {
  const gender = [
    {
      item: "Man",
    },
    {
      item: "Woman",
    },
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
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
          container="md:w-[49%] w-full h-20 my-6 "
          id="user.gender"
          register={register}
          options={{
            value: true,
            required: "birth date is Required",
          }}
          label="select gender :"
          error={errors.user?.gender?.message}
          data={gender}
        />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        {fields.map((field, index) => {
          return (
            <div className="w-full  my-2 text-end " key={field.id}>
              <input
                id="phone_number.0"
                type="text"
                {...register(`phone_number.${index}` as const)}
                className={
                  errors.phone_number?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xl !border-red-600 focus:!outline-red-600"
                    : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xl focus:outline-blue-500"
                }
                placeholder="Enter Phone Number"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                  className="focus:outline-none mt-1 text-white bg-red-500 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-3 py-1 me-2 mb-2 "
                >
                  -
                </button>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => append(" ")}
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Add Phone
        </button>
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
        <button
            type="submit"
            className="inline-block w-full mb-10 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
            Add Clinic
        </button>
    </>
  );
};

export default ThirdForm;