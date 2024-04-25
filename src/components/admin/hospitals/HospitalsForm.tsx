"use client";
import Form from "@/components/common/ui/Form";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { AddHospital } from "@/Models/Hospital";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import { DepartmentsService } from "@/services/DepartmentsService";
import { HospitalService } from "@/services/HospitalService";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { translate } from "@/Helpers/Translations";
import { ApiResponse } from "@/Http/Response";
import { Department } from "@/Models/Departments";
import { CityService } from "@/services/CityService";
import { City } from "@/Models/City";
import TextAreaMap from "@/components/common/ui/textArea/TextAreaMap";
import Gallery from "@/components/common/ui/Gallery";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";

const HospitalsForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: AddHospital;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return HospitalService.make<HospitalService>()
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await HospitalService.make<HospitalService>().store(data);
    }
  };
  const onSuccess = () => {
    navigate(`/admin/hospitals`);
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

        <ApiSelect
          api={(page, search): Promise<ApiResponse<Department[]>> =>
            DepartmentsService.make<DepartmentsService>().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50
            )
          }
          isMultiple={true}
          getDataArray={(data) => data.data}
          getIsLast={(data) => data?.paginate?.isLast ?? false}
          getTotalPages={(data) => data?.paginate?.total_pages ?? 1}
          optionValue={"id"}
          getOptionLabel={(data) => translate(data.name)}
          defaultValues={
            defaultValues?.available_departments
              ? defaultValues.available_departments
              : []
          }
          label="Available Departments"
          name="available_departments"
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
        <ApiSelect
          api={(page, search): Promise<ApiResponse<City[]>> =>
            CityService.make<CityService>().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50
            )
          }
          defaultValues={
            defaultValues?.address?.city ? [defaultValues?.address?.city] : []
          }
          getDataArray={(data) => data.data}
          getIsLast={(data) => data.paginate?.isLast ?? true}
          getTotalPages={(data) => data.paginate?.total_pages ?? 1}
          name="city_id"
          label="City"
          optionValue="id"
          getOptionLabel={(data) => translate(data.name)}
        />
        <TranslatableInput
          name={"address.name"}
          type={"text"}
          label={"Address"}
        />

        {type == "update" ? (
          <div className={"col-span-2"}>
            {defaultValues?.photos?.length != 0 ? (
              <Gallery
                media={defaultValues?.photos ? defaultValues?.photos : [""]}
              />
            ) : (
              <div className="flex items-center">
                <label className="label"> Image : </label>
                <span className="text-lg badge badge-neutral">no data</span>
              </div>
            )}
          </div>
        ) : (
          false
        )}
      </Grid>

      <ImageUploader name={"images"} isMultiple={true} />
      <TextAreaMap
        className={"col-span-2"}
        name="address.map_iframe"
        label={"Map iframe"}
        defaultValue={defaultValues?.address?.map_iframe}
      />
      <div className="flex justify-center my-3">
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default HospitalsForm;
