"use client";

import React from "react";
import FormContainer from "@/components/common/ui/FormContenar";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";
import { POST } from "@/Http/QueryFetch";
import { useRouter } from "next/navigation";
import LoadingSpin from "@/components/icons/LoadingSpin";
import InputControl from "@/components/common/ui/InputControl";
import { getCookieClient } from "@/Actions/clientCookies";
import { ClinicService } from "@/services/ClinicService";

type FormType = {
  name: string;
  appointment_cost: string;
  max_appointments: string;
  hospital_id: string;
  status: string;
  user: {
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    birth_date: string;
    gender: string;
    image: any;
  };
  address: {
    name: string;
    city: string;
  };
  phone_number: string[];
  speciality_ids: string[];
};

const creatClinic = () => {
  const url: string = `${process.env.localApi}customer/register`;
  const form = useForm<FormType>({
    defaultValues: {
      name: "",
      appointment_cost: "",
      max_appointments: "",
      hospital_id: "",
      status: "",
      user: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        birth_date: "",
        gender: "",
        image: "",
      },
      address: {
        name: "",
        city: "",
      },
      phone_number: [""],
      speciality_ids: [""],
    },
  });
  const { formState, control, register, handleSubmit } = form;
  const { errors } = formState;
  const { mutate, isPending, data, error } = useMutation({
    mutationKey: ["create-clinic"],
    mutationFn: async (dataForm: FormType) => {
      return await ClinicService.make().store(dataForm);
    },
  });
  const history = useRouter();

  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    console.log(dataForm);
    // mutate(dataForm);
  };

  if (isPending) {
    return (
      <div className="w-[100wh] h-[100vh] flex justify-center items-center">
        <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500" />
      </div>
    );
  }
  return (
    <div className="w-full h-full ">
      <h2 className="text-black text-2xl mx-8 my-6">Add Doctor</h2>
      <div className=" w-full h-full flex justify-center mb-8">
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="card shadow-xl bg-white w-10/12 px-5 "
        >
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
              id="user.middle_name"
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
              id="user.email"
              type="text"
              register={register}
              options={{
                value: true,
                required: "Email is Required",
              }}
              label="Email :"
              error={errors.user?.email?.message}
              placeholder="Enter Email"
            />
          </div>
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
              id="user[image]"
              type="file"
              register={register}
              options={{
                value: true,
                required: "image is Required",
              }}
              label="image :"
              error={""}
              placeholder="image Email"
            />
            <InputControl
              container="md:w-[49%] w-full h-20 my-6 "
              id="status"
              type="text"
              register={register}
              options={{
                value: true,
                required: "status is Required",
              }}
              label="status :"
              error={errors.status?.message}
              placeholder="status Email"
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
            <InputControl
              container="md:w-[49%] w-full h-20 my-6 "
              id="user.gender"
              type="text"
              register={register}
              options={{
                value: true,
                required: "gender is Required",
              }}
              label="gender :"
              error={errors.user?.gender?.message}
              placeholder="Enter gender"
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
            <InputControl
              container="md:w-[49%] w-full h-20 my-6 "
              id="address.city"
              type="text"
              register={register}
              options={{
                value: true,
                required: "city is Required",
              }}
              label="city :"
              error={errors.address?.city?.message}
              placeholder="Enter city"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between"></div>
          <div className="flex flex-col md:flex-row w-full justify-between"></div>
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Add Clinic
          </button>
        </FormContainer>
      </div>
    </div>
  );
};

export default creatClinic;
