"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "@/components/common/ui/FormContenar";
import InputControl from "@/components/common/ui/InputControl";
import { useRouter } from "next/navigation";
import handleErrorType from "@/hooks/handleErrorType";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useMutation } from "@tanstack/react-query";
import { POST } from "@/Http/QueryFetch";
import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";

type FormType = {
  password: string;
  password_confirmation: string;
};

const SetNewPassword = ({
  url,
  pageType,
}: {
  url: string;
  pageType: string;
}) => {
  const form = useForm<FormType>({
    defaultValues: {
      password_confirmation: "",
      password: "",
    },
  });
  const { formState, register, handleSubmit } = form;
  const { errors } = formState;

  const { mutate, isPending, data, error } = useMutation({
    mutationKey: [pageType],
    mutationFn: async (dataForm: FormType) => {
      return await POST(url, dataForm).then((e) => {
        e.code == 200 ? history.push(`/auth/${pageType}/login`) : false;
        return e;
      });
    },
  });

  const history = useRouter();

  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    const code = window.localStorage.getItem(pageType + "code");
    const dataSend = {
      reset_password_code: code,
      password: dataForm.password,
      password_confirmation: dataForm.password_confirmation,
    };

    mutate(dataSend);
  };

  const status = data?.status;

  if (isPending) {
    return (
      <div className="w-[100wh] h-[100vh] flex justify-center items-center">
        <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500" />
      </div>
    );
  }
  return (
    <div
      className="w-[100wh] h-[100vh] relative "
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="w-full md:w-6/12 max-w-[455px] p-8 absolute bg-white rounded-2xl -translate-x-1/2 top-[20%] left-1/2">
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Reset Password</h1>
        </div>
        <p className="text-red-400 text-sm p-3">
          {handleErrorType(pageType, data)}
        </p>

        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col "
          noValidate
        >
          <InputControl
            container="w-full h-20 my-4 relative "
            id="password"
            type={"text"}
            register={register}
            options={{
              value: true,
              required: "Password is Required",
            }}
            label="Password :"
            error={errors.password?.message}
            placeholder="Enter New Password"
          />
          <InputControl
            container="w-full h-20 my-4 "
            id="password_confirmation"
            type="text"
            register={register}
            options={{
              value: true,
              required: "Reset Password is Required",
            }}
            label="Confirmation Password :"
            error={errors.password_confirmation?.message}
            placeholder="Reset New Password"
          />

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Save
          </button>
        </FormContainer>
      </div>
    </div>
  );
};

export default SetNewPassword;
