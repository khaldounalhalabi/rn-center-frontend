"use client";
import React from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import FormContainer from "@/components/common/ui/FormContenar";
import InputControl from "@/components/common/ui/InputControl";
import { useMutation } from "react-query";
import { POST } from "@/Http/QueryFetch";
import LoadingSpin from "@/components/icons/loadingSpin";
import { useRouter } from "next/navigation";
import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";
import handleErrorType from "@/hooks/handleErrorType";

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
      phone_number: [" "],
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
      className="w-[100wh] h-[100vh] relative"
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="w-full md:w-10/12 max-w-[80%] p-8 absolute bg-white rounded-2xl shadow-black shadow-2xl -translate-x-1/2 top:[5%] md:top-[10%] left-1/2">
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Register</h1>
          <h4 className="mt-4 text-gray-500">Welcome !</h4>
        </div>
        <div className="w-full h-6 text-red-400 my-2">
          {handleErrorType(status, data)}
        </div>
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col "
          noValidate
        >
          <div className="w-full flex flex-col ">
            <div className="w-full flex flex-row md:justify-between px-2 border-2 border-blue-400 rounded-2xl">
              <div className="w-full flex flex-col md:w-[49%] ">
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
              </div>
              <div className="w-full flex flex-col md:w-[49%] ">
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
            </div>

            <div className="flex flex-col my-2 w-full px-2 border-2 border-blue-400 rounded-2xl ">
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
            </div>
            <div className="flex flex-row w-full md:justify-between ">
              <div className="flex flex-col w-full md:w-[49%]  px-2 border-2 border-blue-400 rounded-2xl">
                {fields.map((field, index) => {
                  return (
                    <div className="w-full  my-2 text-end " key={field.id}>
                      <input
                        id="phone_number"
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
                <div className="w-full  flex justify-end items-center ">
                  <p className="text-green-700 text-sm mr-4">
                    Add Phone Number ...
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      append("");
                    }}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-3 py-1 me-2 mb-2 "
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-[49%]  px-2 border-2 border-blue-400 rounded-2xl">
                <div className="w-full  my-2 ">
                  <select
                    id="gender"
                    {...register("gender")}
                    className={
                      errors.gender?.message
                        ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xl !border-red-600 focus:!outline-red-600"
                        : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xl focus:outline-blue-500"
                    }
                  >
                    <option value="">Please select your Gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>
                <div className="w-full  my-2 ">
                  <select
                    id="city"
                    {...register("city")}
                    className={
                      errors.city?.message
                        ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xl !border-red-600 focus:!outline-red-600"
                        : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xl focus:outline-blue-500"
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
          </div>
          <button
            type="submit"
            className="inline-block mt-5 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Register
          </button>
        </FormContainer>
      </div>
    </div>
  );
};

export default page;
