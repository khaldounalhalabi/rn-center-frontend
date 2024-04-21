"use client";
import Form from "@/components/common/ui/Form";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { AddHospital } from "@/Models/Hospital";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import SelectPaginated from "@/components/common/ui/Selects/SelectPaginated";
import { DepartmentsService } from "@/services/DepartmentsService";
import { HospitalService } from "@/services/HospitalService";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { translate } from "@/Helpers/Translations";
import { ApiResponse } from "@/Http/Response";
import { Department } from "@/Models/Departments";
import { getCookieClient } from "@/Actions/clientCookies";
import { CityService } from "@/services/CityService";
import { City } from "@/Models/City";
import Textarea from "@/components/common/ui/textArea/Textarea";
import TextAreaMap from "@/components/common/ui/textArea/TextAreaMap";
import TimePicker from "@/components/common/ui/TimePicker";
import Gallery from "@/components/common/ui/Gallery";

const HospitalsForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: AddHospital;
  id?: number;
  type?: "store" | "update";
}) => {
  const locale = getCookieClient('NEXT_LOCALE');
  const handleSubmit = async (data: any) => {
    console.log(data);
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return HospitalService.make<HospitalService>().update(
        defaultValues?.id ?? id,
        data,
      );
    } else {
      return await HospitalService.make<HospitalService>().store(data);
    }
  };
  const onSuccess = () => {
    navigate(`${locale}/admin/hospitals`);
  };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <TranslatableInput
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={"Hospital Name"}
          name={"name"}
        />

        <SelectPaginated
          api={async (page, search): Promise<ApiResponse<Department[]>> =>
            await DepartmentsService.make<DepartmentsService>().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50,
            )
          }
          isMultiple={true}
          getLabel={(option) => translate(option.name)}
          value={"id"}
          name={"available_departments"}
          inputLabel={"Available Departments"}
          selected={
            defaultValues?.available_departments
              ? defaultValues?.available_departments
              : []
          }
        />
      </Grid>

      <MultiInput
        type={"tel"}
        name={"phone_numbers"}
        placeholder={"Enter Hospital Phone Number"}
        label={"Hospital Phones"}
        defaultValue={defaultValues?.phone_numbers ?? []}
      />

      <Grid md={"2"}>
        <SelectPaginated
          api={async (page, search): Promise<ApiResponse<City[]>> =>
            await CityService.make<CityService>().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50,
            )
          }
          getLabel={(option: City) => translate(option.name)}
          value={"id"}
          name={"address.city_id"}
          inputLabel={"city"}
          selected={[defaultValues?.address?.city_id]}
        />
        <TranslatableInput
          name={"address.name"}
          type={"text"}
          label={"Address"}
        />
        <TextAreaMap
          className={"col-span-2"}
          name="address.lat"
          label={"Map iframe"}
          defaultValue={defaultValues?.address?.map_iframe ?? []}
        />
        <div className={"col-span-2"}>
          {defaultValues?.images?.length != 0 ? (
              <Gallery
                  media={defaultValues?.images ? defaultValues?.images : [""]}
              />
          ) : (
              <div className="flex items-center">
                <label className="label"> Image : </label>
                <span className="text-lg badge badge-neutral">no data</span>
              </div>
          )}
        </div>
      </Grid>

      <ImageUploader name={"images"} isMultiple={true} />
      <div className="flex justify-center my-3">
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default HospitalsForm;
