"use client";
import Form from "@/components/common/ui/Form";
import { ClinicService } from "@/services/ClinicService";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Input from "@/components/common/ui/Inputs/Input";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import { navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { ApiResponse } from "@/Http/Response";
import { Clinic } from "@/Models/Clinic";
import TranslatableTextArea from "@/components/common/ui/textArea/TranslatableTextarea";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { translate } from "@/Helpers/Translations";

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
      return ClinicHolidayService.make<ClinicHolidayService>().update(
        defaultValues.id,
        data
      );
    } else {
      return await ClinicHolidayService.make<ClinicHolidayService>().store(
        data
      );
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
      {type == "store" ? (
        <div className="my-2 w-full md:w-1/2">
          <ApiSelect
            api={(page, search): Promise<ApiResponse<Clinic[]>> =>
              ClinicService.make<ClinicService>().indexWithPagination(
                page,
                search
              )
            }
            label="Clinic Name :"
            getOptionLabel={(item) => translate(item.name)}
            optionValue={"id"}
            name={"clinic_id"}
            defaultValues={defaultValues?.clinic ? [defaultValues?.clinic] : []}
          />
        </div>
      ) : (
        <Input
          name={"clinic_id"}
          type={"number"}
          hidden={true}
          className={"hidden"}
          value={defaultValues?.clinic_id}
        />
      )}
      <Grid md={2}>
        <Input name={"start_date"} type={"date"} label={"Start Holiday"} />
        <Input name={"end_date"} type={"date"} label={"End Holiday"} />
      </Grid>
      <div className="my-3">
        <TranslatableTextArea
          defaultValue={defaultValues?.reason}
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
