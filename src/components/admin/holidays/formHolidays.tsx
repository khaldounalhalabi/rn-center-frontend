"use client";
import Form from "@/components/common/ui/Form";
import SelectPaginated from "@/components/common/ui/Selects/SelectPaginated";
import { ClinicService } from "@/services/ClinicService";
import React from "react";
import { AddHolidays } from "@/services/Holidays";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Input from "@/components/common/ui/Inputs/Input";
import TranslatableTextArea from "@/components/common/ui/TranslatableTextArea";
import { AddHolidayes } from "@/services/AddHolidayes";
import { useQuery } from "@tanstack/react-query";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import LoadingSpin from "@/components/icons/LoadingSpin";



type resType = {
  end_date : string,
  start_date :string,
  clinic_id:string,
  reason:any,
  clinic:any
}

const FormHolidays = ({
  defaultValues = undefined,
  id = undefined,
  type = "edite",
}: {
  defaultValues?: AddHolidays | undefined | null;
  id?: number;
  type?: string;
}) => {

     const { isPending, error, data} = useQuery({
      queryKey: ["repoData"],
      queryFn: async () => {
        if (type == "update") {
        return await ClinicHolidayService.make().show(id?id:1);
        }
      },
    });
    const res:resType= data?.data

  const handleSubmit = async (data: any) => {
    let sendData = {
      clinic_id: data.clinic_id,
      end_date: data.end_date,
      start_date: data.start_date,
      reason: JSON.stringify(data.reason),
    };
    if(type == 'update'){
      return ClinicHolidayService.make().update(id?id:1,sendData)
    }else {
      return await AddHolidayes.make().store(sendData);
    }
  };
  const start = '2022-02-22'
  const reason = {
    'en':'gfdgfdg',
    'ar':'مرحبا'
  }

  const onSuccess = () => {};
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <div className=" w-1/2 my-3">
        {type=='update'?res?.clinic.name?
            <SelectPaginated
                api={async (page, search) =>
                    await ClinicService.make().indexWithPagination(
                        page,
                        search,
                        undefined,
                        undefined,
                        50,
                    )
                }
                label={"name"}
                defaultValue={res?.clinic.name}
                value={"id"}
                name={"clinic_id"}
                inputLabel={"Clinic name :"}
                selected={defaultValues?.clinic_id ? [defaultValues?.clinic_id] : []}
            />:<LoadingSpin className='w-8 h-8 animate-spin stroke-blue-500'/>: <SelectPaginated
            api={async (page, search) =>
                await ClinicService.make().indexWithPagination(
                    page,
                    search,
                    undefined,
                    undefined,
                    50,
                )
            }
            label={"name"}
            value={"id"}
            name={"clinic_id"}
            inputLabel={"Clinic name :"}
            selected={defaultValues?.clinic_id ? [defaultValues?.clinic_id] : []}
        />}
      </div>
      <div className="w-full flex justify-between	my-3">
        <Input
          name={"start_date"}
          type={"date"}
          placeholder={"Enter Doctor Birth Date"}
          label={"Start Holiday"}
          defaultValue={
            res?.start_date?start:''
          }
        />
        <div className="w-1/12"></div>
        <Input

          name={"end_date"}
          type={"date"}
          placeholder={"Enter Doctor Birth Date"}
          label={"End Holiday"}
          defaultValue={res?.end_date?start:''}
        />
      </div>
      <div className="my-3">
        <TranslatableTextArea
            defaultV={res?.reason?reason:''}
          label={"Reason"}
          name={"reason"}
          locales={["en", "ar"]}
        />
      </div>
      <div className='flex justify-center'>
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default FormHolidays;
