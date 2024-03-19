"use client";

import React,{useEffect} from "react";
import FormContainer from "@/components/common/ui/FormContenar";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { POST } from "@/Http/QueryFetch";
import { useRouter } from "next/navigation";
import LoadingSpin from "@/components/icons/LoadingSpin";
import InputControl from "@/components/common/ui/InputControl";
import SelectControl from "@/components/common/ui/selectControl";
import FirstForm from "@/components/admin/clinic/FirstForm";
import SecondForm from "@/components/admin/clinic/SecondForm";
import ThirdForm from "@/components/admin/clinic/ThirdForm";
import Carousel from "nuka-carousel"
import {HospitalService} from "@/services/HospitalService";

type FormType = {
    phone_number: string[];
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
    lat: string;
    ing: string;
  };

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
          lat:'',
          ing:''
      },
        phone_number: [" "],
      speciality_ids: [""],
    },
  });
  const { formState, control, register, handleSubmit } = form;
  const { errors } = formState;
  const { mutate, isPending, data, error } = useMutation({
    mutationKey: ["create-clinic"],
    mutationFn: async (dataForm: FormType) => {
      return await POST(url, dataForm);
    },
  });
  const history = useRouter();

    const { fields, append, remove } = useFieldArray(
        // @ts-ignore
        { name:'phone_number',control});
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
    <div className="w-full h-auto ">
      <h2 className="text-black text-2xl mx-8 my-6">Add Doctor</h2>
      <div className=" w-full flex justify-center mb-8">
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="card relative shadow-xl bg-white w-10/12 px-5 h-max"
        >
            <Carousel >
                <FirstForm register={register}  errors={errors}/>
                <SecondForm register={register}  errors={errors}/>
                <ThirdForm register={register}  errors={errors} fields={fields} remove={remove} append={append} />
            </Carousel>


        </FormContainer>
      </div>
    </div>
  );
};

export default creatClinic;























