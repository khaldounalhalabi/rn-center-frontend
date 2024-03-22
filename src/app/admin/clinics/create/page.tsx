"use client";

import React, {useEffect, useState} from "react";
import FormContainer from "@/components/common/ui/FormContenar";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {useMutation, useQuery} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import LoadingSpin from "@/components/icons/LoadingSpin";
import FirstForm from "@/components/admin/clinic/FirstForm";
import SecondForm from "@/components/admin/clinic/SecondForm";
import ThirdForm from "@/components/admin/clinic/ThirdForm";
import Carousel from "nuka-carousel"
import {HospitalService} from "@/services/HospitalService";
import { ClinicService } from "@/services/ClinicService";
import axios from "axios";


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
    lng: string;
  };

  speciality_ids: string[];
};

const creatClinic = () => {
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
        lng:''
      },
      phone_number: ["+964"],
      speciality_ids: [""],
    },
  });
  const { formState, control, register, handleSubmit } = form;
  const { errors } = formState;
  const { mutate, isPending, data, error } = useMutation({
    mutationKey: ["create-clinic"],
    mutationFn: async (dataForm: FormType) => {
      console.log(dataForm)
      return await ClinicService.make().store(dataForm);
    },
  });
  const history = useRouter();
  const [selectValueGender,setValueGender] = useState('')
  const [selectValueCity,setValueCity]=useState('')

  const { fields, append, remove } = useFieldArray(
      // @ts-ignore
      { name:'phone_number',control});
  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    const phone = dataForm.phone_number
    const updatedNumbers = phone.map(number => '+964 ' + number);
    const dataSend = {
      name: dataForm.name,
      appointment_cost: dataForm.appointment_cost,
      max_appointments: dataForm.max_appointments,
      hospital_id: "1",
      status: "active",
      user: {
        first_name: dataForm.user.first_name,
        middle_name: dataForm.user.middle_name,
        last_name: dataForm.user.last_name,
        email: dataForm.user.email,
        password: dataForm.user.password,
        password_confirmation:dataForm.user.password_confirmation,
        birth_date: dataForm.user.birth_date,
        gender: selectValueGender,
        image: dataForm.user.image,
      },
      address: {
        name: dataForm.address.name,
        city: selectValueCity,
        lat:'12',
        lng:'233'
      },
      phone_number: updatedNumbers,
      speciality_ids: ['fgfdgfd','dgfdg'],
    }
    mutate(dataSend);
  };

  const host = useQuery({
    queryKey:['host'],
    queryFn:async ()=>{
      return HospitalService.make().indexWithPagination(1)
    }
  })
  console.log(data);


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
              className="card relative shadow-xl bg-white w-10/12 pl-5 h-max"
          >

              <FirstForm register={register}  errors={errors} selectValueCity={selectValueCity} setValueCity={setValueCity}/>
              <SecondForm register={register}  errors={errors}/>
              <ThirdForm register={register}  errors={errors} fields={fields} remove={remove} append={append} selectValueGender={selectValueGender} setValueGender={setValueGender}/>




          </FormContainer>
        </div>
      </div>
  );
};

export default creatClinic;























