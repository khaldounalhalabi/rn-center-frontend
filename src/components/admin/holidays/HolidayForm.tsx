"use client";
import Form from "@/components/common/ui/Form";
import SelectPaginated from "@/components/common/ui/Selects/SelectPaginated";
import { ClinicService } from "@/services/ClinicService";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Input from "@/components/common/ui/Inputs/Input";
import TranslatableTextArea from "@/components/common/ui/TranslatableTextArea";
import { AddHolidayes } from "@/services/AddHolidayes";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import { navigate } from "@/Actions/navigate";
import { ApiResponse } from "@/Http/Response";

const HolidayForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: ClinicHoliday;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    if (type === "update" && defaultValues?.id) {
      return ClinicHolidayService.make().update(defaultValues.id, data);
    } else {
      return await AddHolidayes.make().store(data);
    }
  };

  const onSuccess = () => {
    navigate(`/admin/clinics/holidays`);
  };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <div className=" w-1/2 my-3">
        {type == "update" ? (
          defaultValues?.clinic.name ? (
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
              defaultValue={defaultValues?.clinic.name}
              value={"id"}
              name={"clinic_id"}
              inputLabel={"Clinic name :"}
              selected={
                defaultValues?.clinic_id ? [defaultValues?.clinic_id] : []
              }
            />
          ) : (
            <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500" />
          )
        ) : (
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
            value={"id"}
            name={"clinic_id"}
            inputLabel={"Clinic name :"}
            selected={
              defaultValues?.clinic_id ? [defaultValues?.clinic_id] : []
            }
          />
        )}
      </div>
      <div className="w-full flex justify-between	my-3">
        <Input
          name={"start_date"}
          type={"date"}
          placeholder={"Enter Doctor Birth Date"}
          label={"Start Holiday"}
        />
        <div className="w-1/12"></div>
        <Input
          name={"end_date"}
          type={"date"}
          placeholder={"Enter Doctor Birth Date"}
          label={"End Holiday"}
        />
      </div>
      <div className="my-3">
        <TranslatableTextArea
          defaultValue={res?.reason ? reason : ""}
          label={"Reason"}
          name={"reason"}
          locales={["en", "ar"]}
        />
      </div>
      <div className="flex justify-center">
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default HolidayForm;
