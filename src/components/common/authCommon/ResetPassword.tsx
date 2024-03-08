"use client";
import React from "react";
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
  email: string;
};

const ResetPassword = ({
  url,
  typeHeaders,
  typePage,
}: {
  url: string;
  typeHeaders: string;
  typePage: string;
}) => {
  const form = useForm<FormType>({
    defaultValues: {
      email: "",
    },
  });
  const { formState, register, handleSubmit } = form;
  const { errors } = formState;

  const mutation = useMutation((dataForm: FormType) => {
    const head = HeadersApi(typeHeaders);
    return QueryFetch("POST", url, head, dataForm);
  });

  const { isLoading, data } = mutation;
  const response: logInType = data;

  const history = useRouter();

  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    mutation.mutate(dataForm, {
      onSuccess: (data) => {
        if (data?.code == 200) {
          history.push(`/auth/${typePage}/resetPasswordCode`);
        }
      },
    });
  };

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
      <div className="w-full md:w-6/12 max-w-[455px] p-8 absolute -translate-x-1/2 top-[20%] left-1/2">
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Reset Password</h1>
          <h4 className="mt-4 text-gray-500">Enter your Email Address</h4>
        </div>
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col "
          noValidate
        >
          <InputControl
            container="w-full h-20 my-4 "
            id="email"
            type="text"
            register={register}
            options={{
              value: true,
              required: "Email is Required",
            }}
            className={
              errors.email?.message
                ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-sm !border-red-600 focus:!outline-red-600"
                : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-blue-500"
            }
            placeholder="Enter Email"
          >
            <p
              className={`w-full pl-3  text-sm   mt-3 ${response?.code == 200 ? "text-green-500" : "text-red-800"}`}
            >
              {errors.email?.message}
              {response?.message}
            </p>
          </InputControl>
          <button
            type="submit"
            className="inline-block mt-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Submit
          </button>
        </FormContainer>
      </div>
    </div>
  );
};

export default ResetPassword;
