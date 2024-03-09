"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "@/components/common/ui/FormContenar";
import InputControl from "@/components/common/ui/InputControl";
import { useMutation } from "react-query";
import HeadersApi from "@/services/Contracts/Headers";
import QueryFetch from "@/Http/QueryFetch";
import { logInType } from "@/types/typeResponseLogin";
import LoadingSpin from "@/components/icons/loadingSpin";
import { useRouter } from "next/navigation";

type FormType = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
  gender: string;
  city?: string;
  mother_full_name: string;
  img: any;
};

const page = () => {
  const typeHeaders: string = "!sing";
  const url: string = `${process.env.localApi}customer/register`;
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormType>({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      gender: "",
      city: "",
      mother_full_name: "",
      img: "",
    },
  });
  const { formState, register, handleSubmit } = form;
  const { errors } = formState;

  const mutation = useMutation((dataForm: FormType) => {
    const head = HeadersApi(typeHeaders);
    return QueryFetch("POST", url, head, dataForm);
  });
  const history = useRouter();

  const { isLoading, data } = mutation;
  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    mutation.mutate(dataForm, {
      onSuccess: (data) => {
        if (data?.code == 200) {
          window.localStorage.setItem("customer", dataForm.email);
          history.push(`/auth/customer/verificationEmailCode`);
        }
      },
    });
  };
  const response: logInType = data;
  if (isLoading) {
    return (
      <div className="w-[100wh] h-[100vh] flex justify-center items-center">
        <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500" />
      </div>
    );
  }

  return (
    <div
      className="w-[100wh] h-[100vh] relative"
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="w-full md:w-10/12 max-w-[600px] p-8 absolute bg-white rounded-2xl shadow-black shadow-2xl -translate-x-1/2 top:[5%] md:top-[10%] left-1/2">
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Register</h1>
          <h4 className="mt-4 text-gray-500">Welcome !</h4>
        </div>
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col "
          noValidate
        >
          <div className="w-full flex flex-col md:flex-row  md:justify-between">
            <div className="w-full flex flex-col md:w-5/12">
              <InputControl
                container="w-full  my-2 "
                id="first_name"
                type="text"
                register={register}
                options={{
                  value: true,
                  required: "First Name is Required",
                }}
                className={
                  errors.first_name?.message
                    ? "w-full shadow-xl rounded-lg border-2 p-4 pe-12 text-sm !border-red-600 focus:!outline-red-600"
                    : "w-full shadow-xl rounded-lg border-gray-200 p-4 pe-12 text-sm  focus:outline-blue-500"
                }
                placeholder="Enter First Name"
              ></InputControl>
              <InputControl
                container="w-full  my-2 "
                id="middle_name"
                type="text"
                register={register}
                options={{
                  value: true,
                  required: "Middle Name is Required",
                }}
                className={
                  errors.middle_name?.message
                    ? "w-full shadow-xl rounded-lg border-2 p-4 pe-12 text-sm  !border-red-600 focus:!outline-red-600"
                    : "w-full shadow-xl rounded-lg border-gray-200 p-4 pe-12 text-sm  focus:outline-blue-500"
                }
                placeholder="Enter Middle Name"
              ></InputControl>
              <InputControl
                container="w-full  my-2 "
                id="last_name"
                type="text"
                register={register}
                options={{
                  value: true,
                  required: "Last Name is Required",
                }}
                className={
                  errors.last_name?.message
                    ? "w-full shadow-xl rounded-lg border-2 p-4 pe-12 text-sm  !border-red-600 focus:!outline-red-600"
                    : "w-full shadow-xl rounded-lg border-gray-200 p-4 pe-12 text-sm  focus:outline-blue-500"
                }
                placeholder="Enter Last Name"
              ></InputControl>
              <InputControl
                container="w-full  my-2 "
                id="email"
                type="email"
                register={register}
                options={{
                  value: true,
                  required: "Email is Required",
                }}
                className={
                  errors.email?.message
                    ? "w-full shadow-xl rounded-lg border-2 p-4 pe-12 text-sm  !border-red-600 focus:!outline-red-600"
                    : "w-full shadow-xl  rounded-lg border-gray-200 p-4 pe-12 text-sm  focus:outline-blue-500"
                }
                placeholder="Enter Email"
              ></InputControl>
              <InputControl
                container="w-full  my-2 "
                id="password"
                type="text"
                register={register}
                options={{
                  value: true,
                  required: "Password is Required",
                }}
                className={
                  errors.password?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xl !border-red-600 focus:!outline-red-600"
                    : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xl focus:outline-blue-500"
                }
                placeholder="Enter Password"
              ></InputControl>
              <InputControl
                container="w-full  my-2 "
                id="password_confirmation"
                type="text"
                register={register}
                options={{
                  value: true,
                  required: "Password Confirmation is Required",
                }}
                className={
                  errors.password_confirmation?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xl !border-red-600 focus:!outline-red-600"
                    : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xl focus:outline-blue-500"
                }
                placeholder="Enter password Agine"
              ></InputControl>
            </div>
            <div className="flex flex-col w-full md:w-5/12">
              <InputControl
                container="w-full  my-2 "
                id="phone_number"
                type="text"
                register={register}
                options={{
                  value: true,
                  required: "Phone Number is Required",
                }}
                className={
                  errors.phone_number?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xl !border-red-600 focus:!outline-red-600"
                    : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xl focus:outline-blue-500"
                }
                placeholder="Enter Phone Number"
              ></InputControl>
              <InputControl
                container="w-full  my-2 "
                id="gender"
                type="text"
                register={register}
                options={{
                  value: true,
                  required: "gender is Required",
                }}
                className={
                  errors.gender?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xl !border-red-600 focus:!outline-red-600"
                    : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xl focus:outline-blue-500"
                }
                placeholder="Enter your Gender"
              ></InputControl>
              <InputControl
                container="w-full  my-2 "
                id="city"
                type="text"
                register={register}
                options={{
                  value: true,
                  required: "city is Required",
                }}
                className={
                  errors.city?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xl !border-red-600 focus:!outline-red-600"
                    : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xl focus:outline-blue-500"
                }
                placeholder="Enter City"
              ></InputControl>
              <InputControl
                container="w-full  my-2 "
                id="mother_full_name"
                type="text"
                register={register}
                options={{
                  value: true,
                  required: "Mother Full Name is Required",
                }}
                className={
                  errors.mother_full_name?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xl !border-red-600 focus:!outline-red-600"
                    : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xl focus:outline-blue-500"
                }
                placeholder="Enter Mother Full Name"
              ></InputControl>
              <InputControl
                container="w-full  my-2 "
                id="img"
                type="file"
                register={register}
                className="block w-full mx-3 text-sm text-gray-500
                          file:me-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-600 file:text-white
                          hover:file:bg-blue-700
                          file:disabled:opacity-50 file:disabled:pointer-events-none"
                placeholder="uploud your photo"
              ></InputControl>
            </div>
          </div>
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Register
          </button>
        </FormContainer>
      </div>
    </div>
  );
};

export default page;
