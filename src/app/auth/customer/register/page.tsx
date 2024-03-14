"use client";
import React from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import FormContainer from "@/components/common/ui/FormContenar";
import InputControl from "@/components/common/ui/InputControl";
import { useMutation } from "@tanstack/react-query";
import { POST } from "@/Http/QueryFetch";
import LoadingSpin from "@/components/icons/loadingSpin";
import { useRouter } from "next/navigation";
import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";

type FormType = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  gender: string;
  city?: string;
  mother_full_name: string;
  img: any;
  phone_number: string[];
};

const page = () => {
  const url: string = `${process.env.localApi}customer/register`;
  const form = useForm<FormType>({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      gender: "",
      city: "",
      mother_full_name: "",
      img: "",
      phone_number: [""],
    },
  });
  const { formState, control, register, handleSubmit } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phone_number",
    control,
  });

  const mutation = useMutation(
    async (dataForm: FormType): Promise<ApiResult<User>> =>
      await POST(url, dataForm),
  );
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

  const status = data?.status;

  if (isLoading) {
    return (
      <div className="w-[100wh] h-[100vh] flex justify-center items-center">
        <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500" />
      </div>
    );
  }

  return (
    <div
      className="flex justify-center w-full h-full items-center p-32"
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-center">
            <h1 className="text-xl font-bold">Registration Form</h1>
          </div>
          <h2 className="card-title mb-4">
            Fill The Following Information To Create A New Account
          </h2>

          <FormContainer
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid grid-cols-6 gap-3"
          >
            <label className="col-span-6 label">Full Name : </label>
            <InputControl
              container="col-span-2"
              id="first_name"
              type="text"
              register={register}
              options={{
                value: true,
                required: "First Name is Required",
              }}
              error={errors.first_name?.message}
              placeholder="Enter Your First Name"
            />
            <InputControl
              container="col-span-2"
              id="middle_name"
              type="text"
              register={register}
              options={{
                value: true,
                required: "Middle Name is Required",
              }}
              error={errors.middle_name?.message}
              placeholder="Enter Your Middle Name"
            />

            <InputControl
              container="col-span-2"
              id="last_name"
              type="text"
              register={register}
              options={{
                value: true,
                required: "Last Name is Required",
              }}
              error={errors.last_name?.message}
              placeholder="Enter Your Last Name"
            />
            <label className="col-span-6 label">Email :</label>
            <InputControl
              container="col-span-6"
              id="email"
              type="email"
              register={register}
              options={{
                value: true,
                required: "Email is Required",
              }}
              error={errors.email?.message}
              placeholder="Enter Your Email"
            />
            <label className="col-span-6 label label-text">Password :</label>
            <InputControl
              container="col-span-3"
              name="password"
              id="password"
              type="text"
              register={register}
              options={{
                value: true,
                required: "Password is Required",
              }}
              error={errors.password?.message}
              placeholder="Enter Password"
            />
            <InputControl
              container="col-span-3"
              id="password_confirmation"
              type="text"
              register={register}
              options={{
                value: true,
                required: "Password Confirmation is Required",
              }}
              error={errors.password_confirmation?.message}
              placeholder="Confirm Password"
            />
            <label className="col-span-6 label">Phone Number :</label>
            <div className="col-span-3">
              <input
                id="phone_number"
                type="text"
                {...register(`phone_number.0` as const)}
                className={
                  errors.phone_number?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm !border-red-600 focus:!outline-red-600"
                    : "w-full rounded-lg border-gray-200 shadow-md p-4 pe-12 text-sm  focus:outline-blue-500"
                }
                placeholder="Enter Your Phone Number"
              />
            </div>

            <div className="col-span-3">
              <select
                id="gender"
                {...register("gender")}
                className={
                  errors.gender?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm !border-red-600 focus:!outline-red-600"
                    : "w-full rounded-lg border-gray-200 shadow-md p-4 pe-12 text-sm  focus:outline-blue-500"
                }
              >
                <option value="">Please select your Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>

            <label className="col-span-6 label">City :</label>
            <div className="col-span-3">
              <select
                id="city"
                {...register("city")}
                className={
                  errors.city?.message
                    ? "w-full rounded-lg border-2 p-4 pe-12 text-sm !border-red-600 focus:!outline-red-600"
                    : "w-full rounded-lg border-gray-200 shadow-md p-4 pe-12 text-sm  focus:outline-blue-500"
                }
              >
                <option value="">Please select your city</option>
                <option value="بغداد">بغداد</option>
                <option value="نينوى">نينوى</option>
                <option value="البصرة">البصرة</option>
                <option value="صلاح الدين">صلاح الدين</option>
                <option value="دهوك">دهوك</option>
                <option value="اربيل">اربيل</option>
                <option value="السليمانية">السليمانية</option>
                <option value="ديالى">ديالى</option>
                <option value="واسط">واسط</option>
                <option value="ميسان">ميسان</option>
                <option value="ذي قار">ذي قار</option>
                <option value="المثنى">المثنى</option>
                <option value="بابل">بابل</option>
                <option value="كربلاء">كربلاء</option>
                <option value="النجف">النجف</option>
                <option value="الانبار">الانبار</option>
                <option value="القادسية">القادسية</option>
                <option value="كركوك">كركوك</option>
              </select>
            </div>
            <div className="col-span-6 flex justify-center">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Register
              </button>
            </div>
          </FormContainer>
        </div>
      </div>
    </div>
  );
};

export default page;
