import InputControl from "@/components/common/ui/InputControl";
import React from "react";
import SelectControl from "@/components/common/ui/selectControl";


const FirstForm = ({ register, errors }) => {
  const city = [
    {
      item: "بغداد",
    },
    {
      item: "نينوى",
    },
    {
      item: "البصرة",
    },
    {
      item: "صلاح الدين",
    },
    {
      item: "دهوك",
    },
    {
      item: "اربيل",
    },
    {
      item: "السليمانية",
    },
    {
      item: "واسط",
    },
    {
      item: "ميسان",
    },
    {
      item: "ذي قار",
    },
    {
      item: "المثنى",
    },
    {
      item: "بابل",
    },
    {
      item: "كربلاء",
    },
    {
      item: "النجف",
    },
    {
      item: "الانبار",
    },
    {
      item: "القادسية",
    },
    {
      item: "كركوك",
    },
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="user.first_name"
          type="text"
          register={register}
          options={{
            value: true,
            required: "first name is Required",
          }}
          label="first name :"
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
          label="middle name :"
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
          label="last name :"
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
          label="clinic name :"
          error={errors.name?.message}
          placeholder="Enter clinic name"
        />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <InputControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="address.name"
          type="text"
          register={register}
          options={{
            value: true,
            required: "address is Required",
          }}
          label="address :"
          error={errors.address?.name?.message}
          placeholder="Enter address"
        />
        <SelectControl
          container="md:w-[49%] w-full h-20 my-6 "
          id="address.city"
          register={register}
          options={{
            value: true,
            required: "city is Required",
          }}
          label="city :"
          error={errors.address?.city?.message}
          data={city}
        />
      </div>
    </>
  );
};

export default FirstForm