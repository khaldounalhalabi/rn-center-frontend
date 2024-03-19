"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "@/components/common/ui/FormContenar";
import InputControl from "@/components/common/ui/InputControl";
import Eye from "@/components/icons/Eye";
import OpenAndClose from "@/hooks/OpenAndClose";
import ClosedEye from "@/components/icons/ClosedEye";
import { useMutation } from "@tanstack/react-query";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useRouter } from "next/navigation";
import handleErrorType from "@/hooks/handleErrorType";
import { AuthService } from "@/services/AuthService";

type FormType = {
  email: string;
  password: string;
};

const LogIn = ({ url, pageType }: { url: string; pageType: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const history = useRouter();

  const { formState, register, handleSubmit } = form;
  const { errors } = formState;
  const { mutate, isPending, data, error } = useMutation({
    mutationKey: [pageType],
    mutationFn: async (dataForm: FormType) => {
      return await (new AuthService()).login(url , dataForm , pageType);
    },
  });
  console.log(data)
  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    mutate(dataForm);
  };
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
    >
      <div
        className="w-full md:w-6/12 max-w-[455px] p-8 absolute -translate-x-1/2 top-[20%] left-1/2
                     bg-white rounded-2xl"
      >
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Sing In</h1>
          <h4 className="mt-4 text-gray-500">Welcome Back !</h4>
        </div>
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col "
          noValidate
        >
          <p className="text-red-400 text-sm p-3">
            {handleErrorType(pageType, data)}
          </p>
          <InputControl
            container="w-full h-20 my-6 "
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
          />
          <InputControl
            container="w-full h-20 my-6 relative "
            id="password"
            label="Password : "
            type={showPassword ? "text" : "password"}
            register={register}
            options={{
              value: true,
              required: "Password is Required",
            }}
            error={errors.password?.message}
            placeholder="Enter Password"
          >
            <div className="absolute top-[70%] z-20 right-0 w-10 h-full">
              <Eye
                onClick={() => OpenAndClose(showPassword, setShowPassword)}
                className={
                  showPassword
                    ? "w-6 h-6 opacity-60 cursor-pointer hover:opacity-80"
                    : "hidden"
                }
              />
              <ClosedEye
                onClick={() => OpenAndClose(showPassword, setShowPassword)}
                className={
                  showPassword
                    ? "hidden"
                    : "w-6 h-6 opacity-60 cursor-pointer hover:opacity-80"
                }
              />
            </div>
          </InputControl>

          <p className="w-full h-8 my-2 p-2 text-red-400"></p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Log In
          </button>
          <div className="flex justify-center mt-4 opacity-80">
            <h4> Forget Password ? </h4>
            <Link
              href={`/auth/${pageType}/resetPassword`}
              className="text-blue-600"
            >
              Reset Password
            </Link>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default LogIn;
