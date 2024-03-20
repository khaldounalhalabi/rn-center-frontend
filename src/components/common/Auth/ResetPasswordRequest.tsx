"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "@/components/common/ui/FormContenar";
import InputControl from "@/components/common/ui/InputControl";
import { useMutation } from "@tanstack/react-query";
import handleErrorType from "@/hooks/handleErrorType";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { AuthService } from "@/services/AuthService";

type FormType = {
  email: string;
};

const ResetPasswordRequest = ({
  url,
  typePage,
}: {
  url: string;
  typePage: string;
}) => {
  const form = useForm<FormType>({
    defaultValues: {
      email: "",
    },
  });
  const { formState, register, handleSubmit } = form;
  const { errors } = formState;

  const { mutate, isPending, data } = useMutation({
    mutationKey: [typePage],
    mutationFn: async (dataForm: FormType) => {
      return await AuthService.make().requestResetPasswordRequest(
        url,
        dataForm,
        typePage,
      );
    },
  });
  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    mutate(dataForm, {
      onSuccess: () => {
        window.localStorage.setItem(typePage, dataForm.email);
      },
    });
  };
  console.log(data);
  if (isPending) {
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
      <div className="w-full md:w-6/12 max-w-[455px] p-8 absolute -translate-x-1/2 top-[20%] left-1/2 bg-white rounded-2xl">
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Reset Password</h1>
          <h4 className="mt-4 text-gray-500">Enter your Email Address</h4>
        </div>
        <p className="text-red-400 text-sm p-3">
          {handleErrorType(typePage, data)}
        </p>
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
            label="Email :"
            error={errors.email?.message}
            placeholder="Enter Email"
          ></InputControl>
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

export default ResetPasswordRequest;
