"use client";
import React, { useState } from "react";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import Input from "@/components/common/ui/Inputs/Input";
import { POST } from "@/Http/Http";
import { useRouter } from "next/navigation";
import Grid from "@/components/common/ui/Grid";
import Trash from "@/components/icons/Trash";
import PrimaryButton from "@/components/common/ui/PrimaryButton";

const page = () => {
  const url: string = `${process.env.localApi}customer/register`;
  const {
    register,
    formState: { errors },
  } = useForm<any>();
  const history = useRouter();

  const [phonesNum, setPhonesNum] = useState(1);

  const [response, setResponse] = useState<any>(undefined);

  const methods = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const res = await POST(url, data).then((e) => {
      e.code == 200 ? history.push(`/customer`) : false;
      return e;
    });
    window.localStorage.setItem("customer", data.email);
    if (res) setResponse(res);
  };
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
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <label className="col-span-6 label">Full Name : </label>
              <Input
                name="first_name"
                type="text"
                placeholder="Enter Your First Name"
              />
              <Input
                name="middle_name"
                type="text"
                placeholder="Enter Your Middle Name"
              />

              <Input
                name="last_name"
                type="text"
                placeholder="Enter Your Last Name"
              />
              <label className="col-span-6 label">Email :</label>
              <Input name="email" type="email" placeholder="Enter Your Email" />
              <label className="col-span-6 label label-text">Password :</label>
              <Input name="password" type="text" placeholder="Enter Password" />
              <Input
                name="password_confirmation"
                type="text"
                placeholder="Confirm Password"
              />
              <label className="col-span-6 label">Phone Number :</label>
              <Grid md={2} gap={2}>
                {[...Array(phonesNum)].map((field, index) => {
                  return (
                    <div
                      className={`flex justify-between items-center w-full gap-2`}
                      key={index}
                    >
                      <Input
                        key={`a-${index}`}
                        name={`phone_numbers[${index}]`}
                        type={"tel"}
                        placeholder={`Enter Your Phone Number (${index + 1})`}
                      />
                      <button
                        type={"button"}
                        className={"btn btn-square btn-sm"}
                        onClick={() =>
                          setPhonesNum((prevState) =>
                            prevState == 1 ? prevState : prevState - 1,
                          )
                        }
                      >
                        <Trash className={"h-6 w-6 text-error"} />
                      </button>
                    </div>
                  );
                })}
              </Grid>
              <div className={`flex items-center m-3`}>
                <button
                  className={`btn btn-sm btn-neutral`}
                  onClick={() => setPhonesNum((prevState) => prevState + 1)}
                >
                  Add New Phone
                </button>
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
                <div className={`flex justify-center items-center`}>
                  <PrimaryButton type={"submit"}>Register</PrimaryButton>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default page;
